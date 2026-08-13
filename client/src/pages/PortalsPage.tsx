import { ArrowUpRight, Landmark } from "lucide-react";
import { PageHeading, PublicLayout } from "@/components/PublicLayout";
import { portals } from "@/data/library";

export default function PortalsPage() {
  const groups = Array.from(new Set(portals.map(portal => portal.group)));
  return <PublicLayout><PageHeading eyebrow="Official portals" title="Go to the institution that made the record." intro="A directory of official government and institutional systems. These are starting points for the original record—not substitutes for reading it." /><section className="library-section"><div className="page-frame portal-directory">{groups.map(group => <div className="portal-group" key={group}><div className="portal-group-heading"><Landmark size={19} /><h2>{group}</h2></div><div className="portal-directory-grid">{portals.filter(portal => portal.group === group).map(portal => <a href={portal.href} target="_blank" rel="noreferrer" className="portal-directory-card" key={portal.slug}><p>{portal.group}</p><h3>{portal.title}</h3><span>{portal.description}</span><strong>What citizens can find here</strong><em>{portal.use}</em><i>Open official site <ArrowUpRight size={14} /></i></a>)}</div></div>)}</div></section></PublicLayout>;
}
