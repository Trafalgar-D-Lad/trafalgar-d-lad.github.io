// js/gallery.js
(() => {
  const openButtons = document.querySelectorAll(".open-gallery");
  const modals = document.querySelectorAll(".gallery-modal");
  let lastFocusedElement = null;

  const qs = (root, selector) => root.querySelector(selector);
  const qsa = (root, selector) => [...root.querySelectorAll(selector)];

  function resetViewer(modal) {
    const viewerVideo = qs(modal, ".viewer-video");
    const viewerIframe = qs(modal, ".viewer-iframe");
    const viewerImg = qs(modal, ".viewer-img");

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
      viewerImg.removeAttribute("src");
      viewerImg.removeAttribute("alt");
      viewerImg.style.display = "none";
    }

    qsa(modal, ".gallery-thumb.active").forEach((thumb) => {
      thumb.classList.remove("active");
      thumb.removeAttribute("aria-current");
    });
  }

  function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    resetViewer(modal);
    lastFocusedElement?.focus();
  }

  function openModal(modal, opener) {
    lastFocusedElement = opener;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const firstThumb = qs(modal, ".gallery-thumb");
    if (firstThumb) {
      firstThumb.click();
      firstThumb.focus();
    } else {
      qs(modal, ".gallery-close")?.focus();
    }
  }

  function setActiveThumb(modal, activeThumb) {
    qsa(modal, ".gallery-thumb").forEach((thumb) => {
      const isActive = thumb === activeThumb;
      thumb.classList.toggle("active", isActive);
      if (isActive) thumb.setAttribute("aria-current", "true");
      else thumb.removeAttribute("aria-current");
    });
  }

  function showMedia(modal, type, src, thumb) {
    resetViewer(modal);
    setActiveThumb(modal, thumb);

    const viewerImg = qs(modal, ".viewer-img");
    const viewerVideo = qs(modal, ".viewer-video");
    const viewerIframe = qs(modal, ".viewer-iframe");
    const thumbImg = qs(thumb, "img");

    if (type === "img" && viewerImg) {
      viewerImg.src = src;
      viewerImg.alt = thumbImg?.alt || "Aperçu du projet";
      viewerImg.style.display = "block";
      return;
    }

    if (type === "video" && viewerVideo) {
      viewerVideo.src = src;
      viewerVideo.style.display = "block";
      viewerVideo.load();
      viewerVideo.play().catch(() => {});
      return;
    }

    if (type === "youtube" && viewerIframe) {
      viewerIframe.title = thumb.getAttribute("aria-label") || "Vidéo du projet";
      viewerIframe.src = src;
      viewerIframe.style.display = "block";
    }
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.getElementById(`${button.dataset.gallery}-gallery`);
      if (modal) openModal(modal, button);
    });
  });

  modals.forEach((modal) => {
    qs(modal, ".gallery-close")?.addEventListener("click", () => closeModal(modal));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal(modal);
    });
  });

  document.addEventListener("click", (event) => {
    const thumb = event.target.closest(".gallery-thumb");
    if (!thumb) return;

    const modal = thumb.closest(".gallery-modal");
    const { type, src } = thumb.dataset;
    if (modal && type && src) showMedia(modal, type, src, thumb);
  });

  document.addEventListener("keydown", (event) => {
    const opened = document.querySelector(".gallery-modal.open");
    if (!opened) return;

    if (event.key === "Escape") {
      closeModal(opened);
      return;
    }

    if (event.key === "Tab") {
      const focusable = qsa(opened, 'button, [href], iframe, video[controls], [tabindex]:not([tabindex="-1"])')
        .filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
