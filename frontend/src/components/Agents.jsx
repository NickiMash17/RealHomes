import React from "react";
import agent1 from "../assets/agent1.jpg";
import agent2 from "../assets/agent2.jpg";
import agent3 from "../assets/agent3.jpg";
import agent4 from "../assets/agent4.jpg";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const agents = [
  {
    name: "John Doe",
    title: "Senior Agent",
    image: agent1,
    description:
      "Experienced agent with over 10 years in the real estate market.",
  },
  {
    name: "Izabella Stress",
    title: "Junior Agent",
    image: agent2,
    description: "Passionate about helping clients find their dream homes.",
  },
  {
    name: "Emily Johnson",
    title: "Agent",
    image: agent3,
    description:
      "Specialises in residential properties and exceptional customer satisfaction.",
  },
  {
    name: "Nicolette Mashaba",
    title: "Agent",
    image: agent4,
    description:
      "Focused on finding the best investment properties for discerning clients.",
  },
];

const Agents = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-padd-container">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="section-label-gold">OUR TEAM</span>
          <h2 className="h2">Meet Our Expert Agents</h2>
          <p className="text-neutral-600 max-w-2xl leading-relaxed">
            Our dedicated team of professionals is here to guide you through
            every step of your property journey — from the first viewing to the
            final handover.
          </p>
        </div>

        {/* ── Agents Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-ivory-300 shadow-card group hover:shadow-navy hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image + Hover Overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full aspect-square object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Navy Overlay with Social Icons */}
                <div className="absolute inset-0 bg-navy-900/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to=""
                    aria-label={`${agent.name} on Facebook`}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-gold-600 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                  >
                    <FaFacebook className="text-sm" />
                  </Link>
                  <Link
                    to=""
                    aria-label={`${agent.name} on Twitter`}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-gold-600 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                  >
                    <FaTwitter className="text-sm" />
                  </Link>
                  <Link
                    to=""
                    aria-label={`${agent.name} on LinkedIn`}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-gold-600 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                  >
                    <FaLinkedin className="text-sm" />
                  </Link>
                </div>
              </div>

              {/* Card Content */}
              <div className="px-5 py-4">
                <h3 className="font-display font-bold text-charcoal-900 text-lg text-center mt-1">
                  {agent.name}
                </h3>
                <p className="text-gold-600 text-sm font-semibold text-center mb-2">
                  {agent.title}
                </p>
                {/* Gold Divider */}
                <div className="w-8 h-0.5 bg-gold-600 mx-auto mb-3" />
                <p className="text-neutral-600 text-sm text-center leading-relaxed">
                  {agent.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center mt-12">
          <Link
            to="/agents"
            className="btn-outline-navy inline-flex items-center gap-2"
          >
            View All Agents
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Agents;
