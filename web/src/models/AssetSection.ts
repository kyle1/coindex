import { SectionCategory } from "./SectionCategory";

export interface AssetSection {
  assetSectionId: number;
  sectionCategory: SectionCategory;
  body: string;
}
