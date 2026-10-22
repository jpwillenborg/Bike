import React, { useState, useEffect } from 'react';
import ConfigureSpecsCard from './components/setup/ConfigureSpecsCard';
import TargetAnalyticsCard from './components/setup/TargetAnalyticsCard';
import GarageLogsCard from './components/setup/GarageLogsCard';

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

const INITIAL_MOCK_GARAGE = [
  { id: 'mock-1', name: 'Trek Bicycles', weight: 175, ridingStyle: 'aggressive', forkType: 'fox38', shockType: 'air', forkPsi: 88, shockPsi: 225, reboundClicks: 5, hscClicks: 4, lscClicks: 6 },
  { id: 'mock-2', name: 'Santa Cruz Bicycles', weight: 190, ridingStyle: 'balanced', forkType: 'fox36', shockType: 'coil', forkPsi: 85, shockPsi: 450, reboundClicks: 7, hscClicks: 8, lscClicks: 10 },
  { id: 'mock-3', name: 'Specialized', weight: 160, ridingStyle: 'casual', forkType: 'fox34', shockType: 'air', forkPsi: 67, shockPsi: 180, reboundClicks: 9, hscClicks: 12, lscClicks: 14 },
  { id: 'mock-4', name: 'Yeti Cycles', weight: 180, ridingStyle: 'balanced', forkType: 'lyrik', shockType: 'air', forkPsi: 80, shockPsi: 200, reboundClicks: 7, hscClicks: 8, lscClicks: 10 }
];

export default function MtbTuner() {
  const [name, setName] = useState('specialized');
  const [weight, setWeight] = useState('185');
  const [ridingStyle, setRidingStyle] = useState('balanced');
  const [forkType, setForkType] = useState('fox36');
  const [shockType, setShockType] = useState('air');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [savedBikes, setSavedBikes] = useState(INITIAL_MOCK_GARAGE);
  const [forkPsiOverride, setForkPsiOverride] = useState(0);

  const getApiUrl = (path) => {
    const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:8080'
      : 'https://bike-4ezn.onrender.com';
    return `${baseUrl}${path}`;
  };

  const fetchBikes = async () => {
    try {
      const response = await fetch(getApiUrl('/api/v1/tune/bikes'));
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const combinedGarage = [...INITIAL_MOCK_GARAGE];
          data.forEach(dbBike => {
            const exists = combinedGarage.some(b => b.name === dbBike.name && b.weight === dbBike.weight);
            if (!exists) {
              combinedGarage.push(dbBike);
            }
          });
          setSavedBikes(combinedGarage);
        } else {
          setSavedBikes(INITIAL_MOCK_GARAGE);
        }
      } else {
        setSavedBikes(INITIAL_MOCK_GARAGE);
      }
    } catch (err) {
      console.error('Failed to load bikes from database', err);
      setSavedBikes(INITIAL_MOCK_GARAGE);
    }
  };

  useEffect(() => { fetchBikes(); }, []);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    const activeBrandLabel = TOP_CHASSIS_BRANDS.find(b => b.id === name)?.label || 'Custom Platform';
    try {
      const response = await fetch(getApiUrl('/api/v1/tune/calculate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: activeBrandLabel, weight: parseFloat(weight), ridingStyle, forkType, shockType }),
      });
      if (!response.ok) throw new Error('Validation failure.');
      const data = await response.json();
      setResults(data);
      setForkPsiOverride(data.forkPsi);
      fetchBikes();
    } catch (err) { setError(err.message); }
  };

  const handleDelete = async (id) => {
    if (id.toString().startsWith('mock-')) {
      setSavedBikes(prev => {
        const next = prev.filter(b => b.id !== id);
        return next.length > 0 ? next : INITIAL_MOCK_GARAGE;
      });
      if (results && results.id === id) { setResults(null); setForkPsiOverride(0); }
      return;
    }
    try {
      const response = await fetch(getApiUrl(`/api/v1/tune/bikes/${id}`), { method: 'DELETE' });
      if (response.ok) { fetchBikes(); if (results && results.id === id) { setResults(null); setForkPsiOverride(0); } }
    } catch (err) { console.error(err); }
  };

  const handleSelectBike = (bike) => {
    setResults(bike);
    setForkPsiOverride(bike.forkPsi);
  };

  return (
    <div className="max-w-[1024px] mx-auto w-full flex flex-col justify-start flex-grow pb-12 md:pb-30 box-border">
      <div className="flex flex-col pb-4 text-left w-full">
        <span className="text-[0.95rem] md:text-[1.1rem] font-mono text-portfolio-accent block mb-0 font-normal">// Setup Dynamics</span>
        <h1 className="text-[1.65rem] md:text-[2.1rem] font-semibold tracking-normal text-white m-0 pt-1 leading-tight">Mountain Bike Suspension Workbench</h1>
        <p className="text-secondary text-[0.95rem] md:text-[1.05rem] leading-[1.6] mt-4 mb-0 block w-full">
          An interactive full-stack suspension workbench featuring a React frontend coupled with a Java Spring Boot REST API and H2 SQL database architecture. The system models multi-stage suspension leverage rates based on biometric rider inputs and mechanical damper specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10 text-left md:mt-14 lg:mt-16 relative w-full box-border items-stretch">
        <ConfigureSpecsCard
          name={name} setName={setName}
          weight={weight} setWeight={setWeight}
          ridingStyle={ridingStyle} setRidingStyle={setRidingStyle}
          forkType={forkType} setForkType={setForkType}
          shockType={shockType} setShockType={setShockType}
          error={error} onCalculate={handleCalculate}
        />
        <TargetAnalyticsCard
          results={results}
          forkPsiOverride={forkPsiOverride}
          setForkPsiOverride={setForkPsiOverride}
        />
      </div>

      <GarageLogsCard
        savedBikes={savedBikes}
        onSelect={handleSelectBike}
        onDelete={handleDelete}
      />
    </div>
  );
}