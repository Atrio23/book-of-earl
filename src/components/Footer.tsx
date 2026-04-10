export default function Footer() {
  return (
    <footer className="mac-status-bar">
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 text-[11px] text-mac-text-light">
        <span className="shrink-0">394 letters</span>
        <span
          className="text-mac-text-muted italic max-w-md text-center truncate hidden sm:inline"
          title="Everything seems to have a beginning and an end except our friendship. -- Earl Roberts"
        >
          &ldquo;Everything seems to have a beginning and an end except our
          friendship.&rdquo; &mdash; Earl
        </span>
        <span className="shrink-0">2010&ndash;2019</span>
      </div>
    </footer>
  );
}
