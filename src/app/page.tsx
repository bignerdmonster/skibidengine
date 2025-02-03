import Link from "next/link";
import {getPosts} from "~/server/queries";
import MarkdownRenderer from "./_components/mdRender";

export default async function HomePage() {
  const posts = await getPosts()
  return (
    <main className="">
      <div className="mx-auto py-10">
        {posts?.map((post, index) =>(
          <div key={index} className="pt-20">
            <div className="card w-3/4 px-40 py-10 mx-auto my-105 bg-primary-content">
              <a href={`/post/${post.id}`}>
              <h1 className="mx-auto text-center text-primary text-xxl pb-10">{post.title}</h1>
                  <div className="w-full text-bg-secondary bg-secondary p-10 rounded-lg">
                    {MarkdownRenderer(post.content)}
                  </div>
              </a>
            </div>
          </div>
        )
      )}
      </div>
    </main>
  );
}
