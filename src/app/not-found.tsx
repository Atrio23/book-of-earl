import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-enter mx-auto max-w-2xl px-6 py-24 text-center" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
      <h1 className="text-2xl font-bold text-[#333] mb-3">
        Page Not Found
      </h1>
      <hr className="mx-auto w-16 border-[#d0d0d0] my-4" />
      <p className="text-[14px] text-[#888] mb-8" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
        This letter seems to have been lost in the mail.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-[13px] text-[#555] hover:text-[#111] rounded px-4 py-1.5 border border-[#b0b0b0] bg-gradient-to-b from-white to-[#e0e0e0] shadow-sm active:from-[#d0d0d0] active:to-[#c0c0c0]"
      >
        Return Home
      </Link>
    </div>
  );
}
