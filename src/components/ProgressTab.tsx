import React, { useState } from 'react';
import { WeightRecord, UserProfile } from '../types';
import { Scale, Ruler, TrendingDown, Info, Plus, Calendar, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  profile: UserProfile;
  weightHistory: WeightRecord[];
  onAddWeightRecord: (record: WeightRecord) => void;
}

export const ProgressTab: React.FC<Props> = ({
  profile,
  weightHistory,
  onAddWeightRecord,
}) => {
  const [weightInput, setWeightInput] = useState<string>('69.8');
  const [waistInput, setWaistInput] = useState<string>('77.5');
  const [dayLabel, setDayLabel] = useState<string>(`Hari ${Math.min(weightHistory.length + 1, 7)}`);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    const w = parseFloat(weightInput);
    const wst = waistInput ? parseFloat(waistInput) : undefined;
    if (isNaN(w)) return;

    onAddWeightRecord({
      date: dayLabel,
      weight: w,
      waist: wst,
    });

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2500);
  };

  // Calculate 7-day average
  const recentRecords = weightHistory.slice(-7);
  const averageWeight = (
    recentRecords.reduce((acc, curr) => acc + curr.weight, 0) / (recentRecords.length || 1)
  ).toFixed(2);

  const initialWeight = weightHistory[0]?.weight ?? profile.weight;
  const latestWeight = weightHistory[weightHistory.length - 1]?.weight ?? profile.weight;
  const totalChange = (latestWeight - initialWeight).toFixed(1);

  // SVG Chart points
  const minW = Math.min(...weightHistory.map((r) => r.weight)) - 0.5;
  const maxW = Math.max(...weightHistory.map((r) => r.weight)) + 0.5;
  const rangeW = maxW - minW || 1;

  const chartWidth = 320;
  const chartHeight = 120;
  const paddingX = 30;
  const paddingY = 20;

  const points = weightHistory.map((rec, idx) => {
    const x = paddingX + (idx / Math.max(weightHistory.length - 1, 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((rec.weight - minW) / rangeW) * (chartHeight - paddingY * 2);
    return { x, y, weight: rec.weight, label: rec.date };
  });

  const polylineStr = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="space-y-4 pb-20">
      {/* Header Card */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              Analisis Kemajuan
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Tren Rata-Rata Berat</h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Rata-Rata 7 Hari</span>
            <div className="text-xl font-black text-emerald-400">
              {averageWeight} <span className="text-xs font-normal text-slate-300">kg</span>
            </div>
          </div>
        </div>

        {/* Change Banner */}
        <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">Perubahan dari awal (70.0 kg):</span>
          </div>
          <span className={`font-bold ${parseFloat(totalChange) <= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {parseFloat(totalChange) > 0 ? `+${totalChange}` : totalChange} kg
          </span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200">Grafik Fluktuasi Harian vs Target</span>
          <span className="text-[11px] text-slate-400">Target laju: 0.25–0.5 kg/minggu</span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center py-2">
          <svg width={chartWidth} height={chartHeight} className="overflow-visible">
            {/* Horizontal Grid lines */}
            <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.08)" strokeDasharray="3" />
            <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="rgba(255,255,255,0.08)" strokeDasharray="3" />
            <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="rgba(255,255,255,0.08)" strokeDasharray="3" />

            {/* Line connecting points */}
            {points.length > 1 && (
              <polyline
                fill="none"
                stroke="url(#chartGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylineStr}
              />
            )}

            <defs>
              <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#10b981" />
                <stop offset="100%" stop-color="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Data Points */}
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="5" fill="#0b0f17" stroke="#10b981" strokeWidth="2.5" />
                <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                  {p.weight}
                </text>
                <text x={p.x} y={chartHeight - 4} textAnchor="middle" fill="#64748b" fontSize="9">
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Log New Weight & Waist Input Form */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center space-x-2">
          <Scale className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Catat Timbangan Pagi</h3>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Hari
              </label>
              <input
                type="text"
                value={dayLabel}
                onChange={(e) => setDayLabel(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                placeholder="Hari 2"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Berat (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                placeholder="69.8"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Pinggang (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={waistInput}
                onChange={(e) => setWaistInput(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                placeholder="77.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 active:scale-95 transition-transform shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Simpan Catatan Harian</span>
          </button>
        </form>

        {showSuccessToast && (
          <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center space-x-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Berhasil mencatat berat badan! Rata-rata 7 hari diperbarui.</span>
          </div>
        )}
      </div>

      {/* Realistic Expectations & Scientific Guide (From Page 3 of Plan) */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
        <div className="flex items-center space-x-2">
          <Info className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Apa yang Harus Diharapkan?</h3>
        </div>

        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            • Penurunan <strong>0.25–0.7 kg/minggu</strong> adalah laju standar yang sehat. Mengingat berat awalmu 70 kg dengan rentang BMI normal (22.6), penurunan di kisaran 0.25–0.4 kg/minggu jauh lebih ideal agar otot tetap utuh.
          </p>
          <p>
            • Dalam 7 hari pertama, perubahan angka timbangan seringkali berupa air dan sisa pencernaan. Pembakaran lemak sejati butuh <strong>konsistensi 2–3 minggu</strong>.
          </p>
          <p>
            • Jangan terobsesi dengan fluktuasi 1 hari (misal naik 0.3 kg karena makan asin malam sebelumnya). Fokus pada <em>7-day moving average</em> dan lingkar pinggang celanamu!
          </p>
        </div>
      </div>
    </div>
  );
};
