import { PrismaClient } from "@prisma/client";

export const { 
  feed,
  users,
  posts
} = new PrismaClient();