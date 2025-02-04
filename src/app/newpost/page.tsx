import Head from "next/head";
import MarkdownEditor from "../_components/editer";
import {SignedIn, SignedOut, SignInButton} from "@clerk/nextjs";
export default function Page() {
    return (
        <div>
        <Head>
            <title>New Post</title>
            <meta name="description" content="Create a new post for the Skibidengine!"/>
        </Head>

        <main className="mx-auto">
            <h1 className="prose">wsg bruh</h1>
            <div className="content-center mx-auto w-4/5 bg-neutral-600">
                <SignedIn><MarkdownEditor/></SignedIn>
                <SignedOut><SignInButton>Sign In to post!</SignInButton></SignedOut>
            </div>
        </main>

        </div>
    )
}