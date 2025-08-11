import React from 'react'
import Mascot from './Mascot'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <Mascot size="large" animate={true} className="mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AtivaMente</h2>
        <p className="text-gray-600 mb-4">Carregando sua experiência de aprendizado...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner