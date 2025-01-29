"use server";
import { Marked } from '@ts-stack/markdown';

export default async function mdRenderer(content:string) {
    return(
        Marked.parse(content)
    )
}