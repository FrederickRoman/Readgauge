import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../pages/Loading";
import Home from "../pages/Home";

const LazyLoadAbout = lazy(() => import("../pages/About"));
const LazyLoadNotFound = lazy(() => import("../pages/NotFound"));

function PageRoutes(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<LazyLoadAbout />} />
        <Route path="*" element={<LazyLoadNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default PageRoutes;
