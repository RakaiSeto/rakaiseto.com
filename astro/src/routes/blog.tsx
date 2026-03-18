import { Link } from "react-router-dom";
import PageHeading from "../components/ui/PageHeading";
import BrutalCard from "../components/ui/BrutalCard";
import Reveal from "../components/ui/Reveal";
import { getBlogEntries } from "../lib/content";

export default function BlogRoute() {
	const posts = getBlogEntries();

	return (
		<section>
			<Reveal>
				<PageHeading
					title="My Blog"
					description="Thoughts about technology, learning, and experiments."
				/>
			</Reveal>
			<div className="grid gap-5 md:grid-cols-2">
				{posts.map((post, index) => (
					<Reveal key={post.slug} delay={index * 65}>
						<Link to={`/blog/${post.slug}`}>
								<BrutalCard className="h-full">
									<p className="font-mono text-xs tracking-[0.14em] text-accent">
										{post.dateFormatted}
									</p>
									<p className="mt-3 break-words whitespace-normal text-xl font-semibold leading-tight text-soft [overflow-wrap:anywhere]">
										{post.title}
									</p>
									<p className="mt-2 text-sm text-muted">{post.description}</p>
									<div className="mt-3 flex flex-wrap gap-2">
										{post.tags?.map((tag) => (
											<span
												key={`${post.slug}-${tag}`}
												className="rounded-full border border-line/70 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-muted"
											>
												#{tag}
											</span>
										))}
									</div>
									<p className="mt-4 font-mono text-[11px] uppercase tracking-[0.13em] text-accent/90">
										Read detail
									</p>
								</BrutalCard>
							</Link>
					</Reveal>
				))}
			</div>
		</section>
	);
}
