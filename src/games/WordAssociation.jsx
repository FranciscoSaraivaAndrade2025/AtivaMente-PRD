import { useState, useEffect } from 'react'
import { Send, CheckCircle, X, BookOpen } from 'lucide-react'

const WordAssociation = ({ onGameEnd }) => {
  const [currentTheme, setCurrentTheme] = useState('')
  const [userInput, setUserInput] = useState('')
  const [submittedWords, setSubmittedWords] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [gameActive, setGameActive] = useState(true)
  const [feedback, setFeedback] = useState(null)
  const [level, setLevel] = useState(1)

  const themes = [
    {
      theme: 'Animais',
      keywords: ['cachorro', 'gato', 'pássaro', 'peixe', 'cavalo', 'vaca', 'porco', 'galinha', 'ovelha', 'coelho', 'rato', 'elefante', 'leão', 'tigre', 'urso', 'lobo', 'raposa', 'veado', 'zebra', 'girafa'],
      difficulty: 1
    },
    {
      theme: 'Frutas',
      keywords: ['maçã', 'banana', 'laranja', 'uva', 'morango', 'abacaxi', 'manga', 'pêra', 'pêssego', 'melancia', 'melão', 'kiwi', 'limão', 'cereja', 'ameixa', 'coco', 'mamão', 'goiaba', 'açaí', 'caju'],
      difficulty: 1
    },
    {
      theme: 'Profissões',
      keywords: ['médico', 'professor', 'engenheiro', 'advogado', 'enfermeiro', 'policial', 'bombeiro', 'cozinheiro', 'motorista', 'vendedor', 'contador', 'dentista', 'veterinário', 'jornalista', 'artista', 'músico', 'escritor', 'programador', 'arquiteto', 'psicólogo'],
      difficulty: 2
    },
    {
      theme: 'Emoções',
      keywords: ['alegria', 'tristeza', 'raiva', 'medo', 'amor', 'ódio', 'ansiedade', 'felicidade', 'melancolia', 'euforia', 'nostalgia', 'esperança', 'desespero', 'gratidão', 'inveja', 'orgulho', 'vergonha', 'surpresa', 'curiosidade', 'compaixão'],
      difficulty: 3
    },
    {
      theme: 'Ciência',
      keywords: ['átomo', 'molécula', 'célula', 'dna', 'proteína', 'energia', 'gravidade', 'evolução', 'fotossíntese', 'microscópio', 'telescópio', 'laboratório', 'experimento', 'hipótese', 'teoria', 'pesquisa', 'descoberta', 'inovação', 'tecnologia', 'medicina'],
      difficulty: 4
    }
  ]

  // Selecionar tema baseado no nível
  const selectTheme = () => {
    const availableThemes = themes.filter(t => t.difficulty <= Math.min(level, 4))
    const selectedTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)]
    setCurrentTheme(selectedTheme)
    setSubmittedWords([])
  }

  // Inicializar jogo
  useEffect(() => {
    if (gameActive) {
      selectTheme()
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
          timeElapsed: 90,
          wordsFound: submittedWords.filter(w => w.isValid).length,
          accuracy: Math.round((submittedWords.filter(w => w.isValid).length / Math.max(submittedWords.length, 1)) * 100)
        })
      }, 1000)
    }
  }, [gameActive, timeLeft, score, submittedWords, onGameEnd])

  // Verificar se a palavra é válida
  const isValidWord = (word) => {
    const cleanWord = word.toLowerCase().trim()
    
    // Verificar se já foi submetida
    if (submittedWords.some(w => w.word.toLowerCase() === cleanWord)) {
      return { valid: false, reason: 'Palavra já utilizada' }
    }

    // Verificar se está na lista de palavras válidas
    if (currentTheme.keywords.includes(cleanWord)) {
      return { valid: true, reason: 'Palavra válida!' }
    }

    // Verificar associações simples (para tornar o jogo mais flexível)
    const associations = {
      'Animais': ['pet', 'bicho', 'animal', 'mamífero', 'réptil', 'ave', 'inseto'],
      'Frutas': ['fruta', 'doce', 'vitamina', 'suco', 'natural', 'orgânico'],
      'Profissões': ['trabalho', 'carreira', 'emprego', 'ofício', 'especialista'],
      'Emoções': ['sentimento', 'humor', 'estado', 'psicologia', 'mental'],
      'Ciência': ['pesquisa', 'estudo', 'conhecimento', 'método', 'análise']
    }

    const themeAssociations = associations[currentTheme.theme] || []
    if (themeAssociations.includes(cleanWord)) {
      return { valid: true, reason: 'Boa associação!' }
    }

    return { valid: false, reason: 'Palavra não relacionada ao tema' }
  }

  // Submeter palavra
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim() || !gameActive) return

    const validation = isValidWord(userInput)
    const newWord = {
      word: userInput.trim(),
      isValid: validation.valid,
      reason: validation.reason,
      id: Date.now()
    }

    setSubmittedWords(prev => [...prev, newWord])
    
    if (validation.valid) {
      const points = 10 + (currentTheme.difficulty * 5)
      setScore(prev => prev + points)
      setFeedback({ type: 'success', message: validation.reason })
      
      // Aumentar nível a cada 5 palavras válidas
      const validWords = submittedWords.filter(w => w.isValid).length + 1
      if (validWords % 5 === 0) {
        setLevel(prev => prev + 1)
        setTimeout(() => {
          selectTheme()
        }, 1500)
      }
    } else {
      setFeedback({ type: 'error', message: validation.reason })
    }

    setUserInput('')
    
    setTimeout(() => {
      setFeedback(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
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
            Associação de Palavras
          </h2>

          {/* Tema atual */}
          {currentTheme && (
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-2">Tema atual:</p>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {currentTheme.theme}
              </div>
              <p className="text-sm text-gray-500">
                Dificuldade: {currentTheme.difficulty}/4
              </p>
            </div>
          )}

          {/* Formulário de entrada */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Digite uma palavra relacionada..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={!gameActive}
              />
              <button
                type="submit"
                disabled={!userInput.trim() || !gameActive}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Enviar
              </button>
            </div>
          </form>

          {/* Feedback */}
          {feedback && (
            <div className={`text-center p-3 rounded-lg mb-4 ${
              feedback.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center justify-center gap-2">
                {feedback.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
            </div>
          )}

          {/* Palavras submetidas */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              Suas Palavras ({submittedWords.filter(w => w.isValid).length} válidas)
            </h3>
            <div className="flex flex-wrap gap-2 justify-center max-h-32 overflow-y-auto">
              {submittedWords.map((word) => (
                <span
                  key={word.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    word.isValid
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                  title={word.reason}
                >
                  {word.word}
                </span>
              ))}
            </div>
          </div>

          {/* Dica */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 text-center">
              <BookOpen className="inline w-5 h-5 mr-2" />
              Pense em palavras diretamente relacionadas ao tema ou conceitos associados!
            </p>
          </div>
        </div>
      </div>

      {/* Game Over */}
      {!gameActive && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <BookOpen className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tempo Esgotado!</h2>
            <div className="space-y-2 text-gray-600">
              <p>Pontuação Final: <span className="font-bold text-primary-600">{score}</span></p>
              <p>Palavras Válidas: <span className="font-bold text-green-600">
                {submittedWords.filter(w => w.isValid).length}
              </span></p>
              <p>Total de Tentativas: <span className="font-bold text-gray-600">
                {submittedWords.length}
              </span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WordAssociation