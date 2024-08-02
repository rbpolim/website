import { Post } from "@/components/post";
import { Heading } from "@/components/heading";

import { allBlogs } from "contentlayer/generated";

const posts = [
  {
    title: "How to create a design system",
    description: "A step-by-step guide to create a design system from scratch.",
    date: "November 27, 2021",
    slug: "how-to-create-a-design-system",
  },
  {
    title: "The importance of accessibility",
    description:
      "Why accessibility is important and how to make your website accessible.",
    date: "November 27, 2021",
    slug: "the-importance-of-accessibility",
  },
  {
    title: "How to start a start up",
    description: "A guide to start a start up from scratch.",
    date: "November 27, 2021",
    slug: "how-to-start-a-start-up",
  },
  {
    title: "The importance of user experience",
    description: "Why user experience is important and how to improve it.",
    date: "November 27, 2021",
    slug: "the-importance-of-user-experience",
  },
  {
    title: "The importance of developer experience",
    description: "Why developer experience is important and how to improve it.",
    date: "November 27, 2021",
    slug: "the-importance-of-developer-experience",
  },
];

export default function WritingPage() {
  console.log(allBlogs);

  return (
    <section>
      <Heading title="writing" description="Brain dumps. Thoughts. Ideas." />
      <ul className="mt-8">
        {posts.map((post) => (
          <Post key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  );
}
