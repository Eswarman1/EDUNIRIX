import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Bell,
  Clock,
  MapPin,
  BookOpen,
  GraduationCap,
  Building2,
  TrendingUp,
  Activity,
  PieChart,
  CheckCircle,
  AlertTriangle // Added AlertTriangle for conflicts
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { title: 'Total Students', value: '1,234', change: '+12%', icon: GraduationCap, color: 'gold-accent' }, // Changed color
    { title: 'Total Teachers', value: '89', change: '+5%', icon: Users, color: 'success' }, // Kept green for success
    { title: 'Active Classes', value: '45', change: '+8%', icon: BookOpen, color: 'purple' }, // Kept purple for now
    { title: 'Rooms Available', value: '23', change: '+3%', icon: Building2, color: 'secondary' } // Kept secondary for now (can be mapped or changed)
  ];

  const recentTimetables = [
    { id: 1, name: 'Computer Science - Semester 1', status: 'Active', lastUpdated: '2 hours ago', conflicts: 0 },
    { id: 2, name: 'Engineering - Year 2', status: 'Draft', lastUpdated: '1 day ago', conflicts: 2 },
    { id: 3, name: 'Business Administration', status: 'Active', lastUpdated: '3 days ago', conflicts: 0 },
    { id: 4, name: 'Medical Sciences', status: 'Review', lastUpdated: '1 week ago', conflicts: 1 }
  ];

  const notifications = [
    { id: 1, message: 'New timetable conflict detected in Engineering Year 2', time: '5 min ago', type: 'warning' }, // Used warning color
    { id: 2, message: 'Timetable generation completed for Computer Science', time: '1 hour ago', type: 'success' }, // Used success color
    { id: 3, message: 'Room booking request from Dr. Smith', time: '2 hours ago', type: 'info' } // Kept info type, could map to gold-accent
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          // Use card component class for styling
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted dark:text-gray-400 light:text-gray-600">{stat.title}</p> {/* Adjusted text color */}
                <p className="text-2xl font-bold text-text-light dark:text-gray-900 light:text-gray-900">{stat.value}</p> {/* Adjusted text color */}
                <p className="text-sm text-success-400 light:text-success-600">{stat.change}</p> {/* Kept green for positive change */}
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-900/20 light:bg-${stat.color}-100 transition-colors`}> {/* Adjusted background */}
                <stat.icon className={`w-6 h-6 text-${stat.color}-400 light:text-${stat.color}-600`} /> {/* Adjusted icon color */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card"> {/* Use card component class */}
        <div className="p-6 border-b border-gray-700 light:border-gray-200"> {/* Adjusted border */}
          <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900">Quick Actions for EDUNIRIX</h3> {/* Adjusted text color */}
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/create-timetable')}
              className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group light:bg-primary-50 light:hover:bg-primary-100 light:border-primary-200" // Updated background/border/hover
            >
              <Plus className="w-6 h-6 text-gold-accent-400 light:text-primary-600 mr-3" /> {/* Use gold accent */}
              <span className="font-medium text-text-light dark:text-primary-900 light:text-primary-900">Generate New Timetable</span> {/* Adjusted text color */}
            </button>
            <button
              onClick={() => navigate('/student-management')}
              className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group light:bg-indigo-50 light:hover:bg-indigo-100 light:border-indigo-200" // Updated background/border/hover
            >
              <GraduationCap className="w-6 h-6 text-gold-accent-400 light:text-indigo-600 mr-3" /> {/* Use gold accent */}
              <span className="font-medium text-text-light dark:text-indigo-900 light:text-indigo-900">Manage Students</span> {/* Adjusted text color */}
            </button>
            <button
              onClick={() => navigate('/teachers-data')}
              className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group light:bg-warning-50 light:hover:bg-warning-100 light:border-warning-200" // Updated background/border/hover
            >
              <Users className="w-6 h-6 text-gold-accent-400 light:text-warning-600 mr-3" /> {/* Use gold accent */}
              <span className="font-medium text-text-light dark:text-warning-900 light:text-warning-900">Manage Teachers</span> {/* Adjusted text color */}
            </button>
            <button
              onClick={() => navigate('/classrooms-data')}
               className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group light:bg-secondary-50 light:hover:bg-secondary-100 light:border-secondary-200" // Updated background/border/hover
            >
              <Settings className="w-6 h-6 text-gold-accent-400 light:text-secondary-600 mr-3" /> {/* Use gold accent */}
              <span className="font-medium text-text-light dark:text-secondary-900 light:text-secondary-900">Manage Rooms</span> {/* Adjusted text color */}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => navigate('/programs-data')}
               className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group light:bg-purple-50 light:hover:bg-purple-100 light:border-purple-200" // Updated background/border/hover
            >
              <Building2 className="w-6 h-6 text-gold-accent-400 light:text-purple-600 mr-3" /> {/* Use gold accent */}
              <span className="font-medium text-text-light dark:text-purple-900 light:text-purple-900">Manage Programs</span> {/* Adjusted text color */}
            </button>
            <button
              onClick={() => navigate('/infrastructure-data')}
              className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors group light:bg-orange-50 light:hover:bg-orange-100 light:border-orange-200" // Updated background/border/hover
            >
              <BookOpen className="w-6 h-6 text-gold-accent-400 light:text-orange-600 mr-3" /> {/* Use gold accent */}
              <span className="font-medium text-text-light dark:text-orange-900 light:text-orange-900">Infrastructure & Policy</span> {/* Adjusted text color */}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Timetables */}
      <div className="card"> {/* Use card component class */}
        <div className="p-6 border-b border-gray-700 light:border-gray-200"> {/* Adjusted border */}
          <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900">Recent Timetables Generated by EDUNIRIX</h3> {/* Adjusted text color */}
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentTimetables.map((timetable) => (
              <div key={timetable.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg light:bg-gray-50 hover:bg-gray-600 light:hover:bg-gray-100 transition-colors duration-200"> {/* Adjusted background/hover */}
                <div className="flex items-center space-x-4">
                  <Calendar className="w-5 h-5 text-gold-accent-400 light:text-primary-600" /> {/* Use gold accent */}
                  <div>
                    <h4 className="font-medium text-text-light dark:text-gray-900 light:text-gray-900">{timetable.name}</h4> {/* Adjusted text color */}
                    <p className="text-sm text-text-muted dark:text-gray-400 light:text-gray-500">Updated {timetable.lastUpdated}</p> {/* Adjusted text color */}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    timetable.status === 'Active' ? 'bg-success-900/20 text-success-200 dark:bg-success-900 dark:text-success-200 light:bg-success-100 light:text-success-800' : // Adjusted colors
                    timetable.status === 'Draft' ? 'bg-warning-900/20 text-warning-200 dark:bg-warning-900 dark:text-warning-200 light:bg-warning-100 light:text-warning-800' : // Adjusted colors
                    'bg-gold-accent-900/20 text-gold-accent-200 light:bg-primary-100 light:text-primary-800' // Use gold accent for other status
                  }`}>
                    {timetable.status}
                  </span>
                  {timetable.conflicts > 0 && (
                    <span className="px-2 py-1 bg-danger-900 text-danger-200 rounded-full text-xs font-medium light:bg-danger-100 light:text-danger-800"> {/* Adjusted colors */}
                      {timetable.conflicts} conflicts
                    </span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gold-accent-400 light:hover:text-primary-600"> {/* Use gold accent hover */}
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-success-400 light:hover:text-success-600"> {/* Use success hover */}
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card"> {/* Use card component class */}
        <div className="p-6 border-b border-gray-700 light:border-gray-200"> {/* Adjusted border */}
          <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900">Recent Notifications</h3> {/* Adjusted text color */}
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg light:bg-gray-50"> {/* Adjusted background */}
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'warning' ? 'bg-warning-500' : // Kept warning
                  notification.type === 'success' ? 'bg-success-500' : // Kept success
                  'bg-gold-accent-500' // Use gold for info type
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-text-light dark:text-gray-900 light:text-gray-900">{notification.message}</p> {/* Adjusted text color */}
                  <p className="text-xs text-text-muted dark:text-gray-400 light:text-gray-500">{notification.time}</p> {/* Adjusted text color */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimetables = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/create-timetable')}
            className="px-4 py-2 bg-gold-accent-500 text-black rounded-lg hover:bg-gold-accent-600 transition-colors flex items-center space-x-2" // Updated button colors
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Timetable</span>
          </button>
          <button className="px-4 py-2 border border-gray-700 text-text-muted rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 light:border-gray-300 light:text-gray-700 light:hover:bg-gray-50"> {/* Updated colors/border/hover */}
            <Upload className="w-4 h-4" />
            <span>Import Timetable Data</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search timetables..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-transparent bg-gray-800 border-gray-700 text-white placeholder-gray-400 light:bg-white light:border-gray-300 light:text-gray-900 light:placeholder-gray-500" // Updated colors and focus ring
            />
          </div>
          <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-700 light:border-gray-300 light:hover:bg-gray-50"> {/* Updated border/hover */}
            <Filter className="w-4 h-4 text-text-muted dark:text-gray-400 light:text-gray-600" /> {/* Adjusted text color */}
          </button>
        </div>
      </div>

      {/* Timetables List */}
      <div className="card"> {/* Use card component class */}
        <div className="p-6 border-b border-gray-700 light:border-gray-200"> {/* Adjusted border */}
          <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900">All Generated Timetables</h3> {/* Adjusted text color */}
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentTimetables.map((timetable) => (
              <div key={timetable.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors dark:bg-gray-700 light:bg-gray-50 light:hover:bg-gray-100"> {/* Adjusted background/hover */}
                <div className="flex items-center space-x-4">
                  <Calendar className="w-5 h-5 text-gold-accent-400 light:text-primary-600" /> {/* Use gold accent */}
                  <div>
                    <h4 className="font-medium text-text-light dark:text-gray-900 light:text-gray-900">{timetable.name}</h4> {/* Adjusted text color */}
                    <p className="text-sm text-text-muted dark:text-gray-400 light:text-gray-500">Updated {timetable.lastUpdated}</p> {/* Adjusted text color */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    timetable.status === 'Active' ? 'bg-success-900/20 text-success-200 dark:bg-success-900 dark:text-success-200 light:bg-success-100 light:text-success-800' : // Adjusted colors
                    timetable.status === 'Draft' ? 'bg-warning-900/20 text-warning-200 dark:bg-warning-900 dark:text-warning-200 light:bg-warning-100 light:text-warning-800' : // Adjusted colors
                    'bg-gold-accent-900/20 text-gold-accent-200 light:bg-primary-100 light:text-primary-800' // Use gold accent for other status
                  }`}>
                    {timetable.status}
                  </span>
                  {timetable.conflicts > 0 && (
                    <span className="px-2 py-1 bg-danger-900 text-danger-200 rounded-full text-xs font-medium light:bg-danger-100 light:text-danger-800"> {/* Adjusted colors */}
                      {timetable.conflicts} conflicts
                    </span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gold-accent-400 light:hover:text-primary-600"> {/* Use gold accent hover */}
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-success-400 light:hover:text-success-600"> {/* Use success hover */}
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-danger-400 light:hover:text-danger-600"> {/* Use danger hover */}
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gold-accent-400 light:hover:text-secondary-600"> {/* Use gold accent hover */}
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900">User Management for EDUNIRIX</h3> {/* Adjusted text color */}
        <button className="px-4 py-2 bg-gold-accent-500 text-black rounded-lg hover:bg-gold-accent-600 transition-colors flex items-center space-x-2"> {/* Updated button colors */}
          <Plus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      <div className="card"> {/* Use card component class */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800 rounded-lg light:bg-primary-50"> {/* Adjusted background */}
              <Users className="w-12 h-12 text-gold-accent-400 light:text-primary-600 mx-auto mb-4" /> {/* Use gold accent */}
              <h4 className="text-xl font-semibold text-text-light dark:text-gray-900 light:text-gray-900">1,234</h4> {/* Adjusted text color */}
              <p className="text-text-muted dark:text-gray-400 light:text-gray-600">Total Students</p> {/* Adjusted text color */}
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-lg light:bg-success-50"> {/* Adjusted background */}
              <GraduationCap className="w-12 h-12 text-success-400 light:text-success-600 mx-auto mb-4" /> {/* Kept green */}
              <h4 className="text-xl font-semibold text-text-light dark:text-gray-900 light:text-gray-900">89</h4> {/* Adjusted text color */}
              <p className="text-text-muted dark:text-gray-400 light:text-gray-600">Total Teachers</p> {/* Adjusted text color */}
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-lg light:bg-secondary-50"> {/* Adjusted background */}
              <Building2 className="w-12 h-12 text-gold-accent-400 light:text-secondary-600 mx-auto mb-4" /> {/* Use gold accent */}
              <h4 className="text-xl font-semibold text-text-light dark:text-gray-900 light:text-gray-900">23</h4> {/* Adjusted text color */}
              <p className="text-text-muted dark:text-gray-400 light:text-gray-600">Available Rooms</p> {/* Adjusted text color */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card"> {/* Use card component class */}
          <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900 mb-4">Timetable Conflicts Analytics</h3> {/* Adjusted text color */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-muted dark:text-gray-400 light:text-gray-600">This Week</span> {/* Adjusted text color */}
              <span className="font-semibold text-danger-400 light:text-danger-600">5 conflicts</span> {/* Kept danger */}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted dark:text-gray-400 light:text-gray-600">Last Week</span> {/* Adjusted text color */}
              <span className="font-semibold text-warning-400 light:text-warning-600">12 conflicts</span> {/* Kept warning */}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted dark:text-gray-400 light:text-gray-600">This Month</span> {/* Adjusted text color */}
              <span className="font-semibold text-success-400 light:text-success-600">23 conflicts</span> {/* Kept success */}
            </div>
          </div>
        </div>

        <div className="card"> {/* Use card component class */}
          <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900 mb-4">Room Utilization Analytics</h3> {/* Adjusted text color */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-muted dark:text-gray-400 light:text-gray-600">Computer Lab 1</span> {/* Adjusted text color */}
              <span className="font-semibold text-gold-accent-400 light:text-primary-600">85%</span> {/* Use gold accent */}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted dark:text-gray-400 light:text-gray-600">Lecture Hall A</span> {/* Adjusted text color */}
              <span className="font-semibold text-success-400 light:text-success-600">92%</span> {/* Kept success */}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted dark:text-gray-400 light:text-gray-600">Science Lab</span> {/* Adjusted text color */}
              <span className="font-semibold text-gold-accent-400 light:text-secondary-600">78%</span> {/* Use gold accent */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    // Use background-dark for default, light mode handled by global index.css
    <div className="min-h-screen bg-background-dark transition-colors">
      {/* Header */}
      <div className="bg-background-dark border-b border-gray-700 light:bg-white light:border-gray-200"> {/* Adjusted background/border */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
               {/* EDUNIRIX Logo - Updated path */}
              {/* Consider a gold version of the logo for dark mode */}
              <img src="/EdunirixLogo.png" alt="EDUNIRIX Logo" className="w-8 h-8 rounded-full filter invert dark:filter-none" /> {/* Assuming logo is in public folder */}

              <h1 className="text-xl font-bold text-text-light dark:text-gray-900 light:text-gray-900">EDUNIRIX - Admin Dashboard</h1> {/* Adjusted text color */}
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle will be handled globally or in a dedicated header component */}
              {/* <ThemeToggle /> */}
              <span className="text-sm text-text-muted dark:text-gray-500 light:text-gray-500">Welcome, {user?.name}</span> {/* Adjusted text color */}
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="text-text-muted hover:text-danger-400 light:text-gray-500 light:hover:text-danger-600 transition-colors duration-200" // Adjusted text color and hover
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-700 light:border-gray-200"> {/* Adjusted border */}
          <div className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'overview'
                  ? 'border-gold-accent-500 text-gold-accent-400 light:border-primary-600 light:text-primary-600' // Use gold accent for active tab
                  : 'border-transparent text-text-muted hover:text-gold-accent-400 hover:border-gray-300 light:text-gray-500 light:hover:text-gray-700 light:hover:border-gray-300' // Adjusted colors and hover
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('timetables')}
               className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'timetables'
                  ? 'border-gold-accent-500 text-gold-accent-400 light:border-primary-600 light:text-primary-600' // Use gold accent for active tab
                  : 'border-transparent text-text-muted hover:text-gold-accent-400 hover:border-gray-300 light:text-gray-500 light:hover:text-gray-700 light:hover:border-gray-300' // Adjusted colors and hover
              }`}
            >
              Timetables
            </button>
            <button
              onClick={() => setActiveTab('users')}
               className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'users'
                  ? 'border-gold-accent-500 text-gold-accent-400 light:border-primary-600 light:text-primary-600' // Use gold accent for active tab
                  : 'border-transparent text-text-muted hover:text-gold-accent-400 hover:border-gray-300 light:text-gray-500 light:hover:text-gray-700 light:hover:border-gray-300' // Adjusted colors and hover
              }`}
            >
              Users
            </button>
             <button
              onClick={() => setActiveTab('analytics')}
               className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'analytics'
                  ? 'border-gold-accent-500 text-gold-accent-400 light:border-primary-600 light:text-primary-600' // Use gold accent for active tab
                  : 'border-transparent text-text-muted hover:text-gold-accent-400 hover:border-gray-300 light:text-gray-500 light:hover:text-gray-700 light:hover:border-gray-300' // Adjusted colors and hover
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Render active tab content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'timetables' && renderTimetables()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default AdminDashboard;