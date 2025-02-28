"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
export default async function saveText(tytle: string, conten: string): Promise<string | Error> {
    const user = await(auth());
    try {
    if (!user.userId) {
        throw new Error("Unauthorized: not signed in");
        return "/404"
    } else if (!tytle) {
        throw new Error("Content Error: Title Empty")
    } else if (!conten) {
        throw new Error("Content Error: Content Empty")
    } else {
        console.log(user.userId, tytle, conten)
        const returnedArray = await db.insert(posts).values({
            user: user.userId,
            title: tytle,
            content: conten
        }).returning({ id: posts.id})
    const returnedObject = returnedArray.pop()!
    return ("/post/".concat(returnedObject.id.toString()))
    }
} catch (error) {
    return {message: (error as Error).message, name: (error as Error).name}
}
}

    
