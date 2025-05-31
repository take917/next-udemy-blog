import PostCard from "@/components/post/PostCard";
import { getPosts, searchPosts } from "@/lib/post";
import { Post } from "@/types/post";

type SearchParams = {
  search?: string;
};

export default async function PostPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolveSearchParams = await searchParams;
  const query = resolveSearchParams.search || "";

  const posts = query
    ? ((await searchPosts(query)) as Post[])
    : ((await getPosts()) as Post[]);
  // const posts = (await getPosts()) as Post[];
  return (
    <>
      <div className="container me-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-clos-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
