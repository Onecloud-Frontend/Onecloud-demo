import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const InventoryPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="ERP-DEV-04"
      domain="ERP"
      domainCategory="ERP / Supply Chain"
      teamBadgeVariant="team-a"
      capability="Inventory"
      route="/erp/inventory"
      description="Item catalog management, real-time stock levels, inventory adjustments, and stock movement."
      scopeItems={[
        "Item Catalog & SKUs",
        "Stock Levels & Availability",
        "Stock Adjustments & Write-offs",
        "Inventory Movement History"
]}
      typeLocation="src/features/erp/types/inventory.ts"
      serviceLocation="src/features/erp/services/inventoryService.ts"
      mockLocation="src/mock/erp/"
    />
  );
};
