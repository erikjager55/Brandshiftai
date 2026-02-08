import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { Share2, Copy, Mail, Users, Eye, Edit, Lock, Check } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '../utils/clipboard';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  resourceId: string;
  resourceType: 'strategy' | 'research' | 'campaign';
  resourceName: string;
}

export function ShareModal({ open, onClose, resourceId, resourceType, resourceName }: ShareModalProps) {
  const { createShare, shareSettings } = useCollaboration();
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [emailList, setEmailList] = useState('');
  const [permissions, setPermissions] = useState<'view' | 'comment' | 'edit'>('view');
  const [allowDownload, setAllowDownload] = useState(true);
  const [requirePassword, setRequirePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [expiresIn, setExpiresIn] = useState<string>('never');

  const handleCreateLink = () => {
    const shareId = createShare({
      resourceType,
      resourceId,
      shareType: 'link',
      permissions,
      allowDownload,
      password: requirePassword ? password : undefined,
      expiresAt: expiresIn !== 'never' ? getExpiryDate(expiresIn) : undefined,
      createdBy: 'current-user'
    });

    const link = `${window.location.origin}/shared/${shareId}`;
    setShareLink(link);
  };

  const handleCopyLink = () => {
    copyToClipboard(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const emails = emailList.split(',').map(e => e.trim()).filter(Boolean);
    
    createShare({
      resourceType,
      resourceId,
      shareType: 'email',
      permissions,
      allowDownload,
      sharedWith: emails,
      createdBy: 'current-user'
    });

    // In real implementation, send emails here
    alert(`Shared with: ${emails.join(', ')}`);
    setEmailList('');
  };

  const getExpiryDate = (period: string): string => {
    const now = new Date();
    switch (period) {
      case '1hour': return new Date(now.getTime() + 60 * 60 * 1000).toISOString();
      case '1day': return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
      case '7days': return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30days': return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
      default: return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Share "{resourceName}"</DialogTitle>
          <DialogDescription>
            Share this {resourceType} with your team or external collaborators
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6 overflow-y-auto flex-1">
          <Tabs defaultValue="link" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="link" className="gap-2">
                <Link2 className="h-3 w-3" />
                Link
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-2">
                <Mail className="h-3 w-3" />
                Email
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2">
                <Users className="h-3 w-3" />
                Team
              </TabsTrigger>
            </TabsList>

            {/* Link Sharing */}
            <TabsContent value="link" className="space-y-4">
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={permissions === 'view' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPermissions('view')}
                      >
                        View
                      </Button>
                      <Button
                        variant={permissions === 'comment' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPermissions('comment')}
                      >
                        Comment
                      </Button>
                      <Button
                        variant={permissions === 'edit' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPermissions('edit')}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Download</Label>
                      <p className="text-xs text-muted-foreground">
                        Users can download a copy
                      </p>
                    </div>
                    <Switch checked={allowDownload} onCheckedChange={setAllowDownload} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Password Protection</Label>
                        <p className="text-xs text-muted-foreground">
                          Require password to access
                        </p>
                      </div>
                      <Switch checked={requirePassword} onCheckedChange={setRequirePassword} />
                    </div>
                    
                    {requirePassword && (
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Link Expires</Label>
                    <select
                      value={expiresIn}
                      onChange={(e) => setExpiresIn(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="never">Never</option>
                      <option value="1hour">1 hour</option>
                      <option value="1day">1 day</option>
                      <option value="7days">7 days</option>
                      <option value="30days">30 days</option>
                    </select>
                  </div>
                </div>

                {!shareLink ? (
                  <Button onClick={handleCreateLink} className="w-full gap-2">
                    <Link2 className="h-4 w-4" />
                    Create Share Link
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Label>Share Link</Label>
                    <div className="flex gap-2">
                      <Input value={shareLink} readOnly />
                      <Button onClick={handleCopyLink} variant="outline" className="gap-2">
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="gap-1">
                        <Lock className="h-3 w-3" />
                        {permissions}
                      </Badge>
                      {expiresIn !== 'never' && (
                        <Badge variant="outline" className="gap-1">
                          <Calendar className="h-3 w-3" />
                          Expires in {expiresIn}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Email Sharing */}
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emails">Email Addresses</Label>
                  <Input
                    id="emails"
                    placeholder="email1@example.com, email2@example.com"
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate multiple emails with commas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={permissions === 'view' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPermissions('view')}
                    >
                      View
                    </Button>
                    <Button
                      variant={permissions === 'comment' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPermissions('comment')}
                    >
                      Comment
                    </Button>
                    <Button
                      variant={permissions === 'edit' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPermissions('edit')}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleEmailShare} 
                  disabled={!emailList.trim()}
                  className="w-full gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Send Invitations
                </Button>
              </div>
            </TabsContent>

            {/* Team Sharing */}
            <TabsContent value="team" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This {resourceType} is automatically shared with all team members based on their role permissions.
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Tip:</strong> Use the Team Management page to control who has access to different resources.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}