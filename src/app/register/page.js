"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    travelMode: "",
    distance: "",
    dietType: "",
    electricity: "",
    householdSize: "",
  });
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.travelMode) {
      newErrors.travelMode = "Please select a travel mode";
    }
    
    if (!formData.distance) {
      newErrors.distance = "Distance is required";
    } else if (formData.distance <= 0) {
      newErrors.distance = "Distance must be greater than 0";
    }
    
    if (!formData.dietType) {
      newErrors.dietType = "Please select a diet type";
    }
    
    if (!formData.electricity) {
      newErrors.electricity = "Electricity usage is required";
    } else if (formData.electricity <= 0) {
      newErrors.electricity = "Electricity must be greater than 0";
    }
    
    if (!formData.householdSize) {
      newErrors.householdSize = "Household size is required";
    } else if (formData.householdSize <= 0) {
      newErrors.householdSize = "Household size must be at least 1";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log(formData);
      // TODO: send to backend API
    }
  };

  return (
    <div className="min-h-screen w-full flex mt-[68px]">
      {/* Left Side - Image Section */}
      <div 
        className="hidden lg:block lg:w-1/2 relative bg-green-50"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 5rem)",
        }}
      ></div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent ml-2">
              EcoTrack
            </span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 text-lg">
              Start your sustainability journey today
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'} transition-all duration-300`}>
                  1
                </div>
                <span className="ml-2 font-medium text-sm">Account</span>
              </div>
              <div className={`w-12 h-1 rounded ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'} transition-all duration-300`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'} transition-all duration-300`}>
                  2
                </div>
                <span className="ml-2 font-medium text-sm">Lifestyle</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  {/* Continue Button */}
                  <button
                    type="button"
                    onClick={nextStep}
                    className="relative w-full py-3 rounded-lg font-semibold text-lg overflow-hidden group border-2 border-green-600 transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-0 bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-500 ease-out group-hover:w-full"></span>
                    <span className="relative text-green-600 group-hover:text-white transition-colors duration-300">
                      Continue
                    </span>
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-center text-gray-600 mb-4">Help us personalize your experience</p>
                  
                  {/* Travel Mode */}
                  <div>
                    <label htmlFor="travelMode" className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Mode
                    </label>
                    <select
                      id="travelMode"
                      name="travelMode"
                      value={formData.travelMode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.travelMode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all appearance-none bg-white`}
                    >
                      <option value="">Select Travel Mode</option>
                      <option value="car">Car</option>
                      <option value="bus">Bus</option>
                      <option value="bike">Bike</option>
                      <option value="walk">Walk</option>
                    </select>
                    {errors.travelMode && <p className="text-red-500 text-sm mt-1">{errors.travelMode}</p>}
                  </div>

                  {/* Distance */}
                  <div>
                    <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Travel Distance (km)
                    </label>
                    <input
                      id="distance"
                      name="distance"
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.distance}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.distance ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                    />
                    {errors.distance && <p className="text-red-500 text-sm mt-1">{errors.distance}</p>}
                  </div>

                  {/* Diet Type */}
                  <div>
                    <label htmlFor="dietType" className="block text-sm font-medium text-gray-700 mb-2">
                      Diet Type
                    </label>
                    <select
                      id="dietType"
                      name="dietType"
                      value={formData.dietType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.dietType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all appearance-none bg-white`}
                    >
                      <option value="">Select Diet Type</option>
                      <option value="meat">Meat-based</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                    {errors.dietType && <p className="text-red-500 text-sm mt-1">{errors.dietType}</p>}
                  </div>

                  {/* Electricity */}
                  <div>
                    <label htmlFor="electricity" className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Electricity Usage (kWh)
                    </label>
                    <input
                      id="electricity"
                      name="electricity"
                      type="number"
                      placeholder="e.g., 300"
                      value={formData.electricity}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.electricity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                    />
                    {errors.electricity && <p className="text-red-500 text-sm mt-1">{errors.electricity}</p>}
                  </div>

                  {/* Household Size */}
                  <div>
                    <label htmlFor="householdSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Household Size
                    </label>
                    <input
                      id="householdSize"
                      name="householdSize"
                      type="number"
                      placeholder="e.g., 4"
                      value={formData.householdSize}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.householdSize ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                    />
                    {errors.householdSize && <p className="text-red-500 text-sm mt-1">{errors.householdSize}</p>}
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="relative w-2/3 py-3 rounded-lg font-semibold text-lg overflow-hidden group border-2 border-green-600 transition-all duration-300"
                    >
                      <span className="absolute inset-0 w-0 bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-500 ease-out group-hover:w-full"></span>
                      <span className="relative text-green-600 group-hover:text-white transition-colors duration-300">
                        Create Account
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}