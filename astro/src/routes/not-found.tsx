import { Link } from "react-router-dom";

export default function NotFoundRoute() {
	return (
		<section className="rounded-3xl border border-line/70 bg-surface/80 p-8 text-center shadow-panel md:p-14">
			<p className="font-mono text-xs tracking-[0.18em] text-accent">
				404
			</p>
			<h1 className="mt-3 text-5xl font-semibold tracking-tight text-soft">Not Found</h1>
			<p className="mt-4 text-sm text-muted">
				The page you are looking for does not exist.
			</p>
			<Link
				to="/"
				className="mt-6 inline-block rounded-full border border-line/80 px-4 py-2 font-mono text-xs tracking-[0.12em] transition hover:border-accent/70 hover:text-accent"
			>
				Back Home
			</Link>
		</section>
	);
}
