import { AssetTag } from "./AssetTag";

export interface Asset {
  assetId: number;
  assetName: string;
  ticker: string;
  website?: string;
  subreddit?: string;
  transactionsPerSecond?: string;
  mentions?: number;

  tags?: AssetTag[];
  competitors?: Asset[];
}
