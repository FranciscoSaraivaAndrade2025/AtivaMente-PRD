import { useState, useEffect } from 'react'
import { RotateCcw, Trophy } from 'lucide-react'

const TowerHanoi = ({ onGameEnd }) => {
  const [towers, setTowers] = useState([[], [], []])
  const [selectedDisk, setSelectedDisk] = useState(null)
  const [selectedTower, setSelectedTower] = useState(null)
  const [moves, setMoves] = useState(0)
  const [level, setLevel] = useState(3) // Número de discos
  const [gameWon, setGameWon] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Inicializar jogo
  const initializeGame = () => {
    const initialTower = []
    for (let i = level; i >= 1; i--) {
      initialTower.push(i)
    }
    setTowers([initialTower, [], []])
    setSelectedDisk(null)
    setSelectedTower(null)
    setMoves(0)
    setGameWon(false)
    setStartTime(Date.now())
    setTimeElapsed(0)
  }

  // Timer
  useEffect(() => {
    if (!startTime || gameWon) return

    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime, gameWon])

  // Inicializar quando o componente monta
  useEffect(() => {
    initializeGame()
  }, [level])

  // Verificar vitória
  useEffect(() => {
    if (towers[2].length === level && towers[2].length > 0) {
      setGameWon(true)
      const finalTime = Math.floor((Date.now() - startTime) / 1000)
      
      setTimeout(() => {
        onGameEnd({
          score: Math.max(1000 - (moves * 10) - finalTime, 100),
          moves,
          timeElapsed: finalTime,
          level,
          accuracy: Math.round((Math.pow(2, level) - 1) / Math.max(moves, 1) * 100)
        })
      }, 2000)
    }
  }, [towers, level, moves, startTime, onGameEnd])

  // Lidar com clique na torre
  const handleTowerClick = (towerIndex) => {
    const tower = towers[towerIndex]

    if (selectedTower === null) {
      // Selecionar torre de origem
      if (tower.length > 0) {
        setSelectedTower(towerIndex)
        setSelectedDisk(tower[tower.length - 1])
      }
    } else {
      // Tentar mover disco
      if (selectedTower === towerIndex) {
        // Cancelar seleção
        setSelectedTower(null)
        setSelectedDisk(null)
      } else {
        // Verificar se o movimento é válido
        const sourceTower = towers[selectedTower]
        const targetTower = towers[towerIndex]
        const diskToMove = sourceTower[sourceTower.length - 1]

        if (targetTower.length === 0 || diskToMove < targetTower[targetTower.length - 1]) {
          // Movimento válido
          const newTowers = [...towers]
          newTowers[selectedTower] = sourceTower.slice(0, -1)
          newTowers[towerIndex] = [...targetTower, diskToMove]
          
          setTowers(newTowers)
          setMoves(prev => prev + 1)
        }

        setSelectedTower(null)
        setSelectedDisk(null)
      }
    }
  }

  // Renderizar disco
  const renderDisk = (size, isSelected = false) => {
    const colors = {
      1: 'bg-red-500',
      2: 'bg-blue-500',
      3: 'bg-green-500',
      4: 'bg-yellow-500',
      5: 'bg-purple-500',
      6: 'bg-pink-500'
    }

    const widths = {
      1: 'w-12',
      2: 'w-16',
      3: 'w-20',
      4: 'w-24',
      5: 'w-28',
      6: 'w-32'
    }

    return (
      <div
        className={`h-8 ${widths[size]} ${colors[size]} rounded-lg border-2 ${
          isSelected ? 'border-yellow-400 shadow-lg' : 'border-gray-300'
        } transition-all duration-200 flex items-center justify-center text-white font-bold text-sm`}
      >
        {size}
      </div>
    )
  }

  // Renderizar torre
  const renderTower = (towerIndex) => {
    const tower = towers[towerIndex]
    const isEmpty = tower.length === 0
    const isSelected = selectedTower === towerIndex

    return (
      <div
        onClick={() => handleTowerClick(towerIndex)}
        className={`flex flex-col items-center justify-end h-64 w-40 cursor-pointer p-2 rounded-lg border-2 transition-all duration-200 ${
          isSelected 
            ? 'border-yellow-400 bg-yellow-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        {/* Haste */}
        <div className="w-2 bg-gray-600 h-48 rounded-t-lg mb-2" />
        
        {/* Discos */}
        <div className="flex flex-col items-center gap-1 absolute bottom-4">
          {tower.map((diskSize, index) => (
            <div key={index}>
              {renderDisk(diskSize, selectedDisk === diskSize && isSelected)}
            </div>
          ))}
        </div>

        {/* Base */}
        <div className="w-36 h-4 bg-gray-600 rounded-lg" />
        
        {/* Label */}
        <div className="mt-2 text-sm font-medium text-gray-600">
          Torre {towerIndex + 1}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      {/* HUD */}
      <div className="absolute top-20 left-4 right-4 flex justify-between items-center">
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">Movimentos: {moves}</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">Discos: {level}</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <span className="text-lg font-bold text-gray-800">Tempo: {timeElapsed}s</span>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Torre de Hanói
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Mova todos os discos para a Torre 3. Regra: nunca coloque um disco maior sobre um menor.
          </p>

          {/* Torres */}
          <div className="flex justify-center gap-8 mb-8">
            {[0, 1, 2].map(towerIndex => renderTower(towerIndex))}
          </div>

          {/* Controles */}
          <div className="flex justify-center gap-4">
            <button
              onClick={initializeGame}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reiniciar
            </button>
            
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Discos:</label>
              <select
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={moves > 0}
              >
                <option value={3}>3 (Fácil)</option>
                <option value={4}>4 (Médio)</option>
                <option value={5}>5 (Difícil)</option>
                <option value={6}>6 (Muito Difícil)</option>
              </select>
            </div>
          </div>

          {/* Dica */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 text-center">
              <strong>Dica:</strong> O número mínimo de movimentos para {level} discos é {Math.pow(2, level) - 1}
            </p>
          </div>
        </div>
      </div>

      {/* Vitória */}
      {gameWon && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Parabéns!</h2>
            <div className="space-y-2 text-gray-600">
              <p>Você completou a Torre de Hanói!</p>
              <p>Movimentos: <span className="font-bold">{moves}</span></p>
              <p>Tempo: <span className="font-bold">{timeElapsed}s</span></p>
              <p>Mínimo possível: <span className="font-bold">{Math.pow(2, level) - 1} movimentos</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TowerHanoi