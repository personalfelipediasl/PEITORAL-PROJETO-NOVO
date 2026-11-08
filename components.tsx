import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  MoveVertical, 
  Activity, 
  Archive, 
  TrendingUp, 
  AlignHorizontalSpaceAround, 
  ChevronsUp, 
  MoveHorizontal, 
  Layers, 
  ArrowDownUp,
  PlayCircle,
  PauseCircle,
  ChevronLeft,
  Heart,
  FileText,
  CheckCircle,
  Info,
  Loader2,
  AlertCircle,
  Clock,
  RotateCcw,
  Flame,
  ShieldCheck,
  Trophy,
  Play,
  User,
  Scale,
  Ruler,
  X,
  Smartphone,
  Download,
  Share,
  PlusSquare,
  MoreVertical
} from 'lucide-react';
import { usePWAInstall } from './usePWAInstall';

// --- Icon Mapping ---
export const getIcon = (iconName: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (iconName) {
    case 'MoveVertical': return <MoveVertical {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Archive': return <Archive {...props} />;
    case 'TrendingUp': return <TrendingUp {...props} />;
    case 'AlignHorizontalSpaceAround': return <AlignHorizontalSpaceAround {...props} />;
    case 'ChevronsUp': return <ChevronsUp {...props} />;
    case 'MoveHorizontal': return <MoveHorizontal {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'ArrowDownUp': return <ArrowDownUp {...props} />;
    case 'Flame': return <Flame {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    default: return <Activity {...props} />;
  }
};

// --- PWA Installation Modal (Step-by-step for iOS and Android) ---
export const PWAInstallModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onNativeInstall?: () => void;
  isInstallable?: boolean;
  isIOS?: boolean;
  t: (key: string) => string;
}> = ({ isOpen, onClose, onNativeInstall, isInstallable, isIOS, t }) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>(isIOS ? 'ios' : 'android');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-neutral-800 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 pb-3 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase leading-tight">{t('pwaModalTitle')}</h3>
              <p className="text-[11px] text-neutral-400">{t('installPWASubtitle')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Device Switcher Tabs */}
        <div className="px-5 pt-3">
          <div className="grid grid-cols-2 p-1 bg-black rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveTab('ios')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'ios'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t('tabIOS')}
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'android'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t('tabAndroid')}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4">
          {/* Quick Native Install Button if browser supports prompt */}
          {isInstallable && (
            <button
              onClick={() => {
                onNativeInstall?.();
                onClose();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              {t('nativeInstallBtn')}
            </button>
          )}

          {activeTab === 'ios' ? (
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 bg-black/60 p-3.5 rounded-2xl border border-neutral-800">
                <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-500 shrink-0">
                  <Share className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{t('iosStep1Title')}</h4>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">{t('iosStep1Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-black/60 p-3.5 rounded-2xl border border-neutral-800">
                <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-500 shrink-0">
                  <PlusSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{t('iosStep2Title')}</h4>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">{t('iosStep2Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-black/60 p-3.5 rounded-2xl border border-neutral-800">
                <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{t('iosStep3Title')}</h4>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">{t('iosStep3Desc')}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 bg-black/60 p-3.5 rounded-2xl border border-neutral-800">
                <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-500 shrink-0">
                  <MoreVertical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{t('androidStep1Title')}</h4>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">{t('androidStep1Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-black/60 p-3.5 rounded-2xl border border-neutral-800">
                <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-500 shrink-0">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{t('androidStep2Title')}</h4>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">{t('androidStep2Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-black/60 p-3.5 rounded-2xl border border-neutral-800">
                <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{t('androidStep3Title')}</h4>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">{t('androidStep3Desc')}</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              {t('closeBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Top Compact PWA Install Button on Home Screen ---
export const TopPWAInstallBanner: React.FC<{ t: (key: string) => string }> = ({ t }) => {
  const { isInstallable, isInstalled, isIOS, triggerInstall } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      const outcome = await triggerInstall();
      if (outcome === 'manual_needed') {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  if (isInstalled) {
    return (
      <div className="w-full px-6 pt-4 pb-1">
        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>{t('installedBadge')}</span>
          </div>
          <span className="text-[10px] text-green-300/80 uppercase font-black tracking-widest">Modo App Ativo</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-6 pt-4 pb-1">
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface border border-primary-500/40 hover:border-primary-500 transition-all duration-200 active:scale-[0.98] shadow-md group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary-500/20 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
              <Download className="w-4 h-4 animate-bounce" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black uppercase tracking-wider text-white block group-hover:text-primary-400 transition-colors">
                {t('installPWACompact')}
              </span>
              <span className="text-[10px] text-neutral-400 block -mt-0.5">
                {t('installPWASubtitle')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-500/15 border border-primary-500/30 text-primary-500 text-[10px] font-black uppercase tracking-wider shrink-0">
            <Smartphone className="w-3 h-3" />
            <span>Atalho</span>
          </div>
        </button>
      </div>

      <PWAInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onNativeInstall={handleClick}
        isInstallable={isInstallable}
        isIOS={isIOS}
        t={t}
      />
    </>
  );
};

// --- TDEE Calculator Component ---
export const TDEECalculator: React.FC<{ 
  onClose: () => void;
  t: (key: string) => string;
}> = ({ onClose, t }) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [activity, setActivity] = useState<number>(1.2); 
  const [results, setResults] = useState<{ tdee: number; cutting: number; bmr: number } | null>(null);

  const calculate = () => {
    // Mifflin-St Jeor Equation
    let bmrValue = (10 * weight) + (6.25 * height) - (5 * age);
    bmrValue = gender === 'male' ? bmrValue + 5 : bmrValue - 161;
    
    const tdeeValue = Math.round(bmrValue * activity);
    setResults({
      bmr: bmrValue,
      tdee: tdeeValue,
      cutting: tdeeValue - 500
    });
  };

  const activityLevels = [
    { label: 'Sedentário', mult: 1.2 },
    { label: 'Leve (1-2x)', mult: 1.375 },
    { label: 'Moderado (3-5x)', mult: 1.55 },
    { label: 'Pesado (6-7x)', mult: 1.725 },
    { label: 'Atleta (2x dia)', mult: 1.9 },
  ];

  const macros = useMemo(() => {
    if (!results) return null;
    const calories = results.cutting;
    const p = weight * 2;
    const f = Math.round(weight * 0.8);
    const c = Math.round((calories - (p * 4) - (f * 9)) / 4);
    return { p, f, c };
  }, [results, weight]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-surface border border-neutral-800 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[95vh]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-white transition-colors z-10">
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 overflow-y-auto no-scrollbar">
          <h2 className="text-xl font-black uppercase text-white mb-6 pr-8 leading-tight">{t('calcTitle')}</h2>
          
          <div className="space-y-5 pb-8">
            {/* Gender Toggle */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 block">{t('genderLabel')}</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setGender('male')}
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${gender === 'male' ? 'bg-primary-500 border-primary-500 text-white' : 'border-neutral-800 text-neutral-500'}`}
                >
                  MASC
                </button>
                <button 
                  onClick={() => setGender('female')}
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${gender === 'female' ? 'bg-primary-500 border-primary-500 text-white' : 'border-neutral-800 text-neutral-500'}`}
                >
                  FEM
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{t('ageLabel')}</label>
                <input 
                  type="number" value={age} onChange={(e) => setAge(Number(e.target.value))}
                  className="bg-black border border-neutral-800 rounded-xl p-3 font-bold text-center focus:border-primary-500 outline-none text-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{t('weightLabel')}</label>
                <input 
                  type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                  className="bg-black border border-neutral-800 rounded-xl p-3 font-bold text-center focus:border-primary-500 outline-none text-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{t('heightLabel')}</label>
                <input 
                  type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                  className="bg-black border border-neutral-800 rounded-xl p-3 font-bold text-center focus:border-primary-500 outline-none text-white"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 block">{t('activityLabel')}</label>
              <select 
                value={activity} onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full bg-black border border-neutral-800 rounded-xl p-3 font-bold text-xs uppercase focus:border-primary-500 outline-none appearance-none text-white"
              >
                {activityLevels.map(level => (
                  <option key={level.mult} value={level.mult}>{level.label}</option>
                ))}
              </select>
            </div>

            <Button fullWidth onClick={calculate} className="bg-primary-500 text-white font-black py-4 rounded-xl mt-4">
              {t('calculateNow')}
            </Button>

            {results && (
              <div className="mt-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                
                {/* Text Explanation */}
                <div className="p-5 bg-primary-500/5 border border-primary-500/20 rounded-2xl">
                  <p className="text-xs text-neutral-200 leading-relaxed font-medium">
                    Com base nas suas estatísticas, a melhor estimativa para suas calorias de manutenção é de <span className="text-primary-500 font-black text-sm">{results.tdee}</span> calorias por dia, de acordo com a fórmula de <span className="italic font-bold text-white">Mifflin-St Jeor</span>, amplamente reconhecida como a mais precisa.
                  </p>
                </div>

                {/* Cutting Result Card */}
                <div className="p-6 bg-black border border-neutral-800 rounded-2xl">
                   <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest block mb-1">{t('cuttingResult')}</span>
                   <div className="flex items-baseline gap-2">
                     <span className="text-4xl font-black text-white">{results.cutting}</span>
                     <span className="text-sm font-bold text-neutral-500 uppercase tracking-tighter">kcal/dia</span>
                   </div>
                </div>

                {/* Comparison Table */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    {t('comparisonTitle')}
                  </h3>
                  <div className="bg-black border border-neutral-900 rounded-2xl overflow-hidden">
                    {activityLevels.map((lvl, idx) => {
                      const isActive = lvl.mult === activity;
                      const kcal = Math.round(results.bmr * lvl.mult);
                      return (
                        <div key={idx} className={`flex justify-between items-center px-4 py-3 border-b border-neutral-900 last:border-0 ${isActive ? 'bg-primary-500/10' : ''}`}>
                          <span className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? 'text-primary-500' : 'text-neutral-400'}`}>{lvl.label}</span>
                          <span className={`text-xs font-black ${isActive ? 'text-white' : 'text-neutral-500'}`}>{kcal} kcal</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Macros Suggestion */}
                {macros && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest text-center">{t('macroTitle')}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center bg-black p-3 rounded-xl border border-neutral-800">
                        <span className="text-[8px] font-bold text-neutral-600 uppercase">{t('proteinLabel')}</span>
                        <span className="text-base font-black text-primary-500">{macros.p}g</span>
                      </div>
                      <div className="flex flex-col items-center bg-black p-3 rounded-xl border border-neutral-800">
                        <span className="text-[8px] font-bold text-neutral-600 uppercase">{t('fatLabel')}</span>
                        <span className="text-base font-black text-primary-500">{macros.f}g</span>
                      </div>
                      <div className="flex flex-col items-center bg-black p-3 rounded-xl border border-neutral-800">
                        <span className="text-[8px] font-bold text-neutral-600 uppercase">{t('carbLabel')}</span>
                        <span className="text-base font-black text-primary-500">{macros.c}g</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Disclaimer */}
                <div className="pt-4 border-t border-neutral-900">
                  <p className="text-[10px] font-black text-primary-500/80 uppercase text-center italic tracking-tight leading-snug">
                    {t('nutritionistNote')}
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sound and Haptic Helpers ---
export const playSuccessChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'triangle';
    const now = ctx.currentTime;
    // Pleasant double chime: 659.25Hz (E5) -> 880Hz (A5)
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.setValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    osc.start(now);
    osc.stop(now + 0.38);
  } catch (e) {
    // Audio context may be restricted before user gesture
  }
};

export const triggerHaptic = () => {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  } catch (e) {}
};

// --- Timer Component ---
export const Timer: React.FC<{ 
  title?: string; 
  hint: string; 
  onReachedGoal?: () => void;
  activeSetNumber?: number;
  isAllCompleted?: boolean;
}> = React.memo(({ title, hint, onReachedGoal, activeSetNumber = 1, isAllCompleted = false }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isInterval, setIsInterval] = useState(false);
  const timerRef = useRef<number | null>(null);
  const longPressTimer = useRef<number | null>(null);
  const lastClickTime = useRef<number>(0);
  const goalTriggeredRef = useRef<boolean>(false);

  const totalSeconds = Math.floor(time / 1000);

  // Notifica o pai quando atinge o objetivo de 40s de execução
  useEffect(() => {
    if (totalSeconds >= 40 && !isInterval && !goalTriggeredRef.current) {
      goalTriggeredRef.current = true;
      playSuccessChime();
      triggerHaptic();
      onReachedGoal?.();
    }
  }, [totalSeconds, isInterval, onReachedGoal]);

  const toggleTimer = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation(); 

    const now = Date.now();
    
    if (now - lastClickTime.current < 300) {
      if (totalSeconds >= 40 || isInterval) {
        const nextState = !isInterval;
        setIsInterval(nextState);
        setTime(0);
        setIsActive(true);
        lastClickTime.current = 0;
        goalTriggeredRef.current = false;
        return;
      }
    }
    
    lastClickTime.current = now;
    setIsActive(!isActive);
  };

  const handleMouseDown = () => {
    longPressTimer.current = window.setTimeout(() => {
      setTime(0);
      setIsActive(false);
      setIsInterval(false);
      goalTriggeredRef.current = false;
    }, 800);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const resetForNextSet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTime(0);
    setIsActive(false);
    setIsInterval(false);
    goalTriggeredRef.current = false;
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const getPhrase = (s: number) => {
    if (isInterval) return "DESCANSO ATIVO - RECUPERE O FÔLEGO";
    if (!isActive && time === 0) return "";
    if (s <= 10) return "Vamos lá, preciso que dê seu máximo";
    if (s <= 18) return "agora está ficando sério";
    if (s <= 24) return "agora o bicho vai pegar!";
    if (s <= 35) return "mantenha seu melhor, mas respeite seus limites!";
    if (s < 40) return "QUASE LÁ, NÃO PARA!";
    return `SÉRIE ${activeSetNumber} CONCLUÍDA! DESCANSE 30s`;
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const tenths = Math.floor((ms % 1000) / 100); 
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${tenths}`;
  };

  const isStatusFinishedOrInterval = isInterval || totalSeconds >= 40;

  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <div className="min-h-[3rem] flex items-center justify-center px-4">
        {(isActive || isInterval || time > 0) && (
          <p className={`${isStatusFinishedOrInterval ? 'text-green-500' : 'text-primary-500'} font-black uppercase text-lg leading-tight tracking-tight text-center animate-in fade-in duration-300`}>
            {getPhrase(totalSeconds)}
          </p>
        )}
      </div>
      
      <div 
        onClick={toggleTimer}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className={`bg-surface border-2 ${isInterval ? 'border-green-500 shadow-green-500/20' : (totalSeconds >= 40 ? 'border-primary-500 shadow-primary-500/20' : 'border-neutral-800')} rounded-full px-8 py-3.5 flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-lg shadow-black/40`}
      >
        <Clock className={`w-5 h-5 mr-3 ${isInterval ? 'text-green-500' : (isActive ? 'text-primary-500 animate-pulse' : 'text-neutral-500')} transition-colors`} />
        <span className={`text-3xl font-mono font-bold ${isInterval ? 'text-green-500' : (totalSeconds < 40 ? 'text-white' : 'text-primary-500')} tabular-nums transition-colors`}>
          {formatTime(time)}
        </span>
      </div>
      
      <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1 text-center">
        {isInterval ? "Toque duplo p/ Voltar ao Exercício" : hint}
      </p>

      {/* Quick Action when 40s is reached and more sets remain */}
      {totalSeconds >= 40 && !isInterval && !isAllCompleted && (
        <div className="mt-2 flex gap-2 animate-in fade-in zoom-in duration-200">
          <button
            type="button"
            onClick={resetForNextSet}
            className="px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-primary-500/20 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Zerar Cronômetro p/ Próxima Série
          </button>
        </div>
      )}
    </div>
  );
});

// --- Set Card Component ---
export const SetCard: React.FC<{ 
  index: number; 
  serieLabel: string;
  executionTimeLabel: string;
  intervalLabel?: string;
  isDone?: boolean;
  onToggle?: () => void;
}> = ({ index, serieLabel, executionTimeLabel, intervalLabel, isDone = false, onToggle }) => {
  return (
    <button 
      type="button"
      onClick={onToggle}
      className={`p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer select-none flex flex-col gap-1 items-center justify-center w-full relative overflow-hidden active:scale-95 ${
        isDone 
          ? 'bg-primary-500 border-primary-500 shadow-lg shadow-primary-500/30 text-white' 
          : 'bg-surface border-neutral-800 hover:border-neutral-700 text-neutral-400'
      }`}
    >
      <span className={`text-xs font-black uppercase tracking-tighter text-center ${isDone ? 'text-white' : 'text-primary-500'}`}>
        {serieLabel} {index + 1}
      </span>
      <div className="flex flex-col items-center text-center mt-1 space-y-0.5">
        <span className={`text-[9px] font-bold uppercase tracking-tight leading-tight ${isDone ? 'text-white/95' : 'text-neutral-400'}`}>
          {executionTimeLabel}
        </span>
        {intervalLabel && (
          <span className={`text-[8px] font-medium uppercase tracking-tighter leading-tight ${isDone ? 'text-white/80' : 'text-neutral-500'}`}>
            {intervalLabel}
          </span>
        )}
      </div>
      <div className="mt-1 flex items-center justify-center">
        {isDone ? (
          <CheckCircle className="w-4 h-4 text-white fill-white/20 animate-in zoom-in duration-200" />
        ) : (
          <div className="w-4 h-4 rounded-full border border-neutral-700" />
        )}
      </div>
    </button>
  );
};

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 focus:ring-primary-500",
    secondary: "bg-surface hover:bg-neutral-800 text-white border border-neutral-700 shadow-lg shadow-black/30 focus:ring-neutral-700",
    outline: "border-2 border-neutral-700 hover:border-primary-500 hover:text-primary-500 text-neutral-400 bg-transparent",
    ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Video Player ---
interface VideoPlayerProps {
  videoUrl?: string;
  labels?: {
    loading: string;
    demo: string;
    placeholder: string;
    timeUp?: string;
    setFinished?: string;
    keepGoing?: string;
  };
}

export const VideoPlayer: React.FC<VideoPlayerProps> = React.memo(({ videoUrl, labels }) => {
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const text = useMemo(() => ({
    loading: labels?.loading || "Carregando...",
    demo: labels?.demo || "Vídeo Demonstrativo",
    placeholder: labels?.placeholder || "(Espaço para Inserção)",
  }), [labels]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  // Check if it is a local direct video file or mp4
  const isDirectVideo = !!videoUrl && (
    videoUrl.startsWith('/') ||
    videoUrl.endsWith('.mp4') ||
    videoUrl.includes('.mp4?') ||
    videoUrl.includes('/videos/')
  );

  // Eager autoplay logic: as soon as the accordion opens and component mounts, play video automatically
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isDirectVideo) return;

    setLoading(true);
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryAutoplay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPaused(false);
            setLoading(false);
          })
          .catch(() => {
            // If browser autoplay policy held it, mark paused
            setIsPaused(true);
            setLoading(false);
          });
      }
    };

    tryAutoplay();

    const handleCanPlay = () => {
      setLoading(false);
      tryAutoplay();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
    };
  }, [videoUrl, isDirectVideo]);

  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-surface rounded-xl flex flex-col items-center justify-center text-neutral-500 border-2 border-dashed border-neutral-700">
        <PlayCircle className="w-12 h-12 mb-2 text-neutral-600" />
        <span className="text-xs font-medium text-neutral-400">{text.demo}</span>
      </div>
    );
  }

  // Direct MP4 video playback (optimized local video file)
  if (isDirectVideo) {
    return (
      <div 
        className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative cursor-pointer group select-none"
        onClick={togglePlay}
      >
        <video 
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain bg-black"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setIsPaused(false)}
          onPause={() => setIsPaused(true)}
          onLoadedData={() => setLoading(false)}
        />
        
        {/* Play / Pause Overlay Icon */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-200 pointer-events-none ${isPaused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          {isPaused ? (
            <div className="w-16 h-16 rounded-full bg-primary-500/90 text-white flex items-center justify-center shadow-lg shadow-black/50 backdrop-blur-sm animate-in zoom-in-75">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-black/40 text-white/80 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <PauseCircle className="w-8 h-8" />
            </div>
          )}
        </div>

        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // Fallback for any iframe embeds (YouTube / Canva / Drive)
  const getDriveId = (url: string) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const isDrive = videoUrl.includes('drive.google.com');
  const driveId = isDrive ? getDriveId(videoUrl) : null;

  const embedUrl = (() => {
    let url = null;
    if (videoUrl.includes('youtube') || videoUrl.includes('youtu.be')) {
      const match = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match) {
        const videoId = match[1];
        url = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
      }
    } else if (videoUrl.includes('canva.com')) {
      url = videoUrl.replace(/\/watch.*/, '/view?embed').replace(/\/edit.*/, '/view?embed');
      const params = "autoplay=1&muted=1&loop=1&controls=1";
      url += url.includes('?') ? `&${params}` : `?${params}`;
    } else if (driveId) {
      url = `https://drive.google.com/file/d/${driveId}/preview`;
    }
    return url;
  })();

  if (embedUrl) {
    return (
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
        <iframe 
          width="100%" 
          height="100%" 
          src={embedUrl} 
          title="Exercise Content"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full object-cover scale-[1.01]"
          onLoad={() => setLoading(false)}
        ></iframe>
        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-surface pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">{text.loading}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
}, (prevProps, nextProps) => prevProps.videoUrl === nextProps.videoUrl);

// --- Layout Wrapper ---
export const ScreenWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`min-h-screen max-w-md mx-auto bg-black shadow-2xl overflow-hidden flex flex-col relative ${className}`}>
    {children}
  </div>
);

// --- Header ---
export const Header: React.FC<{ title?: string; onBack?: () => void }> = ({ title, onBack }) => (
  <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800 px-4 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-neutral-900 rounded-full transition-colors text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {title && <h1 className="text-xl font-bold text-white truncate">{title}</h1>}
    </div>
  </div>
);
