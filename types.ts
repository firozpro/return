export type MenuType = 'acknowledgement' | 'tax_certificate';

export interface TaxReturnData {
  assessmentYear: string;
  tin: string;
  referenceNumber: string;
}

export const INITIAL_DATA: TaxReturnData = {
  assessmentYear: "2025-2026",
  tin: "668122501747",
  referenceNumber: "4892948019"
};