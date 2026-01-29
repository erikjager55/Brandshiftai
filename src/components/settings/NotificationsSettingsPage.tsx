import React, { useState } from 'react';
import {
  Bell,
  Mail,
  Globe,
  MessageSquare,
  CheckCircle2,
  Target,
  Rocket,
  Users,
  Settings as SettingsIcon,
  Moon,
  Link2,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '../../lib/utils';

interface NotificationsSettingsPageProps {
  activeSettingsSection?: string;
  onNavigateToSettings?: (section: string) => void;
}

type NotificationChannel = 'email' | 'browser' | 'slack';
type NotificationType = 'research' | 'campaigns' | 'team' | 'system';

interface ChannelState {
  enabled: boolean;
  configured: boolean;
}

interface NotificationPreference {
  id: string;
  label: string;
  email: boolean;
  browser: boolean;
  slack: boolean;
}

export function NotificationsSettingsPage({
  activeSettingsSection = 'settings-notifications',
  onNavigateToSettings = () => {},
}: NotificationsSettingsPageProps) {
  // Channel states
  const [channels, setChannels] = useState<Record<NotificationChannel, ChannelState>>({
    email: { enabled: true, configured: true },
    browser: { enabled: true, configured: true },
    slack: { enabled: false, configured: false },
  });

  // Notification preferences by category
  const [researchNotifications, setResearchNotifications] = useState<NotificationPreference[]>([
    { id: 'research-complete', label: 'Research completed', email: true, browser: true, slack: false },
    { id: 'research-ready', label: 'Results ready to review', email: true, browser: true, slack: false },
    { id: 'research-failed', label: 'Research failed', email: true, browser: false, slack: false },
  ]);

  const [campaignNotifications, setCampaignNotifications] = useState<NotificationPreference[]>([
    { id: 'campaign-published', label: 'Campaign published', email: true, browser: true, slack: true },
    { id: 'campaign-milestone', label: 'Milestone reached', email: true, browser: false, slack: false },
    { id: 'campaign-performance', label: 'Performance alerts', email: true, browser: true, slack: true },
  ]);

  const [teamNotifications, setTeamNotifications] = useState<NotificationPreference[]>([
    { id: 'team-mention', label: 'Mentions and replies', email: true, browser: true, slack: true },
    { id: 'team-invite', label: 'Team invitations', email: true, browser: true, slack: false },
    { id: 'team-role', label: 'Role changes', email: true, browser: false, slack: false },
  ]);

  const [systemNotifications, setSystemNotifications] = useState<NotificationPreference[]>([
    { id: 'system-updates', label: 'Product updates', email: true, browser: false, slack: false },
    { id: 'system-security', label: 'Security alerts', email: true, browser: true, slack: false },
    { id: 'system-maintenance', label: 'Maintenance notices', email: true, browser: true, slack: false },
  ]);

  // Quiet hours
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00');
  const [timezone, setTimezone] = useState('America/New_York');

  const toggleChannel = (channel: NotificationChannel) => {
    setChannels({
      ...channels,
      [channel]: {
        ...channels[channel],
        enabled: !channels[channel].enabled,
      },
    });
  };

  const toggleNotification = (
    category: 'research' | 'campaign' | 'team' | 'system',
    id: string,
    channel: NotificationChannel
  ) => {
    const updateFunction = {
      research: setResearchNotifications,
      campaign: setCampaignNotifications,
      team: setTeamNotifications,
      system: setSystemNotifications,
    }[category];

    const currentNotifications = {
      research: researchNotifications,
      campaign: campaignNotifications,
      team: teamNotifications,
      system: systemNotifications,
    }[category];

    updateFunction(
      currentNotifications.map((notif) =>
        notif.id === id ? { ...notif, [channel]: !notif[channel] } : notif
      )
    );
  };

  const getChannelIcon = (channel: NotificationChannel) => {
    const icons = {
      email: Mail,
      browser: Globe,
      slack: MessageSquare,
    };
    const Icon = icons[channel];
    return <Icon className="h-5 w-5" />;
  };

  const getChannelColor = (channel: NotificationChannel) => {
    const colors = {
      email: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      browser: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      slack: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    };
    return colors[channel];
  };

  const getCategoryIcon = (category: NotificationType) => {
    const icons = {
      research: Target,
      campaigns: Rocket,
      team: Users,
      system: SettingsIcon,
    };
    return icons[category];
  };

  const renderNotificationRow = (
    notification: NotificationPreference,
    category: 'research' | 'campaign' | 'team' | 'system'
  ) => {
    return (
      <tr key={notification.id} className="border-b last:border-0">
        <td className="py-3 px-4 text-sm">{notification.label}</td>
        <td className="py-3 px-4 text-center">
          <Switch
            checked={notification.email}
            onCheckedChange={() => toggleNotification(category, notification.id, 'email')}
            disabled={!channels.email.enabled}
          />
        </td>
        <td className="py-3 px-4 text-center">
          <Switch
            checked={notification.browser}
            onCheckedChange={() => toggleNotification(category, notification.id, 'browser')}
            disabled={!channels.browser.enabled}
          />
        </td>
        <td className="py-3 px-4 text-center">
          <Switch
            checked={notification.slack}
            onCheckedChange={() => toggleNotification(category, notification.id, 'slack')}
            disabled={!channels.slack.enabled}
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Notifications</h1>
          <p className="text-muted-foreground">Control how and when you receive notifications</p>
        </div>
        <Button className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Card 1 - Notification Channels */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Channels</h2>
          <p className="text-sm text-muted-foreground">Choose how you want to be notified</p>
        </div>

        <div className="space-y-4">
          {/* Email Channel */}
          <div className="rounded-lg border p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', getChannelColor('email'))}>
                {getChannelIcon('email')}
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {channels.email.enabled && (
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Configure
                </Button>
              )}
              <Switch
                checked={channels.email.enabled}
                onCheckedChange={() => toggleChannel('email')}
              />
            </div>
          </div>

          {/* Browser Channel */}
          <div className="rounded-lg border p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', getChannelColor('browser'))}>
                {getChannelIcon('browser')}
              </div>
              <div>
                <p className="font-semibold">Browser</p>
                <p className="text-sm text-muted-foreground">Receive in-app and push notifications</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {channels.browser.enabled && (
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Configure
                </Button>
              )}
              <Switch
                checked={channels.browser.enabled}
                onCheckedChange={() => toggleChannel('browser')}
              />
            </div>
          </div>

          {/* Slack Channel */}
          <div className="rounded-lg border p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', getChannelColor('slack'))}>
                {getChannelIcon('slack')}
              </div>
              <div>
                <p className="font-semibold">Slack</p>
                <p className="text-sm text-muted-foreground">
                  {channels.slack.configured ? 'Connected to workspace' : 'Connect your Slack workspace'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!channels.slack.configured ? (
                <Button variant="outline" size="sm" className="gap-2">
                  <Link2 className="h-4 w-4" />
                  Connect
                </Button>
              ) : (
                <>
                  {channels.slack.enabled && (
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Configure
                    </Button>
                  )}
                  <Switch
                    checked={channels.slack.enabled}
                    onCheckedChange={() => toggleChannel('slack')}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Card 2 - Notification Types */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Notification Types</h2>
          <p className="text-sm text-muted-foreground">Choose what you want to be notified about</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium">Type</th>
                <th className="text-center py-3 px-4 text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Globe className="h-4 w-4" />
                    Browser
                  </div>
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Slack
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Research Section */}
              <tr className="bg-muted/50">
                <td colSpan={4} className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Research</span>
                  </div>
                </td>
              </tr>
              {researchNotifications.map((notif) => renderNotificationRow(notif, 'research'))}

              {/* Campaigns Section */}
              <tr className="bg-muted/50">
                <td colSpan={4} className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Campaigns</span>
                  </div>
                </td>
              </tr>
              {campaignNotifications.map((notif) => renderNotificationRow(notif, 'campaign'))}

              {/* Team Section */}
              <tr className="bg-muted/50">
                <td colSpan={4} className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Team</span>
                  </div>
                </td>
              </tr>
              {teamNotifications.map((notif) => renderNotificationRow(notif, 'team'))}

              {/* System Section */}
              <tr className="bg-muted/50">
                <td colSpan={4} className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">System</span>
                  </div>
                </td>
              </tr>
              {systemNotifications.map((notif) => renderNotificationRow(notif, 'system'))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Card 3 - Quiet Hours */}
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">Quiet Hours</h2>
              <p className="text-sm text-muted-foreground">
                Pause notifications during specific hours
              </p>
            </div>
            <Switch
              checked={quietHoursEnabled}
              onCheckedChange={setQuietHoursEnabled}
            />
          </div>
        </div>

        {quietHoursEnabled && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              {/* Start Time */}
              <div className="space-y-2">
                <Label htmlFor="quietStart">Start Time</Label>
                <Select value={quietHoursStart} onValueChange={setQuietHoursStart}>
                  <SelectTrigger id="quietStart" className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <Label htmlFor="quietEnd">End Time</Label>
                <Select value={quietHoursEnd} onValueChange={setQuietHoursEnd}>
                  <SelectTrigger id="quietEnd" className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Timezone */}
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone" className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  <SelectItem value="Australia/Sydney">Sydney (AEST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preview */}
            <div className="rounded-lg bg-muted p-4 flex items-start gap-3">
              <Moon className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1">Quiet hours active</p>
                <p className="text-sm text-muted-foreground">
                  Notifications will be paused from {quietHoursStart} to {quietHoursEnd} ({timezone.split('/')[1]})
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}