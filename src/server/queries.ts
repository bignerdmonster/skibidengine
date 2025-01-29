import "server-only";
import { db } from "./db";

export type Post = {
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
export async function getPost(ide: number): Promise<Post | null> {
    const post = await db.query.posts.findFirst({where:(model, {eq}) => eq(model.id, ide)});
    if (post) {return post} else {return null}
}