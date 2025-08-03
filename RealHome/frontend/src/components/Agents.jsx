import React from "react";
import agent1 from "../assets/agent1.jpg";
import agent2 from "../assets/agent2.jpg";
import agent3 from "../assets/agent3.jpg";
import agent4 from "../assets/agent4.jpg";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
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
      "Specializes in residential properties and customer satisfaction.",
  },
  {
    name: "Nicolette Mashaba",
    title: "Agent",
    image: agent4,
    description:
      "Focused on finding the best investment properties for clients.",
  },
];

const Agents = () => {
  return (
    <section className="max-padd-container">
      <div className="max-padd-container bg-primary py-16 xl:py-28 rounded-3xl">
        <span className="medium-18">
          Dedicated professionals to help you find your perfect property!
        </span>
        <h2 className="h2">Our Expert Agents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {agents.map((agent, index) => (
            <div
              key={index}
              className=" bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative group">
                <img
                  className="rounded-tl-lg rounded-tr-lg"
                  src={agent.image}
                  alt={agent.name}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white flexCenter flex-col gap-2">
                    <Link to={""} className="my-2">
                      <FaFacebook className="text-xl" />
                    </Link>
                    <Link to={""} className="my-2">
                      <FaTwitter className="text-xl" />
                    </Link>
                    <Link to={""} className="my-2">
                      <FaLinkedin className="text-xl" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-4">
                <h3 className="text-xl font-semibold text-center mt-4">
                  {agent.name}
                </h3>
                <p className="text-gray-600 text-center">{agent.title}</p>
                <p className="text-gray-700 text-center mt-2">
                  {agent.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agents;
