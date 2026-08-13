import { ArrowLeft, ArrowRight, ExternalLink, FileText } from "lucide-react";
import { Link, useRoute } from "wouter";
import { PageHeading, PublicLayout } from "@/components/PublicLayout";
import { getBySlug, guides, recordEntries, toolkitItems } from "@/data/library";
import { trpc } from "@/lib/trpc";

function MissingDetail({ section, href }: { section: string; href: string }) {
  return <PublicLayout><PageHeading eyebrow="Record not found" title="This page is not in the current library." intro="The route may be incomplete or the item may not have been published." /><section className="library-section"><div className="page-frame detail-missing"><FileText size={28} /><Link href={href}>Return to {section}</Link></div></section></PublicLayout>;
}

function DetailHeader({ backHref, backLabel, eyebrow, title, intro }: { backHref: string; backLabel: string; eyebrow: string; title: string; intro: string }) {
  return <section className="detail-header"><div className="page-frame"><Link href={backHref} className="detail-back"><ArrowLeft size={15} /> Back to {backLabel}</Link><p className="record-label on-dark"><span /> {eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>;
}

function SourceList({ sources }: { sources: { label: string; href: string }[] }) {
  return <aside className="detail-sources"><p>PRIMARY SOURCES</p>{sources.map(source => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>{source.label}<ExternalLink size={14} /></a>)}</aside>;
}

export function RecordDetailPage() {
  const [, params] = useRoute("/record/:slug");
  const entry = getBySlug(recordEntries, params?.slug);
  if (!entry) return <MissingDetail section="The Record" href="/record" />;
  return <PublicLayout><DetailHeader backHref="/record" backLabel="The Record" eyebrow={`${entry.category} · ${entry.dateLabel}`} title={entry.title} intro={entry.summary} /><section className="detail-section"><div className="page-frame detail-layout"><article className="detail-main"><p className="record-label"><span /> How to approach this record</p><h2>Start with the original system, then trace the question.</h2><p>Public information often arrives as a headline or a claim. Use the questions below to locate the relevant case, docket, public notice, plan, or other source material before deciding what it means.</p><div className="question-list">{entry.questions.map((question, index) => <div key={question}><span>0{index + 1}</span><p>{question}</p></div>)}</div><div className="detail-next"><Link href={`/learn/${entry.relatedGuide}`}>Related Learn guide <ArrowRight size={15} /></Link><Link href={`/toolkit/${entry.relatedToolkit}`}>Related Toolkit method <ArrowRight size={15} /></Link></div></article><SourceList sources={[entry.source]} /></div></section></PublicLayout>;
}

export function GuideDetailPage() {
  const [, params] = useRoute("/learn/:slug");
  const guide = getBySlug(guides, params?.slug);
  if (!guide) return <MissingDetail section="Learn" href="/learn" />;
  return <PublicLayout><DetailHeader backHref="/learn" backLabel="Learn" eyebrow={`${guide.track} · Guide ${guide.number}`} title={guide.title} intro={guide.summary} /><section className="detail-section"><div className="page-frame detail-layout"><article className="detail-main"><p className="record-label"><span /> Why this matters</p><h2>Use the guide to approach the document. Then return to the document.</h2><p>{guide.why}</p><div className="method-list">{guide.steps.map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div><div className="detail-next"><Link href="/toolkit/verify-a-claim">Next: verify a claim <ArrowRight size={15} /></Link><Link href="/resources">Find a related official source <ArrowRight size={15} /></Link></div></article><SourceList sources={guide.sources} /></div></section></PublicLayout>;
}

export function ToolkitDetailPage() {
  const [, params] = useRoute("/toolkit/:slug");
  const item = getBySlug(toolkitItems, params?.slug);
  if (!item) return <MissingDetail section="Citizen Toolkit" href="/toolkit" />;
  return <PublicLayout><DetailHeader backHref="/toolkit" backLabel="Citizen Toolkit" eyebrow={`${item.group} · Tool ${item.number}`} title={item.title} intro={item.summary} /><section className="detail-section"><div className="page-frame detail-layout"><article className="detail-main"><p className="record-label"><span /> Field method</p><h2>A practical sequence for asking the next useful question.</h2><div className="method-list">{item.method.map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div><div className="detail-next"><Link href="/resources">Search official research paths <ArrowRight size={15} /></Link><Link href="/learn">Build the underlying context <ArrowRight size={15} /></Link></div></article><SourceList sources={item.sources} /></div></section></PublicLayout>;
}

export function ResourceDetailPage() {
  const [, params] = useRoute("/resources/:slug");
  const resources = trpc.content.listPublished.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });
  if (resources.isLoading) return <PublicLayout><PageHeading eyebrow="Resource" title="Loading the published record." intro="Retrieving the public resource from the reading room." /></PublicLayout>;
  const resource = resources.data?.find(item => item.slug === params?.slug);
  if (!resource) return <MissingDetail section="Find Resources" href="/resources" />;
  const category = resource.category || resource.kind.replace("_", " ");
  const jurisdiction = resource.jurisdiction || "General";
  return <PublicLayout><DetailHeader backHref="/resources" backLabel="Find Resources" eyebrow={`${category} · ${jurisdiction}`} title={resource.title} intro={resource.summary} /><section className="detail-section"><div className="page-frame detail-layout"><article className="detail-main"><p className="record-label"><span /> Resource note</p><h2>What can you find here?</h2><p>{resource.body || resource.summary}</p><p>This entry is an editorial pointer to a published primary-source system. Read its original documentation, terms, and current status before relying on any summary.</p><div className="detail-next"><Link href="/toolkit/verify-a-claim">Use the verification method <ArrowRight size={15} /></Link><Link href="/portals">Browse official portals <ArrowRight size={15} /></Link></div></article><SourceList sources={resource.sourceUrl ? [{ label: resource.sourceLabel || "Open original source", href: resource.sourceUrl }] : []} /></div></section></PublicLayout>;
}
