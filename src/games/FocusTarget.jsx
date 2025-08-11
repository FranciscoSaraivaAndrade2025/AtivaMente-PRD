import { useState, useEffect, useCallback } from 'react'
import { Target, X, CheckCircle } from 'lucide-react'

const FocusTarget = ({ onGameEnd }) => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [targets, setTargets] = useState([])
  const [gameActive, setGameActive] = useState(true)
  const [level, setLevel] = useState(1)

  // Gerar posição aleatória para alvos
  const generateRandomPosition = () => ({
    x: Math.random() * 80 + 5, // 5% a 85% da largura
    y: Math.random() * 70 + 10, // 10% a 80% da altura
  })

  // Criar novo alvo
  const createTarget = useCallback(() => {
    const newTarget = {
      id: Date.now() + Math.random(),
      position: generateRandomPosition(),
      isCorrect: Math.random() > 0.3, // 70% chance de ser correto
      timeToLive: 3000 + (level * 500), // Alvos ficam mais tempo em níveis maiores
    }
    
    setTargets(prev => [...prev, newTarget])
    
    // Remove o alvo após o tempo de vida
    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== newTarget.id))
    }, newTarget.timeToLive)
  }, [level])

  // Iniciar jogo
  useEffect(() => {
    if (!gameActive) return

    const targetInterval = setInterval(() => {
      createTarget()
    }, Math.max(1000 - (level * 100), 500)) // Alvos aparecem mais rápido com o nível

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(targetInterval)
      clearInterval(timerInterval)
    }
  }, [gameActive, level, createTarget])

  // Aumentar nível baseado na pontuação
  useEffect(() => {
    const newLevel = Math.floor(score / 10) + 1
    if (newLevel > level) {
      setLevel(newLevel)
    }
  }, [score, level])

  // Finalizar jogo
  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      setTimeout(() => {
        onGameEnd({
          score,
          timeElapsed: 30,
          accuracy: score > 0 ? Math.round((score / (score + Math.max(0, score * 0.3))) * 100) : 0
        })
      }, 1000)
    }
  }, [gameActive, timeLeft, score, onGameEnd])

  const handleTargetClick = (target) => {
    setTargets(prev => prev.filter(t => t.id !== target.id))
    
    if (target.isCorrect) {
      setScore(prev => prev + 10)
    } else {
      setScore(prev => Math.max(0, prev - 5))
    }
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden">
      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">Pontos: {score}</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">Nível: {level}</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">Tempo: {timeLeft}s</span>
        </div>
      </div>

      {/* Instruções */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-lg px-6 py-3 shadow-lg">
          <p className="text-center text-gray-700">
            <Target className="inline w-5 h-5 text-green-600 mr-2" />
            Clique nos alvos <span className="text-green-600 font-semibold">VERDES</span>
            <X className="inline w-5 h-5 text-red-600 mx-2" />
            Evite os <span className="text-red-600 font-semibold">VERMELHOS</span>
          </p>
        </div>
      </div>

      {/* Área de jogo */}
      <div className="relative w-full h-full">
        {targets.map((target) => (
          <button
            key={target.id}
            onClick={() => handleTargetClick(target)}
            className={`absolute w-16 h-16 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
              target.isCorrect
                ? 'bg-green-500 border-green-600 hover:bg-green-600'
                : 'bg-red-500 border-red-600 hover:bg-red-600'
            } shadow-lg animate-pulse`}
            style={{
              left: `${target.position.x}%`,
              top: `${target.position.y}%`,
            }}
          >
            {target.isCorrect ? (
              <Target className="w-8 h-8 text-white mx-auto" />
            ) : (
              <X className="w-8 h-8 text-white mx-auto" />
            )}
          </button>
        ))}
      </div>

      {/* Game Over */}
      {!gameActive && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Jogo Finalizado!</h2>
            <div className="space-y-2 text-gray-600">
              <p>Pontuação Final: <span className="font-bold text-primary-600">{score}</span></p>
              <p>Nível Alcançado: <span className="font-bold text-secondary-600">{level}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FocusTarget