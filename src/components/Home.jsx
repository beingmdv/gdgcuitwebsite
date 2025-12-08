"use client";
// src/components/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import { ArrowRight, Code, Users, Lightbulb, Network, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./ui/Button";

import ImageWithFallback from "./ImageWithFallback";
import GeometricBackground from "./GeometricBackground";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import eventsData from "@/data/events.json";

export default function Home() {
  const router = useRouter();
  const [memberCount, setMemberCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Animated counters (same as before)
  useEffect(() => {
    const duration = 2000;
    const targetMembers = 500;
    const targetEvents = 40;
    const targetProjects = 20;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setMemberCount(Math.floor(targetMembers * progress));
      setEventCount(Math.floor(targetEvents * progress));
      setProjectCount(Math.floor(targetProjects * progress));

      if (progress === 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const features = [
    { title: "Workshops", description: "Hands-on technical workshops covering web, mobile, ML, cloud, and more.", icon: Code, color: "#4285F4" },
    { title: "Projects", description: "Build real-world projects with guidance from experienced mentors.", icon: Lightbulb, color: "#FBBC05" },
    { title: "Mentorship", description: "Learn from industry professionals and senior developers.", icon: Users, color: "#EA4335" },
    { title: "Community", description: "Connect with like-minded developers and grow your network.", icon: Network, color: "#34A853" },
  ];

  // derive upcoming events from JSON data
  const upcomingEvents = useMemo(() => {
    return eventsData.filter((e) => e.status === "upcoming");
  }, []);

  // partners (unchanged)
  const partners = ["Google Cloud", "GitHub", "JetBrains", "Postman", "MongoDB"];

  // navigation for carousel uses dynamic length
  const nextEvent = () => {
    if (upcomingEvents.length === 0) return;
    setCurrentEventIndex((prev) => (prev + 1) % upcomingEvents.length);
  };
  const prevEvent = () => {
    if (upcomingEvents.length === 0) return;
    setCurrentEventIndex((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  const handleNavClick = (page) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // keep index safe if events array changes length
  useEffect(() => {
    if (currentEventIndex >= upcomingEvents.length) {
      setCurrentEventIndex(0);
    }
  }, [upcomingEvents.length, currentEventIndex]);

  return (
    <div className="min-h-screen relative">
      <GeometricBackground variant="white" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="mb-6 text-4xl sm:text-5xl font-bold">
                  <span className="google-gradient-text">Empowering Developers of Tomorrow</span>
                  <span className="text-gray-900"> — GDGC UIT-RGPV</span>
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  <span style={{ color: '#4285F4' }}>Learn.</span>{' '}
                  <span style={{ color: '#EA4335' }}>Build.</span>{' '}
                  <span style={{ color: '#FBBC05' }}>Connect.</span>{' '}
                  <span style={{ color: '#34A853' }}>Impact.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => handleNavClick("join")} className="px-8 shadow-lg hover:scale-105">
                    Join Us <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button onClick={() => handleNavClick("events")} variant="outline" className="px-8 text-[#4285F4] border-2 border-[#4285F4]">
                    Explore Events
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {/* if no upcoming events, fallback to a placeholder */}
                  <ImageWithFallback
                    src={upcomingEvents.length ? upcomingEvents[currentEventIndex].image : "https://via.placeholder.com/1200x700?text=No+Events"}
                    alt={upcomingEvents.length ? upcomingEvents[currentEventIndex].title : "No upcoming events"}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#EA4335] rounded-lg opacity-20 blur-xl" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#34A853] rounded-lg opacity-20 blur-xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white py-12 border-y">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="text-[#4285F4] mb-2 text-2xl font-semibold">{memberCount}+</div>
                <div className="text-gray-600">Members</div>
              </motion.div>
              <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="text-[#EA4335] mb-2 text-2xl font-semibold">{eventCount}+</div>
                <div className="text-gray-600">Events</div>
              </motion.div>
              <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <div className="text-[#34A853] mb-2 text-2xl font-semibold">{projectCount}+</div>
                <div className="text-gray-600">Projects</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-gray-900 mb-4 text-2xl font-semibold">What We Offer</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join us to access exclusive opportunities and grow your skills</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ borderTop: `4px solid ${feature.color}` }}
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${feature.color}15` }}>
                      <Icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Events carousel (sourced from JSON) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-gray-900 mb-4 text-2xl font-semibold">Upcoming Events</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Don't miss out on our latest workshops and sessions</p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-16">No upcoming events</div>
              ) : (
                <>
                  <motion.div key={currentEventIndex} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden shadow-xl" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto">
                        <ImageWithFallback src={upcomingEvents[currentEventIndex].image} alt={upcomingEvents[currentEventIndex].title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="inline-block px-3 py-1 bg-[#4285F4] text-white rounded-full text-sm mb-4 w-fit">
                          {upcomingEvents[currentEventIndex].date}
                        </div>
                        <h3 className="text-gray-900 mb-3 text-xl font-semibold">{upcomingEvents[currentEventIndex].title}</h3>
                        <p className="text-gray-600 mb-4">{upcomingEvents[currentEventIndex].description}</p>
                        <div className="flex items-center text-gray-500 text-sm mb-6">
                          <MapPin className="w-4 h-4 mr-2" />
                          {upcomingEvents[currentEventIndex].location}
                        </div>
                        <Button className="bg-[#4285F4] text-white w-fit" onClick={() => router.push('/events')}>
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  <button onClick={prevEvent} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:scale-110">
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button onClick={nextEvent} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:scale-110">
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>

                  <div className="flex justify-center gap-2 mt-6">
                    {upcomingEvents.map((_, i) => (
                      <button key={i} onClick={() => setCurrentEventIndex(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i===currentEventIndex ? 'bg-[#4285F4] w-8' : 'bg-gray-300'}`} aria-label={`Go to ${i+1}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-gray-900 mb-8">Our Partners</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {partners.map((p, i) => (
                <motion.div key={p} className="text-gray-400 px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:text-gray-600" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.1 }}>{p}</motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-[#4285F4] to-[#3367D6] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-white mb-4 text-2xl font-semibold">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 text-blue-50">Join GDGC UIT-RGPV and become part of a thriving developer community</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => handleNavClick('join')} variant="outline" className="bg-white text-[#4285F4] px-8">Join Now</Button>
                <Button onClick={() => handleNavClick('contact')} variant="outline" className="border-2 border-white text-white px-8">Get in Touch</Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
