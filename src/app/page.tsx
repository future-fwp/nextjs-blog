"use client";
import { useEffect, useState } from "react";
// import { features } from "@/utils/data";
import Link from "next/link";
import type { BlogPost } from "@/types/Blog";
import Image from 'next/image'; 

function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
}

export default function Blogpage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]); // Store all blogs
	const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]); // Store filtered blogs
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

	// First useEffect to fetch all blogs on component mount
	useEffect(() => {
		const fetchBlogs = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=${apiKey}`);

				if (!res.ok) throw new Error("Failed to fetch blogs");

				const data = await res.json();
				console.log("Raw API response:", data); // Debug log

				if (!data.items) {
					console.log("No items in response");
					setAllBlogs([]);
					setFilteredBlogs([]);
					return;
				}

				const transformedBlogs = data.items.map((item: any) => ({
					id: item.id,
					blog: { id: item.blog.id },
					title: item.title,
					content: item.content,
					published: item.published,
					images: item.images || [],
				}));

				setAllBlogs(transformedBlogs);
				setFilteredBlogs(transformedBlogs); // Initially show all blogs
			} catch (error) {
				console.error("Error fetching blogs:", error);
				setError("Failed to fetch blogs. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchBlogs();
	}, []); // Only run on mount

	// Second useEffect to handle search filtering
	useEffect(() => {
		if (debouncedSearch) {
			const filtered = allBlogs.filter(
				(blog) =>
					blog.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
					blog.content.toLowerCase().includes(debouncedSearch.toLowerCase())
			);
			setFilteredBlogs(filtered);
		} else {
			setFilteredBlogs(allBlogs); // If no search term, show all blogs
		}
	}, [debouncedSearch, allBlogs]);

	return (
		<>
			<section className="relative">
				{/* Hero section with search */}
				<div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
					<div className="space-y-5 max-w-4xl mx-auto text-center">
						<h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
							Empower Your Ideas with Insights and Stories
						</h2>
						<p className="max-w-2xl mx-auto text-gray-400">
							Explore our curated blogs for actionable advice, industry trends, and motivational success stories.
						</p>
						<form
							onSubmit={(e) => e.preventDefault()}
							className="justify-center items-center gap-x-3 sm:flex"
						>
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search blogs"
								className="w-full px-3 py-2.5 text-gray-400 bg-gray-700 focus:bg-gray-900 duration-150 outline-none rounded-lg shadow sm:max-w-sm sm:w-auto"
							/>
						</form>
					</div>
				</div>
				<div
					className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[100px] sm:max-w-md md:max-w-lg"
					style={{
						background: "linear-gradient(45deg, #00425E 0%, #001A3E 75%, #461438 100%)",
					}}
				/>
			</section>

			<section className="">
				<div className="max-w-screen-xl mx-auto px-4 md:px-8">
					<div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
						<h1 className="text-text text-3xl font-extrabold sm:text-4xl">Featured Blogs</h1>
						<p className="text-text">Handpicked blogs to keep you informed and inspired.</p>
					</div>

					{isLoading && <div className="text-center py-10">Loading blogs...</div>}

					{error && <div className="text-red-500 text-center py-10">{error}</div>}

					{!isLoading && !error && filteredBlogs.length === 0 && (
						<div className="text-center py-10">No blogs found matching your search.</div>
					)}

					{!isLoading && !error && filteredBlogs.length > 0 && (
						<ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
							{filteredBlogs.map((blog) => (
								<li
									key={blog.id}
									className="w-full mx-auto group sm:max-w-sm"
								>
									<Link href={`/blog/${blog.id}`}>
										<Image
											src={blog.images?.[0]?.url || "/api/placeholder/400/300"}
											loading="lazy"
											alt={blog.title}
											className="w-full rounded-lg"
										/>
										<div className="mt-3 space-y-2">
											<span className="block text-secondary text-sm">
												{new Date(blog.published).toLocaleDateString()}
											</span>
											<h3 className="text-lg text-black dark:text-white duration-150 group-hover:text-secondary font-semibold">
												{blog.title}
											</h3>
											<p className="text-black dark:text-gray-400 text-sm duration-150 group-hover:text-white">
												{blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
											</p>
										</div>
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			</section>
		</>
	);
};
