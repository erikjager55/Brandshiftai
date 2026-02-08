import { useState, useEffect } from 'react';
import { X, Copy, Trash2, Edit, Info, Check, ChevronDown } from 'lucide-react';
import { AssetTabs } from './AssetTabs';
import { AssetNotes } from './AssetNotes';
import { AssetComments } from './AssetComments';
import { copyToClipboard } from '../../utils/clipboard';

interface ColorData {
  id: string;
  name: string;
  hex: string;
  rgb?: string;
  hsl?: string;
  cmyk?: string;
  pantone?: string;
  description?: string;
  tags?: string[];
  isGradient?: boolean;
  gradientColor?: string;
}

interface ColorDetailModalProps {
  color: ColorData | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (color: ColorData) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (color: ColorData) => void;
}

type TabType = 'information' | 'notes' | 'comments';

// Helper function to determine if text should be white or black based on background
function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

// Convert HEX to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
}

// Convert HEX to HSL
function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return `${Math.round(h * 360)}, ${Math.round(s * 100)}, ${Math.round(l * 100)}`;
}

// Convert RGB to CMYK (approximation)
function rgbToCmyk(rgb: string): string {
  const [r, g, b] = rgb.split(',').map(v => parseInt(v.trim()) / 255);
  
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  
  return `${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)}`;
}

export function ColorDetailModal({
  color,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  onDuplicate,
}: ColorDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('information');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedColor, setEditedColor] = useState(color || {} as ColorData);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  
  // Custom value toggles
  const [customHsl, setCustomHsl] = useState(!!color?.hsl);
  const [customRgba, setCustomRgba] = useState(false);
  const [customCmyk, setCustomCmyk] = useState(!!color?.cmyk);
  const [customPantone, setCustomPantone] = useState(!!color?.pantone);

  // Mock data for notes and comments
  const [notes, setNotes] = useState([
    { id: '1', author: 'Sarah J.', date: 'Jan 15, 2026', content: 'Primary brand color - use sparingly for CTAs only' },
  ]);
  
  const [comments, setComments] = useState([
    { id: '1', author: 'Mike P.', avatar: 'MP', time: '2 hours ago', content: 'Should we consider accessibility contrast ratios?' },
  ]);

  useEffect(() => {
    if (isOpen) {
      setEditedColor(color || {} as ColorData);
      setActiveTab('information');
      setIsEditMode(false);
    }
  }, [isOpen, color]);

  if (!isOpen) return null;

  const textColor = getContrastColor(color?.hex || '#000000');
  const rgb = color?.rgb || hexToRgb(color?.hex || '#000000');
  const hsl = color?.hsl || hexToHsl(color?.hex || '#000000');
  const cmyk = color?.cmyk || rgbToCmyk(rgb);

  const handleCopy = async (value: string, label: string) => {
    const success = await copyToClipboard(value);
    if (success) {
      setCopiedValue(label);
      setTimeout(() => setCopiedValue(null), 2000);
    }
  };

  const handleUpdate = () => {
    onUpdate && onUpdate(editedColor);
    setIsEditMode(false);
  };

  const handleDuplicate = () => {
    onDuplicate && onDuplicate(color || {} as ColorData);
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${color?.name}"?`)) {
      onDelete && onDelete(color?.id || '');
      onClose();
    }
  };

  const renderColorValue = (label: string, value: string) => (
    <div key={label} className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-muted-foreground w-16">{label}</span>
      <span className="text-sm font-mono flex-1">{value}</span>
      <button
        onClick={() => handleCopy(value, label)}
        className="w-8 h-8 rounded-lg hover:bg-muted dark:hover:bg-muted/50 flex items-center justify-center transition-colors duration-200"
        title={`Copy ${label}`}
      >
        {copiedValue === label ? (
          <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );

  const renderInformationTab = () => {
    if (isEditMode) {
      return (
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <input
              type="text"
              value={editedColor.name}
              onChange={(e) => setEditedColor({ ...editedColor, name: e.target.value })}
              className="rounded-lg border dark:border-border bg-background dark:bg-card p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Gradient Toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">Gradient</span>
            <button
              onClick={() => setEditedColor({ ...editedColor, isGradient: !editedColor.isGradient })}
              className={`
                w-10 h-6 rounded-full transition-colors duration-200 relative
                ${editedColor.isGradient ? 'bg-primary' : 'bg-muted dark:bg-muted/50'}
              `}
            >
              <div className={`
                absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                ${editedColor.isGradient ? 'translate-x-5' : 'translate-x-1'}
              `} />
            </button>
          </div>

          {/* Hex Value */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Hex Value</label>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg border dark:border-border flex items-center justify-center hover:bg-muted dark:hover:bg-muted/50 transition-colors duration-200">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: editedColor.hex }} />
              </button>
              <input
                type="text"
                value={editedColor.hex}
                onChange={(e) => setEditedColor({ ...editedColor, hex: e.target.value })}
                className="flex-1 rounded-lg border dark:border-border bg-background dark:bg-card p-3 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Custom Value Toggles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Add a custom HSL value</span>
              <button
                onClick={() => setCustomHsl(!customHsl)}
                className={`
                  w-5 h-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
                  ${customHsl ? 'border-primary bg-primary' : 'border-muted-foreground/30 dark:border-muted-foreground/50'}
                `}
              >
                {customHsl && <Check className="h-3 w-3 text-white" />}
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Add a custom RGBA value</span>
              <button
                onClick={() => setCustomRgba(!customRgba)}
                className={`
                  w-5 h-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
                  ${customRgba ? 'border-primary bg-primary' : 'border-muted-foreground/30 dark:border-muted-foreground/50'}
                `}
              >
                {customRgba && <Check className="h-3 w-3 text-white" />}
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Add a custom CMYK value</span>
              <button
                onClick={() => setCustomCmyk(!customCmyk)}
                className={`
                  w-5 h-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
                  ${customCmyk ? 'border-primary bg-primary' : 'border-muted-foreground/30 dark:border-muted-foreground/50'}
                `}
              >
                {customCmyk && <Check className="h-3 w-3 text-white" />}
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Add a custom Pantone value</span>
              <button
                onClick={() => setCustomPantone(!customPantone)}
                className={`
                  w-5 h-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
                  ${customPantone ? 'border-primary bg-primary' : 'border-muted-foreground/30 dark:border-muted-foreground/50'}
                `}
              >
                {customPantone && <Check className="h-3 w-3 text-white" />}
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <textarea
              value={editedColor.description || ''}
              onChange={(e) => setEditedColor({ ...editedColor, description: e.target.value })}
              placeholder="Enter Your Description"
              className="rounded-lg border dark:border-border bg-background dark:bg-card p-3 w-full min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Tags</label>
            <input
              type="text"
              placeholder="Select tags"
              className="rounded-lg border dark:border-border bg-background dark:bg-card p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Update Button */}
          <div className="pt-4">
            <button
              onClick={handleUpdate}
              className="w-full rounded-xl bg-primary text-primary-foreground py-3 font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Update
            </button>
          </div>
        </div>
      );
    }

    // View Mode
    return (
      <div className="space-y-4">
        {/* Color Values */}
        <div className="space-y-2">
          {renderColorValue('HEX', color?.hex.toUpperCase() || '#000000')}
          {renderColorValue('RGB', rgb)}
          {renderColorValue('HSL', hsl)}
          {renderColorValue('CMYK', cmyk)}
        </div>

        <div className="border-t dark:border-border my-4" />

        {/* Tags */}
        <div>
          <label className="text-sm font-medium mb-2 block">Tags</label>
          {color?.tags && color.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {color.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-muted dark:bg-muted/50 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No tags added</p>
          )}
        </div>

        {/* Description */}
        {color?.description && (
          <>
            <div className="border-t dark:border-border my-4" />
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <p className="text-sm text-muted-foreground">{color.description}</p>
            </div>
          </>
        )}

        {/* Contrast Info */}
        <div className="border-t dark:border-border my-4" />
        <div>
          <label className="text-sm font-medium mb-2 block">Accessibility</label>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Contrast with white:</span>
              <span className="text-green-600 dark:text-green-500 font-medium">AA ✓</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Contrast with black:</span>
              <span className="text-green-600 dark:text-green-500 font-medium">AAA ✓</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card dark:bg-card rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row">
        {/* Left: Color Preview */}
        <div
          className="flex-1 min-h-[200px] md:min-h-[400px] relative"
          style={{ backgroundColor: color?.hex || '#000000' }}
        >
          {/* Header Overlay */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/30 to-transparent">
            <h2
              className="text-xl font-semibold drop-shadow"
              style={{ color: textColor }}
            >
              {color?.name || 'Color'}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDuplicate}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center transition-colors duration-200"
                title="Duplicate"
              >
                <Copy className="h-4 w-4" style={{ color: textColor }} />
              </button>
              <button
                onClick={handleDelete}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center transition-colors duration-200"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" style={{ color: textColor }} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Information Panel */}
        <div className="w-full md:w-[380px] bg-card dark:bg-card flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-border">
            <h3 className="text-lg font-semibold">Color Information</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  isEditMode ? 'bg-primary text-primary-foreground' : 'hover:bg-muted dark:hover:bg-muted/50'
                }`}
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                className="w-8 h-8 rounded-lg hover:bg-muted dark:hover:bg-muted/50 flex items-center justify-center transition-colors duration-200"
                title="Info"
              >
                <Info className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-muted dark:hover:bg-muted/50 flex items-center justify-center transition-colors duration-200"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'information' && (
              <div className="p-6">
                {renderInformationTab()}
              </div>
            )}
            {activeTab === 'notes' && (
              <AssetNotes
                notes={notes}
                onAddNote={(content) => {
                  setNotes([...notes, {
                    id: Date.now().toString(),
                    author: 'You',
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    content,
                  }]);
                }}
              />
            )}
            {activeTab === 'comments' && (
              <AssetComments
                comments={comments}
                onAddComment={(content, parentId) => {
                  setComments([...comments, {
                    id: Date.now().toString(),
                    author: 'You',
                    avatar: 'YO',
                    time: 'Just now',
                    content,
                  }]);
                }}
              />
            )}
          </div>

          {/* Footer Tabs */}
          <AssetTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  );
}