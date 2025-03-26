import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const comment = z.object({
  ownerId: z.string(),
  postId: z.string(),
  content: z.string(),
});

export const createCommentSchema = {
  tags: ["comments"],
  description: "Create a new comment in a post",
  body: zodToJsonSchema(comment),
  response: {
    200: z.array(z.object({})),
  },
};

export const getCommentByOwnerIdSchema = {
  tags: ["comments"],
  description: "Get comment by owner id",
  params: zodToJsonSchema(
    z.object({
      id: z.string(),
    }),
  ),
  response: {
    200: z.array(
      z.array(
        z.object({
          ownerId: z.string(),
          postId: z.string(),
          content: z.string(),
        }),
      ),
    ),
    404: z.array(z.object({})),
  },
};

export const getCommentByIdSchema = {
  tags: ["comments"],
  description: "Get comment by id",
  params: zodToJsonSchema(
    z.object({
      id: z.string(),
    }),
  ),
  response: {
    200: z.array(
      z.array(
        z.object({
          id: z.string(),
          content: z.string(),
          votes: z.number(),
          created_at: z.date(),
          updated_at: z.date(),
          postId: z.string(),
          owner_id: z.string(),
        }),
      ),
    ),
    404: z.array(z.object({})),
  },
};

export const updateCommentByIdSchema = {
  tags: ["comments"],
  description: "Update comment by id",
  params: zodToJsonSchema(
    z.object({
      id: z.string(),
    }),
  ),
  body: zodToJsonSchema(
    z.object({
      ownerId: z.string(),
      postId: z.string(),
      content: z.string(),
    }),
  ),
  response: {
    201: z.null(),
  },
};

export const deleteCommentSchema = {
  tags: ["comments"],
  description: "Delete a comment by id(only your only posts)",
  params: zodToJsonSchema(
    z.object({
      id: z.string(),
    }),
  ),
  response: {
    200: z.array(z.object({})),
    404: z.array(z.object({})),
  },
};
