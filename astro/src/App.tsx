import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteLayout from "./components/layout/SiteLayout";
import HomeRoute from "./routes/home";
import AboutRoute from "./routes/about";
import ProjectsRoute from "./routes/projects";
import ProjectDetailRoute from "./routes/project-detail";
import BlogRoute from "./routes/blog";
import BlogDetailRoute from "./routes/blog-detail";
import NotFoundRoute from "./routes/not-found";

function ScrollToTop() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
	}, [location.pathname]);

	return null;
}

export default function App() {
	return (
		<SiteLayout>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<HomeRoute />} />
				<Route path="/about" element={<AboutRoute />} />
				<Route path="/projects" element={<ProjectsRoute />} />
				<Route path="/projects/:slug" element={<ProjectDetailRoute />} />
				<Route path="/blog" element={<BlogRoute />} />
				<Route path="/blog/:slug" element={<BlogDetailRoute />} />
				<Route path="*" element={<NotFoundRoute />} />
			</Routes>
		</SiteLayout>
	);
}
