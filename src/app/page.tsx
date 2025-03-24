import Link from "next/link";
import {getPosts} from "~/server/queries";
import PostRenderer from "./_components/PostRenderer";
import {auth} from "@clerk/nextjs/server"

export default async function HomePage() {
  const posts = await getPosts()
  let signedIn = false;
  if((await auth()).userId) {signedIn = true};
  return (
    <main className="">
      <div className="mx-auto py-10">
        {posts?.map((post, index) =>(
          <div key={index} className="pt-20">
            <a href={`/post/${post.id}`}>
              <PostRenderer post={post} enabledFlag={signedIn}/>
            </a>
          </div>
        )
      )}
      </div>
    </main>
  );
}
