import { Router, Routes, Route, Link } from "solid-app-router";
import { lazy } from "solid-js";

const Home = lazy(() => import("./pages/index"));
const NotFound = lazy(() => import("./pages/notfound"));

export default function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*all" element={<NotFound />} />
    </Routes>
  )
}