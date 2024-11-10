export interface Reply {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
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
