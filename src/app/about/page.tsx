"use client";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Suspense } from "react";

const markdownText = `
# Hello, World! 👋

My name is **Future**, and I'm a **Mechanical Engineering** student with a passion for **Software Development**. I love building creative and functional web applications that solve real-world problems.

---

## 🎓 **Education & Background**

- **High School**: Graduated from **Mahidol Wittayanusorn School**, a prestigious institution known for fostering innovation and critical thinking in science and technology.
- **University**: Currently pursuing **Mechanical Engineering** at **Chulalongkorn University**, where I'm honing my problem-solving skills and technical expertise.
- **Passion**: While my academic focus is on mechanical systems, I've discovered a deep passion for **web development** and creating user-friendly applications.

---

## 🛠️ **Web Development Projects**

Here are some of the projects I’ve worked on:

### 1. **Food Recipe Website**
- **Description**: A platform for sharing and discovering delicious recipes from around the world.
- **Tech Stack**: React, Node.js, MongoDB
- **GitHub**: [Food Recipe GitHub Repo](https://github.com/yourusername/food-recipe)
- **Live Website**: [Food Recipe Live Demo](https://food-recipe-demo.com)

### 2. **Travel Website**
- **Description**: A travel guide website that helps users plan their trips and explore new destinations.
- **Tech Stack**: HTML, CSS, JavaScript, Bootstrap
- **GitHub**: [Travel Website GitHub Repo](https://github.com/yourusername/travel-website)
- **Live Website**: [Travel Website Live Demo](https://travel-website-demo.com)

### 3. **Portfolio Website**
- **Description**: A personal portfolio showcasing my projects, skills, and achievements.
- **Tech Stack**: React, Tailwind CSS
- **GitHub**: [Portfolio GitHub Repo](https://github.com/yourusername/portfolio)
- **Live Website**: [Portfolio Live Demo](https://yourportfolio.com)

### 4. **Quiz App**
- **Description**: An interactive quiz application with multiple categories and scoring system.
- **Tech Stack**: React, TypeScript, Firebase
- **GitHub**: [Quiz App GitHub Repo](https://github.com/yourusername/quiz-app)
- **Live Website**: [Quiz App Live Demo](https://quiz-app-demo.com)

### 5. **Landing Page**
- **Description**: A responsive landing page for a fictional product or service.
- **Tech Stack**: HTML, CSS, JavaScript
- **GitHub**: [Landing Page GitHub Repo](https://github.com/yourusername/landing-page)
- **Live Website**: [Landing Page Live Demo](https://landing-page-demo.com)

---

## 🚀 **Why Web Development?**

My background in **Mechanical Engineering** has taught me how to approach problems methodically and design efficient systems. I’ve applied these skills to **web development**, where I enjoy creating intuitive and visually appealing applications that enhance user experiences.

I’m particularly passionate about:
- **Frontend Development**: Building responsive and interactive user interfaces.
- **Full-Stack Development**: Developing end-to-end solutions that integrate frontend and backend technologies.
- **Continuous Learning**: Exploring new frameworks, libraries, and tools to improve my craft.

---

## 🌟 **Future Goals**

- **Expand My Portfolio**: Work on more diverse projects, including e-commerce platforms, social media apps, and AI-powered tools.
- **Collaborate with Others**: Join open-source projects or collaborate with developers to build impactful solutions.
- **Mentorship**: Share my knowledge and help others learn web development.

---

## 💡 **Let’s Connect!**

I’m always excited to collaborate on projects, share ideas, or discuss how we can create something amazing together. Feel free to reach out!

- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)
- **GitHub**: [GitHub Profile](https://github.com/yourusername)
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
