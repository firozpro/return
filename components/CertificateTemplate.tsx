import React from 'react';
import { TaxReturnData } from '../types';
import { QRCodeSVG } from 'qrcode.react';

interface CertificateTemplateProps {
  data: TaxReturnData;
}

export const CertificateTemplate = React.forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ data }, ref) => {
    // Generate an array of characters for TIN
    const tinDigits = (data.tin || '').split('').concat(Array(12).fill('')).slice(0, 12);
    
    // QR Code Value
    const qrValue = `https://etaxnbr.gov.bd/verify?tin=${data.tin}&assessment_year=${data.assessmentYear}`;

    // Generate a consistent Acknowledgement ID based on TIN or random if empty
    const ackId = data.tin ? `668${data.tin}` : `668${Date.now()}`;
    
    // Current date/time for footer
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US');
    const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    return (
      <div className="w-full flex justify-center bg-gray-500/10 p-4 md:p-8 overflow-auto">
        <div
          ref={ref}
          className="print-container bg-white w-[210mm] min-h-[297mm] relative shadow-2xl mx-auto text-black p-[40px] sm:p-[50px]"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {/* --- Header Section --- */}
          <div className="relative mb-6">
            
            {/* Logo: eReturn (Top Right) */}
            <div className="absolute top-0 right-0 flex flex-col items-end">
               <div className="flex items-end leading-none">
                  <span className="text-[42px] font-bold text-[#4caf50] -mb-1">e</span>
                  <div className="flex flex-col">
                    <span className="text-[28px] font-bold text-[#4caf50]">Return</span>
                    <div className="h-[3px] bg-[#4caf50] w-full mt-[-2px]"></div>
                  </div>
               </div>
               <div className="text-[10px] text-gray-500 mt-1 tracking-wider">https://etaxnbr.gov.bd/</div>
            </div>

            {/* Center Content */}
            <div className="flex flex-col items-center pt-8">
               {/* Government Seal */}
               <div className="w-[80px] h-[80px] mb-3">
                 <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/400px-Government_Seal_of_Bangladesh.svg.png" 
                   alt="Government Seal" 
                   className="w-full h-full object-contain"
                 />
               </div>

               {/* Titles */}
               <div className="text-center space-y-[2px] mb-6">
                 <h1 className="text-[17px] text-black">Government of the People's Republic of Bangladesh</h1>
                 <h2 className="text-[16px] text-black">National Board of Revenue</h2>
                 <h3 className="text-[15px] text-black">(Income Tax Office)</h3>
               </div>

               {/* Certificate Title */}
               <div className="text-center mb-4">
                 <h2 className="text-[16px] border-b border-black inline-block pb-[1px] font-normal">
                   Acknowledgement Receipt/Certificate of Return of Income
                 </h2>
               </div>

               {/* Assessment Year */}
               <div className="text-[15px]">
                 Assessment Year: <span className="">{data.assessmentYear}</span>
               </div>
            </div>
          </div>

          {/* --- Body Section --- */}
          <div className="mt-8 space-y-5 text-[15px]">
             {/* Name */}
             <div className="flex">
                <span className="w-[280px]">Name of the Taxpayer:</span>
                <span className="uppercase">{data.taxpayerName}</span>
             </div>

             {/* NID */}
             <div className="flex">
                <span className="w-[280px]">NID / Passport No (if No NID):</span>
                <span>{data.nid}</span>
             </div>

             {/* TIN Box Row */}
             <div className="flex items-center">
                <span className="w-[60px]">TIN:</span>
                <div className="flex gap-[6px]">
                  {tinDigits.map((digit, idx) => (
                    <div key={idx} className="w-[28px] h-[28px] border border-black flex items-center justify-center text-[15px]">
                      {digit}
                    </div>
                  ))}
                </div>
             </div>

             {/* Circle & Zone */}
             <div className="flex pt-1">
                <span className="w-[60px]">Circle:</span>
                <span className="w-[280px]">{data.circle}</span>
                <span className="mr-2">Taxes Zone:</span>
                <span>{data.zone}</span>
             </div>

             {/* Income & Tax */}
             <div className="space-y-1 pt-2">
                <div className="flex">
                   <span className="w-[200px]">Total Income Shown:</span>
                   <span>{data.totalIncome} Taka</span>
                </div>
                <div className="flex">
                   <span className="w-[200px]">Total Tax Paid:</span>
                   <span>{data.totalTaxPaid} Taka</span>
                </div>
             </div>

             {/* Table Section */}
             <div className="mt-6">
                <div className="border border-black text-[14px] w-[380px]">
                   <div className="flex border-b border-black">
                      <div className="w-[65%] px-2 py-1 border-r border-black bg-gray-50">Serial No. of Return Register</div>
                      <div className="w-[35%] px-2 py-1 text-center">{data.serialNo}</div>
                   </div>
                   <div className="flex border-b border-black">
                      <div className="w-[65%] px-2 py-1 border-r border-black bg-gray-50">Volume No. of Return Register</div>
                      <div className="w-[35%] px-2 py-1 text-center">{data.volumeNo}</div>
                   </div>
                   <div className="flex">
                      <div className="w-[65%] px-2 py-1 border-r border-black bg-gray-50">Date of Return Submission</div>
                      <div className="w-[35%] px-2 py-1 text-center">{data.submissionDate}</div>
                   </div>
                </div>
             </div>
          </div>

          {/* --- Footer Section --- */}
          <div className="mt-auto pt-20">
            {/* Seals */}
            <div className="flex justify-between items-end text-[13px] mb-8 px-4">
               <div>
                  <p>Seal of Tax Office</p>
               </div>
               <div className="text-right">
                  <p>Signature and Seal of the Official Receiving the</p>
                  <p>Return</p>
               </div>
            </div>

            {/* QR Code & System Text */}
            <div className="flex flex-col items-center justify-center space-y-3">
               <div className="p-1 bg-white">
                 <QRCodeSVG value={qrValue} size={80} level="M" />
               </div>
               <p className="font-bold italic text-[14px]">System generated document. No signature required.</p>
            </div>

            {/* Bottom Links & Timestamps */}
            <div className="mt-12 text-center text-[13px]">
               <p className="mb-8">Please Visit: <strong>"https://etaxnbr.gov.bd"</strong> website to get Income Tax Certificate in Online</p>
               
               <div className="flex justify-between w-full border-t-0 pt-2 text-[11px] text-gray-600">
                  <span>Acknowledgement-{ackId}</span>
                  <span>https://etaxnbr.gov.bd/</span>
               </div>
               <div className="w-full text-right text-[11px] text-gray-600 mt-[2px]">
                 1 of 1 {formattedDate}, {formattedTime}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = "CertificateTemplate";