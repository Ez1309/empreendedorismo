import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import vagasMock from '../data/vagas_mock.json';
import { formatCurrency, buildWhatsappUrl, REGRAS_LABELS } from '../utils/formatters';
import { useTheme } from '../context/ThemeContext';
import { 
  ArrowLeft, 
  MapPin, 
  ExternalLink, 
  MessageCircle, 
  Check, 
  Share2,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export default function VagaDetalhes({ vagaId }) {
  const vaga = vagasMock.find((item) => String(item.id) === String(vagaId));
  const { tema, isDarkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (vaga) {
      document.title = `${vaga.titulo} | Acomoda UFLA`;
    }
  }, [vaga]);

  if (!vaga) {
    return (
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: tema.bg, color: tema.text }}>
        <Header />
        <main className="flex-1 max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold mb-2" style={{ color: tema.text }}>Moradia não encontrada</h2>
          <p className="text-sm mb-6" style={{ color: tema.subtext }}>
            O anúncio pode ter expirado ou o link acessado está incorreto.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
            style={{ 
              backgroundColor: isDarkMode ? tema.primary : '#006B3E', 
              color: isDarkMode ? tema.primaryText : '#FFFFFF' 
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao início</span>
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vaga.titulo,
        text: `Confira esta moradia próxima à UFLA: ${vaga.titulo}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência.');
    }
  };

  return (
    <div 
      className="flex flex-col min-h-screen font-sans transition-colors duration-300"
      style={{
        backgroundColor: tema.bg,
        color: tema.text
      }}
    >
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Navegação */}
        <div className="flex items-center justify-between mb-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl border shadow-sm transition-colors"
            style={{
              backgroundColor: tema.cardBg,
              borderColor: tema.border,
              color: tema.text
            }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }} />
            <span>Todas as moradias</span>
          </a>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border shadow-sm transition-colors"
            style={{
              backgroundColor: tema.cardBg,
              borderColor: tema.border,
              color: tema.text
            }}
          >
            <Share2 className="w-3.5 h-3.5" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }} />
            <span>Compartilhar</span>
          </button>
        </div>

        {/* Título e Localização */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs mb-2.5">
            <span 
              className="font-bold px-2.5 py-1 rounded-md"
              style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}
            >
              {REGRAS_LABELS.tipoMoradia[vaga.tipoMoradia] || vaga.tipoMoradia}
            </span>
            <span 
              className="font-medium px-2.5 py-1 rounded-md border"
              style={{ backgroundColor: tema.cardBg, borderColor: tema.border, color: tema.text }}
            >
              {REGRAS_LABELS.generoMoradia[vaga.generoMoradia] || vaga.generoMoradia}
            </span>
            <span 
              className="font-bold px-2.5 py-1 rounded-md shadow-sm"
              style={{ 
                backgroundColor: isDarkMode ? tema.primary : '#006B3E', 
                color: isDarkMode ? tema.primaryText : '#FFFFFF' 
              }}
            >
              {vaga.distanciaUflaKm} km da UFLA
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight" style={{ color: tema.text }}>
            {vaga.titulo}
          </h1>

          <p className="text-xs sm:text-sm mt-2 flex items-center gap-1.5" style={{ color: tema.subtext }}>
            <MapPin className="w-4 h-4 shrink-0" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }} />
            <span>{vaga.endereco} • <strong>Bairro {vaga.bairro}</strong>, Lavras</span>
          </p>
        </div>

        {/* Galeria de Fotos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 rounded-2xl overflow-hidden shadow-sm">
          <div className="md:col-span-2 h-72 sm:h-96 bg-gray-200 overflow-hidden">
            <img
              src={vaga.imagemCapa}
              alt={vaga.titulo}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col gap-3 h-96">
            <div className="h-1/2 bg-gray-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
                alt="Ambiente comum"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-1/2 bg-gray-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
                alt="Espaço da moradia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Coluna Esquerda */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Descrição */}
            <section 
              className="p-6 sm:p-7 rounded-2xl border shadow-sm transition-colors"
              style={{ backgroundColor: tema.cardBg, borderColor: tema.border }}
            >
              <h2 className="text-base font-bold mb-3" style={{ color: tema.text }}>
                Sobre a moradia
              </h2>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: tema.subtext }}>
                {vaga.descricao}
              </p>

              {vaga.pontoReferencia && (
                <div 
                  className="mt-4 p-3 rounded-xl border text-xs"
                  style={{
                    backgroundColor: tema.secondaryBg,
                    borderColor: `${tema.border}`,
                    color: tema.secondaryText
                  }}
                >
                  <strong>Ponto de referência local:</strong> {vaga.pontoReferencia}
                </div>
              )}
            </section>

            {/* TABELA DE CUSTOS ABERTOS (A Solução da Dor Central) */}
            <section 
              className="p-6 sm:p-7 rounded-2xl border shadow-sm transition-colors"
              style={{ backgroundColor: tema.cardBg, borderColor: tema.border }}
            >
              <div className="pb-4 mb-4 border-b flex items-center justify-between" style={{ borderColor: tema.border }}>
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-base sm:text-lg font-black tracking-tight" style={{ color: tema.text }}>
                      Tabela de Custos Abertos (Sem Contas Invisíveis)
                    </h2>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: tema.subtext }}>
                    Transparência total para você saber exatamente quanto vai pagar antes do contato.
                  </p>
                </div>
                <div 
                  className="px-3 py-1 rounded-lg text-xs font-bold border"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9', 
                    borderColor: isDarkMode ? '#8FD1A8' : '#A5D6A7',
                    color: isDarkMode ? '#8FD1A8' : '#006B3E' 
                  }}
                >
                  100% Transparente
                </div>
              </div>

              {/* Tabela Estruturada de Custos */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: tema.border, color: tema.subtext }}>
                      <th className="pb-2.5 font-bold uppercase text-[11px] tracking-wider">Item de Custo</th>
                      <th className="pb-2.5 font-bold uppercase text-[11px] tracking-wider hidden sm:table-cell">Natureza</th>
                      <th className="pb-2.5 font-bold uppercase text-[11px] tracking-wider hidden md:table-cell">Detalhamento</th>
                      <th className="pb-2.5 font-bold uppercase text-[11px] tracking-wider text-right">Valor Estimado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: tema.border }}>
                    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-semibold" style={{ color: tema.text }}>Aluguel Base</td>
                      <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                            color: isDarkMode ? '#8FD1A8' : '#006B3E',
                            border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                          }}
                        >
                          Fixo
                        </span>
                      </td>
                      <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>Valor fixo mensal do quarto/imóvel</td>
                      <td className="py-2.5 font-bold text-right" style={{ color: tema.text }}>{formatCurrency(vaga.valorAluguel)}</td>
                    </tr>
                    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-semibold" style={{ color: tema.text }}>IPTU Proporcional</td>
                      <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                            color: isDarkMode ? '#8FD1A8' : '#006B3E',
                            border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                          }}
                        >
                          Fixo rateado
                        </span>
                      </td>
                      <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>Parcela mensal do imposto predial</td>
                      <td className="py-2.5 font-bold text-right" style={{ color: vaga.custosDetalhados.iptu > 0 ? tema.text : tema.subtext }}>
                        {vaga.custosDetalhados.iptu > 0 ? formatCurrency(vaga.custosDetalhados.iptu) : 'Isento'}
                      </td>
                    </tr>
                    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-semibold" style={{ color: tema.text }}>Energia Elétrica (Luz)</td>
                      <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                            color: isDarkMode ? '#8FD1A8' : '#006B3E',
                            border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                          }}
                        >
                          Variável estimada
                        </span>
                      </td>
                      <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>Média de consumo CEMIG rateada</td>
                      <td className="py-2.5 font-bold text-right" style={{ color: tema.text }}>{formatCurrency(vaga.custosDetalhados.energiaEletrica)}</td>
                    </tr>
                    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-semibold" style={{ color: tema.text }}>Água e Saneamento</td>
                      <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                            color: isDarkMode ? '#8FD1A8' : '#006B3E',
                            border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                          }}
                        >
                          Variável estimada
                        </span>
                      </td>
                      <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>COPASA mensal rateada entre moradores</td>
                      <td className="py-2.5 font-bold text-right" style={{ color: tema.text }}>{formatCurrency(vaga.custosDetalhados.agua)}</td>
                    </tr>
                    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-semibold" style={{ color: tema.text }}>Internet Wi-Fi Fibra</td>
                      <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                            color: isDarkMode ? '#8FD1A8' : '#006B3E',
                            border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                          }}
                        >
                          Fixo rateado
                        </span>
                      </td>
                      <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>Banda larga de alta velocidade</td>
                      <td className="py-2.5 font-bold text-right" style={{ color: tema.text }}>{formatCurrency(vaga.custosDetalhados.internet)}</td>
                    </tr>
                    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-semibold" style={{ color: tema.text }}>Condomínio</td>
                      <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                            color: isDarkMode ? '#8FD1A8' : '#006B3E',
                            border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                          }}
                        >
                          {vaga.custosDetalhados.condominio > 0 ? 'Fixo' : 'Isento'}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>Taxa mensal predial</td>
                      <td className="py-2.5 font-bold text-right" style={{ color: vaga.custosDetalhados.condominio > 0 ? tema.text : tema.subtext }}>
                        {vaga.custosDetalhados.condominio > 0 ? formatCurrency(vaga.custosDetalhados.condominio) : 'Isento'}
                      </td>
                    </tr>
                    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-semibold" style={{ color: tema.text }}>Diarista / Taxa de Limpeza</td>
                      <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                            color: isDarkMode ? '#8FD1A8' : '#006B3E',
                            border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                          }}
                        >
                          {vaga.custosDetalhados.taxaLimpeza > 0 ? 'Rateio' : 'Escala'}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>Limpeza de áreas comuns</td>
                      <td className="py-2.5 font-bold text-right" style={{ color: vaga.custosDetalhados.taxaLimpeza > 0 ? tema.text : tema.subtext }}>
                        {vaga.custosDetalhados.taxaLimpeza > 0 ? formatCurrency(vaga.custosDetalhados.taxaLimpeza) : 'Sem custo extra'}
                      </td>
                    </tr>
                    <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-semibold" style={{ color: tema.text }}>Gás de Cozinha</td>
                      <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                            color: isDarkMode ? '#8FD1A8' : '#006B3E',
                            border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                          }}
                        >
                          {vaga.custosDetalhados.gas > 0 ? 'Rateio médio' : 'Incluso'}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>Reposição periódica de botijão/gás canalizado</td>
                      <td className="py-2.5 font-bold text-right" style={{ color: vaga.custosDetalhados.gas > 0 ? tema.text : tema.subtext }}>
                        {vaga.custosDetalhados.gas > 0 ? formatCurrency(vaga.custosDetalhados.gas) : 'Incluso'}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t" style={{ borderColor: tema.border }}>
                      <td colSpan={2} className="pt-3 pb-1 text-xs" style={{ color: tema.subtext }}>
                        Aluguel Base: <strong>{formatCurrency(vaga.valorAluguel)}</strong> | Taxas adicionais: <strong>{formatCurrency(vaga.valorContasInvisiveis)}</strong>
                      </td>
                      <td colSpan={2} className="pt-3 pb-1 text-xs text-right hidden sm:table-cell" style={{ color: tema.subtext }}>
                        Total mensal estimado:
                      </td>
                    </tr>
                    <tr className="border-t-2" style={{ borderColor: isDarkMode ? '#8FD1A8' : '#006B3E' }}>
                      <td colSpan={2} className="pt-3 pb-1">
                        <span className="text-base sm:text-lg font-black" style={{ color: tema.text }}>
                          TOTAL MENSAL ESTIMADO
                        </span>
                        <span className="block text-[11px]" style={{ color: tema.subtext }}>
                          (Aluguel + IPTU + Luz + Água + Wi-Fi)
                        </span>
                      </td>
                      <td colSpan={2} className="pt-3 pb-1 text-right">
                        <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                          {formatCurrency(vaga.valorTotal)}
                        </span>
                        <span className="text-xs font-semibold ml-1" style={{ color: tema.subtext }}>/mês</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {vaga.observacaoCustos && (
                <p className="mt-3 text-xs italic" style={{ color: tema.subtext }}>
                  * {vaga.observacaoCustos}
                </p>
              )}
            </section>

            {/* Convivência e Regras */}
            <section 
              className="p-6 sm:p-7 rounded-2xl border shadow-sm transition-colors"
              style={{ backgroundColor: tema.cardBg, borderColor: tema.border }}
            >
              <h2 className="text-base font-bold mb-4" style={{ color: tema.text }}>
                Regras e convivência
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1F2133' : '#FAFAFF', borderColor: tema.border }}>
                  <span className="uppercase font-bold block" style={{ color: tema.subtext }}>Animais</span>
                  <span className="text-sm font-semibold mt-0.5 block" style={{ color: tema.text }}>
                    {vaga.regras.aceitaPet ? 'Permitido animais' : 'Não aceita animais'}
                  </span>
                </div>

                <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1F2133' : '#FAFAFF', borderColor: tema.border }}>
                  <span className="uppercase font-bold block" style={{ color: tema.subtext }}>Fumo</span>
                  <span className="text-sm font-semibold mt-0.5 block" style={{ color: tema.text }}>
                    {vaga.regras.permiteFumar ? 'Permitido fumar' : 'Ambiente não-fumante'}
                  </span>
                </div>

                <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1F2133' : '#FAFAFF', borderColor: tema.border }}>
                  <span className="uppercase font-bold block" style={{ color: tema.subtext }}>Festas e eventos</span>
                  <span className="text-sm font-semibold mt-0.5 block" style={{ color: tema.text }}>
                    {REGRAS_LABELS.festasEventos[vaga.regras.festasEventos] || vaga.regras.festasEventos}
                  </span>
                </div>

                <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1F2133' : '#FAFAFF', borderColor: tema.border }}>
                  <span className="uppercase font-bold block" style={{ color: tema.subtext }}>Limpeza e rotina</span>
                  <span className="text-sm font-semibold mt-0.5 block" style={{ color: tema.text }}>
                    {REGRAS_LABELS.organizacaoLimpeza[vaga.regras.organizacaoLimpeza] || vaga.regras.organizacaoLimpeza}
                  </span>
                </div>
              </div>
            </section>

            {/* Comodidades */}
            {vaga.comodidades && vaga.comodidades.length > 0 && (
              <section 
                className="p-6 sm:p-7 rounded-2xl border shadow-sm transition-colors"
                style={{ backgroundColor: tema.cardBg, borderColor: tema.border }}
              >
                <h2 className="text-base font-bold mb-4" style={{ color: tema.text }}>
                  Comodidades inclusas
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium" style={{ color: tema.text }}>
                  {vaga.comodidades.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Coluna Direita: Sticky Card de Conversão */}
          <aside className="lg:col-span-1">
            <div 
              className="p-6 rounded-2xl border sticky top-24 space-y-6 shadow-lg transition-colors"
              style={{ backgroundColor: tema.cardBg, borderColor: tema.border }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: tema.subtext }}>
                  Custo mensal total
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-black" style={{ color: isDarkMode ? '#8FD1A8' : '#006B3E' }}>
                    {formatCurrency(vaga.valorTotal)}
                  </span>
                  <span className="text-xs font-medium" style={{ color: tema.subtext }}>/mês</span>
                </div>
                <p className="text-xs mt-1" style={{ color: tema.subtext }}>
                  Aluguel: {formatCurrency(vaga.valorAluguel)} + Contas: {formatCurrency(vaga.valorContasInvisiveis)}
                </p>
              </div>

              <div className="pt-4 border-t text-xs space-y-2" style={{ borderColor: tema.border, color: tema.subtext }}>
                <div className="flex justify-between">
                  <span>Disponibilidade:</span>
                  <strong style={{ color: tema.text }}>{vaga.dataDisponibilidade}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Caução antecipada:</span>
                  <strong style={{ color: tema.text }}>
                    {vaga.caucaoExigida ? `Sim (${formatCurrency(vaga.valorCaucao)})` : 'Não exige'}
                  </strong>
                </div>
              </div>

              {/* Informações do Anunciante */}
              <div className="p-3.5 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1F2133' : '#FAFAFF', borderColor: tema.border }}>
                <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: tema.subtext }}>
                  Responsável pelo anúncio
                </span>
                <p className="font-bold text-sm mt-0.5" style={{ color: tema.text }}>
                  {vaga.responsavel?.nome}
                </p>
                <p className="text-xs" style={{ color: tema.subtext }}>
                  {vaga.responsavel?.papel} {vaga.responsavel?.periodo ? `• ${vaga.responsavel?.periodo}` : ''}
                </p>
              </div>

              {/* Botão de WhatsApp */}
              <a
                href={buildWhatsappUrl(vaga.whatsapp, vaga.titulo, vaga.responsavel?.nome)}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 font-bold rounded-xl transition-all shadow-md text-sm text-center"
                style={{
                  backgroundColor: isDarkMode ? '#4A9C6D' : '#006B3E',
                  color: '#FFFFFF'
                }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Conversar no WhatsApp</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
              </a>

              <p className="text-[11px] text-center leading-relaxed" style={{ color: tema.subtext }}>
                Mensagem enviada diretamente para o responsável da vaga sem custos.
              </p>

              {/* Alerta de Segurança */}
              <div 
                className="p-3 rounded-xl border flex items-start gap-2 text-xs"
                style={{
                  backgroundColor: isDarkMode ? '#282F24' : '#F1F8E3',
                  borderColor: `${tema.border}`,
                  color: isDarkMode ? '#FAFAFF' : tema.text
                }}
              >
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" style={{ color: isDarkMode ? '#FACC15' : '#D97706' }} />
                <p>
                  <strong>Segurança:</strong> Agende sempre uma visita presencial ou por chamada antes de realizar adiantamentos.
                </p>
              </div>

            </div>
          </aside>

        </div>

      </main>

      <Footer />
    </div>
  );
}
