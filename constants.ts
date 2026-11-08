import { Exercise, Language, ReadyWorkout } from './types';

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Home
  guideTitle: { pt: "Queime sua gordura e dê um novo aspecto", en: "Burn your fat and give a new look" },
  guideSubtitle: { pt: "ao seu peitoral!", en: "to your chest!" },
  homeDesc: { pt: "Sem lenga-lenga. O que funciona para secar e definir!", en: "No fluff. Just what works to dry and define!" },
  startBtn: { pt: "ACESSAR MÉTODO", en: "ACCESS METHOD" },
  
  // PWA Install
  installPWACompact: { pt: "Instalar no Celular", en: "Install on Phone" },
  installPWASubtitle: { pt: "Atalho rápido na tela de início", en: "Quick home screen shortcut" },
  installedBadge: { pt: "App Instalado", en: "App Installed" },
  pwaModalTitle: { pt: "Instalar no Celular", en: "Install on Phone" },
  tabIOS: { pt: "iPhone / iPad (iOS)", en: "iPhone / iPad (iOS)" },
  tabAndroid: { pt: "Android / Chrome", en: "Android / Chrome" },
  iosStep1Title: { pt: "1. No Safari, toque em Compartilhar", en: "1. In Safari, tap Share" },
  iosStep1Desc: { pt: "Toque no ícone de quadrado com seta para cima na barra inferior.", en: "Tap the square icon with an upward arrow in bottom bar." },
  iosStep2Title: { pt: "2. Selecione 'Adicionar à Tela de Início'", en: "2. Select 'Add to Home Screen'" },
  iosStep2Desc: { pt: "Role a lista para baixo e toque na opção com o símbolo (+).", en: "Scroll down and tap the option with the plus (+) icon." },
  iosStep3Title: { pt: "3. Confirme em 'Adicionar'", en: "3. Confirm 'Add'" },
  iosStep3Desc: { pt: "O app será instalado como um aplicativo independente no celular!", en: "The app will be installed as a standalone app on your phone!" },
  androidStep1Title: { pt: "1. Abra o menu do Chrome", en: "1. Open Chrome menu" },
  androidStep1Desc: { pt: "Toque nos três pontinhos ⋮ no topo direito do navegador.", en: "Tap the three dots ⋮ in upper right corner of browser." },
  androidStep2Title: { pt: "2. Toque em 'Instalar aplicativo'", en: "2. Tap 'Install application'" },
  androidStep2Desc: { pt: "Ou selecione 'Adicionar à tela inicial'.", en: "Or select 'Add to Home Screen'." },
  androidStep3Title: { pt: "3. Confirme a instalação", en: "3. Confirm installation" },
  androidStep3Desc: { pt: "Pronto! O aplicativo abrirá sem as barras do navegador.", en: "Done! The app will open full screen without browser bars." },
  nativeInstallBtn: { pt: "INSTALAR AGORA NO APARELHO", en: "INSTALL NOW ON DEVICE" },
  closeBtn: { pt: "Fechar", en: "Close" },

  // Onboarding & Legal
  legalTitle: { pt: "AVISO OBRIGATÓRIO ⚠️", en: "MANDATORY NOTICE ⚠️" },
  legalDesc: { 
    pt: `Este programa não trata ginecomastia hormonal. Isso é assunto médico e, muitas vezes, cirúrgico.

O que ele faz:

✔️ reduz gordura corporal
✔️ Ênfase estratégica no peitoral, melhorando o aspecto
✔️ Acelera o metabolismo
✔️ aumenta firmeza
✔️ devolve confiança

⚠️ Não existe queima de gordura localizada.

Use este app como Alavanca para sua autoestima, comece treinando em casa e adquirindo sua confiança perante aos resultados, seja em 1, 2 meses ou de acordo com a resposta de seu corpo, matricule-se em uma academia!`, 
    en: `This program does not treat hormonal gynecomastia. This is a medical and often surgical matter.

What it does:

✔️ reduces body fat
✔️ Strategic chest emphasis, improving appearance
✔️ Accelerates metabolism
✔️ increases firmness
✔️ restores confidence

⚠️ There is no such thing as spot fat reduction.

Use this app as a lever for your self-esteem, start training at home and gain confidence with results, whether in 1, 2 months or according to your body's response, then enroll in a gym!` 
  },
  proceedBtn: { pt: "ENTENDI E ACEITO", en: "I UNDERSTAND & ACCEPT" },

  // Menu
  menuTitle: { pt: "SISTEMA DIRETO", en: "DIRECT SYSTEM" },
  mainWorkoutTitle: { pt: "TREINO PRINCIPAL — 30 MIN", en: "MAIN WORKOUT — 30 MIN" },
  mainWorkoutSub: { pt: "Frequência: 3x por semana", en: "Frequency: 3x per week" },
  foodGuideTitle: { pt: "ORIENTAÇÃO ALIMENTAR", en: "FOOD ORIENTATION" },
  foodGuideSub: { pt: "Como comer para secar", en: "How to eat to get lean" },

  // Workout
  workoutName: { pt: "MÉTODO DEFINIÇÃO", en: "DEFINITION METHOD" },
  setsRecommended: { pt: "Execução: 40 segundos por exercício. 3 séries.", en: "Execution: 40 seconds per exercise. 3 sets." },
  executionTimeLabel: { pt: "Tempo de execução: 40 segundos", en: "Execution time: 40 seconds" },
  intervalRecommended: { pt: "Intervalo: Recomendado 30 seg.", en: "Rest: Recommended 30 sec." },
  intensityTip: { 
    pt: "PARA AUMENTAR A INTENSIDADE SE ESTIVER FÁCIL: AUMENTE O TEMPO DE EXECUÇÃO E DIMINUA O TEMPO DE INTERVALO! SE ESTIVER DIFÍCIL, DIMINUA O TEMPO DE EXECUÇÃO E AUMENTE O INTERVALO, LEMBRE-SE DE RESPEITAR SEU CORPO E SEUS LIMITES!",
    en: "TO INCREASE INTENSITY IF IT'S EASY: INCREASE EXECUTION TIME AND DECREASE REST TIME! IF IT'S HARD, DECREASE EXECUTION TIME AND INCREASE REST, REMEMBER TO RESPECT YOUR BODY AND LIMITS!" 
  },
  quickFixLabel: { pt: "Dica de Execução", en: "Execution Tip" },
  finishWorkout: { pt: "FINALIZAR TREINO", en: "FINISH WORKOUT" },
  timerHint: { pt: "Clique p/ Iniciar • Segure p/ Zerar", en: "Click to Start • Hold to Reset" },
  intervalValue: { pt: "45 seg", en: "45 sec" },
  serie: { pt: "Série", en: "Set" },
  intervalo: { pt: "Descanso", en: "Rest" },

  // Food
  foodTitle: { pt: "Diretrizes Alimentares", en: "Dietary Guidelines" },
  foodIntro: { pt: "Ou você come certo, ou o peitoral não seca. Não complique.", en: "Either you eat right, or your chest won't lean. Don't complicate it." },
  calcBtn: { pt: "calcule suas calorias aqui", en: "calculate your calories here" },
  calcTitle: { pt: "Calculadora de Calorias (TDEE)", en: "Calories Calculator (TDEE)" },
  genderLabel: { pt: "Gênero", en: "Gender" },
  ageLabel: { pt: "Idade", en: "Age" },
  weightLabel: { pt: "Peso (kg)", en: "Weight (kg)" },
  heightLabel: { pt: "Altura (cm)", en: "Height (cm)" },
  activityLabel: { pt: "Nível de Atividade", en: "Activity Level" },
  calculateNow: { pt: "CALCULAR AGORA", en: "CALCULATE NOW" },
  maintenanceResult: { pt: "Calorias de Manutenção", en: "Maintenance Calories" },
  cuttingResult: { pt: "Calorias p/ Secar (Cutting)", en: "Cutting Calories" },
  macroTitle: { pt: "Sugestão de Macros p/ Secar", en: "Macro Suggestion for Cutting" },
  proteinLabel: { pt: "Proteínas", en: "Protein" },
  fatLabel: { pt: "Gorduras", en: "Fats" },
  carbLabel: { pt: "Carbos", en: "Carbs" },
  comparisonTitle: { pt: "Níveis de Atividade", en: "Activity Levels" },
  nutritionistNote: { pt: "Recomendamos que um nutricionista monte seu plano alimentar!", en: "We recommend that a nutritionist creates your meal plan!" },
  
  foodPillar1: { pt: "Aumente a Proteína: Frango, ovo e carne magra em todas as refeições.", en: "Increase Protein: Chicken, eggs, and lean meat in every meal." },
  foodPillar2: { pt: "Corte o Açúcar: Doces e refrigerantes são veneno para quem quer secar.", en: "Cut Sugar: Sweets and sodas are poison if you want to lean out." },
  foodPillar3: { pt: "Zero Ultraprocessados: Se vem em pacote com muitos ingredientes, evite.", en: "Zero Processed: If it comes in a package with many ingredients, avoid it." },
  foodPillar4: { pt: "Atenção às Calorias Líquidas: Pare de beber suas calorias (sucos, álcool).", en: "Watch Liquid Calories: Stop drinking your calories (juices, alcohol)." },
  foodFinal: { pt: "Utilize a ferramenta acima para entender sua necessidade calórica.", en: "Use the tool above to understand your caloric needs." },

  // Final
  congratsTitle: { pt: "Feito.", en: "Done." },
  congratsDesc: { pt: "Execução é o que separa quem tem resultado de quem tem desculpa. Até o próximo.", en: "Execution separates results from excuses. See you next time." },
  backHome: { pt: "VOLTAR AO INÍCIO", en: "BACK TO START" },
  tapToWatch: { pt: "Toque para assistir", en: "Tap to watch" },
  watchNow: { pt: "Assistir Agora", en: "Watch Now" },
  loadingVideo: { pt: "Carregando Vídeo...", en: "Loading Video..." },
  demoVideo: { pt: "Vídeo Demonstrativo", en: "Demo Video" },
  insertSpace: { pt: "(Espaço para Inserção)", en: "(Placeholder Area)" },
  timeUp: { pt: "Tempo Esgotado!", en: "Time's Up!" },
  setFinished: { pt: "Série Concluída", en: "Set Finished" },
  keepGoing: { pt: "se der mais de 40 seg, vá em frente!", en: "if you can go over 40s, go ahead!" },
  autoCompletedSet: { pt: "Série marcada como concluída!", en: "Set marked as completed!" },
  nextSetReady: { pt: "Próxima Série", en: "Next Set" },
  allSetsCompletedNotice: { pt: "3 séries concluídas! Avançando...", en: "3 sets completed! Advancing..." },
  workoutFinishedNotice: { pt: "🏆 Treino Completo! Todas as séries finalizadas!", en: "🏆 Workout Complete! All sets finished!" }
};

export const EXERCISES: Exercise[] = [
  {
    id: 'corrida-estacionada',
    name: { pt: 'Corrida Estacionada', en: 'Stationary Run' },
    iconName: 'Activity',
    category: 'basic',
    shortDescription: { pt: 'Aquecimento e queima calórica.', en: 'Warmup and calorie burn.' },
    objective: { pt: 'Elevar a frequência cardíaca.', en: 'Elevate heart rate.' },
    steps: {
      pt: ['Corra no lugar.', 'Eleve os joelhos.', 'Mantenha o ritmo constante.', 'Use os braços para equilibrar.'],
      en: ['Run in place.', 'Lift knees high.', 'Maintain steady pace.', 'Use arms for balance.']
    },
    quickFix: { pt: 'Mantenha o tronco ereto e respire ritmadamente.', en: 'Keep torso upright and breathe rhythmicly.' },
    compareTip: { pt: '', en: '' },
    videoUrl: '/videos/corrida-estacionada.mp4'
  },
  {
    id: 'flexoes-apoios',
    name: { pt: 'Flexões com Apoios', en: 'Incline Pushups' },
    iconName: 'ArrowDownUp',
    category: 'basic',
    shortDescription: { pt: 'Trabalho focado no peitoral.', en: 'Focused chest work.' },
    objective: { pt: 'Fortalecer a musculatura peitoral.', en: 'Strengthen chest muscles.' },
    steps: {
      pt: ['Apoie as mãos em uma superfície elevada ou use apoios.', 'Desça o peito controladamente.', 'Empurre de volta à posição inicial.', 'Mantenha o corpo alinhado.'],
      en: ['Place hands on elevated surface or use grips.', 'Lower chest controlled.', 'Push back to start.', 'Keep body aligned.']
    },
    quickFix: { pt: 'Não deixe os cotovelos abrirem excessivamente.', en: 'Don\'t let elbows flare out excessively.' },
    compareTip: { pt: '', en: '' },
    videoUrl: '/videos/flexoes-apoios.mp4'
  },
  {
    id: 'grupado',
    name: { pt: 'Grupado', en: 'Crunches / Tuck-ins' },
    iconName: 'Layers',
    category: 'basic',
    shortDescription: { pt: 'Trabalho de core e estabilidade.', en: 'Core work and stability.' },
    objective: { pt: 'Fortalecer o abdômen e estabilizar o tronco.', en: 'Strengthen abs and stabilize torso.' },
    steps: {
      pt: ['Deite-se ou sente-se equilibrado.', 'Traga os joelhos em direção ao peito.', 'Estenda as pernas sem tocar o chão.', 'Repita o movimento.'],
      en: ['Lie down or sit balanced.', 'Bring knees towards chest.', 'Extend legs without touching floor.', 'Repeat movement.']
    },
    quickFix: { pt: 'Mantenha o abdômen sempre contraído.', en: 'Keep abs always contracted.' },
    compareTip: { pt: '', en: '' },
    videoUrl: '/videos/grupado.mp4'
  },
  {
    id: 'flexoes-tradicional',
    name: { pt: 'Flexões', en: 'Pushups' },
    iconName: 'ArrowDownUp',
    category: 'basic',
    shortDescription: { pt: 'Exercício fundamental de empurrar.', en: 'Fundamental pushing exercise.' },
    objective: { pt: 'Desenvolvimento do peitoral e tríceps.', en: 'Chest and triceps development.' },
    steps: {
      pt: ['Posição de prancha.', 'Mãos um pouco além da largura dos ombros.', 'Desça até o peito quase tocar o chão.', 'Suba com força.'],
      en: ['Plank position.', 'Hands slightly wider than shoulders.', 'Lower until chest almost touches floor.', 'Push up strongly.']
    },
    quickFix: { pt: 'Mantenha o glúteo contraído para não arquear as costas.', en: 'Keep glutes squeezed to avoid arching back.' },
    compareTip: { pt: '', en: '' },
    videoUrl: '/videos/flexoes-tradicional.mp4'
  },
  {
    id: 'afundos-alternados',
    name: { pt: 'Afundos Alternados', en: 'Alternating Lunges' },
    iconName: 'TrendingUp',
    category: 'basic',
    shortDescription: { pt: 'Força de pernas e queima calórica.', en: 'Leg strength and calorie burn.' },
    objective: { pt: 'Trabalhar membros inferiores e equilíbrio.', en: 'Work lower limbs and balance.' },
    steps: {
      pt: ['Dê um passo à frente.', 'Desça o joelho de trás em direção ao chão.', 'Volte e troque a perna.', 'Mantenha o tronco reto.'],
      en: ['Step forward.', 'Lower back knee towards floor.', 'Return and switch legs.', 'Keep torso straight.']
    },
    quickFix: { pt: 'O joelho da frente não deve ultrapassar a ponta do pé.', en: 'Front knee should not go past your toes.' },
    compareTip: { pt: '', en: '' },
    videoUrl: '/videos/afundos-alternados.mp4'
  },
  {
    id: 'deslocamento-lateral',
    name: { pt: 'Deslocamento Lateral', en: 'Lateral Shuffle' },
    iconName: 'MoveHorizontal',
    category: 'basic',
    shortDescription: { pt: 'Agilidade e cardio.', en: 'Agility and cardio.' },
    objective: { pt: 'Trabalhar explosão lateral.', en: 'Work lateral explosion.' },
    steps: {
      pt: ['Fique em posição de meio agachamento.', 'Desloque-se lateralmente com passos rápidos.', 'Toque o chão ou mude de direção.', 'Mantenha o quadril baixo.'],
      en: ['Stay in half-squat position.', 'Move laterally with quick steps.', 'Touch floor or switch direction.', 'Keep hips low.']
    },
    quickFix: { pt: 'Não cruze os pés durante o deslocamento.', en: 'Don\'t cross your feet while moving.' },
    compareTip: { pt: '', en: '' },
    videoUrl: '/videos/deslocamento-lateral.mp4'
  },
  {
    id: 'polichinelos',
    name: { pt: 'Polichinelos', en: 'Jumping Jacks' },
    iconName: 'Activity',
    category: 'basic',
    shortDescription: { pt: 'Cardio clássico.', en: 'Classic cardio.' },
    objective: { pt: 'Elevação metabólica.', en: 'Metabolic elevation.' },
    steps: {
      pt: ['Salte abrindo braços e pernas.', 'Salte fechando e voltando à posição inicial.', 'Mantenha a velocidade.', 'Respire pelo nariz.'],
      en: ['Jump opening arms and legs.', 'Jump closing back to start.', 'Maintain speed.', 'Breathe through nose.']
    },
    quickFix: { pt: 'Atenção ao impacto: pouse suavemente.', en: 'Watch impact: land softly.' },
    compareTip: { pt: '', en: '' },
    videoUrl: '/videos/polichinelos.mp4'
  }
];

export const PREDEFINED_WORKOUTS: ReadyWorkout[] = [
  {
    id: 'metodo-unico',
    title: { pt: 'MÉTODO DEFINIÇÃO', en: 'DEFINITION METHOD' },
    frequency: '3x',
    sets: 3,
    exercises: [
      'corrida-estacionada',
      'flexoes-apoios',
      'grupado',
      'flexoes-tradicional',
      'afundos-alternados',
      'flexoes-apoios',
      'deslocamento-lateral',
      'polichinelos'
    ]
  }
];
