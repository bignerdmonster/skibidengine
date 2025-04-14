"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { newupvotes } from "~/server/db/schema";
import { karmaLoad } from "~/server/queries";
import {sql, eq} from "drizzle-orm";

export async function karmaFetch() {
    const user = await(auth());
    if (!user.userId) {return {error: "NotAuthorized"}};
    return (await karmaLoad(user.userId));
}

export async function karmaChange(postIde: number, changedValue: boolean): Promise<number | object> {
    const user = await(auth());
    console.log(postIde,changedValue);

    if (!user.userId) {return {error: "NotAuthorized"}};

    let newValue = 0;
    if (changedValue==true) newValue = 1;
    if (changedValue==false) newValue = -1;
    const newData = {[postIde]:changedValue};

    const newKarma = await db.update(posts).set({
        karma: sql`${posts.karma} + ${newValue}`
    }).where(eq(posts.id, postIde)).returning({returnedKarma:posts.karma});
    
    const result = await db.insert(newupvotes).values(
        {id: user.userId, twoah:newData}
    ).onConflictDoUpdate({
        target: newupvotes.id, 
        set: {twoah: sql`CASE
            WHEN ${newupvotes.twoah} ? ${postIde}::text THEN
              jsonb_set(${newupvotes.twoah}, array[${postIde}::text], ${changedValue}::jsonb)
            ELSE
              ${newupvotes.twoah} || jsonb_build_object(${postIde}::text, ${changedValue}::boolean)
          END`
    }}).returning();
    try{ 
        const karmaObject = newKarma.pop()
        if (karmaObject == undefined) throw new Error("kill me.")
        return karmaObject.returnedKarma
    } catch (error) {
        return {error:"AnError"}
    };
}
