import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Plus,
  Trash2,
  Upload,
  Download,
  Mail,
  Save,
  ChevronRight,
  ChevronLeft,
  Users,
  FileText,
  CheckCircle2,
  X
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface Recipient {
  id: string;
  name: string;
  email: string;
  group: string;
  role: string;
  linkSent: boolean;
  responsesReceived: boolean;
  responseDate?: string;
}

interface QuestionnaireStep3RecipientsProps {
  questionnaire: any;
  onUpdate: (field: string, value: any) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function QuestionnaireStep3Recipients({
  questionnaire,
  onUpdate,
  onContinue,
  onBack
}: QuestionnaireStep3RecipientsProps) {
  const [addRecipientOpen, setAddRecipientOpen] = useState(false);
  const [importRecipientsOpen, setImportRecipientsOpen] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    group: 'stakeholder',
    role: ''
  });

  const recipients: Recipient[] = questionnaire.recipients || [];

  const handleAddRecipient = () => {
    if (!newRecipient.name || !newRecipient.email) {
      toast.error('Please enter name and email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newRecipient.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Check for duplicate email
    if (recipients.some(r => r.email === newRecipient.email)) {
      toast.error('This email is already added');
      return;
    }

    const recipient: Recipient = {
      id: `r-${Date.now()}`,
      name: newRecipient.name,
      email: newRecipient.email,
      group: newRecipient.group,
      role: newRecipient.role,
      linkSent: false,
      responsesReceived: false
    };

    onUpdate('recipients', [...recipients, recipient]);
    
    // Reset form
    setNewRecipient({
      name: '',
      email: '',
      group: 'stakeholder',
      role: ''
    });
    
    setAddRecipientOpen(false);
    toast.success('Recipient added');
  };

  const handleDeleteRecipient = (recipientId: string) => {
    onUpdate(
      'recipients',
      recipients.filter((r: Recipient) => r.id !== recipientId)
    );
    toast.success('Recipient removed');
  };

  const handleImportCSV = () => {
    // Mock CSV import
    const mockRecipients: Recipient[] = [
      {
        id: `r-${Date.now()}-1`,
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        group: 'stakeholder',
        role: 'Marketing Director',
        linkSent: false,
        responsesReceived: false
      },
      {
        id: `r-${Date.now()}-2`,
        name: 'Michael Chen',
        email: 'michael.c@company.com',
        group: 'customer',
        role: 'Product Manager',
        linkSent: false,
        responsesReceived: false
      },
      {
        id: `r-${Date.now()}-3`,
        name: 'Emily Rodriguez',
        email: 'emily.r@company.com',
        group: 'employee',
        role: 'Team Lead',
        linkSent: false,
        responsesReceived: false
      }
    ];

    onUpdate('recipients', [...recipients, ...mockRecipients]);
    setImportRecipientsOpen(false);
    toast.success(`${mockRecipients.length} recipients imported`);
  };

  const handleExportTemplate = () => {
    toast.success('CSV template downloaded');
    // Would trigger actual CSV download
  };

  const handleContinue = () => {
    if (recipients.length === 0 && questionnaire.distributionMethod === 'email') {
      toast.error('Please add at least one recipient');
      return;
    }
    onContinue();
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'stakeholder':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'customer':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'employee':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'partner':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-1">Add Recipients</h2>
        <p className="text-sm text-muted-foreground">
          {questionnaire.distributionMethod === 'email' 
            ? 'Add people who will receive the questionnaire via email'
            : 'Track recipients who will access via the shareable link (optional)'}
        </p>
      </div>

      {/* Section A: Recipients List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Recipients ({recipients.length})</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setImportRecipientsOpen(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button 
              size="sm"
              onClick={() => setAddRecipientOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
          </div>
        </div>

        {recipients.length > 0 ? (
          <div className="space-y-2">
            {recipients.map((recipient: Recipient) => (
              <div
                key={recipient.id}
                className="p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">{recipient.name}</p>
                      <Badge variant="secondary" className={`text-xs h-5 ${getGroupColor(recipient.group)}`}>
                        {recipient.group}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{recipient.email}</span>
                      {recipient.role && (
                        <>
                          <span>•</span>
                          <span>{recipient.role}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRecipient(recipient.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm font-medium mb-1">No recipients added yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              {questionnaire.distributionMethod === 'email'
                ? 'Add recipients who will receive email invitations'
                : 'Add recipients to track responses (optional for link distribution)'}
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setImportRecipientsOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button 
                size="sm"
                onClick={() => setAddRecipientOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Recipient
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Section B: Summary Stats */}
      {recipients.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-muted/30 text-center">
            <div className="text-2xl font-semibold">{recipients.length}</div>
            <div className="text-xs text-muted-foreground">Total Recipients</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 text-center">
            <div className="text-2xl font-semibold">
              {recipients.filter(r => r.group === 'stakeholder').length}
            </div>
            <div className="text-xs text-muted-foreground">Stakeholders</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 text-center">
            <div className="text-2xl font-semibold">
              {recipients.filter(r => r.group === 'customer').length}
            </div>
            <div className="text-xs text-muted-foreground">Customers</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 text-center">
            <div className="text-2xl font-semibold">
              {recipients.filter(r => r.group === 'employee').length}
            </div>
            <div className="text-xs text-muted-foreground">Employees</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button variant="outline" onClick={() => {
          toast.success('Draft saved');
        }}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button className="flex-1" onClick={handleContinue}>
          Continue to Collect
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Add Recipient Modal */}
      <Dialog open={addRecipientOpen} onOpenChange={setAddRecipientOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Add Recipient</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Add a new recipient to the questionnaire
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient-name" className="text-sm font-medium">Name</Label>
              <Input
                id="recipient-name"
                placeholder="John Doe"
                value={newRecipient.name}
                onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient-email" className="text-sm font-medium">Email</Label>
              <Input
                id="recipient-email"
                type="email"
                placeholder="john.doe@company.com"
                value={newRecipient.email}
                onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient-group" className="text-sm font-medium">Group</Label>
              <Select
                value={newRecipient.group}
                onValueChange={(value) => setNewRecipient({ ...newRecipient, group: value })}
              >
                <SelectTrigger id="recipient-group">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stakeholder">Stakeholder</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient-role" className="text-sm font-medium">Role (Optional)</Label>
              <Input
                id="recipient-role"
                placeholder="Marketing Manager"
                value={newRecipient.role}
                onChange={(e) => setNewRecipient({ ...newRecipient, role: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setAddRecipientOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRecipient}>
              <Plus className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Recipients Modal */}
      <Dialog open={importRecipientsOpen} onOpenChange={setImportRecipientsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Import Recipients from CSV</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Upload a CSV file with recipient information
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4 space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">CSV Format</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                    Your CSV file should have the following columns:
                  </p>
                  <div className="text-xs text-blue-700 dark:text-blue-300 font-mono bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                    name, email, group, role
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleExportTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV Template
            </Button>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-1">Drop CSV file here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
            </div>

            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">Demo Import</p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Click "Import Sample Data" below to add 3 sample recipients for testing
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setImportRecipientsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportCSV}>
              <Upload className="h-4 w-4 mr-2" />
              Import Sample Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}