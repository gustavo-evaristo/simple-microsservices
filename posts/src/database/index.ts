import { PrismaClient } from "@prisma/client";

export const { 
  authors,
  posts
} = new PrismaClient();