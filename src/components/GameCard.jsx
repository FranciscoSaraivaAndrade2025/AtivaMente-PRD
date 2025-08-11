import React from 'react'
import { motion } from 'framer-motion'
import { Play, Star, Clock, Trophy } from 'lucide-react'

const GameCard = ({ game, onPlay, userProgress = null }) => {
  const { id, title, description, difficulty, estimatedTime, category, icon: Icon } = game
  
  const difficultyColors = {
    1: 'text-green-600 bg-green-100',
    2: 'text-yellow-600 bg-yellow-100',
    3: 'text-orange-600 bg-orange-100',
    4: 'text-red-600 bg-red-100',
    5: 'text-purple-600 bg-purple-100'
  }

  const difficultyLabels = {
    1: 'Muito Fácil',
    2: 'Fácil',
    3: 'Médio',
    4: 'Difícil',
    5: 'Muito Difícil'
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onPlay(game)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-primary-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play size={16} />
        </motion.button>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
              {difficultyLabels[difficulty]}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{estimatedTime}</span>
          </div>
        </div>

        {userProgress && (
          <div className="flex items-center space-x-1 text-primary-600">
            <Trophy className="w-4 h-4" />
            <span className="font-medium">{userProgress.bestScore || 0}</span>
          </div>
        )}
      </div>

      {userProgress && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progresso</span>
            <span>{userProgress.level || 1}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((userProgress.level || 1) / 10) * 100}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default GameCard