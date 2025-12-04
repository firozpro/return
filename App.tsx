import React, { useState, useRef } from 'react';
import { LoginForm } from './components/LoginForm';
import { TaxForm } from './components/TaxForm';
import { CertificateTemplate } from './components/CertificateTemplate';
import { TaxReturnData, INITIAL_DATA } from './types';
import { LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState<TaxReturnData>(INITIAL_DATA);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData(INITIAL_DATA);
  };

  const handleChange = (key: keyof TaxReturnData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    // Reset to empty strings but keep some sensible defaults like year
    setFormData({
        assessmentYear: "2025-2026",
        taxpayerName: "",
        nid: "",
        tin: "",
        circle: "",
        zone: "",
        totalIncome: "",
        totalTaxPaid: "",
        serialNo: "",
        volumeNo: "",
        submissionDate: ""
    });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-green-800 text-white shadow-md z-10 sticky top-0 no-print">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
               <span className="text-green-800 font-bold text-sm">e</span>
            </div>
            <span className="font-bold text-xl tracking-tight">eReturn Generator</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/3 xl:w-1/4 p-4 lg:p-6 overflow-y-auto border-r border-gray-200 bg-white z-0 no-print">
          <TaxForm
            data={formData}
            onChange={handleChange}
            onReset={handleReset}
          />
        </div>

        {/* Right Side: Preview */}
        <div className="w-full lg:w-2/3 xl:w-3/4 bg-gray-200 overflow-y-auto p-4 lg:p-8 flex justify-center items-start print-area">
           <div className="transform scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-[1] origin-top transition-transform duration-300 print-scale-reset">
              <CertificateTemplate ref={componentRef} data={formData} />
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;