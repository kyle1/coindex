import { Asset } from "./Asset";

export interface PortfolioAsset {
  asset: Asset;
  quantity: number;
  value?: number;
  percentageOfPortfolio?: number;
  priceTarget?: number;
  buyReason?: string;
  sellReason?: string;
  convictionRating?: number;
  holdLength?: string;
  notes?: string;
}
