interface User {
  id: string;
  name: string | null;
  email: string;
}

export interface Reply {
  id: number;
  content: string;
  authorId: string;
  author: User;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: string;
  author: User;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  replies: Reply[];
}

export interface Thread {
  id: number;
  title: string;
  description: string;
  posts: Post[];
}
