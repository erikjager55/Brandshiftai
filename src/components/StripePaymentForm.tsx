import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function StripePaymentForm({ amount, onSuccess, onCancel }: StripePaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? ' / ' + v.substring(2, 4) : '');
    }
    return v;
  };

  // Validate card number (Luhn algorithm)
  const validateCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  // Get card type
  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
    return '';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
      setError('');
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.replace(/\s|\//g, '').length <= 4) {
      setExpiry(formatted);
      setError('');
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCvc(value);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Please enter the cardholder name');
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setError('Please enter a valid card number');
      return;
    }

    const expiryParts = expiry.split(' / ');
    if (expiryParts.length !== 2) {
      setError('Please enter a valid expiry date (MM / YY)');
      return;
    }

    const month = parseInt(expiryParts[0], 10);
    const year = parseInt(expiryParts[1], 10);
    
    if (month < 1 || month > 12) {
      setError('Invalid expiry month');
      return;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setError('Card has expired');
      return;
    }

    if (cvc.length < 3) {
      setError('Please enter a valid CVC');
      return;
    }

    // Simulate payment processing
    setIsProcessing(true);

    try {
      // In production, this would call Stripe API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      onSuccess();
    } catch (err) {
      setError('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const cardType = getCardType(cardNumber);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Security Notice */}
      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <p className="text-xs text-blue-900 dark:text-blue-100">
          Your payment is secured with 256-bit SSL encryption
        </p>
      </div>

      {/* Card Number */}
      <div className="space-y-2">
        <Label htmlFor="cardNumber" className="text-sm font-medium">
          Card Number
        </Label>
        <div className="relative">
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="pl-10 pr-20"
            disabled={isProcessing}
          />
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          {cardType && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 dark:text-gray-400">
              {cardType}
            </div>
          )}
        </div>
      </div>

      {/* Name on Card */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Cardholder Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          disabled={isProcessing}
        />
      </div>

      {/* Expiry and CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry" className="text-sm font-medium">
            Expiry Date
          </Label>
          <Input
            id="expiry"
            type="text"
            placeholder="MM / YY"
            value={expiry}
            onChange={handleExpiryChange}
            disabled={isProcessing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc" className="text-sm font-medium">
            CVC
          </Label>
          <Input
            id="cvc"
            type="text"
            placeholder="123"
            value={cvc}
            onChange={handleCvcChange}
            disabled={isProcessing}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-xs text-red-900 dark:text-red-100">{error}</p>
        </motion.div>
      )}

      {/* Test Card Info */}
      <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-xs font-medium text-yellow-900 dark:text-yellow-100 mb-1">
          Test Mode - Use test card:
        </p>
        <p className="text-xs text-yellow-800 dark:text-yellow-200 font-mono">
          4242 4242 4242 4242 • Any future date • Any 3 digits
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="mr-2"
              >
                <CreditCard className="h-4 w-4" />
              </motion.div>
              Processing...
            </>
          ) : (
            <>
              Pay ${amount.toLocaleString()}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
