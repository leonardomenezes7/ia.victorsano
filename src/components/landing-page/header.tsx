import BigTriaLogo from "../../../assets/big-tria-logo.svg"

export function Header() {
  return (
    // Ajuste: top-4 no mobile, top-6 no desktop
    <header className="fixed inset-x-0 top-4 md:top-6 z-50">
      {/* Ajuste: px-4 no mobile, px-8 no desktop */}
      <div className="mx-auto flex max-w-350 items-center justify-between px-4 md:px-8 py-3">
        <a
          href="https://www.instagram.com/tria.contato"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          {/* Ajuste: Logo levemente menor no mobile (h-4 vs h-5) */}
          <img
            src={BigTriaLogo} //
            alt="Tria"
            className="h-4 w-auto md:h-5"
          />
        </a>

        {/* Ajuste: Texto menor no mobile (text-lg) e normal no desktop (text-2xl) */}
        <span className="text-lg font-normal tracking-tight text-black md:text-2xl">
          IA Victor Sano
        </span>
      </div>
    </header>
  )
}