import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "govp1oi5",
  dataset: "production",
  apiVersion: "2026-05-16",
  useCdn: true,
});

export interface Post {
  _id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export async function getAllPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(date desc) { _id, title, slug, date, readTime, category, image, excerpt }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(`*[_type == "post" && slug == $slug][0]`, { slug });
}
