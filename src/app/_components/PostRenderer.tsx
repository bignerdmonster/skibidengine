import MarkdownRenderer from "./mdRender";
import UpvoteThang from "./upvoteThang";
import type {Post} from "~/server/queries";


type PostObject = {post:Post,enabledFlag:boolean}
export default function PostRenderer({post,enabledFlag}:PostObject) {
    return (
            <div className="card w-3/4 px-40 py-20 mx-auto bg-primary-content">
                <h1 className="mx-auto text-center text-primary text-2xl pb-10">{post.title}</h1>
                <div className="flex flex-row justify-between">
                    <div className="w-full text-bg-secondary bg-secondary p-10 rounded-lg content-center">
                     {MarkdownRenderer(post.content)}
                    </div>
                    <UpvoteThang postID={post.id} enabled={enabledFlag} postKarma={post.karma}></UpvoteThang>
                </div>
            </div>
        );
}