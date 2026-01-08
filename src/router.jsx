import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import TechBlog from "./pages/TechBlog";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/tech" element={<TechBlog type="tech" />} />
        <Route path="/personal" element={<Blog type="personal" />} />
      </Routes>
    </BrowserRouter>
  );
}
