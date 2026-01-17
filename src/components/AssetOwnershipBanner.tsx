import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Lock, ArrowRight } from 'lucide-react';

interface AssetOwnershipBannerProps {
  isUnlocked: boolean;
  onCreatePlan: () => void;
}

export function AssetOwnershipBanner({ isUnlocked, onCreatePlan }: AssetOwnershipBannerProps) {
  // Only show banner when asset is locked
  if (isUnlocked) return null;
  
  return (
    <Card className="mb-8 border-l-4 border-l-slate-500 bg-slate-50/50 dark:bg-slate-900/10">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-200 dark:bg-slate-800">
            <Lock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">
              Asset Locked
            </h3>
            <p className="text-muted-foreground text-sm max-w-xl">
              To unlock and edit this strategic asset, create a research plan. Research plans ensure your brand is built on validated insights.
            </p>
          </div>
        </div>
        
        <Button onClick={onCreatePlan} className="whitespace-nowrap">
          Create Research Plan
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}