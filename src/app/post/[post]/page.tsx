import {redirect } from "next/navigation";
import MarkdownEditor from "~/app/_components/editer";
import { getPost } from "~/server/queries";
import PostRenderer from "../../_components/PostRenderer";

export default async function Page({
    params,
}: {
    params: Promise<{post: number}>
}) {
    const post = await getPost((await params).post)
    if (post == null) {redirect('/')}

    return <PostRenderer post={post}/>  
}