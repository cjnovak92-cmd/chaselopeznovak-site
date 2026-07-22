import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, extname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { site } from "../lib/content";
import { socialImage } from "../lib/metadata";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const productionOrigin = new URL(site.url).origin;
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const expectedFooterLines = [
  "Conceptualized, Designed, Directed and all Words Written by Chase Lopez Novak.",
  "Engineered with OpenAI Codex.",
  "Built with Next.js, TypeScript, and Tailwind CSS.",
  "Deployed and hosted on Vercel.",
  "Version 1.0",
  "© 2026 Chase Lopez Novak. All rights reserved.",
];

type HtmlAttributes = Record<string, string>;

function decodeHtml(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getTags(html: string, tagName: string): HtmlAttributes[] {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];

  return tags.map((tag) => {
    const attributes: HtmlAttributes = {};

    for (const match of tag.matchAll(/\s([^\s=/>]+)="([^"]*)"/g)) {
      attributes[match[1].toLowerCase()] = decodeHtml(match[2]);
    }

    return attributes;
  });
}

function getMetadataValues(
  html: string,
  attribute: "name" | "property",
  value: string,
): string[] {
  return getTags(html, "meta")
    .filter((tag) => tag[attribute] === value)
    .map((tag) => tag.content);
}

function getCanonical(html: string): string {
  const canonicalTags = getTags(html, "link").filter(
    (tag) => tag.rel === "canonical",
  );

  assert.equal(canonicalTags.length, 1, "expected exactly one canonical link");
  return canonicalTags[0].href;
}

function stripMarkup(fragment: string): string {
  return decodeHtml(
    fragment
      .replaceAll(/<!--[\s\S]*?-->/g, "")
      .replaceAll(/<[^>]+>/g, " "),
  )
    .replaceAll(/\s+/g, " ")
    .replaceAll(/\s+([.,!?;:])/g, "$1")
    .trim();
}

function getDocumentIds(html: string): string[] {
  return [...html.matchAll(/\sid="([^"]+)"/g)].map(([, id]) =>
    decodeHtml(id),
  );
}

function getFooterLines(html: string): string[] {
  const footer = [
    ...html.matchAll(/<footer\b[^>]*>([\s\S]*?)<\/footer>/g),
  ].at(-1)?.[1];
  assert(footer, "page should render the shared footer");

  return [...footer.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(
    ([, line]) => stripMarkup(line),
  );
}

async function getAvailablePort(): Promise<number> {
  const probe = createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");

  const address = probe.address();
  assert(address && typeof address === "object");
  const { port } = address;

  probe.close();
  await once(probe, "close");
  return port;
}

async function waitForServer(
  server: ChildProcessWithoutNullStreams,
  baseUrl: URL,
  output: () => string,
): Promise<void> {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`production server exited early:\n${output()}`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        await response.body?.cancel();
        return;
      }
    } catch {
      // The server is still starting.
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, 100));
  }

  throw new Error(`production server did not become ready:\n${output()}`);
}

async function stopServer(server: ChildProcessWithoutNullStreams): Promise<void> {
  if (server.exitCode !== null) {
    return;
  }

  server.kill("SIGTERM");

  await Promise.race([
    once(server, "exit"),
    new Promise((resolveDelay) => setTimeout(resolveDelay, 5_000)),
  ]);

  if (server.exitCode === null) {
    server.kill("SIGKILL");
    await once(server, "exit");
  }
}

async function collectSourceFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(path)));
    } else if ([".csv", ".ts", ".tsx"].includes(extname(entry.name))) {
      files.push(path);
    }
  }

  return files;
}

function localUrl(baseUrl: URL, productionUrl: string): URL {
  const parsed = new URL(productionUrl, productionOrigin);
  assert.equal(
    parsed.origin,
    productionOrigin,
    `expected an internal production URL: ${productionUrl}`,
  );
  return new URL(`${parsed.pathname}${parsed.search}`, baseUrl);
}

async function assertPngResponse(response: Response, label: string) {
  assert.equal(response.status, 200, `${label} should resolve successfully`);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^image\/png(?:;|$)/i,
    `${label} should use the PNG content type`,
  );

  const body = Buffer.from(await response.arrayBuffer());
  assert(
    body.subarray(0, pngSignature.length).equals(pngSignature),
    `${label} should contain PNG bytes`,
  );
}

test(
  "Version 1.0 production routes and metadata are launch-ready",
  { timeout: 60_000 },
  async () => {
    assert(
      existsSync(join(repositoryRoot, ".next", "BUILD_ID")),
      "run `npm run build` before the launch smoke test",
    );
    assert.equal(socialImage.url, "/opengraph-image.png");
    assert.equal(new URL(site.url).toString(), "https://chaselopeznovak.com/");

    const port = await getAvailablePort();
    const baseUrl = new URL(`http://127.0.0.1:${port}`);
    const nextBinary = join(
      repositoryRoot,
      "node_modules",
      "next",
      "dist",
      "bin",
      "next",
    );
    const server = spawn(
      process.execPath,
      [nextBinary, "start", "--hostname", "127.0.0.1", "--port", String(port)],
      {
        cwd: repositoryRoot,
        env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      },
    );
    let serverOutput = "";
    server.stdout.on("data", (chunk) => {
      serverOutput += chunk.toString();
    });
    server.stderr.on("data", (chunk) => {
      serverOutput += chunk.toString();
    });

    try {
      await waitForServer(server, baseUrl, () => serverOutput);

      const configuredImageResponse = await fetch(
        new URL(socialImage.url, baseUrl),
      );
      await assertPngResponse(configuredImageResponse, "configured social image");

      const legacyImageResponse = await fetch(
        new URL("/opengraph-image", baseUrl),
      );
      assert.equal(legacyImageResponse.status, 404);
      await legacyImageResponse.body?.cancel();

      const robotsResponse = await fetch(new URL("/robots.txt", baseUrl));
      assert.equal(robotsResponse.status, 200);
      assert.match(robotsResponse.headers.get("content-type") ?? "", /^text\/plain/i);
      assert.match(
        await robotsResponse.text(),
        /Sitemap: https:\/\/chaselopeznovak\.com\/sitemap\.xml/,
      );

      const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));
      assert.equal(sitemapResponse.status, 200);
      assert.match(
        sitemapResponse.headers.get("content-type") ?? "",
        /^(?:application|text)\/xml/i,
      );
      const sitemapXml = await sitemapResponse.text();
      const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
        ([, url]) => decodeHtml(url),
      );
      assert(sitemapUrls.length > 0, "sitemap should list public routes");
      assert(
        sitemapUrls.includes(`${productionOrigin}/manifesto`),
        "sitemap should list the manifesto",
      );

      const pageHtml = new Map<string, string>();
      for (const sitemapUrl of sitemapUrls) {
        const productionUrl = new URL(sitemapUrl);
        assert.equal(productionUrl.origin, productionOrigin);

        const response = await fetch(localUrl(baseUrl, sitemapUrl));
        assert.equal(response.status, 200, `${sitemapUrl} should resolve`);
        assert.match(
          response.headers.get("content-type") ?? "",
          /^text\/html/i,
        );
        const html = await response.text();
        pageHtml.set(productionUrl.pathname, html);
        assert.deepEqual(getFooterLines(html), expectedFooterLines);

        assert.equal(
          new URL(getCanonical(html)).toString(),
          productionUrl.toString(),
        );

        const openGraphUrls = getMetadataValues(html, "property", "og:url");
        assert.deepEqual(
          openGraphUrls.map((url) => new URL(url).toString()),
          [productionUrl.toString()],
        );

        const openGraphImages = getMetadataValues(
          html,
          "property",
          "og:image",
        );
        const twitterImages = getMetadataValues(
          html,
          "name",
          "twitter:image",
        );
        assert.equal(openGraphImages.length, 1, "expected one Open Graph image");
        assert.equal(twitterImages.length, 1, "expected one Twitter/X image");

        for (const [label, imageUrl] of [
          ["Open Graph image", openGraphImages[0]],
          ["Twitter/X image", twitterImages[0]],
        ] as const) {
          const parsedImageUrl = new URL(imageUrl);
          assert.equal(parsedImageUrl.origin, productionOrigin);
          assert.equal(parsedImageUrl.pathname, socialImage.url);
          await assertPngResponse(
            await fetch(localUrl(baseUrl, imageUrl)),
            label,
          );
        }
      }

      const homeHtml = pageHtml.get("/");
      assert(homeHtml, "sitemap should include the homepage");

      const homepageHeading = getTags(homeHtml, "h1")[0];
      assert.equal(homepageHeading["aria-label"], site.name);
      assert.equal(getTags(homeHtml, "img")[0].alt, "");
      assert.match(
        homeHtml,
        /%2Fimages%2Fbrand%2Fchase-lopez-novak-wordmark\.png/,
      );
      assert.match(homeHtml, /wordmark--horizontal/);
      assert(
        getTags(homeHtml, "img").some(
          (image) => image.alt === "Chase Lopez Novak smiling.",
        ),
        "shared colophon should include the portrait description",
      );

      const storyHtml = pageHtml.get(
        "/creative-work/stories/the-information-wars",
      );
      assert(storyHtml, "sitemap should include The Information Wars");
      const storyHeading = getTags(storyHtml, "h1")[0];
      assert.equal(storyHeading["aria-label"], "The Information Wars");
      const storyHeadingMarkup = storyHtml.match(
        /<h1\b[^>]*story-detail-title--stacked[^>]*>([\s\S]*?)<\/h1>/,
      );
      assert(storyHeadingMarkup, "The Information Wars title should be stacked");
      assert.deepEqual(
        [...storyHeadingMarkup[1].matchAll(/<span\b[^>]*>([\s\S]*?)<\/span>/g)].map(
          ([, line]) => stripMarkup(line),
        ),
        ["The", "Information", "Wars"],
      );

      for (const [relation, expectedPath] of [
        ["icon", "/icon.svg"],
        ["apple-touch-icon", "/apple-icon.png"],
      ] as const) {
        const iconLinks: HtmlAttributes[] = getTags(homeHtml, "link").filter(
          (tag) => tag.rel === relation,
        );
        assert.equal(iconLinks.length, 1, `expected one ${relation} link`);
        assert.equal(new URL(iconLinks[0].href, baseUrl).pathname, expectedPath);
      }

      const structuredDataMatch = homeHtml.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      );
      assert(structuredDataMatch, "homepage should include identity structured data");
      const structuredData = JSON.parse(structuredDataMatch[1]) as {
        "@graph": Array<{ "@type": string; url: string }>;
      };
      assert.deepEqual(
        structuredData["@graph"].map((entry) => [entry["@type"], entry.url]),
        [
          ["WebSite", site.url],
          ["Person", site.url],
        ],
      );

      for (const [path, expectedType] of [
        ["/icon.svg", /^image\/svg\+xml/i],
        ["/apple-icon.png", /^image\/png/i],
      ] as const) {
        const response = await fetch(new URL(path, baseUrl));
        assert.equal(response.status, 200, `${path} should resolve`);
        assert.match(response.headers.get("content-type") ?? "", expectedType);
        await response.body?.cancel();
      }

      const sourceFiles = (
        await Promise.all(
          ["app", "components", "content", "data"].map((directory) =>
            collectSourceFiles(join(repositoryRoot, directory)),
          ),
        )
      ).flat();
      const publicImagePaths = new Set<string>();
      for (const file of sourceFiles) {
        const source = await readFile(file, "utf8");
        for (const match of source.matchAll(
          /\/images\/[a-z0-9_./-]+\.(?:png|svg|webp)/gi,
        )) {
          publicImagePaths.add(match[0]);
        }
      }

      assert(publicImagePaths.size > 0, "expected public image references");
      for (const imagePath of publicImagePaths) {
        const response = await fetch(new URL(imagePath, baseUrl));
        assert.equal(response.status, 200, `${imagePath} should resolve`);
        assert.match(
          response.headers.get("content-type") ?? "",
          /^image\//i,
          `${imagePath} should return an image`,
        );
        await response.body?.cancel();
      }

      for (const [pathname, html] of pageHtml) {
        for (const anchor of getTags(html, "a")) {
          if (!anchor.href) {
            continue;
          }

          const target = new URL(
            anchor.href,
            new URL(pathname, `${productionOrigin}/`),
          );
          if (target.origin !== productionOrigin) {
            continue;
          }

          const response = await fetch(
            new URL(`${target.pathname}${target.search}`, baseUrl),
          );
          assert.equal(
            response.status,
            200,
            `internal link ${anchor.href} from ${pathname} should resolve`,
          );

          if (target.hash) {
            const targetHtml = await response.text();
            const id = decodeURIComponent(target.hash.slice(1));
            assert(
              getDocumentIds(targetHtml).includes(id),
              `internal link ${anchor.href} should target an existing id`,
            );
          } else {
            await response.body?.cancel();
          }
        }
      }

      const missingResponse = await fetch(
        new URL("/version-1-launch-smoke-missing", baseUrl),
      );
      assert.equal(missingResponse.status, 404);
      await missingResponse.body?.cancel();
    } finally {
      await stopServer(server);
    }
  },
);
