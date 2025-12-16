import BigTriaLogo from "../../../assets/big-tria-logo.svg"

export function Header() {
  return (
    <header className="fixed inset-x-0 top-6 z-50">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-8 py-3">
        <a
          href="https://www.instagram.com/tria.contato"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img
            src={BigTriaLogo}
            alt="Tria"
            className="h-5 w-auto"
          />
        </a>

        <span className="text-2xl tracking-tight text-black">
          IA Victor Sano
        </span>
      </div>
    </header>
  )
}