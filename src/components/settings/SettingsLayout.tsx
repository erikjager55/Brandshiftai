import React, { ReactNode } from 'react';
import {
  User,
  Users,
  Building,
  Briefcase,
  CreditCard,
  Bell,
  Palette,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SettingsNavigationItem {
  id: string;
  label: string;
  icon: any;
  agencyOnly?: boolean;
}

interface SettingsLayoutProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  children: ReactNode;
  isAgencyAccount?: boolean;
}

const settingsNavItems: SettingsNavigationItem[] = [
  { id: 'settings-account', label: 'Account', icon: User },
  { id: 'settings-team', label: 'Team', icon: Users },
  { id: 'settings-agency', label: 'Agency', icon: Building, agencyOnly: true },
  { id: 'settings-clients', label: 'Clients', icon: Briefcase, agencyOnly: true },
  { id: 'settings-billing', label: 'Billing & Payments', icon: CreditCard },
  { id: 'settings-notifications', label: 'Notifications', icon: Bell },
  { id: 'settings-appearance', label: 'Appearance', icon: Palette },
];

export function SettingsLayout({
  activeSection,
  onNavigate,
  children,
  isAgencyAccount = false,
}: SettingsLayoutProps) {
  // Filter items based on account type
  const visibleItems = settingsNavItems.filter(
    (item) => !item.agencyOnly || isAgencyAccount
  );

  return (
    <div className="p-8">
      <div className="flex gap-8">
        {/* Settings Navigation - Inside content area */}
        <div className="w-[200px] flex-shrink-0">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          
          <nav className="space-y-1">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-muted text-foreground font-semibold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}