import { ClerkClient } from "@clerk/clerk-sdk-node";
import { request, response } from "express";
import prisma from "./prisma/client";

const prisma = new PrismaClient();

export function optionalUser(handler: )