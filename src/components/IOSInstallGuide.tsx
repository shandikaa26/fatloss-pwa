import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X, Smartphone, ArrowDown } from 'lucide-react';
import { sounds } from '../utils/audio';

export const IOSInstallGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already launched in standalone PWA mode
    const inStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(!!inStandalone);

    const dismissed = localStorage.getItem('fatloss_ios_guide_dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  if (isStandalone || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom iOS Banner */}
      <div className="fixed bottom-20 left-4 right-4 z-40 animate-in slide-in-from-bottom-5 duration-500">
        <div className="glass-panel rounded-2xl p-3.5 border border-emerald-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-emerald-950/80 shadow-2xl backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-md flex-shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Pasang di iPhone (PWA)</span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] rounded font-semibold">
                  Full Screen
                </span>
              </h4>
              <p className="text-[11px] text-slate-300">
                Akses cepat dari Home Screen seperti aplikasi native Apple.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 ml-2">
            <button
              onClick={() => {
                sounds.playClick();
                setIsOpen(true);
              }}
              className="px-2.5 py-1.5 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold active:scale-95 shadow-md flex-shrink-0"
            >
              Cara Pasang
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setIsDismissed(true);
                localStorage.setItem('fatloss_ios_guide_dismissed', 'true');
              }}
              className="w-7 h-7 rounded-lg text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Step-by-Step Instruction Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="glass-panel w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 border border-white/10 space-y-5 animate-in slide-in-from-bottom-10 duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Instalasi iOS Home Screen</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Step 1 */}
              <div className="flex items-start space-x-3 bg-slate-900/60 p-3 rounded-2xl border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-200">
                    <span>Tekan tombol Berbagi (Share)</span>
                    <Share className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Buka situs ini di browser Safari iPhone, lalu tekan ikon kotak panah ke atas di bagian bawah layar Safari.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-3 bg-slate-900/60 p-3 rounded-2xl border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-200">
                    <span>Pilih "Add to Home Screen"</span>
                    <PlusSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Gulir menu ke bawah lalu pilih opsi <strong>"Tambah ke Layar Utama" (Add to Home Screen)</strong>.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-3 bg-slate-900/60 p-3 rounded-2xl border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-200">Tekan "Tambah" (Add) di Kanan Atas</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Ikon aplikasi <strong>7-Day Fit</strong> akan muncul di homescreen iOS-mu dan berjalan mulus tanpa browser URL bar!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setIsOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs active:scale-95 transition-transform"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
};
