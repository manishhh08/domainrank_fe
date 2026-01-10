export interface DomainHistory {
  date: string;
  rank: number;
}

export interface DomainResult {
  domain: string;
  rank: number | null;
  history: DomainHistory[];
}

export interface MultipleDomainResult {
  domains: string[];
}
