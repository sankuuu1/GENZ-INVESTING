import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { MarketAsset } from '../../types';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

interface PracticeTradeModalProps {
  asset: MarketAsset;
  onClose: () => void;
}

export const PracticeTradeModal: React.FC<PracticeTradeModalProps> = ({ asset, onClose }) => {
  const { practiceBalance, executePracticeTrade, practiceHoldings } = useApp();
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [units, setUnits] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentHolding = practiceHoldings.find(h => h.symbol === asset.symbol);
  const holdingUnits = currentHolding ? currentHolding.units : 0;
  const totalCost = units * asset.price;

  const handleExecute = () => {
    setErrorMsg('');
    if (tradeType === 'BUY' && totalCost > practiceBalance) {
      setErrorMsg(`Insufficient simulated balance. You need ₹${totalCost.toFixed(2)}.`);
      sound.playCaution();
      return;
    }
    if (tradeType === 'SELL' && units > holdingUnits) {
      setErrorMsg(`You only have ${holdingUnits} simulated units available.`);
      sound.playCaution();
      return;
    }

    const ok = executePracticeTrade(asset, units, tradeType === 'BUY');
    if (ok) {
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[420px] bg-white rounded-t-3xl border-t border-gray-100 p-5 shadow-2xl text-gray-900 space-y-3.5 animate-slide-up">
        {/* Handle bar */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-2" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              PRACTICE SANDBOX
            </span>
            <span className="text-xs text-gray-500">Virtual ₹10k Money</span>
          </div>
          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">{asset.name}</h3>
            <span className="text-xs text-gray-500">{asset.symbol} · {asset.category}</span>
          </div>
          <div className="text-right">
            <div className="text-base font-mono font-bold text-gray-900">₹{asset.price.toFixed(2)}</div>
            <div className={`text-xs font-mono font-semibold ${asset.changePercent >= 0 ? 'text-[#00D09C]' : 'text-[#EB5757]'}`}>
              {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#00D09C] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-900">Simulated Order Placed!</p>
            <p className="text-xs text-gray-500">
              {tradeType === 'BUY' ? `Added ${units} virtual units to practice holdings.` : `Sold ${units} virtual units.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => {
                  sound.playTap();
                  setTradeType('BUY');
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tradeType === 'BUY' ? 'bg-[#00D09C] text-white shadow-xs' : 'text-gray-500'
                }`}
              >
                Buy (Simulated)
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  setTradeType('SELL');
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tradeType === 'SELL' ? 'bg-[#EB5757] text-white shadow-xs' : 'text-gray-500'
                }`}
              >
                Sell (Simulated)
              </button>
            </div>

            {/* Units selector */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Quantity</span>
                <span>{tradeType === 'BUY' ? `Virtual Cash: ₹${practiceBalance.toFixed(0)}` : `Held: ${holdingUnits} units`}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playTap();
                    setUnits(prev => Math.max(1, prev - 1));
                  }}
                  className="w-10 h-10 rounded-xl bg-gray-100 text-lg font-bold text-gray-700 hover:bg-gray-200"
                >
                  -
                </button>
                <div className="flex-1 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center font-mono font-bold text-gray-900 text-base">
                  {units}
                </div>
                <button
                  onClick={() => {
                    sound.playTap();
                    setUnits(prev => prev + 1);
                  }}
                  className="w-10 h-10 rounded-xl bg-gray-100 text-lg font-bold text-gray-700 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Cost Math */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Order Value:</span>
                <span className="font-mono font-bold text-gray-900">₹{totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Brokerage:</span>
                <span className="font-mono text-[#00D09C]">₹0 (Free Practice)</span>
              </div>
              <div className="border-t border-gray-200 pt-1 flex justify-between font-bold text-gray-800">
                <span>Remaining Virtual Cash:</span>
                <span className="font-mono text-emerald-700">
                  ₹{(tradeType === 'BUY' ? practiceBalance - totalCost : practiceBalance + totalCost).toFixed(2)}
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleExecute}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-colors shadow-xs ${
                tradeType === 'BUY'
                  ? 'bg-[#00D09C] hover:bg-[#00B386] text-white'
                  : 'bg-[#EB5757] hover:bg-red-600 text-white'
              }`}
            >
              Confirm Simulated {tradeType === 'BUY' ? 'Purchase' : 'Sale'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
