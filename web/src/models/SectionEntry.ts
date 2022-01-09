import { Asset } from "./Asset";
import { Section } from "./Section";

export interface SectionEntry {
  sectionEntryId: number;
  assetId: number;
  sectionId: number;
  body: string;
  rating?: number;

  asset?: Asset;
  section?: Section;
}
