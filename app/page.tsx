// Craft Imports
import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Next.js Imports
import Link from "next/link";

// Icons
import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";
import {getAllPosts} from "@/lib/wordpress";

// This page is using the craft.tsx component and design system
export default async function Home() {
  return (
    <Section>
      <Container>
        <ToDelete />
      </Container>
    </Section>
  );
}

// This is just some example TSX
const ToDelete = async () => {
  return (
    <main className="space-y-6">
      <Prose>
        <h1>
          <Balancer>Headless WordPress built with the Next.js</Balancer>
        </h1>

        <p>
          This is <a href="https://github.com/9d8dev/next-wp">next-wp</a>,
          created as a way to build WordPress sites with Next.js at rapid speed.
          This starter is designed with{" "}
          <a href="https://ui.shadcn.com">shadcn/ui</a>,{" "}
          <a href="https://craft-ds.com">craft-ds</a>, and Tailwind CSS. Use{" "}
          <a href="https://components.work">brijr/components</a> to build your
          site with prebuilt components. The data fetching and typesafety is
          handled in <code>lib/wordpress.ts</code> and{" "}
          <code>lib/wordpress.d.ts</code>.
        </p>
      </Prose>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts"
        >
          <Pen size={32} />
          <span>
            Posts{" "}
            <span className="block text-sm text-muted-foreground">
              All posts from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/pages"
        >
          <File size={32} />
          <span>
            Pages{" "}
            <span className="block text-sm text-muted-foreground">
              Custom pages from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/authors"
        >
          <User size={32} />
          <span>
            Authors{" "}
            <span className="block text-sm text-muted-foreground">
              List of the authors from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/tags"
        >
          <Tag size={32} />
          <span>
            Tags{" "}
            <span className="block text-sm text-muted-foreground">
              Content by tags from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/categories"
        >
          <Diamond size={32} />
          <span>
            Categories{" "}
            <span className="block text-sm text-muted-foreground">
              Categories from your WordPress
            </span>
          </span>
        </Link>
        <a
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="https://github.com/9d8dev/next-wp/blob/main/README.md"
        >
          <Folder size={32} />
          <span>
            Documentation{" "}
            <span className="block text-sm text-muted-foreground">
              How to use `next-wp`
            </span>
          </span>
        </a>
      </div>
    </main>
  );
};
