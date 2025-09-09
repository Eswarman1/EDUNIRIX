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
  Database,
  Zap
} from 'lucide-react';

const GenerateTimetable = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [dataValidation, setDataValidation] = useState({
    teachers: null,
    students: null,
    classrooms: null,
    programs: null,
    infrastructure: null,
    overall: { ready: false, message: 'Checking data...' }
  });
  const [algorithmSettings, setAlgorithmSettings] = useState({
    type: 'genetic', // Default algorithm
    maxIterations: 1000,
    populationSize: 200,
    crossoverRate: 0.8,
    mutationRate: 0.1,
    // Add other algorithm-specific settings
  });
  const [validationError, setValidationError] = useState('');

  // Simulate data validation on component mount or data change
  useEffect(() => {
    // In a real application, you would fetch actual data status from backend
    // and update the dataValidation state based on backend checks.
    const simulateValidation = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const simulatedStatus = {
        teachers: { ready: true, message: 'Teachers data is configured.' },
        students: { ready: true, message: 'Students data is configured.' },
        classrooms: { ready: true, message: 'Classrooms & Labs data is configured.' },
        programs: { ready: true, message: 'Programs & Courses data is configured.' },
        infrastructure: { ready: true, message: 'Infrastructure & Policy is configured.' },
      };

      const allReady = Object.values(simulatedStatus).every(status => status.ready);

      setDataValidation({
        ...simulatedStatus,
        overall: {
          ready: allReady,
          message: allReady ? 'All data is ready for generation.' : 'Some data is missing or incomplete. Please check the sections below.'
        }
      });
    };

    simulateValidation();
  }, []); // Dependency array could include state that triggers re-validation if data changes

  const handleBack = () => {
    navigate('/create-timetable'); // Navigate back to the data configuration page
  };

  const handleStartGeneration = async () => {
    if (!dataValidation.overall?.ready) {
      setValidationError('Cannot start generation: Data is not fully configured.');
      return;
    }

    setValidationError('');
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationComplete(false);

    try {
      // Simulate the AI timetable generation process
      // In a real application, you would call your backend API here
      console.log('Starting timetable generation with settings:', algorithmSettings);

      // Simulate progress updates
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 200)); // Simulate work being done
        setGenerationProgress(i);
      }

      // Simulate completion
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerationComplete(true);
      setIsGenerating(false);
      console.log('Timetable generation complete!');

    } catch (error) {
      console.error('Timetable generation failed:', error);
      setValidationError('Timetable generation failed. Please check server logs.');
      setIsGenerating(false);
      setGenerationComplete(false);
    }
  };

  const handleViewTimetable = () => {
    // Navigate to the generated timetable view page
    navigate('/view-timetable'); // Replace with your actual route
  };

  const renderDataValidation = () => (
    <div className="card"> {/* Use card component class */}
      <div className="p-6 border-b border-gray-700 light:border-gray-200"> {/* Adjusted border */}
        <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900 mb-2">Data Validation Status for EDUNIRIX</h3> {/* Adjusted text color */}
        <p className="text-sm text-text-muted dark:text-gray-400 light:text-gray-600">Ensure all required data is configured before generating the timetable.</p> {/* Adjusted text color */}
      </div>
      <div className="p-6 space-y-4">
        {Object.entries(dataValidation)
          .filter(([key]) => key !== 'overall') // Exclude the overall status from this list
          .map(([key, status]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {status?.ready ? (
                <CheckCircle className="w-5 h-5 text-success-500" /> // Kept green
              ) : (
                <AlertCircle className="w-5 h-5 text-warning-500" /> // Kept warning
              )}
              <span className={`text-sm font-medium ${status?.ready ? 'text-text-light dark:text-gray-900 light:text-gray-900' : 'text-text-muted dark:text-gray-600 light:text-gray-600'}`}> {/* Adjusted text color */}
                {key.charAt(0).toUpperCase() + key.slice(1)} Data
              </span>
            </div>
            <span className={`text-sm ${status?.ready ? 'text-success-400 dark:text-success-400 light:text-success-600' : 'text-warning-400 dark:text-warning-400 light:text-warning-600'}`}> {/* Adjusted text color */}
              {status?.message || 'Status unknown'}
            </span>
          </div>
        ))}
        <div className={`flex items-center justify-between pt-4 border-t ${dataValidation.overall?.ready ? 'border-success-800 dark:border-success-800 light:border-success-200' : 'border-warning-800 dark:border-warning-800 light:border-warning-200'}`}> {/* Adjusted border color */}
            <div className="flex items-center space-x-3">
                {dataValidation.overall?.ready ? (
                    <CheckCircle className="w-6 h-6 text-success-500" /> // Kept green
                ) : (
                    <AlertCircle className="w-6 h-6 text-warning-500" /> // Kept warning
                )}
                 <span className={`text-md font-bold ${dataValidation.overall?.ready ? 'text-text-light dark:text-gray-900 light:text-gray-900' : 'text-text-muted dark:text-gray-600 light:text-gray-600'}`}> {/* Adjusted text color */}
                    Overall Status
                </span>
            </div>
             <span className={`text-md font-bold ${dataValidation.overall?.ready ? 'text-success-400 dark:text-success-400 light:text-success-600' : 'text-warning-400 dark:text-warning-400 light:text-warning-600'}`}> {/* Adjusted text color */}
                {dataValidation.overall?.message}
            </span>
        </div>
      </div>
    </div>
  );

  const renderAlgorithmSelection = () => (
     <div className="card"> {/* Use card component class */}
        <div className="p-6 border-b border-gray-700 light:border-gray-200"> {/* Adjusted border */}
            <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900 mb-2">Algorithm Settings for EDUNIRIX</h3> {/* Adjusted text color */}
            <p className="text-sm text-text-muted dark:text-gray-400 light:text-gray-600">Choose and configure the AI algorithm for timetable generation.</p> {/* Adjusted text color */}
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Algorithm Type</label> {/* Adjusted text color */}
                <select
                    value={algorithmSettings.type}
                    onChange={(e) => setAlgorithmSettings({...algorithmSettings, type: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white light:bg-white light:border-gray-300 light:text-gray-900" // Updated colors and focus ring
                >
                    <option value="genetic">Genetic Algorithm</option>
                    <option value="simulated_annealing">Simulated Annealing (Coming Soon)</option>
                    <option value="constraint_programming">Constraint Programming (Coming Soon)</option>
                </select>
            </div>
             {/* Example Algorithm-Specific Settings */}
            {algorithmSettings.type === 'genetic' && (
                <>
                     <div>
                        <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Max Iterations</label> {/* Adjusted text color */}
                        <input
                            type="number"
                            value={algorithmSettings.maxIterations}
                            onChange={(e) => setAlgorithmSettings({...algorithmSettings, maxIterations: parseInt(e.target.value)})}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white placeholder-gray-500 light:bg-white light:border-gray-300 light:text-gray-900 light:placeholder-gray-400" // Updated colors and focus ring
                            min="100"
                            step="100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Population Size</label> {/* Adjusted text color */}
                         <input
                            type="number"
                            value={algorithmSettings.populationSize}
                            onChange={(e) => setAlgorithmSettings({...algorithmSettings, populationSize: parseInt(e.target.value)})}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white placeholder-gray-500 light:bg-white light:border-gray-300 light:text-gray-900 light:placeholder-gray-400" // Updated colors and focus ring
                            min="50"
                            step="50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Crossover Rate</label> {/* Adjusted text color */}
                         <input
                            type="number"
                            value={algorithmSettings.crossoverRate}
                            onChange={(e) => setAlgorithmSettings({...algorithmSettings, crossoverRate: parseFloat(e.target.value)})}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white placeholder-gray-500 light:bg-white light:border-gray-300 light:text-gray-900 light:placeholder-gray-400" // Updated colors and focus ring
                            min="0"
                            max="1"
                            step="0.05"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted dark:text-gray-300 light:text-gray-700 mb-2">Mutation Rate</label> {/* Adjusted text color */}
                         <input
                            type="number"
                            value={algorithmSettings.mutationRate}
                            onChange={(e) => setAlgorithmSettings({...algorithmSettings, mutationRate: parseFloat(e.target.value)})}
                             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 bg-gray-800 border-gray-700 text-white placeholder-gray-500 light:bg-white light:border-gray-300 light:text-gray-900 light:placeholder-gray-400" // Updated colors and focus ring
                            min="0"
                            max="1"
                            step="0.01"
                        />
                    </div>
                </>
            )}
        </div>
    </div>
  );


  const renderGenerationProgress = () => (
    <div className="card"> {/* Use card component class */}
      <div className="p-6 border-b border-gray-700 light:border-gray-200"> {/* Adjusted border */}
        <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900 mb-2">Timetable Generation in Progress</h3> {/* Adjusted text color */}
        <p className="text-sm text-text-muted dark:text-gray-400 light:text-gray-600">The AI is generating the optimal timetable based on your data and settings.</p> {/* Adjusted text color */}
      </div>
      <div className="p-6">
        <div className="w-full bg-gray-700 rounded-full h-4 light:bg-gray-200"> {/* Adjusted background */}
          <div
            className="bg-gold-accent-500 h-4 rounded-full text-xs font-medium text-black text-center p-0.5 leading-none transition-all duration-300 light:bg-primary-600 light:text-white" // Updated colors
            style={{ width: `${generationProgress}%` }}
          >
            {generationProgress}%
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-text-muted dark:text-gray-400 light:text-gray-600"> {/* Adjusted text color */}
          This may take a few minutes depending on the complexity of your data.
        </p>
         {/* Added Phone Number */}
         <p className="mt-2 text-xs text-text-muted dark:text-gray-400 light:text-gray-500 text-center"> {/* Adjusted text color */}
            Need assistance? Contact support at <span className="font-semibold text-gold-accent-400 dark:text-primary-600 light:text-primary-600">6281888439</span>. {/* Use gold accent */}
        </p>
      </div>
    </div>
  );

  const renderGenerationComplete = () => (
    <div className="card bg-success-900/20 dark:bg-success-900/20 border border-success-800 dark:border-success-800 light:bg-success-50 light:border-success-200"> {/* Adjusted background/border */}
      <div className="p-6 text-center">
        <CheckCircle className="w-12 h-12 text-success-500 dark:text-success-500 light:text-success-600 mx-auto mb-4" /> {/* Kept green */}
        <h3 className="text-xl font-bold text-success-100 dark:text-success-100 light:text-success-900 mb-2">Generation Complete!</h3> {/* Adjusted text color */}
        <p className="text-success-300 dark:text-success-300 light:text-success-700">Your timetable has been successfully generated.</p> {/* Adjusted text color */}
         {/* Added Phone Number */}
         <p className="mt-2 text-xs text-success-400 dark:text-success-400 light:text-success-600"> {/* Adjusted text color */}
            For any issues, contact support at <span className="font-semibold">6281888439</span>.
        </p>
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

              <h1 className="text-xl font-bold text-text-light dark:text-gray-900 light:text-gray-900">EDUNIRIX - Timetable Generation</h1> {/* Adjusted text color */}
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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-light dark:text-gray-900 light:text-gray-900 mb-2">AI Timetable Generation for EDUNIRIX</h2> {/* Adjusted text color */}
              <p className="text-text-muted dark:text-gray-400 light:text-gray-600"> {/* Adjusted text color */}
                Initiate the AI-powered timetable generation process based on your configured data.
              </p>
               {/* Added Phone Number */}
               <p className="mt-2 text-xs text-text-muted dark:text-gray-400 light:text-gray-500"> {/* Adjusted text color */}
                  Need assistance? Contact support at <span className="font-semibold text-gold-accent-400 dark:text-primary-600 light:text-primary-600">6281888439</span>. {/* Use gold accent */}
              </p>
            </div>
            <button
              onClick={handleBack}
              className="flex items-center px-6 py-3 text-text-muted dark:text-gray-400 hover:text-gold-accent-400 light:text-gray-600 light:hover:text-gray-800 font-medium" // Adjusted text color and hover
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Infrastructure Data
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {validationError && (
            <div className="bg-danger-900/20 border border-danger-800 text-danger-300 px-4 py-3 rounded"> {/* Use danger colors */}
              {validationError}
            </div>
          )}
          {/* Data Validation Status */}
          {!isGenerating && !generationComplete && renderDataValidation()}

          {/* Algorithm Selection & Settings */}
          {!isGenerating && !generationComplete && renderAlgorithmSelection()}

          {/* Generation Progress */}
          {isGenerating && renderGenerationProgress()}

          {/* Generation Complete */}
          {generationComplete && renderGenerationComplete()}

          {/* Ready to Generate Section */}
          {!isGenerating && !generationComplete && (
            <div className="card"> {/* Use card component class */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-light dark:text-gray-900 light:text-gray-900 mb-2">Ready to Generate</h3> {/* Adjusted text color */}
                  <p className="text-text-muted dark:text-gray-400 light:text-gray-600"> {/* Adjusted text color */}
                    All data has been validated and algorithm settings are configured.
                    Click "Generate Timetable" to start the process.
                  </p>
                   {/* Added Phone Number */}
                   <p className="mt-2 text-xs text-text-muted dark:text-gray-400 light:text-gray-500"> {/* Adjusted text color */}
                      Need assistance? Contact support at <span className="font-semibold text-gold-accent-400 dark:text-primary-600 light:text-primary-600">6281888439</span>. {/* Use gold accent */}
                  </p>
                </div>
                <button
                  onClick={handleStartGeneration}
                  disabled={!dataValidation.overall?.ready || isGenerating} // Disable button while generating
                  className="flex items-center space-x-2 px-8 py-4 bg-gold-accent-500 text-black rounded-lg hover:bg-gold-accent-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-colors duration-200 light:disabled:bg-gray-400" // Updated button colors and disabled state
                >
                  <Zap className="w-5 h-5" />
                  <span>Generate Timetable</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 text-text-muted dark:text-gray-400 hover:text-gold-accent-400 light:text-gray-600 light:hover:text-gray-800 font-medium" // Adjusted text color and hover
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          {generationComplete && (
            <button
              onClick={handleViewTimetable}
              className="flex items-center px-6 py-3 bg-gold-accent-500 text-black rounded-lg hover:bg-gold-accent-600 font-medium transition-colors duration-200" // Updated button colors
            >
              View Generated Timetable
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateTimetable;