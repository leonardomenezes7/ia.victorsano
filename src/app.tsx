import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage } from "@/pages/landing-page"
import { Workspace } from "@/pages/workspace"
import { AudioMode } from "@/pages/audio-mode"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/workspace" element={<Workspace/>} />
        <Route path="/audio" element={<AudioMode/>} />
      </Routes>
    </BrowserRouter>
  )
}