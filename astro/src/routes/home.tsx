import { useEffect } from "react";
import { Link } from "react-router-dom";
import GradientText from "../components/GradientText";
import ProjectsScrollStack from "../components/home/ProjectsScrollStack";
import BrutalCard from "../components/ui/BrutalCard";
import PageHeading from "../components/ui/PageHeading";
import Reveal from "../components/ui/Reveal";
import { getBlogEntries, getProjectEntries } from "../lib/content";

export default function HomeRoute() {
	const projectEntries = getProjectEntries();
	const projects = projectEntries.map((project) => ({
		name: project.title,
		description: project.description,
		image: project.image,
		url: `/projects/${project.slug}`,
	}));

	const blogs = getBlogEntries();
	const latestPost = blogs[0];
	const recentPosts = blogs.slice(1, 3);

	useEffect(() => {
		document.documentElement.classList.add("snap-home");
		return () => document.documentElement.classList.remove("snap-home");
	}, []);

	return (
		<div className="space-y-8 md:space-y-10">
			<Reveal className="snap-point">
				<section className="grid min-h-[78svh] items-center gap-8 rounded-3xl border border-line/70 bg-surface/70 p-7 shadow-panel md:grid-cols-[1.2fr_0.8fr] md:p-12">
					<div>
						<p className="font-mono text-xs tracking-[0.22em] text-accent">
							FULLSTACK DEVELOPER
						</p>
						<h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight text-soft md:text-7xl">
							Hello, I&apos;m Rakai.
						</h1>
						<p className="mt-6 max-w-xl text-sm leading-relaxed text-soft/80 md:text-lg">
							I&apos;m a fullstack developer based in Jakarta. I build fast,
							clean scalable products and reliable backend-heavy systems.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<a
								href="https://linkedin.com/in/RakaiSeto"
								target="_blank"
								rel="noreferrer"
								className="rounded-full border border-accent/80 bg-accent/15 px-5 py-2.5 text-sm font-medium tracking-[0.06em] text-accent transition hover:shadow-glow"
							>
								Follow LinkedIn
							</a>
							<a
								href="/CV_RAKAI.pdf"
								target="_blank"
								rel="noreferrer"
								className="rounded-full border border-line/80 px-5 py-2.5 text-sm font-medium tracking-[0.04em] text-soft transition hover:border-accent/65 hover:text-accent"
							>
								Download CV
							</a>
							<a
								href="/PORTO_RAKAI.pdf"
								target="_blank"
								rel="noreferrer"
								className="rounded-full border border-line/80 px-5 py-2.5 text-sm font-medium tracking-[0.04em] text-soft transition hover:border-accent/65 hover:text-accent"
							>
								Download Portfolio
							</a>
						</div>
						<div className="mt-8 flex flex-wrap gap-2">
							{[
								"Go",
								"Laravel",
								"Node.js",
								"Django",
								"Redis",
								"Docker",
							].map((item) => (
								<span
									key={item}
									className="rounded-full border border-line/70 bg-base/30 px-3 py-1 text-xs tracking-[0.08em] text-soft/80"
								>
									{item}
								</span>
							))}
						</div>
					</div>
					<div className="relative flex items-center justify-center">
						<div className="absolute inset-5 rounded-3xl bg-accent/10 blur-2xl" />
						<img
							src="/assets/images/photo.png"
							alt="Rakai"
							className="relative z-10 h-full w-full max-w-sm rounded-3xl border border-line/70 object-cover shadow-card"
						/>
					</div>
				</section>
			</Reveal>

			<section
				id="work"
				className="snap-point relative z-10 min-h-[112rem] pb-32 md:min-h-[118rem] md:pb-0"
			>
				<div className="sticky top-24 z-40 pb-3 backdrop-blur-md">
					<PageHeading
						title="Selected Projects"
						description="A stacked, scroll-driven view of featured work."
					/>
				</div>
				<div className="sticky top-[7rem] z-20 md:top-[15.5rem]">
					<ProjectsScrollStack projects={projects} />
				</div>
			</section>

			<Reveal className="snap-point" delay={60}>
				<section id="writing" className="relative z-30 min-h-[52svh] pt-3 md:pt-7">
					<PageHeading
						title="Recent Writings"
						description="Thoughts and essays."
					/>
					<div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
						{latestPost ? (
							<Reveal delay={50}>
								<Link to={`/blog/${latestPost.slug}`}>
									<BrutalCard className="h-full">
										<p className="font-mono text-xs tracking-[0.14em] text-accent">
											{latestPost.dateFormatted}
										</p>
										<p className="mt-3 break-words whitespace-normal text-2xl font-semibold leading-tight text-soft [overflow-wrap:anywhere]">
											{latestPost.title}
										</p>
									<p className="mt-2 text-sm leading-relaxed md:text-[1rem] text-soft/80">
											{latestPost.description}
										</p>
									</BrutalCard>
								</Link>
							</Reveal>
						) : null}
						<div className="grid gap-5">
							{recentPosts.map((blog, index) => (
								<Reveal key={blog.slug} delay={index * 80}>
									<Link to={`/blog/${blog.slug}`}>
										<BrutalCard className="h-full">
											<p className="font-mono text-xs tracking-[0.14em] text-accent">
												{blog.dateFormatted}
											</p>
											<p className="mt-3 break-words whitespace-normal text-lg font-semibold leading-tight text-soft [overflow-wrap:anywhere]">
												{blog.title}
											</p>
											<p className="mt-2 text-sm text-soft/80">
												{blog.description}
											</p>
										</BrutalCard>
									</Link>
								</Reveal>
							))}
						</div>
					</div>
					<div className="mt-8 flex justify-end">
						<Link
							to="/blog"
							className="rounded-full border border-line/80 px-4 py-2 text-sm font-medium tracking-[0.05em] text-soft/80 transition hover:border-accent/65 hover:text-accent"
						>
							View all writings
						</Link>
					</div>
				</section>
			</Reveal>

			<Reveal className="snap-point" delay={40}>
				<section className="flex min-h-[36svh] items-center justify-center">
					<div className="w-full rounded-3xl border border-line/70 bg-surface/75 p-7 text-center shadow-panel md:p-12">
						<p className="font-mono text-xs tracking-[0.2em] text-accent">
							LET&apos;S BUILD
						</p>
						<GradientText
							className="mx-auto mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
							colors={["#36c2ff", "#8ee9ff", "#eef6ff", "#159bd3"]}
							animationSpeed={7}
							direction="horizontal"
						>
							Let&apos;s build something great together
						</GradientText>
						<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
							<a
								href="mailto:rakaiseto@gmail.com"
								className="rounded-full border border-accent/75 bg-accent/15 px-5 py-2.5 text-sm font-medium tracking-[0.04em] text-accent transition hover:shadow-glow"
							>
								Email Me
							</a>
							<a
								href="https://www.linkedin.com/in/rakaiseto"
								target="_blank"
								rel="noreferrer"
								className="rounded-full border border-line/80 px-5 py-2.5 text-sm font-medium tracking-[0.04em] text-soft/80 transition hover:border-accent/65 hover:text-accent"
							>
								Connect on LinkedIn
							</a>
						</div>
					</div>
				</section>
			</Reveal>
		</div>
	);
}
