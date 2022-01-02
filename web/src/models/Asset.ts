import { AssetLink } from "./AssetLink";
import { AssetSection } from "./AssetSection";
import { AssetTag } from "./AssetTag";

export interface Asset {
  assetId: number;
  assetName: string;
  ticker: string;
  website?: string;
  subreddit?: string;

  marketCapRank?: number;
  currentPrice?: number;
  priceChangePercentage1h?: number;
  priceChangePercentage24h?: number;
  priceChangePercentage7d?: number;
  priceChangePercentage30d?: number;
  priceChangePercentage1y?: number;

  //transactionsPerSecond?: string;
  //mentions?: number;
  marketCap?: number;
  //price?: number;
  // pctChange1d?: number;
  // pctChange7d?: number;
  // pctChange30d?: number;
  tags?: AssetTag[];
  competitors?: Asset[];
  sections: AssetSection[];
  links: AssetLink[];
}
