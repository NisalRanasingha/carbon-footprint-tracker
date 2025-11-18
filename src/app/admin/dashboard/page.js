"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function AdminDashboard() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalEmissions: 0,
    avgEmissions: 0
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    // Check if user is admin
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setAdmin(parsedUser);
    fetchUsers(token);
  }, [router]);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch(`${API}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
        calculateStats(data.users || []);
      } else {
        const mockUsers = generateMockUsers();
        setUsers(mockUsers);
        calculateStats(mockUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      const mockUsers = generateMockUsers();
      setUsers(mockUsers);
      calculateStats(mockUsers);
    } finally {
      setLoading(false);
    }
  };


  const calculateStats = (usersList) => {
    const totalUsers = usersList.length;
    const activeUsers = usersList.filter(u => u.role !== 'admin').length;

    const travelEmissions = { car: 0.21, bus: 0.089, bike: 0, walk: 0 };
    const dietEmissions = { meat: 7.19, vegetarian: 3.91, vegan: 2.89 };

    let totalEmissions = 0;
    usersList.forEach(user => {
      const dailyTravel = parseFloat(user.distance || 0) * (travelEmissions[user.travelMode] || 0);
      const dailyDiet = dietEmissions[user.dietType] || 0;
      const monthlyElectricity = parseFloat(user.electricity || 0) * 0.5;
      const dailyElectricity = monthlyElectricity / 30 / (parseFloat(user.householdSize) || 1);
      
      totalEmissions += (dailyTravel + dailyDiet + dailyElectricity) * 365;
    });

    setStats({
      totalUsers,
      activeUsers,
      totalEmissions: totalEmissions.toFixed(2),
      avgEmissions: totalUsers > 0 ? (totalEmissions / totalUsers).toFixed(2) : 0
    });
  };

  const openDeleteModal = (user) => {
    setDeleteModal({
      isOpen: true,
      user: user
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      user: null
    });
  };

  const confirmDelete = async () => {
    const userId = deleteModal.user._id;

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(`${API}users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedUsers = users.filter(u => u._id !== userId);
        setUsers(updatedUsers);
        calculateStats(updatedUsers);
        closeDeleteModal();
      } else {
        const updatedUsers = users.filter(u => u._id !== userId);
        setUsers(updatedUsers);
        calculateStats(updatedUsers);
        closeDeleteModal();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      const updatedUsers = users.filter(u => u._id !== userId);
      setUsers(updatedUsers);
      calculateStats(updatedUsers);
      closeDeleteModal();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-800">
                  Admin Dashboard
                </h1>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                  Administrator
                </span>
              </div>
              <p className="text-gray-600 text-lg">
                Welcome back, {admin.fullName}! Manage users and monitor system stats.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Total Users</h3>
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-gray-800">{stats.totalUsers}</p>
            <p className="text-gray-500 mt-2 text-sm">Registered users</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Active Users</h3>
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-gray-800">{stats.activeUsers}</p>
            <p className="text-gray-500 mt-2 text-sm">Non-admin users</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Total Emissions</h3>
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-gray-800">{stats.totalEmissions}</p>
            <p className="text-gray-500 mt-2 text-sm">kg CO₂/year</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Avg Emissions</h3>
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-gray-800">{stats.avgEmissions}</p>
            <p className="text-gray-500 mt-2 text-sm">kg CO₂/user/year</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <p className="text-gray-600 mt-1">View and manage all registered users</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Travel</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Diet</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Electricity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Household</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{user.fullName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded capitalize">
                        {user.travelMode}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{user.distance} km/day</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded capitalize">
                        {user.dietType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800 font-medium">{user.electricity} kWh</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800 font-medium">{user.householdSize}</p>
                      <p className="text-sm text-gray-500">{user.householdSize === 1 ? 'person' : 'people'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="p-6">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Delete User
              </h3>

              {/* Message */}
              <p className="text-gray-600 text-center mb-2">
                Are you sure you want to delete this user?
              </p>
              <p className="text-center mb-6">
                <span className="font-semibold text-gray-900 text-lg">
                  {deleteModal.user?.fullName}
                </span>
                <br />
                <span className="text-sm text-gray-500">
                  {deleteModal.user?.email}
                </span>
              </p>
              <p className="text-sm text-red-600 text-center mb-6">
                This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}