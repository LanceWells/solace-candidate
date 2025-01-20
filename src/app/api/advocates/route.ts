import { Advocate } from "@/types/advocates";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest } from "next/server";
import { eq, like, or } from "drizzle-orm";

export type GetAdvocatesRequest = {
  searchTerm: string;
};

export type GetAdvocatesResponse = {
  data: Advocate[];
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchTerm = searchParams.get("searchTerm") ?? "";
  const data = await getAdvocates({ searchTerm });

  // Comment-out to test longer load times.
  // await new Promise((res) => setTimeout(res, 2000));

  return Response.json({ data } as GetAdvocatesResponse);
}

// With more time, it would be nice to clean this up. I'm not very familiar with Drizzle.
async function getAdvocates(req: GetAdvocatesRequest): Promise<Advocate[]> {
  if (!req.searchTerm) {
    return (await db.select().from(advocates)) as Advocate[];
  }

  const termAsInt = parseInt(req.searchTerm);
  if (!isNaN(termAsInt)) {
    return (await db
      .select()
      .from(advocates)
      .where(
        or(
          // This phone number comparison isn't very nice. It would be better to be able to handle
          // national formats, spaceless formats, and partial numbers.
          eq(advocates.phoneNumber, termAsInt),
          eq(advocates.yearsOfExperience, termAsInt)
        )
      )) as Advocate[];
  }

  const searchVal = `%${req.searchTerm}%`;
  return (await db
    .select()
    .from(advocates)
    .where(
      or(
        like(advocates.firstName, searchVal),
        like(advocates.lastName, searchVal),
        like(advocates.city, searchVal),
        like(advocates.degree, searchVal)
      )
    )) as Advocate[];
}
