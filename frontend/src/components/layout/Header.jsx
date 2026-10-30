import React, { useState } from 'react';
import { Home, ShieldCheck, HelpCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const { tema, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <header 
        className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300"
        style={{
          backgroundColor: isDarkMode ? `${tema.headerBg}F2` : '#FFFFFFFA',
          borderColor: tema.border,
          color: tema.text
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo da Marca */}
            <a href="/" className="flex items-center space-x-3 group">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-all"
                style={{ backgroundColor: isDarkMode ? '#006B3E' : tema.primary }}
              >
                <Home className="w-5 h-5" style={{ color: tema.accent }} />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: tema.text }}>
                  Acomoda
                  <span style={{ color: isDarkMode ? '#4ADE80' : '#006B3E' }}>
                    UFLA
                  </span>
                </span>
                <p className="text-xs font-medium" style={{ color: tema.subtext }}>
                  Lavras, MG
                </p>
              </div>
            </a>

            {/* Destaques e Ações */}
            <div className="flex items-center space-x-2.5 sm:space-x-4">
              <div 
                className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: tema.secondaryBg,
                  color: tema.secondaryText
                }}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Custos 100% transparentes</span>
              </div>

              {/* Botão Oficial de Alternância Modo Claro / Modo Escuro */}
              <button
                type="button"
                onClick={toggleDarkMode}
                className="inline-flex items-center justify-center p-2.5 rounded-xl border transition-all shadow-sm hover:scale-105"
                style={{
                  backgroundColor: tema.cardBg,
                  borderColor: tema.border,
                  color: isDarkMode ? '#FACC15' : tema.primary
                }}
                title={isDarkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro (Space Indigo)"}
                aria-label="Alternar tema claro e escuro"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Botão Como Funciona */}
              <button
                type="button"
                onClick={() => setShowHowItWorksModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-colors shadow-sm"
                style={{
                  backgroundColor: tema.cardBg,
                  borderColor: tema.border,
                  color: tema.text
                }}
              >
                <HelpCircle className="w-4 h-4" style={{ color: isDarkMode ? '#4ADE80' : '#006B3E' }} />
                <span className="hidden sm:inline">Como funciona</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Modal Como Funciona */}
      {showHowItWorksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border"
            style={{
              backgroundColor: tema.cardBg,
              borderColor: tema.border,
              color: tema.text
            }}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: tema.border }}>
              <h3 className="text-lg font-bold" style={{ color: tema.text }}>
                Sobre a Acomoda UFLA
              </h3>
              <button
                type="button"
                onClick={() => setShowHowItWorksModal(false)}
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                style={{ color: tema.subtext }}
              >
                ✕
              </button>
            </div>

            <p className="text-sm mb-6 leading-relaxed" style={{ color: tema.subtext }}>
              Plataforma desenvolvida para simplificar a busca por moradia universitária em Lavras, garantindo previsão orçamentária e alinhamento de rotina.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: '#006B3E', color: '#FFFFFF' }}
                >
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: tema.text }}>Sem custos ocultos</h4>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: tema.subtext }}>
                    Você confere o valor final mensal somando aluguel, condomínio, luz, água, internet e taxa de limpeza.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: isDarkMode ? '#4ADE80' : '#2E7D32', color: isDarkMode ? '#181926' : '#FFFFFF' }}
                >
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: tema.text }}>Fit cultural e convivência</h4>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: tema.subtext }}>
                    Filtre opções por regras de animais, fumo, festas e foco em silêncio para os estudos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: isDarkMode ? '#3A3D5A' : '#19261E', color: tema.accent }}
                >
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: tema.text }}>Contato direto via WhatsApp</h4>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: tema.subtext }}>
                    Sem taxas de corretagem ou intermediação. Fale direto com o anunciante.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHowItWorksModal(false)}
              className="w-full py-2.5 px-4 font-semibold text-sm rounded-xl transition-all shadow-sm"
              style={{
                backgroundColor: isDarkMode ? '#4ADE80' : '#006B3E',
                color: isDarkMode ? '#181926' : '#FFFFFF'
              }}
            >
              Explorar moradias
            </button>
          </div>
        </div>
      )}
    </>
  );
}
