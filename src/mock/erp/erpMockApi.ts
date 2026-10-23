import type { Plugin } from 'vite';
import type { ErpReportSourceData } from '@features/erp/types/reportTypes';

export function erpMockApi(): Plugin {
  return {
    name: 'erp-mock-api',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;

        if (request.method !== 'GET' || pathname !== '/api/erp/reports') {
          next();
          return;
        }

        void server.ssrLoadModule('/src/mock/erp/erpMockData.ts')
          .then((module: { mockErpReportSource: ErpReportSourceData }) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({
              success: true,
              data: module.mockErpReportSource,
              message: 'ERP report source data loaded',
              timestamp: new Date().toISOString(),
            }));
          })
          .catch((error: unknown) => {
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({
              success: false,
              data: null,
              message: error instanceof Error
                ? error.message
                : 'ERP mock data could not be loaded.',
              timestamp: new Date().toISOString(),
            }));
          });
      });
    },
  };
}