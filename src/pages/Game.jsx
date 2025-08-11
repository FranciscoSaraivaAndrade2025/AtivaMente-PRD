import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { games } from '../data/games'
import FocusTarget from '../games/FocusTarget'
import MemorySequence from '../games/MemorySequence'
import PatternLogic from '../games/PatternLogic'
import TowerHanoi from '../games/TowerHanoi'
import SpeedMatch from '../games/SpeedMatch'
import WordAssociation from '../games/WordAssociation'
import AIAssistant from '../components/AIAssistant'
import { useState } from 'react'

const Game = () => {
  const { categoryId, gameId } = useParams()
  const navigate = useNavigate()
  const [gameResults, setGameResults] = useState(null)
  
  const game = games[gameId]

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Jogo não encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  const renderGame = () => {
    const gameProps = {
      onGameEnd: setGameResults
    }

    switch (gameId) {
      case 'focus-target':
        return <FocusTarget {...gameProps} />
      case 'memory-sequence':
        return <MemorySequence {...gameProps} />
      case 'pattern-logic':
        return <PatternLogic {...gameProps} />
      case 'tower-hanoi':
        return <TowerHanoi {...gameProps} />
      case 'speed-match':
        return <SpeedMatch {...gameProps} />
      case 'word-association':
        return <WordAssociation {...gameProps} />
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Jogo em desenvolvimento
              </h2>
              <p className="text-gray-600 mb-4">
                Este jogo será implementado em breve!
              </p>
              <button
                onClick={() => navigate(`/category/${categoryId}`)}
                className="btn-primary"
              >
                Voltar à categoria
              </button>
            </div>
          </div>
        )
    }
  }

  if (gameResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Parabéns! 🎉
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-primary-50 rounded-lg p-4">
              <h3 className="font-semibold text-primary-800 mb-2">Seus Resultados:</h3>
              <div className="space-y-2 text-sm">
                <p>Pontuação: <span className="font-bold">{gameResults.score}</span></p>
                <p>Tempo: <span className="font-bold">{gameResults.timeElapsed}s</span></p>
                {gameResults.accuracy && (
                  <p>Precisão: <span className="font-bold">{gameResults.accuracy}%</span></p>
                )}
              </div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-4">
              <h3 className="font-semibold text-secondary-800 mb-2">Feedback do AtivaMente:</h3>
              <p className="text-sm text-secondary-700">
                {getGameFeedback(gameResults.score, game.difficulty)}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setGameResults(null)}
              className="flex-1 btn-secondary"
            >
              Jogar Novamente
            </button>
            <button
              onClick={() => navigate(`/category/${categoryId}`)}
              className="flex-1 btn-primary"
            >
              Outros Jogos
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header do jogo */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(`/category/${categoryId}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            
            <div className="text-center">
              <h1 className="font-semibold text-gray-800">{game.title}</h1>
              <p className="text-sm text-gray-500">{game.category}</p>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Início</span>
            </button>
          </div>
        </div>
      </header>

      {/* Área do jogo */}
      <main className="pt-16">
        {renderGame()}
      </main>

      {/* Assistente IA com contexto do jogo */}
      <AIAssistant context={gameId} />
    </div>
  )
}

// Função para gerar feedback baseado na performance
const getGameFeedback = (score, difficulty) => {
  const feedbacks = {
    excellent: [
      "Excelente trabalho! Sua concentração e estratégia foram perfeitas!",
      "Impressionante! Você demonstrou grande habilidade cognitiva!",
      "Fantástico! Continue assim e você alcançará níveis ainda maiores!"
    ],
    good: [
      "Muito bem! Você está no caminho certo para dominar esta habilidade!",
      "Bom trabalho! Com mais prática, você ficará ainda melhor!",
      "Parabéns! Sua dedicação está dando frutos!"
    ],
    average: [
      "Bom esforço! Lembre-se: cada tentativa é um passo em direção à melhoria!",
      "Continue praticando! O desenvolvimento cognitivo é um processo gradual!",
      "Você está aprendendo! Tente identificar padrões para melhorar sua estratégia!"
    ],
    needsImprovement: [
      "Não desista! Grandes conquistas começam com pequenos passos!",
      "Continue tentando! Cada erro é uma oportunidade de aprendizado!",
      "Persista! O cérebro se fortalece com os desafios!"
    ]
  }

  let category = 'needsImprovement'
  const baseScore = difficulty * 20

  if (score >= baseScore * 2) category = 'excellent'
  else if (score >= baseScore * 1.5) category = 'good'
  else if (score >= baseScore) category = 'average'

  const messages = feedbacks[category]
  return messages[Math.floor(Math.random() * messages.length)]
}

export default Game