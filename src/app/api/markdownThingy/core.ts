"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
export default async function saveText(tytle: string, conten: string): Promise<string> {
    const user = await(auth());
    if (user.userId) {
        console.log(user.userId, tytle, conten)
        const returnedArray = await db.insert(posts).values({
            user: user.userId,
            title: tytle,
            content: conten
        }).returning({ id: posts.id}).catch(Error => {console.log("failed to upload!"); return [{id:1}]})
        const returnedObject = returnedArray.pop()!
        return ("/post/".concat(returnedObject.id.toString()))
        
    } else {
        throw new Error("Unauthorized");
        return "/404"
    }
}