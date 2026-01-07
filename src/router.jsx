import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/tech" element={<Blog type="tech" />} />
        <Route path="/personal" element={<Blog type="personal" />} />
      </Routes>
    </BrowserRouter>
  );
}
