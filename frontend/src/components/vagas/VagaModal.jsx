import React from 'react';
import { DollarSign, MapPin, ExternalLink } from 'lucide-react';
import { formatCurrency, buildWhatsappUrl, REGRAS_LABELS } from '../../utils/formatters';

/**
 * Modal / Pop-up de Detalhamento da Vaga.
 * 
 * Fase 1 (Membro 1): Estruturação base e consumo das props do mock.
 * Fase 3 (Membro 3 - Responsável): 
 *  - Aperfeiçoamento estético e de UI/UX (cards de custos, regras e comodidades).
 *  - Refinamento do botão de ação WhatsApp com mensagem pré-formatada.
 *  - Captura de telas para o relatório da Entrega 4 (print-detalhes.jpg).
 */
export default function VagaModal({ vaga, onClose }) {
  if (!vaga) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Fechar janela"
        >
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="mb-4 pr-8">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            {REGRAS_LABELS.tipoMoradia[vaga.tipoMoradia]} • {vaga.bairro}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
            {vaga.titulo}
          </h2>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {vaga.endereco} ({vaga.distanciaUflaKm} km da UFLA)
          </p>
        </div>

        {/* Imagem */}
        <div className="h-56 sm:h-64 rounded-xl overflow-hidden mb-6 bg-gray-100">
          <img
            src={vaga.imagemCapa}
            alt={vaga.titulo}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Descrição */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            Sobre a Moradia
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {vaga.descricao}
          </p>
          {vaga.pontoReferencia && (
            <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg mt-2 font-medium">
              📍 Ponto de Referência: {vaga.pontoReferencia}
            </p>
          )}
        </div>

        {/* DECOMPOSIÇÃO DE CUSTOS (A Solução da Dor Central) */}
        <div className="mb-6 p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            Composição do Custo Mensal (Sem Contas Ocultas)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
            <div className="p-2.5 bg-white rounded-lg border border-gray-100">
              <span className="text-gray-500 block">Aluguel Base:</span>
              <strong className="text-gray-900 text-sm">{formatCurrency(vaga.valorAluguel)}</strong>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-gray-100">
              <span className="text-gray-500 block">Condomínio:</span>
              <strong className="text-gray-900 text-sm">{formatCurrency(vaga.custosDetalhados.condominio)}</strong>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-gray-100">
              <span className="text-gray-500 block">Energia Elétrica:</span>
              <strong className="text-gray-900 text-sm">{formatCurrency(vaga.custosDetalhados.energiaEletrica)}</strong>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-gray-100">
              <span className="text-gray-500 block">Água/Esgoto:</span>
              <strong className="text-gray-900 text-sm">{formatCurrency(vaga.custosDetalhados.agua)}</strong>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-gray-100">
              <span className="text-gray-500 block">Internet Wi-Fi:</span>
              <strong className="text-gray-900 text-sm">{formatCurrency(vaga.custosDetalhados.internet)}</strong>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-gray-100">
              <span className="text-gray-500 block">IPTU + Outros:</span>
              <strong className="text-gray-900 text-sm">
                {formatCurrency(vaga.custosDetalhados.iptu + vaga.custosDetalhados.taxaLimpeza + vaga.custosDetalhados.gas)}
              </strong>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-xs font-semibold text-gray-700">Total Mensal Estimado:</span>
            <span className="text-2xl font-black text-emerald-700">{formatCurrency(vaga.valorTotal)}</span>
          </div>
          
          {vaga.observacaoCustos && (
            <p className="text-[11px] text-gray-500 mt-2 italic">
              * {vaga.observacaoCustos}
            </p>
          )}
        </div>

        {/* Regras e Convivência */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Fit Cultural & Regras de Convivência
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block">Animais:</span>
              <span className="font-semibold text-gray-800">{vaga.regras.aceitaPet ? 'Aceita animais' : 'Não aceita animais'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block">Fumo:</span>
              <span className="font-semibold text-gray-800">{vaga.regras.permiteFumar ? 'Permitido fumar' : 'Não-fumante'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block">Festas / Barulho:</span>
              <span className="font-semibold text-gray-800">{REGRAS_LABELS.festasEventos[vaga.regras.festasEventos] || vaga.regras.festasEventos}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block">Rotina de Limpeza:</span>
              <span className="font-semibold text-gray-800">{REGRAS_LABELS.organizacaoLimpeza[vaga.regras.organizacaoLimpeza] || vaga.regras.organizacaoLimpeza}</span>
            </div>
          </div>
        </div>

        {/* Comodidades */}
        {vaga.comodidades && vaga.comodidades.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Comodidades Inclusas
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {vaga.comodidades.map((item, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="pt-4 border-t border-gray-200">
          <a
            href={buildWhatsappUrl(vaga.whatsapp, vaga.titulo, vaga.responsavel?.nome)}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <span>Tenho Interesse • Chamar no WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-center text-[11px] text-gray-500 mt-2">
            Anunciado por <strong>{vaga.responsavel?.nome}</strong> ({vaga.responsavel?.papel})
          </p>
        </div>

      </div>
    </div>
  );
}
