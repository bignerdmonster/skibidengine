import { useRouter } from "next/router";
import MarkdownEditor from "../_components/editer";
export default async function Page({
    params,
}: {
    params: Promise<{ post: string }>
}) {
    return (
        <p className="">yo</p>
    );
}