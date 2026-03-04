import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./assets/components/navbar/Navbar"
import Home from "./assets/pages/Home"

import { Footer } from "./components/footer/Footer"


export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
