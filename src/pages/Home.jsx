import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { categories } from '../data/games'
import Mascot from '../components/Mascot'
import AIAssistant from '../components/AIAssistant'
import { LogOut, User, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('Bom dia')
    } else if (hour < 18) {
      setGreeting('Boa tarde')
    } else {
      setGreeting('Boa noite')
    }
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Mascot size="small" animate={false} />
              <h1 className="text-xl font-bold text-gray-800">AtivaMente</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.user_metadata?.full_name || user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Saudação com Mascote */}
        <div className="text-center mb-12">
          <Mascot size="large" animate={true} className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {greeting}, {user?.user_metadata?.full_name?.split(' ')[0] || 'Usuário'}! 👋
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Pronto para exercitar sua mente hoje?
          </p>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-gray-700">
              🧠 <strong>Dica do AtivaMente:</strong> A consistência é mais importante que a intensidade. 
              Pratique um pouco todos os dias para melhores resultados!
            </p>
          </div>
        </div>

        {/* Categorias de Jogos */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Escolha uma categoria para começar
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {category.name}
                </h4>
                
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>1 jogo disponível</span>
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Seu Progresso
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">0</div>
              <div className="text-gray-600">Jogos Completados</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">0</div>
              <div className="text-gray-600">Conquistas</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <div className="text-gray-600">Dias Consecutivos</div>
            </div>
          </div>
        </div>
      </main>

      {/* Assistente IA */}
      <AIAssistant context="general" />
    </div>
  )
}

export default Home