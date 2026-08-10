/*
  THE CITIZEN'S RECORD — daily update log
  ----------------------------------------
  HOW TO ADD A NEW ENTRY:
  1. Copy one of the objects below.
  2. Paste it as a NEW first item inside the CR_POSTS array.
  3. Edit the fields. Leave "link" or "video" blank ("") if not used.
  4. Commit the file — Netlify auto-deploys in ~30 seconds.
*/

window.CR_POSTS = [
  {
    date: "2026-08-02",
    type: "Field Note",
    title: "The First Amendment Is Where We Begin",
    summary: "Every meaningful conversation about self-government begins with the First Amendment. It protects the freedom to speak, publish, worship—or not worship—assemble peacefully, and petition the government for redress of grievances. Those freedoms are not simply individual rights; they are the foundation that allows citizens to question authority, challenge ideas, and participate in public life.\n\nAs another election season gains momentum, there will be no shortage of headlines, campaign promises, viral clips, and opinions competing for attention. Our goal is not to tell you what to believe or who deserves your vote. Our goal is to follow the public record.\n\nWe will focus on legislation, court decisions, public meetings, campaign finance, official documents, and the actions of those who seek or hold public office. When a claim can be verified, we will show the evidence. When it cannot, we will say so. When facts change, we will update the record.\n\nAn informed citizenry does not depend on louder voices. It depends on open records, honest questions, and the freedom to examine both.\n\nThat is where The Citizen's Record begins.",
    link: "",
    video: ""
  },
  {
    date: "2026-07-30",
    type: "Video",
    title: "How a Bill Actually Becomes Law (Not the Schoolhouse Rock Version)",
    summary: "A walk through committee markup, floor amendments, and conference reports using a real bill currently moving through Congress. (Coming Soon)",
    link: "",
    video: ""
  },
  {
    date: "2026-07-24",
    type: "Case Update",
    title: "Docket Watch: Geofence Warrants and the Fourth Amendment — Chatrie v. United States",
    summary: "The Supreme Court ruled that police conduct a Fourth Amendment search when they obtain Google Location History data through a geofence warrant, because people have a reasonable expectation of privacy in their cell-phone location information. Location History is more precise, more revealing, and more user-integrated than the CSLI data addressed in Carpenter. The Court rejected arguments that short-term data or third-party storage eliminate privacy expectations. It did not decide whether the geofence warrant used in Chatrie's case was valid — it sent the case back to the Fourth Circuit to determine whether each step of the warrant met probable cause and particularity requirements.\n\n--- IMPLICATIONS ---\n\nFor Geofence Warrants:\n• Geofence warrants now clearly trigger Fourth Amendment scrutiny. Police must treat access to Location History as a search requiring constitutional justification.\n• Probable cause and particularity must be evaluated at each step of multi-stage warrants.\n• Mass-data dragnet warrants face heightened risk of invalidation — courts may demand narrower geographic and time scopes.\n• Google's 2025 change to local storage may make future geofence warrants practically impossible.\n\nFor Digital Privacy:\n• Location data is treated like deeply personal content — analogized to emails, photos, and private documents.\n• Short-term tracking is still constitutionally sensitive. Even two hours of data can reveal medical visits, political activity, or intimate associations.\n• Third-party doctrine is weakened further. Users do not lose privacy rights simply because data is stored by a tech company.\n• Digital panopticon concerns are now central to Fourth Amendment analysis.\n\nFor Law Enforcement:\n• Investigators must adapt to stricter warrant standards with more tailored affidavits and narrower parameters.\n• Routine geofence use becomes legally riskier.\n• Expect increased litigation over multi-step warrants at every stage.\n• Agencies may shift to alternative tools — traditional suspect-based warrants, video analytics, or carrier-based CSLI still governed by Carpenter.\n\nSource: Chatrie v. United States, No. 25-112 (June 29, 2026)",
    link: "https://www.supremecourt.gov/opinions/25pdf/25-112_0am4.pdf",
    video: ""
  }
];
