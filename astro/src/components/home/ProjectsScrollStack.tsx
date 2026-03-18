import { Link } from "react-router-dom";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

type ProjectItem = {
	name: string;
	description: string;
	image?: string;
	url: string;
};

export default function ProjectsScrollStack({
	projects,
}: {
	projects: ProjectItem[];
}) {
	const featured = projects.slice(0, 3);

	return (
		<section>
			<div className="relative h-[60svh] overflow-visible md:h-[66svh]">
				<ScrollStack
					className="h-full"
					itemDistance={64}
					itemStackDistance={20}
					baseScale={0.88}
					useWindowScroll
				>
					{featured.map((project, index) => (
						<ScrollStackItem key={project.url} itemClassName="project-stack-item">
							<Link
								to={project.url}
								className="block h-full overflow-hidden rounded-2xl border border-line/70 bg-[#1a2740]/72 p-4 shadow-card backdrop-blur-sm transition duration-300 hover:border-accent/45"
							>
								<div className="grid gap-4 md:grid-cols-[3fr_2fr] md:items-start">
									{project.image ? (
										<div className="overflow-hidden rounded-xl border border-line/60">
											<img
												src={project.image}
												alt={project.name}
												className="aspect-video h-auto w-full object-cover"
											/>
										</div>
									) : null}
									<div>
										<p className="font-mono text-xs tracking-[0.14em] text-accent">
											Project 0{index + 1}
										</p>
										<p className="mt-2 break-words whitespace-normal text-xl font-semibold leading-tight text-soft [overflow-wrap:anywhere]">
											{project.name}
										</p>
										<p className="mt-2 break-words whitespace-normal text-sm leading-relaxed text-muted [overflow-wrap:anywhere]">
											{project.description}
										</p>
									</div>
								</div>
							</Link>
						</ScrollStackItem>
					))}

					<ScrollStackItem itemClassName="project-stack-item">
						<Link
							to="/projects"
							className="flex h-full min-h-[20rem] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-accent/60 bg-accent/20 p-7 text-center shadow-card backdrop-blur-sm transition duration-300 hover:bg-accent/25"
						>
							<p className="font-mono text-xs tracking-[0.15em] text-accent">04</p>
							<p className="mt-2 text-2xl font-semibold text-soft">See More</p>
							<p className="mt-2 text-sm text-muted">
								Explore all projects and detailed writeups.
							</p>
						</Link>
					</ScrollStackItem>
				</ScrollStack>
			</div>
		</section>
	);
}
