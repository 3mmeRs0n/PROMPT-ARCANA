/**
 * ============================================================================
 * ARCANA ✧ O JOGO DA MEMÓRIA DO TARÔ
 * Arquitetura em JavaScript Puro (Vanilla JS)
 * ============================================================================
 * Sistema de Fases e Progressão pelos 22 Arcanos Maiores
 * Áudio Sintetizado via Web Audio API + Partículas Canvas
 * Sem bibliotecas externas ou frameworks.
 */

// ============================================================================
// 1. BANCO DE DADOS DOS 22 ARCANOS MAIORES (LORE & ARTE VETORIAL)
// ============================================================================
const ARCANOS_DATA = [
  {
    id: 'o-louco',
    numeral: '0',
    name: 'O Louco',
    title: 'O Começo Infinito',
    meaning: 'O salto de fé no abismo do desconhecido. Representa a inocência primordial, novas jornadas e potencial ilimitado.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="goldArt0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5D76E" /><stop offset="60%" stop-color="#D4AF37" /><stop offset="100%" stop-color="#8C6615" />
          </linearGradient>
        </defs>
        <path d="M0,115 Q30,105 60,112 L75,130 L0,130 Z" fill="#1b0e30" stroke="url(#goldArt0)" stroke-width="1"/>
        <circle cx="82" cy="28" r="14" fill="none" stroke="url(#goldArt0)" stroke-width="1.2"/>
        <circle cx="82" cy="28" r="8" fill="url(#goldArt0)" opacity="0.6"/>
        <line x1="82" y1="8" x2="82" y2="13" stroke="url(#goldArt0)" stroke-width="1.2"/>
        <line x1="82" y1="43" x2="82" y2="48" stroke="url(#goldArt0)" stroke-width="1.2"/>
        <line x1="62" y1="28" x2="67" y2="28" stroke="url(#goldArt0)" stroke-width="1.2"/>
        <line x1="97" y1="28" x2="102" y2="28" stroke="url(#goldArt0)" stroke-width="1.2"/>
        <circle cx="45" cy="42" r="6" fill="url(#goldArt0)"/>
        <path d="M43,48 Q40,68 32,88 Q48,92 56,86 Q54,68 47,48 Z" fill="#30154e" stroke="url(#goldArt0)" stroke-width="1.2"/>
        <line x1="30" y1="75" x2="65" y2="35" stroke="url(#goldArt0)" stroke-width="1.5"/>
        <circle cx="62" cy="38" r="5" fill="url(#goldArt0)"/>
        <circle cx="36" cy="55" r="2.5" fill="#E8DCC4"/>
        <line x1="36" y1="58" x2="40" y2="64" stroke="url(#goldArt0)" stroke-width="0.8"/>
        <path d="M22,95 Q26,90 28,94 L30,90 Q34,92 32,98 L24,102 Z" fill="#E8DCC4" opacity="0.85"/>
        <polygon points="18,30 20,34 24,35 20,37 18,41 16,37 12,35 16,34" fill="#F5D76E" opacity="0.7"/>
        <polygon points="32,18 33,21 36,22 33,23 32,26 31,23 28,22 31,21" fill="#F5D76E" opacity="0.6"/>
      </svg>`
  },
  {
    id: 'o-mago',
    numeral: 'I',
    name: 'O Mago',
    title: 'A Conexão dos Elementos',
    meaning: 'Como acima, assim abaixo. O domínio da vontade pessoal sobre a matéria e a maestria alquímica dos quatro elementos.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="goldArt1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5D76E" /><stop offset="60%" stop-color="#D4AF37" /><stop offset="100%" stop-color="#8C6615" />
          </linearGradient>
        </defs>
        <path d="M40,24 C34,16 28,24 34,28 C42,32 58,16 66,20 C72,24 66,32 60,28 C52,24 46,30 40,24 Z" fill="none" stroke="url(#goldArt1)" stroke-width="1.4"/>
        <circle cx="50" cy="38" r="6" fill="url(#goldArt1)"/>
        <path d="M47,44 L38,82 L62,82 L53,44 Z" fill="#2b1147" stroke="url(#goldArt1)" stroke-width="1.2"/>
        <line x1="47" y1="48" x2="35" y2="30" stroke="url(#goldArt1)" stroke-width="1.5"/>
        <circle cx="34" cy="28" r="2.5" fill="#F5D76E"/>
        <line x1="53" y1="52" x2="63" y2="70" stroke="url(#goldArt1)" stroke-width="1.5"/>
        <rect x="25" y="82" width="50" height="6" fill="#1b0e30" stroke="url(#goldArt1)" stroke-width="1"/>
        <line x1="30" y1="88" x2="30" y2="108" stroke="url(#goldArt1)" stroke-width="1.2"/>
        <line x1="70" y1="88" x2="70" y2="108" stroke="url(#goldArt1)" stroke-width="1.2"/>
        <path d="M33,76 L37,76 L35,80 L35,82" stroke="url(#goldArt1)" stroke-width="0.9" fill="none"/>
        <line x1="45" y1="74" x2="45" y2="82" stroke="url(#goldArt1)" stroke-width="0.9"/>
        <circle cx="55" cy="78" r="3" stroke="url(#goldArt1)" stroke-width="0.8" fill="none"/>
        <line x1="64" y1="74" x2="67" y2="82" stroke="url(#goldArt1)" stroke-width="1"/>
      </svg>`
  },
  {
    id: 'a-sacerdotisa',
    numeral: 'II',
    name: 'A Sacerdotisa',
    title: 'A Guardiã dos Segredos',
    meaning: 'O templo da intuição, mistérios ocultos e sabedoria silenciosa. Sentada entre os pilares Boaz e Jachin.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="goldArt2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5D76E" /><stop offset="60%" stop-color="#D4AF37" /><stop offset="100%" stop-color="#8C6615" />
          </linearGradient>
        </defs>
        <rect x="14" y="24" width="12" height="85" fill="#120921" stroke="url(#goldArt2)" stroke-width="1.2"/>
        <text x="20" y="68" fill="url(#goldArt2)" font-size="9" font-family="Cinzel" text-anchor="middle" font-weight="bold">B</text>
        <rect x="74" y="24" width="12" height="85" fill="#2d1747" stroke="url(#goldArt2)" stroke-width="1.2"/>
        <text x="80" y="68" fill="url(#goldArt2)" font-size="9" font-family="Cinzel" text-anchor="middle" font-weight="bold">J</text>
        <circle cx="50" cy="30" r="5" fill="url(#goldArt2)"/>
        <path d="M42,28 Q50,22 58,28 Q50,25 42,28 Z" fill="#F5D76E"/>
        <circle cx="50" cy="40" r="6" fill="#E8DCC4"/>
        <path d="M43,45 Q50,42 57,45 L62,95 L38,95 Z" fill="#241038" stroke="url(#goldArt2)" stroke-width="1.2"/>
        <path d="M50,54 L50,62 M46,58 L54,58" stroke="#F5D76E" stroke-width="1.2"/>
        <rect x="42" y="70" width="16" height="10" rx="2" fill="#E8DCC4" stroke="url(#goldArt2)" stroke-width="0.8"/>
        <text x="50" y="78" fill="#1b0e30" font-size="5" font-family="Cinzel" text-anchor="middle" font-weight="bold">TORA</text>
        <path d="M42,106 A10,10 0 0,0 58,106 A7,7 0 0,1 42,106 Z" fill="url(#goldArt2)"/>
      </svg>`
  },
  {
    id: 'a-imperatriz',
    numeral: 'III',
    name: 'A Imperatriz',
    title: 'A Mãe da Criação',
    meaning: 'A abundância fecunda, fertilidade, beleza sensorial e harmonia cósmica. O florescimento da vida.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="goldArt3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5D76E" /><stop offset="60%" stop-color="#D4AF37" /><stop offset="100%" stop-color="#8C6615" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="38" r="16" fill="none" stroke="url(#goldArt3)" stroke-width="0.8" stroke-dasharray="2,3"/>
        <polygon points="50,18 51,21 54,21 52,23 53,26 50,24 47,26 48,23 46,21 49,21" fill="#F5D76E"/>
        <circle cx="50" cy="38" r="6" fill="url(#goldArt3)"/>
        <path d="M44,44 Q35,68 34,92 Q50,96 66,92 Q65,68 56,44 Z" fill="#38164d" stroke="url(#goldArt3)" stroke-width="1.2"/>
        <line x1="58" y1="56" x2="72" y2="40" stroke="url(#goldArt3)" stroke-width="1.4"/>
        <circle cx="73" cy="38" r="3.5" fill="#F5D76E"/>
        <path d="M22,76 C17,70 17,84 25,92 C33,84 33,70 28,76 Z" fill="#230d33" stroke="url(#goldArt3)" stroke-width="1.2"/>
        <circle cx="25" cy="80" r="2.5" stroke="#F5D76E" stroke-width="0.8" fill="none"/>
        <line x1="25" y1="83" x2="25" y2="88" stroke="#F5D76E" stroke-width="0.8"/>
        <circle cx="82" cy="82" r="1.5" fill="#F5D76E"/>
      </svg>`
  },
  {
    id: 'o-imperador',
    numeral: 'IV',
    name: 'O Imperador',
    title: 'O Soberano da Ordem',
    meaning: 'A estabilidade, estrutura, autoridade justa e poder de sustentação sobre a pedra cúbica de Áries.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="goldArt4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5D76E" /><stop offset="60%" stop-color="#D4AF37" /><stop offset="100%" stop-color="#8C6615" />
          </linearGradient>
        </defs>
        <polygon points="10,65 28,38 46,65" fill="#1b0e30" stroke="url(#goldArt4)" stroke-width="0.8"/>
        <polygon points="54,65 72,35 90,65" fill="#1b0e30" stroke="url(#goldArt4)" stroke-width="0.8"/>
        <rect x="24" y="45" width="52" height="65" fill="#160926" stroke="url(#goldArt4)" stroke-width="1.4"/>
        <circle cx="24" cy="46" r="4.5" fill="url(#goldArt4)"/>
        <circle cx="76" cy="46" r="4.5" fill="url(#goldArt4)"/>
        <circle cx="50" cy="38" r="6" fill="url(#goldArt4)"/>
        <path d="M43,33 L46,28 L50,31 L54,28 L57,33 Z" fill="#F5D76E"/>
        <path d="M43,44 L34,92 L66,92 L57,44 Z" fill="#3d1435" stroke="url(#goldArt4)" stroke-width="1.2"/>
        <line x1="36" y1="62" x2="36" y2="76" stroke="url(#goldArt4)" stroke-width="1.4"/>
        <line x1="33" y1="66" x2="39" y2="66" stroke="url(#goldArt4)" stroke-width="1.4"/>
        <circle cx="36" cy="60" r="3" stroke="url(#goldArt4)" stroke-width="1.2" fill="none"/>
        <circle cx="64" cy="68" r="4" fill="url(#goldArt4)"/>
      </svg>`
  },
  {
    id: 'o-hierofante',
    numeral: 'V',
    name: 'O Hierofante',
    title: 'O Mestre dos Mistérios',
    meaning: 'A transmissão da sabedoria sagrada, tradição esotérica e pontes entre o divino e os homens.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="goldArt5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5D76E" /><stop offset="60%" stop-color="#D4AF37" /><stop offset="100%" stop-color="#8C6615" />
          </linearGradient>
        </defs>
        <rect x="18" y="28" width="8" height="80" fill="#1a0d2e" stroke="url(#goldArt5)" stroke-width="1"/>
        <rect x="74" y="28" width="8" height="80" fill="#1a0d2e" stroke="url(#goldArt5)" stroke-width="1"/>
        <path d="M44,28 L56,28 L54,23 L46,23 Z" fill="url(#goldArt5)"/>
        <path d="M46,23 L54,23 L52,18 L48,18 Z" fill="#F5D76E"/>
        <circle cx="50" cy="36" r="6" fill="url(#goldArt5)"/>
        <path d="M44,42 L34,94 L66,94 L56,42 Z" fill="#2c1445" stroke="url(#goldArt5)" stroke-width="1.2"/>
        <line x1="68" y1="36" x2="68" y2="82" stroke="url(#goldArt5)" stroke-width="1.4"/>
        <line x1="64" y1="40" x2="72" y2="40" stroke="url(#goldArt5)" stroke-width="1.4"/>
        <line x1="62" y1="45" x2="74" y2="45" stroke="url(#goldArt5)" stroke-width="1.4"/>
        <circle cx="38" cy="50" r="3" fill="#F5D76E"/>
        <g transform="translate(50, 104)">
          <line x1="-10" y1="-8" x2="10" y2="8" stroke="url(#goldArt5)" stroke-width="1.2"/>
          <line x1="10" y1="-8" x2="-10" y2="8" stroke="url(#goldArt5)" stroke-width="1.2"/>
        </g>
      </svg>`
  },
  {
    id: 'os-enamorados',
    numeral: 'VI',
    name: 'Os Enamorados',
    title: 'A Escolha Sagrada',
    meaning: 'A união dos opostos, amor sagrado, escolhas do coração e a bênção do anjo Rafael sob o sol divino.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt6"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <circle cx="50" cy="22" r="12" fill="url(#goldArt6)" opacity="0.8"/>
        <!-- Asas do Anjo -->
        <path d="M50,30 C30,16 20,38 35,46 C42,42 48,34 50,30 Z" fill="#4B2378" stroke="url(#goldArt6)" stroke-width="1"/>
        <path d="M50,30 C70,16 80,38 65,46 C58,42 52,34 50,30 Z" fill="#4B2378" stroke="url(#goldArt6)" stroke-width="1"/>
        <circle cx="50" cy="34" r="5" fill="#F5D76E"/>
        <!-- Dois Amantes / Almas -->
        <circle cx="32" cy="72" r="5" fill="url(#goldArt6)"/>
        <path d="M28,78 L24,106 L40,106 L36,78 Z" fill="#25113F" stroke="url(#goldArt6)" stroke-width="1"/>
        <circle cx="68" cy="72" r="5" fill="url(#goldArt6)"/>
        <path d="M64,78 L60,106 L76,106 L72,78 Z" fill="#25113F" stroke="url(#goldArt6)" stroke-width="1"/>
        <!-- Corações Entrelaçados -->
        <path d="M50,84 Q44,76 38,84 Q50,96 50,102 Q50,96 62,84 Q56,76 50,84 Z" fill="none" stroke="url(#goldArt6)" stroke-width="1.2"/>
      </svg>`
  },
  {
    id: 'o-carro',
    numeral: 'VII',
    name: 'O Carro',
    title: 'O Triunfo da Vontade',
    meaning: 'A marcha da determinação, foco inabalável e o controle das forças polares (esfinges de luz e trevas).',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt7"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#A98224"/></linearGradient></defs>
        <!-- Dossel de Estrelas -->
        <path d="M22,25 L78,25 L72,36 L28,36 Z" fill="#160B29" stroke="url(#goldArt7)" stroke-width="1"/>
        <circle cx="50" cy="30" r="1.5" fill="#F5D76E"/>
        <circle cx="36" cy="30" r="1.5" fill="#F5D76E"/>
        <circle cx="64" cy="30" r="1.5" fill="#F5D76E"/>
        <!-- Guerreiro no Carro -->
        <circle cx="50" cy="46" r="6" fill="url(#goldArt7)"/>
        <path d="M42,54 L58,54 L55,75 L45,75 Z" fill="#381854" stroke="url(#goldArt7)" stroke-width="1.2"/>
        <!-- Roda e Carruagem Cúbica -->
        <rect x="25" y="72" width="50" height="24" fill="#120620" stroke="url(#goldArt7)" stroke-width="1.3"/>
        <circle cx="18" cy="90" r="8" fill="none" stroke="url(#goldArt7)" stroke-width="1.2"/>
        <circle cx="82" cy="90" r="8" fill="none" stroke="url(#goldArt7)" stroke-width="1.2"/>
        <!-- Duas Esfinges -->
        <path d="M30,102 Q34,94 40,106 Z" fill="#050308" stroke="url(#goldArt7)" stroke-width="1"/>
        <path d="M60,102 Q66,94 70,106 Z" fill="#E8DCC4" stroke="url(#goldArt7)" stroke-width="1"/>
      </svg>`
  },
  {
    id: 'a-forca',
    numeral: 'VIII',
    name: 'A Força',
    title: 'A Maestria do Coração',
    meaning: 'A coragem serena, compaixão e o domínio suave dos instintos primordiais através do amor.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt8"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <!-- Lemniscata ∞ -->
        <path d="M40,24 C34,18 30,26 36,30 C44,34 56,18 64,22 C70,26 64,34 58,30 C50,26 46,30 40,24 Z" fill="none" stroke="url(#goldArt8)" stroke-width="1.3"/>
        <circle cx="48" cy="40" r="6" fill="url(#goldArt8)"/>
        <path d="M42,47 L35,90 L60,90 L52,47 Z" fill="#36174d" stroke="url(#goldArt8)" stroke-width="1.2"/>
        <!-- Juba do Leão e Focinho Amansado -->
        <circle cx="68" cy="85" r="14" fill="none" stroke="url(#goldArt8)" stroke-width="1.5" stroke-dasharray="3,2"/>
        <path d="M62,82 Q74,76 76,86 Q72,92 64,88 Z" fill="#1b0e30" stroke="url(#goldArt8)" stroke-width="1.2"/>
        <circle cx="70" cy="83" r="1.5" fill="#F5D76E"/>
        <!-- Guirlanda de Flores -->
        <line x1="40" y1="62" x2="68" y2="78" stroke="url(#goldArt8)" stroke-width="1" stroke-dasharray="2,2"/>
      </svg>`
  },
  {
    id: 'o-eremita',
    numeral: 'IX',
    name: 'O Eremita',
    title: 'A Luz da Introspecção',
    meaning: 'A busca silenciosa pela verdade essencial. O sábio solitário no pico nevado com sua lanterna da sabedoria.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt9"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <polygon points="15,115 50,85 85,115" fill="#120822" stroke="url(#goldArt9)" stroke-width="1"/>
        <!-- Capuz e Manto do Eremita -->
        <path d="M44,35 Q50,25 56,35 L62,95 L38,95 Z" fill="#24123b" stroke="url(#goldArt9)" stroke-width="1.3"/>
        <circle cx="50" cy="40" r="4.5" fill="#E8DCC4"/>
        <!-- Cajado Dourado -->
        <line x1="38" y1="36" x2="32" y2="108" stroke="url(#goldArt9)" stroke-width="1.6"/>
        <!-- Lanterna com Estrela de 6 Pontas -->
        <rect x="62" y="48" width="12" height="18" rx="2" fill="#F5D76E" opacity="0.3" stroke="url(#goldArt9)" stroke-width="1.2"/>
        <polygon points="68,52 72,59 64,59" fill="url(#goldArt9)"/>
        <polygon points="68,62 72,55 64,55" fill="url(#goldArt9)"/>
        <circle cx="68" cy="57" r="8" fill="url(#goldArt9)" opacity="0.2"/>
      </svg>`
  },
  {
    id: 'a-roda-da-fortuna',
    numeral: 'X',
    name: 'A Roda da Fortuna',
    title: 'Os Ciclos do Destino',
    meaning: 'As voltas cósmicas do tempo, mudanças inexoráveis, carma e a perpétua dança da transformação universal.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt10"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#A98224"/></linearGradient></defs>
        <!-- A Grande Roda com 8 Raios -->
        <circle cx="50" cy="65" r="32" fill="#160B29" stroke="url(#goldArt10)" stroke-width="1.6"/>
        <circle cx="50" cy="65" r="22" fill="none" stroke="url(#goldArt10)" stroke-width="1" stroke-dasharray="3,3"/>
        <circle cx="50" cy="65" r="6" fill="url(#goldArt10)"/>
        <line x1="50" y1="33" x2="50" y2="97" stroke="url(#goldArt10)" stroke-width="1.2"/>
        <line x1="18" y1="65" x2="82" y2="65" stroke="url(#goldArt10)" stroke-width="1.2"/>
        <line x1="27" y1="42" x2="73" y2="88" stroke="url(#goldArt10)" stroke-width="1.2"/>
        <line x1="27" y1="88" x2="73" y2="42" stroke="url(#goldArt10)" stroke-width="1.2"/>
        <!-- Esfinge Guardiã no Topo -->
        <path d="M44,28 Q50,18 56,28 Z" fill="url(#goldArt10)"/>
        <line x1="56" y1="22" x2="64" y2="16" stroke="url(#goldArt10)" stroke-width="1.2"/>
        <!-- Letras Místicas T-A-R-O -->
        <text x="50" y="42" fill="#F5D76E" font-size="6" font-family="Cinzel" text-anchor="middle">T</text>
        <text x="73" y="67" fill="#F5D76E" font-size="6" font-family="Cinzel" text-anchor="middle">A</text>
        <text x="50" y="92" fill="#F5D76E" font-size="6" font-family="Cinzel" text-anchor="middle">R</text>
        <text x="27" y="67" fill="#F5D76E" font-size="6" font-family="Cinzel" text-anchor="middle">O</text>
      </svg>`
  },
  {
    id: 'a-justica',
    numeral: 'XI',
    name: 'A Justiça',
    title: 'A Balança da Verdade',
    meaning: 'Equilíbrio kármico, clareza racional, retidão e causa e efeito. A espada erguida e a balança impecável.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt11"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <!-- Trono e Colunas -->
        <rect x="22" y="25" width="6" height="85" fill="#1b0e30" stroke="url(#goldArt11)" stroke-width="1"/>
        <rect x="72" y="25" width="6" height="85" fill="#1b0e30" stroke="url(#goldArt11)" stroke-width="1"/>
        <circle cx="50" cy="40" r="6" fill="url(#goldArt11)"/>
        <path d="M43,33 L47,28 L53,28 L57,33 Z" fill="#F5D76E"/>
        <path d="M44,46 L36,94 L64,94 L56,46 Z" fill="#2d1242" stroke="url(#goldArt11)" stroke-width="1.2"/>
        <!-- Espada da Verdade Erguida na Mão Direita -->
        <line x1="34" y1="28" x2="34" y2="70" stroke="url(#goldArt11)" stroke-width="1.5"/>
        <line x1="30" y1="62" x2="38" y2="62" stroke="url(#goldArt11)" stroke-width="1.5"/>
        <!-- Balança Equilibrada na Mão Esquerda -->
        <line x1="62" y1="52" x2="76" y2="52" stroke="url(#goldArt11)" stroke-width="1.2"/>
        <path d="M62,52 L59,62 L65,62 Z" fill="none" stroke="url(#goldArt11)" stroke-width="0.8"/>
        <path d="M76,52 L73,62 L79,62 Z" fill="none" stroke="url(#goldArt11)" stroke-width="0.8"/>
      </svg>`
  },
  {
    id: 'o-enforcado',
    numeral: 'XII',
    name: 'O Enforcado',
    title: 'A Nova Perspectiva',
    meaning: 'Rendição consciente, inversão da visão comum e iluminação espiritual através do sacrifício voluntário.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt12"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <!-- Madeira Viva em forma de Tau T -->
        <rect x="25" y="18" width="50" height="7" fill="#1f0f35" stroke="url(#goldArt12)" stroke-width="1.2"/>
        <rect x="47" y="25" width="6" height="30" fill="#1f0f35" stroke="url(#goldArt12)" stroke-width="1"/>
        <!-- Perna Presa e Perna Dobrada em 4 -->
        <line x1="50" y1="25" x2="50" y2="52" stroke="url(#goldArt12)" stroke-width="1.8"/>
        <path d="M50,52 L38,64 L50,64" stroke="url(#goldArt12)" stroke-width="1.5" fill="none"/>
        <!-- Corpo Invertido -->
        <path d="M45,55 L42,88 L58,88 L55,55 Z" fill="#35174e" stroke="url(#goldArt12)" stroke-width="1.2"/>
        <!-- Auréola de Luz Dourada ao Redor da Cabeça -->
        <circle cx="50" cy="98" r="10" fill="none" stroke="url(#goldArt12)" stroke-width="1" stroke-dasharray="2,2"/>
        <circle cx="50" cy="98" r="5" fill="#E8DCC4"/>
      </svg>`
  },
  {
    id: 'a-morte',
    numeral: 'XIII',
    name: 'A Morte',
    title: 'A Grande Metamorfose',
    meaning: 'O fim inadiável do velho para o nascimento do novo. A transmutação da alma, renovação e renascimento.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt13"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#A98224"/></linearGradient></defs>
        <!-- Torres Gêmeas e Sol Nascente da Imortalidade -->
        <rect x="75" y="45" width="8" height="50" fill="#10061e" stroke="url(#goldArt13)" stroke-width="1"/>
        <rect x="88" y="45" width="8" height="50" fill="#10061e" stroke="url(#goldArt13)" stroke-width="1"/>
        <circle cx="85" cy="55" r="5" fill="#F5D76E" opacity="0.8"/>
        <!-- Cavaleiro Esqueleto em Armadura Negra -->
        <circle cx="36" cy="42" r="5" fill="#E8DCC4"/>
        <path d="M32,48 L28,80 L44,80 L40,48 Z" fill="#080310" stroke="url(#goldArt13)" stroke-width="1.2"/>
        <!-- Estandarte com a Rosa Branca de 5 Pétalas -->
        <line x1="28" y1="20" x2="28" y2="90" stroke="url(#goldArt13)" stroke-width="1.5"/>
        <rect x="28" y="22" width="28" height="20" fill="#050308" stroke="url(#goldArt13)" stroke-width="1"/>
        <circle cx="42" cy="32" r="3" fill="#E8DCC4"/>
        <circle cx="42" cy="32" r="6" fill="none" stroke="#E8DCC4" stroke-width="0.8" stroke-dasharray="3,2"/>
      </svg>`
  },
  {
    id: 'a-temperanca',
    numeral: 'XIV',
    name: 'A Temperança',
    title: 'A Alquimia da Cura',
    meaning: 'A fusão harmoniosa dos contrários. O anjo que verte as águas da vida entre cálices celestiais sem perder uma gota.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt14"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <!-- Asas Luminosas -->
        <path d="M50,40 C32,25 22,50 34,60 C42,54 48,46 50,40 Z" fill="#4B2378" stroke="url(#goldArt14)" stroke-width="1"/>
        <path d="M50,40 C68,25 78,50 66,60 C58,54 52,46 50,40 Z" fill="#4B2378" stroke="url(#goldArt14)" stroke-width="1"/>
        <circle cx="50" cy="40" r="5.5" fill="url(#goldArt14)"/>
        <path d="M44,46 L38,95 L62,95 L56,46 Z" fill="#2d1245" stroke="url(#goldArt14)" stroke-width="1.2"/>
        <!-- Dois Cálices Dourados com Fluxo Alquímico -->
        <path d="M35,62 L41,62 L38,68 Z" fill="url(#goldArt14)"/>
        <path d="M58,74 L64,74 L61,80 Z" fill="url(#goldArt14)"/>
        <path d="M38,68 Q48,72 61,74" stroke="#F5D76E" stroke-width="1.2" fill="none" stroke-dasharray="2,2"/>
      </svg>`
  },
  {
    id: 'o-diabo',
    numeral: 'XV',
    name: 'O Diabo',
    title: 'As Correntes da Matéria',
    meaning: 'A ilusão do apego, sombras inconscientes e as correntes que a própria mente forja para se prender.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt15"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#8C6615"/></linearGradient></defs>
        <!-- Pentagrama Invertido no Topo -->
        <polygon points="50,18 53,24 60,24 55,28 57,35 50,31 43,35 45,28 40,24 47,24" fill="#F5D76E"/>
        <!-- Chifres e Face da Sombra -->
        <path d="M42,32 Q32,18 36,12 Q44,20 46,28" stroke="url(#goldArt15)" stroke-width="1.4" fill="none"/>
        <path d="M58,32 Q68,18 64,12 Q56,20 54,28" stroke="url(#goldArt15)" stroke-width="1.4" fill="none"/>
        <circle cx="50" cy="38" r="7" fill="#1b0e30" stroke="url(#goldArt15)" stroke-width="1"/>
        <!-- Tocha Invertida -->
        <line x1="62" y1="46" x2="72" y2="60" stroke="url(#goldArt15)" stroke-width="1.4"/>
        <circle cx="73" cy="62" r="3" fill="#F5D76E"/>
        <!-- Altar Cúbico e Elos de Correntes -->
        <rect x="34" y="80" width="32" height="26" fill="#0d0417" stroke="url(#goldArt15)" stroke-width="1.2"/>
        <path d="M40,88 C32,94 36,102 42,98" stroke="url(#goldArt15)" stroke-width="1" fill="none"/>
        <path d="M60,88 C68,94 64,102 58,98" stroke="url(#goldArt15)" stroke-width="1" fill="none"/>
      </svg>`
  },
  {
    id: 'a-torre',
    numeral: 'XVI',
    name: 'A Torre',
    title: 'A Ruptura Iluminada',
    meaning: 'O raio da revelação que despedaça as falsas estruturas e castelos de ego para permitir a verdade libertadora.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt16"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <!-- A Torre de Pedra no Pico -->
        <polygon points="34,35 66,35 60,110 40,110" fill="#170928" stroke="url(#goldArt16)" stroke-width="1.4"/>
        <rect x="46" y="52" width="8" height="12" fill="#F5D76E" opacity="0.8"/>
        <rect x="46" y="74" width="8" height="12" fill="#F5D76E" opacity="0.8"/>
        <!-- Coroa Derrubada pela Tempestade Cósmica -->
        <path d="M48,22 L52,16 L56,20 L60,16 L64,22 Z" fill="#F5D76E" transform="rotate(25 56 20)"/>
        <!-- Raio Celestial Flamejante -->
        <polyline points="20,12 45,28 38,36 58,54" stroke="#FFFFFF" stroke-width="2" fill="none"/>
        <polyline points="20,12 45,28 38,36 58,54" stroke="url(#goldArt16)" stroke-width="3" fill="none" opacity="0.7"/>
        <!-- Fagocitos de Fogo caindo -->
        <circle cx="28" cy="45" r="1.5" fill="#F5D76E"/>
        <circle cx="70" cy="52" r="1.5" fill="#F5D76E"/>
        <circle cx="74" cy="78" r="1.5" fill="#F5D76E"/>
      </svg>`
  },
  {
    id: 'a-estrela',
    numeral: 'XVII',
    name: 'A Estrela',
    title: 'A Esperança Celestial',
    meaning: 'A água da vida derramada sob as estrelas. Inspiração cristalina, serenidade e fé inabalável no futuro.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt17"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <!-- Grande Estrela Central de 8 Pontas -->
        <polygon points="50,15 53,24 62,24 55,29 58,38 50,33 42,38 45,29 38,24 47,24" fill="#F5D76E"/>
        <!-- 7 Estrelas Menores -->
        <circle cx="26" cy="20" r="1.5" fill="#F5D76E"/><circle cx="74" cy="20" r="1.5" fill="#F5D76E"/>
        <circle cx="18" cy="34" r="1.5" fill="#F5D76E"/><circle cx="82" cy="34" r="1.5" fill="#F5D76E"/>
        <!-- Donzela Ajoelhada e os Jarros Sagrados -->
        <circle cx="48" cy="58" r="5" fill="#E8DCC4"/>
        <path d="M44,64 L38,98 L56,98 L52,64 Z" fill="#2d1447" stroke="url(#goldArt17)" stroke-width="1.2"/>
        <path d="M32,74 Q24,84 20,95" stroke="#F5D76E" stroke-width="1.2" fill="none"/>
        <path d="M58,74 Q68,84 72,95" stroke="#F5D76E" stroke-width="1.2" fill="none"/>
        <ellipse cx="50" cy="110" rx="35" ry="8" fill="#140824" stroke="url(#goldArt17)" stroke-width="1"/>
      </svg>`
  },
  {
    id: 'a-lua',
    numeral: 'XVIII',
    name: 'A Lua',
    title: 'O Abismo dos Sonhos',
    meaning: 'As miragens do inconsciente, intuições profundas, os portais entre a vigília e a escuridão mística.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt18"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#A98224"/></linearGradient></defs>
        <!-- Lua Cheia com Rosto e Raios -->
        <circle cx="50" cy="34" r="16" fill="url(#goldArt18)" opacity="0.85"/>
        <path d="M46,20 A15,15 0 0,0 52,48 A13,13 0 0,1 46,20 Z" fill="#1b0c33"/>
        <!-- Gotas de Orvalho Cósmico caindo -->
        <circle cx="42" cy="56" r="1" fill="#F5D76E"/><circle cx="58" cy="56" r="1" fill="#F5D76E"/>
        <!-- Torres Sentinelas -->
        <rect x="14" y="60" width="10" height="42" fill="#120720" stroke="url(#goldArt18)" stroke-width="1"/>
        <rect x="76" y="60" width="10" height="42" fill="#120720" stroke="url(#goldArt18)" stroke-width="1"/>
        <!-- Cão e Lobo Uivando -->
        <path d="M30,95 Q35,84 40,95 Z" fill="#31154e" stroke="url(#goldArt18)" stroke-width="1"/>
        <path d="M60,95 Q65,84 70,95 Z" fill="#1f0a35" stroke="url(#goldArt18)" stroke-width="1"/>
        <!-- Lago com Crustáceo Primordial -->
        <path d="M25,115 Q50,105 75,115" stroke="url(#goldArt18)" stroke-width="1.2" fill="none"/>
      </svg>`
  },
  {
    id: 'o-sol',
    numeral: 'XIX',
    name: 'O Sol',
    title: 'A Luz da Consciência',
    meaning: 'Vitalidade gloriosa, celebração, clareza absoluta, alegria radiante e realização suprema.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt19"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="40%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <!-- Sol Dourado Radiante com 16 Raios -->
        <circle cx="50" cy="40" r="18" fill="url(#goldArt19)"/>
        <circle cx="50" cy="40" r="24" fill="none" stroke="url(#goldArt19)" stroke-width="1.2" stroke-dasharray="3,3"/>
        <line x1="50" y1="10" x2="50" y2="18" stroke="url(#goldArt19)" stroke-width="2"/>
        <line x1="50" y1="62" x2="50" y2="70" stroke="url(#goldArt19)" stroke-width="2"/>
        <line x1="20" y1="40" x2="28" y2="40" stroke="url(#goldArt19)" stroke-width="2"/>
        <line x1="72" y1="40" x2="80" y2="40" stroke="url(#goldArt19)" stroke-width="2"/>
        <!-- Muro de Tijolos e Girassóis -->
        <rect x="15" y="92" width="70" height="20" fill="#1e0c33" stroke="url(#goldArt19)" stroke-width="1.2"/>
        <circle cx="28" cy="88" r="4" fill="#F5D76E"/>
        <circle cx="50" cy="86" r="4.5" fill="#F5D76E"/>
        <circle cx="72" cy="88" r="4" fill="#F5D76E"/>
        <!-- Criança Celestial sobre Cavalo Branco -->
        <circle cx="50" cy="74" r="4" fill="#E8DCC4"/>
        <line x1="50" y1="65" x2="62" y2="58" stroke="url(#goldArt19)" stroke-width="1.2"/>
      </svg>`
  },
  {
    id: 'o-julgamento',
    numeral: 'XX',
    name: 'O Julgamento',
    title: 'O Chamado do Despertar',
    meaning: 'Ressurreição da consciência, redenção kármica e o chamado celestial para uma nova oitava de existência.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt20"><stop offset="0%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#D4AF37"/></linearGradient></defs>
        <!-- Nuvens Cósmicas e Trombeta do Arcanjo Gabriel -->
        <ellipse cx="50" cy="22" rx="30" ry="10" fill="#2c1445" stroke="url(#goldArt20)" stroke-width="1"/>
        <circle cx="50" cy="28" r="5" fill="#F5D76E"/>
        <line x1="50" y1="33" x2="50" y2="60" stroke="url(#goldArt20)" stroke-width="2"/>
        <!-- Bandeira da Cruz Solar na Trombeta -->
        <rect x="52" y="38" width="16" height="12" fill="#E8DCC4" stroke="url(#goldArt20)" stroke-width="0.8"/>
        <line x1="60" y1="38" x2="60" y2="50" stroke="#8C2222" stroke-width="1.2"/>
        <line x1="54" y1="44" x2="66" y2="44" stroke="#8C2222" stroke-width="1.2"/>
        <!-- Figuras se Erguendo com Braços Abertos -->
        <rect x="30" y="92" width="40" height="18" fill="#120620" stroke="url(#goldArt20)" stroke-width="1.2"/>
        <circle cx="40" cy="82" r="3.5" fill="#E8DCC4"/>
        <circle cx="50" cy="76" r="4" fill="#E8DCC4"/>
        <circle cx="60" cy="82" r="3.5" fill="#E8DCC4"/>
      </svg>`
  },
  {
    id: 'o-mundo',
    numeral: 'XXI',
    name: 'O Mundo',
    title: 'A Totalidade Cósmica',
    meaning: 'A Grande Obra concluída. A dança do ser integrado em plenitude com os quatro pilares do universo.',
    svg: `
      <svg class="arcana-art-svg" viewBox="0 0 100 130">
        <defs><linearGradient id="goldArt21"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#F5D76E"/><stop offset="100%" stop-color="#A98224"/></linearGradient></defs>
        <!-- Coroa de Louros Elíptica (Vesica Piscis) -->
        <ellipse cx="50" cy="65" rx="26" ry="38" fill="none" stroke="url(#goldArt21)" stroke-width="1.6" stroke-dasharray="4,2"/>
        <!-- Bailarina Cósmica com Bastões -->
        <circle cx="50" cy="46" r="5" fill="#E8DCC4"/>
        <path d="M46,52 L42,86 L58,86 L54,52 Z" fill="#3f165e" stroke="url(#goldArt21)" stroke-width="1.2"/>
        <line x1="38" y1="52" x2="38" y2="76" stroke="url(#goldArt21)" stroke-width="1.4"/>
        <line x1="62" y1="52" x2="62" y2="76" stroke="url(#goldArt21)" stroke-width="1.4"/>
        <!-- 4 Criaturas dos Quatro Elementos nos Cantos -->
        <circle cx="16" cy="18" r="3" fill="url(#goldArt21)"/><!-- Homem / Anjo -->
        <circle cx="84" cy="18" r="3" fill="url(#goldArt21)"/><!-- Águia -->
        <circle cx="16" cy="112" r="3" fill="url(#goldArt21)"/><!-- Touro -->
        <circle cx="84" cy="112" r="3" fill="url(#goldArt21)"/><!-- Leão -->
      </svg>`
  }
];

// ============================================================================
// 2. CONFIGURAÇÃO DAS 7 FASES PROGRESSIVAS
// ============================================================================
const PHASES_CONFIG = [
  {
    id: 1,
    name: 'O Despertar',
    subtitle: 'Fase 1',
    pairs: 6, // 12 cartas
    cardIds: ['o-louco', 'o-mago', 'a-sacerdotisa', 'a-imperatriz', 'o-imperador', 'o-hierofante'],
    timeLimit: null, // Sem limite de tempo
    flipSpeed: 900,
    themeClass: 'grid-phase-1',
    lore: 'O início da jornada. Apresenta o funcionamento do ritual sagrado com os primeiros 6 Arcanos.',
    targets: { three: { moves: 10, time: 40, errors: 3 }, two: { moves: 16, time: 70, errors: 6 } },
    newUnlockIds: ['o-louco', 'o-mago', 'a-sacerdotisa', 'a-imperatriz', 'o-imperador', 'o-hierofante']
  },
  {
    id: 2,
    name: 'O Véu',
    subtitle: 'Fase 2',
    pairs: 8, // 16 cartas
    cardIds: ['o-louco', 'o-mago', 'a-sacerdotisa', 'a-imperatriz', 'o-imperador', 'o-hierofante', 'os-enamorados', 'o-carro'],
    timeLimit: null, // Cronômetro livre mas relevante
    flipSpeed: 850,
    themeClass: 'grid-phase-2',
    lore: 'O véu do templo se agita com a chegada dos Enamorados e do Carro triunfante.',
    targets: { three: { moves: 14, time: 60, errors: 4 }, two: { moves: 22, time: 100, errors: 8 } },
    newUnlockIds: ['os-enamorados', 'o-carro']
  },
  {
    id: 3,
    name: 'Os Mistérios',
    subtitle: 'Fase 3',
    pairs: 10, // 20 cartas
    cardIds: ['o-louco', 'o-mago', 'a-sacerdotisa', 'a-imperatriz', 'o-imperador', 'o-hierofante', 'os-enamorados', 'o-carro', 'a-forca', 'o-eremita'],
    timeLimit: 150, // 2m 30s
    flipSpeed: 800,
    themeClass: 'grid-phase-3',
    lore: 'A luz do Eremita e a coragem da Força. O tempo passa a ser um elemento limitado.',
    targets: { three: { moves: 18, time: 85, errors: 5 }, two: { moves: 28, time: 130, errors: 10 } },
    newUnlockIds: ['a-forca', 'o-eremita']
  },
  {
    id: 4,
    name: 'O Labirinto',
    subtitle: 'Fase 4',
    pairs: 12, // 24 cartas
    cardIds: ['o-louco', 'o-mago', 'a-sacerdotisa', 'a-imperatriz', 'o-imperador', 'o-hierofante', 'os-enamorados', 'o-carro', 'a-forca', 'o-eremita', 'a-roda-da-fortuna', 'a-justica'],
    timeLimit: 180, // 3 min
    flipSpeed: 750,
    themeClass: 'grid-phase-4',
    lore: 'As curvas da Roda da Fortuna e a balança da Justiça exigem rapidez e precisão de foco.',
    targets: { three: { moves: 22, time: 110, errors: 6 }, two: { moves: 34, time: 160, errors: 12 } },
    newUnlockIds: ['a-roda-da-fortuna', 'a-justica']
  },
  {
    id: 5,
    name: 'O Arcano Maior',
    subtitle: 'Fase 5',
    pairs: 15, // 30 cartas
    cardIds: ['o-louco', 'o-mago', 'a-sacerdotisa', 'a-imperatriz', 'o-imperador', 'o-hierofante', 'os-enamorados', 'o-carro', 'a-forca', 'o-eremita', 'a-roda-da-fortuna', 'a-justica', 'o-enforcado', 'a-morte', 'a-temperanca'],
    timeLimit: 220, // 3m 40s
    flipSpeed: 700,
    themeClass: 'grid-phase-5',
    lore: 'A travessia das sombras: O Enforcado, a Morte e a Temperança. Atmosfera sombria e rigorosa.',
    targets: { three: { moves: 28, time: 140, errors: 8 }, two: { moves: 42, time: 195, errors: 15 } },
    newUnlockIds: ['o-enforcado', 'a-morte', 'a-temperanca']
  },
  {
    id: 6,
    name: 'O Destino',
    subtitle: 'Fase 6',
    pairs: 18, // 36 cartas
    cardIds: ['o-louco', 'o-mago', 'a-sacerdotisa', 'a-imperatriz', 'o-imperador', 'o-hierofante', 'os-enamorados', 'o-carro', 'a-forca', 'o-eremita', 'a-roda-da-fortuna', 'a-justica', 'o-enforcado', 'a-morte', 'a-temperanca', 'o-diabo', 'a-torre', 'a-estrela'],
    timeLimit: 260, // 4m 20s
    flipSpeed: 680,
    themeClass: 'grid-phase-6',
    lore: 'O abismo do Diabo, a queda da Torre e a luz da Estrela. Alta dificuldade e reflexos rápidos.',
    targets: { three: { moves: 34, time: 175, errors: 10 }, two: { moves: 52, time: 235, errors: 18 } },
    newUnlockIds: ['o-diabo', 'a-torre', 'a-estrela']
  },
  {
    id: 7,
    name: 'Os 22 Arcanos',
    subtitle: 'Fase Final',
    pairs: 22, // 44 cartas
    cardIds: ARCANOS_DATA.map(c => c.id), // Todos os 22 Arcanos!
    timeLimit: 320, // 5m 20s
    flipSpeed: 650,
    themeClass: 'grid-phase-7',
    lore: 'A Grande Obra consumada. O despertar da Lua, do Sol, do Julgamento e a totalidade do Mundo.',
    targets: { three: { moves: 44, time: 220, errors: 12 }, two: { moves: 66, time: 290, errors: 22 } },
    newUnlockIds: ['a-lua', 'o-sol', 'o-julgamento', 'o-mundo']
  }
];

// ============================================================================
// 3. MOTOR DE ÁUDIO MÍSTICO (WEB AUDIO API SINTETIZADO)
// ============================================================================
class MysticSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('arcana_sound_enabled') !== 'false';
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('arcana_sound_enabled', this.enabled);
    return this.enabled;
  }

  playFlip() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.45);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.45);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    } catch (e) { console.warn(e); }
  }

  playMatch() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [659.25, 830.61, 987.77, 1318.51];
      freqs.forEach((freq, index) => {
        const startTime = now + (index * 0.08);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.11, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.95);
      });
    } catch (e) { console.warn(e); }
  }

  playMismatch() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(146.83, now + 0.45);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
    } catch (e) { console.warn(e); }
  }

  playVictory() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      chords.forEach((freq, idx) => {
        const noteStart = now + (idx * 0.12);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.14, noteStart + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 1.9);
      });
    } catch (e) { console.warn(e); }
  }

  playUnlock() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const chord = [440, 554.37, 659.25, 880, 1108.73];
      chord.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.09);
        gain.gain.setValueAtTime(0.001, now + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.09 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 2.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 2.3);
      });
    } catch (e) { console.warn(e); }
  }

  playPluck() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) { console.warn(e); }
  }
}

// ============================================================================
// 4. SISTEMA DE PARTÍCULAS E POEIRA CÓSMICA
// ============================================================================
class CosmicBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 50;
    this.enabled = localStorage.getItem('arcana_particles_enabled') !== 'false';
    this.animationId = null;

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    window.addEventListener('resize', this.resize);
    this.resize();
    this.initParticles();
    if (this.enabled) this.loop();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1,
        pulsing: Math.random() * 0.02 + 0.008,
        pulseDir: 1,
        color: Math.random() > 0.3 ? '#F5D76E' : '#D4AF37'
      });
    }
  }

  toggle(enable) {
    this.enabled = enable !== undefined ? enable : !this.enabled;
    localStorage.setItem('arcana_particles_enabled', this.enabled);
    if (this.enabled) {
      if (!this.animationId) this.loop();
    } else {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  loop() {
    if (!this.enabled) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha += p.pulsing * p.pulseDir;
      if (p.alpha > 0.85) p.pulseDir = -1;
      if (p.alpha < 0.15) p.pulseDir = 1;
      if (p.y < -10) { p.y = this.height + 10; p.x = Math.random() * this.width; }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
    this.animationId = requestAnimationFrame(this.loop);
  }
}

// ============================================================================
// 5. GERENCIADOR DE PROGRESSÃO E SALVAMENTO (LOCALSTORAGE)
// ============================================================================
class ProgressionManager {
  constructor() {
    this.unlockedPhase = parseInt(localStorage.getItem('arcana_unlocked_phase') || '1', 10);
    this.completedPhases = JSON.parse(localStorage.getItem('arcana_completed_phases') || '[]');
    this.phaseStars = JSON.parse(localStorage.getItem('arcana_phase_stars') || '{}');
    this.bestTimes = JSON.parse(localStorage.getItem('arcana_phase_best_time') || '{}');
    this.bestMoves = JSON.parse(localStorage.getItem('arcana_phase_best_moves') || '{}');
  }

  isPhaseUnlocked(phaseId) {
    return phaseId <= this.unlockedPhase;
  }

  isPhaseCompleted(phaseId) {
    return this.completedPhases.includes(phaseId);
  }

  getStars(phaseId) {
    return this.phaseStars[phaseId] || 0;
  }

  getBestTime(phaseId) {
    return this.bestTimes[phaseId] || null;
  }

  getBestMoves(phaseId) {
    return this.bestMoves[phaseId] || null;
  }

  recordVictory(phaseId, timeSecs, moves, stars) {
    let newlyUnlocked = false;

    // Registrar conclusão
    if (!this.completedPhases.includes(phaseId)) {
      this.completedPhases.push(phaseId);
      localStorage.setItem('arcana_completed_phases', JSON.stringify(this.completedPhases));
    }

    // Desbloquear próxima fase
    if (phaseId === this.unlockedPhase && this.unlockedPhase < PHASES_CONFIG.length) {
      this.unlockedPhase++;
      localStorage.setItem('arcana_unlocked_phase', this.unlockedPhase);
      newlyUnlocked = true;
    }

    // Salvar melhor pontuação de estrelas
    const currentStars = this.phaseStars[phaseId] || 0;
    if (stars > currentStars) {
      this.phaseStars[phaseId] = stars;
      localStorage.setItem('arcana_phase_stars', JSON.stringify(this.phaseStars));
    }

    // Salvar melhor tempo
    const prevBestTime = this.bestTimes[phaseId];
    if (!prevBestTime || timeSecs < prevBestTime) {
      this.bestTimes[phaseId] = timeSecs;
      localStorage.setItem('arcana_phase_best_time', JSON.stringify(this.bestTimes));
    }

    // Salvar menores movimentos
    const prevBestMoves = this.bestMoves[phaseId];
    if (!prevBestMoves || moves < prevBestMoves) {
      this.bestMoves[phaseId] = moves;
      localStorage.setItem('arcana_phase_best_moves', JSON.stringify(this.bestMoves));
    }

    // Incrementar total de jogos
    const total = parseInt(localStorage.getItem('arcana_total_games') || '0', 10) + 1;
    localStorage.setItem('arcana_total_games', total);

    return newlyUnlocked;
  }

  calculateStars(phase, moves, timeSecs, errors) {
    const { targets } = phase;
    // 3 Estrelas: Movimentos, erros e tempo excelentes
    const matchThree = moves <= targets.three.moves && errors <= targets.three.errors &&
      (!phase.timeLimit || timeSecs <= targets.three.time);

    if (matchThree) return 3;

    // 2 Estrelas: Bom desempenho
    const matchTwo = moves <= targets.two.moves && errors <= targets.two.errors &&
      (!phase.timeLimit || timeSecs <= targets.two.time);

    if (matchTwo) return 2;

    // 1 Estrela: Fase completada
    return 1;
  }
}

// ============================================================================
// 6. CONTROLADOR PRINCIPAL DO JOGO (ARCANA GAME ENGINE)
// ============================================================================
class ArcanaGame {
  constructor() {
    this.sound = new MysticSoundEngine();
    this.cosmicBg = new CosmicBackground('bg-canvas');
    this.progression = new ProgressionManager();

    // Estado Atual
    this.currentPhaseIndex = this.progression.unlockedPhase - 1;
    this.currentPhase = PHASES_CONFIG[this.currentPhaseIndex];
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairsCount = 0;
    this.totalMoves = 0;
    this.errorsCount = 0;
    this.isBoardLocked = false;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isGameActive = false;

    this.cacheDom();
    this.bindEvents();
    this.updateSoundIcon();
    this.renderPathMap();
    this.renderArcanosGallery();
    this.loadRecords();
  }

  cacheDom() {
    // Telas
    this.screenMenu = document.getElementById('screen-menu');
    this.screenPath = document.getElementById('screen-path');
    this.screenGame = document.getElementById('screen-game');

    // Tabuleiro e HUD
    this.cardBoard = document.getElementById('card-board');
    this.boardContainer = document.getElementById('board-container');
    this.hudPhaseName = document.getElementById('hud-phase-name');
    this.statMoves = document.getElementById('stat-moves');
    this.statErrors = document.getElementById('stat-errors');
    this.statPairs = document.getElementById('stat-pairs');
    this.statTime = document.getElementById('stat-time');
    this.statTimerLabel = document.getElementById('stat-timer-label');
    this.gameToast = document.getElementById('game-toast');

    // Botões Principais
    this.btnStartGame = document.getElementById('btn-start-game');
    this.btnStartText = document.getElementById('btn-start-text');
    this.btnOpenPath = document.getElementById('btn-open-path');
    this.btnPathBack = document.getElementById('btn-path-back');
    this.btnPathPlayCurrent = document.getElementById('btn-path-play-current');
    this.btnOpenArcanos = document.getElementById('btn-open-arcanos');
    this.btnOpenSettings = document.getElementById('btn-open-settings');
    this.btnHudBack = document.getElementById('btn-hud-back');
    this.btnRestartGame = document.getElementById('btn-restart-game');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.soundIcon = document.getElementById('sound-icon');

    // Mapa de Constelação
    this.pathNodesContainer = document.getElementById('path-nodes-container');

    // Modais
    this.modalVictory = document.getElementById('modal-victory');
    this.modalUnlock = document.getElementById('modal-unlock');
    this.modalGameOver = document.getElementById('modal-gameover');
    this.modalArcanos = document.getElementById('modal-arcanos');
    this.modalSettings = document.getElementById('modal-settings');

    // Elementos da Vitória
    this.victoryEyebrow = document.getElementById('victory-eyebrow');
    this.victoryStarsContainer = document.getElementById('victory-stars-container');
    this.vstar1 = document.getElementById('v-star-1');
    this.vstar2 = document.getElementById('v-star-2');
    this.vstar3 = document.getElementById('v-star-3');
    this.vstatTime = document.getElementById('vstat-time');
    this.vstatMoves = document.getElementById('vstat-moves');
    this.vstatErrors = document.getElementById('vstat-errors');
    this.vstatPairs = document.getElementById('vstat-pairs');
    this.victoryRank = document.getElementById('victory-rank');
    this.victoryCriteriaHint = document.getElementById('victory-criteria-hint');
    this.btnVictoryNextPhase = document.getElementById('btn-victory-next-phase');
    this.btnVictoryNextText = document.getElementById('btn-victory-next-text');
    this.btnVictoryReplay = document.getElementById('btn-victory-replay');
    this.btnVictoryMenu = document.getElementById('btn-victory-menu');

    // Elementos do Modal Unlock
    this.unlockCardFace = document.getElementById('unlock-card-face');
    this.unlockArcanaName = document.getElementById('unlock-arcana-name');
    this.unlockArcanaLore = document.getElementById('unlock-arcana-lore');
    this.unlockPhaseBadge = document.getElementById('unlock-phase-badge');
    this.btnUnlockContinue = document.getElementById('btn-unlock-continue');

    // Elementos do Game Over
    this.btnGameOverRetry = document.getElementById('btn-gameover-retry');
    this.btnGameOverPath = document.getElementById('btn-gameover-path');

    // Outros Modais
    this.btnCloseArcanos = document.getElementById('btn-close-arcanos');
    this.btnArcanosBack = document.getElementById('btn-arcanos-back');
    this.btnCloseSettings = document.getElementById('btn-close-settings');
    this.btnSettingsClose = document.getElementById('btn-settings-close');
    this.settingSound = document.getElementById('setting-sound');
    this.settingParticles = document.getElementById('setting-particles');
    this.arcanosList = document.getElementById('arcanos-list');
    this.bestTimeVal = document.getElementById('best-time-val');
    this.bestMovesVal = document.getElementById('best-moves-val');
    this.totalGamesVal = document.getElementById('total-games-val');
    this.btnResetRecords = document.getElementById('btn-reset-records');
  }

  bindEvents() {
    // Menu Principal
    if (this.btnStartGame) {
      this.btnStartGame.addEventListener('click', () => {
        this.sound.playPluck();
        this.startPhase(this.progression.unlockedPhase);
      });
    }

    if (this.btnHudBack) {
      this.btnHudBack.addEventListener('click', () => {
        this.sound.playPluck();
        this.stopTimer();
        this.switchScreen('menu');
      });
    }

    if (this.btnRestartGame) {
      this.btnRestartGame.addEventListener('click', () => {
        this.sound.playPluck();
        this.startPhase(this.currentPhase.id);
      });
    }

    // Controle de Som
    this.btnSoundToggle.addEventListener('click', () => {
      const isEnabled = this.sound.toggleSound();
      this.updateSoundIcon();
      this.settingSound.checked = isEnabled;
      if (isEnabled) this.sound.playPluck();
    });

    // Modais Lore e Configurações
    this.btnOpenArcanos.addEventListener('click', () => {
      this.sound.playPluck();
      this.renderArcanosGallery();
      this.openModal(this.modalArcanos);
    });
    this.btnCloseArcanos.addEventListener('click', () => this.closeModal(this.modalArcanos));
    this.btnArcanosBack.addEventListener('click', () => this.closeModal(this.modalArcanos));

    this.btnOpenSettings.addEventListener('click', () => {
      this.sound.playPluck();
      this.loadRecords();
      this.openModal(this.modalSettings);
    });
    this.btnCloseSettings.addEventListener('click', () => this.closeModal(this.modalSettings));
    this.btnSettingsClose.addEventListener('click', () => this.closeModal(this.modalSettings));

    // Ações do Modal de Vitória
    this.btnVictoryNextPhase.addEventListener('click', () => {
      this.sound.playPluck();
      this.closeModal(this.modalVictory);
      if (this.currentPhase.id < PHASES_CONFIG.length) {
        this.startPhase(this.currentPhase.id + 1);
      } else {
        this.switchScreen('path');
      }
    });

    this.btnVictoryReplay.addEventListener('click', () => {
      this.sound.playPluck();
      this.closeModal(this.modalVictory);
      this.startPhase(this.currentPhase.id);
    });

    this.btnVictoryMenu.addEventListener('click', () => {
      this.sound.playPluck();
      this.closeModal(this.modalVictory);
      this.switchScreen('menu');
    });

    // Modal de Desbloqueio (Progressão)
    this.btnUnlockContinue.addEventListener('click', () => {
      this.sound.playPluck();
      this.closeModal(this.modalUnlock);
      this.switchScreen('menu');
    });

    // Modal Game Over (Tempo Esgotado)
    this.btnGameOverRetry.addEventListener('click', () => {
      this.sound.playPluck();
      this.closeModal(this.modalGameOver);
      this.startPhase(this.currentPhase.id);
    });

    this.btnGameOverPath.addEventListener('click', () => {
      this.sound.playPluck();
      this.closeModal(this.modalGameOver);
      this.switchScreen('menu');
    });

    // Configurações
    this.settingSound.checked = this.sound.enabled;
    this.settingSound.addEventListener('change', (e) => {
      this.sound.enabled = e.target.checked;
      localStorage.setItem('arcana_sound_enabled', this.sound.enabled);
      this.updateSoundIcon();
      if (this.sound.enabled) this.sound.playPluck();
    });

    this.settingParticles.checked = this.cosmicBg.enabled;
    this.settingParticles.addEventListener('change', (e) => {
      this.cosmicBg.toggle(e.target.checked);
    });

    this.btnResetRecords.addEventListener('click', () => {
      if (confirm('Deseja realmente reiniciar todo o seu progresso na jornada dos Arcanos?')) {
        localStorage.clear();
        this.progression = new ProgressionManager();
        this.currentPhaseIndex = 0;
        this.currentPhase = PHASES_CONFIG[0];
        this.loadRecords();
        this.renderPathMap();
        this.sound.playPluck();
        this.showToast('Sua jornada foi reiniciada.', 3000);
      }
    });

    // Fechar modais ao clicar fora ou com tecla Escape
    [this.modalVictory, this.modalUnlock, this.modalGameOver, this.modalArcanos, this.modalSettings].forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        [this.modalVictory, this.modalUnlock, this.modalGameOver, this.modalArcanos, this.modalSettings].forEach(m => this.closeModal(m));
      }
    });
  }

  updateSoundIcon() {
    this.soundIcon.textContent = this.sound.enabled ? '🔊' : '🔇';
    this.btnSoundToggle.title = this.sound.enabled ? 'Desativar Som' : 'Ativar Som';
  }

  switchScreen(screenName) {
    if (this.screenGame) this.screenGame.classList.remove('screen-active');
    if (this.screenMenu) this.screenMenu.classList.remove('screen-active');

    if (screenName === 'game') {
      if (this.screenGame) this.screenGame.classList.add('screen-active');
    } else {
      if (this.screenMenu) {
        this.screenMenu.classList.add('screen-active');
        this.renderPathMap();
        if (this.btnStartText) {
          const currentPhaseName = PHASES_CONFIG[this.progression.unlockedPhase - 1]?.name || 'O DESPERTAR';
          this.btnStartText.textContent = `JOGAR FASE ${this.progression.unlockedPhase}: ${currentPhaseName.toUpperCase()}`;
        }
      }
    }
  }

  openModal(modalElem) {
    modalElem.style.display = 'flex';
    requestAnimationFrame(() => modalElem.classList.add('modal-active'));
  }

  closeModal(modalElem) {
    modalElem.classList.remove('modal-active');
    setTimeout(() => { modalElem.style.display = 'none'; }, 400);
  }

  showToast(message, duration = 2400) {
    this.gameToast.textContent = message;
    this.gameToast.classList.add('toast-visible');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      this.gameToast.classList.remove('toast-visible');
    }, duration);
  }

  // ==========================================================================
  // MAPA DO "CAMINHO DOS ARCANA"
  // ==========================================================================
  renderPathMap() {
    this.pathNodesContainer.innerHTML = '';
    const unlocked = this.progression.unlockedPhase;

    PHASES_CONFIG.forEach((phase) => {
      const isCompleted = this.progression.isPhaseCompleted(phase.id);
      const isAvailable = phase.id <= unlocked;
      const isCurrent = phase.id === unlocked;
      const stars = this.progression.getStars(phase.id);
      const bestTime = this.progression.getBestTime(phase.id);

      const nodeCard = document.createElement('button');
      nodeCard.type = 'button';
      nodeCard.className = `path-node-card ${!isAvailable ? 'node-locked' : isCompleted ? 'node-completed' : 'node-available'}`;
      nodeCard.setAttribute('aria-label', `Fase ${phase.id}: ${phase.name}. Status: ${!isAvailable ? 'Bloqueada' : isCompleted ? 'Concluída' : 'Disponível'}`);

      // Ícone do nó
      let nodeGlyph = '◈';
      if (!isAvailable) nodeGlyph = '🔒';
      else if (isCompleted) nodeGlyph = '✓';
      else if (isCurrent) nodeGlyph = '✧';

      // Estrelas da fase
      let starsHtml = '';
      if (isCompleted) {
        starsHtml = `
          <div class="node-stars">
            <span>${stars >= 1 ? '★' : '☆'}</span>
            <span>${stars >= 2 ? '★' : '☆'}</span>
            <span>${stars >= 3 ? '★' : '☆'}</span>
          </div>`;
      }

      nodeCard.innerHTML = `
        <div class="node-circle">
          <span class="node-num">${phase.id}</span>
          <span class="node-icon">${nodeGlyph}</span>
        </div>
        ${starsHtml}
        <span class="node-name">${phase.name}</span>
        <span class="node-info-text">${phase.pairs} Pares</span>
        <span class="node-status-badge">
          ${!isAvailable ? 'Bloqueada' : isCompleted ? 'Concluída' : 'Disponível'}
        </span>
      `;

      nodeCard.addEventListener('click', () => {
        if (!isAvailable) {
          this.sound.playMismatch();
          this.showToast('Este Arcano ainda não foi revelado.', 2500);
        } else {
          this.sound.playPluck();
          this.startPhase(phase.id);
        }
      });

      this.pathNodesContainer.appendChild(nodeCard);
    });
  }

  // ==========================================================================
  // INICIALIZAÇÃO DA FASE SELECIONADA
  // ==========================================================================
  startPhase(phaseId) {
    this.currentPhaseIndex = phaseId - 1;
    this.currentPhase = PHASES_CONFIG[this.currentPhaseIndex];

    this.switchScreen('game');

    // Resetar variáveis de jogo
    this.flippedCards = [];
    this.matchedPairsCount = 0;
    this.totalMoves = 0;
    this.errorsCount = 0;
    this.isBoardLocked = false;
    this.isGameActive = true;

    // Atualizar visual do HUD
    this.hudPhaseName.textContent = `${this.currentPhase.subtitle}: ${this.currentPhase.name}`;
    this.statMoves.textContent = '0';
    this.statErrors.textContent = '0';
    this.statPairs.textContent = `0/${this.currentPhase.pairs}`;
    this.statTime.classList.remove('timer-critical');

    // Configurar cronômetro
    this.setupTimer();

    // Mensagem mística inicial da fase
    this.showToast(this.currentPhase.lore, 3200);

    // Gerar deck e renderizar tabuleiro
    this.generateDeck();
    this.renderBoard();
  }

  generateDeck() {
    const deck = [];
    // Filtrar os Arcanos participantes da fase
    const phaseArcanos = ARCANOS_DATA.filter(a => this.currentPhase.cardIds.includes(a.id));

    phaseArcanos.forEach((arcano) => {
      deck.push({ ...arcano, instanceId: `${arcano.id}-1` });
      deck.push({ ...arcano, instanceId: `${arcano.id}-2` });
    });

    // Embaralhamento Fisher-Yates
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.cards = deck;
  }

  renderBoard() {
    this.cardBoard.innerHTML = '';
    // Aplicar classe de grid dinâmico da fase
    this.cardBoard.className = `card-grid ${this.currentPhase.themeClass}`;

    this.cards.forEach((card, index) => {
      const cardElem = document.createElement('button');
      cardElem.type = 'button';
      cardElem.className = 'card-item';
      cardElem.dataset.id = card.id;
      cardElem.dataset.index = index;
      cardElem.setAttribute('aria-label', `Carta de Tarô virada ${index + 1} de ${this.cards.length}`);
      cardElem.setAttribute('aria-pressed', 'false');

      cardElem.innerHTML = `
        <div class="card-inner">
          <!-- VERSO DA CARTA -->
          <div class="card-face card-back" aria-hidden="false">
            <div class="back-ornament-layer">
              <div class="card-corner corner-tl"><svg viewBox="0 0 20 20"><use href="#cornerOrnament"/></svg></div>
              <div class="card-corner corner-tr"><svg viewBox="0 0 20 20"><use href="#cornerOrnament"/></svg></div>
              <div class="card-corner corner-bl"><svg viewBox="0 0 20 20"><use href="#cornerOrnament"/></svg></div>
              <div class="card-corner corner-br"><svg viewBox="0 0 20 20"><use href="#cornerOrnament"/></svg></div>
              <svg class="card-back-svg" viewBox="0 0 100 150">
                <defs>
                  <linearGradient id="backGold-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F5D76E"/><stop offset="50%" stop-color="#D4AF37"/><stop offset="100%" stop-color="#A98224"/>
                  </linearGradient>
                </defs>
                <rect x="6" y="6" width="88" height="138" rx="4" fill="none" stroke="url(#backGold-${index})" stroke-width="1.2" opacity="0.85"/>
                <circle cx="50" cy="75" r="28" fill="none" stroke="url(#backGold-${index})" stroke-width="1"/>
                <circle cx="50" cy="75" r="14" fill="none" stroke="url(#backGold-${index})" stroke-width="0.8" stroke-dasharray="2,2"/>
                <path d="M50,65 A10,10 0 1,0 58,82 A8,8 0 1,1 50,65 Z" fill="url(#backGold-${index})" opacity="0.9"/>
                <polygon points="54,72 55,75 58,76 55,77 54,80 53,77 50,76 53,75" fill="#F5D76E"/>
              </svg>
            </div>
          </div>
          <!-- FRENTE DA CARTA -->
          <div class="card-face card-front" aria-hidden="true">
            <div class="front-inner-frame">
              <span class="card-header-numeral">✧ ${card.numeral} ✧</span>
              <div class="card-illustration-wrap">
                ${card.svg}
              </div>
              <div class="card-footer-title">
                <span class="arcana-name">${card.name}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      cardElem.addEventListener('click', () => this.handleCardClick(cardElem, card));
      cardElem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleCardClick(cardElem, card);
        }
      });

      this.cardBoard.appendChild(cardElem);
    });
  }

  handleCardClick(cardElem, card) {
    if (this.isBoardLocked) return;
    if (cardElem.classList.contains('flipped')) return;
    if (cardElem.classList.contains('is-matched')) return;
    if (this.flippedCards.length >= 2) return;

    this.flipCard(cardElem, card);
  }

  flipCard(cardElem, card) {
    cardElem.classList.add('flipped');
    cardElem.setAttribute('aria-pressed', 'true');
    cardElem.setAttribute('aria-label', `Carta revelada: Arcano ${card.name} (${card.numeral})`);

    this.sound.playFlip();
    this.flippedCards.push({ element: cardElem, data: card });

    if (this.flippedCards.length === 2) {
      this.totalMoves++;
      this.statMoves.textContent = this.totalMoves;
      this.checkPairMatch();
    }
  }

  checkPairMatch() {
    this.isBoardLocked = true;
    const [first, second] = this.flippedCards;
    const isMatch = first.data.id === second.data.id;

    if (isMatch) {
      setTimeout(() => this.handleMatchSuccess(first, second), 400);
    } else {
      this.errorsCount++;
      this.statErrors.textContent = this.errorsCount;
      // Velocidade de retorno baseada na dificuldade da fase
      const waitTime = this.currentPhase.flipSpeed || 850;
      setTimeout(() => this.handleMismatch(first, second), waitTime);
    }
  }

  handleMatchSuccess(first, second) {
    first.element.classList.add('is-matched');
    second.element.classList.add('is-matched');
    this.sound.playMatch();
    this.createMatchSparks(first.element);
    this.createMatchSparks(second.element);

    this.matchedPairsCount++;
    this.statPairs.textContent = `${this.matchedPairsCount}/${this.currentPhase.pairs}`;
    this.showToast(`✧ Revelado: ${first.data.name}! ✧`, 1800);

    this.flippedCards = [];
    this.isBoardLocked = false;

    // Condição de Vitória da Fase
    if (this.matchedPairsCount === this.currentPhase.pairs) {
      setTimeout(() => this.handlePhaseVictory(), 750);
    }
  }

  handleMismatch(first, second) {
    first.element.classList.add('is-mismatch');
    second.element.classList.add('is-mismatch');
    this.sound.playMismatch();

    setTimeout(() => {
      first.element.classList.remove('flipped', 'is-mismatch');
      second.element.classList.remove('flipped', 'is-mismatch');
      first.element.setAttribute('aria-pressed', 'false');
      second.element.setAttribute('aria-pressed', 'false');
      first.element.setAttribute('aria-label', 'Carta de Tarô fechada');
      second.element.setAttribute('aria-label', 'Carta de Tarô fechada');

      this.flippedCards = [];
      this.isBoardLocked = false;
    }, 550);
  }

  createMatchSparks(cardElement) {
    const rect = cardElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const numSparks = 14;

    for (let i = 0; i < numSparks; i++) {
      const spark = document.createElement('div');
      spark.className = 'match-sparkle';
      document.body.appendChild(spark);
      spark.style.left = `${centerX}px`;
      spark.style.top = `${centerY}px`;

      const angle = (Math.PI * 2 * i) / numSparks + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 55 + 35;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);

      setTimeout(() => spark.remove(), 850);
    }
  }

  // ==========================================================================
  // SISTEMA DO CRONÔMETRO (LIVRE OU REGRESSIVO)
  // ==========================================================================
  setupTimer() {
    this.stopTimer();

    if (this.currentPhase.timeLimit) {
      // Cronômetro Regressivo (Fases 3 a 7)
      this.statTimerLabel.textContent = 'Tempo Restante';
      this.timerSeconds = this.currentPhase.timeLimit;
      this.statTime.textContent = this.formatTime(this.timerSeconds);

      this.timerInterval = setInterval(() => {
        this.timerSeconds--;
        this.statTime.textContent = this.formatTime(this.timerSeconds);

        // Alerta de tempo crítico (últimos 15s)
        if (this.timerSeconds <= 15) {
          this.statTime.classList.add('timer-critical');
        }

        // Tempo esgotado
        if (this.timerSeconds <= 0) {
          this.handleTimeOut();
        }
      }, 1000);
    } else {
      // Cronômetro Progressivo (Fases 1 e 2)
      this.statTimerLabel.textContent = 'Tempo';
      this.timerSeconds = 0;
      this.statTime.textContent = '00:00';

      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
        this.statTime.textContent = this.formatTime(this.timerSeconds);
      }, 1000);
    }
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.max(0, seconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  handleTimeOut() {
    this.stopTimer();
    this.isBoardLocked = true;
    this.sound.playMismatch();
    this.openModal(this.modalGameOver);
  }

  // ==========================================================================
  // VITÓRIA DA FASE E PROGRESSÃO
  // ==========================================================================
  handlePhaseVictory() {
    this.stopTimer();
    this.isGameActive = false;
    this.sound.playVictory();

    // Tempo final consumido
    const elapsedSeconds = this.currentPhase.timeLimit ?
      (this.currentPhase.timeLimit - this.timerSeconds) : this.timerSeconds;

    // Calcular estrelas conquistadas
    const stars = this.progression.calculateStars(
      this.currentPhase,
      this.totalMoves,
      elapsedSeconds,
      this.errorsCount
    );

    // Salvar progresso e verificar se uma nova fase foi desbloqueada
    const hasUnlockedNext = this.progression.recordVictory(
      this.currentPhase.id,
      elapsedSeconds,
      this.totalMoves,
      stars
    );

    // Atualizar estrelas no modal
    [this.vstar1, this.vstar2, this.vstar3].forEach((starElem, i) => {
      starElem.classList.remove('star-earned');
      if (i < stars) {
        setTimeout(() => starElem.classList.add('star-earned'), (i + 1) * 250);
      }
    });

    // Atualizar estatísticas do modal
    this.vstatTime.textContent = this.formatTime(elapsedSeconds);
    this.vstatMoves.textContent = this.totalMoves;
    this.vstatErrors.textContent = this.errorsCount;
    this.vstatPairs.textContent = `${this.currentPhase.pairs}/${this.currentPhase.pairs}`;
    this.victoryEyebrow.textContent = `FASE ${this.currentPhase.id} CONCLUÍDA`;

    // Atualizar texto do botão de próximo
    if (this.currentPhase.id < PHASES_CONFIG.length) {
      this.btnVictoryNextText.textContent = 'PRÓXIMO ARCANO';
    } else {
      this.btnVictoryNextText.textContent = 'CAMINHO FINALIZADO';
    }

    // Dica de critérios para 3 estrelas
    const { targets } = this.currentPhase;
    this.victoryCriteriaHint.textContent = `Meta 3 Estrelas: até ${targets.three.moves} movimentos, ${targets.three.errors} erros e menos de ${targets.three.time}s.`;

    // Ranks Místicos
    if (stars === 3) {
      this.victoryRank.textContent = '✦ Oráculo Supremo dos Mistérios ✦';
    } else if (stars === 2) {
      this.victoryRank.textContent = '✦ Mestre Vidente do Destino ✦';
    } else {
      this.victoryRank.textContent = '✦ Guardião do Conhecimento ✦';
    }

    // Se uma nova fase foi desbloqueada, exibe a cena cinematográfica
    if (hasUnlockedNext && this.currentPhase.id < PHASES_CONFIG.length) {
      this.openModal(this.modalVictory);
      // Ao clicar em 'PRÓXIMO ARCANO', exibe a animação do Arcano Revelado
      this.btnVictoryNextPhase.onclick = () => {
        this.closeModal(this.modalVictory);
        this.triggerUnlockAnimation(this.currentPhase.id + 1);
      };
    } else {
      this.btnVictoryNextPhase.onclick = () => {
        this.closeModal(this.modalVictory);
        if (this.currentPhase.id < PHASES_CONFIG.length) {
          this.startPhase(this.currentPhase.id + 1);
        } else {
          this.switchScreen('path');
        }
      };
      this.openModal(this.modalVictory);
    }
  }

  // Animação Cinematográfica: "ARCANO REVELADO"
  triggerUnlockAnimation(nextPhaseId) {
    const nextPhase = PHASES_CONFIG[nextPhaseId - 1];
    // Pegar o primeiro arcano novo desbloqueado na fase
    const newArcanaId = nextPhase.newUnlockIds[0];
    const newArcana = ARCANOS_DATA.find(a => a.id === newArcanaId) || ARCANOS_DATA[0];

    // Inserir dados no modal
    this.unlockCardFace.innerHTML = `
      <span class="card-header-numeral">✧ ${newArcana.numeral} ✧</span>
      <div class="card-illustration-wrap">${newArcana.svg}</div>
      <div class="card-footer-title"><span class="arcana-name">${newArcana.name}</span></div>
    `;

    this.unlockArcanaName.textContent = newArcana.name;
    this.unlockArcanaLore.textContent = newArcana.meaning;
    this.unlockPhaseBadge.textContent = `${nextPhase.subtitle.toUpperCase()} DESBLOQUEADA: ${nextPhase.name.toUpperCase()} (${nextPhase.pairs} PARES)`;

    this.sound.playUnlock();
    this.openModal(this.modalUnlock);
  }

  // ==========================================================================
  // LIVRO DOS 22 ARCANOS (LORE E GALERIA)
  // ==========================================================================
  renderArcanosGallery() {
    this.arcanosList.innerHTML = '';
    const unlockedPhase = this.progression.unlockedPhase;

    ARCANOS_DATA.forEach((arcano, idx) => {
      // Verifica se o arcano já foi alcançado
      const isDiscovered = PHASES_CONFIG.some(p => p.id <= unlockedPhase && p.cardIds.includes(arcano.id));

      const item = document.createElement('article');
      item.className = 'arcano-lore-item';
      item.innerHTML = `
        <div class="lore-thumb">
          ${arcano.svg}
        </div>
        <div class="lore-info">
          <span class="lore-numeral">ARCANO ${arcano.numeral} ${isDiscovered ? '✦ REVELADO' : '🔒 BLOQUEADO'}</span>
          <h3 class="lore-name">${arcano.name}</h3>
          <p class="lore-meaning">${isDiscovered ? arcano.meaning : 'Este Arcano ainda repousa sob os véus do desconhecido. Avance no Caminho dos Arcana para desvelá-lo.'}</p>
        </div>
      `;
      this.arcanosList.appendChild(item);
    });
  }

  loadRecords() {
    const bestTime = this.progression.getBestTime(this.currentPhase.id);
    const bestMoves = this.progression.getBestMoves(this.currentPhase.id);
    const totalGames = localStorage.getItem('arcana_total_games') || '0';

    this.bestTimeVal.textContent = bestTime ? this.formatTime(bestTime) : '--:--';
    this.bestMovesVal.textContent = bestMoves ? bestMoves : '--';
    this.totalGamesVal.textContent = totalGames;
  }
}

// ============================================================================
// INICIALIZAÇÃO AUTOMÁTICA AO CARREGAR A PÁGINA
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  window.arcanaApp = new ArcanaGame();
});
