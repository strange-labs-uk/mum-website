document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.querySelector("#year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  const modal = document.querySelector("#lightbox");
  const modalImage = document.querySelector("#lightbox-image");
  const modalTitle = document.querySelector("#lightbox-title");
  const modalCaption = document.querySelector("#lightbox-caption");

  if (modal && modalImage && modalTitle && modalCaption) {
    const body = document.body;

    function openModal(fromThumb) {
      const title = fromThumb.dataset.title || "";
      const caption = fromThumb.dataset.caption || "";
      const fullSrc = fromThumb.dataset.fullSrc || "";

      if (modalImage instanceof HTMLImageElement) {
        modalImage.src = fullSrc;
        modalImage.alt = title;
      }

      modalTitle.textContent = title;
      modalCaption.textContent = caption;

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => openModal(item));
      item.addEventListener("keypress", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(item);
        }
      });
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", item.dataset.title || "Open artwork");
    });

    modal.querySelectorAll("[data-lightbox-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }
});

