"use client";

import { ExternalLink, Users, Rocket, Lightbulb, Code, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import GeometricBackground from "@/components/GeometricBackground";
import ImageWithFallback from "@/components/ImageWithFallback";
import { motion } from "motion/react";

export default function JoinPage() {
  const benefits = [
    {
      icon: Code,
      title: "Learn & Build",
      description: "Hands-on workshops and hackathons to develop real-world skills",
      color: "#4285F4",
    },
    {
      icon: Users,
      title: "Network",
      description: "Connect with like-minded developers and industry professionals",
      color: "#EA4335",
    },
    {
      icon: Lightbulb,
      title: "Innovate",
      description: "Work on exciting projects and bring your ideas to life",
      color: "#FBBC05",
    },
    {
      icon: Rocket,
      title: "Grow",
      description: "Access to Google technologies, resources, and mentorship",
      color: "#34A853",
    },
  ];

  const perks = [
    "Early access to workshops and events",
    "Exclusive Google Cloud credits",
    "Networking opportunities with industry experts",
    "Certificate of participation",
    "Hands-on project experience",
    "Mentorship from senior members",
    "Access to premium learning resources",
    "Community support and collaboration",
  ];

  return (
    <div className="min-h-screen py-20 relative">
      <GeometricBackground variant="white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-4">
            <span className="google-gradient-text google-underline text-4xl font-bold">Join GDGC UIT-RGPV</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of a vibrant community of developers, designers, and innovators. Learn, build, and grow together!
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
            alt="Team collaboration"
            className="w-full h-96 object-cover"
          />
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${benefit.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: benefit.color }} />
                </div>
                <h3 className="text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main CTA Section */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-12 shadow-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#FBBC05]" />
              <span className="text-sm text-gray-700">Applications Open!</span>
            </div>

            <h2 className="text-gray-900 mb-4">Ready to Join Us?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Fill out our membership application form and become part of the GDGC family. 
              It only takes a few minutes!
            </p>

            <Button
              asChild
              className="px-8 py-6 text-lg"
            >
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Apply for Membership
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              🚀 No prior experience required! We welcome all skill levels.
            </p>
          </div>
        </motion.div>

        {/* What You'll Get */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-gray-900 text-center mb-8">
            <span className="google-gradient-text">What You'll Get</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4285F4] to-[#34A853] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{perk}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-gray-900 text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Who can join GDGC UIT-RGPV?",
                a: "Any student from UIT-RGPV with a passion for technology and learning can join, regardless of their skill level or branch.",
              },
              {
                q: "Is there a membership fee?",
                a: "No! GDGC membership is completely free. We believe in making tech education accessible to everyone.",
              },
              {
                q: "What is the time commitment?",
                a: "We recommend 3-5 hours per week, but you can participate as much or as little as your schedule allows.",
              },
              {
                q: "Do I need prior coding experience?",
                a: "Not at all! We welcome beginners and provide workshops to help you get started with programming.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
