import { Handlers, PageProps } from "$fresh/server.ts";
import { titlePurify } from "../lib/titlePurify.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import { gyazoSrcset, isGyazoUrl } from "../lib/gyazo.ts";
import { latsetArticles } from "../lib/latestArticles.ts";

type Page = {
  id: string;
  title: string;
  created: string;
  image: string | null;
};

export const handler: Handlers<Page[]> = {
  async GET(_, ctx) {
    const { data, error } = await latsetArticles();
    if (data) {
      return ctx.render(data);
    }
    if (error) {
      console.log(error);
    }
    return ctx.render([]);
  },
};

export default function Home({ data }: PageProps<Page[]>) {
  return (
    <div class="max-w-[600px] mx-auto">
      <Head>
        <title>I am Electrical machine</title>
      </Head>
      <ul>
        {data.map((page) => (
          <li key={page.id} class="my-8">
            <a href={`/pages/${titlePurify(page.title)}`}>
              {page.image
                ? isGyazoUrl(page.image)
                  ? (
                    <img
                      src={page.image}
                      srcset={gyazoSrcset(page.image)}
                      class="mb-2 rounded"
                    >
                    </img>
                  )
                  : (
                    <img src={page.image} class="mb-2 rounded">
                    </img>
                  )
                : (
                  <div class="h-[300px] text-center mx-auto font-bold flex justify-center items-center bg-black bg-opacity-[0.04] mb-2 rounded text-[2rem]">
                    {page.title}
                  </div>
                )}
              <div class="font-bold text-[1.2rem]">{page.title}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
