import educations from "../collections/education.json";
import experiences from "../collections/experiences.json";
import organizations from "../collections/organizations.json";
import BrutalCard from "../components/ui/BrutalCard";
import PageHeading from "../components/ui/PageHeading";
import Reveal from "../components/ui/Reveal";

export default function AboutRoute() {
	return (
		<div className="space-y-12">
			<Reveal>
				<PageHeading
					title="About Me"
					description="Hello, I'm a fullstack developer with strong backend focus and a love for building reliable products."
				/>
			</Reveal>

			<Reveal>
				<img
					src="/assets/images/about.jpg"
					alt="About Rakai"
					className="w-full rounded-3xl border border-line/70 shadow-card"
				/>
			</Reveal>

			<InfoTimeline title="Experience" entries={experiences} />
			<InfoTimeline title="Educations" entries={educations} />
			<InfoTimeline title="Organizations" entries={organizations} />
		</div>
	);
}

type Entry = {
	dates: string;
	role: string;
	company: string;
	description: string;
	logo: string | null;
};

type EntryGroup = {
	company: string;
	logo: string | null;
	items: Entry[];
};

function groupConsecutiveByCompany(entries: Entry[]): EntryGroup[] {
	return entries.reduce<EntryGroup[]>((groups, entry) => {
		const lastGroup = groups.at(-1);

		if (lastGroup && lastGroup.company === entry.company) {
			lastGroup.items.push(entry);

			if (!lastGroup.logo && entry.logo) {
				lastGroup.logo = entry.logo;
			}

			return groups;
		}

		groups.push({
			company: entry.company,
			logo: entry.logo,
			items: [entry],
		});

		return groups;
	}, []);
}

function InfoTimeline({ title, entries }: { title: string; entries: Entry[] }) {
	const groupedEntries = groupConsecutiveByCompany(entries);

	return (
		<section>
			<h2 className="mb-5 text-3xl font-semibold tracking-tight text-soft">
				{title}
			</h2>
			<div className="relative space-y-5 pl-8 before:absolute before:bottom-6 before:left-[11px] before:top-4 before:w-px before:bg-line/70">
				{groupedEntries.map((group, groupIndex) => (
					<Reveal
						key={`${group.company}-${groupIndex}`}
						delay={groupIndex * 70}
					>
						<div className="relative">
							<BrutalCard className="p-0">
								<div className="border-b border-line/70 p-5">
									<div className="flex items-center gap-4">
										{group.logo ? (
											<img
												src={group.logo}
												alt={group.company}
												className="h-14 w-14 rounded-xl border border-line/60 bg-base object-cover"
											/>
										) : (
											<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line/60 bg-base text-xs font-mono text-muted">
												ORG
											</div>
										)}
										<div className="min-w-0">
											<p className="text-base font-semibold text-soft md:text-lg">
												{group.company}
											</p>
											{group.items.length > 1 ? (
												<p className="mt-1 font-mono text-[11px] uppercase tracking-[0.13em] text-accent">
													{group.items.length} Positions
												</p>
											) : null}
										</div>
									</div>
								</div>

								<div className="space-y-5 p-5">
									{group.items.map((item, itemIndex) => (
										<div
											key={`${item.role}-${item.dates}-${itemIndex}`}
											className="relative pl-7"
										>
											<span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full border border-line/70 bg-accent/70" />
											{itemIndex !== group.items.length - 1 ? (
												<span className="absolute left-[4px] top-5 h-[calc(100%-0.35rem)] w-px bg-line/70" />
											) : null}

											<p className="font-mono text-xs uppercase tracking-[0.13em] text-soft/80">
												{item.dates}
											</p>
											<p className="mt-2 text-base font-semibold leading-tight text-soft md:text-lg">
												{item.role}
											</p>
											{item.description ? (
												<p className="mt-2 text-sm leading-relaxed text-soft/80">
													{item.description}
												</p>
											) : null}
										</div>
									))}
								</div>
							</BrutalCard>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	);
}
