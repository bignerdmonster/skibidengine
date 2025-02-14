import "server-only";
import { db } from "./db";
import { desc } from "drizzle-orm";
import { posts } from "./db/schema"

export type Post = {
    id: number,
    createdAt: Date,
    user: string,
    title: string,
    content: string,
    comments: string[] | null
};

export async function getPosts(): Promise<Post[] | null> {
    const postsSorted = await db.query.posts.findMany({orderBy:desc(posts.id)})
    return postsSorted
}
export async function getPost(ide: number): Promise<Post | null> {
    const post = await db.query.posts.findFirst({where:(model, {eq}) => eq(model.id, ide)});
    if (post) {return post} else {return null}
}