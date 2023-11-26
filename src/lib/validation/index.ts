import * as z from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be more than one character." }),
  username: z
    .string()
    .min(2, { message: "User name must be more than one character." })
    .max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters. " }),
});

export const postValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

export const updateUserValidation = z.object({
  file: z.custom<File[]>(),
  name: z
    .string()
    .min(2, { message: "Name should be more than one character." }),
  username: z
    .string()
    .min(2, { message: "User name must be more than one character." })
    .max(50),
  email: z.string().email(),
  bio: z
    .string()
    .min(2, { message: "User name must be more than one character." })
    .max(250),
});
