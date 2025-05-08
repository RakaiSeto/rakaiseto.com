import { defineCollection, z } from "astro:content";

const projectCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
		techstack: z.array(z.string()).optional(),
	}),
});

const blogCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		dateFormatted: z.string(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(),
	}),
});

export const collections = {
	projects: projectCollection,
	blog: blogCollection,
};
