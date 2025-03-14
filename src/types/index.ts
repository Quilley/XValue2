export interface CustomerCase {
  id: string;
  customerName: string;
  loanAmount: number;
  status: 'assigned' | 'draft' | 'submitted';
  details: {
    basics: CustomerBasics;
    banking: BankingDetails;
    bureau: BureauDetails;
    financials: FinancialDetails;
    pdDetails: PDDetails;
    additional: AdditionalDetails;
  };
}

export interface CustomerBasics {
  name: string;
  age: number;
  occupation: string;
  annualIncome: number;
}

export interface BankingDetails {
  accountNumber: string;
  bankName: string;
  averageBalance: number;
  transactions: Transaction[];
}

export interface BureauDetails {
  creditScore: number;
  outstandingLoans: number;
  paymentHistory: PaymentHistory[];
}

export interface FinancialDetails {
  monthlyIncome: number;
  monthlyExpenses: number;
  assets: Asset[];
  liabilities: Liability[];
}

export interface PDDetails {
  probabilityOfDefault: number;
  riskScore: number;
  riskCategory: string;
}

export interface AdditionalDetails {
  comments: string;
  documents: Document[];
}

interface Transaction {
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
}

interface PaymentHistory {
  date: string;
  status: 'ontime' | 'late' | 'missed';
  amount: number;
}

interface Asset {
  type: string;
  value: number;
  description: string;
}

interface Liability {
  type: string;
  amount: number;
  description: string;
}

interface Document {
  name: string;
  url: string;
  type: string;
}