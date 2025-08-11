import { 
  Eye, 
  Brain, 
  Puzzle, 
  Target, 
  Zap, 
  BookOpen,
  Focus,
  MemoryStick,
  Calculator,
  Map,
  Timer,
  MessageSquare
} from 'lucide-react'

export const categories = [
  {
    id: 'attention',
    name: 'Atenção e Concentração',
    description: 'Desenvolva sua capacidade de foco e concentração',
    icon: Eye,
    color: 'bg-red-500',
    gradient: 'from-red-500 to-red-600'
  },
  {
    id: 'memory',
    name: 'Memória de Trabalho',
    description: 'Fortaleça sua memória de curto prazo',
    icon: Brain,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'logic',
    name: 'Raciocínio Lógico',
    description: 'Aprimore seu pensamento lógico e analítico',
    icon: Puzzle,
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'planning',
    name: 'Planejamento e Estratégia',
    description: 'Desenvolva habilidades de planejamento',
    icon: Target,
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'speed',
    name: 'Velocidade de Processamento',
    description: 'Aumente sua velocidade de raciocínio',
    icon: Zap,
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'language',
    name: 'Linguagem e Compreensão',
    description: 'Melhore suas habilidades linguísticas',
    icon: BookOpen,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600'
  }
]

export const games = {
  attention: [
    {
      id: 'focus-target',
      name: 'Alvo da Concentração',
      description: 'Clique apenas nos alvos corretos',
      icon: Focus,
      color: 'bg-red-500',
      difficulty: 'easy'
    }
  ],
  memory: [
    {
      id: 'memory-sequence',
      name: 'Sequência Memorável',
      description: 'Memorize e repita a sequência',
      icon: MemoryStick,
      color: 'bg-blue-500',
      difficulty: 'easy'
    }
  ],
  logic: [
    {
      id: 'number-pattern',
      name: 'Padrões Numéricos',
      description: 'Descubra o próximo número da sequência',
      icon: Calculator,
      color: 'bg-green-500',
      difficulty: 'easy'
    }
  ],
  planning: [
    {
      id: 'path-finder',
      name: 'Encontre o Caminho',
      description: 'Planeje a melhor rota até o objetivo',
      icon: Map,
      color: 'bg-purple-500',
      difficulty: 'easy'
    }
  ],
  speed: [
    {
      id: 'quick-math',
      name: 'Matemática Rápida',
      description: 'Resolva cálculos o mais rápido possível',
      icon: Timer,
      color: 'bg-yellow-500',
      difficulty: 'easy'
    }
  ],
  language: [
    {
      id: 'word-association',
      name: 'Associação de Palavras',
      description: 'Encontre palavras relacionadas',
      icon: MessageSquare,
      color: 'bg-indigo-500',
      difficulty: 'easy'
    }
  ]
}