// __tests__/BlogPost.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import BlogPost from "@/app/blog/[articleId]/page";
import { useParams } from "next/navigation";

// Mock useParams
jest.mock("next/navigation", () => ({
	useParams: jest.fn(),
}));

// Mock fetch
(global.fetch as jest.Mock) = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () =>
			Promise.resolve({
				id: "123",
				author: {
					image: { url: "https://example.com/image.jpg" },
					displayName: "John Doe",
					about: "Software Engineer",
				},
				published: "2023-10-01",
				title: "Test Blog Post",
				content: "<p>This is a test blog post.</p>",
				images: [{ url: "https://example.com/image.jpg" }],
			}),
	})
);

describe("BlogPost", () => {
	beforeEach(() => {
		(useParams as jest.Mock).mockReturnValue({ articleId: "123" });
	});

	it("renders the component without crashing", () => {
		render(<BlogPost />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("displays loading state initially", () => {
		render(<BlogPost />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("displays error message if fetching fails", async () => {
		global.fetch = jest.fn(() => Promise.reject(new Error("Failed to fetch")));
		render(<BlogPost />);
		await waitFor(() => expect(screen.getByText("Failed to fetch blog content")).toBeInTheDocument());
	});

	it("renders the blog post content after fetching", async () => {
		render(<BlogPost />);
		await waitFor(() => expect(screen.getByText("Test Blog Post")).toBeInTheDocument());
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("Software Engineer")).toBeInTheDocument();
	});

	it("renders related posts", async () => {
		(global.fetch as jest.Mock) = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({
						items: [
							{
								id: "456",
								title: "Related Post 1",
								content: "<p>This is a related post.</p>",
								published: "2023-10-02",
								images: [],
							},
						],
					}),
			})
		);
		render(<BlogPost />);
		await waitFor(() => expect(screen.getByText("Related Post 1")).toBeInTheDocument());
	});
});
