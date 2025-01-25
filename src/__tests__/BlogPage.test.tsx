// __tests__/Blogpage.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Blogpage from "@/app/page";

// Mock fetch
(global.fetch as jest.Mock) = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () =>
			Promise.resolve({
				items: [
					{
						id: "123",
						title: "Test Blog Post",
						content: "<p>This is a test blog post.</p>",
						published: "2023-10-01",
						images: [],
					},
				],
			}),
	})
);

describe("Blogpage", () => {
	it("renders the component without crashing", () => {
		render(<Blogpage />);
		expect(screen.getByText("Loading blogs...")).toBeInTheDocument();
	});

	it("displays loading state initially", () => {
		render(<Blogpage />);
		expect(screen.getByText("Loading blogs...")).toBeInTheDocument();
	});

	it("displays error message if fetching fails", async () => {
		global.fetch = jest.fn(() => Promise.reject(new Error("Failed to fetch")));
		render(<Blogpage />);
		await waitFor(() =>
			expect(screen.getByText("Failed to fetch blogs. Please try again later.")).toBeInTheDocument()
		);
	});

	it("renders blog posts after fetching", async () => {
		render(<Blogpage />);
		await waitFor(() => expect(screen.getByText("Test Blog Post")).toBeInTheDocument());
	});

	it("filters blog posts based on search term", async () => {
		render(<Blogpage />);
		await waitFor(() => expect(screen.getByText("Test Blog Post")).toBeInTheDocument());

		const searchInput = screen.getByPlaceholderText("Search blogs");
		fireEvent.change(searchInput, { target: { value: "Test" } });

		await waitFor(() => expect(screen.getByText("Test Blog Post")).toBeInTheDocument());
		fireEvent.change(searchInput, { target: { value: "Non-existent" } });

		await waitFor(() => expect(screen.getByText("No blogs found matching your search.")).toBeInTheDocument());
	});
});
