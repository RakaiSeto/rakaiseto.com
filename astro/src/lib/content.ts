import { dateToTime } from "./date";

export type ProjectEntry = {
	slug: string;
	title: string;
	description: string;
	dateFormatted: string;
	techstack?: string[];
	image?: string;
	body: string;
};

export type BlogEntry = {
	slug: string;
	title: string;
	description: string;
	dateFormatted: string;
	tags?: string[];
	image?: string;
	body: string;
};

function slugFromPath(path: string): string {
	return path.split("/").pop()?.replace(/\.md$/, "") ?? "";
}

type FrontmatterValue = string | string[];

function parseFrontmatterValue(rawValue: string): FrontmatterValue {
	const value = rawValue.trim();

	if (!value) {
		return "";
	}

	if (value.startsWith("[") && value.endsWith("]")) {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) {
				return parsed.map((item) => String(item));
			}
		} catch {
			return "";
		}
	}

	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1);
	}

	return value;
}

function parseMarkdownFile(raw: string): { data: Record<string, FrontmatterValue>; body: string } {
	const normalized = raw.replace(/\r\n/g, "\n");
	if (!normalized.startsWith("---\n")) {
		return { data: {}, body: normalized.trim() };
	}

	const endIndex = normalized.indexOf("\n---", 4);
	if (endIndex === -1) {
		return { data: {}, body: normalized.trim() };
	}

	const frontmatterBlock = normalized.slice(4, endIndex).trim();
	const body = normalized.slice(endIndex + 4).trim();
	const data: Record<string, FrontmatterValue> = {};

	for (const line of frontmatterBlock.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) {
			continue;
		}

		const separatorIndex = trimmed.indexOf(":");
		if (separatorIndex === -1) {
			continue;
		}

		const key = trimmed.slice(0, separatorIndex).trim();
		const value = trimmed.slice(separatorIndex + 1).trim();
		data[key] = parseFrontmatterValue(value);
	}

	return { data, body };
}

function getStringValue(value: FrontmatterValue | undefined): string {
	if (typeof value === "string") {
		return value;
	}
	return "";
}

function getStringArrayValue(value: FrontmatterValue | undefined): string[] | undefined {
	if (Array.isArray(value)) {
		return value;
	}
	return undefined;
}

function getFirstImageFromMarkdown(markdown: string): string | undefined {
	const match = markdown.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
	return match?.[1];
}

function markdownToExcerpt(markdown: string): string {
	const cleaned = markdown
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
		.replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
		.replace(/\[[^\]]*\]\([^)]+\)/g, " ")
		.replace(/^#{1,6}\s+/gm, "")
		.replace(/^>\s?/gm, "")
		.replace(/^[-*+]\s+/gm, "")
		.replace(/^\d+\.\s+/gm, "")
		.replace(/\s+/g, " ")
		.trim();

	if (!cleaned) {
		return "";
	}

	return cleaned.length > 140 ? `${cleaned.slice(0, 137).trimEnd()}...` : cleaned;
}

export function getProjectEntries(): ProjectEntry[] {
	const modules = import.meta.glob("../content/projects/*.md", {
		eager: true,
		query: "?raw",
		import: "default",
	}) as Record<string, string>;

	return Object.entries(modules)
		.map(([path, raw]) => {
			const parsed = parseMarkdownFile(raw);
			const content = String(parsed.body ?? "").trim();
			const description = getStringValue(parsed.data.description)
				.replace(/;\s*$/, "")
				.trim();
			return {
				slug: slugFromPath(path),
				title: getStringValue(parsed.data.title),
				description,
				dateFormatted: getStringValue(parsed.data.dateFormatted)
					.replace(/;\s*$/, "")
					.trim(),
				techstack: getStringArrayValue(parsed.data.techstack),
				image: getStringValue(parsed.data.image) || getFirstImageFromMarkdown(content),
				body: content,
			};
		})
		.sort((a, b) => dateToTime(b.dateFormatted) - dateToTime(a.dateFormatted));
}

export function getBlogEntries(): BlogEntry[] {
	const modules = import.meta.glob("../content/blog/*.md", {
		eager: true,
		query: "?raw",
		import: "default",
	}) as Record<string, string>;

	return Object.entries(modules)
		.map(([path, raw]) => {
			const parsed = parseMarkdownFile(raw);
			const content = String(parsed.body ?? "").trim();
			const description = getStringValue(parsed.data.description) || markdownToExcerpt(content);
			return {
				slug: slugFromPath(path),
				title: getStringValue(parsed.data.title),
				description,
				dateFormatted: getStringValue(parsed.data.dateFormatted)
					.replace(/;\s*$/, "")
					.trim(),
				tags: getStringArrayValue(parsed.data.tags),
				image: getStringValue(parsed.data.image) || undefined,
				body: content,
			};
		})
		.sort((a, b) => dateToTime(b.dateFormatted) - dateToTime(a.dateFormatted));
}

export function getProjectEntryBySlug(slug: string): ProjectEntry | undefined {
	return getProjectEntries().find((entry) => entry.slug === slug);
}

export function getBlogEntryBySlug(slug: string): BlogEntry | undefined {
	return getBlogEntries().find((entry) => entry.slug === slug);
}
