
export type MenuType = 'acknowledgement' | 'tax_certificate';

export interface TaxReturnData {
  assessmentYear: string;
  tin: string;
  referenceNumber: string;
  taxpayerName: string;
  fatherName: string;
  motherName: string;
  circle: string;
  zone: string;
  residentStatus: string;
  totalIncome: string;
  taxPaid: string;
  filingDate: string;
}

export const INITIAL_DATA: TaxReturnData = {
  assessmentYear: "2024-2025",
  tin: "668122501747",
  referenceNumber: "4892948019",
  taxpayerName: "MD. ROKIBUL ISLAM",
  fatherName: "MD. ABDUR RAHMAN",
  motherName: "MST. KHATIJA BEGUM",
  circle: "Circle-124",
  zone: "Zone-06, Dhaka",
  residentStatus: "Resident",
  totalIncome: "4,50,000",
  taxPaid: "0",
  filingDate: new Date().toLocaleDateString('en-GB')
};
