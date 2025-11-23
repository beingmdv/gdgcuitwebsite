"use client";

import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, Instagram, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "gdgc@uitrgpv.ac.in",
      link: "mailto:gdgc@uitrgpv.ac.in",
      color: "#EA4335",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "University Institute of Technology, RGPV Campus, Bhopal, Madhya Pradesh",
      color: "#4285F4",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 98765 43210",
      link: "tel:+919876543210",
      color: "#34A853",
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold google-gradient-text google-underline">Get in Touch</h1>
        <p className="text-gray-600 mt-3 text-lg">Have questions? Want to collaborate? We'd love to hear from you!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left */}
        <div className="space-y-6">
          {contactInfo.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="p-6 bg-white shadow-sm rounded-xl">
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg" style={{ background: `${c.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: c.color }} />
                  </div>
                  <div>
                    <h3 className="font-medium">{c.title}</h3>
                    {c.link ? (
                      <a href={c.link} className="text-sm text-gray-600 hover:text-blue-600">
                        {c.content}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600">{c.content}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Social */}
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="font-medium mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <div className="text-center">
              <MessageSquare className="w-14 h-14 text-blue-600 mx-auto mb-3" />
              <h2 className="text-xl font-semibold">Send Us a Message</h2>
              <p className="text-gray-600 mt-1">We reply within 24-48 hours</p>
            </div>

            <Button
              className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.open("https://forms.google.com", "_blank")}
            >
              Open Contact Form
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="font-medium mb-3">Office Hours</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex justify-between"><span>Mon - Fri</span><span>10 AM - 5 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>10 AM - 2 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="text-gray-400">Closed</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 bg-blue-600 text-white p-10 rounded-2xl text-center">
        <h2 className="text-2xl font-semibold">Want to Collaborate?</h2>
        <p className="mt-2 text-blue-100">Let’s build something amazing together.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a href="mailto:gdgc@uitrgpv.ac.in" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium">
            Email Us
          </a>
          <a className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white/10">
            Download Sponsorship Deck
          </a>
        </div>
      </div>
    </div>
  );
}
