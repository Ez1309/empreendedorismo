import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { tema } = useTheme();

  return (
    <footer 
      className="border-t mt-auto transition-colors duration-300"
      style={{
        backgroundColor: tema.footerBg, // MESMA COR DO BANNER HERO!
        borderColor: 'rgba(255, 255, 255, 0.15)',
        color: tema.footerText
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Marca */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-black tracking-tight" style={{ color: tema.footerText }}>
                Acomoda<span style={{ color: tema.heroAccent }}>UFLA</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-md" style={{ color: tema.footerSubtext }}>
              A plataforma definitiva para encontrar repúblicas, apartamentos compartilhados e quartos em Lavras. 
              Criada para oferecer segurança, custo total aberto e compatibilidade de convivência para a comunidade universitária.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: tema.footerSubtext }}>
              <MapPin className="w-4 h-4 shrink-0" style={{ color: tema.heroAccent }} />
              <span>Lavras - MG • Campus UFLA</span>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: tema.footerText }}>
              Para Estudantes
            </h3>
            <ul className="space-y-2 text-xs" style={{ color: tema.footerSubtext }}>
              <li>
                <a 
                  href="/" 
                  className="transition-colors hover:underline"
                  style={{ color: tema.footerText }}
                >
                  Buscar Vagas e Repúblicas
                </a>
              </li>
              <li>
                Dicas de Segurança contra Golpes
              </li>
              <li>
                Guia de Bairros de Lavras
              </li>
              <li>
                Calculadora de Custos
              </li>
            </ul>
          </div>

          {/* Compromisso */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: tema.footerText }}>
              Compromisso
            </h3>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-1.5 font-bold" style={{ color: tema.heroAccent }}>
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Gratuito para Alunos</span>
              </p>
              <p className="leading-relaxed" style={{ color: tema.footerSubtext }}>
                Nenhuma taxa ou comissão é cobrada sobre aluguéis ou mensagens.
              </p>
            </div>
          </div>

        </div>

        {/* Linha Inferior */}
        <div 
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
          style={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: tema.footerSubtext }}
        >
          <p>
            © {new Date().getFullYear()} Acomoda UFLA. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            Desenvolvido para quem estuda e vive em Lavras.
          </p>
        </div>
      </div>
    </footer>
  );
}
