import React, { useState } from 'react';
import { X, Share2, Copy, Twitter, Facebook, MessageCircle, Link2, Check, Download } from 'lucide-react';
import type { Bet } from '../../types';
import { useToast } from './Toast';
import { formatOdds, formatCurrency } from '../../utils/bettingCalculations';

interface ShareBetModalProps {
  isOpen: boolean;
  onClose: () => void;
  bet: Bet;
  userName?: string;
}

const ShareBetModal: React.FC<ShareBetModalProps> = ({ isOpen, onClose, bet, userName = 'SharpBet Pro User' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const shareUrl = `https://sharpbet.pro/bet/${bet.id}`;
  const shareText = `${bet.pick} ${formatOdds(bet.odds)} - ${bet.event}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    showToast('success', 'Link Copied!', 'Share link copied to clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopySlip = () => {
    const slipText = `
🎯 BET SLIP

Event: ${bet.event}
Pick: ${bet.pick}
Odds: ${formatOdds(bet.odds)}
Stake: ${formatCurrency(bet.stake)}
To Win: ${formatCurrency(bet.potentialWin - bet.stake)}
${bet.notes ? `\nNotes: ${bet.notes}` : ''}

Via SharpBet Pro 🚀
    `.trim();

    navigator.clipboard.writeText(slipText);
    showToast('success', 'Bet Slip Copied!', 'Full bet details copied to clipboard');
  };

  const handleTwitterShare = () => {
    const twitterText = `${shareText}\n\nStake: ${formatCurrency(bet.stake)} | To Win: ${formatCurrency(bet.potentialWin - bet.stake)}\n\n#SportsBetting #SharpBetPro`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    showToast('info', 'Opening Twitter', 'Share your bet on Twitter');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
    showToast('info', 'Opening Facebook', 'Share your bet on Facebook');
  };

  const handleDownloadImage = () => {
    showToast('info', 'Coming Soon', 'Bet slip image download will be available soon!');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Share2 className="h-5 w-5 text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark-100">Share Your Bet</h2>
              <p className="text-xs text-dark-400 mt-0.5">
                Let others tail your winning picks
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
            <X className="h-5 w-5 text-dark-400" />
          </button>
        </div>

        {/* Bet Preview Card */}
        <div className="p-6">
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 mb-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs text-dark-400 uppercase mb-1">{bet.sportType}</div>
                <h3 className="text-lg font-bold text-dark-100 mb-1">{bet.event}</h3>
                <p className="text-sm text-primary-400 font-bold">{bet.pick}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gold-400">{formatOdds(bet.odds)}</div>
                <div className="text-xs text-dark-400">{bet.sportsbook}</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-dark-800 text-sm">
              <div>
                <span className="text-dark-400">Stake: </span>
                <span className="text-dark-200 font-bold">{formatCurrency(bet.stake)}</span>
              </div>
              <div>
                <span className="text-dark-400">To Win: </span>
                <span className="text-primary-400 font-bold">{formatCurrency(bet.potentialWin - bet.stake)}</span>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between p-4 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 rounded-lg transition-all group"
            >
              <div className="flex items-center space-x-3">
                {isCopied ? (
                  <Check className="h-5 w-5 text-primary-400" />
                ) : (
                  <Link2 className="h-5 w-5 text-dark-400 group-hover:text-primary-400" />
                )}
                <div className="text-left">
                  <div className="text-sm font-medium text-dark-100">Copy Share Link</div>
                  <div className="text-xs text-dark-500">
                    {isCopied ? 'Link copied!' : 'Share anywhere'}
                  </div>
                </div>
              </div>
            </button>

            {/* Copy Slip */}
            <button
              onClick={handleCopySlip}
              className="w-full flex items-center justify-between p-4 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 rounded-lg transition-all group"
            >
              <div className="flex items-center space-x-3">
                <Copy className="h-5 w-5 text-dark-400 group-hover:text-primary-400" />
                <div className="text-left">
                  <div className="text-sm font-medium text-dark-100">Copy Bet Slip</div>
                  <div className="text-xs text-dark-500">Full details as text</div>
                </div>
              </div>
            </button>

            {/* Social Media */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleTwitterShare}
                className="flex items-center justify-center space-x-2 p-3 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 border border-[#1DA1F2]/50 rounded-lg transition-all"
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                <span className="text-sm font-medium text-[#1DA1F2]">Twitter</span>
              </button>
              <button
                onClick={handleFacebookShare}
                className="flex items-center justify-center space-x-2 p-3 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border border-[#1877F2]/50 rounded-lg transition-all"
              >
                <Facebook className="h-5 w-5 text-[#1877F2]" />
                <span className="text-sm font-medium text-[#1877F2]">Facebook</span>
              </button>
            </div>

            {/* Download Image */}
            <button
              onClick={handleDownloadImage}
              className="w-full flex items-center justify-center space-x-2 p-4 bg-gold-gradient hover:shadow-glow-gold rounded-lg transition-all font-bold text-dark-900"
            >
              <Download className="h-5 w-5" />
              <span>Download Bet Slip Image</span>
            </button>
          </div>

          {/* Stats Preview */}
          <div className="mt-6 p-4 bg-primary-900/20 border border-primary-800/30 rounded-lg">
            <div className="text-xs text-dark-400 mb-2">Shared by</div>
            <div className="text-sm font-bold text-dark-100">{userName}</div>
            <div className="text-xs text-primary-400 mt-1">
              Track record available on profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareBetModal;
