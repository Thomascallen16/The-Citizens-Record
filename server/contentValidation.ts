import { z } from "zod";
import { resourceKinds, resourceStatuses } from "../drizzle/schema";

const optionalTrimmedText = (maxLength: number) =>
  z.string().trim().max(maxLength).optional().transform(value => value || undefined);

export const civicResourceInput = z.object({
  slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  kind: z.enum(resourceKinds),
  status: z.enum(resourceStatuses).default("draft"),
  title: z.string().trim().min(3).max(320),
  summary: z.string().trim().min(10).max(10_000),
  body: optionalTrimmedText(100_000),
  category: optionalTrimmedText(128),
  jurisdiction: optionalTrimmedText(128),
  sourceUrl: z.string().trim().url().max(2048).optional().or(z.literal("")).transform(value => value || undefined),
  sourceLabel: optionalTrimmedText(256),
  displayOrder: z.number().int().min(0).max(10_000).default(0),
  isFeatured: z.boolean().default(false),
});

export const civicResourceStatusInput = z.object({
  id: z.number().int().positive(),
  status: z.enum(resourceStatuses),
});

export type CivicResourceInput = z.infer<typeof civicResourceInput>;

export function normalizeCivicResource(input: CivicResourceInput, authorId: number) {
  return {
    ...input,
    isFeatured: input.isFeatured ? 1 : 0,
    publishedAt: input.status === "published" ? new Date() : null,
    authorId,
  };
}
