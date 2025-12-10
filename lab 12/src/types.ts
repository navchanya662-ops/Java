
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type PostsState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Post[] }
  | { status: "error"; message: string };
