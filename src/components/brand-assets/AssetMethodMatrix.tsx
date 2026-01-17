import React from 'react';
import { BrandAsset, ResearchMethodType } from '../../types/brand-asset';
import { getAllMethodTypes, getMethodInfo, getStatusInfo } from '../../utils/asset-status';
import { CheckCircle, Clock, Circle, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { AssetStatusIndicator } from './AssetStatusBadge';

interface AssetMethodMatrixProps {
  assets: BrandAsset[];
  onCellClick?: (assetId: string, methodType: ResearchMethodType) => void;
  onAssetClick?: (assetId: string) => void;
}

export function AssetMethodMatrix({ 
  assets, 
  onCellClick,
  onAssetClick 
}: AssetMethodMatrixProps) {
  const methods = getAllMethodTypes();
  
  const getMethodStatus = (asset: BrandAsset, methodType: ResearchMethodType) => {
    const method = asset.researchMethods.find(m => m.type === methodType);
    return method?.status || 'not-started';
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'not-started':
      default:
        return <Circle className="h-5 w-5 text-gray-400 dark:text-gray-600" />;
    }
  };
  
  const getCellBg = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20';
      case 'in-progress':
        return 'bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20';
      case 'cancelled':
        return 'bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20';
      case 'not-started':
      default:
        return 'bg-gray-50 dark:bg-gray-900/10 hover:bg-gray-100 dark:hover:bg-gray-900/20';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Coverage Matrix</CardTitle>
        <CardDescription>
          Visual overview of which research methods have been used for each asset
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-border p-3 text-left bg-muted/50 sticky left-0 z-10 min-w-[200px]">
                  Asset
                </th>
                {methods.map(methodType => {
                  const methodInfo = getMethodInfo(methodType);
                  return (
                    <th 
                      key={methodType}
                      className="border border-border p-3 text-center bg-muted/50 min-w-[100px]"
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-2xl">{methodInfo.icon}</span>
                        <span className="text-xs font-medium">{methodInfo.shortLabel}</span>
                      </div>
                    </th>
                  );
                })}
                <th className="border border-border p-3 text-center bg-muted/50 min-w-[120px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr key={asset.id} className="hover:bg-muted/30 transition-colors">
                  <td 
                    className="border border-border p-3 font-medium sticky left-0 bg-background cursor-pointer"
                    onClick={() => onAssetClick?.(asset.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="hover:text-primary transition-colors">{asset.type}</span>
                    </div>
                  </td>
                  {methods.map(methodType => {
                    const status = getMethodStatus(asset, methodType);
                    return (
                      <td 
                        key={methodType}
                        className={`
                          border border-border p-3 text-center cursor-pointer transition-all
                          ${getCellBg(status)}
                        `}
                        onClick={() => onCellClick?.(asset.id, methodType)}
                        title={`${getMethodInfo(methodType).label}: ${status.replace('-', ' ')}`}
                      >
                        {getStatusIcon(status)}
                      </td>
                    );
                  })}
                  <td className="border border-border p-3">
                    <div className="flex items-center justify-center">
                      <AssetStatusIndicator status={asset.status} variant="icon" size="small" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <Circle className="h-4 w-4 text-gray-400 dark:text-gray-600" />
            <span className="text-muted-foreground">Not Started</span>
          </div>
          <div className="flex items-center space-x-2">
            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-muted-foreground">Cancelled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
