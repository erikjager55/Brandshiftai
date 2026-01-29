import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Bell,
  Link2,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '../../lib/utils';

interface AccountSettingsPageProps {
  activeSettingsSection?: string;
  onNavigateToSettings?: (section: string) => void;
}

type PasswordStrength = 'none' | 'weak' | 'fair' | 'good' | 'strong';

export function AccountSettingsPage({
  activeSettingsSection = 'settings-account',
  onNavigateToSettings = () => {},
}: AccountSettingsPageProps) {
  // Form states
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@company.com');
  const [jobTitle, setJobTitle] = useState('Marketing Director');
  const [phone, setPhone] = useState('+1 234 567 8900');
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('none');

  // Email preferences
  const [emailPreferences, setEmailPreferences] = useState({
    productUpdates: true,
    researchNotifications: true,
    teamActivity: false,
    marketing: true,
  });

  // Connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: true,
    slack: false,
    microsoft: true,
  });

  // Calculate password strength
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    if (!password) return 'none';
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'fair';
    if (password.length < 14) return 'good';
    return 'strong';
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getStrengthColor = (strength: PasswordStrength) => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'fair': return 'bg-amber-500';
      case 'good': return 'bg-green-500';
      case 'strong': return 'bg-green-600';
      default: return 'bg-gray-200 dark:bg-gray-700';
    }
  };

  const getStrengthSegments = (strength: PasswordStrength): number => {
    switch (strength) {
      case 'weak': return 1;
      case 'fair': return 2;
      case 'good': return 3;
      case 'strong': return 4;
      default: return 0;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Account</h1>
          <p className="text-muted-foreground">Manage your personal account settings</p>
        </div>
        <Button className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Card 1 - Profile Information */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Profile Information</h2>
          <p className="text-sm text-muted-foreground">Update your personal details</p>
        </div>

        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <Avatar className="h-20 w-20 rounded-full">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="text-2xl">JD</AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Change
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Remove
            </Button>
          </div>
        </div>

        {/* Form Grid */}
        <div className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
              />
              <Badge className="rounded-full bg-green-100 text-green-700 border-0 flex-shrink-0 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>

          {/* Job Title & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Card 2 - Password */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Password</h2>
          <p className="text-sm text-muted-foreground">Update your password</p>
        </div>

        <div className="max-w-md space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="rounded-lg"
            />
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => handleNewPasswordChange(e.target.value)}
              className="rounded-lg"
            />
            
            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((segment) => (
                    <div
                      key={segment}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-colors duration-200',
                        segment <= getStrengthSegments(passwordStrength)
                          ? getStrengthColor(passwordStrength)
                          : 'bg-gray-200 dark:bg-gray-700'
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground capitalize">
                  Password strength: {passwordStrength}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-lg"
            />
          </div>

          <Button variant="outline" className="gap-2">
            <Lock className="h-4 w-4" />
            Update Password
          </Button>
        </div>
      </Card>

      {/* Card 3 - Email Preferences */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Email Preferences</h2>
          <p className="text-sm text-muted-foreground">Choose what emails you receive</p>
        </div>

        <div>
          {/* Product Updates */}
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-semibold">Product Updates</p>
              <p className="text-sm text-muted-foreground">New features and improvements</p>
            </div>
            <Switch
              checked={emailPreferences.productUpdates}
              onCheckedChange={(checked) =>
                setEmailPreferences({ ...emailPreferences, productUpdates: checked })
              }
            />
          </div>

          {/* Research Notifications */}
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-semibold">Research Notifications</p>
              <p className="text-sm text-muted-foreground">When your research completes</p>
            </div>
            <Switch
              checked={emailPreferences.researchNotifications}
              onCheckedChange={(checked) =>
                setEmailPreferences({ ...emailPreferences, researchNotifications: checked })
              }
            />
          </div>

          {/* Team Activity */}
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-semibold">Team Activity</p>
              <p className="text-sm text-muted-foreground">Comments and mentions</p>
            </div>
            <Switch
              checked={emailPreferences.teamActivity}
              onCheckedChange={(checked) =>
                setEmailPreferences({ ...emailPreferences, teamActivity: checked })
              }
            />
          </div>

          {/* Marketing */}
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-semibold">Marketing</p>
              <p className="text-sm text-muted-foreground">Tips and best practices</p>
            </div>
            <Switch
              checked={emailPreferences.marketing}
              onCheckedChange={(checked) =>
                setEmailPreferences({ ...emailPreferences, marketing: checked })
              }
            />
          </div>
        </div>
      </Card>

      {/* Card 4 - Connected Accounts */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Connected Accounts</h2>
          <p className="text-sm text-muted-foreground">Manage third-party connections</p>
        </div>

        <div>
          {/* Google */}
          <div className="flex justify-between items-center py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Mail className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-semibold">Google</p>
                <p className="text-sm text-muted-foreground">john.doe@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="rounded-full bg-green-100 text-green-700 border-0 dark:bg-green-900/30 dark:text-green-400">
                Connected
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setConnectedAccounts({ ...connectedAccounts, google: false })}
              >
                Disconnect
              </Button>
            </div>
          </div>

          {/* Slack */}
          <div className="flex justify-between items-center py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Link2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-semibold">Slack</p>
                <p className="text-sm text-muted-foreground">Connect your workspace</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConnectedAccounts({ ...connectedAccounts, slack: true })}
            >
              Connect
            </Button>
          </div>

          {/* Microsoft */}
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold">Microsoft</p>
                <p className="text-sm text-muted-foreground">john.doe@outlook.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="rounded-full bg-green-100 text-green-700 border-0 dark:bg-green-900/30 dark:text-green-400">
                Connected
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setConnectedAccounts({ ...connectedAccounts, microsoft: false })}
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Card 5 - Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:bg-red-900/20 dark:border-red-800">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-foreground">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <Button
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
