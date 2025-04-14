import "server-only";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { posts, newupvotes } from "./db/schema";
import { cache } from "react";

export type Post = {
    id: number,
    createdAt: Date,
    user: string,
    title: string,
    content: string,
    comments: object | null,
    karma: number,
};

async function postPullMany(): Promise<Post[] | null> {
    const postsSorted = await db.query.posts.findMany({orderBy:desc(posts.id)})
    return postsSorted
}
async function postPull(ide: number): Promise<Post | null> { 
    const post = await db.query.posts.findFirst({where:(model, {eq}) => eq(model.id, ide)});
    if (post) {return post} else {return null}
}
async function karmaPull(user:string) {
    const upvoteObject = await db.query.newupvotes.findFirst({where: eq(newupvotes.id, user)});
    if (upvoteObject) return upvoteObject.twoah; else return {}
}
export const getPosts = cache(postPullMany);
export const getPost = cache(postPull);
export const karmaLoad = cache(karmaPull);