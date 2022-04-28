import { Router, Routes, Route, Link } from "solid-app-router";
import { lazy } from "solid-js";
import ContactPage from "./pages/ContactPage";

const Home = lazy(() => import("./pages/index"));
const NotFound = lazy(() => import("./pages/notfound"));

export default function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacts/:id" element={<ContactPage />} />
      <Route path="/*all" element={<NotFound />} />
    </Routes>
  )
}