import { useRouter } from "next/router";

export default async function Page({
    params,
}: {
    params: Promise<{ post: string }>
}) {
    return (
        <p>yo</p>
    );
}