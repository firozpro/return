import React, { useState, useRef } from 'react';
import { TaxReturnData, INITIAL_DATA, MenuType } from './types';
import { QRCodeSVG } from 'qrcode.react';
import { Download, QrCode, FileText, RefreshCw, CheckCircle2, Hash, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [formData, setFormData] = useState<TaxReturnData>(INITIAL_DATA);
  const [activeMenu, setActiveMenu] = useState<MenuType>('acknowledgement');
  const qrRef = useRef<SVGSVGElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
  };

  const downloadQR = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    const size = 1024;
    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        const fileName = activeMenu === 'acknowledgement' 
          ? `NBR_Ack_QR_${formData.tin}` 
          : `NBR_Cert_QR_${formData.referenceNumber}`;
        downloadLink.download = `${fileName}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  // Specific output formats requested by the user
  const qrValue = activeMenu === 'acknowledgement'
    ? `https://api.etaxnbr.gov.bd/filingservice/v3/api/verify-psr?tin=${formData.tin}&ay=${formData.assessmentYear}`
    : `TIN:${formData.tin}, Reference No:${formData.referenceNumber}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100/50">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-8 text-white relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <QrCode className="w-8 h-8 text-emerald-300" />
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-emerald-400/20 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  NBR Bangladesh
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-1">
              {activeMenu === 'acknowledgement' ? 'ACKNOWLEDGEMENT' : 'TAX CERTIFICATE'}
            </h1>
            <p className="text-emerald-100/70 text-xs font-medium">Official Verification QR Generator</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-8 pt-8">
          <div className="flex p-1.5 bg-gray-100/80 rounded-2xl gap-1">
            <button
              onClick={() => setActiveMenu('acknowledgement')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeMenu === 'acknowledgement' 
                ? 'bg-white text-emerald-800 shadow-md border border-gray-200/50' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" /> Ack. Receipt
            </button>
            <button
              onClick={() => setActiveMenu('tax_certificate')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeMenu === 'tax_certificate' 
                ? 'bg-white text-emerald-800 shadow-md border border-gray-200/50' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Tax Certificate
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {activeMenu === 'acknowledgement' ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="group">
                  <label className="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">Assessment Year</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="assessmentYear"
                      value={formData.assessmentYear}
                      onChange={handleChange}
                      placeholder="2025-2026"
                      className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-600 focus:bg-white outline-none transition-all text-gray-800 font-bold text-lg"
                    />
                    <FileText className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="group">
                  <label className="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">Reference Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="referenceNumber"
                      value={formData.referenceNumber}
                      onChange={handleChange}
                      placeholder="Enter Reference Number"
                      className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-600 focus:bg-white outline-none transition-all text-gray-800 font-bold text-lg"
                    />
                    <Hash className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                </div>
              </div>
            )}

            <div className="group">
              <label className="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">TIN (12 Digits)</label>
              <div className="relative">
                <input
                  type="text"
                  name="tin"
                  value={formData.tin}
                  onChange={handleChange}
                  maxLength={12}
                  placeholder="Enter 12 digit TIN"
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-600 focus:bg-white outline-none transition-all text-gray-800 font-bold text-lg tracking-[0.1em]"
                />
                <CheckCircle2 className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* QR Code Visualizer */}
          <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center group hover:border-emerald-200 transition-colors">
            <div className="p-4 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 mb-4 group-hover:scale-[1.02] transition-transform duration-300">
              <QRCodeSVG
                ref={qrRef}
                value={qrValue}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[1px] flex-1 bg-gray-100"></div>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Scan Data Output</span>
                <div className="h-[1px] flex-1 bg-gray-100"></div>
              </div>
              <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                <p className="text-[10px] text-emerald-800 font-mono text-center break-all line-clamp-2 italic leading-relaxed">
                  {qrValue}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl transition-all active:scale-95 flex items-center justify-center"
              title="Reset Form"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={downloadQR}
              className="flex-1 flex items-center justify-center gap-3 py-4 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 font-black text-sm shadow-xl shadow-emerald-900/10 transition-all active:scale-95 group"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> 
              GENERATE & DOWNLOAD
            </button>
          </div>
        </div>

        {/* Small Note */}
        <div className="px-8 pb-8 text-center">
          <p className="text-[9px] text-gray-400 font-medium leading-relaxed">
            Scan data matches NBR's verification requirements.<br/>
            Acknowledgement: API URL format • Tax Certificate: Reference format.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;