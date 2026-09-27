import type { Config, Context } from "@netlify/functions";
import { getDeployStore, getStore } from "@netlify/blobs";

const ALBUMS = new Set(["team", "lilit", "maria", "stepan", "albert", "gevorg"]);
const MAX_FILE_SIZE = 4 * 1024 * 1024;

function getGalleryStore() {
  if (Netlify.context?.deploy.context === "production") {
    return getStore("prodigi-gallery", { consistency: "strong" });
  }
  return getDeployStore("prodigi-gallery");
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function validAlbum(value: string | null) {
  return value && ALBUMS.has(value) ? value : null;
}

function detectImage(bytes: Uint8Array): { mime: string; ext: string } | null {
  if (bytes.length >= 8 &&
      bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
      bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a) {
    return { mime: "image/png", ext: "png" };
  }

  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }

  if (bytes.length >= 12 &&
      bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return { mime: "image/webp", ext: "webp" };
  }

  return null;
}

function mimeFromKey(key: string) {
  if (key.endsWith(".png")) return "image/png";
  if (key.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export default async (req: Request, _context: Context) => {
  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "list";
    const store = getGalleryStore();

    if (req.method === "GET" && action === "list") {
      const album = validAlbum(url.searchParams.get("album"));
      if (!album) return json({ error: "Unknown album" }, 400);

      const prefix = `photos/${album}/`;
      const { blobs } = await store.list({ prefix });
      const photos = blobs
        .map(({ key }) => ({
          key,
          url: `/api/gallery?action=photo&key=${encodeURIComponent(key)}`
        }))
        .sort((a, b) => b.key.localeCompare(a.key));

      return json({ photos });
    }

    if (req.method === "GET" && action === "photo") {
      const key = url.searchParams.get("key") || "";
      if (!key.startsWith("photos/") || key.includes("..")) {
        return new Response("Not found", { status: 404 });
      }

      const data = await store.get(key, { type: "arrayBuffer" });
      if (!data) return new Response("Not found", { status: 404 });

      return new Response(data, {
        headers: {
          "content-type": mimeFromKey(key),
          "cache-control": "public, max-age=31536000, immutable",
          "x-content-type-options": "nosniff"
        }
      });
    }

    if (req.method === "POST") {
      const form = await req.formData();
      const album = validAlbum(String(form.get("album") || ""));
      const file = form.get("file");

      if (!album) return json({ error: "Unknown album" }, 400);
      if (!file || typeof file === "string" || typeof file.arrayBuffer !== "function") {
        return json({ error: "Choose an image" }, 400);
      }
      if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
        return json({ error: "Each image must be 4 MB or smaller" }, 413);
      }

      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const detected = detectImage(bytes);
      if (!detected) {
        return json({ error: "Only JPG, PNG and WebP images are allowed" }, 415);
      }

      const key = `photos/${album}/${Date.now()}-${crypto.randomUUID()}.${detected.ext}`;
      await store.set(key, buffer);

      return json({
        ok: true,
        photo: {
          key,
          url: `/api/gallery?action=photo&key=${encodeURIComponent(key)}`
        }
      }, 201);
    }

    return new Response("Method not allowed", { status: 405 });
  } catch (error) {
    console.error("gallery function error", error);
    return json({ error: "Gallery is temporarily unavailable" }, 500);
  }
};

export const config: Config = {
  path: "/api/gallery"
};
