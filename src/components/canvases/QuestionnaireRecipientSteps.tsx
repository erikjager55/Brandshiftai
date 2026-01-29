import React, { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Plus,
  Upload,
  Download,
  Search,
  Send,
  CheckCircle2,
  Clock,
  Mail,
  Trash2,
  Eye,
  ChevronDown,
  Save,
  Users,
  Inbox,
  XCircle,
  AlertCircle,
  RefreshCw,
  Calendar,
  Timer,
  BarChart3,
  Filter,
  MoreVertical
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface Recipient {
  id: string;
  name: string;
  email: string;
  group: string;
  role: string;
  status: 'pending' | 'sent' | 'responded' | 'bounced' | 'opted-out';
  sentDate?: string;
  responseDate?: string;
}

interface QuestionnaireRecipientStepsProps {
  questionnaire: any;
  onUpdate: (field: string, value: any) => void;
  onContinue: () => void;
  onBack?: () => void;
}

export function QuestionnaireRecipientSteps({
  questionnaire,
  onUpdate,
  onContinue,
  onBack
}: QuestionnaireRecipientStepsProps) {
  const [currentStep, setCurrentStep] = useState<3 | 4>(3);
  const [addRecipientOpen, setAddRecipientOpen] = useState(false);
  const [sendConfirmationOpen, setSendConfirmationOpen] = useState(false);
  const [closeConfirmationOpen, setCloseConfirmationOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [extendDeadlineModalOpen, setExtendDeadlineModalOpen] = useState(false);
  
  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: 'r1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      group: 'Internal Team',
      role: 'Marketing Director',
      status: 'responded',
      sentDate: '2025-12-05',
      responseDate: '2025-12-06'
    },
    {
      id: 'r2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      group: 'External Stakeholders',
      role: 'Key Customer',
      status: 'responded',
      sentDate: '2025-12-05',
      responseDate: '2025-12-07'
    },
    {
      id: 'r3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@partner.com',
      group: 'Partners',
      role: 'Strategic Partner',
      status: 'sent',
      sentDate: '2025-12-05'
    },
    {
      id: 'r4',
      name: 'David Williams',
      email: 'david.williams@customer.com',
      group: 'External Stakeholders',
      role: 'Customer',
      status: 'sent',
      sentDate: '2025-12-05'
    },
    {
      id: 'r5',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@company.com',
      group: 'Internal Team',
      role: 'Product Manager',
      status: 'pending'
    }
  ]);

  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    group: 'External Stakeholders',
    role: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  const [reminderMessage, setReminderMessage] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [notifyRecipients, setNotifyRecipients] = useState(true);

  const formatDateString = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusBadge = (status: Recipient['status']) => {
    const variants = {
      pending: { color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300', label: 'Pending' },
      sent: { color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', label: 'Sent' },
      responded: { color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400', label: 'Responded' },
      bounced: { color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', label: 'Bounced' },
      'opted-out': { color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', label: 'Opted Out' }
    };
    const variant = variants[status];
    
    return (
      <Badge variant="secondary" className={`${variant.color} text-xs h-5`}>
        {variant.label}
      </Badge>
    );
  };

  const filteredRecipients = recipients.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleRecipientSelection = (id: string) => {
    if (selectedRecipients.includes(id)) {
      setSelectedRecipients(selectedRecipients.filter(rid => rid !== id));
    } else {
      setSelectedRecipients([...selectedRecipients, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRecipients.length === filteredRecipients.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(filteredRecipients.map(r => r.id));
    }
  };

  const addRecipient = () => {
    const recipient: Recipient = {
      id: `r${Date.now()}`,
      name: newRecipient.name,
      email: newRecipient.email,
      group: newRecipient.group,
      role: newRecipient.role,
      status: 'pending'
    };
    setRecipients([...recipients, recipient]);
    setNewRecipient({ name: '', email: '', group: 'External Stakeholders', role: '' });
    setAddRecipientOpen(false);
  };

  const deleteRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
    setSelectedRecipients(selectedRecipients.filter(rid => rid !== id));
  };

  const deleteSelected = () => {
    setRecipients(recipients.filter(r => !selectedRecipients.includes(r.id)));
    setSelectedRecipients([]);
  };

  const getStats = () => {
    const totalSent = recipients.filter(r => r.status === 'sent' || r.status === 'responded').length;
    const totalResponded = recipients.filter(r => r.status === 'responded').length;
    const totalPending = recipients.filter(r => r.status === 'pending' || r.status === 'sent').length;
    const responseRate = totalSent > 0 ? Math.round((totalResponded / totalSent) * 100) : 0;
    
    return {
      totalSent,
      totalResponded,
      totalPending,
      responseRate,
      avgCompletionTime: 8 // Mock data
    };
  };

  if (currentStep === 3) {
    return (
      <div className="space-y-6">
        {/* Step Header */}
        <div className="pb-4 border-b border-border">
          <h2 className="text-xl font-semibold mb-1">Manage Recipients</h2>
          <p className="text-sm text-muted-foreground">Add and organize your survey recipients</p>
        </div>

        {/* Section A: Add Recipients Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">{recipients.length} recipients added</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setAddRecipientOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
            <Button size="sm" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button size="sm" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add from Contacts
            </Button>
          </div>
        </div>

        {/* Section B: Bulk Import */}
        <div className="rounded-xl border-2 border-dashed border-border p-6 text-center bg-muted/30">
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-sm font-semibold mb-1">Import recipients from CSV</h3>
          <p className="text-xs text-muted-foreground mb-4">Download template or drag & drop your file</p>
          <div className="flex items-center justify-center gap-3">
            <Button size="sm" variant="link">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <Button size="sm" variant="outline">
              Choose File
            </Button>
          </div>
        </div>

        {/* Section C: Recipients List */}
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipients..."
                className="pl-9 text-sm"
              />
            </div>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-[180px] text-sm">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedRecipients.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium">{selectedRecipients.length} selected</span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={deleteSelected}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button size="sm" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Resend
                </Button>
              </div>
            </div>
          )}

          {/* Recipients Table */}
          <div className="rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRecipients.length === filteredRecipients.length && filteredRecipients.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Responded</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecipients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No recipients found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRecipients.includes(recipient.id)}
                          onCheckedChange={() => toggleRecipientSelection(recipient.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-sm">{recipient.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{recipient.email}</TableCell>
                      <TableCell className="text-sm">{recipient.group}</TableCell>
                      <TableCell>{getStatusBadge(recipient.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDateString(recipient.sentDate)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDateString(recipient.responseDate)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {recipient.status === 'responded' && (
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Response
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Resend Invitation
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 dark:text-red-400"
                              onClick={() => deleteRecipient(recipient.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Section D: Recipient Groups */}
        <div className="p-4 rounded-xl bg-muted/50">
          <h3 className="text-sm font-semibold mb-2">Recipient Groups</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Organize recipients into groups for segmented analysis
          </p>
          <div className="flex flex-wrap gap-2">
            {['Internal Team', 'External Stakeholders', 'Partners'].map((group) => {
              const count = recipients.filter(r => r.group === group).length;
              return (
                <Badge key={group} variant="outline" className="text-xs h-6">
                  {group} ({count})
                </Badge>
              );
            })}
            <Button size="sm" variant="outline" className="h-6 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Add Group
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-border">
          <Button variant="outline" onClick={onBack}>
            <ChevronDown className="h-4 w-4 mr-2 rotate-90" />
            Back to Distribution
          </Button>
          <Button variant="outline" className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Recipients
          </Button>
          <Button 
            className="flex-1" 
            onClick={() => setSendConfirmationOpen(true)}
            disabled={recipients.length === 0}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Questionnaire
          </Button>
        </div>

        {/* Add Recipient Modal */}
        <Dialog open={addRecipientOpen} onOpenChange={setAddRecipientOpen}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Add Recipient</DialogTitle>
              <DialogDescription>
                Add a new recipient to your questionnaire
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm mb-2 block">Name (optional)</Label>
                <Input
                  value={newRecipient.name}
                  onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                  placeholder="John Doe"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-sm mb-2 block">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={newRecipient.email}
                  onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
                  placeholder="john.doe@company.com"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-sm mb-2 block">Group</Label>
                <Select
                  value={newRecipient.group}
                  onValueChange={(value) => setNewRecipient({ ...newRecipient, group: value })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internal Team">Internal Team</SelectItem>
                    <SelectItem value="External Stakeholders">External Stakeholders</SelectItem>
                    <SelectItem value="Partners">Partners</SelectItem>
                    <SelectItem value="new">+ Create New Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 block">Role/Title (optional)</Label>
                <Input
                  value={newRecipient.role}
                  onChange={(e) => setNewRecipient({ ...newRecipient, role: e.target.value })}
                  placeholder="Marketing Manager"
                  className="text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddRecipientOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addRecipient} disabled={!newRecipient.email}>
                <Plus className="h-4 w-4 mr-2" />
                Add Recipient
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Send Confirmation Modal */}
        <Dialog open={sendConfirmationOpen} onOpenChange={setSendConfirmationOpen}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Send Questionnaire?</DialogTitle>
              <DialogDescription>
                You're about to send the questionnaire to {recipients.length} recipients
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total recipients:</span>
                <span className="font-semibold">{recipients.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Questions:</span>
                <span className="font-semibold">{questionnaire.questions?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated time:</span>
                <span className="font-semibold">{questionnaire.estimatedTime || '10 min'}</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSendConfirmationOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setSendConfirmationOpen(false);
                setCurrentStep(4);
              }}>
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Step 4: Monitor & Collect
  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-1">Monitor Responses</h2>
        <p className="text-sm text-muted-foreground">Track responses and manage collection</p>
      </div>

      {/* Section A: Response Dashboard */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Sent */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Sent</span>
            <Send className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-semibold">{stats.totalSent}</div>
        </div>

        {/* Responses Received */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Responses Received</span>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-semibold">{stats.totalResponded}</div>
          <div className="text-xs text-muted-foreground mt-1">{stats.responseRate}%</div>
        </div>

        {/* Pending */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Pending</span>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-semibold">{stats.totalPending}</div>
          <div className="text-xs text-muted-foreground mt-1">awaiting response</div>
        </div>

        {/* Average Completion Time */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg. Completion</span>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-semibold">{stats.avgCompletionTime} min</div>
        </div>
      </div>

      {/* Section B: Response Timeline */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-4">Response Timeline</h3>
        <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Response timeline chart</p>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Collecting responses • 7 days remaining
          </span>
        </div>
      </div>

      {/* Section C: Recipient Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recipient Status</h3>
          <div className="flex items-center gap-2">
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-[180px] text-sm">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="sent">Not responded</SelectItem>
                <SelectItem value="bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Send Reminder to Non-responders
            </Button>
          </div>
        </div>

        {/* Recipients Table */}
        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Responded</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipients.map((recipient) => (
                <TableRow key={recipient.id}>
                  <TableCell className="font-medium text-sm">{recipient.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{recipient.email}</TableCell>
                  <TableCell className="text-sm">{recipient.group}</TableCell>
                  <TableCell>{getStatusBadge(recipient.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateString(recipient.sentDate)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateString(recipient.responseDate)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {recipient.status === 'responded' && (
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Response
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Send className="h-4 w-4 mr-2" />
                          Resend Invitation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Section D: Quick Actions */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" onClick={() => setReminderModalOpen(true)}>
            <Mail className="h-4 w-4 mr-2" />
            Send Reminder
          </Button>
          <Button variant="outline" onClick={() => setExtendDeadlineModalOpen(true)}>
            <Calendar className="h-4 w-4 mr-2" />
            Extend Deadline
          </Button>
          <Button variant="outline" onClick={() => setCloseConfirmationOpen(true)}>
            <XCircle className="h-4 w-4 mr-2" />
            Close Questionnaire
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button 
          className="flex-1"
          onClick={() => setCloseConfirmationOpen(true)}
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Close & Analyze
        </Button>
      </div>

      {/* Send Reminder Modal */}
      <Dialog open={reminderModalOpen} onOpenChange={setReminderModalOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Send Reminder</DialogTitle>
            <DialogDescription>
              Customize and send a reminder to recipients who haven't responded
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm mb-2 block">Recipients</Label>
              <Select defaultValue="all-pending">
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-pending">All pending ({stats.totalPending})</SelectItem>
                  <SelectItem value="custom">Custom selection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-2 block">Message</Label>
              <Textarea
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
                defaultValue="This is a friendly reminder to complete our survey. Your feedback is valuable to us."
                rows={4}
                className="text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setReminderModalOpen(false)}>
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Extend Deadline Modal */}
      <Dialog open={extendDeadlineModalOpen} onOpenChange={setExtendDeadlineModalOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Extend Deadline</DialogTitle>
            <DialogDescription>
              Set a new deadline for responses
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm mb-2 block">New Deadline</Label>
              <Input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="notify-recipients"
                checked={notifyRecipients}
                onCheckedChange={(checked) => setNotifyRecipients(checked)}
              />
              <Label htmlFor="notify-recipients" className="text-sm cursor-pointer">
                Notify recipients about the new deadline
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExtendDeadlineModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setExtendDeadlineModalOpen(false)}>
              <Calendar className="h-4 w-4 mr-2" />
              Update Deadline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Confirmation Modal */}
      <Dialog open={closeConfirmationOpen} onOpenChange={setCloseConfirmationOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Close Questionnaire?</DialogTitle>
            <DialogDescription>
              Closing the questionnaire will stop accepting new responses
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                  {stats.totalPending} recipients haven't responded yet
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  You can still analyze the collected responses after closing
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCloseConfirmationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setCloseConfirmationOpen(false);
              onContinue();
            }}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Close & Analyze
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}