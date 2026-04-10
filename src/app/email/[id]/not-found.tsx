import Link from "next/link";

export default function EmailNotFound() {
  return (
    <div className="page-enter mx-auto max-w-2xl px-6 py-24 text-center" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
      <h1 className="text-2xl font-bold text-[#333] mb-3">
        Letter Not Found
      </h1>
      <hr className="mx-auto w-16 border-[#d0d0d0] my-4" />
      <p className="text-[14px] text-[#888] mb-8" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
        We could not find this particular letter. It may have been removed or
        the link may be incorrect.
      </p>
      <Link
        href="/archive"
        className="inline-flex items-center gap-1 text-[13px] text-[#555] hover:text-[#111] rounded px-4 py-1.5 border border-[#b0b0b0] bg-gradient-to-b from-white to-[#e0e0e0] shadow-sm active:from-[#d0d0d0] active:to-[#c0c0c0]"
      >
        Browse the Archive
      </Link>
    </div>
  );
}
