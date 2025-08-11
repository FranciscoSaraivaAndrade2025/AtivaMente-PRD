import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { categories, games } from '../data/games'
import GameCard from '../components/GameCard'
import AIAssistant from '../components/AIAssistant'
import Mascot from '../components/Mascot'

const Category = () => {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  
  const category = categories.find(cat => cat.id === categoryId)
  const categoryGames = games[categoryId] || []

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Categoria não encontrada</h2>
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

  const handlePlayGame = (game) => {
    navigate(`/game/${categoryId}/${game.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho da Categoria */}
        <div className="text-center mb-12">
          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
            <category.icon className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {category.name}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {category.description}
          </p>

          {/* Mensagem do Assistente */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Mascot size="small" animate={true} />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Dica do AtivaMente para {category.name}:
                </h3>
                <p className="text-gray-700">
                  {getCategoryTip(categoryId)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Jogos */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Jogos Disponíveis ({categoryGames.length})
          </h2>
          
          {categoryGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={handlePlayGame}
                  userStats={{}} // TODO: Implementar estatísticas do usuário
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <category.icon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Jogos em desenvolvimento
              </h3>
              <p className="text-gray-500">
                Novos jogos para esta categoria serão adicionados em breve!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Assistente IA com contexto da categoria */}
      <AIAssistant context={categoryId} />
    </div>
  )
}

// Função para obter dicas específicas por categoria
const getCategoryTip = (categoryId) => {
  const tips = {
    attention: "Mantenha o foco no objetivo principal e ignore distrações. Respire fundo antes de começar cada desafio.",
    memory: "Tente criar associações mentais ou padrões visuais para lembrar melhor das informações.",
    logic: "Analise o problema passo a passo. Não tenha pressa - o raciocínio lógico requer paciência e método.",
    planning: "Antes de agir, visualize todo o processo. Divida tarefas complexas em etapas menores e mais gerenciáveis.",
    speed: "A precisão é mais importante que a velocidade. Com a prática, você naturalmente ficará mais rápido.",
    language: "Leia com atenção e pense no contexto. A compreensão é fundamental para uma boa comunicação."
  }
  
  return tips[categoryId] || "Pratique regularmente para obter melhores resultados!"
}

export default Category