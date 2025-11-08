import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import InstagramItem from '@/app/lib/models/postsschema';
import connectToDatabase from '@/app/lib/mongodb';

const uri = process.env.MONGODB_URI!;

export async function GET(req: NextRequest) {
    try {
        if(!uri)
        throw new Error("MongoDb url is not configured");
         
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const sourceUrl = searchParams.get('url');

        const query = sourceUrl ? { url: sourceUrl } : {};
        
        const posts = await InstagramItem.find(query);
        return NextResponse.json({ success: true, posts });

    } catch (error) {
        console.error("Error connecting to database:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}