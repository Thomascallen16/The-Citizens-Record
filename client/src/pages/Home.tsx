import { ArrowRight, BookOpen, FileSearch, Landmark, Scale, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PublicLayout } from "@/components/PublicLayout";

const pathways = [
  { href: "/portals", number: "01", title: "Official portals", text: "Go directly to government and institutional source systems." },
  { href: "/record", number: "02", title: "The record", text: "Read source-oriented field notes and current-information pathways." },
  { href: "/resources", number: "03", title: "Find resources", text: "Search the civic research directory by purpose, category, or jurisdiction." },
  { href: "/toolkit", number: "04", title: "Citizen Toolkit", text: "Learn practical methods for finding, reading, and checking public information." },
  { href: "/learn", number: "05", title: "Learn", text: "Build foundational knowledge about government, documents, and legal systems." },
  { href: "/contact", number: "06", title: "Contact", text: "Send a source tip, correction, or public-record question to the editorial desk." },
];

export default function Home() {
  return <PublicLayout>
    <section className="hero-section library-hero">
      <img className="hero-image" src="/manus-storage/citizens-record-law-library-walnut_d8a97c91.jpg" alt="A quiet law-library reading room with a walnut desk and warm brass lamp" />
      <div className="hero-scrim" />
      <div className="page-frame hero-layout">
        <div className="hero-copy"><p className="record-label on-dark"><span /> Start here · a shared public record</p><h1>Read the document.<br /><em>Then decide</em> what it means.</h1><p className="hero-lede">The Citizen's Record helps you understand the system, find the source, and follow the record. It is a field guide for examining public life—not a feed telling you what to conclude.</p><div className="hero-actions"><Link className="primary-link" href="/learn">Start learning <ArrowRight size={17} /></Link><Link className="text-link on-dark" href="/record">Open the record <ArrowRight size={16} /></Link></div></div>
        <aside className="hero-note"><div className="hero-note-head"><span>How to use this site</span><span>01 / 03</span></div><p>Begin with the original source. Learn how the system produced it. Then ask better questions.</p><Link href="/toolkit">Open the citizen toolkit <ArrowRight size={15} /></Link></aside>
      </div>
    </section>
    <section className="orientation-section ruled-surface"><div className="page-frame orientation-layout"><div className="rail-label"><span>01</span><p>Orientation</p></div><div><p className="record-label"><span /> Evidence before opinion</p><h2>A civic library for people who want to investigate for themselves.</h2><p className="orientation-lede">A person who understands how to read a statute, follow a docket, locate a public record, and verify a claim is harder to mislead. Every path here begins with the record and leaves room for citizens to decide.</p></div><div className="orientation-stamp"><span>UNDERSTAND</span><span>FIND</span><span>FOLLOW</span></div></div></section>
    <section className="pathways-section"><div className="page-frame"><div className="section-heading"><div><p className="record-label"><span /> Find your path</p><h2>How the library is organized.</h2></div><p className="section-intro">Choose the route that matches the question in front of you. Each one is a direct page, not another long scroll.</p></div><div className="pathways-grid">{pathways.map(pathway => <Link href={pathway.href} className="pathway-card" key={pathway.href}><span>{pathway.number}</span><h3>{pathway.title}</h3><p>{pathway.text}</p><i>Open page <ArrowRight size={15} /></i></Link>)}</div></div></section>
    <section className="featured-paths-section"><div className="page-frame featured-paths-layout"><div className="featured-paths-image"><img src="/manus-storage/citizens-record-source_780d4eee.jpg" alt="An archival source file with research notes and index tabs" /><span><ShieldCheck size={15} /> SOURCE-FIRST</span></div><div><p className="record-label"><span /> Featured starting points</p><h2>Start with a question. Leave with a path to the record.</h2><div className="featured-links"><Link href="/portals"><Landmark size={19} /><span><strong>Find an official portal</strong><em>Source systems for laws, courts, agencies, and elections.</em></span><ArrowRight size={17} /></Link><Link href="/toolkit/read-a-docket"><Scale size={19} /><span><strong>Learn to read a docket</strong><em>Follow filings, orders, and judgments in sequence.</em></span><ArrowRight size={17} /></Link><Link href="/resources"><FileSearch size={19} /><span><strong>Search the resource directory</strong><em>Find the official system behind a practical public question.</em></span><ArrowRight size={17} /></Link><Link href="/learn/constitution"><BookOpen size={19} /><span><strong>Read the Constitution article by article</strong><em>Begin with the text, then explore its context.</em></span><ArrowRight size={17} /></Link></div></div></div></section>
  </PublicLayout>;
}
