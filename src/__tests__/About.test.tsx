// __tests__/About.test.tsx
import { render, screen } from "@testing-library/react";
import About from "@/app/about/page";

describe("About", () => {
	it("renders the component without crashing", () => {
		render(<About />);
		expect(screen.getByText("Hello, World! 👋")).toBeInTheDocument();
	});

	it("displays the markdown content correctly", () => {
		render(<About />);
		expect(screen.getByText("My name is Future")).toBeInTheDocument();
		expect(screen.getByText("Mechanical Engineering")).toBeInTheDocument();
		expect(screen.getByText("Food Recipe Website")).toBeInTheDocument();
	});
});
