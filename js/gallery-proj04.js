 (function(){
  'use strict';

  // Only bind buttons that open the proj04 gallery
  const openBtns = Array.from(document.querySelectorAll('.open-gallery[data-gallery="proj04"]'));
  const modal = document.getElementById('proj04-gallery');
  if(!modal) return;
  const closeBtn = modal.querySelector('.gallery-close');
  const thumbs = modal.querySelectorAll('.gallery-thumb');
  const viewerImg = modal.querySelector('.viewer-img');
  const viewerVideo = modal.querySelector('.viewer-video');

  function openModal(){
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('open');
    document.body.style.overflow='hidden';
    // open first thumb by default if none shown
    const first = modal.querySelector('.gallery-thumb');
    if(first) first.click();
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modal.classList.remove('open');
    viewerImg.src=''; viewerImg.style.display='none';
    viewerVideo.pause(); viewerVideo.src=''; viewerVideo.style.display='none';
    document.body.style.overflow='auto';
  }

  openBtns.forEach(b=> b.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });

  thumbs.forEach(t=> t.addEventListener('click', ()=>{
    const type = t.dataset.type;
    const src = t.dataset.src;
    if(type==='img'){
      viewerVideo.style.display='none'; viewerVideo.pause(); viewerVideo.src='';
      viewerImg.src = src; viewerImg.style.display='block';
    } else if(type==='video'){
      viewerImg.style.display='none'; viewerImg.src='';
      viewerVideo.src = src; viewerVideo.style.display='block';
      viewerVideo.play();
    }
  }));
})();
