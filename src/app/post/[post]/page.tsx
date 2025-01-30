import { useRouter } from "next/router";
import MarkdownEditor from "~/app/_components/editer";
import { getPost } from "~/server/queries";
import { redirect } from "next/navigation";
import MarkdownRenderer from "~/app/_components/mdRender";


export default async function Page({
    params,
}: {
    params: Promise<{post: number}>
}) {
    const post = await getPost((await params).post)
    if (post == null) {redirect('/')}
    return (
        <div className="card w-3/4 px-40 py-20 mx-auto bg-primary-content">
            <h1 className="mx-auto text-center text-primary text-xxl">{post.title}</h1>
            <div className="mx-auto py-10 px-10 w-full rounded-md bg-secondary-content">
                <div className="w-full text-bg-secondary">
                    {MarkdownRenderer(post.content)}
                </div>
            </div>
        </div>
    );
}