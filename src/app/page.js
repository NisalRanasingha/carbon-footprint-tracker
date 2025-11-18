import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Users, Globe, TrendingDown,BarChart3, Lightbulb, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full m-0 p-0">
      {/* Hero Section with Video Background */}
      <section className="relative overflow-hidden pt-32 pb-40 w-full m-0 p-0 min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="nature-bg.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-900/60 to-teal-900/70"></div>
        </div>

        {/* Animated background elements (subtle over video)
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400 rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-pulse delay-700"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-pulse delay-1000"></div> */}

        <div className="relative w-full text-center px-4 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full shadow-lg mb-8 border border-white/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">Track Your Impact Today</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent drop-shadow-lg">
              Measure Your
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">Carbon Footprint</span>
          </h1>

          {/* Subheading */}
          <p className="text-2xl md:text-3xl text-green-50 max-w-4xl mx-auto mb-16 leading-relaxed drop-shadow-lg">
            Track, analyze, and reduce your daily carbon emissions.
            Join thousands taking action for a <span className="text-green-300 font-semibold">greener planet</span>.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-20">
            <Link
              href="/calculator"
              className="group px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold text-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm border border-white/20"
            >
              Start Calculating
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            <StatCard number="50K+" label="Active Users" Icon={Users} />
            <StatCard number="2.5M" label="Tons CO₂ Tracked" Icon={Globe} />
            <StatCard number="85%" label="Avg. Reduction" Icon={TrendingDown} />
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 w-full bg-white m-0">
        <div className="w-full">
          <div className="text-center mb-20 px-4">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Why Choose EcoTrack?
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools to help you make a real environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
            <FeatureCard
              Icon={BarChart3}
              title="Real-Time Tracking"
              description="Monitor your carbon footprint daily with accurate, data-driven insights"
              gradient="from-green-400 to-emerald-500"
            />
            <FeatureCard
              Icon={Lightbulb}
              title="Personalized Tips"
              description="Get custom recommendations to reduce your environmental impact"
              gradient="from-emerald-400 to-teal-500"
            />
            <FeatureCard
              Icon={Target}
              title="Set Goals"
              description="Track progress toward your sustainability targets and celebrate wins"
              gradient="from-teal-400 to-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 w-full bg-gradient-to-br from-green-50 to-emerald-50 m-0">
        <div className="w-full">
          <div className="text-center mb-20 px-4">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              How It Works
            </h2>
            <p className="text-2xl text-gray-600">Simple steps to start your journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-4">
            <StepCard
              number="1"
              title="Input Your Data"
              description="Enter your daily activities like transportation, energy use, and food consumption"
            />
            <StepCard
              number="2"
              title="Get Analysis"
              description="Receive detailed breakdown of your carbon emissions across different categories"
            />
            <StepCard
              number="3"
              title="Take Action"
              description="Follow personalized tips and track your progress toward a greener lifestyle"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 w-full bg-gradient-to-r from-green-600 to-emerald-600 m-0">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Make a Difference?
          </h2>
          <p className="text-2xl text-green-50 mb-12">
            Join our community and start tracking your carbon footprint today
          </p>
          <Link
            href="/calculator"
            className="inline-block px-14 py-5 bg-white text-green-600 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function StatCard({ number, label, Icon }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300 hover:scale-105 text-center cursor-pointer">
      <div className="mb-4 flex justify-center">
        <Icon className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
      </div>
      <div className="text-4xl font-bold text-gray-800 mb-2">{number}</div>
      <div className="text-gray-700 font-medium text-lg">{label}</div>
    </div>
  );
}



function FeatureCard({ Icon, title, description, gradient }) {
  return (
    <div className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-10 h-10 text-white" strokeWidth={2} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100">
        <div className="absolute -top-6 left-8 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          {number}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-6">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
      </div>
    </div>
  );
}