import React, { useState } from 'react';
import { X, Check, Sparkles, Crown, Zap, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useToast } from './Toast';

interface SubscriptionTierModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier?: 'free' | 'pro' | 'expert';
}

const SubscriptionTierModal: React.FC<SubscriptionTierModalProps> = ({
  isOpen,
  onClose,
  currentTier = 'free'
}) => {
  const [selectedTier, setSelectedTier] = useState<'free' | 'pro' | 'expert'>(currentTier);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const tiers = [
    {
      id: 'free' as const,
      name: 'Free',
      icon: Zap,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for casual bettors',
      features: [
        'Track up to 50 bets',
        'Basic analytics',
        'View public expert picks',
        'Line comparison (3 sportsbooks)',
        'Community access',
      ],
      limitations: [
        'Limited to 50 bets',
        'Basic features only',
        'No tailing',
      ],
      color: 'dark',
      borderColor: 'border-dark-700',
      bgColor: 'bg-dark-800/50',
      buttonClass: 'bg-dark-800 hover:bg-dark-700 text-dark-200',
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      icon: Sparkles,
      price: { monthly: 19.99, annual: 199.99 },
      description: 'For serious sports bettors',
      features: [
        'Unlimited bets',
        'Advanced analytics & insights',
        'AI pick recommendations',
        'Line comparison (all sportsbooks)',
        'Kelly Criterion calculator',
        'CLV tracking',
        'Arbitrage detector',
        'Tail up to 3 experts',
        'Priority support',
      ],
      popular: true,
      color: 'primary',
      borderColor: 'border-primary-700',
      bgColor: 'bg-primary-900/20',
      buttonClass: 'bg-primary-gradient hover:shadow-glow-green text-white',
    },
    {
      id: 'expert' as const,
      name: 'Expert',
      icon: Crown,
      price: { monthly: 49.99, annual: 499.99 },
      description: 'Monetize your betting expertise',
      features: [
        'Everything in Pro, plus:',
        'Sell your picks to followers',
        'Set custom commission rates',
        'Verified expert badge',
        'Analytics dashboard',
        'Earnings tracking & payouts',
        'Custom profile page',
        'Priority placement in marketplace',
        'Unlimited tailing',
        'White-glove support',
      ],
      color: 'gold',
      borderColor: 'border-gold-700',
      bgColor: 'bg-gold-900/20',
      buttonClass: 'bg-gold-gradient hover:shadow-glow-gold text-dark-900',
    },
  ];

  const handleSubscribe = () => {
    if (selectedTier === currentTier) {
      showToast('info', 'Already Subscribed', `You're already on the ${selectedTier} plan`);
      onClose();
      return;
    }

    if (selectedTier === 'free') {
      showToast('success', 'Downgraded', 'You've been downgraded to the Free plan');
    } else {
      showToast('success', 'Upgraded!', `Welcome to ${selectedTier.toUpperCase()}! 🎉`);
    }
    onClose();
  };

  const savings = (tier: typeof tiers[number]) => {
    const monthlyTotal = tier.price.monthly * 12;
    const annualPrice = tier.price.annual;
    const saved = monthlyTotal - annualPrice;
    return saved > 0 ? saved.toFixed(0) : 0;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl max-w-6xl w-full animate-scale-in my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <div>
            <h2 className="text-2xl font-bold text-dark-100">Choose Your Plan</h2>
            <p className="text-sm text-dark-400 mt-1">
              Upgrade to unlock advanced features and monetization
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
            <X className="h-5 w-5 text-dark-400" />
          </button>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-3 py-6 border-b border-dark-800">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-dark-100' : 'text-dark-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              billingCycle === 'annual' ? 'bg-primary-500' : 'bg-dark-700'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                billingCycle === 'annual' ? 'translate-x-7' : ''
              }`}
            ></div>
          </button>
          <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-dark-100' : 'text-dark-500'}`}>
            Annual
          </span>
          {billingCycle === 'annual' && (
            <span className="px-2 py-1 bg-primary-900/40 border border-primary-800/50 rounded text-xs font-bold text-primary-400">
              Save up to $100
            </span>
          )}
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {tiers.map((tier) => {
            const TierIcon = tier.icon;
            const isSelected = selectedTier === tier.id;
            const isCurrent = currentTier === tier.id;
            const price = billingCycle === 'monthly' ? tier.price.monthly : tier.price.annual;

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
                  isSelected
                    ? `${tier.borderColor} ${tier.bgColor} scale-[1.02]`
                    : 'border-dark-700 bg-dark-800/30 hover:border-dark-600'
                } ${tier.popular ? 'ring-2 ring-primary-500/50' : ''}`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-gradient rounded-full text-xs font-bold text-white">
                    MOST POPULAR
                  </div>
                )}

                {/* Current Badge */}
                {isCurrent && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-dark-800 border border-dark-700 rounded text-xs font-bold text-primary-400">
                    CURRENT
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg ${tier.bgColor} mb-4`}>
                  <TierIcon className={`h-6 w-6 text-${tier.color}-400`} />
                </div>

                {/* Name & Description */}
                <h3 className="text-xl font-bold text-dark-100 mb-1">{tier.name}</h3>
                <p className="text-sm text-dark-400 mb-4">{tier.description}</p>

                {/* Price */}
                <div className="mb-6">
                  {price === 0 ? (
                    <div className="text-3xl font-bold text-dark-100">Free</div>
                  ) : (
                    <>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-bold text-dark-100">${price}</span>
                        <span className="text-sm text-dark-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <div className="text-xs text-primary-400 mt-1">
                          Save ${savings(tier)} per year
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <Check className="h-4 w-4 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-dark-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations */}
                {tier.limitations && (
                  <ul className="space-y-2 mb-6 pt-4 border-t border-dark-800">
                    {tier.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs">
                        <X className="h-3 w-3 text-dark-600 flex-shrink-0 mt-0.5" />
                        <span className="text-dark-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all ${tier.buttonClass} ${
                    isSelected ? 'scale-105' : ''
                  }`}
                >
                  {isCurrent ? 'Current Plan' : isSelected ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 p-6 border-t border-dark-800 bg-dark-800/30">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-primary-400" />
              <div className="text-2xl font-bold text-dark-100">10,000+</div>
            </div>
            <div className="text-xs text-dark-400">Active Bettors</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary-400" />
              <div className="text-2xl font-bold text-dark-100">+15.2%</div>
            </div>
            <div className="text-xs text-dark-400">Avg User ROI</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BarChart3 className="h-5 w-5 text-primary-400" />
              <div className="text-2xl font-bold text-dark-100">$2.3M+</div>
            </div>
            <div className="text-xs text-dark-400">Tracked Winnings</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-dark-800">
          <p className="text-xs text-dark-500">
            Cancel anytime • Secure payments • 30-day money-back guarantee
          </p>
          <button
            onClick={handleSubscribe}
            disabled={selectedTier === currentTier}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              selectedTier === currentTier
                ? 'bg-dark-800 text-dark-500 cursor-not-allowed'
                : 'bg-primary-gradient hover:shadow-glow-green text-white hover:scale-105'
            }`}
          >
            {selectedTier === currentTier ? 'Current Plan' : 'Continue to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTierModal;
