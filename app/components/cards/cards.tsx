import React from "react";
import Image from "next/image";
import Link from "next/link";
import { InstagramItem } from "@/app/lib/mongodbschameas";

export default function Cards({ posts, postLoading }: { posts: InstagramItem[]; postLoading: boolean }) {
  if (postLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-lg">No posts found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10 px-4 max-w-7xl mx-auto">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          <div className="relative w-full aspect-square bg-gray-700">
            {post.displayUrl ? (
              <Image
                src={post.displayUrl}
                alt={post.caption || "Instagram post"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
            {post.type && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs uppercase">
                {post.type}
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col grow">
            <div className="mb-3 ">
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={post.url || "#"}
                  target="_blank"
                  className="text-white font-semibold hover:text-blue-400 transition-colors"
                >
                  @{post.ownerUsername || "unknown"}
                </Link>
                {post.isSponsored && (
                  <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded">
                    Sponsored
                  </span>
                )}
              </div>
              {post.ownerFullName && (
                <p className="text-gray-400 text-sm">{post.ownerFullName}</p>
              )}
            </div>

            {post.caption && (
              <p className="text-gray-300 text-sm mb-3 line-clamp-2 ">
                {post.caption ? post.caption : "No caption"}
              </p>
            )}

            <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
              {post.likesCount !== undefined && (
                <span className="flex items-center gap-1">
                  {/* <span>❤️</span> */}
                  <span>{post.likesCount.toLocaleString()}</span>
                </span>
              )}
              {post.commentsCount !== undefined && (
                <span className="flex items-center gap-1">
                  {/* <span>💬</span> */}
                  <span>{post.commentsCount.toLocaleString()}</span>
                </span>
              )}
              {post.videoViewCount !== undefined && (
                <span className="flex items-center gap-1">
                  {/* <span>👁️</span> */}
                  <span>{post.videoViewCount.toLocaleString()}</span>
                </span>
              )}
            </div>

            {post.locationName && (
              <p className="text-gray-500 text-xs mb-3 flex items-center gap-1">
                {/* <span>📍</span> */}
                <span>{post.locationName ? post.locationName : "No location"}</span>
              </p>
            )}

            {post.latestComments && post.latestComments.length > 0 && (
              <div className="mt-auto pt-3 border-t border-gray-700">
                <p className="text-gray-500 text-xs mb-2">
                  Latest Comments ({post.latestComments.length})
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {post.latestComments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="text-xs">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-gray-300">
                          {comment.ownerUsername}
                        </span>
                        <span className="text-gray-400 flex-1 line-clamp-2">
                          {comment.text}
                        </span>
                      </div>
                      {comment.repliesCount > 0 && (
                        <p className="text-gray-500 text-xs ml-4 mt-1">
                          {comment.repliesCount} replies
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {post.timestamp && (
              <p className="text-gray-600 text-xs mt-3">
                {new Date(post.timestamp).toLocaleDateString()}
              </p>
            )}

            {post.url && (
              <Link
                href={post.url}
                target="_blank"
                className="mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-sm"
              >
                View on Instagram
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
