import React from 'react';

const TOP_CHASSIS_BRANDS = [
  { id: 'specialized', label: 'Specialized' },
  { id: 'trek', label: 'Trek Bicycles' },
  { id: 'santacruz', label: 'Santa Cruz Bicycles' },
  { id: 'yeti', label: 'Yeti Cycles' },
  { id: 'canyon', label: 'Canyon Bicycles' },
  { id: 'pivot', label: 'Pivot Cycles' },
  { id: 'giant', label: 'Giant Bicycles' },
  { id: 'rocky', label: 'Rocky Mountain' },
  { id: 'ibis', label: 'Ibis Cycles' },
  { id: 'commencal', label: 'Commencal' },
  { id: 'transition', label: 'Transition Bikes' },
  { id: 'evil', label: 'Evil Bike Co.' },
  { id: 'norco', label: 'Norco Bicycles' },
  { id: 'mondraker', label: 'Mondraker' },
  { id: 'scott', label: 'Scott Sports' }
];

const PREMIUM_FORKS = [
  { id: 'fox34', label: 'Fox 34 Factory (Trail)' },
  { id: 'pike', label: 'RockShox Pike Ultimate (Trail)' },
  { id: 'fox36', label: 'Fox 36 Factory Grip2 (All-Mountain)' },
  { id: 'lyrik', label: 'RockShox Lyrik Ultimate (All-Mountain)' },
  { id: 'fox38', label: 'Fox 38 Factory Grip2 (Enduro)' },
  { id: 'zeb', label: 'RockShox ZEB Ultimate (Enduro)' },
  { id: 'ohlins38', label: 'Öhlins RXF38 m.2 (Enduro)' },
  { id: 'fox40', label: 'Fox 40 Factory Grip2 (Downhill)' },
  { id: 'boxxer', label: 'RockShox BoXXer Ultimate (Downhill)' }
];

export default function ConfigureSpecsCard({
  name, setName,
  weight, setWeight,
  ridingStyle, setRidingStyle,
  forkType, setForkType,
  shockType, setShockType,
  error, onCalculate
}) {
  const adjustWeight = (amount) => {
    setWeight(prev => {
      const current = parseFloat(prev) || 0;
      return Math.max(0, current + amount).toString();
    });
  };

  const selectStyleClasses = "w-full bg-[#090d16] border border-white/[0.05] rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-portfolio-accent text-white cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300e5ff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[position:right_16px_center] bg-no-repeat";
  const optionStyleClasses = "bg-[#111823] text-slate-100 py-2";

  return (
    <div className="md:col-span-5 flex flex-col justify-start gap-4 w-full relative">
      <h3 className="m-0 text-[1.4rem] font-bold text-white mt-4 md:mt-0">1. Build Your Setup</h3>
      <div className="bg-[#111823] p-6 rounded-[16px] shadow-elevated-card border border-white/[0.01] w-full box-border hover:bg-[#141e2e] transition-colors duration-250 flex-grow flex flex-col justify-between">
        <form onSubmit={onCalculate} className="space-y-4 h-full flex flex-col justify-between flex-grow">
          <div className="space-y-4 flex-grow">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold font-mono text-secondary mb-1">Bike Brand Chassis</label>
              <select value={name} onChange={(e) => setName(e.target.value)} className={selectStyleClasses}>
                {TOP_CHASSIS_BRANDS.map(brand => (
                  <option key={brand.id} value={brand.id} className={optionStyleClasses}>{brand.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold font-mono text-secondary mb-1">Front Fork Suspension</label>
              <select value={forkType} onChange={(e) => setForkType(e.target.value)} className={selectStyleClasses}>
                {PREMIUM_FORKS.map(fork => (
                  <option key={fork.id} value={fork.id} className={optionStyleClasses}>{fork.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold font-mono text-secondary mb-1">Rear Shock Damper</label>
              <select value={shockType} onChange={(e) => setShockType(e.target.value)} className={selectStyleClasses}>
                <option value="air" className={optionStyleClasses}>Air Shock (Progressive)</option>
                <option value="coil" className={optionStyleClasses}>Coil Shock (Linear)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold font-mono text-secondary mb-1">Rider Weight (lbs)</label>
              <div className="flex items-center bg-[#090d16] border border-white/[0.05] rounded-xl overflow-hidden focus-within:border-portfolio-accent transition duration-150">
                <button type="button" onClick={() => adjustWeight(-5)} className="px-3 py-2.5 text-secondary hover:text-portfolio-accent font-bold hover:bg-white/5 transition duration-100 cursor-pointer select-none">－</button>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-transparent text-center py-2.5 focus:outline-none text-white font-medium" />
                <button type="button" onClick={() => adjustWeight(5)} className="px-3 py-2.5 text-secondary hover:text-portfolio-accent font-bold hover:bg-white/5 transition duration-100 cursor-pointer select-none">＋</button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold font-mono text-secondary mb-1">Terrain Style</label>
              <select value={ridingStyle} onChange={(e) => setRidingStyle(e.target.value)} className={selectStyleClasses}>
                <option value="casual" className={optionStyleClasses}>Casual / XC</option>
                <option value="balanced" className={optionStyleClasses}>Balanced / Trail</option>
                <option value="aggressive" className={optionStyleClasses}>Aggressive / Enduro</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex-shrink-0">{error}</p>}
          <button type="submit" className="w-full py-4 md:py-3 bg-portfolio-accent text-portfolio-bg border-0 rounded-[6px] text-[0.85rem] font-bold font-sans cursor-pointer transition-all duration-200 hover:bg-[#66efff] outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent/20 mt-4 flex-shrink-0">Compute Diagnostics</button>
        </form>
      </div>
    </div>
  );
}
