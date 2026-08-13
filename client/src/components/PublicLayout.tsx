import { ArrowRight, Menu, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export const primaryNav = [
  { label: "Start here", href: "/" },
  { label: "Official portals", href: "/portals" },
  { label: "The record", href: "/record" },
  { label: "Find resources", href: "/resources" },
  { label: "Toolkit", href: "/toolkit" },
  { label: "Learn", href: "/learn" },
  { label: "Contact", href: "/contact" },
];

function isActiveRoute(location: string, href: string) {
  return href === "/" ? location === "/" : location === href || location.startsWith(`${href}/`);
}

export function PageHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="library-page-heading">
      <div className="page-frame library-page-heading-inner">
        <p className="record-label on-dark"><span /> {eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => setNavOpen(false), [location]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="edition-strip"><div className="page-frame edition-inner"><span>Independent civic education</span><span className="edition-strip-divider" aria-hidden="true" /><span>Source-first publication</span><Link href="/about">Read our standards <ArrowRight size={13} /></Link></div></div>
      <header className="site-header">
        <div className="page-frame header-inner">
          <Link className="brand" href="/" aria-label="The Citizen's Record home"><img className="brand-mark" src="/manus-storage/citizens-record-aperture_3f887e95.png" alt="" /><span className="brand-lockup"><span className="brand-name">The Citizen's Record</span><span className="brand-line">Evidence before opinion</span></span></Link>
          <nav className="desktop-nav" aria-label="Primary navigation">{primaryNav.map(item => <Link key={item.href} href={item.href} className={isActiveRoute(location, item.href) ? "active" : ""}>{item.label}</Link>)}</nav>
          <Link className="header-action" href="/record">Open the record <ArrowRight size={15} /></Link>
          <button className="menu-toggle" type="button" aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={navOpen} aria-controls="mobile-navigation" onClick={() => setNavOpen(open => !open)}>{navOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav ${navOpen ? "is-open" : ""}`} aria-label="Mobile primary navigation">{primaryNav.map((item, index) => <Link key={item.href} href={item.href} className={isActiveRoute(location, item.href) ? "active" : ""}><span>0{index + 1}</span>{item.label}<ArrowRight size={17} /></Link>)}</nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="page-frame footer-main"><div className="footer-brand"><img src="/manus-storage/citizens-record-aperture_3f887e95.png" alt="" /><div><p>The Citizen's Record</p><span>Evidence before opinion</span></div></div><p className="footer-mission">Civic education through primary sources — constitutional rights, legislation, court decisions, and public records, explained plainly.</p><div className="footer-links"><Link href="/record">The record</Link><Link href="/record">Read the record</Link><Link href="/learn">Learn</Link><Link href="/toolkit">Citizen Toolkit</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/daily-log">Daily Log</Link></div></div>
        <div className="page-frame footer-bottom"><span>© 2026 The Citizen's Record</span><span>Educational reference only · Not legal advice or legal representation</span></div>
      </footer>
    </div>
  );
}
