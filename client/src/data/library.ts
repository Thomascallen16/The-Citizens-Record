export type SourceLink = { label: string; href: string };

export type Portal = {
  slug: string;
  group: string;
  title: string;
  description: string;
  use: string;
  href: string;
};

export const portals: Portal[] = [
  { slug: "congress", group: "Federal government", title: "Congress.gov", description: "The official source for federal legislation and congressional activity.", use: "Find bill text, sponsors, actions, committees, and Congressional Record material.", href: "https://www.congress.gov/" },
  { slug: "supreme-court", group: "Federal government", title: "Supreme Court", description: "The Court's official opinions, orders, and docket information.", use: "Read slip opinions and official case materials directly from the Court.", href: "https://www.supremecourt.gov/" },
  { slug: "federal-register", group: "Federal government", title: "Federal Register", description: "The daily journal of the United States government.", use: "Follow proposed rules, final rules, executive documents, and notices.", href: "https://www.federalregister.gov/" },
  { slug: "regulations", group: "Federal government", title: "Regulations.gov", description: "The public docket system for many federal rulemakings.", use: "Read supporting documents and find a public-comment docket.", href: "https://www.regulations.gov/" },
  { slug: "foia", group: "Federal government", title: "FOIA.gov", description: "A central starting point for federal Freedom of Information Act requests.", use: "Learn the federal FOIA process and locate agency request information.", href: "https://www.foia.gov/" },
  { slug: "national-archives", group: "Federal government", title: "National Archives", description: "The federal archive for historical records and founding documents.", use: "Locate foundational documents, records, and archival research tools.", href: "https://www.archives.gov/" },
  { slug: "federal-courts", group: "Courts", title: "U.S. Courts", description: "The public information gateway for the federal judiciary.", use: "Understand federal court structure and locate official court resources.", href: "https://www.uscourts.gov/" },
  { slug: "pacer", group: "Courts", title: "PACER", description: "The federal judiciary's electronic public access service.", use: "Search federal case dockets and filings using a case number or party name.", href: "https://pacer.uscourts.gov/" },
  { slug: "state-courts", group: "Courts", title: "State court directories", description: "Official state judiciary sites are the right starting point for state case information.", use: "Find a state judiciary and its court-specific docket or opinion system.", href: "https://www.ncsc.org/information-and-resources/browse-by-state/state-court-websites" },
  { slug: "eac", group: "Elections & public participation", title: "Election Assistance Commission", description: "An independent federal agency supporting election administration.", use: "Find federal election administration resources and state election office links.", href: "https://www.eac.gov/" },
  { slug: "fec", group: "Elections & public participation", title: "FEC data", description: "The official public data portal for federal campaign finance information.", use: "Search committees, filings, receipts, disbursements, and independent expenditures.", href: "https://www.fec.gov/data/" },
  { slug: "census", group: "Elections & public participation", title: "U.S. Census Bureau", description: "The official federal source for census and population data.", use: "Find population data, geography tools, and census products used in public planning.", href: "https://www.census.gov/" },
];

export type RecordEntry = {
  slug: string;
  category: string;
  title: string;
  dateLabel: string;
  summary: string;
  source: SourceLink;
  questions: string[];
  relatedGuide: string;
  relatedToolkit: string;
};

export const recordEntries: RecordEntry[] = [
  { slug: "chatrie-geofence-warrants", category: "Case Updates", title: "Chatrie and geofence warrants", dateLabel: "Source checklist", summary: "A source-first checklist for locating court materials in a matter involving location data and warrant questions. Read the controlling court materials before relying on commentary.", source: { label: "Federal courts", href: "https://www.uscourts.gov/" }, questions: ["Which court issued the most recent public decision?", "What is the case number and procedural posture?", "What does the actual opinion decide, and what does it leave unresolved?"], relatedGuide: "read-a-court-opinion", relatedToolkit: "read-a-docket" },
  { slug: "rulemaking-comment", category: "Administrative Law", title: "Finding a rulemaking comment docket", dateLabel: "Field note", summary: "A practical path from a public claim about a proposed federal rule back to the notice, docket, supporting material, and comment record.", source: { label: "Regulations.gov", href: "https://www.regulations.gov/" }, questions: ["Which agency issued the notice?", "What is the docket identifier?", "Is the comment period open, closed, extended, or withdrawn?"], relatedGuide: "how-government-works", relatedToolkit: "public-records-request" },
  { slug: "district-line", category: "Elections", title: "Reading a district-line record", dateLabel: "Field note", summary: "A method for separating a map claim from the government body, plan document, public meeting materials, and court record behind it.", source: { label: "U.S. Census Bureau", href: "https://www.census.gov/" }, questions: ["Which body adopted or challenged the plan?", "What map version and date are at issue?", "What official public-hearing or court record is available?"], relatedGuide: "how-government-works", relatedToolkit: "verify-a-claim" },
];

export type Guide = {
  slug: string;
  number: string;
  track: string;
  title: string;
  summary: string;
  why: string;
  steps: string[];
  sources: SourceLink[];
};

export const guides: Guide[] = [
  { slug: "constitution", number: "01", track: "Founding documents", title: "The Constitution, Article by Article", summary: "A practical way to approach the structure, powers, and limits set out in the Constitution.", why: "The Constitution is a starting text, not a shortcut to an answer. Read the relevant article and clause before turning to explanations of how it has been interpreted.", steps: ["Identify the Article, Section, and Clause you are reading.", "Notice which institution receives a power or faces a limit.", "Use an annotated source to separate text from later interpretation."], sources: [{ label: "Constitution Annotated", href: "https://constitution.congress.gov/" }, { label: "National Archives: Constitution", href: "https://www.archives.gov/founding-docs/constitution" }] },
  { slug: "bill-of-rights", number: "02", track: "Founding documents", title: "The Bill of Rights, Explained", summary: "A guide to reading amendments as legal text and understanding why context matters.", why: "Rights questions are often framed as slogans. The amendment text, the government action involved, and later court interpretation are distinct things.", steps: ["Read the amendment's actual words.", "Identify the government action or actor involved.", "Check authoritative interpretation and the limits discussed in the underlying cases."], sources: [{ label: "Constitution Annotated", href: "https://constitution.congress.gov/" }, { label: "National Archives: Bill of Rights", href: "https://www.archives.gov/founding-docs/bill-of-rights" }] },
  { slug: "legislative-process", number: "03", track: "Process", title: "The Legislative Process", summary: "Follow a federal bill from introduction through committee work, floor action, and the next official step.", why: "A bill's public name is not its legal text or status. The official action history and version history help distinguish a proposal from a law.", steps: ["Search the official bill number or title.", "Read the latest action and current text version.", "Check committee activity and companion-bill status before drawing conclusions."], sources: [{ label: "Congress.gov", href: "https://www.congress.gov/" }] },
  { slug: "how-government-works", number: "04", track: "Structure", title: "How Government Actually Works", summary: "A basic map of legislative, executive, judicial, and administrative roles.", why: "Public decisions move through different institutions. Knowing which institution has authority helps you ask the right records question.", steps: ["Identify whether the action is legislative, executive, judicial, or administrative.", "Find the agency, court, or legislative body responsible.", "Locate the record created by that system."], sources: [{ label: "USA.gov: Branches of government", href: "https://www.usa.gov/branches-of-government" }, { label: "Congress.gov", href: "https://www.congress.gov/" }] },
  { slug: "read-a-statute", number: "05", track: "Skills", title: "How to Read a Statute", summary: "A plain-language method for reading a law's definitions, operative language, cross-references, and scope.", why: "A single sentence can depend on defined terms and cross-references elsewhere in the code. Reading only a quoted line can change the meaning.", steps: ["Start with the section heading and definitions.", "Mark terms such as shall, may, unless, and except.", "Follow every cross-reference before summarizing the rule."], sources: [{ label: "U.S. Code", href: "https://uscode.house.gov/" }] },
  { slug: "read-a-court-opinion", number: "06", track: "Skills", title: "How to Read a Court Opinion", summary: "A clear approach to identifying a case's issue, holding, reasoning, concurrence, and dissent.", why: "An opinion may contain several voices and legal questions. The holding is not every sentence in the document.", steps: ["Read the case caption, court, and decision date.", "Identify the question presented and the judgment.", "Separate the majority holding from concurrences and dissents."], sources: [{ label: "Supreme Court opinions", href: "https://www.supremecourt.gov/opinions/slipopinion/" }, { label: "U.S. Courts", href: "https://www.uscourts.gov/" }] },
];

export type ToolkitItem = {
  slug: string;
  number: string;
  group: string;
  title: string;
  summary: string;
  method: string[];
  sources: SourceLink[];
};

export const toolkitItems: ToolkitItem[] = [
  { slug: "find-government-documents", number: "01", group: "Research tools", title: "Finding government documents", summary: "Start with the institution that created the record instead of a summary about it.", method: ["Identify the responsible agency, court, legislature, county, or city.", "Use the institution's official archive or search tool.", "Save the document title, publication date, and permanent link."], sources: [{ label: "Congress.gov", href: "https://www.congress.gov/" }, { label: "National Archives", href: "https://www.archives.gov/" }] },
  { slug: "read-a-docket", number: "02", group: "Research tools", title: "How to read a docket", summary: "Use a case number to trace filings, orders, judgments, and procedural history.", method: ["Start with the case number and court.", "Read the docket entries in date order.", "Open the specific filing or order before relying on a docket label."], sources: [{ label: "PACER", href: "https://pacer.uscourts.gov/" }, { label: "U.S. Courts", href: "https://www.uscourts.gov/" }] },
  { slug: "public-records-request", number: "03", group: "Public records", title: "Making a public-records request", summary: "Ask for defined records, narrow the time range, and understand the agency's response process.", method: ["Name the records, dates, and likely custodian when possible.", "Keep requests narrow enough to be understood and searched.", "Read the cited exemption or response letter before deciding on a next step."], sources: [{ label: "FOIA.gov", href: "https://www.foia.gov/" }] },
  { slug: "follow-public-money", number: "04", group: "Public records", title: "Following public money", summary: "Use public campaign-finance, contract, and budget systems to trace a claim back to a record.", method: ["Identify the level of government and type of spending or disclosure.", "Search the official data system by entity, date, or filing.", "Compare the claim with the amount, date, and source record."], sources: [{ label: "FEC data", href: "https://www.fec.gov/data/" }, { label: "USAspending", href: "https://www.usaspending.gov/" }] },
  { slug: "verify-a-claim", number: "05", group: "Verification", title: "How to verify a claim", summary: "Separate a statement from the evidence offered for it, then work backward to the original record.", method: ["Find the original statement and preserve its date and context.", "Locate the primary document that could confirm or contradict it.", "Compare the claim's wording with what the record actually says."], sources: [{ label: "Congress.gov", href: "https://www.congress.gov/" }, { label: "Regulations.gov", href: "https://www.regulations.gov/" }] },
];

export const resourcePurposes = [
  { title: "Find laws", description: "Start with the U.S. Code, state code, or local ordinance source that governs the question.", href: "https://uscode.house.gov/" },
  { title: "Find court cases", description: "Use the relevant court system and case number to locate official opinions or docket material.", href: "https://pacer.uscourts.gov/" },
  { title: "Find legislation", description: "Check official bill text, actions, and version history before relying on a bill summary.", href: "https://www.congress.gov/" },
  { title: "Find regulations", description: "Find proposed and final rules, supporting materials, and comment dockets.", href: "https://www.regulations.gov/" },
  { title: "Find public records", description: "Use an agency's public-records process to request records held by that body.", href: "https://www.foia.gov/" },
  { title: "Find government meetings", description: "Look for agendas, recordings, minutes, and public notices on the responsible local body's official site.", href: "https://www.usa.gov/local-governments" },
  { title: "Find election information", description: "Begin with election-administration resources and your official state or local election office.", href: "https://www.eac.gov/" },
  { title: "Find campaign finance", description: "Search federal campaign-finance filings and reports through the FEC data portal.", href: "https://www.fec.gov/data/" },
];

export function getBySlug<T extends { slug: string }>(items: T[], slug: string | undefined) {
  return items.find(item => item.slug === slug);
}
