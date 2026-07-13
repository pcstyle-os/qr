import QRGenerator from "@/components/QRGenerator";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-10 flex items-center gap-4"><span className="text-sm text-faint"><span className="text-accent-dim">##</span> {children}</span><div className="h-px flex-1 bg-hairline" /></div>;
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-6 text-sm">
        <a href="https://pcstyle.dev" className="text-foreground"><span className="text-faint">~/</span><span className="font-semibold">pcstyle</span><span className="text-faint">/qr</span></a>
        <nav className="flex gap-6 text-muted"><a href="https://pcstyle.dev" className="transition-colors hover:text-foreground">home</a><a href="https://github.com/pcstyle-os/qr" className="transition-colors hover:text-foreground">github</a></nav>
      </header>
      <section className="mx-auto max-w-2xl px-6 pb-16 pt-24">
        <p className="mb-4 text-sm text-accent"><span className="text-accent-dim">→</span> qr</p>
        <h1 className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl">Make a code worth scanning.</h1>
        <p className="max-w-lg leading-relaxed text-muted">turn any link into a custom qr code. choose a style and color, preview it instantly, then download or copy it.</p>
        <div className="mt-8 flex flex-wrap gap-2">{["instant preview", "custom styles", "png export", "level-h"].map((tag) => <span key={tag} className="rounded border border-accent-dim/60 px-2.5 py-0.5 text-xs text-accent">{tag}</span>)}</div>
      </section>
      <section className="mx-auto max-w-4xl px-6 pb-24"><SectionLabel>generator</SectionLabel><QRGenerator /></section>
      <section className="mx-auto max-w-2xl px-6 pb-24"><SectionLabel>how it works</SectionLabel><ol>{[["01","enter a link","paste the destination you want to encode and the preview updates automatically."],["02","make it yours","pick a rendering preset, add an optional emoji and set the exact color."],["03","take it with you","download a full-size png or copy the finished image straight to your clipboard."]].map(([n,title,body]) => <li key={n} className="grid grid-cols-[3rem_1fr] gap-2 border-t border-hairline py-6 first:border-t-0"><span className="text-sm text-accent-dim">{n}</span><div><h3 className="mb-2 font-semibold">{title}</h3><p className="text-sm leading-relaxed text-muted">{body}</p></div></li>)}</ol></section>
      <footer className="mx-auto flex max-w-2xl items-center justify-between border-t border-hairline px-6 py-10 text-xs text-faint"><span>© 2026 Adam Krupa</span><div className="flex gap-4"><a href="https://pcstyle.dev" className="hover:text-foreground">pcstyle.dev</a><span>·</span><a href="https://github.com/pcstyle-os/qr" className="hover:text-foreground">github</a></div></footer>
    </main>
  );
}
