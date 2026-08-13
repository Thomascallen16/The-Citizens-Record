import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { PageHeading, PublicLayout } from "@/components/PublicLayout";
import { toolkitItems } from "@/data/library";

export default function ToolkitPage() {
  const groups = Array.from(new Set(toolkitItems.map(item => item.group)));
  return <PublicLayout><PageHeading eyebrow="Citizen Toolkit" title="Learn how to investigate." intro="Practical field-manual routes for finding documents, following public systems, and checking a claim without replacing the source." /><section className="library-section"><div className="page-frame toolkit-groups">{groups.map(group => <div className="toolkit-group" key={group}><h2>{group}</h2><div className="toolkit-page-grid">{toolkitItems.filter(item => item.group === group).map(item => <Link href={`/toolkit/${item.slug}`} className="toolkit-page-card" key={item.slug}><span>{item.number}</span><p>{item.group}</p><h3>{item.title}</h3><em>{item.summary}</em><i>Open field manual <ArrowRight size={15} /></i></Link>)}</div></div>)}</div></section></PublicLayout>;
}
