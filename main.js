// Dados dos benefícios
const beneficios = [
  {
    titulo: "Informação Confiável",
    descricao: "Conteúdo revisado por profissionais de saúde especializados em doenças degenerativas infantis.",
    icone: `<svg aria-hidden="true" class=\"h-12 w-12\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>`
  },
  {
    titulo: "Consultas Online",
    descricao: "Agende e realize consultas com profissionais de saúde especializados sem sair de casa, com praticidade e segurança.",
    icone: `<svg aria-hidden="true" class=\"h-12 w-12\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 17v-1a4 4 0 014-4h2a4 4 0 014 4v1M7 8a4 4 0 018 0v1a4 4 0 01-8 0V8z\" /></svg>`
  },
  {
    titulo: "Recursos Práticos",
    descricao: "Guias, checklists e lembretes para ajudar na organização da rotina de cuidados diários.",
    icone: `<svg aria-hidden="true" class=\"h-12 w-12\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2\" /></svg>`
  }
];

function renderBeneficios() {
  const grid = document.getElementById('beneficios-grid');
  grid.innerHTML = '';
  beneficios.forEach(b => {
    const card = document.createElement('div');
    card.className = 'bg-blue-50 rounded-lg p-6 shadow-md transition-all duration-300 cursor-pointer';
    card.addEventListener('mouseenter', () => {
      card.classList.add('scale-105', 'shadow-xl', 'bg-blue-100');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('scale-105', 'shadow-xl', 'bg-blue-100');
    });
    card.innerHTML = `
      <div class="text-blue-600 mb-4">${b.icone}</div>
      <h3 class="text-xl font-semibold mb-2 text-blue-800">${b.titulo}</h3>
      <p class="text-gray-600">${b.descricao}</p>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderBeneficios();
  // --- Carrossel de Depoimentos ---
// Modal Popup para Saiba Mais
window.addEventListener('DOMContentLoaded', function () {
  const saibaMaisBtn = document.getElementById('saibaMaisBtn');
  const popup = document.getElementById('popup-modal');
  const popupContent = document.getElementById('popup-content');
  const closePopup = document.getElementById('close-popup');

  if (saibaMaisBtn && popup && popupContent && closePopup) {
    saibaMaisBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Cancela o scroll automático
      popup.classList.remove('opacity-0', 'pointer-events-none');
      popup.classList.add('opacity-100');
    });
    closePopup.addEventListener('click', function() {
      popup.classList.remove('opacity-100');
      popup.classList.add('opacity-0', 'pointer-events-none');
    });
    // Fecha ao clicar fora do conteúdo
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.classList.remove('opacity-100');
        popup.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    // Fecha com ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('opacity-100')) {
        popup.classList.remove('opacity-100');
        popup.classList.add('opacity-0', 'pointer-events-none');
      }
    });
  }
});
const depoimentos = [
  {
    nome: 'Joana Lima',
    foto: 'assets/people/p1.png',
    texto: 'O CuidadoMaisFamilia transformou nossa rotina. Consigo organizar as consultas do meu filho e ter acesso a informações confiáveis. O suporte emocional dos grupos me ajudou a não me sentir sozinha nessa jornada.',
    estrelas: 5
  },
  {
    nome: 'Paula Ferreira',
    foto: 'assets/people/p3.png',
    texto: 'Como mãe de uma criança com doença degenerativa, o CuidadoMaisFamilia me proporcionou um apoio emocional inestimável. As consultas online com especialistas e os grupos de apoio me ajudaram a lidar com os desafios diários.',
    estrelas: 5
  },
  {
    nome: 'Patrícia Oliveira',
    foto: 'assets/people/p2.png',
    texto: 'A biblioteca de recursos do CuidadoMaisFamilia é incrível! Encontro artigos específicos sobre a condição do meu filho e os grupos de apoio me conectaram com outras mães que entendem exatamente o que estou passando.',
    estrelas: 5
  },
  {
    nome: 'Ricardo Martins',
    foto: 'assets/people/p4.png',
    texto: 'O aplicativo me ajudou a encontrar grupos de apoio e informações confiáveis. Recomendo a todos os pais!',
    estrelas: 5
  },
  {
    nome: 'Beatriz Ramos',
    foto: 'assets/people/p5.png',
    texto: 'Com o CuidadoMaisFamilia, consegui organizar os medicamentos e consultas do meu filho de forma simples.',
    estrelas: 5
  },
  {
    nome: 'Helena Dias',
    foto: 'assets/people/p6.png',
    texto: 'Os lembretes e o suporte do app facilitam muito o dia a dia da minha família.',
    estrelas: 5
  }
];

let depoimentoIndex = 0;
let depoimentoAutoplay = null;

function renderDepoimentosCarousel() {
  const slides = document.getElementById('depoimentos-slides');
  if (!slides) return;
  slides.innerHTML = '';

  // Responsivo: 1 por vez no mobile, 3 em md+
  let cardsToShow = 1;
  if (window.innerWidth >= 768) cardsToShow = 3;

  // Garante loop circular real
  let start = depoimentoIndex;
  // Corrige o índice para nunca deixar espaço em branco
  if (start < 0) start = depoimentos.length - cardsToShow;
  if (start >= depoimentos.length) start = 0;
  depoimentoIndex = start;

  // Monta array circular dos depoimentos a exibir
  let circularDepoimentos = [];
  for (let i = 0; i < cardsToShow; i++) {
    circularDepoimentos.push(depoimentos[(start + i) % depoimentos.length]);
  }

  circularDepoimentos.forEach((d) => {
    const card = document.createElement('div');
    card.className = 'bg-white border border-gray-200 rounded-2xl p-6 shadow-md mx-2 min-w-[280px] max-w-xs flex-1 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#2476f7]';
    card.innerHTML = `
      <div class="mb-4">
        <img src="${d.foto}" alt="Foto de ${d.nome}" class="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md">
      </div>
      <h3 class="font-bold text-[#2476f7] text-lg mb-1">${d.nome}</h3>
      <div class="flex text-yellow-400 mb-2">${'★'.repeat(d.estrelas)}</div>
      <p class="text-gray-700 italic text-center">"${d.texto}"</p>
    `;
    slides.appendChild(card);
  });

  // Ajusta largura e alinhamento
  const slideWidth = slides.firstChild ? slides.firstChild.offsetWidth + 16 : 320; // 16 = mx-2
  slides.style.transform = 'translateX(0)';
  slides.style.width = `${slideWidth * cardsToShow}px`;
  slides.style.display = 'flex';
  slides.style.alignItems = 'stretch';
}


function nextDepoimento() {
  depoimentoIndex = (depoimentoIndex + 1) % depoimentos.length;
  renderDepoimentosCarousel();
}
function prevDepoimento() {
  depoimentoIndex = (depoimentoIndex - 1 + depoimentos.length) % depoimentos.length;
  renderDepoimentosCarousel();
}
window.addEventListener('DOMContentLoaded', () => {
  renderDepoimentosCarousel();
  document.getElementById('depoimentos-next').addEventListener('click', nextDepoimento);
  document.getElementById('depoimentos-prev').addEventListener('click', prevDepoimento);

  // Hero buttons functionality
  const comeceAgoraBtn = document.getElementById('comeceAgoraBtn');
  if (comeceAgoraBtn) {
    comeceAgoraBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('https://cuidadomaisfamilia.netlify.app', '_blank');
    });
  }

  const saibaMaisBtn = document.querySelector('a[href="#funcionalidades"]');
  if (saibaMaisBtn) {
    saibaMaisBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('funcionalidades');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-button').forEach((btn) => {
    btn.addEventListener('click', function () {
      const answer = this.parentElement.querySelector('.faq-answer');
      if (answer.classList.contains('hidden')) {
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        answer.classList.remove('hidden');
      } else {
        answer.classList.add('hidden');
      }
    });
  });

  window.addEventListener('resize', renderDepoimentosCarousel);

  // Autoplay suave do carrossel
  const carousel = document.getElementById('carousel-depoimentos');
  function startAutoplay() {
    if (depoimentoAutoplay) clearInterval(depoimentoAutoplay);
    depoimentoAutoplay = setInterval(() => {
      nextDepoimento();
    }, 5000); // 5 segundos para leitura
  }
  function stopAutoplay() {
    if (depoimentoAutoplay) clearInterval(depoimentoAutoplay);
  }
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    startAutoplay();
  }
});

// Modal de informação para o botão 'Saiba mais'
  const saibaMaisBtn = document.getElementById('saibaMaisBtn');
  const modal = document.getElementById('infoModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  if (saibaMaisBtn && modal && closeModalBtn) {
    saibaMaisBtn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.remove('hidden');
    });
    closeModalBtn.addEventListener('click', function () {
      modal.classList.add('hidden');
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
});
