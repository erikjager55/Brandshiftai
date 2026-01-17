import React, { useState } from 'react';
import { useCollaboration } from '../../contexts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { UserPlus, Mail, Shield, Edit2, Trash2, Check, X } from 'lucide-react';
import { TeamMember, UserRole, InviteRequest } from '../../types/collaboration';
import { formatDistanceToNow } from 'date-fns';

interface TeamManagementModalProps {
  open: boolean;
  onClose: () => void;
}

export function TeamManagementModal({ open, onClose }: TeamManagementModalProps) {
  const { teamMembers, currentUser, inviteTeamMember, updateMemberRole, removeMember } = useCollaboration();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('viewer');
  const [inviteMessage, setInviteMessage] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;

    setIsInviting(true);
    try {
      await inviteTeamMember({
        email: inviteEmail,
        role: inviteRole,
        message: inviteMessage || undefined
      });
      setInviteEmail('');
      setInviteMessage('');
      setInviteRole('viewer');
    } catch (error) {
      console.error('Failed to invite:', error);
    }
    setIsInviting(false);
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'owner': return 'default';
      case 'admin': return 'secondary';
      case 'editor': return 'outline';
      case 'viewer': return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: TeamMember['status']) => {
    switch (status) {
      case 'active': return 'default';
      case 'invited': return 'secondary';
      case 'inactive': return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Team Management</DialogTitle>
          <DialogDescription>
            Invite team members and manage their roles and permissions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite Section */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Team Member
            </h4>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as UserRole)}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer - Can view only</SelectItem>
                    <SelectItem value="editor">Editor - Can edit strategies</SelectItem>
                    <SelectItem value="admin">Admin - Full access except billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Input
                  id="message"
                  placeholder="Welcome to the team!"
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                />
              </div>

              <Button onClick={handleInvite} disabled={isInviting || !inviteEmail.trim()} className="gap-2">
                <Mail className="h-4 w-4" />
                {isInviting ? 'Sending Invite...' : 'Send Invitation'}
              </Button>
            </div>
          </div>

          {/* Team Members List */}
          <div className="space-y-4">
            <h4 className="font-medium">Team Members ({teamMembers.length})</h4>
            
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{member.name}</p>
                      {member.id === currentUser?.id && (
                        <Badge variant="outline" className="text-xs">You</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Last active {formatDistanceToNow(new Date(member.lastActive), { addSuffix: true })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadgeVariant(member.status)}>
                      {member.status}
                    </Badge>
                    
                    {member.id === currentUser?.id ? (
                      <Badge variant={getRoleBadgeVariant(member.role)} className="gap-1">
                        <Shield className="h-3 w-3" />
                        {member.role}
                      </Badge>
                    ) : currentUser?.role === 'owner' || currentUser?.role === 'admin' ? (
                      <Select 
                        value={member.role} 
                        onValueChange={(value) => updateMemberRole(member.id, value as UserRole)}
                        disabled={member.role === 'owner'}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          {currentUser?.role === 'owner' && (
                            <SelectItem value="owner">Owner</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant={getRoleBadgeVariant(member.role)}>
                        {member.role}
                      </Badge>
                    )}

                    {member.id !== currentUser?.id && (currentUser?.role === 'owner' || currentUser?.role === 'admin') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm(`Remove ${member.name} from the team?`)) {
                            removeMember(member.id);
                          }
                        }}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role Permissions Info */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
            <p className="font-medium">Role Permissions:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><strong>Owner:</strong> Full access including billing and team management</li>
              <li><strong>Admin:</strong> Can manage team members and all content</li>
              <li><strong>Editor:</strong> Can create and edit strategies and research</li>
              <li><strong>Viewer:</strong> Can view and comment on strategies</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
