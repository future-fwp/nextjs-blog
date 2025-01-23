"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
type CommentType = {
	id: string;
	content: string;
	published: string;
	author: {
		displayName: string;
		image: {
			url: string;
		};
	};
};

import Image from 'next/image'; 

const Comment = () => {
	const { articleId } = useParams();

	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

	console.log(apiKey, "apiKey");

	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await fetch(
					`https://www.googleapis.com/blogger/v3/blogs/2399953/posts/6069922188027612413/comments?key=${apiKey}`
				);

				if (!res.ok) {
					throw new Error("Failed to fetch comments");
				}

				const data = await res.json();
				setComments(data.items || []); // Use `items` if it exists, otherwise set an empty array
				console.log(comments);
			} catch (err) {
				console.error("Error fetching comments:", err);
			}
		};

		if (articleId) {
			fetchComments();
		}
	}, [comments, apiKey, articleId]);

	return (
		<section>
			<h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Comments</h2>
			{comments.length > 0 ? (
				comments.map((comment: CommentType) => (
					<article
						key={comment.id}
						className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
					>
						<footer className="flex justify-between items-center mb-2">
							<div className="flex items-center">
								<p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
									<Image
										className="mr-2 w-6 h-6 rounded-full"
										src={comment.author.image?.url || "https://via.placeholder.com/40"}
										alt={comment.author.displayName}
									/>
									{comment.author.displayName}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									<time dateTime={comment.published}>{new Date(comment.published).toLocaleDateString()}</time>
								</p>
							</div>
						</footer>
						<p
							dangerouslySetInnerHTML={{ __html: comment.content }}
							className="text-gray-900 dark:text-white"
						></p>
						<div className="flex items-center mt-4 space-x-4">
							<button
								type="button"
								className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
							>
								<svg
									className="mr-1.5 w-3 h-3"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 18"
								>
									<path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
								</svg>
								Reply
							</button>
						</div>
					</article>
				))
			) : (
				<p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
			)}
		</section>
	);
};

export default Comment;
