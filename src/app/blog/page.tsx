export const revalidate = 60;
import { getPublishedPosts } from "@/lib/blog";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {posts.length === 0 && (
        <p className="text-muted-foreground">No posts are available yet.</p>
      )}

      {posts.map((post) => (
        <div key={post.id} className="mb-6 border-b pb-4">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </Link>

          <p className="text-sm text-gray-500">{post.date}</p>

          <div className="flex gap-2 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
