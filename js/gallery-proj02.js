 (function(){
  'use strict';

  // Only bind buttons that open the proj02 gallery
  const openBtns = Array.from(document.querySelectorAll('.open-gallery[data-gallery="proj02"]'));
  const modal = document.getElementById('proj02-gallery');
  if (!modal) return;

  const closeBtn = modal.querySelector('.gallery-close');
  const thumbs = Array.from(modal.querySelectorAll('.gallery-thumb'));
  const viewerImg = modal.querySelector('.viewer-img');
  const viewerVideo = modal.querySelector('.viewer-video');

  const openModal = () => {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const first = thumbs[0];
    if (first) first.click();
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

  thumbs.forEach(t => t.addEventListener('click', () => {
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
  }));

})();
