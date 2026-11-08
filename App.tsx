import React, { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Heart, CheckCircle, Info, Activity, ClipboardList, ChevronRight, Search, X, Dumbbell, ShieldCheck, ListChecks, Play, Pause, ChevronDown, ChevronUp, Flame, Calendar, ArrowRight, AlertCircle, Clock, Utensils, ShieldAlert, Calculator } from 'lucide-react';
import { EXERCISES, TRANSLATIONS, PREDEFINED_WORKOUTS } from './constants';
import { Exercise, UserData, Language, ReadyWorkout } from './types';
import { Button, VideoPlayer, ScreenWrapper, Header, getIcon, Timer, SetCard, TDEECalculator, TopPWAInstallBanner, playSuccessChime, triggerHaptic, AppTopBar } from './components';

// --- Language Context ---
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const t = (key: string): string => TRANSLATIONS[key]?.[language] || key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

const useUserData = () => {
  const [data, setData] = useState<UserData>(() => {
    const saved = localStorage.getItem('chestDefData');
    return saved ? JSON.parse(saved) : { favorites: [], notes: {}, customPlans: {}, activeWorkout: [] };
  });

  useEffect(() => {
    localStorage.setItem('chestDefData', JSON.stringify(data));
  }, [data]);

  const toggleFavorite = (id: string) => {
    setData(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id) 
        ? prev.favorites.filter(fid => fid !== id) 
        : [...prev.favorites, id]
    }));
  };

  const clearActiveWorkout = () => {
    setData(prev => ({ ...prev, activeWorkout: [] }));
  };

  return { data, toggleFavorite, clearActiveWorkout };
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const BrandLogo = () => (
  <div className="flex flex-col items-center justify-center mb-6">
    <div className="w-full max-w-[240px] sm:max-w-[280px] px-2 flex items-center justify-center">
      <img 
        src="/assets/aistudio/Untitled_design_d95a02a8.png" 
        alt="Projeto Novo Peitoral" 
        className="w-full h-auto object-contain rounded-3xl drop-shadow-[0_8px_32px_rgba(255,81,7,0.4)] select-none pointer-events-none transition-transform hover:scale-105 duration-300"
        loading="eager"
      />
    </div>
  </div>
);

// --- Exercise Item Component ---
const ExerciseItem: React.FC<{ 
  exercise: Exercise; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
  language: Language;
  t: (key: string) => string;
  videoLabels: any;
  sets: [boolean, boolean, boolean];
  onToggleSet: (setIndex: number) => void;
  onAutoCompleteSet: () => void;
}> = ({ 
  exercise, 
  index, 
  isOpen, 
  onToggle, 
  language, 
  t, 
  videoLabels, 
  sets, 
  onToggleSet, 
  onAutoCompleteSet 
}) => {
  const completedCount = sets.filter(Boolean).length;
  const isAllDone = completedCount === 3;
  const activeSetNumber = Math.min(completedCount + 1, 3);

  return (
    <div 
      id={`exercise-item-${index}`}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden mb-4 scroll-mt-20 ${
        isOpen 
          ? 'bg-surface border-primary-500 shadow-xl shadow-primary-500/10' 
          : isAllDone
            ? 'bg-surface/90 border-neutral-800'
            : 'bg-surface border-neutral-800 hover:border-neutral-700'
      }`}
    >
      <button 
        type="button"
        onClick={onToggle} 
        className="w-full p-4 flex items-center justify-between bg-surface cursor-pointer select-none"
      >
        <div className="flex items-center gap-3.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
            isAllDone
              ? 'bg-green-500 text-white'
              : isOpen 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-800 text-neutral-400'
          }`}>
            {isAllDone ? '✓' : index + 1}
          </div>
          <div className="text-left">
            <h3 className={`text-base sm:text-lg font-bold leading-tight ${isOpen ? 'text-white' : 'text-neutral-200'}`}>
              {exercise.name[language]}
            </h3>
            {completedCount > 0 && !isOpen && (
              <span className={`text-[10px] font-black uppercase tracking-wider block mt-0.5 ${isAllDone ? 'text-green-400' : 'text-primary-500'}`}>
                {isAllDone ? '3/3 Concluído' : `${completedCount}/3 Séries`}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAllDone && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-black uppercase">
              3/3 Concluído
            </span>
          )}
          {isOpen ? <ChevronUp className="text-primary-500 w-5 h-5" /> : <ChevronDown className="text-neutral-500 w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {/* Exercise Video: Starts playing automatically when accordion opens */}
          <div className="aspect-video bg-black relative">
            <VideoPlayer 
              videoUrl={exercise.videoUrl} 
              labels={videoLabels} 
            />
          </div>

          <div className="p-4 space-y-4">
             {/* Timer Component - user clicks to start */}
             <div className="bg-black/40 p-2.5 rounded-2xl border border-neutral-800/80">
               <Timer 
                 hint={t('timerHint')} 
                 onReachedGoal={onAutoCompleteSet}
                 activeSetNumber={activeSetNumber}
                 isAllCompleted={isAllDone}
               />
             </div>

             {/* Execution Tip */}
             <div className="bg-black/50 p-4 rounded-xl border border-neutral-800">
                <h4 className="text-primary-500 font-bold uppercase text-xs tracking-wider mb-1.5">{t('quickFixLabel')}</h4>
                <p className="text-white text-sm leading-relaxed">{exercise.quickFix[language]}</p>
             </div>
             
             {/* 3 Sets Grid */}
             <div className="pt-2">
                <p className="text-neutral-400 text-[10px] uppercase font-black mb-3 tracking-widest text-center">
                  {t('setsRecommended')}
                </p>
                <div className="grid grid-cols-3 gap-2 pb-1">
                   {[0, 1, 2].map((setIdx) => (
                     <SetCard 
                        key={setIdx} 
                        index={setIdx} 
                        serieLabel={t('serie')}
                        executionTimeLabel={t('executionTimeLabel')}
                        intervalLabel={t('intervalRecommended')}
                        isDone={sets[setIdx]}
                        onToggle={() => onToggleSet(setIdx)}
                     />
                   ))}
                </div>
                {isAllDone && (
                  <div className="mt-3 p-3 rounded-xl bg-green-500/15 border border-green-500/40 text-center animate-in zoom-in duration-300">
                    <p className="text-xs font-black uppercase text-green-400 tracking-wide">
                      {t('allSetsCompletedNotice')}
                    </p>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Screen 1: Home ---
const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t, setLanguage, language } = useLanguage();

  return (
    <ScreenWrapper className="justify-between bg-black relative">
      {/* Top Bar protecting against smartphone notch / status bar / Dynamic Island */}
      <AppTopBar 
        leftElement={
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-pulse shadow-md shadow-primary-500/50" />
            <span className="text-xs font-black uppercase tracking-wider text-neutral-200">
              Método Secar
            </span>
          </div>
        }
        rightElement={
          <div className="flex gap-2 bg-neutral-900/90 px-2.5 py-1 rounded-full border border-neutral-800 shadow-sm">
            <button 
              type="button"
              onClick={() => setLanguage('pt')} 
              className={`text-lg hover:scale-110 transition-transform ${language === 'pt' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'}`}
              title="Português"
            >
              🇧🇷
            </button>
            <button 
              type="button"
              onClick={() => setLanguage('en')} 
              className={`text-lg hover:scale-110 transition-transform ${language === 'en' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'}`}
              title="English"
            >
              🇺🇸
            </button>
          </div>
        }
      />

      <div className="w-full">
        {/* Compact PWA Mobile Install Shortcut Button on Home Screen */}
        <TopPWAInstallBanner t={t} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <BrandLogo />
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-neutral-300 tracking-tight mb-2 leading-tight">
            {t('guideTitle')} <span className="text-white">{t('guideSubtitle')}</span>
          </h1>
          <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full my-4"></div>
          <p className="text-base sm:text-lg text-neutral-500 max-w-xs mx-auto leading-relaxed font-medium">
            {t('homeDesc')}
          </p>
        </div>
      </div>

      <div 
        className="p-6"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 32px)' }}
      >
        <Button fullWidth onClick={() => navigate('/legal')} className="h-16 text-xl">
          {t('startBtn')}
        </Button>
      </div>
    </ScreenWrapper>
  );
};

// --- Screen 2: Legal Notice ---
const LegalScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <ScreenWrapper className="bg-black">
      <Header title="Aviso Obrigatório" onBack={() => navigate('/')} />
      <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center text-center space-y-6">
        <div className="p-4 bg-primary-500/10 rounded-full border border-primary-500/30">
          <ShieldAlert className="w-12 h-12 text-primary-500" />
        </div>
        <h2 className="text-xl font-bold text-white uppercase tracking-tighter">{t('legalTitle')}</h2>
        <div className="bg-surface p-6 rounded-2xl border border-neutral-800 text-neutral-300 leading-relaxed text-sm whitespace-pre-line text-left w-full">
          {t('legalDesc')}
        </div>
        <Button fullWidth onClick={() => navigate('/menu')} className="mt-4">{t('proceedBtn')}</Button>
      </div>
    </ScreenWrapper>
  );
};

// --- Screen 3: Menu Principal ---
const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const MenuButton = ({ title, icon: Icon, onClick, subtitle, colorClass = "text-white" }: { title: string, subtitle: string, icon: any, onClick: () => void, colorClass?: string }) => (
    <button onClick={onClick} className="flex flex-row items-center p-6 bg-surface border-2 border-neutral-700 rounded-2xl shadow-[0_0_15px_rgba(255,81,7,0.1)] hover:border-primary-500 transition-all duration-300 active:scale-95 group w-full text-left gap-6">
      <div className="p-4 bg-black rounded-full border border-neutral-800 group-hover:border-primary-500/50 shrink-0"><Icon className="w-8 h-8 text-neutral-400 group-hover:text-white" /></div>
      <div className="flex-1"><h3 className={`text-xl font-bold mb-1 uppercase ${colorClass}`}>{title}</h3><p className="text-sm text-neutral-500 uppercase tracking-wider">{subtitle}</p></div>
      <ChevronRight className="w-6 h-6 text-neutral-600 group-hover:text-primary-500" />
    </button>
  );

  return (
    <ScreenWrapper>
      <Header title={t('menuTitle')} onBack={() => navigate('/')} />
      <div className="flex-1 p-6 flex flex-col justify-center space-y-6">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-black text-primary-500 uppercase tracking-widest drop-shadow-lg">{t('menuTitle')}</h2>
          <div className="w-16 h-1 bg-neutral-800 mx-auto mt-2 rounded-full"></div>
        </div>
        <MenuButton 
          title={t('mainWorkoutTitle')} 
          subtitle={t('mainWorkoutSub')} 
          icon={Dumbbell} 
          onClick={() => navigate('/ready-workout/metodo-unico')} 
        />
        <MenuButton 
          title={t('foodGuideTitle')} 
          subtitle={t('foodGuideSub')} 
          icon={Utensils} 
          onClick={() => navigate('/food-guide')} 
        />
      </div>
    </ScreenWrapper>
  );
};

// --- Screen: Food Guide ---
const FoodGuideScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showCalc, setShowCalc] = useState(false);

  return (
    <ScreenWrapper>
      <Header title={t('foodGuideTitle')} onBack={() => navigate('/menu')} />
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-12">
        <div className="text-center mb-8">
          <Utensils className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white uppercase">{t('foodTitle')}</h2>
          <p className="text-neutral-400 mt-2">{t('foodIntro')}</p>
        </div>

        {/* Calculator Trigger Button */}
        <div className="group relative">
           <button 
              onClick={() => setShowCalc(true)}
              className="w-full bg-primary-500/10 border-2 border-primary-500/30 p-6 rounded-2xl flex items-center justify-between hover:border-primary-500 transition-all active:scale-95 group shadow-lg shadow-primary-500/5"
           >
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-primary-500 rounded-xl text-white">
                    <Calculator className="w-6 h-6" />
                 </div>
                 <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-primary-500 opacity-80">Ferramenta</span>
                    <span className="block text-lg font-black uppercase text-white leading-tight">{t('calcBtn')}</span>
                 </div>
              </div>
              <ChevronRight className="w-6 h-6 text-primary-500 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-surface p-5 rounded-xl border border-neutral-800 flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="text-primary-500 font-bold text-xl">{i}.</span>
              <p className="text-neutral-200 font-medium">{(t as any)(`foodPillar${i}`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-primary-500/10 border border-primary-500/20 rounded-xl">
           <p className="text-white font-bold text-center italic">{t('foodFinal')}</p>
        </div>
      </div>

      {showCalc && <TDEECalculator onClose={() => setShowCalc(false)} t={t} />}
    </ScreenWrapper>
  );
};

// --- Screen: Workout Execution ---
const ReadyWorkoutExecutionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const workout = PREDEFINED_WORKOUTS[0];
  const exercises = useMemo(() => {
    return workout.exercises.map(id => EXERCISES.find(e => e.id === id)).filter((e): e is Exercise => !!e);
  }, [workout.exercises]);

  // Default to first exercise open so video autoplays and user can start immediately
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Sets progress per exercise: exerciseIndex -> [boolean, boolean, boolean]
  const [exerciseProgress, setExerciseProgress] = useState<Record<number, [boolean, boolean, boolean]>>(() => {
    const init: Record<number, [boolean, boolean, boolean]> = {};
    exercises.forEach((_, idx) => {
      init[idx] = [false, false, false];
    });
    return init;
  });

  const videoLabels = useMemo(() => ({
    tapToWatch: t('tapToWatch'),
    watchNow: t('watchNow'),
    loading: t('loadingVideo'),
    demo: t('demoVideo'),
    placeholder: t('insertSpace'),
    timeUp: t('timeUp'),
    setFinished: t('setFinished'),
    keepGoing: t('keepGoing')
  }), [t]);

  const getSets = useCallback((idx: number): [boolean, boolean, boolean] => {
    return exerciseProgress[idx] || [false, false, false];
  }, [exerciseProgress]);

  // Handler for automatically marking a set as completed when the timer hits 40 seconds
  const handleAutoCompleteSet = useCallback((exerciseIdx: number) => {
    setExerciseProgress(prev => {
      const current = prev[exerciseIdx] || [false, false, false];
      const nextSetIdx = current.findIndex(done => !done);
      if (nextSetIdx === -1) return prev; // All 3 already done

      const updated: [boolean, boolean, boolean] = [current[0], current[1], current[2]];
      updated[nextSetIdx] = true;

      // When the 3rd set is completed:
      // "Sempre que a terceira série foi concluída, feche a aba do exercício concluído e abra o exercício seguinte. Mas não inicie o cronômetro, pois essa ação será do usuário."
      if (nextSetIdx === 2) {
        setTimeout(() => {
          if (exerciseIdx + 1 < exercises.length) {
            setOpenIndex(exerciseIdx + 1);
            setTimeout(() => {
              const el = document.getElementById(`exercise-item-${exerciseIdx + 1}`);
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 120);
          } else {
            // All exercises completed
            setOpenIndex(null);
          }
        }, 850);
      }

      return {
        ...prev,
        [exerciseIdx]: updated
      };
    });
  }, [exercises.length]);

  // Handler for manual tap on a set card
  const handleToggleSet = useCallback((exerciseIdx: number, setIdx: number) => {
    setExerciseProgress(prev => {
      const current = prev[exerciseIdx] || [false, false, false];
      const updated: [boolean, boolean, boolean] = [current[0], current[1], current[2]];
      const nextVal = !updated[setIdx];
      updated[setIdx] = nextVal;

      // If completing the 3rd set via tap:
      if (nextVal && updated[0] && updated[1] && updated[2]) {
        playSuccessChime();
        triggerHaptic();
        setTimeout(() => {
          if (exerciseIdx + 1 < exercises.length) {
            setOpenIndex(exerciseIdx + 1);
            setTimeout(() => {
              const el = document.getElementById(`exercise-item-${exerciseIdx + 1}`);
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 120);
          } else {
            setOpenIndex(null);
          }
        }, 850);
      }

      return {
        ...prev,
        [exerciseIdx]: updated
      };
    });
  }, [exercises.length]);

  const totalCompletedExercises = exercises.filter((_, idx) => {
    const s = exerciseProgress[idx];
    return s && s[0] && s[1] && s[2];
  }).length;

  const isWorkoutAllDone = totalCompletedExercises === exercises.length;

  return (
    <ScreenWrapper>
      <Header 
        title={workout.title[language]} 
        subtitle="Método Secar"
        onBack={() => navigate('/menu')} 
        rightElement={
          <span className="px-2.5 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-400 text-[10px] font-black uppercase tracking-wider">
            {totalCompletedExercises}/{exercises.length}
          </span>
        }
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 no-scrollbar">
        
        {/* Mensagem de Ajuste de Intensidade: Desaparece quando um exercício é aberto */}
        {openIndex === null && (
          <div className="bg-primary-500/10 border border-primary-500/30 p-4 rounded-xl animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-primary-500" />
              <span className="text-primary-500 font-black text-[10px] uppercase tracking-widest">Ajuste de Intensidade</span>
            </div>
            <p className="text-white font-bold text-[10px] leading-relaxed uppercase">
              {t('intensityTip')}
            </p>
          </div>
        )}

        {/* Global Workout Progress bar */}
        <div className="space-y-1.5 px-1 pt-1">
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-neutral-400">
            <span>Progresso do Treino</span>
            <span className="text-primary-500">{totalCompletedExercises} de {exercises.length} Concluídos</span>
          </div>
          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
            <div 
              className="h-full bg-gradient-to-r from-primary-600 to-primary-500 transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(4, (totalCompletedExercises / exercises.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Exercises list */}
        <div className="mt-4 space-y-3">
          {exercises.map((exercise, index) => (
            <ExerciseItem 
              key={`${exercise.id}-${index}`}
              exercise={exercise}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              language={language}
              t={t}
              videoLabels={videoLabels}
              sets={getSets(index)}
              onToggleSet={(setIdx) => handleToggleSet(index, setIdx)}
              onAutoCompleteSet={() => handleAutoCompleteSet(index)}
            />
          ))}
        </div>

        {isWorkoutAllDone && (
          <div className="p-5 rounded-2xl bg-green-500/15 border border-green-500/40 text-center animate-in zoom-in duration-300 space-y-2 mt-4">
            <p className="text-sm font-black uppercase text-green-400">
              {t('workoutFinishedNotice')}
            </p>
            <p className="text-xs text-neutral-300 font-medium">
              Clique no botão abaixo para registrar a conclusão do seu treino!
            </p>
          </div>
        )}
      </div>

      <div 
        className="p-4 bg-black/95 backdrop-blur-md border-t border-neutral-800 sticky bottom-0 z-20"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}
      >
        <Button 
          fullWidth 
          onClick={() => navigate('/final')}
          className={isWorkoutAllDone ? 'ring-4 ring-primary-500/50 shadow-2xl shadow-primary-500/50 animate-pulse' : ''}
        >
          {t('finishWorkout')}
        </Button>
      </div>
    </ScreenWrapper>
  );
};

const FinalScreen: React.FC<{ clearWorkout: () => void }> = ({ clearWorkout }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <ScreenWrapper className="bg-black text-white">
      <Header title="Treino Finalizado" onBack={() => { clearWorkout(); navigate('/'); }} />
      <div className="flex-1 flex flex-col justify-center items-center text-center p-8 space-y-8">
        <div className="w-28 h-28 bg-surface rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-primary-500/20 mb-2 border border-neutral-800">
          <CheckCircle className="w-16 h-16 text-primary-500" />
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter">{t('congratsTitle')}</h2>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-xs mx-auto">{t('congratsDesc')}</p>
        </div>
        <div 
          className="w-full pt-4"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)' }}
        >
          <Button fullWidth onClick={() => { clearWorkout(); navigate('/'); }}>{t('backHome')}</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

const App: React.FC = () => {
  const userMethods = useUserData();
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/legal" element={<LegalScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/food-guide" element={<FoodGuideScreen />} />
          <Route path="/ready-workout/:id" element={<ReadyWorkoutExecutionScreen />} />
          <Route path="/final" element={<FinalScreen clearWorkout={userMethods.clearActiveWorkout} />} />
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
