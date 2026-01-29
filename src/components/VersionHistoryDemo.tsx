import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Edit, Save, X, ArrowLeft, History, Target } from 'lucide-react';
import {
  VersionHistoryPanel,
  VersionPreviewModal,
  CompareVersionsModal,
  RestoreConfirmationDialog,
  VersionIndicator,
} from './version-history';
import { useVersionHistory } from '../contexts';
import { Version } from '../types/version-history';
import { toast } from 'sonner';
import { mockVersions } from '../data/mock-versions';

export function VersionHistoryDemo() {
  const {
    createVersion,
    restoreVersion,
    getVersionHistory,
  } = useVersionHistory();

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    'At Brandshift, we empower brands to discover their authentic voice and create meaningful connections with their audiences through AI-powered insights and strategic brand building.'
  );
  const [editContent, setEditContent] = useState(content);

  // Version History UI state
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [versionToRestore, setVersionToRestore] = useState<Version | null>(null);
  const [compareVersions, setCompareVersions] = useState<{
    v1: Version | null;
    v2: Version | null;
  }>({ v1: null, v2: null });
  const [isRestoring, setIsRestoring] = useState(false);

  // Current version info
  const [currentVersionNumber, setCurrentVersionNumber] = useState(5);
  const [lastEditedAt, setLastEditedAt] = useState(new Date('2026-01-28T14:32:00'));
  const [lastEditedBy, setLastEditedBy] = useState('Erik van der Meer');

  // Initialize mock versions on mount
  useEffect(() => {
    mockVersions.forEach((version) => {
      createVersion({
        itemType: 'brand-foundation',
        itemId: 'brand-foundation-1',
        sectionId: 'mission',
        content: version.content,
        changeNote: version.changeNote,
        userId: version.createdBy.id,
        userName: version.createdBy.name,
        userAvatar: version.createdBy.avatar,
      });
    });
  }, [createVersion]);

  const handleSave = () => {
    // Create new version
    const newVersion = createVersion({
      itemType: 'brand-foundation',
      itemId: 'brand-foundation-1',
      sectionId: 'mission',
      content: { text: editContent },
      changeNote: 'Manual edit',
      userId: 'user-1',
      userName: 'Erik van der Meer',
      userAvatar: 'https://i.pravatar.cc/150?img=12',
    });

    setContent(editContent);
    setCurrentVersionNumber(newVersion.versionNumber);
    setLastEditedAt(newVersion.createdAt);
    setLastEditedBy(newVersion.createdBy.name);
    setIsEditing(false);

    toast.success('Changes saved!', {
      description: `Version ${newVersion.versionNumber} created.`,
    });
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const handleViewVersion = (version: Version) => {
    setSelectedVersion(version);
    setShowPreviewModal(true);
  };

  const handleCompareVersions = (v1: Version, v2: Version) => {
    setCompareVersions({ v1, v2 });
    setShowHistoryPanel(false);
    setShowCompareModal(true);
  };

  const handleRestoreVersion = (version: Version) => {
    setVersionToRestore(version);
    setShowHistoryPanel(false);
    setShowRestoreDialog(true);
  };

  const handleConfirmRestore = (note?: string) => {
    if (!versionToRestore) return;

    setIsRestoring(true);

    setTimeout(() => {
      const restoredVersion = restoreVersion({
        versionId: versionToRestore.id,
        note,
        userId: 'user-1',
        userName: 'Erik van der Meer',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
      });

      const restoredContent =
        typeof versionToRestore.content === 'string'
          ? versionToRestore.content
          : versionToRestore.content.text || '';

      setContent(restoredContent);
      setEditContent(restoredContent);
      setCurrentVersionNumber(restoredVersion.versionNumber);
      setLastEditedAt(restoredVersion.createdAt);
      setLastEditedBy(restoredVersion.createdBy.name);
      setIsRestoring(false);
      setShowRestoreDialog(false);
      setVersionToRestore(null);

      toast.success('Version restored!', {
        description: `Version ${versionToRestore.versionNumber} has been restored.`,
      });
    }, 1000);
  };

  const history = getVersionHistory('brand-foundation', 'brand-foundation-1', 'mission');
  const versions = history?.versions || [];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <span className="text-primary">Dashboard</span>
          <span>/</span>
          <span className="text-primary">Brand Foundation</span>
          <span>/</span>
          <span className="text-foreground font-medium">Mission Statement</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">Mission Statement</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Your organization's purpose and reason for existence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Validated
              </Badge>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Content</h2>
              <div className="flex items-center gap-2">
                {!isEditing && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHistoryPanel(true)}
                      className="gap-1.5"
                    >
                      <History className="h-4 w-4" />
                      History
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditContent(content);
                        setIsEditing(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </>
                )}
                {isEditing && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full min-h-[120px] p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <div>
                <p className="text-base leading-relaxed">{content}</p>

                {/* Version Indicator */}
                <VersionIndicator
                  versionNumber={currentVersionNumber}
                  lastEditedAt={lastEditedAt}
                  lastEditedBy={lastEditedBy}
                  onOpenHistory={() => setShowHistoryPanel(true)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">About Version History</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              This demo showcases the complete Version History system for knowledge items.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Click "History" to view all versions</li>
              <li>View any previous version</li>
              <li>Compare versions side-by-side</li>
              <li>Restore any previous version</li>
              <li>All versions are preserved</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Version History Panel */}
      <VersionHistoryPanel
        open={showHistoryPanel}
        onClose={() => setShowHistoryPanel(false)}
        itemType="brand-foundation"
        itemId="brand-foundation-1"
        sectionId="mission"
        itemName="Brand Foundation: Mission Statement"
        onViewVersion={handleViewVersion}
        onCompareVersions={handleCompareVersions}
        onRestoreVersion={handleRestoreVersion}
      />

      {/* Version Preview Modal */}
      <VersionPreviewModal
        open={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setSelectedVersion(null);
        }}
        version={selectedVersion}
        itemName="Brand Foundation: Mission Statement"
        onRestore={(version) => {
          setShowPreviewModal(false);
          handleRestoreVersion(version);
        }}
      />

      {/* Compare Versions Modal */}
      <CompareVersionsModal
        open={showCompareModal}
        onClose={() => {
          setShowCompareModal(false);
          setCompareVersions({ v1: null, v2: null });
        }}
        versions={versions}
        initialVersion1={compareVersions.v1 || undefined}
        initialVersion2={compareVersions.v2 || undefined}
        itemName="Brand Foundation: Mission Statement"
        onRestore={(version) => {
          setShowCompareModal(false);
          handleRestoreVersion(version);
        }}
      />

      {/* Restore Confirmation Dialog */}
      <RestoreConfirmationDialog
        open={showRestoreDialog}
        onClose={() => {
          setShowRestoreDialog(false);
          setVersionToRestore(null);
        }}
        version={versionToRestore}
        onConfirm={handleConfirmRestore}
        isRestoring={isRestoring}
      />
    </div>
  );
}
