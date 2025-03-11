import {redirect } from "next/navigation";
import MarkdownEditor from "~/app/_components/editer";
import { getPost } from "~/server/queries";
import MarkdownRenderer from "~/app/_components/mdRender";
import UpvoteThang from "~/app/_components/upvoteThang";

export default async function Page({
    params,
}: {
    params: Promise<{post: number}>
}) {
    const post = await getPost((await params).post)
    if (post == null) {redirect('/')}
    return (
        <div className="card w-3/4 px-40 py-20 mx-auto bg-primary-content">
            <h1 className="mx-auto text-center text-primary text-2xl pb-10">{post.title}</h1>
            <div className="flex flex-row justify-between">
                <div className="w-full text-bg-secondary bg-secondary p-10 rounded-lg content-center">
                 {MarkdownRenderer(post.content)}
                </div>
                <UpvoteThang postID={post.id}></UpvoteThang>
            </div>
        </div>
    );
}