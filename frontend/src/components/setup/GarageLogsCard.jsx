import React from 'react';

export default function GarageLogsCard({ savedBikes, onSelect, onDelete }) {
  return (
    <div className="w-full bg-[#111823]/40 p-6 rounded-2xl shadow-elevated-card mt-0 mb-0 text-left box-border">
      <h3 className="text-xs font-mono font-bold text-secondary mb-4 tracking-wide uppercase m-0">// Persistent Storage Garage Logs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto pr-2 portfolio-scrollbar w-full box-border">
        {savedBikes.map((bike) => (
          <div key={bike.id} onClick={() => onSelect(bike)} className="bg-[#111823] p-4 rounded-xl flex flex-col justify-between cursor-pointer hover:bg-[#141e2e] transition duration-200 relative group box-border">
            <div className="flex justify-between items-start border-b border-white/[0.04] pb-2 mb-2 w-full">
              <div className="min-w-0">
                <h4 className="font-bold text-white text-sm truncate max-w-[160px] m-0">{bike.name}</h4>
                <span className="text-[10px] text-secondary block mt-0.5 font-mono">Rider: {bike.weight} lbs</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[8px] uppercase tracking-wider font-mono font-extrabold bg-white/5 px-2 py-0.5 rounded text-portfolio-accent">{bike.ridingStyle}</span>
                <button 
                  type="button"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if (onDelete) onDelete(bike.id); 
                  }} 
                  className="text-muted hover:text-red-400 font-bold text-sm cursor-pointer transition duration-150 border-0 bg-transparent p-0 relative z-30"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-[11px] pt-1 w-full">
              <div className="bg-[#090d16] py-1.5 px-2 rounded">
                <span className="block text-[9px] text-muted font-semibold uppercase">Fork</span>
                <span className="font-bold text-portfolio-accent block mt-0.5">{bike.forkPsi} PSI</span>
              </div>
              <div className="bg-[#090d16] py-1.5 px-2 rounded">
                <span className="block text-[9px] text-muted font-semibold uppercase">Shock</span>
                <span className="font-bold text-portfolio-accent block mt-0.5">{bike.shockType === 'coil' ? bike.shockPsi + ' lbs' : bike.shockPsi + ' PSI'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
