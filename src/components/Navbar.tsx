"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { navigation } from "@/utils/data";


export default function Navbar() {
	const [state, setState] = useState(false);

	// Replace  paths with your paths

	// useEffect(() => {
	// 	const handleClick = (e: MouseEvent) => {
	// 		const target = e.target as HTMLElement | null;
	// 		const checkbox = document.querySelector<HTMLInputElement>("#menu-toggle");
	// 		``;
	// 		if (checkbox && !target?.closest(".menu-btn") && !target?.closest(".menu")) {
	// 			checkbox.checked = false; // Close the menu
	// 		}
	// 	};

	// 	document.addEventListener("click", handleClick);

	// 	return () => {
	// 		document.removeEventListener("click", handleClick); // Cleanup
	// 	};
	// }, []);
	return (
		<nav
			className={`bg-black text-white pb-5 md:text-sm ${
				state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""
			}`}
		>
			<div className="gap-x-14 max-md:bg-black flex justify-between items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
				<div className="flex items-center py-5 md:block">
					<Link
						href="/"
						className="text-2xl font-medium"
					>
						MyFutureBlog
					</Link>
				</div>
				<div className="md:hidden">
					<button
						className="menu-btn "
						onClick={() => setState(!state)}
					>
						{state ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						)}
					</button>
				</div>
				<div className={`max-md:hidden items-center mt-8 md:mt-0 md:flex ${state ? "block" : "hidden"} `}>
					<ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
						{navigation.map((item, idx) => {
							return (
								<li
									key={idx}
									className="text-white list-none"
								>
									<Link
										href={item.path}
										className="block"
									>
										{item.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{state && (
					<ul className="absolute p-3 md:hidden bg-black w-[calc(100%-2.5rem)] top-20 space-y-3">
						{navigation.map((item, idx) => {
							return (
								<li
									key={idx}
									className="text-white list-none"
								>
									<Link
										href={item.path}
										className="block"
									>
										{item.title}
									</Link>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</nav>
	);
};

