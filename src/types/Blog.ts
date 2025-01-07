export interface BlogPost {
	id: string;
	blog: { id: string };
	title: string;
	content: string;
	published: string;
	images?: { url: string }[];
}
