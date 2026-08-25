  // ---- current year ----
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- sticky header shadow ----
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive:true });

  // ---- mobile menu ----
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.classList.toggle('open', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }));

  // ---- capability strip content (duplicated for seamless marquee) ----
  const items = ['Website Development','Web Applications','Android Apps','Windows Apps','Digital Marketing','Graphic Design'];
  const track = document.getElementById('stripTrack');
  const buildStrip = () => {
    let html = '';
    for (let r = 0; r < 2; r++){
      items.forEach(t => {
        html += `<span class="strip-item"><b>${t}</b><span class="sep">·</span></span>`;
      });
    }
    track.innerHTML = html;
  };
  buildStrip();

  // ---- scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ---- generate pixel-trail shard clusters ----
  // Mirrors the mark's own dissolving diagonal block trail.
  function buildTrail(el, count, baseSize){
    const positions = [];
    let x = 0, y = 0;
    for (let i = 0; i < count; i++){
      const size = Math.max(4, baseSize - i * (baseSize / (count + 2)));
      x += size * 0.85;
      y -= size * 0.6;
      positions.push({ x, y, size, o: 1 - (i / (count + 1)) * 0.55 });
    }
    positions.forEach((p, i) => {
      const s = document.createElement('span');
      s.className = 'shard';
      s.style.width = p.size + 'px';
      s.style.height = p.size + 'px';
      s.style.left = p.x + 'px';
      s.style.top = p.y + 'px';
      s.style.setProperty('--o', p.o.toFixed(2));
      s.style.opacity = p.o.toFixed(2);
      s.style.animationDelay = (i * 0.18) + 's';
      el.appendChild(s);
    });
  }
  document.querySelectorAll('.hero-corner-trail').forEach(el => buildTrail(el, 9, 26));
  document.querySelectorAll('.svc-shards').forEach(el => buildTrail(el, 5, 14));
  document.querySelectorAll('.cta-corner-a').forEach(el => buildTrail(el, 7, 20));
  document.querySelectorAll('.cta-corner-b').forEach(el => buildTrail(el, 7, 20));