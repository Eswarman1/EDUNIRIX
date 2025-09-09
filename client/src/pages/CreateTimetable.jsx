import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import {
  Calendar,
  Users,
  Building2,
  BookOpen,
  Settings,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  GraduationCap,
  Upload,
  FileText,
  Database
} from 'lucide-react';

const CreateTimetable = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [timetableData, setTimetableData] = useState({
    year: '',
    semester: '',
    academicYear: '',
    department: ''
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: FileText },
    { id: 2, title: 'Teachers Data', icon: Users },
    { id: 3, title: 'Students Data', icon: GraduationCap },
    { id: 4, title: 'Classrooms & Labs', icon: Building2 },
    { id: 5, title: 'Programs & Courses', icon: BookOpen },
    { id: 6, title: 'Infrastructure & Policy', icon: Settings }
  ];

  const dataCategories = [
    {
      id: 'teachers',
      title: 'Teachers Data',
      description: 'Manage teacher profiles, subjects, and availability',
      icon: Users,
      color: 'gold-accent', // Changed color to gold accent
      route: '/teachers-data',
      status: 'pending',
      items: ['Teacher Profiles', 'Subject Assignments', 'Availability & Priority', 'Teaching Hours per Week']
    },
    {
      id: 'students',
      title: 'Students Data',
      description: 'Manage student profiles, enrollment, and academic information',
      icon: GraduationCap,
      color: 'gold-accent', // Changed color to gold accent
      route: '/student-management',
      status: 'pending',
      items: ['Student Profiles', 'Academic Information', 'Division & Batch Assignment', 'Course Enrollment']
    },
    {
      id: 'classrooms',
      title: 'Classrooms & Labs',
      description: 'Configure room details and capacity',
      icon: Building2,
      color: 'gold-accent', // Changed color to gold accent
      route: '/classrooms-data',
      status: 'pending',
      items: ['Room Details (ID, Building, Floor)', 'Capacity', 'Type (Lecture, Lab, Computer)', 'Total Room Count']
    },
    {
      id: 'programs',
      title: 'Programs, Courses & Batches',
      description: 'Set up academic programs and course structure',
      icon: BookOpen,
      color: 'gold-accent', // Changed color to gold accent
      route: '/programs-data',
      status: 'pending',
      items: ['School/Faculty Selection', 'Courses per School', 'Divisions & Student Count', 'Lab Batches']
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure & Policy',
      description: 'Define policies and academic calendar',
      icon: Settings,
      color: 'gold-accent', // Changed color to gold accent
      route: '/infrastructure-data',
      status: 'pending',
      items: ['General Policies', 'Working Hours & Break Timings', 'Academic Calendar', 'Holidays & Exams']
    }
  ];

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleDataCategoryClick = (route) => {
    navigate(route);
  };

  const handleBasicInfoSubmit = () => {
    setCurrentStep(2);
  };

  const renderBasicInformation = () => (
    <div className="card"> {/* Use card component class */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-light dark:text-gray-900 light:text-gray-900 mb-2">Create New Timetable for EDUNIRIX</h2> {/* Adjusted text color */}
        <p className="text-text-muted dark:text-gray-400 light:text-gray-600">Enter the basic information for your timetable generation</p> {/* Adjusted text color */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Academic Year</label> {/* Adjusted text color */}
          <select
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white light:bg-white light:border-gray-300 light:text-gray-900" // Updated colors and focus ring
            value={timetableData.academicYear}
            onChange={(e) => setTimetableData({...timetableData, academicYear: e.target.value})}
          >
            <option value="">Select Academic Year</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Department/School</label> {/* Adjusted text color */}
          <select
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white light:bg-white light:border-gray-300 light:text-gray-900" // Updated colors and focus ring
            value={timetableData.department}
            onChange={(e) => setTimetableData({...timetableData, department: e.target.value})}
          >
            <option value="">Select Department</option>
            <option value="engineering">Engineering</option>
            <option value="computer-science">Computer Science</option>
            <option value="business">Business Administration</option>
            <option value="medical">Medical Sciences</option>
            <option value="law">Law</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Year</label> {/* Adjusted text color */}
          <select
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white light:bg-white light:border-gray-300 light:text-gray-900" // Updated colors and focus ring
            value={timetableData.year}
            onChange={(e) => setTimetableData({...timetableData, year: e.target.value})}
          >
            <option value="">Select Year</option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
            <option value="4">Fourth Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Semester</label> {/* Adjusted text color */}
          <select
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white light:bg-white light:border-gray-300 light:text-gray-900" // Updated colors and focus ring
            value={timetableData.semester}
            onChange={(e) => setTimetableData({...timetableData, semester: e.target.value})}
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="flex items-center px-6 py-3 text-text-muted dark:text-gray-400 hover:text-gold-accent-400 light:text-gray-600 light:hover:text-gray-800 font-medium" // Adjusted text color and hover
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
        <button
          onClick={handleBasicInfoSubmit}
          disabled={!timetableData.academicYear || !timetableData.department || !timetableData.year || !timetableData.semester}
          className="flex items-center px-6 py-3 bg-gold-accent-500 text-black rounded-lg hover:bg-gold-accent-600 disabled:bg-gray-700 disabled:cursor-not-allowed font-medium transition-colors duration-200 light:disabled:bg-gray-300" // Updated button colors and disabled state
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderDataManagement = () => (
    <div className="space-y-6">
      <div className="card"> {/* Use card component class */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-light dark:text-gray-900 light:text-gray-900 mb-2">Data Management for EDUNIRIX</h2> {/* Adjusted text color */}
          <p className="text-text-muted dark:text-gray-400 light:text-gray-600">Configure all required data for timetable generation</p> {/* Adjusted text color */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dataCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleDataCategoryClick(category.route)}
              className="group card p-6 hover:border-gold-accent-500 light:hover:border-primary-500 cursor-pointer" // Use card component class, adjust hover border
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${category.color}-900/20 group-hover:bg-${category.color}-800/30 transition-colors light:bg-${category.color}-100 light:group-hover:bg-${category.color}-200`}> {/* Adjusted background */}
                  <category.icon className={`w-6 h-6 text-${category.color}-400 group-hover:text-${category.color}-300 light:text-${category.color}-600 light:group-hover:text-${category.color}-700`} /> {/* Adjusted icon color */}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.status === 'completed' ? 'bg-success-900/20 text-success-200 dark:bg-success-900 dark:text-success-200 light:bg-success-100 light:text-success-800' : // Adjusted colors
                    category.status === 'in-progress' ? 'bg-warning-900/20 text-warning-200 dark:bg-warning-900 dark:text-warning-200 light:bg-warning-100 light:text-warning-800' : // Adjusted colors
                    'bg-gray-700 text-gray-200 light:bg-gray-100 light:text-gray-600' // Adjusted colors
                  }`}>
                    {category.status === 'completed' ? 'Completed' :
                     category.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-gold-accent-400 light:text-gray-400 light:group-hover:text-primary-600 transition-colors" /> {/* Adjusted text color and hover */}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900 mb-2 group-hover:text-gold-accent-400 light:group-hover:text-primary-600 transition-colors"> {/* Adjusted text color and hover */}
                {category.title}
              </h3>
              <p className="text-text-muted dark:text-gray-400 light:text-gray-600 mb-4">{category.description}</p> {/* Adjusted text color */}

              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-text-muted dark:text-gray-500 light:text-gray-500"> {/* Adjusted text color */}
                    <div className="w-1.5 h-1.5 bg-gray-600 dark:bg-gray-600 rounded-full mr-2 light:bg-gray-300"></div> {/* Adjusted background */}
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gold-accent-900/20 dark:bg-primary-900/20 rounded-lg border border-gold-accent-800 dark:border-primary-800 light:bg-primary-50 light:border-primary-200"> {/* Adjusted background/border */}
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-gold-accent-400 dark:text-primary-600 light:text-primary-600 mt-0.5" /> {/* Use gold accent */}
            <div>
              <h4 className="font-medium text-gold-accent-100 dark:text-primary-900 light:text-primary-900 mb-1">Data Requirements</h4> {/* Adjusted text color */}
              <p className="text-gold-accent-300 dark:text-primary-700 light:text-primary-700 text-sm"> {/* Adjusted text color */}
                All data categories must be configured before you can generate a timetable.
                You can upload CSV files or fill forms manually for each category.
              </p>
              {/* Added Phone Number */}
               <p className="mt-2 text-xs text-gold-accent-400 dark:text-primary-600 light:text-primary-600"> {/* Adjusted text color */}
                For assistance with data import, contact support at <span className="font-semibold">6281888439</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center px-6 py-3 text-text-muted dark:text-gray-400 hover:text-gold-accent-400 light:text-gray-600 light:hover:text-gray-800 font-medium" // Adjusted text color and hover
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Basic Info
          </button>
          <button
            onClick={() => navigate('/generate-timetable')}
            className="flex items-center px-6 py-3 bg-gold-accent-500 text-black rounded-lg hover:bg-gold-accent-600 font-medium transition-colors duration-200" // Updated button colors
          >
            <Database className="w-4 h-4 mr-2" />
            Generate Timetable
          </button>
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

              <h1 className="text-xl font-bold text-text-light dark:text-gray-900 light:text-gray-900">EDUNIRIX - AI Timetable Generator</h1> {/* Adjusted text color */}
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

      {/* Progress Steps */}
      <div className="bg-background-dark border-b border-gray-700 light:bg-white light:border-gray-200"> {/* Adjusted background/border */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-gold-accent-500 border-gold-accent-500 text-black' // Updated active color
                    : 'border-gray-700 text-text-muted light:border-gray-300 light:text-gray-500' // Adjusted border/text color
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-gold-accent-400 light:text-primary-600' : 'text-text-muted dark:text-gray-400 light:text-gray-500' // Adjusted text color
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-gold-accent-500 light:bg-primary-600' : 'bg-gray-700 light:bg-gray-300' // Adjusted background
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 ? renderBasicInformation() : renderDataManagement()}
      </div>
    </div>
  );
};

export default CreateTimetable;