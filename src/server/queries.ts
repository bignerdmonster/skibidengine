import "server-only";
import { db } from "./db";

type Post = {
    id: number,
    createdAt: Date,
    user: string,
    title: string,
    content: string,
    comments: string[] | null
};

export async function getPosts(): Promise<Post[] | null> {
    const posts = await db.query.posts.findMany()
    return posts
}