import React from "react";
import { BLOGS } from "../constant/data";
import { FaArrowRight } from "react-icons/fa";

const Blogs = () => {
  return (
    <section className="bg-ivory-200 py-20">
      <div className="max-padd-container">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="section-label-gold">INSIGHTS &amp; NEWS</span>
          <h2 className="h2">Real Estate Insights</h2>
          <p className="text-neutral-600 max-w-2xl leading-relaxed">
            Stay informed with the latest trends, tips, and expert perspectives
            from South Africa&apos;s dynamic luxury property market.
          </p>
        </div>

        {/* ── Blog Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {BLOGS.map((blog) => (
            <article
              key={blog.title}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {/* Category badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-600 text-white text-xs font-bold mb-3 tracking-wide">
                  {blog.category}
                </span>

                {/* Title */}
                <h3 className="text-white font-display font-bold text-base leading-snug mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Read More */}
                <button
                  className="inline-flex items-center gap-1.5 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors group/btn"
                  aria-label={`Read more about ${blog.title}`}
                >
                  Read More
                  <FaArrowRight className="text-xs translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
