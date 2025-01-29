import { useRouter } from "next/router";
import MarkdownEditor from "../../_components/editer";
import { getPost } from "../../../server/queries";
import { redirect } from "next/navigation";
import { Marked } from '@ts-stack/markdown';

export default async function Page({
    params,
}: {
    params: Promise<{post: number}>
}) {
    const post = await getPost((await params).post)
    if (post == null) {redirect('/')}
    return (
        <div>
            <h1 className="mx-auto text-cyan-500">{post.title}</h1>
            <div className="mx-auto">
                <div className="mx-auto container">
                    {Marked.parse(post.content)}
                </div>
            </div>
        </div>
    );
}