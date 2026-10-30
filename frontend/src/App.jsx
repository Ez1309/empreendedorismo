import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SearchSidebar from './components/filtros/SearchSidebar';
import VagaCard from './components/vagas/VagaCard';
import VagaDetalhes from './pages/VagaDetalhes';
import { useVagas } from './hooks/useVagas';
import { useTheme } from './context/ThemeContext';
import { 
  Search,
  SearchX,
  Compass,
  LayoutGrid,
  List
} from 'lucide-react';

export default function App() {
  const { vagas, totalVagas, filtros, setFiltros } = useVagas();
  const { tema, isDarkMode, layoutMode, setLayoutMode } = useTheme();
  const [vagaIdUrl, setVagaIdUrl] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('vaga');
    if (id) {
      setVagaIdUrl(id);
    }
  }, []);

  if (vagaIdUrl) {
    return <VagaDetalhes vagaId={vagaIdUrl} />;
  }

  return (
    <div 
      className="flex flex-col min-h-screen font-sans transition-colors duration-300"
      style={{
        backgroundColor: tema.bg,
        color: tema.text
      }}
    >
      <Header />

      {/* Banner Hero: Verde UFLA no Light / Space Indigo com Verde Pastel no Dark */}
      <section 
        className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 transition-colors duration-300 border-b"
        style={{
          backgroundColor: tema.heroBg,
          color: tema.heroText,
          borderColor: isDarkMode ? tema.border : 'transparent'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold mb-4 backdrop-blur-sm shadow-sm"
            style={{
              backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.12)' : 'rgba(255, 255, 255, 0.15)',
              color: isDarkMode ? tema.heroAccent : '#FFFFFF',
              border: isDarkMode ? `1px solid ${tema.heroAccent}30` : '1px solid rgba(255, 255, 255, 0.25)'
            }}
          >
            <span>UFLA • Lavras, MG</span>
          </div>

          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]"
            style={{ color: tema.heroText }}
          >
            Moradia universitária em Lavras{' '}
            <span 
              className="underline decoration-4 underline-offset-4 transition-colors"
              style={{
                color: isDarkMode ? tema.heroAccent : '#FFFFFF',
                textDecorationColor: tema.heroAccent
              }}
            >
              sem surpresas
            </span>{' '}
            no fim do mês.
          </h1>
          
          <p 
            className="mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
            style={{ color: tema.heroSubtext }}
          >
            Repúblicas, apartamentos compartilhados e quartos com aluguel e contas (água, luz, condomínio) 100% abertas.
          </p>

          {/* Barra de Busca Adaptada para o Tema */}
          <div 
            className="mt-8 max-w-xl mx-auto p-2 rounded-2xl shadow-xl flex items-center gap-2 transition-all focus-within:ring-2"
            style={{
              backgroundColor: isDarkMode ? '#23253A' : '#FFFFFF',
              border: `1px solid ${tema.border}`,
              boxShadow: isDarkMode ? '0 8px 24px -4px rgba(0, 0, 0, 0.4)' : '0 12px 28px -4px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="pl-3" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }}>
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Buscar por bairro (ex: Centenário, Centro, Glória)..."
              value={filtros.termoBusca}
              onChange={(e) => setFiltros(prev => ({ ...prev, termoBusca: e.target.value }))}
              className="w-full text-sm placeholder:opacity-50 bg-transparent border-none outline-none font-medium"
              style={{
                color: isDarkMode ? '#FAFAFF' : '#19261E'
              }}
            />
            {filtros.termoBusca && (
              <button
                type="button"
                onClick={() => setFiltros(prev => ({ ...prev, termoBusca: '' }))}
                className="text-xs px-2 font-semibold hover:opacity-80 transition-opacity"
                style={{ color: tema.subtext }}
              >
                Limpar
              </button>
            )}
          </div>

          {/* Atalhos Rápidos com Cores Suaves */}
          <div 
            className="mt-3.5 flex items-center justify-center gap-2 text-xs font-medium"
            style={{ color: tema.heroSubtext }}
          >
            <span>Bairros populares:</span>
            {['Centenário', 'Centro', 'Vila Murad', 'Jardim Glória'].map((bairro) => (
              <button
                key={bairro}
                type="button"
                onClick={() => setFiltros(prev => ({ ...prev, termoBusca: bairro }))}
                className="underline font-bold transition-opacity hover:opacity-80"
                style={{ color: isDarkMode ? tema.heroAccent : '#FFFFFF' }}
              >
                {bairro}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Barra de Status com Alternância Grid / Lista */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 mb-8 border-b transition-colors" style={{ borderColor: tema.border }}>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: tema.text }}>
              <Compass className="w-5 h-5" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }} />
              Moradias e vagas disponíveis
            </h2>
            <p className="text-xs mt-0.5" style={{ color: tema.subtext }}>
              Preços mensais fechados e compatibilidade de rotina.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div 
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border shadow-sm transition-colors"
              style={{
                backgroundColor: tema.cardBg,
                borderColor: tema.border,
                color: tema.subtext
              }}
            >
              Exibindo <strong>{vagas.length}</strong> de {totalVagas} moradias
            </div>

            {/* Alternador de Visualização (Grid vs Lista) */}
            <div 
              className="flex items-center p-1 rounded-xl border transition-colors shadow-sm"
              style={{
                backgroundColor: tema.cardBg,
                borderColor: tema.border
              }}
            >
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: layoutMode === 'grid' ? (isDarkMode ? tema.primary : '#006B3E') : 'transparent',
                  color: layoutMode === 'grid' ? (isDarkMode ? '#151722' : '#FFFFFF') : tema.subtext
                }}
                title="Exibir em Grade"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('lista')}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: layoutMode === 'lista' ? (isDarkMode ? tema.primary : '#006B3E') : 'transparent',
                  color: layoutMode === 'lista' ? (isDarkMode ? '#151722' : '#FFFFFF') : tema.subtext
                }}
                title="Exibir em Lista Comparativa"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout com Sidebar e Grid de Moradias */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <SearchSidebar filtros={filtros} setFiltros={setFiltros} />
          </aside>

          <section className="lg:col-span-3">
            {vagas.length > 0 ? (
              <div className={layoutMode === 'lista' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
                {vagas.map((vaga) => (
                  <VagaCard key={vaga.id} vaga={vaga} />
                ))}
              </div>
            ) : (
              <div 
                className="rounded-2xl p-12 text-center border shadow-sm transition-colors"
                style={{ backgroundColor: tema.cardBg, borderColor: tema.border }}
              >
                <SearchX className="w-10 h-10 mx-auto mb-3" style={{ color: tema.subtext }} />
                <h3 className="text-base font-bold mb-1" style={{ color: tema.text }}>
                  Nenhum imóvel encontrado
                </h3>
                <p className="text-xs max-w-sm mx-auto mb-5" style={{ color: tema.subtext }}>
                  Ajuste os filtros de preço ou distância para visualizar mais opções.
                </p>
              </div>
            )}
          </section>
        </div>

      </main>

      {/* Footer na mesma cor do banner Hero */}
      <Footer />
    </div>
  );
}
