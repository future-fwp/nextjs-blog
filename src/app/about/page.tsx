"use client";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Suspense } from "react";

const markdownText = `
# Hello world

 My name is future

## I'm Mechanical Engineering
`;

const page = () => {
	return (
		<div className="max-w-[1200px] mx-auto">
			<Suspense fallback={<div>Loading...</div>}>
				<ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownText}</ReactMarkdown>
			</Suspense>
		</div>
	);
};

export default page;
