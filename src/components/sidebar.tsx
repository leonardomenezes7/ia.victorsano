import { Avatar } from "./ui/avatar"
import { MessageSquareText, Mic } from "lucide-react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Sidebar() {
  return (
    <aside className="
      /* Mobile (Padrão) */
      flex flex-row items-center justify-center w-full h-16 border-t border-slate-200 bg-white shrink-0
      /* Desktop (md) */
      md:flex-col md:justify-start md:w-20 md:h-full md:py-8 md:border-t-0 md:border-r md:border-slate-300 md:bg-transparent
    ">
      {/* Logo - Escondido no Mobile, Visível no Desktop */}
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block mb-8 cursor-pointer"
      >
        <img
          src=""
          alt="Logo Victor Sano"
          className="h-8 w-8 object-contain transition-all duration-300 hover:scale-108 hover:brightness-50"
        />
      </a>

      {/* Menu de Navegação */}
      <nav className="
        flex flex-row gap-8
        md:flex-col md:gap-4 md:w-full md:my-auto md:px-2
      ">
        <NavLink
          to="/workspace"
          title="Chat por Texto"
          className={({ isActive }) => cn(
            "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all duration-200",
            isActive
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          <MessageSquareText className="h-5 w-5" />
        </NavLink>

        <NavLink
          to="/audio"
          title="Ditado por Áudio"
          className={({ isActive }) => cn(
            "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all duration-200",
            isActive
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          <Mic className="h-5 w-5" />
        </NavLink>
      </nav>

      {/* Avatar - Escondido no Mobile para economizar espaço */}
      <Avatar className="hidden md:flex h-10 w-10 cursor-pointer md:mt-auto">
        <img
          src="https://github.com/shadcn.png"
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </Avatar>
    </aside>
  )
}