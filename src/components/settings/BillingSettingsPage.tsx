import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  CheckCircle2,
  CreditCard,
  Download,
  Plus,
  Edit,
  Trash2,
  User,
  Mail,
  Building,
  Briefcase,
  Shield,
  Info,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SettingsNavigationItem {
  id: string;
  label: string;
  icon: any;
}

interface BillingSettingsPageProps {
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

type BillingCycle = 'monthly' | 'yearly';

interface Plan {
  id: string;
  name: string;
  price: number | 'custom';
  yearlyPrice?: number;
  features: string[];
  popular?: boolean;
}

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    yearlyPrice: 23,
    features: [
      'Up to 3 team members',
      '500 AI generations/month',
      '2 research studies/month',
      '5GB storage',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    yearlyPrice: 79,
    popular: true,
    features: [
      'Up to 10 team members',
      '1,000 AI generations/month',
      '5 research studies/month',
      '10GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'custom',
    features: [
      'Unlimited team members',
      'Unlimited AI generations',
      'Unlimited research studies',
      'Unlimited storage',
      '24/7 dedicated support',
      'Advanced security',
      'Custom integrations',
      'SLA guarantee',
    ],
  },
];

const mockInvoices: Invoice[] = [
  {
    id: 'INV-2026-001',
    date: '2026-01-15',
    description: 'Professional Plan - January 2026',
    amount: 99,
    status: 'paid',
  },
  {
    id: 'INV-2025-012',
    date: '2025-12-15',
    description: 'Professional Plan - December 2025',
    amount: 99,
    status: 'paid',
  },
  {
    id: 'INV-2025-011',
    date: '2025-11-15',
    description: 'Professional Plan - November 2025',
    amount: 99,
    status: 'paid',
  },
  {
    id: 'INV-2025-010',
    date: '2025-10-15',
    description: 'Professional Plan - October 2025',
    amount: 99,
    status: 'paid',
  },
];

export function BillingSettingsPage({
  activeSettingsSection = 'settings-billing',
  onNavigateToSettings,
}: BillingSettingsPageProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [currentPlanId] = useState('professional');
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpdatePaymentModal, setShowUpdatePaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const currentPlan = plans.find(p => p.id === currentPlanId);

  // Usage data
  const usage = {
    teamMembers: { current: 5, limit: 10 },
    aiGenerations: { current: 847, limit: 1000 },
    researchStudies: { current: 3, limit: 5 },
    storage: { current: 2.4, limit: 10 },
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return (current / limit) * 100;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 80) return 'bg-green-600 dark:bg-green-400';
    if (percentage < 95) return 'bg-amber-600 dark:bg-amber-400';
    return 'bg-red-600 dark:bg-red-400';
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const config = {
      paid: {
        label: 'Paid',
        className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      },
      pending: {
        label: 'Pending',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      },
      failed: {
        label: 'Failed',
        className: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      },
    };

    const { label, className } = config[status];
    return (
      <Badge className={cn('rounded-full text-xs', className)}>
        {label}
      </Badge>
    );
  };

  const formatPrice = (plan: Plan) => {
    if (plan.price === 'custom') return 'Contact Us';
    const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.price;
    return `$${price}/month`;
  };

  const handleChangePlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowChangePlanModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="flex gap-8">
          {/* Settings Sidebar */}
          <div className="w-[200px] flex-shrink-0">
            <h2 className="text-xl font-semibold mb-6">Settings</h2>
            <nav className="space-y-1">
              {settingsNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSettingsSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigateToSettings?.(item.id)}
                    className={cn(
                      'w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2',
                      isActive
                        ? 'bg-muted font-semibold text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-semibold mb-2">Billing & Plans</h1>
              <p className="text-muted-foreground">Manage your subscription and payment methods</p>
            </div>

            {/* Current Plan Card */}
            {currentPlan && (
              <Card className="rounded-xl border p-6 bg-primary/5 dark:bg-primary/10">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Current Plan</p>
                    <h2 className="text-2xl font-semibold mb-2">{currentPlan.name}</h2>
                    <p className="text-xl mb-1">{formatPrice(currentPlan)}</p>
                    <p className="text-sm text-muted-foreground">Renews on Feb 15, 2026</p>
                  </div>

                  <div className="space-y-2">
                    {currentPlan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <Button variant="outline" onClick={() => setShowChangePlanModal(true)}>
                      Change Plan
                    </Button>
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Usage Section */}
            <Card className="rounded-xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Usage This Month</h2>
                <button className="text-sm text-primary hover:underline">
                  View Detailed Usage
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Team Members */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Team Members</span>
                    <span className="text-sm text-muted-foreground">
                      {usage.teamMembers.current}/{usage.teamMembers.limit}
                    </span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        getUsageColor(getUsagePercentage(usage.teamMembers.current, usage.teamMembers.limit))
                      )}
                      style={{ width: `${getUsagePercentage(usage.teamMembers.current, usage.teamMembers.limit)}%` }}
                    />
                  </div>
                </div>

                {/* AI Generations */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AI Generations</span>
                    <span className="text-sm text-muted-foreground">
                      {usage.aiGenerations.current}/{usage.aiGenerations.limit}
                    </span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        getUsageColor(getUsagePercentage(usage.aiGenerations.current, usage.aiGenerations.limit))
                      )}
                      style={{ width: `${getUsagePercentage(usage.aiGenerations.current, usage.aiGenerations.limit)}%` }}
                    />
                  </div>
                </div>

                {/* Research Studies */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Research Studies</span>
                    <span className="text-sm text-muted-foreground">
                      {usage.researchStudies.current}/{usage.researchStudies.limit}
                    </span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        getUsageColor(getUsagePercentage(usage.researchStudies.current, usage.researchStudies.limit))
                      )}
                      style={{ width: `${getUsagePercentage(usage.researchStudies.current, usage.researchStudies.limit)}%` }}
                    />
                  </div>
                </div>

                {/* Storage */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage</span>
                    <span className="text-sm text-muted-foreground">
                      {usage.storage.current}GB/{usage.storage.limit}GB
                    </span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        getUsageColor(getUsagePercentage(usage.storage.current, usage.storage.limit))
                      )}
                      style={{ width: `${getUsagePercentage(usage.storage.current, usage.storage.limit)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Available Plans Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Available Plans</h2>
                
                {/* Billing Cycle Toggle */}
                <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm transition-colors',
                      billingCycle === 'monthly'
                        ? 'bg-background font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm transition-colors',
                      billingCycle === 'yearly'
                        ? 'bg-background font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Yearly <span className="text-green-600 dark:text-green-400">(Save 20%)</span>
                  </button>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const isCurrent = plan.id === currentPlanId;
                  const isUpgrade = plan.id === 'enterprise' || (plan.id === 'professional' && currentPlanId === 'starter');
                  const isDowngrade = (plan.id === 'starter' && currentPlanId === 'professional');

                  return (
                    <Card
                      key={plan.id}
                      className={cn(
                        'rounded-xl border p-6 relative',
                        isCurrent && 'border-primary shadow-lg'
                      )}
                    >
                      {plan.popular && !isCurrent && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground">
                          Most Popular
                        </Badge>
                      )}

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                          <div className="mb-4">
                            {plan.price === 'custom' ? (
                              <p className="text-3xl font-semibold">Contact Us</p>
                            ) : (
                              <>
                                <p className="text-3xl font-semibold">
                                  ${billingCycle === 'yearly' ? plan.yearlyPrice : plan.price}
                                </p>
                                <p className="text-sm text-muted-foreground">/month per user</p>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div>
                          {isCurrent ? (
                            <>
                              <Badge className="w-full justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 py-2">
                                Current Plan
                              </Badge>
                            </>
                          ) : isUpgrade ? (
                            <Button
                              className="w-full"
                              onClick={() => handleChangePlan(plan)}
                            >
                              Upgrade
                            </Button>
                          ) : isDowngrade ? (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => handleChangePlan(plan)}
                            >
                              Downgrade
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => handleChangePlan(plan)}
                            >
                              Select Plan
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Payment Method Section */}
            <Card className="rounded-xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <Button variant="outline" size="sm" onClick={() => setShowUpdatePaymentModal(true)}>
                  Update Payment Method
                </Button>
              </div>

              {/* Current Card */}
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">•••• •••• •••• 4242</p>
                      <Badge className="rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        Default
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Expires 12/26</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <button className="text-sm text-primary hover:underline mt-4">
                Add Payment Method
              </button>
            </Card>

            {/* Billing History Section */}
            <Card className="rounded-xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Billing History</h2>
                <button className="text-sm text-primary hover:underline">
                  View All Invoices
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b last:border-0">
                        <td className="py-3 px-4 text-sm">
                          {new Date(invoice.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-3 px-4 text-sm">{invoice.description}</td>
                        <td className="py-3 px-4 text-sm font-semibold">${invoice.amount}</td>
                        <td className="py-3 px-4">{getStatusBadge(invoice.status)}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Change Plan Modal */}
      <Dialog open={showChangePlanModal} onOpenChange={setShowChangePlanModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Plan</DialogTitle>
            <DialogDescription>
              {selectedPlan && selectedPlan.id === 'enterprise'
                ? "Contact our sales team to discuss Enterprise plan options."
                : `You're about to change to the ${selectedPlan?.name} plan.`}
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && selectedPlan.id !== 'enterprise' && (
            <div className="py-4 space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">New Plan</span>
                  <span className="text-lg font-semibold">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Cost</span>
                  <span className="text-lg font-semibold">{formatPrice(selectedPlan)}</span>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    Changes will take effect immediately. You'll be charged a prorated amount for the remainder of this billing period.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePlanModal(false)}>
              Cancel
            </Button>
            {selectedPlan?.id === 'enterprise' ? (
              <Button>Contact Sales</Button>
            ) : (
              <Button onClick={() => setShowChangePlanModal(false)}>
                Confirm Change
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Modal */}
      <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400">Cancel Subscription</DialogTitle>
            <DialogDescription>
              We're sorry to see you go. Your subscription will remain active until the end of your current billing period.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
              <p className="text-sm font-medium mb-2">You will lose access to:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>All premium features</li>
                <li>Team collaboration tools</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              Your subscription will remain active until <span className="font-semibold">Feb 15, 2026</span>. After that, your account will be downgraded to the free plan.
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelModal(false)}>
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={() => setShowCancelModal(false)}
            >
              Cancel Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Payment Method Modal */}
      <Dialog open={showUpdatePaymentModal} onOpenChange={setShowUpdatePaymentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
            <DialogDescription>
              Add or update your payment information
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-muted-foreground text-center">
              Payment form would be integrated here with a payment provider like Stripe.
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdatePaymentModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowUpdatePaymentModal(false)}>
              Save Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
