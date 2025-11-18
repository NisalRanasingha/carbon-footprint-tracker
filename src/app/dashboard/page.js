"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    // Redirect admin to admin dashboard
    if (parsedUser.role === 'admin') {
      router.push('/admin/dashboard');
      return;
    }

    setUser(parsedUser);
    calculateCarbonFootprint(parsedUser);
    setLoading(false);
  }, [router]);

  const calculateCarbonFootprint = (userData) => {
    // Carbon emission factors
    const travelEmissions = {
      car: 0.21, // kg CO2 per km
      bus: 0.089,
      bike: 0,
      walk: 0
    };

    const dietEmissions = {
      meat: 7.19, // kg CO2 per day
      vegetarian: 3.91,
      vegan: 2.89
    };

    // Calculate daily travel emissions
    const dailyTravel = (parseFloat(userData.distance) || 0) * (travelEmissions[userData.travelMode] || 0);

    // Calculate daily diet emissions
    const dailyDiet = dietEmissions[userData.dietType] || 0;

    // Calculate monthly electricity emissions (0.5 kg CO2 per kWh)
    const monthlyElectricity = (parseFloat(userData.electricity) || 0) * 0.5;
    const dailyElectricity = monthlyElectricity / 30;

    // Per person daily emissions
    const householdSize = parseFloat(userData.householdSize) || 1;
    const dailyElectricityPerPerson = dailyElectricity / householdSize;

    // Total daily emissions
    const dailyTotal = dailyTravel + dailyDiet + dailyElectricityPerPerson;
    const monthlyTotal = dailyTotal * 30;
    const yearlyTotal = dailyTotal * 365;

    setCarbonFootprint({
      daily: dailyTotal.toFixed(2),
      monthly: monthlyTotal.toFixed(2),
      yearly: yearlyTotal.toFixed(2),
      breakdown: {
        travel: dailyTravel.toFixed(2),
        diet: dailyDiet.toFixed(2),
        electricity: dailyElectricityPerPerson.toFixed(2)
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Welcome back, {user.fullName.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Here's your environmental impact overview
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Footprint Cards */}
        {carbonFootprint && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold">Daily Emissions</h3>
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-gray-800">{carbonFootprint.daily}</p>
              <p className="text-gray-500 mt-2">kg CO₂</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold">Monthly Emissions</h3>
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-gray-800">{carbonFootprint.monthly}</p>
              <p className="text-gray-500 mt-2">kg CO₂</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold">Yearly Emissions</h3>
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-gray-800">{carbonFootprint.yearly}</p>
              <p className="text-gray-500 mt-2">kg CO₂</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emissions Breakdown */}
          {carbonFootprint && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Emissions Breakdown</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Transportation</p>
                      <p className="text-sm text-gray-500">{user.travelMode} - {user.distance} km/day</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{carbonFootprint.breakdown.travel} kg</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Diet</p>
                      <p className="text-sm text-gray-500">{user.dietType}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{carbonFootprint.breakdown.diet} kg</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Electricity</p>
                      <p className="text-sm text-gray-500">{user.electricity} kWh/month</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{carbonFootprint.breakdown.electricity} kg</p>
                </div>
              </div>
            </div>
          )}

          {/* User Profile Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-800">{user.fullName}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Household Size</p>
                  <p className="font-semibold text-gray-800">{user.householdSize} {user.householdSize === 1 ? 'person' : 'people'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/calculator')}
            className="bg-white hover:bg-green-50 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">Calculator</h3>
            <p className="text-sm text-gray-600 text-center mt-2">Calculate your carbon footprint</p>
          </button>

          <button
            onClick={() => router.push('/tips')}
            className="bg-white hover:bg-blue-50 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">Eco Tips</h3>
            <p className="text-sm text-gray-600 text-center mt-2">Learn how to reduce emissions</p>
          </button>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-center">Carbon Goal</h3>
            <p className="text-sm text-center mt-2 opacity-90">Reduce by 20% this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}