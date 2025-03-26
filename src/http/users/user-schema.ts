import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const getAllUsersDocs = {
  tags: ["users"],
  description: "Get all users",
  response: {
    200: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
        coins: z.number(),
        created_at: z.date(),
        role: z.boolean(),
        posts: z.number(),
        comments: z.number(),
      }),
    ),
  },
};

export const getUserSchema = {
  tags: ["users"],
  description: "Get a user by his username",
  params: zodToJsonSchema(
    z.object({
      user: z.string(),
    }),
  ),
  response: {
    200: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
        coins: z.number(),
        role: z.date(),
        posts: z.array(z.object({})),
        comments: z.array(z.object({})),
      }),
    ),
    404: z.array(z.object({})),
  },
};

export const createUserSchema = {
  tags: ["users"],
  description: "Create a new user",
  body: zodToJsonSchema(
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    }),
  ),
  response: {
    200: z.array(z.object({})),
  },
};

export const updateUserSchema = {
  tags: ["users"],
  description: "Update a user by name",
  body: zodToJsonSchema(
    z.object({
      name: z.string(),
      email: z.string(),
      password_hash: z.string(),
    }),
  ),
  response: {
    201: z.null(),
  },
};

export const loginUserSchema = {
  tags: ["users"],
  description: "Make login of an registered user.",
  body: zodToJsonSchema(
    z.object({
      email: z.string(),
      password: z.string(),
    }),
  ),
  response: {
    200: z.array(
      z.object({
        token: z.string(),
      }),
    ),
  },
};

export const deleteUserSchema = {
  tags: ["users"],
  description: "Delete a user by id",
  response: {
    200: z.array(z.object({})),
    404: z.array(z.object({})),
  },
};

export const refreshTokenUserSchema = {
  tags: ["users"],
  description: "Refresh the token of a logged user",
  response: {
    200: z.array(z.object({})),
  },
};

export const getProfileUserSchema = {
  tags: ["users"],
  description: "Get the profile of logged user by his token stored on cookies",
  response: {
    200: z.array(z.object({})),
  },
};

export const logoutUserSchema = {
  tags: ["users"],
  description: "Remove the token of logged user.",
  response: {
    200: z.array(z.object({})),
  },
};
