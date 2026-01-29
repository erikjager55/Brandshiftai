import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  MoreVertical,
  Mail,
  Crown,
  Shield,
  Eye,
  ChevronDown,
  Info,
  ArrowUpRight,
  User,
  Briefcase,
  Building,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { SettingsLayout } from '../settings/SettingsLayout';

type TeamRole = 'owner' | 'admin' | 'editor' | 'viewer';
type MemberStatus = 'active' | 'pending' | 'inactive';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  avatar?: string;
  lastActive?: string;
  isCurrentUser?: boolean;
}

interface PendingInvite {
  id: string;
  email: string;
  role: TeamRole;
  sentAt: string;
  sentBy: string;
}

interface SettingsNavigationItem {
  id: string;
  label: string;
  icon: any;
}

interface TeamManagementPageProps {
  activeSettingsSection?: string;
  onNavigateToSettings?: (section: string) => void;
}

const settingsNavItems: SettingsNavigationItem[] = [
  { id: 'settings-account', label: 'Account', icon: User },
  { id: 'settings-team', label: 'Team', icon: User },
  { id: 'settings-agency', label: 'Agency', icon: Building },
  { id: 'settings-clients', label: 'Clients', icon: Briefcase },
  { id: 'settings-billing', label: 'Billing & Payments', icon: Building },
  { id: 'settings-notifications', label: 'Notifications', icon: Mail },
  { id: 'settings-appearance', label: 'Appearance', icon: Shield },
];

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'owner',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastActive: '2 hours ago',
    isCurrentUser: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastActive: '5 minutes ago',
  },
  {
    id: '3',
    name: 'Emma Williams',
    email: 'emma.williams@company.com',
    role: 'editor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastActive: 'Yesterday',
  },
  {
    id: '4',
    name: 'James Rodriguez',
    email: 'james.rodriguez@company.com',
    role: 'editor',
    status: 'active',
    lastActive: 'Jan 15, 2026',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    role: 'viewer',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    lastActive: 'Jan 10, 2026',
  },
];

const mockPendingInvites: PendingInvite[] = [
  {
    id: 'inv-1',
    email: 'john.smith@company.com',
    role: 'editor',
    sentAt: '2 days ago',
    sentBy: 'Sarah Johnson',
  },
  {
    id: 'inv-2',
    email: 'alex.kim@company.com',
    role: 'viewer',
    sentAt: '5 days ago',
    sentBy: 'Sarah Johnson',
  },
];

const roleConfig = {
  owner: {
    label: 'Owner',
    icon: Crown,
    description: 'Full control over everything',
    color: 'text-purple-600 dark:text-purple-400',
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    description: 'Can manage team and settings',
    color: 'text-blue-600 dark:text-blue-400',
  },
  editor: {
    label: 'Editor',
    icon: Edit,
    description: 'Can create and edit content',
    color: 'text-green-600 dark:text-green-400',
  },
  viewer: {
    label: 'Viewer',
    icon: Eye,
    description: 'Can view content only',
    color: 'text-gray-600 dark:text-gray-400',
  },
};

const permissions = [
  { id: 'view-content', label: 'View content', viewer: true, editor: true, admin: true, owner: true },
  { id: 'edit-content', label: 'Edit content', viewer: false, editor: true, admin: true, owner: true },
  { id: 'create-campaigns', label: 'Create campaigns', viewer: false, editor: true, admin: true, owner: true },
  { id: 'delete-campaigns', label: 'Delete campaigns', viewer: false, editor: false, admin: true, owner: true },
  { id: 'manage-team', label: 'Manage team', viewer: false, editor: false, admin: true, owner: true },
  { id: 'billing-access', label: 'Billing access', viewer: false, editor: false, admin: false, owner: true },
  { id: 'change-settings', label: 'Change settings', viewer: false, editor: false, admin: true, owner: true },
];

export function TeamManagementPage({ activeSettingsSection = 'settings-team', onNavigateToSettings }: TeamManagementPageProps) {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>(mockPendingInvites);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [permissionsExpanded, setPermissionsExpanded] = useState(false);

  // Invite form state
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamRole>('viewer');
  const [inviteMessage, setInviteMessage] = useState('');

  // Plan info
  const totalSeats = 10;
  const usedSeats = members.filter(m => m.status !== 'inactive').length;
  const seatsPercentage = (usedSeats / totalSeats) * 100;

  const getRoleIcon = (role: TeamRole) => {
    const Icon = roleConfig[role].icon;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusBadge = (status: MemberStatus) => {
    const config = {
      active: {
        label: 'Active',
        className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      },
      pending: {
        label: 'Pending',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      },
      inactive: {
        label: 'Inactive',
        className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
      },
    };

    const { label, className } = config[status];
    return (
      <Badge className={cn('rounded-full text-xs', className)}>
        {label}
      </Badge>
    );
  };

  const handleUpdateRole = (memberId: string, newRole: TeamRole) => {
    setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
    setShowDeleteModal(false);
    setSelectedMember(null);
  };

  const handleResendInvite = (inviteId: string) => {
    console.log('Resending invite:', inviteId);
    // Handle resend logic
  };

  const handleCancelInvite = (inviteId: string) => {
    setPendingInvites(pendingInvites.filter(inv => inv.id !== inviteId));
  };

  const handleSendInvites = () => {
    console.log('Sending invites:', { emails: inviteEmails, role: inviteRole, message: inviteMessage });
    // Handle send invites logic
    setShowInviteModal(false);
    setInviteEmails('');
    setInviteRole('viewer');
    setInviteMessage('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Team</h1>
          <p className="text-muted-foreground">Manage your team members and permissions</p>
        </div>
        <Button onClick={() => setShowInviteModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Plan Info Banner */}
      <Card className="rounded-xl border p-4 bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              Team Plan
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {usedSeats} of {totalSeats} seats used
              </span>
              <div className="w-32">
                <Progress value={seatsPercentage} className="h-2" />
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            Upgrade Plan
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Team Members Table */}
      <Card className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium">Member</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Last Active</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-t hover:bg-muted/50 transition-colors duration-200"
                >
                  {/* Member Cell */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {member.avatar && <AvatarImage src={member.avatar} />}
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{member.name}</span>
                          {member.isCurrentUser && (
                            <Badge className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role Cell */}
                  <td className="px-6 py-4">
                    {member.role === 'owner' ? (
                      <div className="flex items-center gap-2">
                        {getRoleIcon(member.role)}
                        <span className="text-sm font-medium">{roleConfig[member.role].label}</span>
                      </div>
                    ) : (
                      <Select
                        value={member.role}
                        onValueChange={(value) => handleUpdateRole(member.id, value as TeamRole)}
                      >
                        <SelectTrigger className="w-[140px] rounded-lg">
                          <div className="flex items-center gap-2">
                            {getRoleIcon(member.role)}
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Admin
                            </div>
                          </SelectItem>
                          <SelectItem value="editor">
                            <div className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Editor
                            </div>
                          </SelectItem>
                          <SelectItem value="viewer">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Viewer
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </td>

                  {/* Status Cell */}
                  <td className="px-6 py-4">
                    {getStatusBadge(member.status)}
                  </td>

                  {/* Last Active Cell */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{member.lastActive}</span>
                  </td>

                  {/* Actions Cell */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {member.role !== 'owner' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedMember(member);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                            onClick={() => {
                              setSelectedMember(member);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {member.role === 'owner' && (
                        <span className="text-sm text-muted-foreground px-2">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pending Invites Section */}
      {pendingInvites.length > 0 && (
        <Card className="rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Pending Invites</h2>
              <Badge className="rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                {pendingInvites.length}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            {pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{invite.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Invited {invite.sentAt} by {invite.sentBy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full text-xs">
                    {roleConfig[invite.role].label}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResendInvite(invite.id)}
                  >
                    Resend
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 dark:text-red-400"
                    onClick={() => handleCancelInvite(invite.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Role Permissions Card */}
      <Collapsible open={permissionsExpanded} onOpenChange={setPermissionsExpanded}>
        <Card className="rounded-xl border p-6">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Role Permissions</h2>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  permissionsExpanded && 'rotate-180'
                )}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium">Permission</th>
                    <th className="text-center py-3 px-4 text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Eye className="h-4 w-4" />
                        Viewer
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Edit className="h-4 w-4" />
                        Editor
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Crown className="h-4 w-4" />
                        Owner
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="border-b last:border-0">
                      <td className="py-3 px-4 text-sm">{permission.label}</td>
                      <td className="py-3 px-4 text-center">
                        {permission.viewer ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 dark:text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {permission.editor ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 dark:text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {permission.admin ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 dark:text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {permission.owner ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 dark:text-gray-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Invite Member Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <DialogDescription>
              Send invitations to join your team. You can invite multiple people by separating emails with commas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="inviteEmails" className="text-sm font-medium">
                Email Addresses
              </Label>
              <Input
                id="inviteEmails"
                type="text"
                placeholder="email@example.com, another@example.com"
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
                className="rounded-lg"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple emails with commas
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="inviteRole" className="text-sm font-medium">
                Role
              </Label>
              <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as TeamRole)}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">Admin</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Can manage team and settings
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="editor">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        <span className="font-medium">Editor</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Can create and edit content
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span className="font-medium">Viewer</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Can view content only
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Personal Message */}
            <div className="space-y-2">
              <Label htmlFor="inviteMessage" className="text-sm font-medium">
                Personal Message <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Textarea
                id="inviteMessage"
                placeholder="Add a personal message to your invitation..."
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                className="rounded-lg min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvites} disabled={!inviteEmails} className="gap-2">
              <Mail className="h-4 w-4" />
              Send Invites
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Member Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              Remove Team Member
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {selectedMember?.name} from the team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <div className="py-4">
              <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                <p className="text-sm font-medium mb-2">This will:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Revoke access to all campaigns and content</li>
                  <li>Remove from all team conversations</li>
                  <li>Free up 1 team seat</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={() => selectedMember && handleRemoveMember(selectedMember.id)}
            >
              Remove Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}