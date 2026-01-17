/**
 * COMPONENT: Tier Indicator
 * 
 * Toont de huidige product tier van de gebruiker.
 */

import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Shield,
  TrendingUp,
  Star,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useProductTier } from '../../contexts/ProductTierContext';
import { PRODUCT_TIERS } from '../../types/product-tier';

interface TierIndicatorProps {
  onUpgrade?: () => void;
  onViewBilling?: () => void;
}

export function TierIndicator({ onUpgrade, onViewBilling }: TierIndicatorProps) {
  const { currentTier, subscription } = useProductTier();
  const tierInfo = PRODUCT_TIERS[currentTier];

  const getTierIcon = () => {
    switch (currentTier) {
      case 'decision-scan':
        return Shield;
      case 'strategic-control':
        return TrendingUp;
      case 'advisory-services':
        return Star;
      default:
        return Shield;
    }
  };

  const Icon = getTierIcon();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 h-9 ${tierInfo.color.badge}`}
        >
          <Icon className={`h-4 w-4 ${tierInfo.color.text}`} />
          <span className="hidden lg:inline">{tierInfo.certaintyLevel}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px]">
        <div className="p-3">
          <div className="flex items-center gap-3 mb-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tierInfo.color.badge}`}>
              <Icon className={`h-5 w-5 ${tierInfo.color.text}`} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{tierInfo.name}</p>
              <p className="text-xs text-muted-foreground">{tierInfo.tagline}</p>
            </div>
          </div>

          {/* Certainty Level */}
          <div className="p-3 rounded-lg bg-muted/50 border mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Besliszekerheid Niveau
            </p>
            <p className="font-semibold">{tierInfo.certaintyLevel}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {tierInfo.certaintyDescription}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="outline" className="capitalize">
              {subscription.status === 'active' ? 'Actief' : subscription.status}
            </Badge>
          </div>

          {/* Upgrade CTA if not on highest tier */}
          {currentTier !== 'advisory-services' && (
            <>
              <DropdownMenuSeparator />
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 mt-3">
                <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-1">
                  Verhoog je Besliszekerheid
                </p>
                <p className="text-xs text-purple-800 dark:text-purple-200 mb-3">
                  {currentTier === 'decision-scan' 
                    ? 'Krijg volledige controle met Strategic Control'
                    : 'Maximale zekerheid met Advisory & Services'}
                </p>
                <Button
                  size="sm"
                  className="w-full gap-2"
                  onClick={onUpgrade}
                >
                  Upgrade Nu
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </>
          )}
        </div>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onViewBilling}>
          Bekijk Facturatie
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
