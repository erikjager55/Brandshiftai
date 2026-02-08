import { useState, useEffect } from 'react';
import { X, Copy, Trash2, Edit, Info, Check } from 'lucide-react';
import { AssetTabs } from './AssetTabs';
import { AssetNotes } from './AssetNotes';
import { AssetComments } from './AssetComments';
import { copyToClipboard } from '../../utils/clipboard';

interface FontData {
  id: string;
  name: string;
  family: string;
  weight: string;
  type?: string;
  size?: number;
  lineHeight?: number;
  description?: string;
  tags?: string[];
}

interface FontDetailModalProps {
  font: FontData | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (font: FontData) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (font: FontData) => void;
}

type TabType = 'information' | 'notes' | 'comments';

export function FontDetailModal({
  font,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  onDuplicate,
}: FontDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('information');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedFont, setEditedFont] = useState(font || {} as FontData);
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [copiedValue, setCopiedValue] = useState(false);

  // Mock data for notes and comments
  const [notes, setNotes] = useState([
    { id: '1', author: 'Design Team', date: 'Jan 10, 2026', content: 'Use this for all primary headings' },
  ]);
  
  const [comments, setComments] = useState([
    { id: '1', author: 'Alex K.', avatar: 'AK', time: '1 day ago', content: 'Should we increase the weight for better readability?' },
  ]);

  useEffect(() => {
    if (isOpen) {
      setEditedFont(font || {} as FontData);
      setActiveTab('information');
      setIsEditMode(false);
    }
  }, [isOpen, font]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(font?.name || '');
    if (success) {
      setCopiedValue(true);
      setTimeout(() => setCopiedValue(false), 2000);
    }
  };

  const handleUpdate = () => {
    onUpdate?.(editedFont);
    setIsEditMode(false);
  };

  const handleDuplicate = () => {
    onDuplicate?.(font || {} as FontData);
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${font?.name}"?`)) {
      onDelete?.(font?.id || '');
      onClose();
    }
  };

  const renderInformationTab = () => {
    if (isEditMode) {
      return (
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Font Name</label>
            <input
              type="text"
              value={editedFont.name}
              onChange={(e) => setEditedFont({ ...editedFont, name: e.target.value })}
              className="rounded-lg border dark:border-border bg-background dark:bg-card p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Font Type */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Font Type</label>
            <select
              value={editedFont.type || 'Heading 1'}
              onChange={(e) => setEditedFont({ ...editedFont, type: e.target.value })}
              className="rounded-lg border dark:border-border bg-background dark:bg-card p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
              <option>Body</option>
              <option>Caption</option>
            </select>
          </div>

          {/* Font Size & Line Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Font Size</label>
              <input
                type="number"
                value={editedFont.size || 60}
                onChange={(e) => setEditedFont({ ...editedFont, size: parseInt(e.target.value) })}
                className="rounded-lg border dark:border-border bg-background dark:bg-card p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Line Height</label>
              <input
                type="number"
                step="0.1"
                value={editedFont.lineHeight || 1.0}
                onChange={(e) => setEditedFont({ ...editedFont, lineHeight: parseFloat(e.target.value) })}
                className="rounded-lg border dark:border-border bg-background dark:bg-card p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <textarea
              value={editedFont.description || ''}
              onChange={(e) => setEditedFont({ ...editedFont, description: e.target.value })}
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
        {/* Font Info */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Font Type</label>
          <div className="rounded-lg border dark:border-border bg-muted/30 dark:bg-muted/20 p-3">
            <span className="text-sm">{font?.type || 'Heading 1'}</span>
          </div>
        </div>

        {/* Font Size & Line Height */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Font Size</label>
            <div className="rounded-lg border dark:border-border bg-muted/30 dark:bg-muted/20 p-3">
              <span className="text-sm">{font?.size || 60}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Line Height</label>
            <div className="rounded-lg border dark:border-border bg-muted/30 dark:bg-muted/20 p-3">
              <span className="text-sm">{font?.lineHeight || 1.0}</span>
            </div>
          </div>
        </div>

        {/* Font Family & Weight */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Font Family</label>
          <div className="rounded-lg border dark:border-border bg-muted/30 dark:bg-muted/20 p-3">
            <span className="text-sm font-mono">{font?.family}</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Font Weight</label>
          <div className="rounded-lg border dark:border-border bg-muted/30 dark:bg-muted/20 p-3">
            <span className="text-sm">{font?.weight}</span>
          </div>
        </div>

        {/* Description */}
        {font?.description && (
          <>
            <div className="border-t dark:border-border my-4" />
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <p className="text-sm text-muted-foreground">{font.description}</p>
            </div>
          </>
        )}

        <div className="border-t dark:border-border my-4" />

        {/* Tags */}
        <div>
          <label className="text-sm font-medium mb-2 block">Tags</label>
          {font?.tags && font.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {font.tags.map((tag, index) => (
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

        {/* Font Pairing */}
        <div className="border-t dark:border-border my-4" />
        <div>
          <label className="text-sm font-medium mb-2 block">Font Pairings</label>
          <p className="text-sm text-muted-foreground">
            Pairs well with: Open Sans, Roboto, Inter
          </p>
        </div>

        {/* Usage */}
        <div>
          <label className="text-sm font-medium mb-2 block">Usage</label>
          <p className="text-xs text-muted-foreground">
            Used in 8 content pieces
          </p>
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
        {/* Left: Font Preview */}
        <div className="flex-1 min-h-[200px] md:min-h-[400px] bg-white dark:bg-white p-8 flex flex-col justify-center relative overflow-auto">
          {/* Header Overlay */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/5 dark:from-black/10 to-transparent">
            <h2 className="text-xl font-semibold text-gray-900">
              {font?.name}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDuplicate}
                className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center transition-colors duration-200"
                title="Duplicate"
              >
                <Copy className="h-4 w-4 text-gray-700" />
              </button>
              <button
                onClick={handleDelete}
                className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center transition-colors duration-200"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Font Previews */}
          <div className="space-y-6 mt-12">
            {/* Lowercase */}
            <div>
              <p 
                className="text-4xl text-gray-900"
                style={{ 
                  fontFamily: font?.family,
                  fontWeight: font?.weight === 'Bold' ? 700 : 400
                }}
              >
                abcdefghijklmnopqrstuvwxyz
              </p>
            </div>

            {/* Uppercase */}
            <div>
              <p 
                className="text-4xl text-gray-900"
                style={{ 
                  fontFamily: font?.family,
                  fontWeight: font?.weight === 'Bold' ? 700 : 400
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
            </div>

            {/* Numbers & Symbols */}
            <div>
              <p 
                className="text-4xl text-gray-900"
                style={{ 
                  fontFamily: font?.family,
                  fontWeight: font?.weight === 'Bold' ? 700 : 400
                }}
              >
                1234567890.:,; ' " (!?) +-*/=
              </p>
            </div>

            {/* Editable Preview */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Enter new default value"
                className="text-lg text-gray-900 border-none focus:outline-none w-full bg-transparent"
                style={{ 
                  fontFamily: font?.family,
                  fontWeight: font?.weight === 'Bold' ? 700 : 400
                }}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
            >
              {copiedValue ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Copy Name</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Information Panel */}
        <div className="w-full md:w-[380px] bg-card dark:bg-card flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-border">
            <h3 className="text-lg font-semibold">Font Information</h3>
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