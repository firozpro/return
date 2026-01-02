
import React from 'react';
import { TaxReturnData, MenuType } from '../types';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  data: TaxReturnData;
  type: MenuType;
  qrValue: string;
}

export const CertificateTemplate: React.FC<Props> = ({ data, type, qrValue }) => {
  const isAck = type === 'acknowledgement';

  return (
    <div className="print-area bg-white text-black font-serif p-10 max-w-[210mm] mx-auto min-h-[297mm] shadow-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h2 className="text-xl font-bold uppercase">Government of the People's Republic of Bangladesh</h2>
        <h3 className="text-lg font-semibold uppercase">National Board of Revenue</h3>
        <p className="text-sm mt-1">Income Tax Department</p>
        <div className="flex justify-between items-center mt-6 px-4">
           <div className="text-left">
              <p className="font-bold">Assessment Year: {data.assessmentYear}</p>
              <p>Filing Date: {data.filingDate}</p>
           </div>
           <div className="bg-white p-1 border border-black">
              <QRCodeSVG value={qrValue} size={100} level="H" includeMargin={false} />
           </div>
        </div>
      </div>

      <div className="text-center my-6">
        <h1 className="text-2xl font-black underline uppercase tracking-wider">
          {isAck ? 'Acknowledgement Receipt' : 'Income Tax Certificate'}
        </h1>
        <p className="text-sm mt-2 font-bold">(Online Submission)</p>
      </div>

      <div className="space-y-6 mt-10 px-8 text-base leading-loose">
        <div className="grid grid-cols-12 gap-y-4">
          <div className="col-span-4 font-bold">Taxpayer's Name:</div>
          <div className="col-span-8 border-b border-dotted border-gray-400 uppercase">{data.taxpayerName}</div>
          
          <div className="col-span-4 font-bold">TIN:</div>
          <div className="col-span-8 border-b border-dotted border-gray-400 font-mono tracking-widest">{data.tin}</div>

          <div className="col-span-4 font-bold">Father's Name:</div>
          <div className="col-span-8 border-b border-dotted border-gray-400">{data.fatherName}</div>

          <div className="col-span-4 font-bold">Mother's Name:</div>
          <div className="col-span-8 border-b border-dotted border-gray-400">{data.motherName}</div>

          <div className="col-span-4 font-bold">Circle & Zone:</div>
          <div className="col-span-8 border-b border-dotted border-gray-400">{data.circle}, {data.zone}</div>

          <div className="col-span-4 font-bold">Resident Status:</div>
          <div className="col-span-8 border-b border-dotted border-gray-400">{data.residentStatus}</div>
          
          {isAck && (
            <>
              <div className="col-span-4 font-bold">Total Income:</div>
              <div className="col-span-8 border-b border-dotted border-gray-400 font-bold">Tk. {data.totalIncome}</div>

              <div className="col-span-4 font-bold">Tax Paid:</div>
              <div className="col-span-8 border-b border-dotted border-gray-400 font-bold">Tk. {data.taxPaid}</div>
            </>
          )}

          <div className="col-span-4 font-bold">Reference Number:</div>
          <div className="col-span-8 border-b border-dotted border-gray-400 font-mono">{data.referenceNumber}</div>
        </div>
      </div>

      <div className="mt-24 px-8 text-sm italic">
        <p>This is a computer-generated document and does not require a physical signature.</p>
        <p className="mt-2">Verification can be done by scanning the QR code above or visiting the official NBR eTax portal.</p>
      </div>

      <div className="mt-32 flex justify-between px-8 border-t border-black pt-4">
        <div className="text-center">
          <div className="h-10"></div>
          <p className="font-bold text-xs">Taxpayer's Signature</p>
        </div>
        <div className="text-center">
          <div className="bg-emerald-50 text-emerald-800 px-4 py-2 border border-emerald-200 rounded text-[10px] font-bold uppercase mb-1">
            Verified Online
          </div>
          <p className="font-bold text-xs uppercase">Deputy Commissioner of Taxes</p>
        </div>
      </div>
    </div>
  );
};
