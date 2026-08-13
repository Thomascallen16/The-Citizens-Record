import { ArrowRight, FileText } from "lucide-react";
import { Link } from "wouter";
import { PageHeading, PublicLayout } from "@/components/PublicLayout";
import { recordEntries } from "@/data/library";

export default function RecordPage() {
  return <PublicLayout><PageHeading eyebrow="The record" title="Current information, approached through the source." intro="Field notes and public-information pathways are organized as separate records. Each entry points first to an official system and shows the questions worth asking." /><section className="library-section"><div className="page-frame"><div className="record-page-intro"><FileText size={22} /><p><strong>Publication boundary.</strong> An entry is a guide to finding and interpreting a public record. It does not replace the original document or provide legal advice.</p></div><div className="record-card-grid">{recordEntries.map((entry, index) => <Link href={`/record/${entry.slug}`} className="record-card" key={entry.slug}><div><span>0{index + 1}</span><p>{entry.category}</p></div><h2>{entry.title}</h2><em>{entry.dateLabel}</em><p>{entry.summary}</p><i>Read the record <ArrowRight size={15} /></i></Link>)}</div></div></section></PublicLayout>;
}
