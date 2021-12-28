import { AssetTag } from "./AssetTag";

export interface Asset {
  assetId: number;
  assetName: string;
  ticker: string;
  website?: string;
  subreddit?: string;
  transactionsPerSecond?: string;
  mentions?: number;
  marketCap?: number;
  price?: number;
  pctChange1d?: number;
  pctChange7d?: number;
  pctChange30d?: number;
  tags?: AssetTag[];
  competitors?: Asset[];
}
