"use client";
// src/components/Events.jsx
import React, { useState, useMemo } from "react";
import eventsData from "@/data/events.json";
import { Calendar, MapPin, Users, Search, X, Download, ExternalLink } from "lucide-react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import ImageWithFallback from "./ImageWithFallback";
import GeometricBackground from "./GeometricBackground";
import { motion, AnimatePresence } from "framer-motion";

const eventTypes = [
  { id: "all", label: "All Events", color: "#4285F4" },
  { id: "workshop", label: "Workshop", color: "#4285F4" },
  { id: "hackathon", label: "Hackathon", color: "#EA4335" },
  { id: "techTalk", label: "Tech Talk", color: "#34A853" },
  { id: "bootcamp", label: "Bootcamp", color: "#FBBC05" }
];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const years = useMemo(() => {
    const y = new Set(eventsData.map(e => {
      const parts = e.date.split(" ");
      const last = parts[parts.length - 1];
      return /\d{4}/.test(last) ? last : null;
    }).filter(Boolean));
    return ["all", ...Array.from(y).sort()];
  }, []);

  const filteredEvents = eventsData.filter(event => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      event.title.toLowerCase().includes(q) ||
      (event.description && event.description.toLowerCase().includes(q));
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesYear = selectedYear === "all" || event.date.includes(selectedYear);
    return matchesSearch && matchesType && matchesYear;
  });

  const upcomingEvents = filteredEvents.filter(e => e.status === "upcoming");
  const pastEvents = filteredEvents.filter(e => e.status === "completed");

  return (
    <div className="min-h-screen py-20 relative">
      <GeometricBackground variant="white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4 text-4xl font-bold">
            <span className="google-gradient-text google-underline">Events & Initiatives</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our workshops, hackathons, and tech talks designed to help you grow
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-12 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="pl-12 pr-12 h-12 rounded-full border-2"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {eventTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${selectedType === type.id ? 'text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                style={{ backgroundColor: selectedType === type.id ? type.color : undefined }}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {years.map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ${selectedYear === y ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {y === 'all' ? 'All Years' : y}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-20">
            <h2 className="text-gray-900 mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, idx) => (
                <motion.div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} onClick={() => setSelectedEvent(event)}>
                  <div className="relative h-48">
                    <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-white rounded-full text-sm">
                      {eventTypes.find(t => t.id === event.type)?.label}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[#4285F4] text-sm mb-2"><Calendar className="w-4 h-4" />{event.date}</div>
                    <h3 className="text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 text-sm"><MapPin className="w-4 h-4" /><span className="truncate">{event.location}</span></div>
                      {event.attendees && <div className="flex items-center gap-1 text-gray-500 text-sm"><Users className="w-4 h-4" />{event.attendees}</div>}
                    </div>
                    <Button className="w-full mt-4 bg-[#4285F4] hover:bg-[#3367D6] text-white" onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}>
                      Register Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Past Events Timeline */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-gray-900 mb-8">Past Events</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
              <div className="space-y-8">
                {pastEvents.map((event, idx) => (
                  <motion.div key={event.id} className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
                    <div className="absolute left-6 top-6 w-5 h-5 bg-[#4285F4] rounded-full border-4 border-white shadow-md hidden md:block" />
                    <div className="md:ml-20 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <div className="relative h-48 md:h-auto">
                          <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="md:col-span-2 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="px-3 py-1 bg-green-50 text-[#34A853] rounded-full text-sm">Completed</div>
                            <div className="text-gray-500 text-sm">{event.date}</div>
                          </div>
                          <h3 className="text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                          {event.stats && (
                            <div className="flex flex-wrap gap-4 mb-4">
                              <div className="flex items-center gap-2 text-gray-600 text-sm"><Users className="w-4 h-4 text-[#4285F4]" />{event.stats.participants} participants</div>
                              {event.stats.projects && (<div className="text-gray-600 text-sm">{event.stats.projects} projects</div>)}
                              <div className="text-gray-600 text-sm">{event.stats.duration}</div>
                            </div>
                          )}
                          {event.resources && (
                            <div className="flex flex-wrap gap-2">
                              {event.resources.map(res => (
                                <button key={res} className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#4285F4] rounded-lg text-sm hover:bg-blue-100 transition-colors">
                                  <Download className="w-3 h-3" />{res}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {filteredEvents.length === 0 && <div className="text-center py-20"><p className="text-gray-500 text-xl">No events found</p></div>}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)}>
            <motion.div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="relative h-64">
                <ImageWithFallback src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-blue-50 text-[#4285F4] rounded-full text-sm">{eventTypes.find(t => t.id === selectedEvent.type)?.label}</div>
                  <div className="text-gray-500 text-sm">{selectedEvent.date}</div>
                </div>
                <h2 className="text-gray-900 mb-4">{selectedEvent.title}</h2>
                <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
                <div className="flex items-center gap-2 text-gray-600 mb-6"><MapPin className="w-5 h-5" />{selectedEvent.location}</div>
                {selectedEvent.status === "upcoming" ? (
                  <Button className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white">Register for Event</Button>
                ) : (
                  selectedEvent.resources && (
                    <div className="space-y-2">
                      {selectedEvent.resources.map(resource => (
                        <a key={resource} href="#" className="w-full block">
                          <button className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 text-[#4285F4] rounded-lg hover:bg-blue-100 transition-colors">
                            <span>{resource}</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </a>
                      ))}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
