"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

class ContentString extends String {
    constructor(m:string){
        super(m);
    };
    schemaParse(obj: string): void | Error {
        if(this.trim() == "") throw new Error(`${obj} cannot be blank.`);
        if(this.trim().length < 10 && obj == "Content") throw new Error("Content cannot be less than 10 characters");
        if(this.trim().length > 32 && obj == "Title") throw new Error("Title cannot be more than 32 characters");
        if(this.trim() == "potbuster") throw new Error("Error: this works!") ;
    }
}


export default async function saveText(tytle: string, conten: string): Promise<string | object> {
    const user = await(auth());
    try {
        if (!user.userId) {
            throw new Error("Unauthorized: not signed in");
            return "/404"
        } else {
            new ContentString(tytle).schemaParse("Title");
            new ContentString(conten).schemaParse("Content");
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
        return {message: (error as Error).message}
    }
}

    
