import { Link, useParams } from "react-router-dom";
import MarkdownContent from "../components/ui/MarkdownContent";
import Reveal from "../components/ui/Reveal";
import { getProjectEntryBySlug } from "../lib/content";

export default function ProjectDetailRoute() {
	const { slug = "" } = useParams();
	const project = getProjectEntryBySlug(slug);

	if (!project) {
		return (
			<section className="rounded-3xl border border-line/70 bg-surface/80 p-6 shadow-panel md:p-10">
				<p className="font-mono text-xs tracking-[0.14em] text-accent">PROJECT DETAIL</p>
				<h1 className="mt-3 text-3xl font-semibold tracking-tight text-soft md:text-5xl">
					Project tidak ditemukan
				</h1>
				<p className="mt-4 max-w-xl text-sm text-muted md:text-base">
					Detail project untuk slug ini belum tersedia atau ada typo pada URL.
				</p>
				<div className="mt-7">
					<Link
						to="/projects"
						className="rounded-full border border-line/80 px-4 py-2 text-sm font-medium tracking-[0.05em] text-muted transition hover:border-accent/65 hover:text-accent"
					>
						Kembali ke projects
					</Link>
				</div>
			</section>
		);
	}

	return (
		<article className="rounded-3xl border border-line/70 bg-surface/80 p-6 shadow-panel md:p-10">
			<p className="font-mono text-xs tracking-[0.14em] text-accent">
				{project.dateFormatted}
			</p>
			<h1 className="mt-3 break-words whitespace-normal text-4xl font-semibold leading-[0.95] tracking-tight text-soft [overflow-wrap:anywhere] md:text-6xl">
				{project.title}
			</h1>
			<p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
				{project.description}
			</p>
			{project.techstack?.length ? (
				<div className="mt-5 flex flex-wrap gap-2">
					{project.techstack.map((tech) => (
						<span
							key={tech}
							className="rounded-full border border-line/70 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-muted"
						>
							{tech}
						</span>
					))}
				</div>
			) : null}
			<Reveal className="mt-8 border-t border-line/60 pt-8">
				<MarkdownContent markdown={project.body} />
			</Reveal>
		</article>
	);
}
