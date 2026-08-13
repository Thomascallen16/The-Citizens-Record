/**
 * Public Record design: an independent civic reading room built from midnight ink,
 * mineral paper, Record Vermilion, visible source status, and restrained motion.
 */
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  ExternalLink,
  FileSearch,
  Landmark,
  Mail,
  Menu,
  Scale,
  ShieldCheck,
  X,
} from "lucide-react";

const sourceRecords = [
  {
    type: "Court opinion",
    status: "Verified",
    title: "Chatrie v. United States",
    id: "No. 25-112 · decided June 29, 2026",
    detail:
      "Primary-source opinion, available in the Supreme Court’s official archive. Context and analysis are published separately from the record itself.",
    url: "https://www.supremecourt.gov/opinions/25pdf/25-112_0am4.pdf",
    label: "Open opinion",
  },
  {
    type: "Legislation",
    status: "Reading room",
    title: "Congressional legislation",
    id: "Official status search · Congress.gov",
    detail:
      "We do not display a ‘live tracker’ until a bill’s title, status, and date have been checked against the official record.",
    url: "https://www.congress.gov/",
    label: "Search Congress.gov",
  },
  {
    type: "Agency docket",
    status: "Reading room",
    title: "Federal rulemaking dockets",
    id: "Official public-comment archive · Regulations.gov",
    detail:
      "Find the notice, supporting materials, and public comments before reading anyone’s summary of a proposed federal rule.",
    url: "https://www.regulations.gov/",
    label: "Search dockets",
  },
];

const navItems = [
  { label: "Start here", href: "#inquiry" },
  { label: "Official portals", href: "#portals" },
  { label: "The Record", href: "#record" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Learn", href: "#learn" },
  { label: "Contact", href: "#contact" },
];

const publicPortals = [
  {
    index: "01",
    kicker: "Rights & foundations",
    title: "Constitution Annotated",
    text: "Read the Constitution alongside expert, nonpartisan explanations of the text and Supreme Court interpretation.",
    href: "https://constitution.congress.gov/",
    icon: BookOpen,
  },
  {
    index: "02",
    kicker: "Law change",
    title: "Congress.gov",
    text: "Check a bill’s official title, text, sponsor, latest action, and status before relying on a summary.",
    href: "https://www.congress.gov/",
    icon: Landmark,
  },
  {
    index: "03",
    kicker: "Public comment",
    title: "Regulations.gov",
    text: "Find proposed federal rules, supporting documents, comment windows, and the public docket behind them.",
    href: "https://www.regulations.gov/",
    icon: FileSearch,
  },
  {
    index: "04",
    kicker: "Court opinions",
    title: "Supreme Court archive",
    text: "Read official slip opinions directly, then use a guide to understand the holding, concurrence, and dissent.",
    href: "https://www.supremecourt.gov/opinions/slipopinion/",
    icon: Scale,
  },
];

const inquirySteps = [
  ["01", "What happened?", "Identify the event, decision, meeting, or claim before reading commentary about it."],
  ["02", "Where is the original source?", "Find the bill text, opinion, docket entry, recording, filing, or public record."],
  ["03", "How does the system work?", "Learn the process that produced the document, including what it can and cannot establish."],
  ["04", "What should citizens ask?", "Notice the date, authority, missing context, terms of art, and who has responsibility for the next step."],
  ["05", "How can it be verified?", "Compare the claim against an official record and trace it to an independent primary source."],
];

const citizenTools = [
  { id: "Tool 01", title: "Finding government documents", text: "Start with the body that created the record: Congress, a court, an agency, a state legislature, county commission, or city council.", resource: "Search Congress.gov", href: "https://www.congress.gov/", icon: Landmark },
  { id: "Tool 02", title: "Reading a docket", text: "Use the case number to follow filings, orders, judgments, and the procedural history rather than relying on a case headline.", resource: "Visit PACER", href: "https://pacer.uscourts.gov/", icon: Scale },
  { id: "Tool 03", title: "Making a public-records request", text: "Ask for records narrowly, name dates or custodians when possible, and learn what an exemption actually covers before appealing.", resource: "Open FOIA.gov", href: "https://www.foia.gov/", icon: FileSearch },
  { id: "Tool 04", title: "Following public money", text: "Compare campaign disclosures, public budgets, contracts, and lobbying records by following the originating public database.", resource: "Search FEC data", href: "https://www.fec.gov/data/", icon: ShieldCheck },
  { id: "Tool 05", title: "Verifying a claim", text: "Find the original statement, locate the primary document, check the date and context, then compare the claim with the record.", resource: "Use the inquiry method", href: "#inquiry", icon: Check },
];

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [filter, setFilter] = useState("All records");
  const publishedResources = trpc.content.listPublished.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const visibleRecords =
    filter === "All records"
      ? sourceRecords
      : sourceRecords.filter((record) => record.type === filter);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="edition-strip">
        <div className="page-frame edition-inner">
          <span>Independent civic education</span>
          <span className="edition-strip-divider" aria-hidden="true" />
          <span>Source-first publication</span>
          <a href="#standards">Read our standards <ArrowUpRight size={13} /></a>
        </div>
      </div>

      <header className="site-header">
        <div className="page-frame header-inner">
          <a className="brand" href="#top" aria-label="The Citizen's Record home">
            <img
              className="brand-mark"
              src="/manus-storage/citizens-record-aperture_3f887e95.png"
              alt=""
            />
            <span className="brand-lockup">
            <span className="brand-name">The Citizen's Record</span>
              <span className="brand-line">Evidence before opinion</span>
            </span>
          </a>

          <nav id="primary-navigation" className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="header-action" href="#record">
            Open the record <ArrowRight size={15} />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={navOpen}
            aria-controls="mobile-navigation"
            onClick={() => setNavOpen((open) => !open)}
          >
            {navOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${navOpen ? "is-open" : ""}`}
          aria-label="Mobile primary navigation"
        >
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setNavOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
              <ChevronRight size={17} />
            </a>
          ))}
          <a className="mobile-nav-cta" href="#record" onClick={() => setNavOpen(false)}>
            Open the record <ArrowRight size={17} />
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section id="top" className="hero-section">
          <img
            className="hero-image"
            src="/manus-storage/citizens-record-hero_3ad7f247.jpg"
            alt="A dimly lit archive reading room with public records arranged on a table"
          />
          <div className="hero-scrim" />
          <div className="page-frame hero-layout">
            <div className="hero-copy">
              <p className="record-label on-dark"><span /> Volume 01 · a shared public record</p>
              <h1>Read the document.<br /><em>Then decide</em> what it means.</h1>
              <p className="hero-lede">
                The Citizen's Record. Find evidence before opinion. Understand the process and system. Find the source. Follow the record.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href="#inquiry">Start with the evidence <ArrowRight size={17} /></a>
                <a className="text-link on-dark" href="#toolkit">Open the citizen toolkit <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <aside className="hero-note" aria-label="Publication notes">
              <div className="hero-note-head"><span>Publication note</span><span>01 / 03</span></div>
              <p>We name the source, show when it was checked, and keep analysis in its own lane.</p>
              <a href="#standards">See the standards <ArrowRight size={15} /></a>
            </aside>
          </div>
        </section>

        <section className="statement-section ruled-surface">
          <div className="page-frame statement-layout">
            <div className="rail-label"><span>01</span><p>What this is</p></div>
            <div className="statement-copy">
              <p className="record-label"><span /> A civic publication, not a news feed</p>
              <h2>We inherit the same public record. Learning to read it is how we keep it ours.</h2>
              <div className="statement-split">
                <p>
                  Rights, laws, and institutions belong to every one of us across political lines. We begin with the original: a bill, opinion, agency docket, public meeting record, or filing. When we explain it, we tell you what is document, what is context, and what remains unsettled.
                </p>
                <a className="underlined-link" href="#learn">Start with the field guides <ArrowRight size={16} /></a>
              </div>
            </div>
            <div className="statement-stamp" aria-hidden="true">
              <span>PUBLIC</span><span>RECORD</span><i />
            </div>
          </div>
        </section>

        <section id="portals" className="portal-section">
          <div className="page-frame">
            <div className="portal-intro">
              <div className="rail-label"><span>02</span><p>Official portals</p></div>
              <div>
                <p className="record-label"><span /> A quick route into the public record</p>
                <h2>Rights, law change, and the documents that connect us.</h2>
                <p>Start with the text that governs public life. These links lead directly to official, nonpartisan resources so you can look up what is happening now and where your rights are drawn from.</p>
              </div>
              <div className="portal-intro-note"><span>EDUCATIONAL USE</span><p>We provide avenues for research—not legal advice, legal help, or individual case assessment.</p></div>
            </div>
            <div className="portal-grid">
              {publicPortals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <a className="portal-card" key={portal.href} href={portal.href} target="_blank" rel="noreferrer">
                    <div className="portal-card-top"><span>{portal.index}</span><Icon size={19} /></div>
                    <p>{portal.kicker}</p>
                    <h3>{portal.title}</h3>
                    <span className="portal-text">{portal.text}</span>
                    <span className="portal-link">Open official source <ExternalLink size={14} /></span>
                  </a>
                );
              })}
            </div>
            <div id="inquiry" className="inquiry-method">
              <div className="inquiry-head">
                <p className="record-label"><span /> Evidence before opinion</p>
                <h3>Do not create followers of information.<br /><em>Create investigators of information.</em></h3>
              </div>
              <div className="inquiry-steps">
                {inquirySteps.map(([number, title, text]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="record" className="record-section">
          <div className="page-frame">
            <div className="section-heading">
              <div>
                <p className="record-label"><span /> The record</p>
                <h2>Begin with the source.</h2>
              </div>
              <p className="section-intro">These are paths into official archives—not claims of a live, comprehensive tracker.</p>
            </div>

            <div className="record-controls" aria-label="Filter records by source type">
              {["All records", "Court opinion", "Legislation", "Agency docket"].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="source-list">
              {visibleRecords.map((record, index) => (
                <article className="source-row" key={record.title}>
                  <div className="source-index">0{index + 1}</div>
                  <div className="source-type"><span className={record.status === "Verified" ? "verified-dot" : "reading-dot"} />{record.type}</div>
                  <div className="source-main">
                    <div className="source-title-line"><h3>{record.title}</h3><span className={`source-status ${record.status === "Verified" ? "verified" : "reading"}`}>{record.status === "Verified" && <Check size={13} />}{record.status}</span></div>
                    <p className="source-id">{record.id}</p>
                    <p className="source-detail">{record.detail}</p>
                  </div>
                  <a className="source-action" href={record.url} target="_blank" rel="noreferrer">
                    <span>{record.label}</span><ExternalLink size={15} />
                  </a>
                </article>
              ))}
            </div>

            <div className="record-note">
              <FileSearch size={20} />
              <p><strong>Publication boundary.</strong> If we have not independently checked the identifying details against the original record, it does not appear here as current fact.</p>
            </div>

            {publishedResources.data?.length ? (
              <div className="published-shelf">
                <div className="published-shelf-head"><p className="record-label"><span /> Newly published to the reading room</p><span>{publishedResources.data.length} resource{publishedResources.data.length === 1 ? "" : "s"}</span></div>
                <div className="published-shelf-grid">
                  {publishedResources.data.slice(0, 3).map(resource => (
                    <article key={resource.id}>
                      <p>{resource.kind.replace("_", " ")}</p>
                      <h3>{resource.title}</h3>
                      <span>{resource.summary}</span>
                      {resource.sourceUrl && <a href={resource.sourceUrl} target="_blank" rel="noreferrer">Open original source <ExternalLink size={14} /></a>}
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section id="standards" className="standards-section">
          <div className="page-frame standards-layout">
            <div className="standards-visual">
              <img src="/manus-storage/citizens-record-source_780d4eee.jpg" alt="An archival source file with research notes and index tabs" />
              <div className="image-tab"><ShieldCheck size={15} /> SOURCE-FIRST</div>
            </div>
            <div className="standards-copy">
              <p className="record-label"><span /> How publication works</p>
              <h2>A boundary between the record and the argument.</h2>
              <p className="standards-lede">We make the editorial process legible before asking for your attention.</p>
              <div className="standards-list">
                <div><span>01</span><div><h3>Source named</h3><p>Every published factual item leads to an identifiable record or official archive.</p></div></div>
                <div><span>02</span><div><h3>Analysis labeled</h3><p>What the document says and what we think it may mean are visibly separated.</p></div></div>
                <div><span>03</span><div><h3>Corrections preserved</h3><p>When a factual error is found, we correct it in the open rather than quietly replacing it.</p></div></div>
              </div>
              <a className="underlined-link" href="#corrections">Read correction practice <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="learn" className="learn-section ruled-surface">
          <div className="page-frame">
            <div className="learn-heading">
              <div><p className="record-label"><span /> Field guides</p><h2>Tools for reading what you find.</h2></div>
              <p>Plain-language guides that help make an original document less intimidating—without replacing it.</p>
            </div>
            <div className="learn-layout">
              <article className="featured-guide">
                <img src="/manus-storage/citizens-record-learning_badc7cfd.jpg" alt="People gathered around civic documents and research notes" />
                <div className="featured-guide-overlay" />
                <div className="featured-guide-copy">
                  <p className="record-label on-dark"><span /> Start here</p>
                  <h3>How to read a public record without getting lost in the jargon.</h3>
                  <a href="#contact">Request this guide <ArrowRight size={16} /></a>
                </div>
              </article>
              <div className="guide-list">
                <article><span className="guide-number">01</span><div><p>Document literacy</p><h3>How to read a court opinion</h3><span>Holding, dicta, concurrence, and dissent—without the fog.</span></div><BookOpen size={20} /></article>
                <article><span className="guide-number">02</span><div><p>Legislative process</p><h3>How to read a bill status</h3><span>Why the official title, action date, and text version matter.</span></div><Landmark size={20} /></article>
                <article><span className="guide-number">03</span><div><p>Public participation</p><h3>How to find a rulemaking docket</h3><span>Locate the notice, read the materials, and see the comment window.</span></div><Scale size={20} /></article>
              </div>
            </div>
          </div>
        </section>

        <section id="toolkit" className="toolkit-section">
          <div className="page-frame">
            <div className="toolkit-heading">
              <div className="rail-label"><span>05</span><p>Citizen toolkit</p></div>
              <div>
                <p className="record-label"><span /> A field manual for public life</p>
                <h2>Know where to look. Know what to ask. Know how to check.</h2>
              </div>
              <p>These are research avenues, not legal advice or legal help. Use them to understand a public record, then seek appropriate professional support for your own situation when needed.</p>
            </div>
            <div className="toolkit-grid">
              {citizenTools.map((tool) => {
                const Icon = tool.icon;
                const isInternal = tool.href.startsWith("#");
                return (
                  <article className="tool-card" key={tool.id}>
                    <div className="tool-card-meta"><span>{tool.id}</span><Icon size={18} /></div>
                    <h3>{tool.title}</h3>
                    <p>{tool.text}</p>
                    <a href={tool.href} {...(!isInternal ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {tool.resource} {isInternal ? <ArrowRight size={15} /> : <ExternalLink size={14} />}
                    </a>
                  </article>
                );
              })}
            </div>
            <div className="toolkit-tail"><span>FIELD NOTE</span><p>Every page should leave a reader more capable than when they arrived.</p><a href="#contact">Suggest a future toolkit resource <ArrowRight size={15} /></a></div>
          </div>
        </section>

        <section id="corrections" className="corrections-section">
          <div className="page-frame correction-layout">
            <div><p className="record-label on-dark"><span /> Corrections</p><h2>The record can change.<br />The change should be visible.</h2></div>
            <div className="correction-card">
              <span className="correction-label">Editorial policy</span>
              <p>We post a correction when a factual statement is wrong, materially incomplete, or linked to an incorrect source. We note what changed and when.</p>
              <a href="#contact">Report a correction <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-frame contact-layout">
            <div className="contact-copy"><p className="record-label"><span /> Keep in touch</p><h2>Have a source, a correction, or a question?</h2><p>Open your email app to contact the editor. Please do not send sensitive or confidential material through ordinary email.</p></div>
            <div className="contact-actions">
              <a className="primary-link dark" href="mailto:thomascallen16@gmail.com?subject=The%20Citizen%27s%20Record%20inquiry"><Mail size={17} /> Open email app</a>
              <p>Newsletter: <strong>coming soon</strong>. We will not collect email addresses until a real subscription service and privacy notice are in place.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-frame footer-main">
          <div className="footer-brand"><img src="/manus-storage/citizens-record-aperture_3f887e95.png" alt="" /><div><p>The Citizen's Record</p><span>Independent · source-first · civic education</span></div></div>
          <div className="footer-links"><a href="#portals">Official portals</a><a href="#record">The record</a><a href="#standards">Standards</a><a href="#learn">Field guides</a><a href="#contact">Contact</a><a href="/manage">Manage</a></div>
        </div>
        <div className="page-frame footer-bottom"><span>© 2026 The Citizen's Record</span><span>Educational reference only · Not legal advice or legal representation</span></div>
      </footer>
    </div>
  );
}
