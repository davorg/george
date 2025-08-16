// ---------- CONFIG ----------
const CONFIG = {
  images: [
    {
      src: "images/image-002-003.png",
      alt: "George waving outside a yellow house with a red roof, under a sunny blue sky."
    }, {
      src: "images/image-004-005.png",
      alt: "A smart speaker with a lightning bolt icon sits on a table in a cosy room with striped blue walls and a framed picture."
    }, {
      src: "images/image-006-007.png",
      alt: "A smart speaker with a green power icon on a table in a room with blue striped walls."
    }, {
      src: "images/image-008-009.png",
      alt: "George’s dad, wearing an apron, stands in the kitchen next to a smart speaker showing a red timer icon."
    }, {
      src: "images/image-010-011.png",
      alt: "George’s sister dances on her bed in a pink bedroom while a smart speaker shows a music equaliser icon."
    }, {
      src: "images/image-012-013.png",
      alt: "George’s mum walks towards the stairs while a smart speaker on a table shows a yellow light bulb icon."
    }, {
      src: "images/image-014-015.png",
      alt: "George’s mum and dad stand next to a smart speaker showing a green doorbell icon."
    }, {
      src: "images/image-016-017.png",
      alt: "George frowns next to a smart speaker with a red X icon in a room with blue striped walls."
    }, {
      src: "images/image-018-019.png",
      alt: "George looks upset in his bedroom at night as a smart speaker shows a red X icon."
    }, {
      src: "images/image-020-021.png",
      alt: "George stands in the kitchen looking unhappy as a smart speaker shows a red X icon."
    }, {
      src: "images/image-022-023.png",
      alt: "George smiles next to a smart speaker showing a red X icon, in a room with blue striped walls."
    }, {
      src: "images/image-024-025.png",
      alt: "George looks unhappy near the stairs as a smart speaker shows a red X icon."
    }, {
      src: "images/image-026-027.png",
      alt: "George frowns in the living room with a green armchair and yellow lamp, as a smart speaker shows a red X icon."
    }, {
      src: "images/image-028-029.png",
      alt: "George looks very sad next to a smart speaker with a red X icon in a room with blue striped walls."
    }
  ]
};

// ---------- Carousel ----------
const carousel = document.getElementById('carousel');
const dots = document.getElementById('dots');
let index = 0, timer = null;

const slides = CONFIG.images.map((item, i) => {
  const s = document.createElement('figure');
  s.className = 'slide';
  s.setAttribute('role','group');
  s.setAttribute('aria-roledescription','slide');
  s.setAttribute('aria-label', `Page ${i+1} of ${CONFIG.images.length}`);

  const page = document.createElement('div');
  page.className = 'page';
  const img = document.createElement('img');
  img.src = item.src;
  img.alt = item.alt || "";
  img.loading = "lazy";
  page.appendChild(img);
  s.appendChild(page);
  carousel.appendChild(s);

  const d = document.createElement('button');
  d.setAttribute('aria-label', `Go to page ${i+1}`);
  d.addEventListener('click', () => go(i));
  dots.appendChild(d);
  return s;
});

function setCurrent(i){
  slides.forEach((s, n) => s.setAttribute('aria-current', n===i));
  [...dots.children].forEach((d, n) => d.setAttribute('aria-current', n===i));
}
function go(i){
  index = (i + slides.length) % slides.length;
  setCurrent(index);
}

function play(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  stop();
  timer = setInterval(()=>go(index+1), 3800);
}
function stop(){ clearInterval(timer); timer = null; }

go(0); play();

carousel.addEventListener('mouseenter', stop);
carousel.addEventListener('mouseleave', play);
carousel.addEventListener('focusin', stop);
carousel.addEventListener('focusout', play);

document.getElementById('prev').addEventListener('click', ()=>go(index-1));
document.getElementById('next').addEventListener('click', ()=>go(index+1));

// swipe on touch
let x0=null;
carousel.addEventListener('touchstart', e => x0 = e.touches[0].clientX, {passive:true});
carousel.addEventListener('touchend', e => {
  if(x0===null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) (dx>0) ? go(index-1) : go(index+1);
  x0=null;
});

// Pause when tab hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stop(); else play();
});

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  AmazonStore.enhanceAll({ tag: 'davblog-21' });
  AmazonStore.renderStoreGridAll();
});
