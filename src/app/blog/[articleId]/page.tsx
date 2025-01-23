"use client";
import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import Comment from "@/components/Comment";
import Image from 'next/image'; 

interface BlogPost {
	id: string | number;
	author: {
		image: { url: string };
		displayName: string;
		about: string;
	};
	published: string;
	title: string;
	content: string;
	images: { url: string }[];
}

const BlogPost = () => {
	const { articleId } = useParams();

	const [post, setPost] = useState<BlogPost | null>(null);
	const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

	useEffect(() => {
		const fetchBlogPost = async () => {
			setLoading(true);
			try {
				// Fetch the specific post
				const allPostsRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=${apiKey}`);

				// Fetch all posts for related articles
				const postRes = await fetch(
					`https://www.googleapis.com/blogger/v3/blogs/2399953/posts/${articleId}?key=${apiKey}`
				);

				if (!postRes.ok || !allPostsRes.ok) {
					throw new Error("Failed to fetch blog content");
				}

				const postData = await postRes.json();
				console.log(postData, "data posted");
				const allPosts = await allPostsRes.json();
				console.log(allPosts, "allPosts");

				// Filter out current post and get 4 related posts
				const filtered = allPosts.items.filter((item: BlogPost) => item.id !== articleId).slice(0, 4);

				setPost(postData);
				console.log(post, "post data");

				setRelatedPosts(filtered);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (articleId) {
			fetchBlogPost();
		}
	}, [articleId, apiKey]);

	if (loading) {
		return <div className="flex justify-center items-center h-screen">Loading...</div>;
	}

	if (error) {
		return <div className="text-red-500 text-center py-10">{error}</div>;
	}

	if (!post) {
		return <div className="text-center py-10">Post not found</div>;
	}

	return (
		<div className="border h-screen">
			<main>
				<div className="flex flex-col lg:flex-row md:justify-between">
					<main className="pt-8 md:flex-1 border pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
						<div className="flex justify-between px-4 mx-auto max-w-screen-xl">
							<article className="mx-auto relative max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
								<header className="mb-4 lg:mb-6 not-format">
									<address className="flex mb-6 not-italic">
										<div className="p-8 flex flex-col gap-8 w-full items-center text-sm text-gray-900 dark:text-white">
											<Image
												className="mr-4 w-16 h-16 rounded-full"
												src={post.author?.image?.url || "/api/placeholder/64/64"}
												alt={post.author?.displayName}
											/>
											<div className="flex flex-col">
												<a
													href="#"
													rel="author"
													className="text-xl font-bold text-gray-900 dark:text-white"
												>
													{post.author?.displayName}
												</a>
												<p className="text-base text-gray-500 dark:text-gray-400">
													{post.author?.about || "Blog Author"}
												</p>
												<p className="text-base text-gray-500 dark:text-gray-400">
													<time
														dateTime={post.published}
														title={new Date(post.published).toLocaleDateString()}
													>
														{new Date(post.published).toLocaleDateString()}
													</time>
												</p>
											</div>
										</div>
									</address>
									<h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
										{post.title}
									</h1>
								</header>

								<div dangerouslySetInnerHTML={{ __html: post.content }} />

								<section className="not-format">
									<div className="flex justify-between items-center mb-6">
										<h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
											Discussion
										</h2>
									</div>
									<form className="mb-6">
										<div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
											<textarea
												id="comment"
												rows={6}
												className="px-0 w-full outline-none text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
												placeholder="Write a comment..."
												required
											/>
										</div>
										<button
											type="submit"
											className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
										>
											Post comment
										</button>
									</form>
									<Comment />
								</section>
							</article>
						</div>
					</main>

					<aside
						aria-label="Related articles"
						className="py-8 lg:py-24 border bg-gray-50 dark:bg-gray-800"
					>
						<div className="px-4 mx-auto max-w-screen-xl">
							<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
							<div className="flex justify-center flex-wrap gap-8 lg:block">
								{relatedPosts.map(
									(relatedPost: { id: string; title: string; published: string; content: string }) => (
										<div
											key={relatedPost.id}
											className="p-4 max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-4"
										>
											<a href={`/blog/${relatedPost.id}`}>
												<h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
													{relatedPost.title}
												</h3>
												<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
													{relatedPost.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
												</p>
												<div className="text-sm text-gray-500">
													{new Date(relatedPost.published).toLocaleDateString()}
												</div>
											</a>
										</div>
									)
								)}
							</div>
						</div>
					</aside>
				</div>
			</main>
		</div>
	);
};

export default BlogPost;
