import { ResourceGroup } from "./ResourceGroup";

export interface Resource {
  resourceId: number;
  resourceName: string;
  resourceGroupId: number;
  url: string;
  description?: string;
  showInDashboard: boolean;

  resourceGroup?: ResourceGroup;
}
