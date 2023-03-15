/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, f as renderComponent } from './astro.ac8074ba.mjs';
import 'html-escaper';
import { persistentAtom } from '@nanostores/persistent';
import { $ as $$Picture, a as $$Layout } from './pages/all.e0922036.mjs';
/* empty css                          *//* empty css                            */
const $$Astro$3 = createAstro();
const $$ImageGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ImageGrid;
  const { images } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="w-3/4 mx-auto lg:columns-3 bg-grey-100 columns-1 sm:columns-2">
    ${images.length ? images.map((item, index) => {
    return renderTemplate`<a${addAttribute(`/posts/${item.id}`, "href")}>
        <div class="cursor-pointer gap-[5px] inline-block w-full group">
            <figure${addAttribute(`relative h-64 ${index % 2 == 0 ? "md:h-96" : "md:h-64"} w-full md:block mb-3 sm:mb-0 mr-6 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden`, "class")}>
            <div class="absolute w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
                ${renderComponent($$result, "Picture", $$Picture, { "alt": "nature photo", "widths": [300, 500, 961], "aspectRatio": "4:5", "format": "webp", "position": "attention", "class": "rounded-lg h-full w-full object-cover", "src": item.url })}
            </div>
            </figure>
        </div>
    </a>`;
  }) : null}
</div>`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/components/imageGrid.astro");

const $$Astro$2 = createAstro();
const prerender$1 = true;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index;
  const imageStore = JSON.parse(persistentAtom("images").get());
  console.log(imageStore);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Homepage", "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="astro-J7PV25F6">
		<ul role="list" class="link-card-grid astro-J7PV25F6">
            ${renderComponent($$result2, "ImageGrid", $$ImageGrid, { "images": imageStore, "class": "astro-J7PV25F6" })}
		</ul>
	</main>` })}`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/index.astro");

const $$file$1 = "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/index.astro";
const $$url$1 = "";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file$1,
    prerender: prerender$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$GenericImageGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
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
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/components/genericImageGrid.astro");

const $$Astro = createAstro();
const prerender = true;
const $$Generic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Generic;
  JSON.parse(persistentAtom("images").get());
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Homepage", "class": "astro-RNVCB2BA" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="astro-RNVCB2BA">
		<ul role="list" class="link-card-grid astro-RNVCB2BA">
            ${renderComponent($$result2, "GenericImageGrid", $$GenericImageGrid, { "images": imageGridData, "class": "astro-RNVCB2BA" })}
		</ul>
	</main>` })}`;
}, "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/generic.astro");

const $$file = "/Users/Thomas.Ballard/git/astro/astro-insta/src/pages/generic.astro";
const $$url = "/generic";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Generic,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page1 as _, _page2 as a };
