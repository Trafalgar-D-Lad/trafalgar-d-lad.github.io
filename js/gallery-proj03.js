(function(){
  'use strict';

  // Only bind buttons that open the proj03 gallery
  const openBtns = Array.from(document.querySelectorAll('.open-gallery[data-gallery="proj03"]'));
  const modal = document.getElementById('proj03-gallery');
  if (!modal) return;

  const closeBtn = modal.querySelector('.gallery-close');
  const tabBtns = Array.from(modal.querySelectorAll('.tab-btn'));
  const viewerImg = modal.querySelector('.viewer-img');
  const viewerVideo = modal.querySelector('.viewer-video');
  let activeSection = 'jour';

  const getThumbs = (section) => Array.from(modal.querySelectorAll(`.gallery-grid[data-section="${section}"] .gallery-thumb`));

  const setActive = (section) => {
    activeSection = section;
    modal.querySelectorAll('.gallery-grid').forEach(g => {
      g.style.display = (g.dataset.section === section) ? '' : 'none';
    });
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.section === section));
    const thumbs = getThumbs(section);
    if (thumbs[0]) thumbs[0].click();
  };

  const openModal = () => {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setActive(activeSection);
  };

  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    if (viewerImg) { viewerImg.src = ''; viewerImg.style.display = 'none'; }
    if (viewerVideo) { viewerVideo.pause(); viewerVideo.src = ''; viewerVideo.style.display = 'none'; }
    document.body.style.overflow = 'auto';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Tabs
  tabBtns.forEach(b => b.addEventListener('click', () => setActive(b.dataset.section)));

  // Delegate clicks inside gallery-content for thumbs
  const content = modal.querySelector('.gallery-content');
  if (content) {
    content.addEventListener('click', e => {
      const t = e.target.closest('.gallery-thumb');
      if (!t) return;
      const type = t.dataset.type;
      const src = t.dataset.src;
      if (type === 'img' && viewerImg) {
        if (viewerVideo) { viewerVideo.style.display = 'none'; viewerVideo.pause(); viewerVideo.src = ''; }
        viewerImg.src = src; viewerImg.style.display = 'block';
      } else if (type === 'video' && viewerVideo) {
        if (viewerImg) { viewerImg.style.display = 'none'; viewerImg.src = ''; }
        viewerVideo.src = src; viewerVideo.style.display = 'block';
        viewerVideo.play();
      }
    });
  }

})();
