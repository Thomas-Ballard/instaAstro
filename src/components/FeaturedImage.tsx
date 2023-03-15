import React from "react";

export default function FeaturedImage(image: { id: any; url: any; }, position: number) {
  return <>
    <a href={`/posts/${image.id}`}>
      <div className="cursor-pointer py-6 px-1 inline-block w-full group">
        <figure className={`relative h-64 ${position % 2 == 0 ? "md:h-96" : "md:h-64"} w-full hidden md:block mb-3 sm:mb-0 mr-6 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden`}>
          <div className="absolute w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
            <img
              className="rounded-lg contrast-115 object-fit"
              src={image.url}
            />
          </div>
        </figure>
      </div>
    </a>
  </>
}