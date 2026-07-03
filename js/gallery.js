// js/gallery.js
(() => {
  const openButtons = document.querySelectorAll(".open-gallery");
  const modals = document.querySelectorAll(".gallery-modal");

  // Helpers
  const qs = (root, sel) => root.querySelector(sel);
  const qsa = (root, sel) => [...root.querySelectorAll(sel)];

  function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    // Stop & unload viewer video to free memory / bandwidth
    const viewerVideo = qs(modal, ".viewer-video");
    if (viewerVideo) {
      viewerVideo.pause();
      viewerVideo.removeAttribute("src");
      viewerVideo.load();
      viewerVideo.style.display = "none";
    }

    // Hide viewer iframe
    const viewerIframe = qs(modal, ".viewer-iframe");
    if (viewerIframe) {
      viewerIframe.removeAttribute("src");
      viewerIframe.style.display = "none";
    }

    // Hide viewer img
    const viewerImg = qs(modal, ".viewer-img");
    if (viewerImg) {
      viewerImg.removeAttribute("src");
      viewerImg.style.display = "none";
    }
  }

  function openModal(modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    // Optionnel: focus sur le bouton fermer (accessibilité)
    const closeBtn = qs(modal, ".gallery-close");
    closeBtn?.focus();
  }

  function showMedia(modal, type, src) {
    const viewerImg = qs(modal, ".viewer-img");
    const viewerVideo = qs(modal, ".viewer-video");
    const viewerIframe = qs(modal, ".viewer-iframe");

    if (type === "img") {
      if (viewerVideo) {
        viewerVideo.pause();
        viewerVideo.removeAttribute("src");
        viewerVideo.load();
        viewerVideo.style.display = "none";
      }
      if (viewerIframe) {
        viewerIframe.removeAttribute("src");
        viewerIframe.style.display = "none";
      }
      if (viewerImg) {
        viewerImg.src = src;
        viewerImg.style.display = "block";
      }
      return;
    }

    if (type === "video") {
      if (viewerIframe) {
        viewerIframe.removeAttribute("src");
        viewerIframe.style.display = "none";
      }
      if (viewerImg) {
        viewerImg.removeAttribute("src");
        viewerImg.style.display = "none";
      }
      if (viewerVideo) {
        viewerVideo.style.display = "block";
        viewerVideo.src = src;
        viewerVideo.load();
        viewerVideo.play().catch(() => {});
      }
      return;
    }

    if (type === "youtube") {
      if (viewerVideo) {
        viewerVideo.pause();
        viewerVideo.removeAttribute("src");
        viewerVideo.load();
        viewerVideo.style.display = "none";
      }
      if (viewerImg) {
        viewerImg.removeAttribute("src");
        viewerImg.style.display = "none";
      }
      if (viewerIframe) {
        viewerIframe.style.display = "block";
        viewerIframe.src = src;
      }
    }
  }

  // Open gallery buttons
  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.gallery;           // ex: "proj01"
      const modal = document.getElementById(`${key}-gallery`);
      if (modal) openModal(modal);
    });
  });

  // Close: click on X or background
  modals.forEach(modal => {
    const closeBtn = qs(modal, ".gallery-close");
    closeBtn?.addEventListener("click", () => closeModal(modal));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal); // click outside content
    });
  });

  // Global: Esc closes any open modal
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const opened = document.querySelector(".gallery-modal.open");
    if (opened) closeModal(opened);
  });

  // Close open modal when navigating to an internal anchor link
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const opened = document.querySelector(".gallery-modal.open");
    if (!opened) return;
    if (anchor.closest(".gallery-modal")) return;
    closeModal(opened);
  });

  // Event delegation: thumbs click (works for all modals)
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".gallery-thumb");
    if (!thumb) return;

    const modal = thumb.closest(".gallery-modal");
    if (!modal) return;

    const type = thumb.dataset.type;     // "img" | "video" | "youtube"
    const src = thumb.dataset.src;       // file path or embed URL
    if (!type || !src) return;

    showMedia(modal, type, src);
  });

})();