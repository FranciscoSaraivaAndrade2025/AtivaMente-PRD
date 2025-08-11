import { 
  Target, 
  Brain, 
  Puzzle, 
  Map, 
  Zap, 
  MessageSquare,
  Eye,
  MemoryStick,
  Calculator,
  Route,
  Timer,
  BookOpen
} from 'lucide-react'

export const categories = [
  {
    id: 'attention',
    name: 'Atenção e Concentração',
    description: 'Desenvolva sua capacidade de focar e manter a atenção',
    icon: Target,
    color: 'bg-red-500',
    gradient: 'from-red-500 to-red-600',
    games: ['focus-target']
  },
  {
    id: 'memory',
    name: 'Memória de Trabalho',
    description: 'Fortaleça sua memória de curto prazo e capacidade de retenção',
    icon: Brain,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    games: ['memory-sequence']
  },
  {
    id: 'logic',
    name: 'Raciocínio Lógico',
    description: 'Aprimore suas habilidades de pensamento lógico e dedução',
    icon: Puzzle,
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    gradient: 'from-green-500 to-green-600',
    games: ['pattern-logic']
  },
  {
    id: 'planning',
    name: 'Planejamento e Estratégia',
    description: 'Desenvolva habilidades de planejamento e tomada de decisão',
    icon: Map,
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    games: ['tower-hanoi']
  },
  {
    id: 'processing',
    name: 'Velocidade de Processamento',
    description: 'Aumente sua velocidade de processamento mental',
    icon: Zap,
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-600',
    gradient: 'from-yellow-500 to-yellow-600',
    games: ['speed-match']
  },
  {
    id: 'language',
    name: 'Linguagem e Compreensão',
    description: 'Melhore suas habilidades linguísticas e de compreensão',
    icon: MessageSquare,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600',
    gradient: 'from-indigo-500 to-indigo-600',
    games: ['word-association']
  }
]

export const games = {
  // Atenção e Concentração
  'focus-target': {
    id: 'focus-target',
    title: 'Alvo da Concentração',
    description: 'Clique apenas nos alvos corretos que aparecem na tela, ignorando os distratores.',
    category: 'Atenção e Concentração',
    difficulty: 2,
    estimatedTime: '5-10 min',
    icon: Eye,
    instructions: 'Clique apenas nos círculos AZUIS que aparecem. Ignore os vermelhos!',
    objective: 'Desenvolver atenção seletiva e controle inibitório'
  },

  // Memória de Trabalho
  'memory-sequence': {
    id: 'memory-sequence',
    title: 'Sequência de Memória',
    description: 'Memorize e reproduza sequências de cores cada vez mais longas.',
    category: 'Memória de Trabalho',
    difficulty: 2,
    estimatedTime: '10-15 min',
    icon: MemoryStick,
    instructions: 'Observe a sequência de cores e reproduza na mesma ordem.',
    objective: 'Fortalecer memória de trabalho visual'
  },

  // Raciocínio Lógico
  'pattern-logic': {
    id: 'pattern-logic',
    title: 'Padrões Lógicos',
    description: 'Identifique padrões em sequências de formas e cores.',
    category: 'Raciocínio Lógico',
    difficulty: 3,
    estimatedTime: '10-15 min',
    icon: Puzzle,
    instructions: 'Observe o padrão e escolha qual figura completa a sequência.',
    objective: 'Desenvolver pensamento analítico e reconhecimento de padrões'
  },

  // Planejamento e Estratégia
  'tower-hanoi': {
    id: 'tower-hanoi',
    title: 'Torre de Hanói',
    description: 'Mova todos os discos para a torre final seguindo as regras.',
    category: 'Planejamento e Estratégia',
    difficulty: 4,
    estimatedTime: '15-20 min',
    icon: Route,
    instructions: 'Mova os discos um por vez. Nunca coloque um disco maior sobre um menor.',
    objective: 'Desenvolver planejamento sequencial e resolução de problemas'
  },

  // Velocidade de Processamento
  'speed-match': {
    id: 'speed-match',
    title: 'Correspondência Rápida',
    description: 'Encontre pares correspondentes o mais rápido possível.',
    category: 'Velocidade de Processamento',
    difficulty: 2,
    estimatedTime: '5-8 min',
    icon: Timer,
    instructions: 'Clique nos símbolos iguais o mais rápido que conseguir.',
    objective: 'Melhorar velocidade de processamento visual'
  },

  // Linguagem e Compreensão
  'word-association': {
    id: 'word-association',
    title: 'Associação de Palavras',
    description: 'Encontre palavras relacionadas ao tema apresentado.',
    category: 'Linguagem e Compreensão',
    difficulty: 3,
    estimatedTime: '8-12 min',
    icon: BookOpen,
    instructions: 'Digite palavras que se relacionam com o tema mostrado.',
    objective: 'Desenvolver vocabulário e associações semânticas'
  }
}