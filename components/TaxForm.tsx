import React from 'react';
import { TaxReturnData } from '../types';
import { RefreshCw, Download, FileText } from 'lucide-react';

interface TaxFormProps {
  data: TaxReturnData;
  onChange: (key: keyof TaxReturnData, value: string) => void;
  onReset: () => void;
}

export const TaxForm: React.FC<TaxFormProps> = ({ data, onChange, onReset }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof TaxReturnData, value);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-600" />
          Tax Return Details
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Taxpayer Info</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Year</label>
            <input
              type="text"
              name="assessmentYear"
              value={data.assessmentYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Taxpayer Name</label>
            <input
              type="text"
              name="taxpayerName"
              value={data.taxpayerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NID / Passport No</label>
            <input
              type="text"
              name="nid"
              value={data.nid}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TIN (12 Digits)</label>
            <input
              type="text"
              name="tin"
              maxLength={12}
              value={data.tin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Zone & Income Info</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Circle</label>
            <input
              type="text"
              name="circle"
              value={data.circle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Taxes Zone</label>
            <input
              type="text"
              name="zone"
              value={data.zone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Income Shown (Taka)</label>
            <input
              type="text"
              name="totalIncome"
              value={data.totalIncome}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Tax Paid (Taka)</label>
            <input
              type="text"
              name="totalTaxPaid"
              value={data.totalTaxPaid}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-4 border-t pt-4">
           <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Official Use Info</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serial No.</label>
                <input
                  type="text"
                  name="serialNo"
                  value={data.serialNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volume No.</label>
                <input
                  type="text"
                  name="volumeNo"
                  value={data.volumeNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Submission</label>
                <input
                  type="text"
                  name="submissionDate"
                  value={data.submissionDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="DD/MM/YYYY"
                />
             </div>
           </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t flex justify-end">
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Download className="w-5 h-5" /> Download / Print PDF
        </button>
      </div>
    </div>
  );
};