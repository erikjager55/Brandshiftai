import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Send,
  Mail,
  CheckCircle2,
  Clock,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Copy,
  Eye,
  Download,
  XCircle,
  AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
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

interface QuestionnaireStep4CollectProps {
  questionnaire: any;
  onUpdate: (field: string, value: any) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function QuestionnaireStep4Collect({
  questionnaire,
  onUpdate,
  onContinue,
  onBack
}: QuestionnaireStep4CollectProps) {
  const [sendConfirmOpen, setSendConfirmOpen] = useState(false);
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);

  const recipients: Recipient[] = questionnaire.recipients || [];
  const isSent = questionnaire.status === 'collecting';
  const questionnaireLink = questionnaire.linkUrl || `https://brandshift.app/survey/${questionnaire.id}`;

  // Calculate stats
  const totalRecipients = recipients.length;
  const sentCount = recipients.filter(r => r.linkSent).length;
  const respondedCount = recipients.filter(r => r.responsesReceived).length;
  const pendingCount = sentCount - respondedCount;
  const responseRate = totalRecipients > 0 ? Math.round((respondedCount / totalRecipients) * 100) : 0;

  const handleSendQuestionnaire = () => {
    // Mark all recipients as sent
    const updatedRecipients = recipients.map((r: Recipient) => ({
      ...r,
      linkSent: true
    }));
    
    onUpdate('recipients', updatedRecipients);
    onUpdate('status', 'collecting');
    setSendConfirmOpen(false);
    toast.success(`Questionnaire sent to ${totalRecipients} recipients`);
  };

  const handleSendReminder = () => {
    const pendingRecipients = recipients.filter(r => r.linkSent && !r.responsesReceived);
    toast.success(`Reminder sent to ${pendingRecipients.length} recipients`);
  };

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

  const handleCloseQuestionnaire = () => {
    onUpdate('status', 'closed');
    setCloseConfirmOpen(false);
    toast.success('Questionnaire closed');
  };

  const handleContinue = () => {
    if (!isSent) {
      toast.error('Please send the questionnaire first');
      return;
    }
    if (respondedCount === 0) {
      toast.error('Wait for at least one response before analyzing');
      return;
    }
    
    // Move to analyze step and close survey
    onUpdate('status', 'closed');
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
        <h2 className="text-xl font-semibold mb-1">Collect Responses</h2>
        <p className="text-sm text-muted-foreground">
          {isSent ? 'Monitor responses and send reminders' : 'Send questionnaire to start collecting'}
        </p>
      </div>

      {/* Section A: Send/Status */}
      {!isSent ? (
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">Ready to Send</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {questionnaire.distributionMethod === 'email'
                  ? `Send email invitations to ${totalRecipients} recipients`
                  : 'Generate and share your questionnaire link'}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{questionnaire.questions?.length || 0} questions configured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{totalRecipients} recipients added</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Distribution settings configured</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {questionnaire.distributionMethod === 'email' ? (
                  <Button onClick={() => setSendConfirmOpen(true)}>
                    <Send className="h-4 w-4 mr-2" />
                    Send to All Recipients
                  </Button>
                ) : (
                  <Button onClick={handleCopyLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Shareable Link
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Section B: Response Stats */}
          <div className="rounded-xl bg-muted/30 p-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - responseRate / 100)}`}
                      className="text-primary transition-all"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold">{responseRate}%</span>
                  </div>
                </div>
                <div className="text-sm font-medium">Response Rate</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-semibold mb-1">{respondedCount}</div>
                <div className="text-sm text-muted-foreground mb-1">Responded</div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Complete
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-semibold mb-1">{pendingCount}</div>
                <div className="text-sm text-muted-foreground mb-1">Pending</div>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  <Clock className="h-3 w-3 mr-1" />
                  Waiting
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-semibold mb-1">{totalRecipients}</div>
                <div className="text-sm text-muted-foreground mb-1">Total</div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  <Users className="h-3 w-3 mr-1" />
                  Recipients
                </Badge>
              </div>
            </div>
          </div>

          {/* Section C: Actions */}
          <div className="grid grid-cols-2 gap-3">
            {questionnaire.distributionMethod === 'email' && pendingCount > 0 && (
              <Button variant="outline" onClick={handleSendReminder}>
                <Mail className="h-4 w-4 mr-2" />
                Send Reminder ({pendingCount})
              </Button>
            )}
            <Button variant="outline" onClick={() => {
              toast.success('Data refreshed');
            }}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" onClick={() => {
              toast.success('Preview opened');
            }}>
              <Eye className="h-4 w-4 mr-2" />
              Preview Survey
            </Button>
          </div>

          {/* Section D: Recipients List */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Recipient Status</h3>
            
            {recipients.length > 0 ? (
              <div className="space-y-2">
                {recipients.map((recipient: Recipient) => (
                  <div
                    key={recipient.id}
                    className="p-3 rounded-lg border border-border bg-card"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">{recipient.name}</p>
                          {recipient.responsesReceived ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs h-5">
                              <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                              Responded
                            </Badge>
                          ) : recipient.linkSent ? (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 text-xs h-5">
                              <Clock className="h-2.5 w-2.5 mr-1" />
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs h-5">
                              Not Sent
                            </Badge>
                          )}
                          <Badge variant="secondary" className={`text-xs h-5 ${getGroupColor(recipient.group)}`}>
                            {recipient.group}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{recipient.email}</span>
                          {recipient.responseDate && (
                            <>
                              <span>•</span>
                              <span>Responded {recipient.responseDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                      {recipient.linkSent && !recipient.responsesReceived && (
                        <Button variant="ghost" size="sm" onClick={handleSendReminder}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <Users className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No recipients added</p>
              </div>
            )}
          </div>

          {/* Section E: Close Survey */}
          {respondedCount > 0 && (
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Ready to analyze?
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                    You have {respondedCount} {respondedCount === 1 ? 'response' : 'responses'}. 
                    You can close the survey and move to analysis, or keep collecting more responses.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCloseConfirmOpen(true)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Close Survey & Analyze
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        {isSent && respondedCount > 0 && (
          <Button className="flex-1" onClick={handleContinue}>
            Continue to Analysis
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Send Confirmation Modal */}
      <Dialog open={sendConfirmOpen} onOpenChange={setSendConfirmOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Send Questionnaire?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              This will send email invitations to all {totalRecipients} recipients
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4">
            <div className="space-y-3 p-4 rounded-lg bg-muted/50 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Recipients:</span>
                <span className="font-semibold">{totalRecipients}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Questions:</span>
                <span className="font-semibold">{questionnaire.questions?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Distribution:</span>
                <span className="font-semibold capitalize">{questionnaire.distributionMethod}</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">Note</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Once sent, you cannot edit questions. You can still add more recipients later.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSendConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendQuestionnaire}>
              <Send className="h-4 w-4 mr-2" />
              Send Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Confirmation Modal */}
      <Dialog open={closeConfirmOpen} onOpenChange={setCloseConfirmOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-semibold">Close Survey?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              This will stop accepting new responses and move to analysis
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4">
            <div className="space-y-3 p-4 rounded-lg bg-muted/50 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total responses:</span>
                <span className="font-semibold">{respondedCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response rate:</span>
                <span className="font-semibold">{responseRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pending:</span>
                <span className="font-semibold">{pendingCount}</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">Warning</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Closing the survey will prevent new responses. You can reopen it later if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setCloseConfirmOpen(false)}>
              Keep Collecting
            </Button>
            <Button onClick={handleCloseQuestionnaire}>
              <XCircle className="h-4 w-4 mr-2" />
              Close Survey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}