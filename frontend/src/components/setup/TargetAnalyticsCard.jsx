import React from 'react';
import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function TargetAnalyticsCard({ results, forkPsiOverride, setForkPsiOverride }) {
  const generateChartData = () => {
    if (!results) return [
      { name: 'Initial Sag', baseline: 0, stiffness: 0, damping: 0 },
      { name: 'Mid Stroke', baseline: 0, stiffness: 0, damping: 0 },
      { name: 'Bottom Out', baseline: 0, stiffness: 0, damping: 0 }
    ];
    const baseFork = results.forkPsi;
    const activeFork = forkPsiOverride || baseFork;
    return [
      { name: 'Initial Sag', baseline: Math.max(1, Math.round(baseFork * 0.4)), stiffness: Math.max(1, Math.round(activeFork * 0.4)), damping: results.lscClicks },
      { name: 'Mid Stroke', baseline: Math.max(1, Math.round(baseFork * 0.75)), stiffness: Math.max(1, Math.round(activeFork * 0.75)), damping: Math.round((results.lscClicks + results.hscClicks) / 2) },
      { name: 'Bottom Out', baseline: Math.max(1, Math.round(baseFork * 1.3)), stiffness: Math.max(1, Math.round(activeFork * 1.3)), damping: results.hscClicks }
    ];
  };

  const getSetupSummary = () => {
    if (!results) return 'System metrics uncalculated. Select variables inside configuration terminal and submit values to populate dynamic telemetry diagnostics.';
    let styleText = 'balanced stability across variable trail conditions';
    if (results.ridingStyle === 'aggressive') styleText = 'high-speed compliance and heavy-impact bottom-out resistance';
    if (results.ridingStyle === 'casual') styleText = 'maximum plushness and small-bump compliance for smoother cross-country terrain';
    
    let componentText = results.shockType === 'coil' 
      ? 'The linear nature of your coil shock provides predictable mid-stroke support.' 
      : 'Your air suspension curve features a progressive ramp-up near full travel.';

    return `Configured for ${styleText}. ${componentText} Damping clicks are measured outward from the closed position.`;
  };

  return (
    <div className="md:col-span-7 w-full flex flex-col justify-start gap-4 relative box-border">
      <h3 className="m-0 text-[1.4rem] font-bold text-white mt-4 md:mt-0">2. Target Analytics</h3>
      <div className="bg-[#111823] p-6 rounded-[16px] shadow-elevated-card border border-white/[0.01] flex flex-col justify-start w-full box-border hover:bg-[#141e2e] transition-colors duration-250 flex-grow gap-5 min-h-[420px]">
        <div className="flex flex-col gap-5 w-full box-border h-full justify-between flex-grow">
          <div className="w-full box-border">
            <div className="flex flex-col gap-0.5 border-b border-white/[0.04] pb-2 flex-shrink-0">
              <h4 className="text-[0.85rem] font-mono font-bold text-portfolio-accent uppercase tracking-wider m-0">// System Response</h4>
              <p className="text-base text-white uppercase font-bold tracking-widest mt-1 mb-0">{results ? results.name : 'UNASSIGNED'}</p>
            </div>
            
            <p className="text-xs text-secondary bg-[#090d16] border border-white/[0.03] p-4 rounded-xl leading-relaxed h-[85px] overflow-hidden mt-4 m-0 flex-shrink-0 font-sans">
              {getSetupSummary()}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full flex-grow content-center">
            <div className="lg:col-span-5 flex flex-col justify-center gap-4 w-full">
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-[#090d16] p-2 rounded-xl border border-white/[0.03] text-center flex flex-col justify-center items-center h-[82px] min-h-[82px] max-h-[82px] box-border">
                  <span className="block text-[10px] uppercase text-secondary font-bold tracking-wider leading-tight mb-1">Fork<br />Support</span>
                  <span className="text-sm font-extrabold text-white block leading-none w-full text-center">
                    {results ? `${forkPsiOverride || results.forkPsi} PSI` : '—'}
                  </span>
                </div>
                <div className="bg-[#090d16] p-2 rounded-xl border border-white/[0.03] text-center flex flex-col justify-center items-center h-[82px] min-h-[82px] max-h-[82px] box-border">
                  <span className="block text-[10px] uppercase text-secondary font-bold tracking-wider leading-tight mb-1">Shock<br />Rate</span>
                  <span className="text-sm font-extrabold text-white block leading-none w-full text-center">
                    {results ? (results.shockType === 'coil' ? `${results.shockPsi} lbs` : `${results.shockPsi} PSI`) : '—'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs w-full">
                <div className="bg-[#090d16] p-2 rounded-lg border border-white/[0.03]"><span className="block text-[9px] text-secondary uppercase font-bold">Rebound</span><span className="font-extrabold text-white mt-0.5 block">{results ? `${results.reboundClicks} C` : '—'}</span></div>
                <div className="bg-[#090d16] p-2 rounded-lg border border-white/[0.03]"><span className="block text-[9px] text-secondary uppercase font-bold">HSC</span><span className="font-extrabold text-white mt-0.5 block">{results ? `${results.hscClicks} C` : '—'}</span></div>
                <div className="bg-[#090d16] p-2 rounded-lg border border-white/[0.03]"><span className="block text-[9px] text-secondary uppercase font-bold">LSC</span><span className="font-extrabold text-white mt-0.5 block">{results ? `${results.lscClicks} C` : '—'}</span></div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center h-full w-full min-h-[160px] pt-2 lg:pt-0">
              <div className="w-full h-full min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={generateChartData()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCurvePro" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2333" opacity={0.4} />
                    <XAxis dataKey="name" stroke="#4a5568" fontSize={10} tickLine={false} />
                    <YAxis stroke="#4a5568" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1a2333', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="stiffness" stroke="#00e5ff" strokeWidth={3} fillOpacity={1} fill="url(#colorCurvePro)" name="Adjusted Force" />
                    <Line type="monotone" dataKey="baseline" stroke="#ffffff" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Original Base" activeDot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-[#090d16] border border-white/[0.04] p-3 rounded-xl space-y-1.5 w-full flex-shrink-0">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-secondary">Fine-Tune Pressure</span>
              <span className="text-portfolio-accent font-bold">{results ? `${forkPsiOverride || results.forkPsi} PSI` : '—'}</span>
            </div>
            <input 
              type="range" 
              min={Math.round((results?.forkPsi || 100) * 0.7)} 
              max={Math.round((results?.forkPsi || 100) * 1.3)} 
              value={(results ? (forkPsiOverride || results.forkPsi) : 100)} 
              disabled={!results}
              onChange={(e) => setForkPsiOverride(parseInt(e.target.value))} 
              className="w-full accent-portfolio-accent h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
