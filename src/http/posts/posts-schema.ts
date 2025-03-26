import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const posts = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    content: z.string(),
    up_votes: z.number(),
    created_at: z.date(),
    updated_at: z.date(),
    owner_id: z.string(),
    comments: z.array(z.object({})),
    owner: z.object({}),
  }),
);

export const getAllPostsSchema = {
  tags: ["posts"],
  description: "Get all posts",
  response: {
    200: z.array(posts),
  },
};

export const createPostSchema = {
  tags: ["posts"],
  description: "Create a new post",
  body: zodToJsonSchema(
    z.object({
      title: z.string(),
      content: z.string(),
    }),
  ),
  response: {
    200: z.array(z.object({})),
  },
};

export const getPostBySlugSchema = {
  tags: ["posts"],
  description: "Get post by slug",
  params: zodToJsonSchema(
    z.object({
      slug: z.string(),
    }),
  ),
  response: {
    200: z.array(posts),
    404: z.array(z.object({})),
  },
};

export const getPostByIdSchema = {
  tags: ["posts"],
  description: "Get post by id",
  params: zodToJsonSchema(
    z.object({
      id: z.string(),
    }),
  ),
  response: {
    200: z.array(posts),
    404: z.array(z.object({})),
  },
};

export const getPostByOwnerIdSchema = {
  tags: ["posts"],
  description: "Get post by his owner id",
  params: zodToJsonSchema(
    z.object({
      id: z.string(),
    }),
  ),
  response: {
    200: z.array(posts),
    404: z.array(z.object({})),
  },
};

export const updatePostSchema = {
  tags: ["posts"],
  description: "Update post by id",
  params: zodToJsonSchema(
    z.object({
      id: z.string(),
    }),
  ),
  body: zodToJsonSchema(
    z.object({
      title: z.string(),
      content: z.string(),
    }),
  ),
  response: {
    201: z.null(),
  },
};

export const deletePostSchema = {
  tags: ["posts"],
  description: "Delete a post by id(only your only posts)",
  response: {
    200: z.array(z.object({})),
    404: z.array(z.object({})),
  },
};
