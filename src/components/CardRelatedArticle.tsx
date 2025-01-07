"use client";

import Link from "next/link";

interface CardRelatedArticleProps {
	post: {
		id: string;
		title: string;
		published: string;
		content: string;
		images?: { url: string }[];
	};
}

const CardRelatedArticle = ({ post }: CardRelatedArticleProps) => {
	const getExcerpt = (content: string) => {
		const plainText = content.replace(/<[^>]+>/g, "");
		return plainText.slice(0, 100) + "...";
	};

	return (
		<article className="max-w-xs mb-8">
			<Link href={`/blog/${post.id}`}>
				<img
					src={post.images?.[0]?.url || "/api/placeholder/382/240"}
					className="mb-5 rounded-lg"
					alt={post.title}
				/>
				<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">{post.title}</h2>
				<p className="mb-4 text-gray-500 dark:text-gray-400">{getExcerpt(post.content)}</p>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{new Date(post.published).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			</Link>
		</article>
	);
};

export default CardRelatedArticle;
