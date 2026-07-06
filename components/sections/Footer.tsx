export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 text-center font-mono text-xs text-faint">
      <p className="mb-2">
        built with next.js, tailwind, and an unhealthy number of{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">git commit -m &quot;fix&quot;</code>s
      </p>
      <p>© {new Date().getFullYear()} raymond fang · made in waterloo, on</p>
    </footer>
  );
}
