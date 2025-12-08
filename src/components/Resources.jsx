"use client";
// src/components/Resources.jsx
import React, { useState, useMemo } from "react";
import { ExternalLink, BookOpen, Video, FileText, Code2, Database, Brain, Blocks, Smartphone, Cloud, Lock, Palette } from "lucide-react";
import resourcesData from "@/data/resources.json";
import Input from "./ui/Input";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const categories = [
  { id: "all", name: "All Resources", icon: BookOpen, color: "#4285F4" },
  { id: "webdev", name: "Web Development", icon: Code2, color: "#4285F4" },
  { id: "dsa", name: "DSA & CP", icon: Database, color: "#EA4335" },
  { id: "aiml", name: "AI/ML", icon: Brain, color: "#FBBC05" },
  { id: "web3", name: "Web3 & Blockchain", icon: Blocks, color: "#34A853" },
  { id: "mobile", name: "Mobile Dev", icon: Smartphone, color: "#4285F4" },
  { id: "cloud", name: "Cloud Computing", icon: Cloud, color: "#EA4335" },
  { id: "cybersecurity", name: "Cybersecurity", icon: Lock, color: "#FBBC05" },
  { id: "uiux", name: "UI/UX Design", icon: Palette, color: "#34A853" }
];

function getTypeIcon(type) {
  switch (type) {
    case "video": return "🎥";
    case "course": return "📚";
    case "documentation": return "📖";
    case "tutorial": return "💡";
    case "article": return "📄";
    default: return "📌";
  }
}

function levelBadge(level) {
  switch (level) {
    case "beginner": return "bg-green-100 text-green-700";
    case "intermediate": return "bg-blue-100 text-blue-700";
    case "advanced": return "bg-purple-100 text-purple-700";
    default: return "bg-gray-100 text-gray-700";
  }
}

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return resourcesData.filter(r => {
      const categoryMatch = activeCategory === "all" || r.category === activeCategory;
      const searchMatch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.provider && r.provider.toLowerCase().includes(q));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen py-20 relative">
      {/* Background shapes are provided by your GeometricBackground in layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4 text-4xl font-bold">
            <span className="google-gradient-text google-underline">Learning Resources</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Curated collection of the best free resources to learn and grow your tech skills</p>
        </motion.div>

        <motion.div className="max-w-2xl mx-auto mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search resources..." className="py-4 px-6 text-lg" />
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full transition-transform duration-200 ${active ? "scale-105 shadow-lg text-white" : "bg-white text-gray-700 hover:shadow-md"}`}
                  style={ active ? { background: `linear-gradient(90deg, ${cat.color}, #34A853)` } : undefined }
                >
                  <Icon className="w-5 h-5" />
                  <span className="whitespace-nowrap">{cat.name}</span>
                  {active && <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">{filtered.length}</span>}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r, i) => (
            <motion.a
              key={r.id}
              href={r.link}
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: `${r.color}15` }}>
                  {getTypeIcon(r.type)}
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#4285F4] transition-colors" />
              </div>

              <h3 className="text-gray-900 mb-2 group-hover:text-[#4285F4] transition-colors">{r.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{r.description}</p>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs ${levelBadge(r.level)}`}>{r.level}</span>
                <span className="text-xs text-gray-500">{r.provider}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for</p>
          </motion.div>
        )}

        <motion.div className="mt-20 bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-2xl p-12 text-white text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-white mb-4">Want to Suggest a Resource?</h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">Know a great learning resource that should be here? Let us know and help the community grow!</p>
          <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#4285F4] rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105">
            Submit a Resource <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
