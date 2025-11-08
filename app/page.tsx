"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { InstagramItem } from "./lib/mongodbschameas";
import Cards from "./components/cards/cards";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [posts, setPosts] = useState<InstagramItem[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const getData = async (url: string) => {
    setPostLoading(true);
    try {
      const response = await fetch(
        `/api/getdata?url=${encodeURIComponent(url)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error getting data:", error);
    } finally {
      setPostLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setPosts(data.items);
      } else {
        setPosts([]);
      }

      setUrl("");
      console.log(data);
    } catch (error) {
      console.error("Error downloading media:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[300px]  bg-gray-900">
        <div className="text-center">
          <div className="text-2xl font-bold">
            Instagram Photo, Video Downloader
          </div>
          <div>
            Download Photos, Videos, Reels, Stories and Profile from Instagram
          </div>
        </div>
        <div className="w-1/1 mt-6 flex flex-col md:flex-row gap-4 px-4">
          <input
            type="text"
            className="p-2 rounded bg-amber-100 outline-1 w-full text-black"
            placeholder="Enter Instagram URL"
            value={url}
            onChange={handleChange}
          />
          <button
            className="bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
      <Cards posts={posts} postLoading={postLoading} />
    </div>
  );
}
