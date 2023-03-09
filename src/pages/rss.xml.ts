import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { titlePurify } from "lib/titlePurify";
import type { Page } from "lib/types";

export const get: APIRoute = async () => {
  const res = await fetch("https://kbystk-w-api.deno.dev/latest_articles?p=0");
  const json = await res.json();
  const pages = json.payload as Page[];
  return rss({
    title: "I am Electrical machine",
    description: "Notes from jigsaw",
    site: "https://w.kbys.tk",
    items: pages.map((page) => {
      return {
        link: `https://w.kbys.tk/pages/${titlePurify(page.title)}`,
        title: page.title,
        pubDate: new Date(page.created),
      };
    }),
  });
};
