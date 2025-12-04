export interface TaxReturnData {
  assessmentYear: string;
  taxpayerName: string;
  nid: string;
  tin: string;
  circle: string;
  zone: string;
  totalIncome: string;
  totalTaxPaid: string;
  serialNo: string;
  volumeNo: string;
  submissionDate: string;
}

export const INITIAL_DATA: TaxReturnData = {
  assessmentYear: "2025-2026",
  taxpayerName: "MD. SHOHAG RANA",
  nid: "6403076711",
  tin: "668122501747",
  circle: "Circle-512 (Salary)",
  zone: "24, Dhaka",
  totalIncome: "6,43,846",
  totalTaxPaid: "24,711",
  serialNo: "4892948019",
  volumeNo: "",
  submissionDate: "02/09/2025"
};