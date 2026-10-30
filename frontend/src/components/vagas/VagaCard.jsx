import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { formatCurrency, REGRAS_LABELS } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

/**
 * Card resumido de anúncio de moradia.
 * 
 * Fase 1 (Membro 1): Estrutura base, integração com o tema e suporte a grid/lista.
 * Fase 3 (Membro 3 - Responsável): Refinamento visual, hierarquia de informações e badges de fit cultural.
 */
export default function VagaCard({ vaga }) {
  const detalheUrl = `?vaga=${vaga.id}`;
  const { tema, isDarkMode, layoutMode } = useTheme();

  // Layout em Modo Lista Horizontal Comparativo
  if (layoutMode === 'lista') {
    return (
      <article 
        className="rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row group"
        style={{
          backgroundColor: tema.cardBg, // Space Indigo (#23253A) no Dark Mode!
          borderColor: tema.border
        }}
      >
        {/* Foto em widescreen na lista */}
        <a
          href={detalheUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative md:w-72 h-48 md:h-auto shrink-0 bg-gray-100 overflow-hidden block"
        >
          <img
            src={vaga.imagemCapa}
            alt={vaga.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span 
              className="px-2.5 py-0.5 rounded-md text-xs font-bold shadow-sm backdrop-blur-sm"
              style={{ 
                backgroundColor: isDarkMode ? '#171825CC' : '#FFFFFFE6', 
                color: tema.text 
              }}
            >
              {REGRAS_LABELS.tipoMoradia[vaga.tipoMoradia] || vaga.tipoMoradia}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-medium">
            {vaga.bairro}
          </div>
        </a>

        {/* Conteúdo Horizontal */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <a href={detalheUrl} target="_blank" rel="noopener noreferrer">
                <h3 className="font-bold text-lg group-hover:opacity-80 transition-opacity" style={{ color: tema.text }}>
                  {vaga.titulo}
                </h3>
              </a>
              <span 
                className="self-start sm:self-auto px-2.5 py-1 rounded-md text-xs font-bold"
                style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}
              >
                {vaga.distanciaUflaKm} km da UFLA
              </span>
            </div>

            <p className="text-xs mt-1 flex items-center gap-1" style={{ color: tema.subtext }}>
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }} />
              <span>{vaga.endereco}</span>
            </p>

            <p className="text-xs mt-2.5 line-clamp-2 leading-relaxed" style={{ color: tema.subtext }}>
              {vaga.descricao}
            </p>

            {/* Badges de Convivência */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg font-medium" style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}>
                {vaga.regras.aceitaPet ? '✓ Aceita pets' : '✕ Sem pets'}
              </span>
              <span className="px-2.5 py-1 rounded-lg font-medium" style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}>
                {vaga.regras.permiteFumar ? '✓ Fumo permitido' : '✕ Não fumante'}
              </span>
              {vaga.regras.ambienteSilenciosoEstudo && (
                <span className="px-2.5 py-1 rounded-lg font-bold" style={{ backgroundColor: tema.accentBg, color: tema.accentText }}>
                  ★ Silêncio / Estudos
                </span>
              )}
            </div>
          </div>

          {/* Rodapé de Preço */}
          <div className="mt-5 pt-4 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-3" style={{ borderColor: tema.border }}>
            <div className="flex items-baseline gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: tema.subtext }}>
                  Total Mensal Fechado
                </span>
                <span className="text-2xl font-black" style={{ color: isDarkMode ? '#8FD1A8' : '#006B3E' }}>
                  {formatCurrency(vaga.valorTotal)}
                </span>
                <span className="text-xs ml-1" style={{ color: tema.subtext }}>/mês</span>
              </div>
              <span className="text-xs pl-2 border-l" style={{ color: tema.subtext, borderColor: tema.border }}>
                (Aluguel: {formatCurrency(vaga.valorAluguel)} + Contas: {formatCurrency(vaga.valorContasInvisiveis)})
              </span>
            </div>

            <a
              href={detalheUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm"
              style={{
                backgroundColor: isDarkMode ? tema.primary : '#006B3E',
                color: isDarkMode ? tema.primaryText : '#FFFFFF'
              }}
            >
              <span>Ver Detalhes</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </article>
    );
  }

  // Layout em Modo Grid Normal
  return (
    <article 
      className="rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col group"
      style={{
        backgroundColor: tema.cardBg, // Space Indigo (#23253A) no modo escuro!
        borderColor: tema.border
      }}
    >
      {/* Imagem de Capa */}
      <a
        href={detalheUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-52 bg-gray-100 overflow-hidden block"
      >
        <img
          src={vaga.imagemCapa}
          alt={vaga.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges superiores */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span 
            className="px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm"
            style={{ 
              backgroundColor: isDarkMode ? '#171825D9' : '#FFFFFFE6', 
              color: tema.text 
            }}
          >
            {REGRAS_LABELS.tipoMoradia[vaga.tipoMoradia] || vaga.tipoMoradia}
          </span>
          <span 
            className="px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm"
            style={{ 
              backgroundColor: isDarkMode ? tema.primary : '#006B3E', 
              color: isDarkMode ? tema.primaryText : '#FFFFFF' 
            }}
          >
            {vaga.distanciaUflaKm} km da UFLA
          </span>
        </div>

        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-md text-xs font-medium">
          {vaga.bairro}
        </div>
      </a>

      {/* Conteúdo do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <a
            href={detalheUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="font-bold text-base group-hover:opacity-80 transition-opacity line-clamp-1 leading-snug" style={{ color: tema.text }}>
              {vaga.titulo}
            </h3>
          </a>

          <p className="text-xs mt-1 flex items-center gap-1" style={{ color: tema.subtext }}>
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }} />
            <span className="truncate">{vaga.endereco}</span>
          </p>

          <p className="text-xs mt-2.5 line-clamp-2 leading-relaxed" style={{ color: tema.subtext }}>
            {vaga.descricao}
          </p>

          {/* Micro-tags em tons de verde suave */}
          <div className="mt-3.5 pt-3 border-t flex flex-wrap gap-1.5 text-[11px]" style={{ borderColor: tema.border }}>
            <span className="px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}>
              {vaga.regras.aceitaPet ? 'Pet friendly' : 'Sem animais'}
            </span>
            <span className="px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}>
              {vaga.regras.permiteFumar ? 'Permite fumar' : 'Não fumante'}
            </span>
            {vaga.regras.ambienteSilenciosoEstudo && (
              <span className="px-2 py-0.5 rounded-md font-bold" style={{ backgroundColor: tema.accentBg, color: tema.accentText }}>
                Foco em estudo
              </span>
            )}
          </div>
        </div>

        {/* Linha de Preço e Ação */}
        <div className="mt-5 pt-4 border-t flex items-end justify-between" style={{ borderColor: tema.border }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wide block" style={{ color: tema.subtext }}>
              Total mensal estimado
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black" style={{ color: isDarkMode ? '#8FD1A8' : '#006B3E' }}>
                {formatCurrency(vaga.valorTotal)}
              </span>
              <span className="text-xs font-medium" style={{ color: tema.subtext }}>/mês</span>
            </div>
            <span className="text-[11px] block mt-0.5" style={{ color: tema.subtext }}>
              Aluguel: {formatCurrency(vaga.valorAluguel)} • Contas: {formatCurrency(vaga.valorContasInvisiveis)}
            </span>
          </div>

          <a
            href={detalheUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold rounded-xl transition-all shadow-sm"
            style={{
              backgroundColor: isDarkMode ? tema.primary : '#006B3E',
              color: isDarkMode ? tema.primaryText : '#FFFFFF'
            }}
          >
            <span>Detalhes</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </article>
  );
}
