import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const WarehousePage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="ERP-DEV-05"
      domain="ERP"
      domainCategory="ERP / Supply Chain"
      teamBadgeVariant="team-a"
      capability="Warehouse"
      route="/erp/warehouse"
      description="Multi-warehouse facilities, bin/zone tracking, internal transfers, and storage optimization."
      scopeItems={[
        "Warehouse Facility Directory",
        "Zones, Aisles & Bin Locations",
        "Inter-warehouse Stock Transfers",
        "Inbound Receiving & Putaway"
]}
      typeLocation="src/features/erp/types/warehouse.ts"
      serviceLocation="src/features/erp/services/warehouseService.ts"
      mockLocation="src/mock/erp/"
    />
  );
};
