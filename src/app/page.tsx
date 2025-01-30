import Link from "next/link";
import {getPosts} from "~/server/queries";
import MarkdownRenderer from "./_components/mdRender";

export default async function HomePage() {
  const posts = await getPosts()
  return (
    <main className="dark:bg-neutral-950">
      <div className="mx-auto w-11/12 py-10">
        {posts?.map((post, index) =>(
          
          <div key={index} className="card w-3/4 px-40 py-20 mx-auto my-35 bg-primary-content">
            <a href={`/post/${post.id}`}>
             <h1 className="mx-auto text-center text-primary text-xxl">{post.title}</h1>
               <div className="w-full text-bg-secondary">
                {MarkdownRenderer(post.content)}
                </div>
            </a>
          </div>
        )
      )}
      </div>
    </main>
  );
}
