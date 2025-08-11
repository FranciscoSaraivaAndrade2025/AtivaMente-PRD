import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const MemorySequence = ({ onGameEnd }) => {
  const [sequence, setSequence] = useState([])
  const [playerSequence, setPlayerSequence] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState('waiting') // waiting, showing, playing, ended
  const [activeButton, setActiveButton] = useState(null)

  const colors = [
    { id: 0, color: 'bg-red-500', activeColor: 'bg-red-300', name: 'Vermelho' },
    { id: 1, color: 'bg-blue-500', activeColor: 'bg-blue-300', name: 'Azul' },
    { id: 2, color: 'bg-green-500', activeColor: 'bg-green-300', name: 'Verde' },
    { id: 3, color: 'bg-yellow-500', activeColor: 'bg-yellow-300', name: 'Amarelo' }
  ]

  // Gerar nova sequência
  const generateSequence = useCallback(() => {
    const newSequence = []
    const sequenceLength = Math.min(3 + level, 10) // Máximo 10 elementos
    
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(Math.floor(Math.random() * 4))
    }
    
    setSequence(newSequence)
    setPlayerSequence([])
    setCurrentStep(0)
  }, [level])

  // Mostrar sequência para o jogador
  const showSequence = useCallback(async () => {
    setGameState('showing')
    setIsPlayerTurn(false)
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setActiveButton(sequence[i])
      await new Promise(resolve => setTimeout(resolve, 400))
      setActiveButton(null)
    }
    
    setGameState('playing')
    setIsPlayerTurn(true)
  }, [sequence])

  // Iniciar novo jogo
  const startGame = () => {
    setGameState('waiting')
    setScore(0)
    setLevel(1)
    generateSequence()
  }

  // Iniciar nova rodada
  useEffect(() => {
    if (sequence.length > 0 && gameState === 'waiting') {
      showSequence()
    }
  }, [sequence, gameState, showSequence])

  // Gerar sequência quando o nível muda
  useEffect(() => {
    if (level > 1) {
      generateSequence()
    }
  }, [level, generateSequence])

  // Lidar com clique do jogador
  const handleColorClick = (colorId) => {
    if (!isPlayerTurn || gameState !== 'playing') return

    const newPlayerSequence = [...playerSequence, colorId]
    setPlayerSequence(newPlayerSequence)

    // Verificar se o clique está correto
    if (colorId !== sequence[newPlayerSequence.length - 1]) {
      // Erro - fim de jogo
      setGameState('ended')
      setTimeout(() => {
        onGameEnd({
          score,
          level,
          timeElapsed: level * 10, // Estimativa
          accuracy: Math.round((score / Math.max(score + 1, 1)) * 100)
        })
      }, 1000)
      return
    }

    // Se completou a sequência corretamente
    if (newPlayerSequence.length === sequence.length) {
      const points = sequence.length * 10
      setScore(prev => prev + points)
      setLevel(prev => prev + 1)
      setPlayerSequence([])
      setGameState('waiting')
      
      // Pequena pausa antes da próxima rodada
      setTimeout(() => {
        generateSequence()
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      {/* HUD */}
      <div className="absolute top-20 left-4 right-4 flex justify-between items-center">
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">Pontos: {score}</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">Nível: {level}</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">
            Sequência: {sequence.length}
          </span>
        </div>
      </div>

      {/* Instruções */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sequência de Memória</h2>
        <div className="bg-white rounded-lg px-6 py-4 shadow-lg max-w-md">
          <p className="text-gray-700">
            {gameState === 'waiting' && 'Preparando sequência...'}
            {gameState === 'showing' && 'Observe a sequência de cores'}
            {gameState === 'playing' && 'Repita a sequência clicando nas cores'}
            {gameState === 'ended' && 'Jogo finalizado!'}
          </p>
        </div>
      </div>

      {/* Botões de cores */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorClick(color.id)}
            disabled={!isPlayerTurn || gameState !== 'playing'}
            className={`w-24 h-24 rounded-lg border-4 border-gray-300 transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed ${
              activeButton === color.id ? color.activeColor : color.color
            } ${
              activeButton === color.id ? 'scale-110 shadow-lg' : ''
            }`}
          >
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>

      {/* Progresso da sequência do jogador */}
      {isPlayerTurn && (
        <div className="bg-white rounded-lg px-6 py-3 shadow-lg">
          <p className="text-center text-gray-700">
            Progresso: {playerSequence.length} / {sequence.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(playerSequence.length / sequence.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Botão de início */}
      {gameState === 'ended' && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Fim de Jogo!</h3>
            <div className="space-y-2 text-gray-600 mb-6">
              <p>Pontuação Final: <span className="font-bold text-primary-600">{score}</span></p>
              <p>Nível Alcançado: <span className="font-bold text-secondary-600">{level}</span></p>
            </div>
            <button
              onClick={startGame}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Jogar Novamente
            </button>
          </div>
        </div>
      )}

      {/* Botão inicial */}
      {sequence.length === 0 && (
        <button
          onClick={startGame}
          className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
        >
          <Play className="w-6 h-6" />
          Iniciar Jogo
        </button>
      )}
    </div>
  )
}

export default MemorySequence