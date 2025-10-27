"use client";
import { useState, useMemo } from "react";

// Simple SVG Icon Components
const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth="2"/>
    <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Leaf = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Car = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="17" r="2" strokeWidth="2"/>
    <circle cx="17" cy="17" r="2" strokeWidth="2"/>
  </svg>
);

const Lightbulb = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 18h6M10 22h4M9 14h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Salad = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M7 21h10M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m13 12 4-4M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShoppingBag = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Droplet = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Trees = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 16v6M13 19v3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function TipsPage() {
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const tips = [
    {
      category: "Travel & Transport",
      id: "travel",
      icon: Car,
      list: [
        "Use public transport instead of driving alone.",
        "Walk or bike for short trips.",
        "Carpool with friends or colleagues.",
        "Maintain your vehicle regularly to improve fuel efficiency.",
      ],
    },
    {
      category: "Home Energy",
      id: "energy",
      icon: Lightbulb,
      list: [
        "Switch to LED bulbs — they use 75% less energy.",
        "Unplug chargers and electronics when not in use.",
        "Use fans instead of air conditioning when possible.",
        "Install solar panels to generate clean energy.",
      ],
    },
    {
      category: "Food & Diet",
      id: "food",
      icon: Salad,
      list: [
        "Eat more plant-based meals.",
        "Reduce food waste by planning meals in advance.",
        "Buy local and seasonal produce.",
        "Compost your food scraps instead of throwing them away.",
      ],
    },
    {
      category: "Consumption & Waste",
      id: "consumption",
      icon: ShoppingBag,
      list: [
        "Use reusable bags, bottles, and containers.",
        "Recycle paper, glass, and plastic correctly.",
        "Avoid fast fashion and buy second-hand clothes.",
        "Repair items instead of replacing them immediately.",
      ],
    },
    {
      category: "Water Usage",
      id: "water",
      icon: Droplet,
      list: [
        "Fix leaking taps and toilets.",
        "Install low-flow showerheads.",
        "Collect rainwater for gardening.",
        "Turn off the tap while brushing your teeth.",
      ],
    },
    {
      category: "Lifestyle & Awareness",
      id: "lifestyle",
      icon: Trees,
      list: [
        "Plant trees or support reforestation projects.",
        "Educate your community about sustainability.",
        "Support eco-friendly businesses.",
        "Track your progress in reducing your footprint.",
      ],
    },
  ];

  const filteredTips = useMemo(() => {
    let filtered = tips;

    if (activeCategory !== "all") {
      filtered = filtered.filter((tip) => tip.id === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered
        .map((tipCategory) => ({
          ...tipCategory,
          list: tipCategory.list.filter((item) =>
            item.toLowerCase().includes(query)
          ),
        }))
        .filter((tipCategory) => tipCategory.list.length > 0);
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  const categories = [
    { id: "all", label: "All Tips", Icon: Leaf },
    { id: "travel", label: "Travel", Icon: Car },
    { id: "energy", label: "Energy", Icon: Lightbulb },
    { id: "food", label: "Food", Icon: Salad },
    { id: "consumption", label: "Shopping", Icon: ShoppingBag },
    { id: "water", label: "Water", Icon: Droplet },
    { id: "lifestyle", label: "Lifestyle", Icon: Trees },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 mt-[68px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <Leaf className="w-10 h-10 text-emerald-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Sustainability Tips
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Small daily actions can make a big difference. Explore these simple,
            practical tips to live a more sustainable lifestyle.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search for sustainability tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white/80 backdrop-blur-sm shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex gap-3 justify-center flex-wrap">
            {categories.map((cat) => {
              const IconComponent = cat.Icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-700 hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tips Grid */}
        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredTips.map((tipCategory, i) => {
              const IconComponent = tipCategory.icon;
              return (
                <div
                  key={i}
                  className="group bg-white/70 backdrop-blur-sm p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                  }}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 group-hover:text-emerald-600 transition-colors">
                    <IconComponent className="w-5 h-5" />
                    {tipCategory.category}
                  </h2>
                  <ul className="space-y-3">
                    {tipCategory.list.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-gray-700 group/item hover:text-emerald-700 transition-colors"
                      >
                        <span className="text-emerald-500 mt-1 flex-shrink-0">
                          ✓
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">No tips found</p>
            <p className="text-gray-500">
              Try adjusting your search or filter
            </p>
          </div>
        )}

        {/* Personalized Tips Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl shadow-2xl text-white">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">
                Want Personalized Eco-Tips?
              </h2>
            </div>
            <p className="mb-6 text-emerald-50">
              Get sustainability recommendations based on your carbon footprint
            </p>
            <button
              onClick={() => setShowPersonalized(!showPersonalized)}
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {showPersonalized ? "Hide Tips" : "Get AI-Powered Tips"}
            </button>

            {showPersonalized && (
              <div className="mt-6 bg-white/20 backdrop-blur-sm border-2 border-white/30 p-6 rounded-2xl animate-fade-in">
                <p className="text-white/95 leading-relaxed">
                  🌿 <strong>AI integration coming soon!</strong> This feature
                  will analyze your carbon footprint and provide personalized
                  sustainability suggestions — like optimizing your commute,
                  reducing electricity use, or adjusting dietary choices for
                  maximum environmental impact.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}