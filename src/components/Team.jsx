"use client";

import { useState } from "react";
import teamData from "@/data/teamData.json";
import { Linkedin, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "all", label: "All" },
  { id: "core", label: "Core Team" },
  { id: "technical", label: "Technical" },
  { id: "design", label: "Design" },
  { id: "operational", label: "Operational" },
];

export default function Team() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hovered, setHovered] = useState(null);

  const filtered =
    activeCategory === "all"
      ? teamData
      : teamData.filter((m) => m.category.includes(activeCategory));

  return (
    <div className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-4 text-4xl font-bold">
            Meet Our Team — <span className="text-blue-600">2025</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Students driving innovation & community at UIT-RGPV
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === c.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((member, index) => (
            <motion.div
              key={member.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => setHovered(member.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                {/* Front */}
                <div className={`${hovered === member.id ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full border-4 border-white"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-gray-900 mb-1 font-semibold text-lg">{member.name}</h3>
                    <div className="text-sm bg-blue-100 text-blue-600 px-3 py-1 inline-block rounded-full mb-2">
                      {member.role}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>

                    <div className="flex gap-3 mt-4 justify-center">
                      <IconBtn href={member.linkedin} icon={<Linkedin />} />
                      <IconBtn href={member.github} icon={<Github />} />
                      <IconBtn href={`mailto:${member.email}`} icon={<Mail />} />
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className={`absolute inset-0 p-6 bg-blue-600 text-white flex flex-col justify-center transition-opacity duration-300 ${hovered === member.id ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-100 text-sm mb-2">{member.role}</p>
                  <p className="text-sm mb-3">{member.responsibilities}</p>
                  <a href={`mailto:${member.email}`} className="text-sm underline flex gap-2 justify-center">
                    <Mail className="w-4 h-4" /> {member.email}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center bg-blue-50 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-2">Want to Join the Team?</h2>
          <p className="text-gray-600 mb-4">
            We’re always looking for passionate students.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all hover:scale-105">
            Apply Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function IconBtn({ href, icon }) {
  return (
    <a
      href={href}
      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300"
    >
      {icon}
    </a>
  );
}
