
import React, { useState } from 'react';
import { TaxReturnData, INITIAL_DATA, MenuType } from './types';
import { TaxForm } from './components/TaxForm';
import { CertificateTemplate } from './components/CertificateTemplate';
import { Download, QrCode, FileText, RefreshCw, ShieldCheck, Lock, User, LogIn, LogOut, Printer } from 'lucide-react';
// Fix: Import QRCodeSVG from qrcode.react
import { QRCodeSVG } from 'qrcode.react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);

  const [formData, setFormData] = useState<TaxReturnData>(INITIAL_DATA);
  const [activeMenu, setActiveMenu] = useState<MenuType>('acknowledgement');

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginError(false);
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
  };

  const handlePrint = () => {
    window.print();
  };

  const qrValue = activeMenu === 'acknowledgement'
    ? `https://api.etaxnbr.gov.bd/filingservice/v3/api/verify-psr?tin=${formData.tin}&ay=${formData.assessmentYear}`
    : `https://api.etaxnbr.gov.bd/verification/certificate?tin=${formData.tin}&ref=${formData.referenceNumber}`;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-950 p-10 text-white text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20">
                <Lock className="w-10 h-10 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight">NBR QR Portal</h1>
            <p className="text-emerald-100/60 text-xs mt-2">Authentication Required</p>
          </div>
          <form onSubmit={handleLoginSubmit} className="p-10 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <input type="text" name="username" required value={loginForm.username} onChange={handleLoginChange} placeholder="Username" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-emerald-600 outline-none" />
                <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              </div>
              <div className="relative">
                <input type="password" name="password" required value={loginForm.password} onChange={handleLoginChange} placeholder="Password" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-emerald-600 outline-none" />
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              </div>
            </div>
            {loginError && <div className="text-red-500 text-xs font-bold text-center">Invalid Credentials</div>}
            <button type="submit" className="w-full py-5 bg-emerald-700 text-white rounded-2xl font-black hover:bg-emerald-800 transition-all">AUTHENTICATE</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center p-4 md:p-8 font-sans no-print">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left: Form Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-emerald-800 p-8 text-white flex justify-between items-center">
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">Generator Tools</h1>
              <p className="text-emerald-100/60 text-xs">Fill in taxpayer details</p>
            </div>
            <button onClick={handleLogout} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-8 flex-1">
            <div className="flex p-1.5 bg-gray-100 rounded-2xl gap-1">
              <button onClick={() => setActiveMenu('acknowledgement')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeMenu === 'acknowledgement' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-500'}`}>
                <FileText className="w-4 h-4 inline mr-2" /> Acknowledgement
              </button>
              <button onClick={() => setActiveMenu('tax_certificate')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeMenu === 'tax_certificate' ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-500'}`}>
                <ShieldCheck className="w-4 h-4 inline mr-2" /> Tax Certificate
              </button>
            </div>

            <TaxForm formData={formData} onChange={handleChange} activeMenu={activeMenu} />

            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <button onClick={handleReset} className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-3 py-4 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 font-black transition-all shadow-lg shadow-emerald-900/10 active:scale-95">
                <Printer className="w-5 h-5" />
                PRINT / GENERATE PDF
              </button>
            </div>
          </div>
        </div>

        {/* Right: Preview Sidebar */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Live QR Preview</h2>
            <div className="inline-block p-6 bg-white border-2 border-dashed border-gray-100 rounded-[2rem] shadow-inner mb-6">
              {/* Fix: QRCodeSVG was used but not imported */}
              <QRCodeSVG value={qrValue} size={200} level="H" includeMargin={true} />
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-[10px] text-emerald-700 font-mono break-all leading-relaxed">
                {qrValue}
              </p>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <QrCode className="w-32 h-32" />
            </div>
            <h3 className="text-sm font-bold mb-4 relative z-10">Verification Protocol</h3>
            <ul className="space-y-3 text-[11px] text-gray-400 relative z-10">
              <li className="flex gap-2">
                <span className="text-emerald-500">✔</span>
                Syncs with NBR verification API v3
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">✔</span>
                Dynamic TIN data injection
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">✔</span>
                A4 Print-optimized CSS
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hidden Print Container */}
      <div className="hidden">
        <div id="print-root">
          <CertificateTemplate data={formData} type={activeMenu} qrValue={qrValue} />
        </div>
      </div>

      {/* Global CSS for Print */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-root, #print-root * { visibility: visible; }
          #print-root {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
