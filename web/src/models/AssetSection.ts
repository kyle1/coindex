import { SectionCategory } from "./SectionCategory";

export interface AssetSection {
  assetSectionId: number;
  assetId: number;
  sectionCategoryId: number;
  body: string;

  sectionCategory?: SectionCategory;
}
