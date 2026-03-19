import { Link, useParams } from "react-router-dom";
import MarkdownContent from "../components/ui/MarkdownContent";
import Reveal from "../components/ui/Reveal";
import { getBlogEntryBySlug } from "../lib/content";

export default function BlogDetailRoute() {
	const { slug = "" } = useParams();
	const blog = getBlogEntryBySlug(slug);

	if (!blog) {
		return (
			<section className="rounded-3xl border border-line/70 bg-surface/80 p-6 shadow-panel md:p-10">
				<p className="font-mono text-xs tracking-[0.14em] text-accent">
					WRITING DETAIL
				</p>
				<h1 className="mt-3 text-3xl font-semibold tracking-tight text-soft md:text-5xl">
					Tulisan tidak ditemukan
				</h1>
				<p className="mt-4 max-w-xl text-sm text-soft/80 md:text-[1rem]">
					Detail tulisan untuk slug ini belum tersedia atau ada typo pada URL.
				</p>
				<div className="mt-7">
					<Link
						to="/blog"
						className="rounded-full border border-line/80 px-4 py-2 text-sm font-medium tracking-[0.05em] text-soft/80 transition hover:border-accent/65 hover:text-accent"
					>
						Kembali ke blog
					</Link>
				</div>
			</section>
		);
	}

	return (
		<article className="rounded-3xl border border-line/70 bg-surface/80 p-6 shadow-panel md:p-10">
			<p className="font-mono text-xs tracking-[0.14em] text-accent">
				{blog.dateFormatted}
			</p>
			<h1 className="mt-3 break-words whitespace-normal text-4xl font-semibold leading-[0.95] tracking-tight text-soft [overflow-wrap:anywhere] md:text-6xl">
				{blog.title}
			</h1>
			{blog.tags?.length ? (
				<div className="mt-5 flex flex-wrap gap-2">
					{blog.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full border border-line/70 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-soft/80"
						>
							#{tag}
						</span>
					))}
				</div>
			) : null}
			{blog.image ? (
				<img
					src={blog.image}
					alt={blog.title}
					className="mt-8 w-full rounded-2xl border border-line/65 shadow-card"
				/>
			) : null}
			<Reveal className="mt-8 border-t border-line/60 pt-8">
				<MarkdownContent markdown={blog.body} />
			</Reveal>
		</article>
	);
}
