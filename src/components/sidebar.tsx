import logoTria from "../../assets/logo-tria.svg"
import { Avatar } from "./ui/avatar"

export function Sidebar() {
  return (
    <aside className="w-20 flex flex-col items-center py-8 border-r border-slate-300 bg-transparent">
      <a
        href="https://www.instagram.com/tria.contato"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-auto cursor-pointer"
      >
        <img
          src={logoTria}
          alt="Tria"
          className="h-8 w-8 object-contain transition-all duration-300 hover:scale-108 hover:brightness-50"
        />
      </a>

      <Avatar className="h-10 w-10 mt-auto cursor-pointer">
        <img
          src="https://github.com/shadcn.png"
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </Avatar>
    </aside>
  )
}