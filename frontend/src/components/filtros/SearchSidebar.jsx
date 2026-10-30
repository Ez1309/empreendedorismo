import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Componente da barra lateral de filtros da aplicação.
 * 
 * Fase 1 (Membro 1): Layout base, tema e integração com o estado global de filtros.
 * Fase 2 (Membro 2 - Responsável): Aperfeiçoar inputs, regras de convivência, tipagem e contadores.
 */
export default function SearchSidebar({ filtros, setFiltros }) {
  const { tema, isDarkMode } = useTheme();

  const handleChange = (campo, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleReset = () => {
    setFiltros({
      precoMaximo: '',
      distanciaMaximaKm: '',
      aceitaPet: false,
      permiteFumar: false,
      ambienteSilencioso: false,
      tipoMoradia: 'todos',
      generoMoradia: 'todos',
      termoBusca: ''
    });
  };

  return (
    <div 
      className="rounded-2xl p-5 border sticky top-24 space-y-6 shadow-sm transition-colors duration-300"
      style={{
        backgroundColor: tema.cardBg, // Space Indigo (#2B2D42) no dark mode!
        borderColor: tema.border
      }}
    >
      <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: tema.border }}>
        <h3 className="font-bold flex items-center gap-2 text-sm" style={{ color: tema.text }}>
          <SlidersHorizontal className="w-4 h-4" style={{ color: isDarkMode ? '#4ADE80' : '#006B3E' }} />
          Filtros de busca
        </h3>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs flex items-center gap-1 transition-colors font-semibold hover:opacity-80"
          style={{ color: tema.subtext }}
        >
          <RotateCcw className="w-3 h-3" />
          Limpar
        </button>
      </div>

      {/* Orçamento Máximo */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: tema.text }}>
          Orçamento máximo (R$)
        </label>
        <input
          type="number"
          placeholder="Ex: 650"
          value={filtros.precoMaximo}
          onChange={(e) => handleChange('precoMaximo', e.target.value)}
          className="w-full px-3.5 py-2 text-sm border rounded-xl outline-none transition-all font-medium focus:ring-2"
          style={{
            backgroundColor: isDarkMode ? '#1F2133' : tema.bg,
            borderColor: tema.border,
            color: tema.text
          }}
        />
        <span className="text-[11px] mt-1 block" style={{ color: tema.subtext }}>
          Aluguel somado a todas as despesas.
        </span>
      </div>

      {/* Distância da UFLA */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: tema.text }}>
          Distância do campus
        </label>
        <select
          value={filtros.distanciaMaximaKm}
          onChange={(e) => handleChange('distanciaMaximaKm', e.target.value)}
          className="w-full px-3.5 py-2 text-sm border rounded-xl outline-none transition-all font-medium focus:ring-2"
          style={{
            backgroundColor: isDarkMode ? '#1F2133' : tema.bg,
            borderColor: tema.border,
            color: tema.text
          }}
        >
          <option value="">Qualquer distância</option>
          <option value="1">Até 1.0 km (caminhada rápida)</option>
          <option value="1.5">Até 1.5 km</option>
          <option value="2.5">Até 2.5 km</option>
        </select>
      </div>

      {/* Regras de Convivência */}
      <div className="pt-2 border-t" style={{ borderColor: tema.border }}>
        <label className="block text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: tema.text }}>
          Convivência
        </label>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none font-medium" style={{ color: tema.text }}>
            <input
              type="checkbox"
              checked={filtros.aceitaPet}
              onChange={(e) => handleChange('aceitaPet', e.target.checked)}
              className="w-4 h-4 rounded"
              style={{ accentColor: isDarkMode ? '#4ADE80' : '#006B3E' }}
            />
            <span>Aceita animais</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none font-medium" style={{ color: tema.text }}>
            <input
              type="checkbox"
              checked={filtros.permiteFumar}
              onChange={(e) => handleChange('permiteFumar', e.target.checked)}
              className="w-4 h-4 rounded"
              style={{ accentColor: isDarkMode ? '#4ADE80' : '#006B3E' }}
            />
            <span>Permite fumantes</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none font-medium" style={{ color: tema.text }}>
            <input
              type="checkbox"
              checked={filtros.ambienteSilencioso}
              onChange={(e) => handleChange('ambienteSilencioso', e.target.checked)}
              className="w-4 h-4 rounded"
              style={{ accentColor: isDarkMode ? '#4ADE80' : '#006B3E' }}
            />
            <span>Silencioso / foco em estudo</span>
          </label>
        </div>
      </div>

      {/* Tipo de Imóvel */}
      <div className="pt-2 border-t" style={{ borderColor: tema.border }}>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: tema.text }}>
          Tipo de moradia
        </label>
        <select
          value={filtros.tipoMoradia}
          onChange={(e) => handleChange('tipoMoradia', e.target.value)}
          className="w-full px-3.5 py-2 text-sm border rounded-xl outline-none transition-all font-medium focus:ring-2"
          style={{
            backgroundColor: isDarkMode ? '#1F2133' : tema.bg,
            borderColor: tema.border,
            color: tema.text
          }}
        >
          <option value="todos">Todos os tipos</option>
          <option value="republica">República</option>
          <option value="apartamento_dividido">Apartamento Dividido</option>
          <option value="kitnet">Kitnet Individual</option>
          <option value="pensionato">Pensionato</option>
        </select>
      </div>
    </div>
  );
}
