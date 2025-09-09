import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import {
  Calendar,
  Building2,
  ArrowLeft,
  ArrowRight,
  Plus,
  Upload,
  Download,
  Edit2,
  Trash2,
  Save,
  X,
  MapPin,
  Users,
  Monitor,
  Beaker,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Layers,
  Home
} from 'lucide-react';
import {
  getClassrooms,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  uploadCSV,
  exportData
} from '../services/api';

const ClassroomsData = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [roomForm, setRoomForm] = useState({
    id: '',
    name: '',
    building: '',
    floor: '',
    capacity: '',
    type: '',
    features: [],
    availability: {
      monday: { available: true, startTime: '08:00', endTime: '18:00' },
      tuesday: { available: true, startTime: '08:00', endTime: '18:00' },
      wednesday: { available: true, startTime: '08:00', endTime: '18:00' },
      thursday: { available: true, startTime: '08:00', endTime: '18:00' },
      friday: { available: true, startTime: '08:00', endTime: '18:00' },
      saturday: { available: true, startTime: '08:00', endTime: '13:00' },
      sunday: { available: false, startTime: '08:00', endTime: '13:00' }
    },
    priority: 'medium',
    status: 'available'
  });

  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildings = ['Engineering Block', 'CS Building', 'Science Block', 'Main Building', 'Arts Building'];
  const floors = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor'];
  const roomTypes = ['Lecture Hall', 'Tutorial Room', 'Computer Lab', 'Science Lab', 'Seminar Hall', 'Workshop'];
  const featuresList = [
    'Projector', 'Sound System', 'Air Conditioning', 'WiFi', 'Whiteboard',
    'Smart Board', 'Computers', 'Lab Equipment', 'Safety Equipment',
    'Ventilation', 'Storage', 'Stage', 'Microphone System'
  ];

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Load classrooms data on component mount
  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = async () => {
    try {
      setLoading(true);
      const response = await getClassrooms();
      setClassrooms(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading classrooms:', err);
      setError('Failed to load classrooms data');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/teachers-data');
  };

  const handleAddRoom = () => {
    setShowAddForm(true);
    setEditingRoom(null);
    setRoomForm({
      id: `R${String(classrooms.length + 1).padStart(3, '0')}`,
      name: '',
      building: '',
      floor: '',
      capacity: '',
      type: '',
      features: [],
      availability: {
        monday: { available: true, startTime: '08:00', endTime: '18:00' },
        tuesday: { available: true, startTime: '08:00', endTime: '18:00' },
        wednesday: { available: true, startTime: '08:00', endTime: '18:00' },
        thursday: { available: true, startTime: '08:00', endTime: '18:00' },
        friday: { available: true, startTime: '08:00', endTime: '18:00' },
        saturday: { available: true, startTime: '08:00', endTime: '13:00' },
        sunday: { available: false, startTime: '08:00', endTime: '13:00' }
      },
      priority: 'medium',
      status: 'available'
    });
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room.id);
    setRoomForm(room);
    setShowAddForm(true);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteClassroom(roomId);
      // Reload classrooms after deletion
      loadClassrooms();
    } catch (err) {
      console.error('Error deleting classroom:', err);
      alert('Failed to delete classroom: ' + err.message);
    }
  };

  const handleSaveRoom = async () => {
    try {
      if (editingRoom) {
        await updateClassroom(editingRoom, roomForm);
      } else {
        await createClassroom(roomForm);
      }
      // Reload classrooms after save
      loadClassrooms();
      setShowAddForm(false);
      setEditingRoom(null);
    } catch (err) {
      console.error('Error saving classroom:', err);
      alert('Failed to save classroom: ' + err.message);
    }
  };

  const handleFeatureToggle = (feature) => {
    const currentFeatures = roomForm.features || [];
    if (currentFeatures.includes(feature)) {
      setRoomForm({
        ...roomForm,
        features: currentFeatures.filter(f => f !== feature)
      });
    } else {
      setRoomForm({
        ...roomForm,
        features: [...currentFeatures, feature]
      });
    }
  };

  const handleAvailabilityChange = (day, field, value) => {
    setRoomForm({
      ...roomForm,
      availability: {
        ...roomForm.availability,
        [day]: {
          ...roomForm.availability[day],
          [field]: value
        }
      }
    });
  };

  const getRoomTypeIcon = (type) => {
    switch (type) {
      case 'Computer Lab':
        return Monitor;
      case 'Science Lab':
        return Beaker;
      case 'Lecture Hall':
      case 'Seminar Hall':
        return GraduationCap;
      default:
        return Building2;
    }
  };

  const renderRoomForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
       {/* Modal Card - White background with subtle border */}
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700"> {/* Adjusted border */}
          <div className="flex justify-between items-center">
             {/* Heading - Dark Gray */}
            <h3 className="text-xl font-bold text-text-dark dark:text-white">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
             {/* Heading - Dark Gray */}
            <h4 className="text-lg font-semibold text-text-dark dark:text-white mb-4">Room Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                 {/* Label - Secondary Dark Gray */}
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Room ID</label>
                {/* Input styled by index.css + focus ring */}
                <input
                  type="text"
                  value={roomForm.id}
                  onChange={(e) => setRoomForm({...roomForm, id: e.target.value})}
                   className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="R101"
                />
              </div>
              <div>
                 {/* Label - Secondary Dark Gray */}
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Room Name</label>
                 {/* Input styled by index.css + focus ring */}
                <input
                  type="text"
                  value={roomForm.name}
                  onChange={(e) => setRoomForm({...roomForm, name: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Lecture Hall A"
                />
              </div>
              <div>
                 {/* Label - Secondary Dark Gray */}
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Building</label>
                 {/* Select styled by index.css + focus ring */}
                <select
                  value={roomForm.building}
                  onChange={(e) => setRoomForm({...roomForm, building: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="">Select Building</option>
                  {buildings.map(building => (
                    <option key={building} value={building}>{building}</option>
                  ))}
                </select>
              </div>
              <div>
                 {/* Label - Secondary Dark Gray */}
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Floor</label>
                 {/* Select styled by index.css + focus ring */}
                <select
                  value={roomForm.floor}
                  onChange={(e) => setRoomForm({...roomForm, floor: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="">Select Floor</option>
                  {floors.map(floor => (
                    <option key={floor} value={floor}>{floor}</option>
                  ))}
                </select>
              </div>
              <div>
                 {/* Label - Secondary Dark Gray */}
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Capacity</label>
                 {/* Input styled by index.css + focus ring */}
                <input
                  type="number"
                  value={roomForm.capacity}
                  onChange={(e) => setRoomForm({...roomForm, capacity: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="30"
                  min="1"
                />
              </div>
              <div>
                 {/* Label - Secondary Dark Gray */}
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Room Type</label>
                 {/* Select styled by index.css + focus ring */}
                <select
                  value={roomForm.type}
                  onChange={(e) => setRoomForm({...roomForm, type: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="">Select Room Type</option>
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                 {/* Label - Secondary Dark Gray */}
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Priority</label>
                 {/* Select styled by index.css + focus ring */}
                <select
                  value={roomForm.priority}
                  onChange={(e) => setRoomForm({...roomForm, priority: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div>
                 {/* Label - Secondary Dark Gray */}
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-2">Status</label>
                 {/* Select styled by index.css + focus ring */}
                <select
                  value={roomForm.status}
                  onChange={(e) => setRoomForm({...roomForm, status: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="available">Available</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
             {/* Heading - Dark Gray */}
            <h4 className="text-lg font-semibold text-text-dark dark:text-white mb-4">Room Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {featuresList.map(feature => (
                <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                   {/* Checkbox styled with Accent color */}
                  <input
                    type="checkbox"
                    checked={roomForm.features?.includes(feature) || false}
                    onChange={() => handleFeatureToggle(feature)}
                    className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent dark:border-gray-600 dark:text-accent-400" // Updated colors and focus ring
                  />
                   {/* Text - Secondary Dark Gray */}
                  <span className="text-sm text-text-secondary dark:text-gray-300">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Schedule */}
          <div>
             {/* Heading - Dark Gray */}
            <h4 className="text-lg font-semibold text-text-dark dark:text-white mb-4">Room Availability</h4>
            <div className="space-y-3">
              {daysOfWeek.map(day => (
                <div key={day} className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg dark:bg-gray-700"> {/* Adjusted background */}
                  <div className="w-20">
                     {/* Text - Secondary Dark Gray */}
                    <span className="text-sm font-medium text-text-secondary dark:text-gray-300 capitalize">
                      {day}
                    </span>
                  </div>
                  <label className="flex items-center space-x-2">
                     {/* Checkbox styled with Accent color */}
                    <input
                      type="checkbox"
                      checked={roomForm.availability[day]?.available || false}
                      onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent dark:border-gray-600 dark:text-accent-400" // Updated colors and focus ring
                    />
                     {/* Text - Secondary Dark Gray */}
                    <span className="text-sm text-text-secondary dark:text-gray-300">Available</span>
                  </label>
                  {roomForm.availability[day]?.available && (
                    <>
                       {/* Input styled by index.css + focus ring */}
                      <input
                        type="time"
                        value={roomForm.availability[day]?.startTime || '08:00'}
                        onChange={(e) => handleAvailabilityChange(day, 'startTime', e.target.value)}
                        className="px-3 py-1 border rounded focus:ring-2 focus:ring-accent text-sm"
                      />
                       {/* Text - Secondary Dark Gray */}
                      <span className="text-text-secondary dark:text-gray-400">to</span>
                       {/* Input styled by index.css + focus ring */}
                      <input
                        type="time"
                        value={roomForm.availability[day]?.endTime || '18:00'}
                        onChange={(e) => handleAvailabilityChange(day, 'endTime', e.target.value)}
                        className="px-3 py-1 border rounded focus:ring-2 focus:ring-accent text-sm"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4"> {/* Adjusted border */}
           {/* Cancel Button - subtle background/border with hover */}
          <button
            onClick={() => setShowAddForm(false)}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-text-secondary dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" // Updated colors/border/hover
          >
            Cancel
          </button>
           {/* Save Button - Accent Background with White Text */}
          <button
            onClick={handleSaveRoom}
            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark flex items-center space-x-2 transition-colors duration-200 dark:bg-primary dark:hover:bg-primary-dark dark:text-black" // Updated button colors
          >
            <Save className="w-4 h-4" />
            <span>{editingRoom ? 'Update' : 'Save'} Room</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderRoomsList = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
           {/* Spinner - Accent color */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent dark:border-accent-400"></div>
        </div>
      );
    }

    if (error) {
      return (
        {/* Error Card - Danger Red background/border */}
        <div className="bg-danger-900/20 dark:bg-danger-900/20 border border-danger-800 dark:border-danger-800 rounded-lg p-6 light:bg-danger-50 light:border-danger-200"> {/* Adjusted background/border */}
          <div className="flex items-center space-x-3">
             {/* Icon - Danger Red */}
            <AlertCircle className="w-5 h-5 text-danger-400 dark:text-danger-400" />
            <div>
               {/* Heading - Danger Red */}
              <h3 className="font-medium text-danger-100 dark:text-danger-100 light:text-danger-900">Error Loading Classrooms</h3>
               {/* Text - Danger Red */}
              <p className="text-danger-300 dark:text-danger-300 light:text-danger-700">{error}</p>
               {/* Retry Button - Danger Red */}
              <button
                onClick={loadClassrooms}
                className="mt-2 px-4 py-2 bg-danger-600 text-white rounded hover:bg-danger-700 transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Stat Card - White background with subtle border */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                 {/* Text - Secondary Dark Gray */}
                <p className="text-sm text-text-secondary dark:text-gray-400">Total Rooms</p>
                 {/* Text - Dark Gray */}
                <p className="text-2xl font-bold text-text-dark dark:text-white">{classrooms.length}</p>
              </div>
               {/* Icon - Primary (Sky Blue) */}
              <Building2 className="w-8 h-8 text-primary dark:text-primary-400" />
            </div>
          </div>
           {/* Stat Card - White background with subtle border */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                 {/* Text - Secondary Dark Gray */}
                <p className="text-sm text-text-secondary dark:text-gray-400">Available Rooms</p>
                 {/* Text - Dark Gray */}
                <p className="text-2xl font-bold text-text-dark dark:text-white">
                  {classrooms.filter(r => r.status === 'available').length}
                </p>
              </div>
               {/* Icon - Success Green */}
              <CheckCircle className="w-8 h-8 text-success-500 dark:text-success-400" />
            </div>
          </div>
            {/* Stat Card - White background with subtle border */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                 {/* Text - Secondary Dark Gray */}
                <p className="text-sm text-text-secondary dark:text-gray-400">Buildings</p>
                 {/* Text - Dark Gray */}
                <p className="text-2xl font-bold text-text-dark dark:text-white">
                  {[...new Set(classrooms.map(r => r.building))].length}
                </p>
              </div>
               {/* Icon - Muted (Light Gray) */}
              <Home className="w-8 h-8 text-muted dark:text-gray-400" />
            </div>
          </div>
            {/* Stat Card - White background with subtle border */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                 {/* Text - Secondary Dark Gray */}
                <p className="text-sm text-text-secondary dark:text-gray-400">Total Capacity</p>
                 {/* Text - Dark Gray */}
                <p className="text-2xl font-bold text-text-dark dark:text-white">
                  {classrooms.reduce((sum, room) => sum + parseInt(room.capacity || 0), 0)}
                </p>
              </div>
               {/* Icon - Accent (Coral) */}
              <Users className="w-8 h-8 text-accent dark:text-accent-400" />
            </div>
          </div>
        </div>

        {/* Rooms Table - Card with subtle background/border */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700"> {/* Adjusted border */}
            <div className="flex justify-between items-center">
              {/* Heading - Dark Gray */}
              <h3 className="text-lg font-semibold text-text-dark dark:text-white">Classrooms & Labs for EDUNIRIX</h3>
              <div className="flex space-x-3">
                 {/* Button - subtle background/border with hover */}
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"> {/* Updated colors/hover */}
                  <Upload className="w-4 h-4" />
                  <span>Import CSV</span>
                </button>
                 {/* Button - Success Green */}
                <button className="flex items-center space-x-2 px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors duration-200">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                 {/* Button - Accent Background with White Text */}
                <button
                  onClick={handleAddRoom}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors duration-200 dark:bg-primary dark:hover:bg-primary-dark dark:text-black" // Updated button colors
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Room</span>
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
               {/* Table Header - subtle background */}
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                   {/* Header Text - Secondary Dark Gray */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-400 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-400 uppercase tracking-wider">Type & Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-400 uppercase tracking-wider">Features</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-400 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
               {/* Table Body - White background with subtle hover */}
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {classrooms.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                         {/* Icon - Gray */}
                        <Building2 className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" />
                         {/* Heading - Dark Gray */}
                        <h3 className="text-lg font-medium text-text-dark dark:text-white mb-2">No Classrooms Found</h3>
                         {/* Text - Secondary Dark Gray */}
                        <p className="text-text-secondary dark:text-gray-400 mb-4">Get started by adding your first classroom.</p>
                         {/* Button - Accent Background with White Text */}
                        <button
                          onClick={handleAddRoom}
                          className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors duration-200 dark:bg-primary dark:hover:bg-primary-dark dark:text-black" // Updated button colors
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add First Room
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  classrooms.map((room) => {
                    const RoomIcon = getRoomTypeIcon(room.type);
                    return (
                      <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"> {/* Adjusted hover background */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                               {/* Icon Container - Primary Background with Primary Icon */}
                              <div className="h-10 w-10 rounded-full bg-primary-900/20 dark:bg-primary-900/20 light:bg-primary-100 flex items-center justify-center"> {/* Use primary */}
                                <RoomIcon className="h-5 w-5 text-primary dark:text-primary-400 light:text-primary-600" /> {/* Use primary */}
                              </div>
                            </div>
                            <div className="ml-4">
                               {/* Text - Dark Gray */}
                              <div className="text-sm font-medium text-text-dark dark:text-white">{room.name}</div>
                               {/* Text - Secondary Dark Gray */}
                              <div className="text-sm text-text-secondary dark:text-gray-500">{room.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           {/* Text - Dark Gray */}
                          <div className="text-sm text-text-dark dark:text-white">{room.building}</div>
                           {/* Text - Secondary Dark Gray */}
                          <div className="text-sm text-text-secondary dark:text-gray-500">{room.floor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           {/* Text - Dark Gray */}
                          <div className="text-sm text-text-dark dark:text-white">{room.type}</div>
                           {/* Text - Secondary Dark Gray */}
                          <div className="text-sm text-text-secondary dark:text-gray-500">Capacity: {room.capacity}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {room.features.slice(0, 3).map((feature, index) => (
                              <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-400 rounded"> {/* Updated background/text */}
                                {feature}
                              </span>
                            ))}
                            {room.features.length > 3 && (
                               {/* Feature Count Badge - Primary background/text */}
                              <span className="inline-block px-2 py-1 text-xs bg-primary-900/20 dark:bg-primary-900/20 text-primary dark:text-primary-400 rounded light:bg-primary-100 light:text-primary-600"> {/* Use primary */}
                                +{room.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           {/* Priority Badge - Colors based on priority */}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            room.priority === 'high'
                              ? 'bg-danger-900/20 text-danger-200 dark:bg-danger-900/20 dark:text-danger-200 light:bg-danger-100 light:text-danger-800' // Adjusted colors
                              : room.priority === 'medium'
                              ? 'bg-warning-900/20 text-warning-200 dark:bg-warning-900/20 dark:text-warning-200 light:bg-warning-100 light:text-warning-800' // Adjusted colors
                              : 'bg-success-900/20 text-success-200 dark:bg-success-900/20 dark:text-success-200 light:bg-success-100 light:text-success-800' // Adjusted colors
                          }`}>
                            {room.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           {/* Status Badge - Colors based on status */}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            room.status === 'available'
                              ? 'bg-success-900/20 text-success-200 dark:bg-success-900/20 dark:text-success-200 light:bg-success-100 light:text-success-800' : // Adjusted colors
                            room.status === 'maintenance'
                              ? 'bg-warning-900/20 text-warning-200 dark:bg-warning-900/20 dark:text-warning-200 light:bg-warning-100 light:text-warning-800' : // Adjusted colors
                            'bg-danger-900/20 text-danger-200 dark:bg-danger-900/20 light:bg-danger-100 light:text-danger-800' // Adjusted colors
                          }`}>
                            {room.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                           {/* Icon Buttons - Gray with Primary/Accent/Danger/Success hover */}
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEditRoom(room)}
                              className="text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200" // Use primary hover
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRoom(room.id)}
                              className="text-gray-400 hover:text-danger dark:hover:text-danger-400 transition-colors duration-200" // Kept danger hover
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && renderRoomForm()}
    </div>
  );
};

export default ClassroomsData;