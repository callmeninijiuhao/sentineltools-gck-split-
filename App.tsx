import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { PubOnboardingValidator } from './pages/PubOnboardingValidator';
import { IntegrationTest } from './pages/IntegrationTest';

// Placeholder components for other routes
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
    <div className="bg-gray-100 p-6 rounded-full mb-4">
        <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    </div>
    <h2 className="text-xl font-bold text-gray-300 mb-2">{title}</h2>
    <p className="text-sm">This module is currently under development.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#F5F7FA] font-sans text-pubmatic-text">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 ml-20 md:ml-72 transition-all duration-300 flex flex-col min-h-screen">
          
          {/* Top Navigation Bar */}
          <header className="bg-white border-b border-gray-200 h-16 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
             {/* Breadcrumbs (Dynamic based on route could go here) */}
             <div className="text-sm font-medium text-gray-500">
                PUB DEV / <span className="text-pubmatic-blue font-bold">DASHBOARD</span>
             </div>
          </header>

          {/* Page Content */}
          <main className="p-8 flex-1 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<PubOnboardingValidator />} />
              <Route path="/integration-test" element={<IntegrationTest />} />
              <Route path="/ad-optimization" element={<PlaceholderPage title="Ad Optimization Tool" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

        </div>
      </div>
    </Router>
  );
};

export default App;