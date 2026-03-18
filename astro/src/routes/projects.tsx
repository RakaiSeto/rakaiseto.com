import { Link } from "react-router-dom";
import BrutalCard from "../components/ui/BrutalCard";
import PageHeading from "../components/ui/PageHeading";
import Reveal from "../components/ui/Reveal";
import { getProjectEntries } from "../lib/content";

export default function ProjectsRoute() {
	const projects = getProjectEntries();

	return (
		<section>
			<Reveal>
				<PageHeading
					title="My Projects"
					description="Here are projects I've worked on."
				/>
			</Reveal>
			<div className="grid gap-5 md:grid-cols-2">
				{projects.map((project, index) => (
					<Reveal key={project.slug} delay={index * 70}>
						<Link to={`/projects/${project.slug}`}>
							<BrutalCard className="h-full">
								<div className="grid gap-4 md:grid-cols-[3fr_2fr] md:items-start">
									{project.image ? (
										<div className="overflow-hidden rounded-xl border border-line/65">
											<img
												src={project.image}
												alt={project.title}
												className="aspect-video h-auto w-full object-cover"
											/>
										</div>
									) : null}
									<div>
										<p className="break-words whitespace-normal text-xl font-semibold leading-tight text-soft [overflow-wrap:anywhere]">
											{project.title}
										</p>
										<p className="mt-2 break-words whitespace-normal text-sm text-soft/80 [overflow-wrap:anywhere]">
											{project.description}
										</p>
										<div className="mt-3 flex flex-wrap gap-2">
											{project.techstack?.map((tech) => (
												<span
													key={`${project.slug}-${tech}`}
													className="rounded-full border border-line/70 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-soft/80"
												>
													{tech}
												</span>
											))}
										</div>
										<p className="mt-4 font-mono text-[11px] uppercase tracking-[0.13em] text-accent/90">
											View detail
										</p>
									</div>
								</div>
							</BrutalCard>
						</Link>
					</Reveal>
				))}
			</div>
		</section>
	);
}
