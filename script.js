(() => {
  const $ = id => document.getElementById(id);
  const fx = $('fx'), song = $('song'), bars = $('bars');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Loader
  addEventListener('load', () => setTimeout(() => $('loader').classList.add('done'), 1200));

  // Floating hearts & rose petals
  function drift(cls, text) {
    if (calm) return;
    const s = document.createElement('span');
    s.className = cls; if (text) { s.textContent = text; s.style.color = 'var(--maroon2)'; s.style.fontSize = 12 + Math.random() * 18 + 'px'; }
    s.style.left = Math.random() * 100 + '%';
    s.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
    s.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    s.style.animationDuration = 8 + Math.random() * 8 + 's';
    s.style.opacity = .5 + Math.random() * .4;
    fx.appendChild(s); setTimeout(() => s.remove(), 17000);
  }
  setInterval(() => drift(Math.random() > .5 ? 'petal' : 'heart', Math.random() > .5 ? '' : '❤'), 900);
  setInterval(() => { if (Math.random() > .6) drift('heart', '✨'); }, 1500);

  // Music
  const setUI = playing => {
    $('playBtn').textContent = playing ? '⏸' : '▶';
    $('playBtn').setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    bars.classList.toggle('on', playing);
  };
  const play = () => song.play().then(() => setUI(true)).catch(() => setUI(false));
  $('playBtn').onclick = () => song.paused ? play() : (song.pause(), setUI(false));
  $('muteBtn').onclick = e => {
    song.muted = !song.muted;
    e.currentTarget.textContent = song.muted ? '🔇' : '🔊';
    e.currentTarget.setAttribute('aria-label', song.muted ? 'Unmute music' : 'Mute music');
  };

  // Envelope
  $('openBtn').onclick = e => {
    e.currentTarget.disabled = true;
    $('envelope').classList.add('open');
    $('player').hidden = false; play();
    setTimeout(() => {
      $('intro').classList.add('gone'); $('site').hidden = false;
      document.body.classList.remove('locked'); scrollTo(0, 0);
      for (let i = 0; i < 25; i++) setTimeout(() => drift(i % 2 ? 'petal' : 'heart', i % 2 ? '' : '❤'), i * 90);
      observe();
    }, 1900);
    setTimeout(() => $('intro').style.display = 'none', 3000);
  };

  // Timeline reveal
  function observe() {
    const io = new IntersectionObserver(es => es.forEach(x => x.isIntersecting && (x.target.classList.add('in'), io.unobserve(x.target))), { threshold: .25 });
    document.querySelectorAll('.timeline li').forEach(li => io.observe(li));
  }

  // Gift
  $('giftBtn').onclick = e => {
    const b = e.currentTarget; b.classList.add('opened'); b.setAttribute('aria-expanded', 'true');
    $('letter').hidden = false;
    for (let i = 0; i < 30; i++) setTimeout(() => drift('heart', '❤'), i * 60);
    setTimeout(() => $('letter').scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
  };

  // Optional edit mode: add #edit to the URL to type directly in the letter
  if (location.hash === '#edit') $('letterText').contentEditable = true;
})();
// Placeholder image until real photos are added
const ph = 'data:image/svg+xml,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='#f6d5d8'/><text x='200' y='240' font-size='90' text-anchor='middle' fill='#6b1d2a'>❤</text><text x='200' y='310' font-size='22' text-anchor='middle' fill='#6b1d2a' font-family='serif'>Add your photo here</text></svg>");
document.querySelectorAll('.frame img').forEach(i => { i.onerror = () => { i.onerror = null; i.src = ph; }; });
