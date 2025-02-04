"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
export default async function saveText(tytle: string, conten: string) {
    const user = await(auth());
    if (user.userId) {
        console.log(user.userId, tytle, conten)
        await db.insert(posts).values({
            user: user.userId,
            title: tytle,
            content: conten
        })
    } else {
        throw new Error("Unauthorized");
        return null
    }
}