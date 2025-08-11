import React from 'react'
import { motion } from 'framer-motion'

const Mascot = ({ size = 'large', animate = true, className = '' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
    xl: 'w-48 h-48'
  }

  const MascotSVG = () => (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cérebro base */}
      <path
        d="M100 20C140 20 170 50 170 90C170 130 140 160 100 160C60 160 30 130 30 90C30 50 60 20 100 20Z"
        fill="url(#brainGradient)"
        stroke="#0369a1"
        strokeWidth="3"
      />
      
      {/* Sulcos do cérebro */}
      <path
        d="M50 70C70 65 90 70 110 65C130 70 150 65 170 70"
        stroke="#0284c7"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M40 100C60 95 80 100 100 95C120 100 140 95 160 100"
        stroke="#0284c7"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M45 130C65 125 85 130 105 125C125 130 145 125 165 130"
        stroke="#0284c7"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Olhos */}
      <circle cx="75" cy="85" r="8" fill="white" />
      <circle cx="125" cy="85" r="8" fill="white" />
      <circle cx="75" cy="85" r="5" fill="#1e40af" />
      <circle cx="125" cy="85" r="5" fill="#1e40af" />
      <circle cx="77" cy="83" r="2" fill="white" />
      <circle cx="127" cy="83" r="2" fill="white" />
      
      {/* Boca sorridente */}
      <path
        d="M85 110C90 120 110 120 115 110"
        stroke="#0369a1"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Braços musculosos */}
      <ellipse cx="45" cy="120" rx="15" ry="25" fill="url(#armGradient)" transform="rotate(-20 45 120)" />
      <ellipse cx="155" cy="120" rx="15" ry="25" fill="url(#armGradient)" transform="rotate(20 155 120)" />
      
      {/* Halteres */}
      <rect x="25" y="105" width="8" height="30" fill="#4b5563" rx="4" transform="rotate(-20 29 120)" />
      <rect x="167" y="105" width="8" height="30" fill="#4b5563" rx="4" transform="rotate(20 171 120)" />
      <circle cx="25" cy="110" r="6" fill="#6b7280" transform="rotate(-20 29 120)" />
      <circle cx="25" cy="130" r="6" fill="#6b7280" transform="rotate(-20 29 120)" />
      <circle cx="175" cy="110" r="6" fill="#6b7280" transform="rotate(20 171 120)" />
      <circle cx="175" cy="130" r="6" fill="#6b7280" transform="rotate(20 171 120)" />
      
      {/* Gradientes */}
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  )

  if (!animate) {
    return <MascotSVG />
  }

  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <MascotSVG />
    </motion.div>
  )
}

export default Mascot