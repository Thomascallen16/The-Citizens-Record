import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, CheckCircle2, Database, FilePlus2, Loader2, ShieldAlert } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "wouter";

type FormState = {
  title: string;
  slug: string;
  kind: "guide" | "tool" | "portal" | "field_note" | "case_update";
  summary: string;
  sourceUrl: string;
  sourceLabel: string;
  status: "draft" | "published";
};

const blankForm: FormState = {
  title: "",
  slug: "",
  kind: "guide",
  summary: "",
  sourceUrl: "",
  sourceLabel: "",
  status: "draft",
};

function slugFromTitle(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ContentManager() {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "admin";
  const utils = trpc.useUtils();
  const [form, setForm] = useState<FormState>(blankForm);
  const [notice, setNotice] = useState<string | null>(null);
  const resourceQuery = trpc.content.adminList.useQuery(undefined, { enabled: isAdmin });
  const createResource = trpc.content.create.useMutation({
    onSuccess: () => {
      setForm(blankForm);
      setNotice("Resource saved to the persistent editorial database.");
      utils.content.adminList.invalidate();
      utils.content.listPublished.invalidate();
    },
  });
  const setStatus = trpc.content.setStatus.useMutation({
    onSuccess: () => {
      utils.content.adminList.invalidate();
      utils.content.listPublished.invalidate();
    },
  });

  const totalPublished = useMemo(
    () => resourceQuery.data?.filter(resource => resource.status === "published").length ?? 0,
    [resourceQuery.data],
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(previous => ({ ...previous, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);
    createResource.mutate({
      ...form,
      slug: form.slug || slugFromTitle(form.title),
      sourceUrl: form.sourceUrl || undefined,
      sourceLabel: form.sourceLabel || undefined,
    });
  };

  return (
    <DashboardLayout>
      <div className="content-manager">
        <div className="manager-topbar">
          <Link href="/" className="manager-back"><ArrowLeft size={15} /> Return to public site</Link>
          <span>THE CITIZEN'S RECORD / CONTENT OFFICE</span>
        </div>

        {loading ? (
          <div className="manager-state"><Loader2 className="spin" size={24} /> Loading secure workspace…</div>
        ) : !isAdmin ? (
          <div className="manager-state manager-denied"><ShieldAlert size={28} /><h1>Administrator access required</h1><p>This workspace is reserved for authenticated administrators. Public visitors can read published resources but cannot change them.</p></div>
        ) : (
          <>
            <section className="manager-intro">
              <div><p className="record-label"><span /> Persistent editorial database</p><h1>Manage the civic field manual.</h1><p>Save research guides, official-source portals, and toolkit entries as drafts or published public resources. Each resource remains under your administrative control.</p></div>
              <div className="manager-stat"><Database size={22} /><span>Published resources</span><strong>{totalPublished}</strong></div>
            </section>

            <div className="manager-grid">
              <section className="manager-form-card">
                <div className="manager-card-head"><div><p>NEW RESOURCE</p><h2>Add to the record</h2></div><FilePlus2 size={20} /></div>
                <form onSubmit={submit} className="resource-form">
                  <label>Title<input value={form.title} onChange={event => { update("title", event.target.value); if (!form.slug) update("slug", slugFromTitle(event.target.value)); }} placeholder="e.g. Reading a court opinion" required /></label>
                  <label>Permanent slug<input value={form.slug} onChange={event => update("slug", event.target.value)} placeholder="reading-a-court-opinion" required /></label>
                  <div className="form-two"><label>Resource type<select value={form.kind} onChange={event => update("kind", event.target.value as FormState["kind"])}><option value="guide">Field guide</option><option value="tool">Toolkit tool</option><option value="portal">Official portal</option><option value="field_note">Field note</option><option value="case_update">Case update</option></select></label><label>Visibility<select value={form.status} onChange={event => update("status", event.target.value as FormState["status"])}><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
                  <label>Plain-language summary<textarea value={form.summary} onChange={event => update("summary", event.target.value)} placeholder="Explain what the reader will learn and how they can verify it." rows={5} required /></label>
                  <label>Original source URL <input type="url" value={form.sourceUrl} onChange={event => update("sourceUrl", event.target.value)} placeholder="https://…" /></label>
                  <label>Source label <input value={form.sourceLabel} onChange={event => update("sourceLabel", event.target.value)} placeholder="e.g. Congress.gov" /></label>
                  <button className="manager-save" type="submit" disabled={createResource.isPending}>{createResource.isPending ? <><Loader2 className="spin" size={16} /> Saving…</> : <><CheckCircle2 size={16} /> Save resource</>}</button>
                  {notice && <p className="manager-notice">{notice}</p>}
                  {createResource.error && <p className="manager-error">{createResource.error.message}</p>}
                </form>
              </section>

              <section className="manager-list-card">
                <div className="manager-card-head"><div><p>DATABASE VIEW</p><h2>All resources</h2></div><span>{resourceQuery.data?.length ?? 0} total</span></div>
                {resourceQuery.isLoading ? <div className="manager-list-state"><Loader2 className="spin" size={20} /> Loading records…</div> : resourceQuery.error ? <div className="manager-error">{resourceQuery.error.message}</div> : resourceQuery.data?.length ? <div className="manager-list">{resourceQuery.data.map(resource => <article key={resource.id}><div><span className={`resource-status ${resource.status}`}>{resource.status}</span><h3>{resource.title}</h3><p>{resource.kind.replace("_", " ")} · /{resource.slug}</p></div><button type="button" onClick={() => setStatus.mutate({ id: resource.id, status: resource.status === "published" ? "draft" : "published" })} disabled={setStatus.isPending}>{resource.status === "published" ? "Unpublish" : "Publish"}</button></article>)}</div> : <div className="manager-list-state"><Database size={22} /><p>No records yet. Create your first resource; it will persist here.</p></div>}
              </section>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
