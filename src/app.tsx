import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage } from "@/pages/landing-page"
import { Workspace } from "@/pages/workspace"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/workspace" element={<Workspace/>} />
      </Routes>
    </BrowserRouter>
  )
}