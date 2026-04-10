export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center" style={{ fontFamily: '-apple-system, "Lucida Grande", "Helvetica Neue", sans-serif' }}>
      <div className="inline-flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-[#999] animate-pulse" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#999] animate-pulse [animation-delay:150ms]" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#999] animate-pulse [animation-delay:300ms]" />
      </div>
      <p className="mt-4 text-[#999] text-[13px]">
        Loading...
      </p>
    </div>
  );
}
