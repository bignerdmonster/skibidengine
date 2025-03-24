import {redirect } from "next/navigation";
import MarkdownEditor from "~/app/_components/editer";
import { getPost } from "~/server/queries";
import PostRenderer from "../../_components/PostRenderer";
import { auth } from "@clerk/nextjs/server";

export default async function Page({
    params,
}: {
    params: Promise<{post: number}>
}) {
    const post = await getPost((await params).post)
    let enabledMark = false;
    if (post == null) {redirect('/')}
    if ((await (auth())).userId) {enabledMark = true;}

    return <PostRenderer post={post} enabledFlag={enabledMark}/>  
}