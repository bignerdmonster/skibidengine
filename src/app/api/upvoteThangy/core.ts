"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { upvoteTable } from "~/server/db/schema";
import {sql, eq} from "drizzle-orm";

export async function karmaChange(postId: number, changedValue: number): Promise<number | object> {
    const user = await(auth());
    
    if (!user.userId) {return {error: "NotAuthorized"}};


    const newKarma = await db.update(posts).set({
        karma: sql`${posts.karma} + ${changedValue}`
    }).where(eq(posts.id, postId)).returning({returnedKarma:posts.karma});
    await db.insert(upvoteTable).values(
        {userID: user.userId, idArray: [postId], ratingArray: [changedValue] }
    ).onConflictDoUpdate({
        target: upvoteTable.userID, 
        set: {userID: user.userId, idArray: sql`array_append(${upvoteTable.idArray}, ${postId})`, ratingArray: sql`array_append(${upvoteTable.ratingArray}, ${changedValue})`}
    })
    try{ 
        const karmaObject = newKarma.pop()
        if (karmaObject == undefined) throw new Error("kill me.")
        return karmaObject.returnedKarma
    } catch (error) {
        return {error:"AnError"}
    };
}
export async function karmaLoad(postId: number): Promise<number> {
    const user = await(auth());

    
    return -1
}
