import { useState, useEffect, useCallback } from 'react'
import { Timer, Zap } from 'lucide-react'

const SpeedMatch = ({ onGameEnd }) => {
  const [symbols, setSymbols] = useState([])
  const [targetSymbol, setTargetSymbol] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(true)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(0)

  const symbolList = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⭐', '❤️', '💎', '🔥', '⚡', '🌟']

  // Gerar símbolos aleatórios
  const generateSymbols = useCallback(() => {
    const gridSize = Math.min(4 + Math.floor(level / 3), 8) // Máximo 8x8
    const newSymbols = []
    const availableSymbols = symbolList.slice(0, Math.min(6 + level, symbolList.length))
    
    // Garantir que o símbolo alvo apareça pelo menos uma vez
    const target = availableSymbols[Math.floor(Math.random() * availableSymbols.length)]
    setTargetSymbol(target)
    
    // Preencher grid
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (i === 0) {
        newSymbols.push({ id: i, symbol: target, isTarget: true })
      } else {
        const symbol = availableSymbols[Math.floor(Math.random() * availableSymbols.length)]
        newSymbols.push({ id: i, symbol, isTarget: symbol === target })
      }
    }
    
    // Embaralhar
    for (let i = newSymbols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newSymbols[i], newSymbols[j]] = [newSymbols[j], newSymbols[i]]
    }
    
    setSymbols(newSymbols)
  }, [level])

  // Inicializar jogo
  useEffect(() => {
    if (gameActive) {
      generateSymbols()
    }
  }, [level, gameActive, generateSymbols])

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
          timeElapsed: 30,
          level,
          accuracy: Math.round((score / Math.max(score + streak, 1)) * 100)
        })
      }, 1000)
    }
  }, [gameActive, timeLeft, score, level, streak, onGameEnd])

  // Lidar com clique
  const handleSymbolClick = (clickedSymbol) => {
    if (!gameActive) return

    if (clickedSymbol.isTarget) {
      // Acerto
      const points = 10 + (streak * 2) + (level * 5)
      setScore(prev => prev + points)
      setStreak(prev => prev + 1)
      
      // Aumentar nível a cada 10 acertos
      if ((score + points) % 100 === 0) {
        setLevel(prev => prev + 1)
      }
      
      // Gerar novos símbolos
      setTimeout(() => {
        generateSymbols()
      }, 200)
    } else {
      // Erro
      setStreak(0)
      setScore(prev => Math.max(0, prev - 5))
    }
  }

  const gridSize = Math.min(4 + Math.floor(level / 3), 8)

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-4">
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Correspondência Rápida
          </h2>

          {/* Símbolo alvo */}
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">Encontre todos os símbolos iguais a:</p>
            <div className="text-6xl mb-2">{targetSymbol}</div>
            {streak > 0 && (
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <Zap className="w-5 h-5" />
                <span className="font-bold">Sequência: {streak}</span>
              </div>
            )}
          </div>

          {/* Grid de símbolos */}
          <div 
            className="grid gap-2 mx-auto max-w-lg"
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` 
            }}
          >
            {symbols.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSymbolClick(item)}
                className="aspect-square bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary-300 rounded-lg transition-all duration-150 text-2xl md:text-3xl flex items-center justify-center hover:scale-105 active:scale-95"
              >
                {item.symbol}
              </button>
            ))}
          </div>

          {/* Instruções */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 text-center">
              <Timer className="inline w-5 h-5 mr-2" />
              Clique rapidamente em todos os símbolos que correspondem ao alvo!
            </p>
          </div>
        </div>
      </div>

      {/* Game Over */}
      {!gameActive && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tempo Esgotado!</h2>
            <div className="space-y-2 text-gray-600">
              <p>Pontuação Final: <span className="font-bold text-primary-600">{score}</span></p>
              <p>Nível Alcançado: <span className="font-bold text-secondary-600">{level}</span></p>
              <p>Melhor Sequência: <span className="font-bold text-orange-600">{streak}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpeedMatch