export const revalidate = 60;
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPosts } from "@/lib/blog";
import { getPostContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import ReactMarkdown from "react-markdown";
import readingTime from "reading-time";

type Props = { params: Promise<{ slug: string }> };

async function findPost(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug && p.slug === slug.toLowerCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };

  return pageMetadata({
    title: post.title,
    description: `${post.title}, by Puspa Shukla.`,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await findPost(slug);

  if (!post) notFound();

  const content = await getPostContent(post.id);
  const stats = readingTime(content);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <p className="text-muted-foreground mt-2">
        {post.date && <time dateTime={post.date}>{post.date}</time>} • {stats.text}
      </p>

      <div className="flex gap-2 mt-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <article className="prose dark:prose-invert prose-neutral mt-6 max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </main>
  );
}
