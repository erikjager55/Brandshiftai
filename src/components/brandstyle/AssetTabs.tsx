import { Info, FileText, MessageSquare } from 'lucide-react';

type TabType = 'information' | 'notes' | 'comments';

interface AssetTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'information' as const, label: 'Information', icon: Info },
  { id: 'notes' as const, label: 'Notes', icon: FileText },
  { id: 'comments' as const, label: 'Comments', icon: MessageSquare },
];

export function AssetTabs({ activeTab, onTabChange }: AssetTabsProps) {
  return (
    <div className="border-t mt-auto">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 flex flex-col items-center py-3 cursor-pointer border-b-2 transition-colors duration-200
                ${isActive 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon className="h-4 w-4 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
