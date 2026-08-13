import { Loader2 } from "lucide-react";

export function DashboardLayoutSkeleton() {
  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#111a25] flex items-center justify-center p-6">
      <div className="max-w-md border border-[#111a25]/15 bg-[#faf8f3] px-8 py-10 text-center">
        <Loader2 className="mx-auto animate-spin text-[#c64b35]" size={24} />
        <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-[#c64b35] uppercase">Content office</p>
        <h1 className="mt-3 font-serif text-3xl">Securing your workspace</h1>
        <p className="mt-3 text-sm leading-6 text-[#56616a]">Checking your sign-in and editorial permissions before loading the persistent content database.</p>
        <a className="mt-6 inline-flex border-b border-[#111a25] pb-1 text-xs font-semibold" href="/">Return to the public site</a>
      </div>
    </div>
  );
}
