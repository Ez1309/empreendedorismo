import { useState, useMemo } from 'react';
import vagasMock from '../data/vagas_mock.json';

/**
 * Hook customizado de consulta e filtragem de vagas.
 * 
 * Fase 1 (Membro 1): Estruturação do contrato de dados e filtros essenciais (busca textual e preço).
 * Fase 2 (Membro 2): Motor de Busca e Lógica de Filtragem Cruzada (regras de convivência, distância e tipo de imóvel).
 */
export function useVagas() {
  const [filtros, setFiltros] = useState({
    precoMaximo: '',
    distanciaMaximaKm: '',
    aceitaPet: false,
    permiteFumar: false,
    ambienteSilencioso: false,
    tipoMoradia: 'todos',
    generoMoradia: 'todos',
    termoBusca: ''
  });

  const vagasFiltradas = useMemo(() => {
    return vagasMock.filter((vaga) => {
      // 1. Filtro por termo de busca textual (Fase 1 - Membro 1)
      if (filtros.termoBusca) {
        const termo = filtros.termoBusca.toLowerCase();
        const matchTitulo = vaga.titulo.toLowerCase().includes(termo);
        const matchBairro = vaga.bairro.toLowerCase().includes(termo);
        const matchDesc = vaga.descricao.toLowerCase().includes(termo);
        if (!matchTitulo && !matchBairro && !matchDesc) return false;
      }

      // 2. Filtro por orçamento máximo (Fase 1 - Membro 1)
      if (filtros.precoMaximo && vaga.valorTotal > Number(filtros.precoMaximo)) {
        return false;
      }

      // =========================================================================
      // TODO [Membro 2 - Fase 2: Motor de Busca e Lógica]:
      // Conectar e validar as condições de filtragem abaixo para habilitar
      // a busca refinada por distância, regras de convivência e tipo de moradia.
      // =========================================================================

      /*
      // A. Filtro por distância máxima até a UFLA
      if (filtros.distanciaMaximaKm && vaga.distanciaUflaKm > Number(filtros.distanciaMaximaKm)) {
        return false;
      }

      // B. Filtros de regras de convivência (Fit Cultural)
      if (filtros.aceitaPet && !vaga.regras.aceitaPet) {
        return false;
      }
      if (filtros.permiteFumar && !vaga.regras.permiteFumar) {
        return false;
      }
      if (filtros.ambienteSilencioso && !vaga.regras.ambienteSilenciosoEstudo) {
        return false;
      }

      // C. Filtros por categorias de moradia e gênero
      if (filtros.tipoMoradia !== 'todos' && vaga.tipoMoradia !== filtros.tipoMoradia) {
        return false;
      }
      if (filtros.generoMoradia !== 'todos' && vaga.generoMoradia !== filtros.generoMoradia) {
        return false;
      }
      */

      return true;
    });
  }, [filtros]);

  return {
    vagas: vagasFiltradas,
    totalVagas: vagasMock.length,
    filtros,
    setFiltros,
  };
}
