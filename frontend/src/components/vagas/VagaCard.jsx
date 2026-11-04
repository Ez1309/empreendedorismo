import React from 'react';
import { 
  MapPin, 
  ArrowUpRight, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Home,
  Check
} from 'lucide-react';
import { formatCurrency, REGRAS_LABELS } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

/**
 * Objeto vagaTeste completo para desenvolvimento e testes independentes (sem depender do Membro 2).
 * Contém todos os campos do contrato de dados da moradia estudantil em Lavras/UFLA.
 */
export const vagaTeste = {
  id: "teste-1",
  titulo: "Quarto Individual em República Tradicional - Próximo à Portaria Principal",
  nomeMoradia: "República Trem de Minas",
  tipoMoradia: "republica",
  generoMoradia: "mista",
  tipoQuarto: "individual",
  banheiro: "compartilhado",
  mobiliado: "totalmente_mobiliado",
  bairro: "Centenário",
  distanciaUflaKm: 0.9,
  endereco: "Rua Comendador José Esteves, 142",
  pontoReferencia: "A 3 minutos a pé da portaria principal da UFLA e da padaria Pão & Cia",
  descricao: "Quarto individual amplo e arejado, já equipado com cama box de solteiro, guarda-roupa embutido, mesa de estudos com cadeira ergonômica. Casa completa com sala de estudos silenciosa, cozinha ampla equipada, área de churrasco e lavanderia com máquina de 14kg. Ambiente focado em respeito e harmonia.",
  valorAluguel: 450,
  custosDetalhados: {
    condominio: 0,
    iptu: 25,
    energiaEletrica: 65,
    agua: 35,
    internet: 30,
    taxaLimpeza: 50,
    gas: 15
  },
  valorContasInvisiveis: 220,
  valorTotal: 670,
  custosVariaveis: true,
  observacaoCustos: "Valores de água e luz rateados mensalmente (média dos últimos 6 meses). Sem surpresas no fim do mês!",
  caucaoExigida: false,
  valorCaucao: 0,
  regras: {
    aceitaPet: false,
    permiteFumar: false,
    ambienteSilenciosoEstudo: true,
    festasEventos: "moderadas",
    organizacaoLimpeza: "diarista_inclusa",
    visitasPermitidas: "com_aviso"
  },
  comodidades: [
    "Wi-Fi Fibra 500MB",
    "Máquina de Lavar 14kg",
    "Cozinha Equipada",
    "Diarista Quinzenal",
    "Garagem para Moto",
    "Mesa de Estudos no Quarto"
  ],
  responsavel: {
    nome: "Marina Albuquerque",
    papel: "Estudante Veterana (Engenharia Florestal)",
    periodo: "7º período"
  },
  whatsapp: "5535998765432",
  imagemCapa: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
  dataDisponibilidade: "Imediata"
};

/**
 * Componente VagaCard:
 * Card de anúncio com foco prioritário em clareza, transparência de custos e fit cultural.
 * 
 * Fase 3 (Membro 3 - Responsável):
 * - Decomposição visual dos custos ("Contas Invisíveis" expostas abertamente).
 * - Badges táteis e legíveis de fit cultural (animais, fumo, rotina de estudos).
 * - Botão direto de redirecionamento dinâmico para WhatsApp.
 * - Integração perfeita com abertura do modal de custos ou navegação de detalhes.
 */
export default function VagaCard({ vaga = vagaTeste, onAbrirModal }) {
  const dados = vaga || vagaTeste;
  const detalheUrl = `?vaga=${dados.id}`;
  const { tema, isDarkMode, layoutMode } = useTheme();

  // Link dinâmico oficial do WhatsApp conforme especificação da Fase 3
  const whatsappUrl = `https://wa.me/${String(dados.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(
    `Olá, vi a vaga "${dados.titulo}" no Acomoda UFLA e gostaria de saber mais informações!`
  )}`;

  const handleCardClick = (e) => {
    // Se o usuário clicar em um link ou botão interno, não interfere
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    if (onAbrirModal) {
      e.preventDefault();
      onAbrirModal(dados);
    }
  };

  const handleModalOpen = (e) => {
    if (onAbrirModal) {
      e.preventDefault();
      onAbrirModal(dados);
    }
  };

  // ==========================================
  // MODO 1: Layout em Lista Horizontal Comparativa
  // ==========================================
  if (layoutMode === 'lista') {
    return (
      <article 
        onClick={handleCardClick}
        className="rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group cursor-pointer"
        style={{
          backgroundColor: tema.cardBg,
          borderColor: tema.border
        }}
      >
        {/* Foto em widescreen na lista */}
        <div className="relative md:w-80 h-56 md:h-auto shrink-0 bg-gray-100 overflow-hidden block">
          <img
            src={dados.imagemCapa}
            alt={dados.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Badges superiores na imagem */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span 
              className="px-2.5 py-1 rounded-lg text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(23, 24, 37, 0.85)' : 'rgba(255, 255, 255, 0.92)', 
                color: tema.text 
              }}
            >
              <Home className="w-3 h-3 text-emerald-600" />
              {REGRAS_LABELS.tipoMoradia[dados.tipoMoradia] || dados.tipoMoradia}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{dados.bairro}</span>
          </div>

          <div 
            className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg shadow-md"
            style={{ 
              backgroundColor: isDarkMode ? tema.primary : '#006B3E', 
              color: isDarkMode ? tema.primaryText : '#FFFFFF' 
            }}
          >
            {dados.distanciaUflaKm} km da UFLA
          </div>
        </div>

        {/* Conteúdo Horizontal */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Linha de Título e Bairro */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 
                  className="font-bold text-lg sm:text-xl group-hover:text-emerald-600 transition-colors leading-snug"
                  style={{ color: tema.text }}
                >
                  {dados.titulo}
                </h3>
                <p className="text-xs mt-1 flex items-center gap-1.5" style={{ color: tema.subtext }}>
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }} />
                  <span>{dados.endereco} • Bairro {dados.bairro}</span>
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm mt-3 line-clamp-2 leading-relaxed" style={{ color: tema.subtext }}>
              {dados.descricao}
            </p>

            {/* Badges de Fit Cultural (Validação do Problema de Convivência) */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span 
                className="px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 border"
                style={{ 
                  backgroundColor: dados.regras.aceitaPet 
                    ? (isDarkMode ? 'rgba(74, 156, 109, 0.15)' : '#ECFDF5') 
                    : (isDarkMode ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2'),
                  borderColor: dados.regras.aceitaPet 
                    ? (isDarkMode ? 'rgba(74, 156, 109, 0.3)' : '#A7F3D0') 
                    : (isDarkMode ? 'rgba(239, 68, 68, 0.25)' : '#FECACA'),
                  color: dados.regras.aceitaPet 
                    ? (isDarkMode ? '#8FD1A8' : '#047857') 
                    : (isDarkMode ? '#FCA5A5' : '#B91C1C')
                }}
              >
                {dados.regras.aceitaPet ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {dados.regras.aceitaPet ? 'Aceita pets' : 'Sem animais'}
              </span>

              <span 
                className="px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 border"
                style={{ 
                  backgroundColor: !dados.regras.permiteFumar 
                    ? (isDarkMode ? 'rgba(74, 156, 109, 0.15)' : '#ECFDF5') 
                    : (isDarkMode ? 'rgba(245, 158, 11, 0.12)' : '#FFFBEB'),
                  borderColor: !dados.regras.permiteFumar 
                    ? (isDarkMode ? 'rgba(74, 156, 109, 0.3)' : '#A7F3D0') 
                    : (isDarkMode ? 'rgba(245, 158, 11, 0.25)' : '#FDE68A'),
                  color: !dados.regras.permiteFumar 
                    ? (isDarkMode ? '#8FD1A8' : '#047857') 
                    : (isDarkMode ? '#FCD34D' : '#B45309')
                }}
              >
                {!dados.regras.permiteFumar ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                {!dados.regras.permiteFumar ? 'Não fumante' : 'Permite fumar'}
              </span>

              {dados.regras.ambienteSilenciosoEstudo && (
                <span 
                  className="px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5"
                  style={{ backgroundColor: tema.accentBg, color: tema.accentText }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Foco em estudo & silêncio</span>
                </span>
              )}

              <span 
                className="px-2.5 py-1 rounded-lg font-medium"
                style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}
              >
                {REGRAS_LABELS.organizacaoLimpeza[dados.regras.organizacaoLimpeza] || 'Limpeza alinhada'}
              </span>
            </div>
          </div>

          {/* DECOMPOSIÇÃO DE CUSTOS E AÇÕES (A Solução da Dor Central) */}
          <div 
            className="mt-5 pt-4 border-t flex flex-col lg:flex-row lg:items-end justify-between gap-4"
            style={{ borderColor: tema.border }}
          >
            {/* Bloco de Preço Transparente */}
            <div 
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: isDarkMode ? '#1B242C' : '#E8F5EE',
                borderColor: isDarkMode ? '#2D4438' : '#C4E4D3'
              }}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <ShieldCheck 
                  className="w-4 h-4" 
                  style={{ color: isDarkMode ? '#8FD1A8' : '#006B3E' }} 
                />
                <span 
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: isDarkMode ? '#8FD1A8' : '#005230' }}
                >
                  Total Mensal Fechado (Sem Surpresas)
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span 
                  className="text-2xl sm:text-3xl font-black"
                  style={{ color: isDarkMode ? '#8FD1A8' : '#006B3E' }}
                >
                  {formatCurrency(dados.valorTotal)}
                </span>
                <span className="text-xs font-semibold" style={{ color: isDarkMode ? '#CBE5D4' : '#3D5245' }}>/mês</span>
              </div>

              <p 
                className="text-xs mt-1 font-medium"
                style={{ color: isDarkMode ? '#D8E2DC' : '#2D3748' }}
              >
                Aluguel: <strong>{formatCurrency(dados.valorAluguel)}</strong> + Contas abertas: <strong>{formatCurrency(dados.valorContasInvisiveis)}</strong>
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <button
                type="button"
                onClick={handleModalOpen}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl border transition-all hover:opacity-90"
                style={{
                  backgroundColor: tema.cardBg,
                  borderColor: tema.border,
                  color: tema.text
                }}
              >
                <span>Ver Custos Abertos</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Botão Oficial de Validação da Hipótese: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: isDarkMode ? '#4A9C6D' : '#006B3E',
                  color: '#FFFFFF'
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // ==========================================
  // MODO 2: Layout em Grade (Grid Card Moderno)
  // ==========================================
  return (
    <article 
      onClick={handleCardClick}
      className="rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
      style={{
        backgroundColor: tema.cardBg,
        borderColor: tema.border
      }}
    >
      {/* Imagem de Capa com Tags Estratégicas */}
      <div className="relative h-56 bg-gray-100 overflow-hidden block">
        <img
          src={dados.imagemCapa}
          alt={dados.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges superiores flutuantes */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span 
            className="px-2.5 py-1 rounded-lg text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1"
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(23, 24, 37, 0.85)' : 'rgba(255, 255, 255, 0.92)', 
              color: tema.text 
            }}
          >
            <Home className="w-3 h-3 text-emerald-600" />
            {REGRAS_LABELS.tipoMoradia[dados.tipoMoradia] || dados.tipoMoradia}
          </span>
          <span 
            className="px-2.5 py-1 rounded-lg text-xs font-bold shadow-md"
            style={{ 
              backgroundColor: isDarkMode ? tema.primary : '#006B3E', 
              color: isDarkMode ? tema.primaryText : '#FFFFFF' 
            }}
          >
            {dados.distanciaUflaKm} km da UFLA
          </span>
        </div>

        {/* Bairro no rodapé da imagem */}
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{dados.bairro}</span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Título com foco em legibilidade */}
          <h3 
            className="font-bold text-base sm:text-lg group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug"
            style={{ color: tema.text }}
          >
            {dados.titulo}
          </h3>

          <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: tema.subtext }}>
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: isDarkMode ? tema.heroAccent : '#006B3E' }} />
            <span className="truncate">{dados.endereco}</span>
          </p>

          <p className="text-xs mt-2.5 line-clamp-2 leading-relaxed" style={{ color: tema.subtext }}>
            {dados.descricao}
          </p>

          {/* Badges de Fit Cultural (Convivência) */}
          <div 
            className="mt-3.5 pt-3 border-t flex flex-wrap items-center gap-1.5 text-[11px]"
            style={{ borderColor: tema.border }}
          >
            <span 
              className="px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 border"
              style={{ 
                backgroundColor: dados.regras.aceitaPet 
                  ? (isDarkMode ? 'rgba(74, 156, 109, 0.15)' : '#ECFDF5') 
                  : (isDarkMode ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2'),
                borderColor: dados.regras.aceitaPet 
                  ? (isDarkMode ? 'rgba(74, 156, 109, 0.3)' : '#A7F3D0') 
                  : (isDarkMode ? 'rgba(239, 68, 68, 0.25)' : '#FECACA'),
                color: dados.regras.aceitaPet 
                  ? (isDarkMode ? '#8FD1A8' : '#047857') 
                  : (isDarkMode ? '#FCA5A5' : '#B91C1C')
              }}
            >
              {dados.regras.aceitaPet ? '✓ Aceita pets' : '✕ Sem animais'}
            </span>

            <span 
              className="px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 border"
              style={{ 
                backgroundColor: !dados.regras.permiteFumar 
                  ? (isDarkMode ? 'rgba(74, 156, 109, 0.15)' : '#ECFDF5') 
                  : (isDarkMode ? 'rgba(245, 158, 11, 0.12)' : '#FFFBEB'),
                borderColor: !dados.regras.permiteFumar 
                  ? (isDarkMode ? 'rgba(74, 156, 109, 0.3)' : '#A7F3D0') 
                  : (isDarkMode ? 'rgba(245, 158, 11, 0.25)' : '#FDE68A'),
                color: !dados.regras.permiteFumar 
                  ? (isDarkMode ? '#8FD1A8' : '#047857') 
                  : (isDarkMode ? '#FCD34D' : '#B45309')
              }}
            >
              {!dados.regras.permiteFumar ? '✓ Não fumante' : 'Permite fumar'}
            </span>

            {dados.regras.ambienteSilenciosoEstudo && (
              <span 
                className="px-2 py-0.5 rounded-md font-bold"
                style={{ backgroundColor: tema.accentBg, color: tema.accentText }}
              >
                ★ Foco em estudo
              </span>
            )}
          </div>
        </div>

        {/* Bloco de Transparência de Custos (Coração da Proposta de Valor) */}
        <div 
          className="mt-4 pt-3.5 border-t space-y-3"
          style={{ borderColor: tema.border }}
        >
          {/* Quebra visual de Aluguel + Contas Invisíveis */}
          <div 
            className="p-3 rounded-xl border"
            style={{
              backgroundColor: isDarkMode ? '#1B242C' : '#E8F5EE',
              borderColor: isDarkMode ? '#2D4438' : '#C4E4D3'
            }}
          >
            <div className="flex items-center justify-between">
              <span 
                className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                style={{ color: isDarkMode ? '#8FD1A8' : '#005230' }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Total Mensal Fechado
              </span>
              <span 
                className="text-[10px] font-bold"
                style={{ color: isDarkMode ? '#A3D9B5' : '#006B3E' }}
              >
                Sem contas ocultas
              </span>
            </div>

            <div className="flex items-baseline gap-1 mt-0.5">
              <span 
                className="text-2xl font-black"
                style={{ color: isDarkMode ? '#8FD1A8' : '#006B3E' }}
              >
                {formatCurrency(dados.valorTotal)}
              </span>
              <span className="text-xs font-semibold" style={{ color: isDarkMode ? '#CBE5D4' : '#3D5245' }}>/mês</span>
            </div>

            <div 
              className="mt-1 text-[11px] font-medium flex items-center justify-between"
              style={{ color: isDarkMode ? '#D8E2DC' : '#2D3748' }}
            >
              <span>Aluguel: <strong>{formatCurrency(dados.valorAluguel)}</strong></span>
              <span>+ Contas: <strong>{formatCurrency(dados.valorContasInvisiveis)}</strong></span>
            </div>
          </div>

          {/* Botões de Ação Final */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleModalOpen}
              className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 px-3 text-xs font-bold rounded-xl border transition-all hover:opacity-90"
              style={{
                backgroundColor: tema.cardBg,
                borderColor: tema.border,
                color: tema.text
              }}
            >
              <span>Custos Abertos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Redirecionamento Dinâmico WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
              style={{
                backgroundColor: isDarkMode ? '#4A9C6D' : '#006B3E',
                color: '#FFFFFF'
              }}
              title="Chamar no WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </article>
  );
}
