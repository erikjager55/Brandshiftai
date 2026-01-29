import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import {
  Mail,
  Link2,
  Calendar,
  Clock,
  Save,
  ChevronRight,
  ChevronLeft,
  Bell,
  Globe,
  Eye,
  Copy,
  CheckCircle2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface QuestionnaireStep2DistributionProps {
  questionnaire: any;
  onUpdate: (field: string, value: any) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function QuestionnaireStep2Distribution({
  questionnaire,
  onUpdate,
  onContinue,
  onBack
}: QuestionnaireStep2DistributionProps) {
  const [distributionMethod, setDistributionMethod] = useState<'email' | 'link'>(
    questionnaire.distributionMethod || 'email'
  );
  const [emailSubject, setEmailSubject] = useState(
    questionnaire.emailSubject || 'You\'re invited: {questionnaire_name}'
  );
  const [emailBody, setEmailBody] = useState(
    questionnaire.emailBody || 
    'Hi {recipient_name},\n\nYou\'ve been invited to participate in our survey: {questionnaire_name}.\n\nYour feedback is valuable to us. Please click the link below to get started:\n\n{questionnaire_link}\n\nThank you!'
  );
  const [sendReminders, setSendReminders] = useState(questionnaire.sendReminders ?? true);
  const [reminderDays, setReminderDays] = useState(questionnaire.reminderDays || '3');
  const [anonymousResponses, setAnonymousResponses] = useState(
    questionnaire.anonymousResponses ?? false
  );
  const [allowMultipleResponses, setAllowMultipleResponses] = useState(
    questionnaire.allowMultipleResponses ?? false
  );
  const [showLinkPreview, setShowLinkPreview] = useState(false);

  const questionnaireLink = `https://brandshift.app/survey/${questionnaire.id}`;

  const handleCopyLink = () => {
    try {
      // Try modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(questionnaireLink).then(() => {
          toast.success('Link copied to clipboard');
        }).catch(() => {
          fallbackCopyTextToClipboard(questionnaireLink);
        });
      } else {
        fallbackCopyTextToClipboard(questionnaireLink);
      }
    } catch (err) {
      fallbackCopyTextToClipboard(questionnaireLink);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success('Link copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy link');
    }
    document.body.removeChild(textArea);
  };

  const handleContinue = () => {
    // Save all settings
    onUpdate('distributionMethod', distributionMethod);
    onUpdate('emailSubject', emailSubject);
    onUpdate('emailBody', emailBody);
    onUpdate('sendReminders', sendReminders);
    onUpdate('reminderDays', reminderDays);
    onUpdate('anonymousResponses', anonymousResponses);
    onUpdate('allowMultipleResponses', allowMultipleResponses);
    onUpdate('linkUrl', questionnaireLink);
    
    onContinue();
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-1">Distribution Settings</h2>
        <p className="text-sm text-muted-foreground">Configure how to send the questionnaire</p>
      </div>

      {/* Section A: Distribution Method */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Distribution Method</h3>
        <RadioGroup value={distributionMethod} onValueChange={(value: any) => setDistributionMethod(value)}>
          <div className="space-y-2">
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="email" id="email" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="email" className="text-sm font-semibold cursor-pointer flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Distribution
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Send personalized email invitations to recipients with unique links
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="link" id="link" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="link" className="text-sm font-semibold cursor-pointer flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Shareable Link
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Generate a single link you can share anywhere (social media, website, etc.)
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Section B: Email Settings (if email selected) */}
      {distributionMethod === 'email' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Email Configuration</h3>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email-subject">Email Subject</Label>
              <Input
                id="email-subject"
                placeholder="You're invited: Brand Perception Survey"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use {'{questionnaire_name}'} for dynamic name
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-body">Email Body</Label>
              <Textarea
                id="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={8}
              />
              <p className="text-xs text-muted-foreground">
                Available placeholders: {'{recipient_name}'}, {'{questionnaire_name}'}, {'{questionnaire_link}'}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
              <div className="flex items-start gap-2">
                <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Preview</p>
                  <div className="text-xs text-blue-700 dark:text-blue-300 space-y-2">
                    <p><strong>Subject:</strong> {emailSubject.replace('{questionnaire_name}', questionnaire.name)}</p>
                    <div className="whitespace-pre-wrap">
                      {emailBody
                        .replace('{recipient_name}', 'John Doe')
                        .replace('{questionnaire_name}', questionnaire.name)
                        .replace('{questionnaire_link}', questionnaireLink)
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section C: Link Settings (if link selected) */}
      {distributionMethod === 'link' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Shareable Link</h3>
          
          <div className="p-4 rounded-lg border border-border bg-muted/30">
            <Label className="text-sm font-medium mb-2 block">Questionnaire Link</Label>
            <div className="flex items-center gap-2">
              <Input
                value={questionnaireLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this link via email, social media, or embed it on your website
            </p>
          </div>

          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <Globe className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">Public Link</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Anyone with this link can access the questionnaire. Response tracking will be anonymous unless you collect identifying information in the questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section D: Response Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Response Settings</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 rounded-lg border border-border">
            <Checkbox
              id="anonymous"
              checked={anonymousResponses}
              onCheckedChange={(checked) => setAnonymousResponses(checked === true)}
            />
            <div className="flex-1">
              <Label htmlFor="anonymous" className="text-sm font-medium cursor-pointer">
                Anonymous Responses
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Respondent names and emails will not be stored with their answers
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg border border-border">
            <Checkbox
              id="multiple"
              checked={allowMultipleResponses}
              onCheckedChange={(checked) => setAllowMultipleResponses(checked === true)}
            />
            <div className="flex-1">
              <Label htmlFor="multiple" className="text-sm font-medium cursor-pointer">
                Allow Multiple Responses
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Recipients can submit the questionnaire more than once
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section E: Reminder Settings (only for email) */}
      {distributionMethod === 'email' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Reminder Settings</h3>
          
          <div className="flex items-start space-x-3 p-4 rounded-lg border border-border">
            <Checkbox
              id="reminders"
              checked={sendReminders}
              onCheckedChange={(checked) => setSendReminders(checked === true)}
            />
            <div className="flex-1">
              <Label htmlFor="reminders" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Send Automatic Reminders
              </Label>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Automatically remind recipients who haven't responded
              </p>
              
              {sendReminders && (
                <div className="space-y-2">
                  <Label htmlFor="reminder-days" className="text-xs">
                    Send reminder after
                  </Label>
                  <div className="flex items-center gap-2">
                    <Select value={reminderDays} onValueChange={setReminderDays}>
                      <SelectTrigger id="reminder-days" className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="2">2 days</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="5">5 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">of no response</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section F: Summary */}
      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">Distribution Summary</p>
            <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
              <li>• Method: {distributionMethod === 'email' ? 'Email Distribution' : 'Shareable Link'}</li>
              <li>• Anonymous: {anonymousResponses ? 'Yes' : 'No'}</li>
              <li>• Multiple responses: {allowMultipleResponses ? 'Allowed' : 'Not allowed'}</li>
              {distributionMethod === 'email' && (
                <li>• Reminders: {sendReminders ? `After ${reminderDays} days` : 'Disabled'}</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button variant="outline" onClick={() => {
          handleContinue();
          toast.success('Settings saved');
        }}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button className="flex-1" onClick={handleContinue}>
          Continue to Recipients
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}