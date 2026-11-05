import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, User, Activity, Flame, Shield, RotateCcw, Download, Check } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  onResetAllData: () => void;
}

export const ProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetAllData,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    onUpdateProfile(formData);
    setShowSavedMsg(true);
    setTimeout(() => {
      setShowSavedMsg(false);
      onClose();
    }, 1200);
  };

  const exportData = () => {
    sounds.playClick();
    const data = {
      profile,
      logs: localStorage.getItem('fatloss_daily_logs_v1'),
      weightHistory: localStorage.getItem('fatloss_weight_history_v1'),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fatloss-plan-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="glass-panel w-full sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar rounded-t-3xl sm:rounded-3xl p-6 border border-white/10 space-y-5 animate-in slide-in-from-bottom-8 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Profil & Target Personal</h3>
              <p className="text-[11px] text-slate-400">Parameter Fat Loss 7-Day Plan</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Metrics Snapshot */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">BMI</span>
            <div className="text-base font-black text-emerald-400 mt-0.5">{profile.bmi}</div>
            <span className="text-[9px] text-slate-500">Normal Range</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">BMR Basal</span>
            <div className="text-base font-black text-white mt-0.5">~{profile.bmr}</div>
            <span className="text-[9px] text-slate-500">kkal/hari</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Maintenance</span>
            <div className="text-base font-black text-amber-400 mt-0.5">~{profile.maintenanceCalories}</div>
            <span className="text-[9px] text-slate-500">kkal/hari</span>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400">Usia (Tahun)</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 23 })}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400">Tinggi (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 176 })}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400">Berat Awal (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 70.0 })}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400">Target Defisit (kkal)</label>
              <input
                type="number"
                value={formData.targetCalories}
                onChange={(e) => setFormData({ ...formData, targetCalories: parseInt(e.target.value) || 2200 })}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Macro Targets */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-300">Target Makronutrisi Harian:</span>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <span className="text-[10px] text-red-400">Protein (g)</span>
                <input
                  type="number"
                  value={formData.targetProtein}
                  onChange={(e) => setFormData({ ...formData, targetProtein: parseInt(e.target.value) || 140 })}
                  className="w-full mt-0.5 px-2 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <span className="text-[10px] text-amber-400">Karbo (g)</span>
                <input
                  type="number"
                  value={formData.targetCarbs}
                  onChange={(e) => setFormData({ ...formData, targetCarbs: parseInt(e.target.value) || 255 })}
                  className="w-full mt-0.5 px-2 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <span className="text-[10px] text-sky-400">Lemak (g)</span>
                <input
                  type="number"
                  value={formData.targetFat}
                  onChange={(e) => setFormData({ ...formData, targetFat: parseInt(e.target.value) || 68 })}
                  className="w-full mt-0.5 px-2 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400">Serat (g)</span>
                <input
                  type="number"
                  value={formData.targetFiber}
                  onChange={(e) => setFormData({ ...formData, targetFiber: parseInt(e.target.value) || 30 })}
                  className="w-full mt-0.5 px-2 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 active:scale-95 transition-transform"
          >
            <span>Simpan Perubahan</span>
          </button>
        </form>

        {showSavedMsg && (
          <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-xs text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" /> Profil Berhasil Disimpan!
          </div>
        )}

        {/* Data Tools */}
        <div className="pt-2 border-t border-white/5 space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={exportData}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup Data JSON</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset semua catatan latihan dan makanan ke default?')) {
                  sounds.playClick();
                  onResetAllData();
                  onClose();
                }
              }}
              className="py-2 px-3 rounded-xl bg-red-950/40 border border-red-500/20 hover:bg-red-900/50 text-red-300 text-xs font-medium flex items-center justify-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
