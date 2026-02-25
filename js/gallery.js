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

    if (type === "img") {
      if (viewerVideo) {
        viewerVideo.pause();
        viewerVideo.removeAttribute("src");
        viewerVideo.load();
        viewerVideo.style.display = "none";
      }
      if (viewerImg) {
        viewerImg.src = src;
        viewerImg.style.display = "block";
      }
      return;
    }

    // video
    if (viewerImg) {
      viewerImg.removeAttribute("src");
      viewerImg.style.display = "none";
    }
    if (viewerVideo) {
      viewerVideo.style.display = "block";
      // Lazy-load: assign src only now
      viewerVideo.src = src;
      viewerVideo.load();
      viewerVideo.play().catch(() => {});
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

  // Event delegation: thumbs click (works for all modals)
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".gallery-thumb");
    if (!thumb) return;

    const modal = thumb.closest(".gallery-modal");
    if (!modal) return;

    const type = thumb.dataset.type;     // "img" | "video"
    const src = thumb.dataset.src;       // file path
    if (!type || !src) return;

    showMedia(modal, type, src);
  });

  // Tabs (Jour / Nuit) for proj03 (or any modal that uses data-section)
  document.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab-btn");
    if (!tab) return;

    const modal = tab.closest(".gallery-modal");
    if (!modal) return;

    const section = tab.dataset.section;
    if (!section) return;

    // Toggle active buttons
    qsa(modal, ".tab-btn").forEach(b => b.classList.toggle("active", b === tab));

    // Show/hide grids
    qsa(modal, ".gallery-grid[data-section]").forEach(grid => {
      grid.style.display = (grid.dataset.section === section) ? "" : "none";
    });

    // Reset viewer
    const viewerImg = qs(modal, ".viewer-img");
    const viewerVideo = qs(modal, ".viewer-video");
    viewerImg?.removeAttribute("src");
    if (viewerImg) viewerImg.style.display = "none";
    if (viewerVideo) {
      viewerVideo.pause();
      viewerVideo.removeAttribute("src");
      viewerVideo.load();
      viewerVideo.style.display = "none";
    }
  });

})();