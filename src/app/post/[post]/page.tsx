import { useRouter } from "next/router";
import MarkdownEditor from "../../_components/editer";
import MDEditor from "@uiw/react-md-editor";
import { getPost } from "../../../server/queries";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {
    params: Promise<{post: number}>
}) {
    const initpost = await getPost((await params).post)
    if (initpost == null) {redirect('/')}
    const post = (initpost!)
    return (
        <div>
            <h1 className="mx-auto text-cyan-500">{post.title}</h1>
            <div className="mx-auto">
                <div className="mx-auto container">
                    <MDEditor.Markdown source={post.content}/>
                </div>
            </div>
        </div>
    );
}