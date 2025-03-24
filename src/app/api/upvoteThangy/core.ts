"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import {sql, eq} from "drizzle-orm";

export async function karmaChange(postId: number, changedValue: number): Promise<number | object> {
    const user = await(auth());
    if (!user.userId) {return {error: "NotAuthorized"}};
    const newKarma = await db.update(posts).set({
        karma: sql`${posts.karma} + ${changedValue}`
    }).where(eq(posts.id, postId)).returning({returnedKarma:posts.karma});
    try{ 
        const karmaObject = newKarma.pop()
        if (karmaObject == undefined) throw new Error("kill me.")
        return karmaObject.returnedKarma
    } catch (error) {
        return {error:"AnError"}
    };
}