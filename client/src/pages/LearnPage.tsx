import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageHeading, PublicLayout } from "@/components/PublicLayout";
import { guides } from "@/data/library";

export default function LearnPage() {
  return <PublicLayout><PageHeading eyebrow="Learn" title="A civic education library." intro="Six guides built to make a primary source less intimidating without replacing it. Read the guide, then return to the original material." /><section className="library-section ruled-surface"><div className="page-frame"><div className="learn-library-grid">{guides.map(guide => <Link href={`/learn/${guide.slug}`} className="learn-library-card" key={guide.slug}><div><span>{guide.number}</span><p>{guide.track}</p></div><h2>{guide.title}</h2><em>{guide.summary}</em><i>Open guide <ArrowRight size={15} /></i></Link>)}</div></div></section></PublicLayout>;
}
