import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck, FaHome, FaGlobe, FaUsers, FaTrophy } from "react-icons/fa";

const About = () => {
  const features = [
    "Expert knowledge of South Africa's premier property markets",
    "Personalised service from dedicated luxury real estate professionals",
    "Exclusive access to off-market listings and pre-launch developments",
    "Full support from property valuation through to final transfer",
  ];

  const stats = [
    {
      icon: <FaHome className="w-5 h-5 text-gold-600" />,
      value: "500",
      suffix: "+",
      label: "Properties Sold",
    },
    {
      icon: <FaTrophy className="w-5 h-5 text-gold-600" />,
      value: "15",
      suffix: "+",
      label: "Years Experience",
    },
    {
      icon: <FaUsers className="w-5 h-5 text-gold-600" />,
      value: "2,500",
      suffix: "+",
      label: "Happy Clients",
    },
    {
      icon: <FaGlobe className="w-5 h-5 text-gold-600" />,
      value: "8",
      suffix: "",
      label: "Cities Covered",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* ── Left Column: Text ──────────────────────────────────────── */}
          <div>
            {/* Section label */}
            <span className="inline-flex items-center bg-gold-50 border border-gold-200 text-gold-700 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              ABOUT US
            </span>

            {/* Heading */}
            <h2 className="font-display font-bold text-charcoal-900 text-4xl mt-4 mb-6 leading-tight">
              Your Trusted Partner in Premium South African Real Estate
            </h2>

            {/* First body paragraph */}
            <p className="text-neutral-600 leading-relaxed text-base mb-4">
              With over 15 years of experience in the South African real estate
              market, RealHomes has built an unrivalled reputation for
              excellence, integrity, and extraordinary service. We specialise in
              connecting discerning buyers and sellers with the finest
              properties across the country's most coveted addresses.
            </p>

            {/* Second body paragraph — SA market expertise */}
            <p className="text-neutral-600 leading-relaxed text-base mb-8">
              From the Atlantic Seaboard in Cape Town to Sandton's iconic
              penthouses and the Garden Route's pristine coastal estates, our
              deep South African market expertise ensures every client receives
              truly informed, professional guidance at every step of their
              property journey.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 mt-0.5">
                    <FaCheck className="w-2.5 h-2.5" />
                  </span>
                  <span className="text-neutral-600 text-sm leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link to="/listing" className="btn-outline-navy">
              Browse Our Properties
            </Link>
          </div>

          {/* ── Right Column: Stats + Testimonial ─────────────────────── */}
          <div className="space-y-5">
            {/* 2 × 2 Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 border border-ivory-300 shadow-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Icon chip */}
                  <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>

                  {/* Number + suffix */}
                  <div className="flex items-baseline gap-0.5 mb-1">
                    <span className="text-4xl font-bold text-navy-700 leading-none">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-xl font-bold text-gold-600 leading-none">
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <p className="text-neutral-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Testimonial card */}
            <motion.div
              className="bg-navy-700 text-white rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Decorative quote mark */}
              <svg
                className="w-8 h-8 text-gold-400 mb-4 opacity-80"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="text-white/90 italic leading-relaxed mb-5 text-base">
                "RealHomes SA transformed our property search experience. Their
                expertise in the South African market and commitment to client
                satisfaction is unmatched. We found our dream home within
                weeks!"
              </blockquote>

              <div>
                <p className="font-semibold text-gold-400">
                  Sarah &amp; Michael Johnson
                </p>
                <p className="text-white/60 text-sm mt-0.5">
                  Cape Town, South Africa
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
