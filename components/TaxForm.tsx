
import React from 'react';
import { TaxReturnData } from '../types';
import { User, Hash, FileText, MapPin, DollarSign, Calendar } from 'lucide-react';

interface TaxFormProps {
  formData: TaxReturnData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  activeMenu: string;
}

export const TaxForm: React.FC<TaxFormProps> = ({ formData, onChange, activeMenu }) => {
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-600 focus:bg-white outline-none transition-all text-gray-800 font-semibold";
  const labelClass = "block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className={labelClass}>Taxpayer Name</label>
        <div className="relative">
          <input type="text" name="taxpayerName" value={formData.taxpayerName} onChange={onChange} className={inputClass} />
          <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        </div>
      </div>

      <div>
        <label className={labelClass}>TIN (12 Digits)</label>
        <div className="relative">
          <input type="text" name="tin" value={formData.tin} onChange={onChange} maxLength={12} className={inputClass} />
          <Hash className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Assessment Year</label>
        <div className="relative">
          <input type="text" name="assessmentYear" value={formData.assessmentYear} onChange={onChange} className={inputClass} />
          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Circle</label>
        <div className="relative">
          <input type="text" name="circle" value={formData.circle} onChange={onChange} className={inputClass} />
          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Zone</label>
        <div className="relative">
          <input type="text" name="zone" value={formData.zone} onChange={onChange} className={inputClass} />
          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        </div>
      </div>

      {activeMenu === 'acknowledgement' && (
        <>
          <div>
            <label className={labelClass}>Total Income (BDT)</label>
            <div className="relative">
              <input type="text" name="totalIncome" value={formData.totalIncome} onChange={onChange} className={inputClass} />
              <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Tax Paid (BDT)</label>
            <div className="relative">
              <input type="text" name="taxPaid" value={formData.taxPaid} onChange={onChange} className={inputClass} />
              <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
          </div>
        </>
      )}

      <div className={activeMenu === 'tax_certificate' ? 'md:col-span-2' : ''}>
        <label className={labelClass}>Reference Number</label>
        <div className="relative">
          <input type="text" name="referenceNumber" value={formData.referenceNumber} onChange={onChange} className={inputClass} />
          <FileText className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        </div>
      </div>
    </div>
  );
};
