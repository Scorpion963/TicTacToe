"use server";

import prisma from "../../..";

export default async function findUsersBasedOnFirstName(firstName: string) {
  return await prisma.user.findMany({ where: { name: {contains: firstName, mode: 'insensitive'} } });
}
