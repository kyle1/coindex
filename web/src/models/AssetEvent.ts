import { Asset } from "./Asset";

export interface AssetEvent {
  assetEventId: number;
  eventName: string;
  assetId: number;
  startDate: Date;
  endDate?: Date;
  notes?: string;
  isConfirmed: boolean;
  isStarred: boolean;

  asset?: Asset;
}
