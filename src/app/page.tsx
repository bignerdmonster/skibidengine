import Link from "next/link";
import {getPosts} from "~/server/queries";
import PostRenderer from "./_components/PostRenderer";

export default async function HomePage() {
  const posts = await getPosts()
  return (
    <main className="">
      <div className="mx-auto py-10">
        {posts?.map((post, index) =>(
          <div key={index} className="pt-20">
            <div className="card w-3/4 px-40 py-10 mx-auto my-105 bg-primary-content">
              <a href={`/post/${post.id}`}>
              <PostRenderer post={post}/>
              </a>
            </div>
          </div>
        )
      )}
      </div>
    </main>
  );
}
