import React, { useEffect } from 'react';
import { 
  DollarSign, 
  MapPin, 
  ExternalLink, 
  MessageCircle, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  X, 
  Home, 
  Users, 
  Calendar,
  AlertTriangle,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { formatCurrency, REGRAS_LABELS } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

/**
 * Objeto vagaTeste completo para desenvolvimento e testes independentes (sem depender do Membro 2).
 * Utilizado como fallback para renderização e aplicação direta de classes Tailwind.
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
  descricao: "Quarto individual amplo e arejado, já equipado com cama box de solteiro, guarda-roupa embutido, mesa de estudos com cadeira ergonômica. Casa completa com sala de estudos silenciosa, cozinha ampla equipada, área de churrasco e lavanderia com máquina de 14kg. Ambiente universitário focado em respeito mútuo e excelência acadêmica.",
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
  observacaoCustos: "Água e energia rateadas mensalmente por morador (média histórica aferida dos últimos 6 meses). Sem surpresas no fim do mês!",
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
    "Cozinha Equipada Completa",
    "Diarista Semanal Inclusa",
    "Garagem para Moto e Carro",
    "Mesa de Estudos no Quarto",
    "Área de Lazer e Churrasqueira"
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
 * Modal de Detalhamento da Vaga:
 * Componente central da Fase 3 responsável por materializar a proposta de valor da Acomoda UFLA:
 * 1. Tabela estruturada de Custos Abertos (Aluguel + IPTU + Luz + Água + Internet + Condomínio + Gás, etc.).
 * 2. Fit Cultural & Regras de Convivência explícitas.
 * 3. Botão final de redirecionamento dinâmico para WhatsApp que valida a hipótese de contato sem atrito.
 */
export default function VagaModal({ vaga = vagaTeste, onClose }) {
  const dados = vaga || vagaTeste;
  const { tema, isDarkMode } = useTheme();

  // Fechar com tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dados) return null;

  // Link dinâmico oficial do WhatsApp conforme especificação do Roteiro Fase 3:
  // href={"https://wa.me/" + vaga.whatsapp + "?text=Olá, vi a vaga no Acomoda UFLA"}
  const whatsappUrl = `https://wa.me/${String(dados.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(
    `Olá, vi a vaga "${dados.titulo}" no Acomoda UFLA. Gostaria de saber mais informações!`
  )}`;

  // Decomposição dos custos detalhados
  const custos = dados.custosDetalhados || {
    condominio: 0,
    iptu: 0,
    energiaEletrica: 0,
    agua: 0,
    internet: 0,
    taxaLimpeza: 0,
    gas: 0
  };

  // Itens da Tabela de Custos Abertos
  const itensTabelaCustos = [
    {
      nome: 'Aluguel Base',
      tipo: 'Fixo',
      descricao: 'Valor fixo mensal do quarto/moradia',
      valor: dados.valorAluguel
    },
    {
      nome: 'IPTU Proporcional',
      tipo: 'Fixo rateado',
      descricao: 'Parcela mensal rateada por morador',
      valor: custos.iptu || 0
    },
    {
      nome: 'Energia Elétrica (Luz)',
      tipo: 'Variável estimada',
      descricao: 'Média de consumo mensal da residência',
      valor: custos.energiaEletrica || 0
    },
    {
      nome: 'Água e Saneamento',
      tipo: 'Variável estimada',
      descricao: 'COPASA mensal rateada entre moradores',
      valor: custos.agua || 0
    },
    {
      nome: 'Internet Wi-Fi Fibra',
      tipo: 'Fixo rateado',
      descricao: 'Banda larga de alta velocidade inclusa',
      valor: custos.internet || 0
    },
    {
      nome: 'Condomínio',
      tipo: custos.condominio > 0 ? 'Fixo' : 'Isento',
      descricao: custos.condominio > 0 ? 'Taxa mensal de condomínio predial' : 'Sem cobrança de taxa de condomínio',
      valor: custos.condominio || 0
    },
    {
      nome: 'Gás de Cozinha',
      tipo: custos.gas > 0 ? 'Rateio médio' : 'Incluso',
      descricao: 'Reposição periódica de gás',
      valor: custos.gas || 0
    },
    {
      nome: 'Taxa de Limpeza / Diarista',
      tipo: custos.taxaLimpeza > 0 ? 'Rateio mensal' : 'Inclusa/Escala',
      descricao: custos.taxaLimpeza > 0 ? 'Diarista para áreas comuns' : 'Divisão por escala interna',
      valor: custos.taxaLimpeza || 0
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto border animate-fadeIn transition-colors duration-200"
        style={{
          backgroundColor: tema.cardBg,
          borderColor: tema.border,
          color: tema.text
        }}
      >
        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border transition-all hover:scale-105 z-10"
          style={{
            backgroundColor: isDarkMode ? '#171825' : '#F3F4F6',
            borderColor: tema.border,
            color: tema.text
          }}
          title="Fechar janela (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho da Vaga */}
        <div className="pr-12 mb-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}
            >
              <Home className="w-3.5 h-3.5" />
              {REGRAS_LABELS.tipoMoradia[dados.tipoMoradia] || dados.tipoMoradia}
            </span>

            <span 
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ 
                backgroundColor: isDarkMode ? tema.primary : '#006B3E', 
                color: isDarkMode ? tema.primaryText : '#FFFFFF' 
              }}
            >
              {dados.distanciaUflaKm} km da UFLA
            </span>

            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{ backgroundColor: tema.cardBg, borderColor: tema.border, color: tema.subtext }}
            >
              Bairro {dados.bairro}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight" style={{ color: tema.text }}>
            {dados.titulo}
          </h2>

          <p className="text-xs sm:text-sm flex items-center gap-1.5 mt-2" style={{ color: tema.subtext }}>
            <MapPin className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{dados.endereco}</span>
          </p>
        </div>

        {/* Imagem de Capa com Destaque */}
        <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden mb-6 bg-gray-100 border" style={{ borderColor: tema.border }}>
          <img
            src={dados.imagemCapa}
            alt={dados.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <span>Disponibilidade: <strong>{dados.dataDisponibilidade || 'Imediata'}</strong></span>
            <span>•</span>
            <span>{dados.generoMoradia ? REGRAS_LABELS.generoMoradia[dados.generoMoradia] : 'Mista'}</span>
          </div>
        </div>

        {/* Descrição e Ponto de Referência */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: tema.subtext }}>
            <Info className="w-4 h-4 text-emerald-600" />
            Sobre a Moradia
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: tema.text }}>
            {dados.descricao}
          </p>

          {dados.pontoReferencia && (
            <div 
              className="mt-3 p-3 rounded-xl border text-xs font-medium flex items-center gap-2"
              style={{
                backgroundColor: tema.secondaryBg,
                borderColor: tema.border,
                color: tema.secondaryText
              }}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span><strong>Ponto de referência:</strong> {dados.pontoReferencia}</span>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* TABELA DE CUSTOS ABERTOS (OBRIGATÓRIO: A DOR CENTRAL)   */}
        {/* ======================================================== */}
        <div 
          className="mb-8 p-5 sm:p-6 rounded-2xl border shadow-md transition-colors"
          style={{
            backgroundColor: isDarkMode ? '#1E2034' : '#F9FBF9',
            borderColor: isDarkMode ? '#333752' : '#CBE5D4'
          }}
        >
          {/* Cabeçalho da Seção de Transparência Financeira */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b" style={{ borderColor: tema.border }}>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: tema.text }}>
                  Tabela de Custos Abertos (Sem Contas Invisíveis)
                </h3>
              </div>
              <p className="text-xs mt-0.5" style={{ color: tema.subtext }}>
                Todos os custos mapeados e discriminados antes do seu contato.
              </p>
            </div>

            <span 
              className="self-start sm:self-auto px-2.5 py-1 rounded-lg text-xs font-bold border"
              style={{
                backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                borderColor: isDarkMode ? '#8FD1A8' : '#A5D6A7',
                color: isDarkMode ? '#8FD1A8' : '#006B3E'
              }}
            >
              100% Transparente
            </span>
          </div>

          {/* Tabela de Preços Formatada */}
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
                {itensTabelaCustos.map((item, idx) => (
                  <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-2.5 font-semibold" style={{ color: tema.text }}>
                      {item.nome}
                    </td>
                    <td className="py-2.5 hidden sm:table-cell" style={{ color: tema.subtext }}>
                      <span 
                        className="px-2 py-0.5 rounded text-[11px] font-semibold"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(143, 209, 168, 0.15)' : '#E8F5E9',
                          color: isDarkMode ? '#8FD1A8' : '#006B3E',
                          border: isDarkMode ? '1px solid rgba(143, 209, 168, 0.3)' : '1px solid #C8E6C9'
                        }}
                      >
                        {item.tipo}
                      </span>
                    </td>
                    <td className="py-2.5 text-xs hidden md:table-cell" style={{ color: tema.subtext }}>
                      {item.descricao}
                    </td>
                    <td className="py-2.5 font-bold text-right" style={{ color: item.valor === 0 ? tema.subtext : tema.text }}>
                      {item.valor > 0 ? formatCurrency(item.valor) : 'Incluso'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {/* Linha de Subtotal: Aluguel vs Contas */}
                <tr className="border-t" style={{ borderColor: tema.border }}>
                  <td colSpan={2} className="pt-3 pb-1 text-xs" style={{ color: tema.subtext }}>
                    Aluguel Base: <strong>{formatCurrency(dados.valorAluguel)}</strong> | Taxas adicionais: <strong>{formatCurrency(dados.valorContasInvisiveis)}</strong>
                  </td>
                  <td colSpan={2} className="pt-3 pb-1 text-xs text-right hidden sm:table-cell" style={{ color: tema.subtext }}>
                    Total mensal fechado:
                  </td>
                </tr>

                {/* Linha de Destaque Final: Total Mensal Estimado */}
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
                      {formatCurrency(dados.valorTotal)}
                    </span>
                    <span className="text-xs font-semibold ml-1" style={{ color: tema.subtext }}>/mês</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Observações sobre Custos e Caução */}
          <div className="mt-4 pt-3 border-t text-xs space-y-1.5" style={{ borderColor: tema.border }}>
            {dados.observacaoCustos && (
              <p className="italic" style={{ color: tema.subtext }}>
                * {dados.observacaoCustos}
              </p>
            )}
            <p style={{ color: tema.subtext }}>
              • <strong>Garantia/Caução:</strong> {dados.caucaoExigida ? `Exige caução prévia no valor de ${formatCurrency(dados.valorCaucao || dados.valorAluguel)}` : 'Não exige adiantamento de caução.'}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FIT CULTURAL & REGRAS DE CONVIVÊNCIA                    */}
        {/* ======================================================== */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: tema.subtext }}>
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            Fit Cultural & Regras de Convivência
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1E2034' : '#FAFAFF', borderColor: tema.border }}>
              <span className="uppercase text-[11px] font-bold block" style={{ color: tema.subtext }}>Animais de Estimação</span>
              <strong className="text-sm mt-0.5 block" style={{ color: tema.text }}>
                {dados.regras.aceitaPet ? '✓ Aceita pets' : '✕ Não aceita animais'}
              </strong>
            </div>

            <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1E2034' : '#FAFAFF', borderColor: tema.border }}>
              <span className="uppercase text-[11px] font-bold block" style={{ color: tema.subtext }}>Hábito de Fumo</span>
              <strong className="text-sm mt-0.5 block" style={{ color: tema.text }}>
                {dados.regras.permiteFumar ? '✓ Fumo permitido' : '✕ Ambiente estritamente não-fumante'}
              </strong>
            </div>

            <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1E2034' : '#FAFAFF', borderColor: tema.border }}>
              <span className="uppercase text-[11px] font-bold block" style={{ color: tema.subtext }}>Festas e Confraternizações</span>
              <strong className="text-sm mt-0.5 block" style={{ color: tema.text }}>
                {REGRAS_LABELS.festasEventos[dados.regras.festasEventos] || dados.regras.festasEventos}
              </strong>
            </div>

            <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1E2034' : '#FAFAFF', borderColor: tema.border }}>
              <span className="uppercase text-[11px] font-bold block" style={{ color: tema.subtext }}>Rotina de Limpeza</span>
              <strong className="text-sm mt-0.5 block" style={{ color: tema.text }}>
                {REGRAS_LABELS.organizacaoLimpeza[dados.regras.organizacaoLimpeza] || dados.regras.organizacaoLimpeza}
              </strong>
            </div>

            <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1E2034' : '#FAFAFF', borderColor: tema.border }}>
              <span className="uppercase text-[11px] font-bold block" style={{ color: tema.subtext }}>Política de Visitas</span>
              <strong className="text-sm mt-0.5 block" style={{ color: tema.text }}>
                {REGRAS_LABELS.visitasPermitidas[dados.regras.visitasPermitidas] || 'Visitas com aviso prévio'}
              </strong>
            </div>

            <div className="p-3 rounded-xl border" style={{ backgroundColor: isDarkMode ? '#1E2034' : '#FAFAFF', borderColor: tema.border }}>
              <span className="uppercase text-[11px] font-bold block" style={{ color: tema.subtext }}>Ambiente para Estudos</span>
              <strong className="text-sm mt-0.5 block" style={{ color: tema.text }}>
                {dados.regras.ambienteSilenciosoEstudo ? '★ Foco total em silêncio e estudo' : 'Rotina flexível'}
              </strong>
            </div>
          </div>
        </div>

        {/* Comodidades Inclusas */}
        {dados.comodidades && dados.comodidades.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: tema.subtext }}>
              Comodidades Inclusas
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {dados.comodidades.map((item, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5"
                  style={{ backgroundColor: tema.secondaryBg, color: tema.secondaryText }}
                >
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Responsável pelo Anúncio */}
        <div 
          className="p-4 rounded-2xl border mb-6 flex items-center justify-between"
          style={{ backgroundColor: isDarkMode ? '#1E2034' : '#FAFAFF', borderColor: tema.border }}
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: tema.subtext }}>
              Anunciante / Morador
            </span>
            <p className="font-bold text-sm mt-0.5" style={{ color: tema.text }}>
              {dados.responsavel?.nome}
            </p>
            <p className="text-xs" style={{ color: tema.subtext }}>
              {dados.responsavel?.papel} {dados.responsavel?.periodo ? `• ${dados.responsavel?.periodo}` : ''}
            </p>
          </div>

          <div className="text-right text-xs" style={{ color: tema.subtext }}>
            <span>Contato direto</span>
            <span className="block font-bold text-emerald-600 dark:text-emerald-400">Sem taxa de corretagem</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTÃO FINAL QUE VALIDA A HIPÓTESE: REDIRECIONAMENTO WPP  */}
        {/* ======================================================== */}
        <div className="pt-4 border-t space-y-3" style={{ borderColor: tema.border }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-white font-black text-base shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all"
            style={{
              backgroundColor: isDarkMode ? '#4A9C6D' : '#006B3E',
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Tenho Interesse • Chamar no WhatsApp</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <p className="text-center text-xs" style={{ color: tema.subtext }}>
            Ao clicar, uma conversa será aberta no WhatsApp com mensagem já preenchida para falar diretamente com <strong>{dados.responsavel?.nome}</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}
