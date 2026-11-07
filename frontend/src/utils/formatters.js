/**
 * Utilitários de formatação para o Acomoda UFLA
 */

export function formatCurrency(valor) {
  if (typeof valor !== 'number') return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

export function buildWhatsappUrl(telefone, tituloVaga, nomeAnunciante = '') {
  const saudacao = nomeAnunciante ? `Olá, ${nomeAnunciante}!` : 'Olá!';
  const mensagem = `${saudacao} Vi o seu anúncio no *Acomoda UFLA*: "${tituloVaga}". Gostaria de saber mais informações e verificar se a vaga ainda está disponível!`;
  const cleanPhone = String(telefone).replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(mensagem)}`;
}

export const REGRAS_LABELS = {
  festasEventos: {
    proibidas: 'Sem Festas / Silêncio',
    moderadas: 'Eventos Moderados',
    frequentes: 'Festas Liberadas',
  },
  organizacaoLimpeza: {
    escala_rigida: 'Escala Rígida de Limpeza',
    compartilhada_flexivel: 'Divisão Flexível',
    diarista_inclusa: 'Diarista Inclusa',
  },
  visitasPermitidas: {
    livre: 'Visitas Livres',
    com_aviso: 'Visitas com Aviso Prévio',
    restritas: 'Visitas Restritas',
  },
  tipoMoradia: {
    republica: 'República',
    apartamento_dividido: 'Apartamento Dividido',
    kitnet: 'Kitnet Individual',
    pensionato: 'Pensionato',
  },
  generoMoradia: {
    mista: 'Ambiente Misto',
    feminina: 'Exclusivo Feminino',
    masculina: 'Exclusivo Masculino',
  },
  mobiliado: {
    totalmente_mobiliado: 'Totalmente Mobiliado',
    parcial: 'Semi-mobiliado',
    sem_mobilia: 'Sem Mobília',
  }
};
