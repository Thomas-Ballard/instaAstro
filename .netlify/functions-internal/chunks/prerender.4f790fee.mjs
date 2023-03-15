import 'kleur/colors';
import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import mime from 'mime';
import 'node:stream';
/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, b as addAttribute, f as renderComponent } from './astro.ac8074ba.mjs';
import 'html-escaper';
import { persistentAtom } from '@nanostores/persistent';
import { i as isRemoteImage, a as isSSRService, p as parseAspectRatio, e as extname, $ as $$Layout } from './pages/all.15406a6c.mjs';
/* empty css                          *//* empty css                            */import dayjs from 'dayjs';

function resolveSize(transform) {
  if (transform.width && transform.height) {
    return transform;
  }
  if (!transform.width && !transform.height) {
    throw new Error(`"width" and "height" cannot both be undefined`);
  }
  if (!transform.aspectRatio) {
    throw new Error(
      `"aspectRatio" must be included if only "${transform.width ? "width" : "height"}" is provided`
    );
  }
  let aspectRatio;
  if (typeof transform.aspectRatio === "number") {
    aspectRatio = transform.aspectRatio;
  } else {
    const [width, height] = transform.aspectRatio.split(":");
    aspectRatio = Number.parseInt(width) / Number.parseInt(height);
  }
  if (transform.width) {
    return {
      ...transform,
      width: transform.width,
      height: Math.round(transform.width / aspectRatio)
    };
  } else if (transform.height) {
    return {
      ...transform,
      width: Math.round(transform.height * aspectRatio),
      height: transform.height
    };
  }
  return transform;
}
async function resolveTransform(input) {
  if (typeof input.src === "string") {
    return resolveSize(input);
  }
  const metadata = "then" in input.src ? (await input.src).default : input.src;
  let { width, height, aspectRatio, background, format = metadata.format, ...rest } = input;
  if (!width && !height) {
    width = metadata.width;
    height = metadata.height;
  } else if (width) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    height = height || Math.round(width / ratio);
  } else if (height) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    width = width || Math.round(height * ratio);
  }
  return {
    ...rest,
    src: metadata.src,
    width,
    height,
    aspectRatio,
    format,
    background
  };
}
async function getImage(transform) {
  var _a, _b, _c;
  if (!transform.src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  let loader = (_a = globalThis.astroImage) == null ? void 0 : _a.loader;
  if (!loader) {
    const { default: mod } = await import('./pages/all.15406a6c.mjs').then(n => n.s).catch(() => {
      throw new Error(
        "[@astrojs/image] Builtin image loader not found. (Did you remember to add the integration to your Astro config?)"
      );
    });
    loader = mod;
    globalThis.astroImage = globalThis.astroImage || {};
    globalThis.astroImage.loader = loader;
  }
  const resolved = await resolveTransform(transform);
  const attributes = await loader.getImageAttributes(resolved);
  const isDev = (_b = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":true,"SITE":undefined},{_:process.env._,SSR:true,}))) == null ? void 0 : _b.DEV;
  const isLocalImage = !isRemoteImage(resolved.src);
  const _loader = isDev && isLocalImage ? globalThis.astroImage.defaultLoader : loader;
  if (!_loader) {
    throw new Error("@astrojs/image: loader not found!");
  }
  const { searchParams } = isSSRService(_loader) ? _loader.serializeTransform(resolved) : globalThis.astroImage.defaultLoader.serializeTransform(resolved);
  const imgSrc = !isLocalImage && resolved.src.startsWith("//") ? `https:${resolved.src}` : resolved.src;
  let src;
  if (/^[\/\\]?@astroimage/.test(imgSrc)) {
    src = `${imgSrc}?${searchParams.toString()}`;
  } else {
    searchParams.set("href", imgSrc);
    src = `/_image?${searchParams.toString()}`;
  }
  if ((_c = globalThis.astroImage) == null ? void 0 : _c.addStaticImage) {
    src = globalThis.astroImage.addStaticImage(resolved);
  }
  return {
    ...attributes,
    src
  };
}

async function resolveAspectRatio({ src, aspectRatio }) {
  if (typeof src === "string") {
    return parseAspectRatio(aspectRatio);
  } else {
    const metadata = "then" in src ? (await src).default : src;
    return parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
  }
}
async function resolveFormats({ src, formats }) {
  const unique = new Set(formats);
  if (typeof src === "string") {
    unique.add(extname(src).replace(".", ""));
  } else {
    const metadata = "then" in src ? (await src).default : src;
    unique.add(extname(metadata.src).replace(".", ""));
  }
  return Array.from(unique).filter(Boolean);
}
async function getPicture(params) {
  const { src, alt, widths, fit, position, background } = params;
  if (!src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  if (!widths || !Array.isArray(widths)) {
    throw new Error("[@astrojs/image] at least one `width` is required. ex: `widths={[100]}`");
  }
  const aspectRatio = await resolveAspectRatio(params);
  if (!aspectRatio) {
    throw new Error("`aspectRatio` must be provided for remote images");
  }
  const allFormats = await resolveFormats(params);
  const lastFormat = allFormats[allFormats.length - 1];
  const maxWidth = Math.max(...widths);
  let image;
  async function getSource(format) {
    const imgs = await Promise.all(
      widths.map(async (width) => {
        const img = await getImage({
          src,
          alt,
          format,
          width,
          fit,
          position,
          background,
          aspectRatio
        });
        if (format === lastFormat && width === maxWidth) {
          image = img;
        }
        return `${img.src} ${width}w`;
      })
    );
    return {
      type: mime.getType(format) || format,
      srcset: imgs.join(",")
    };
  }
  const sources = await Promise.all(allFormats.map((format) => getSource(format)));
  return {
    sources,
    image
  };
}

const $$Astro$6 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Image;
  const { loading = "lazy", decoding = "async", ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    warnForMissingAlt();
  }
  const attrs = await getImage(props);
  return renderTemplate`${maybeRenderHead($$result)}<img${spreadAttributes(attrs)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}>`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/node_modules/@astrojs/image/components/Image.astro");

const $$Astro$5 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Picture;
  const {
    src,
    alt,
    sizes,
    widths,
    aspectRatio,
    fit,
    background,
    position,
    formats = ["avif", "webp"],
    loading = "lazy",
    decoding = "async",
    ...attrs
  } = Astro2.props;
  if (alt === void 0 || alt === null) {
    warnForMissingAlt();
  }
  const { image, sources } = await getPicture({
    src,
    widths,
    formats,
    aspectRatio,
    fit,
    background,
    position,
    alt
  });
  delete image.width;
  delete image.height;
  return renderTemplate`${maybeRenderHead($$result)}<picture>
	${sources.map((attrs2) => renderTemplate`<source${spreadAttributes(attrs2)}${addAttribute(sizes, "sizes")}>`)}
	<img${spreadAttributes(image)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${spreadAttributes(attrs)}>
</picture>`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/node_modules/@astrojs/image/components/Picture.astro");

let altWarningShown = false;
function warnForMissingAlt() {
  if (altWarningShown === true) {
    return;
  }
  altWarningShown = true;
  console.warn(`
[@astrojs/image] "alt" text was not provided for an <Image> or <Picture> component.

A future release of @astrojs/image may throw a build error when "alt" text is missing.

The "alt" attribute holds a text description of the image, which isn't mandatory but is incredibly useful for accessibility. Set to an empty string (alt="") if the image is not a key part of the content (it's decoration or a tracking pixel).
`);
}

const $$Astro$4 = createAstro();
const $$ImageGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ImageGrid;
  const { images } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="w-full max-w-[1440px] mx-auto columns-1 sm:columns-2 lg:columns-3">
    ${images.length ? images.map((item, index) => {
    return renderTemplate`<a${addAttribute(`/posts/${item.id}`, "href")}>
        <div class="cursor-pointer inline-block w-full group">
            <figure${addAttribute(`relative h-64 ${index % 2 == 0 ? "md:h-96" : "md:h-64"} w-full md:block mb-3 sm:mb-0 mr-3 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden`, "class")}>
            <div class="absolute w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
                ${renderComponent($$result, "Picture", $$Picture, { "alt": "nature photo", "widths": [300, 500, 961], "aspectRatio": "4:5", "format": "webp", "position": "attention", "class": "rounded-lg h-full w-full object-cover", "src": item.url })}
            </div>
            </figure>
        </div>
    </a>`;
  }) : null}
</div>`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/components/imageGrid.astro");

const $$Astro$3 = createAstro();
const prerender$2 = true;
const imageStore = persistentAtom("images", [], {
  encode: JSON.stringify,
  decode: JSON.parse
});
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index;
  let imageEntryObj = [];
  await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp&access_token=${"IGQVJXaWQwNHd4WnNUMFpWczhRUUNfLXR4b1ZAOaXJGTHBtRDRwSWtycEc4UnFiZAlhVLTZAiZAnB2dXpyRzdORmJGSVBoT18yYzR1MjZAkN1h4NnE0dWtWT2E3RHp6LUFORFJ6X044dS1Cdk5lejhqYkowUnJVRDZAMZAEVGU2tR"}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    const imageData = data.data;
    for (const entry in imageData) {
      imageEntryObj.push({ id: imageData[entry].id, url: imageData[entry].media_url, caption: imageData[entry].caption, timestamp: imageData[entry].timestamp });
    }
    imageStore.set(imageEntryObj);
  });
  const imageStoreValues = JSON.parse(persistentAtom("images").get());
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="astro-J7PV25F6">
		<ul role="list" class="link-card-grid astro-J7PV25F6">
            ${renderComponent($$result2, "ImageGrid", $$ImageGrid, { "images": imageStoreValues, "class": "astro-J7PV25F6" })}
		</ul>
	</main>` })}`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/index.astro");

const $$file$2 = "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/index.astro";
const $$url$2 = "";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$2,
  imageStore,
  prerender: prerender$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$GenericImageGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$GenericImageGrid;
  const { images } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="w-3/4 mx-auto lg:columns-3 bg-grey-100 sm:columns-2">
    ${images.length ? images.map((item, index) => {
    return renderTemplate`<a${addAttribute(`/posts/${item.id}`, "href")}>
        <div class="cursor-pointer gap-[5px] inline-block w-full group">
            <figure${addAttribute(`relative h-64 ${index % 2 == 0 ? "md:h-96" : "md:h-64"} w-full md:block mb-3 sm:mb-0 mr-6 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden`, "class")}>
            <div class="absolute w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
                <img alt="nature photo" class="rounded-lg h-full w-full object-cover"${addAttribute(item.url, "src")}>
            </div>
            </figure>
        </div>
    </a>`;
  }) : null}
</div>`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/components/GenericImageGrid.astro");

const $$Astro$1 = createAstro();
const prerender$1 = true;
const $$Generic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Generic;
  const imageStore = JSON.parse(persistentAtom("images").get());
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Homepage", "class": "astro-RNVCB2BA" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="astro-RNVCB2BA">
		<ul role="list" class="link-card-grid astro-RNVCB2BA">
            ${renderComponent($$result2, "GenericImageGrid", $$GenericImageGrid, { "images": imageStore, "class": "astro-RNVCB2BA" })}
		</ul>
	</main>` })}`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/generic.astro");

const $$file$1 = "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/generic.astro";
const $$url$1 = "/generic";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Generic,
  file: $$file$1,
  prerender: prerender$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const prerender = true;
async function getStaticPaths() {
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const imageStore = JSON.parse(persistentAtom("images").get());
  const imageIds = [];
  imageStore.forEach((image) => {
    imageIds.push(image.id);
  });
  const pages = imageIds.map((item) => ({
    slug: item
  }));
  console.log(pages);
  const foundImage = imageStore.filter((image) => {
    if (image.id === slug) {
      return image;
    }
  });
  const caption = foundImage[0].caption.split(/\r?\n/);
  const datePosted = dayjs(foundImage[0].timestamp).format("dddd DD MMMM - YYYY");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "A post by Tom Ballard" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-[1440px] flex flex-col min-h-[100svh] justify-around mx-auto bg-slate-200 p-10">
    <h1 class="style-headline-2 tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Posted on ${datePosted}</h1>
    <div class="flex flex-row justify-center items-center">
      <div class="w-1/2 h-full">
    ${renderComponent($$result2, "Picture", $$Picture, { "alt": "nature photo", "widths": [600, 1e3, 1440], "aspectRatio": "4:5", "format": "webp", "fit": "inside", "class": "rounded-lg h-full w-full object-contain", "src": foundImage[0].url })}
  </div>
  <div class="w-1/2 h-full flex flex-col justify-center">
    <div>
    ${caption.map((para) => renderTemplate`<p class="style-body py-2 px-5 whitespace-pre-line empty:hidden last:italic">${para}</p>`)}
    </div>
    <a class="mt-8 m-5 inline-block w-auto" href="/">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Return</button>
    </a>
  </div>
    </div>
  </div>` })}`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/posts/[...slug].astro");

const $$file = "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/posts/[...slug].astro";
const $$url = "/posts/[...slug]";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page1 as _, _page2 as a, _page4 as b };
