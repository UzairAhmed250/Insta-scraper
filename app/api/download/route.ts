import { ApifyClient } from "apify-client";
import { NextResponse } from "next/server";
import InstagramItemSchema from "@/app/lib/models/postsschema";
import connectToDatabase from "@/app/lib/mongodb";

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN!;
const APIFY_ACTOR_ID = process.env.APIFY_ACTOR_ID!;

export async function POST(req: Request) {
    try {
        if (!APIFY_API_TOKEN) 
        return new Response("Bad Request: Missing API Token", { status: 400 });

        const { url } = await req.json();

        if (!url) return new Response("Bad Request: Missing URL", { status: 400 });

        await connectToDatabase();

        const client = new ApifyClient({
            token: APIFY_API_TOKEN,
        });

        const input = { 
            directUrls: [url],
            timeoutSecs: 10000,
            resultsLimit: 200
         };
        const run = await client.actor(APIFY_ACTOR_ID).call(input);
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        if (items.length > 0) {
            const existingIds = await InstagramItemSchema.find({
                id: { $in: items.map((item: any) => item.id).filter(Boolean) }
            }).select('id').lean();
            
            const existingIdSet = new Set(existingIds.map((doc: any) => doc.id));
            
            const newItems = items.filter((item: any) => !existingIdSet.has(item.id));
            
            if (newItems.length > 0) {
                await InstagramItemSchema.insertMany(newItems);
            }
            
            return NextResponse.json({ 
                success: true, 
                added: newItems.length,
                duplicates: items.length - newItems.length,
                items: items
            });
        }

        return NextResponse.json({ success: true, items });
    } catch (error) {
        console.error("Error initializing ApifyClient or DB operation:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
