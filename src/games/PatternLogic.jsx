import { useState, useEffect } from 'react'
import { CheckCircle, X, RotateCcw } from 'lucide-react'

const PatternLogic = ({ onGameEnd }) => {
  const [currentPattern, setCurrentPattern] = useState(null)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(true)
  const [feedback, setFeedback] = useState(null)

  const shapes = ['circle', 'square', 'triangle', 'diamond']
  const colors = ['red', 'blue', 'green', 'yellow', 'purple']

  // Gerar padrão baseado no nível
  const generatePattern = () => {
    const patternLength = Math.min(3 + Math.floor(level / 2), 6)
    const pattern = []
    
    // Tipos de padrão: cor, forma, ou ambos
    const patternType = Math.random()
    
    if (patternType < 0.4) {
      // Padrão de cores
      const baseColor = colors[Math.floor(Math.random() * colors.length)]
      const baseShape = shapes[Math.floor(Math.random() * shapes.length)]
      
      for (let i = 0; i < patternLength; i++) {
        pattern.push({
          shape: baseShape,
          color: colors[i % colors.length],
          id: i
        })
      }
    } else if (patternType < 0.8) {
      // Padrão de formas
      const baseColor = colors[Math.floor(Math.random() * colors.length)]
      
      for (let i = 0; i < patternLength; i++) {
        pattern.push({
          shape: shapes[i % shapes.length],
          color: baseColor,
          id: i
        })
      }
    } else {
      // Padrão alternado
      for (let i = 0; i < patternLength; i++) {
        pattern.push({
          shape: shapes[i % 2],
          color: colors[i % 2],
          id: i
        })
      }
    }

    // Gerar próximo item do padrão
    const nextItem = {
      shape: pattern[0].shape === pattern[1]?.shape ? pattern[0].shape : shapes[patternLength % shapes.length],
      color: pattern[0].color === pattern[1]?.color ? pattern[0].color : colors[patternLength % colors.length],
      id: patternLength
    }

    // Se é padrão de cores, manter forma
    if (pattern.every(item => item.shape === pattern[0].shape)) {
      nextItem.shape = pattern[0].shape
      nextItem.color = colors[patternLength % colors.length]
    }
    
    // Se é padrão de formas, manter cor
    if (pattern.every(item => item.color === pattern[0].color)) {
      nextItem.color = pattern[0].color
      nextItem.shape = shapes[patternLength % shapes.length]
    }

    setCurrentPattern({ sequence: pattern, answer: nextItem })
    generateOptions(nextItem)
  }

  // Gerar opções de resposta
  const generateOptions = (correctAnswer) => {
    const optionsList = [correctAnswer]
    
    // Gerar 3 opções incorretas
    while (optionsList.length < 4) {
      const wrongOption = {
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        id: Math.random()
      }
      
      // Evitar duplicatas
      if (!optionsList.some(opt => opt.shape === wrongOption.shape && opt.color === wrongOption.color)) {
        optionsList.push(wrongOption)
      }
    }
    
    // Embaralhar opções
    setOptions(optionsList.sort(() => Math.random() - 0.5))
  }

  // Iniciar jogo
  useEffect(() => {
    if (gameActive) {
      generatePattern()
    }
  }, [level, gameActive])

  // Timer
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, timeLeft])

  // Finalizar jogo
  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      setTimeout(() => {
        onGameEnd({
          score,
          level,
          timeElapsed: 60,
          accuracy: Math.round((score / Math.max(level, 1)) * 100)
        })
      }, 1000)
    }
  }, [gameActive, timeLeft, score, level, onGameEnd])

  // Lidar com resposta
  const handleAnswer = (selectedOption) => {
    if (!gameActive) return

    const isCorrect = selectedOption.shape === currentPattern.answer.shape && 
                     selectedOption.color === currentPattern.answer.color

    if (isCorrect) {
      setScore(prev => prev + (10 * level))
      setLevel(prev => prev + 1)
      setFeedback({ type: 'correct', message: 'Correto! Padrão identificado!' })
    } else {
      setFeedback({ type: 'incorrect', message: 'Incorreto. Tente observar melhor o padrão.' })
    }

    setTimeout(() => {
      setFeedback(null)
      if (isCorrect) {
        generatePattern()
      }
    }, 1500)
  }

  // Renderizar forma
  const renderShape = (item, size = 'w-12 h-12') => {
    const colorClasses = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500'
    }

    const baseClasses = `${size} ${colorClasses[item.color]} border-2 border-gray-300`

    switch (item.shape) {
      case 'circle':
        return <div className={`${baseClasses} rounded-full`} />
      case 'square':
        return <div className={`${baseClasses} rounded-lg`} />
      case 'triangle':
        return (
          <div className={`${size} relative`}>
            <div 
              className={`absolute inset-0 ${colorClasses[item.color]} border-2 border-gray-300`}
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />
          </div>
        )
      case 'diamond':
        return (
          <div className={`${size} relative`}>
            <div 
              className={`absolute inset-0 ${colorClasses[item.color]} border-2 border-gray-300 transform rotate-45`}
              style={{ borderRadius: '8px' }}
            />
          </div>
        )
      default:
        return <div className={`${baseClasses} rounded-lg`} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      {/* HUD */}
      <div className="absolute top-20 left-4 right-4 flex justify-between items-center">
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

      {/* Área principal */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Padrões Lógicos
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Observe o padrão e escolha qual figura completa a sequência
          </p>

          {/* Sequência do padrão */}
          {currentPattern && (
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                {currentPattern.sequence.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {renderShape(item, 'w-16 h-16')}
                  </div>
                ))}
                <div className="text-4xl font-bold text-gray-400 mx-4">?</div>
              </div>

              {/* Opções de resposta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={!!feedback}
                    className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {renderShape(option, 'w-12 h-12')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`text-center p-4 rounded-lg mb-4 ${
              feedback.type === 'correct' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center justify-center gap-2">
                {feedback.type === 'correct' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Game Over */}
      {!gameActive && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tempo Esgotado!</h2>
            <div className="space-y-2 text-gray-600 mb-6">
              <p>Pontuação Final: <span className="font-bold text-primary-600">{score}</span></p>
              <p>Nível Alcançado: <span className="font-bold text-secondary-600">{level}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatternLogic