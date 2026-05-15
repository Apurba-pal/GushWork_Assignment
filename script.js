// =========================================================
// IMAGE ARRAY – used by the main product carousel
// =========================================================

const images = [
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop"
];

let current = 0;

const mainImage = document.getElementById("mainImage");

const thumbs = document.querySelectorAll(".thumb");

const leftBtn = document.querySelector(".left");

const rightBtn = document.querySelector(".right");

function updateImage(index){

    mainImage.src = images[index];

    thumbs.forEach((thumb,i)=>{
        thumb.classList.toggle("active",i===index);
    });

    // Refresh the zoom panel to reflect the newly loaded image
    updateZoomImage();
}

rightBtn.addEventListener("click",()=>{

    current++;

    if(current >= images.length){
        current = 0;
    }

    updateImage(current);
});

leftBtn.addEventListener("click",()=>{

    current--;

    if(current < 0){
        current = images.length - 1;
    }

    updateImage(current);
});

thumbs.forEach((thumb,index)=>{

    thumb.addEventListener("click",()=>{

        current = index;

        updateImage(current);
    });
});


// FAQ ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach((faq) => {

            if(faq !== item){
                faq.classList.remove("active");

                faq.querySelector(".faq-icon").textContent = "⌄";
            }
        });

        item.classList.toggle("active");

        const icon = item.querySelector(".faq-icon");

        if(item.classList.contains("active")){
            icon.textContent = "⌃";
        }else{
            icon.textContent = "⌄";
        }

    });

});

// APPLICATION SLIDER

const applicationsTrack = document.querySelector(".applications-track");

const nextApp = document.querySelector(".next-app");

const prevApp = document.querySelector(".prev-app");

let appTranslate = 0;

nextApp.addEventListener("click", () => {

    appTranslate -= 382;

    const maxTranslate =
        -(applicationsTrack.scrollWidth - document.querySelector(".applications-slider").clientWidth);

    if(appTranslate < maxTranslate){
        appTranslate = 0;
    }

    applicationsTrack.style.transform = `translateX(${appTranslate}px)`;
});

prevApp.addEventListener("click", () => {

    appTranslate += 382;

    if(appTranslate > 0){
        appTranslate = maxTranslate;
    }

    applicationsTrack.style.transform = `translateX(${appTranslate}px)`;
});


// PROCESS IMAGE SLIDER

const processImages = [

    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop"
];

let processIndex = 0;

const processMainImage =
    document.getElementById("processMainImage");

const nextProcess =
    document.querySelector(".right-process");

const prevProcess =
    document.querySelector(".left-process");

/* next */

nextProcess.addEventListener("click", () => {

    processIndex++;

    if(processIndex >= processImages.length){
        processIndex = 0;
    }

    processMainImage.src =
        processImages[processIndex];
});

/* prev */

prevProcess.addEventListener("click", () => {

    processIndex--;

    if(processIndex < 0){
        processIndex = processImages.length - 1;
    }

    processMainImage.src =
        processImages[processIndex];
});

/* tabs */

const processTabs =
    document.querySelectorAll(".process-tab");

processTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        processTabs.forEach((btn) => {
            btn.classList.remove("active");
        });

        tab.classList.add("active");
    });

});


// =========================================================
// STICKY HEADER
// Appears when the user scrolls past the first fold
// (i.e. beyond the bottom of the main-section hero area)
// and disappears when scrolled back to the top.
// =========================================================

const stickyHeader   = document.getElementById("stickyHeader");
const mainSection    = document.querySelector(".main-section");

// Track the last scroll position to detect scroll direction
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    // The threshold is the bottom edge of the main product section (first fold)
    const threshold = mainSection
        ? mainSection.offsetTop + mainSection.offsetHeight
        : window.innerHeight;

    if (currentScrollY > threshold) {
        // User has scrolled past the first fold – show the sticky header
        stickyHeader.classList.add("visible");
    } else {
        // User scrolled back into the first fold – hide it
        stickyHeader.classList.remove("visible");
    }

    lastScrollY = currentScrollY;
});


// =========================================================
// IMAGE CAROUSEL ZOOM
// On hovering over the main carousel image:
//   - A magnifying lens follows the mouse
//   - A zoomed result panel appears beside (or below) the image
// On hovering over any thumbnail:
//   - A floating preview card appears near the cursor
// =========================================================

const mainImageEl   = document.getElementById("mainImage");
const mainWrapper   = document.getElementById("mainImageWrapper");
const zoomLens      = document.getElementById("zoomLens");
const zoomResult    = document.getElementById("zoomResult");
const thumbEls      = document.querySelectorAll(".thumb");
const thumbPreview  = document.getElementById("thumbZoomPreview");
const thumbPreviewImg = document.getElementById("thumbZoomImg");

// ---- MAIN IMAGE ZOOM ----

// Zoom factor (how many times larger the zoomed image appears)
const ZOOM_FACTOR = 3;

function initMainZoom() {

    // Set the zoom result background to the current main image src
    const src = mainImageEl.src;
    zoomResult.style.backgroundImage = `url(${src})`;
    zoomResult.style.backgroundSize  =
        `${mainWrapper.offsetWidth * ZOOM_FACTOR}px ${mainWrapper.offsetHeight * ZOOM_FACTOR}px`;
}

mainWrapper.addEventListener("mouseenter", () => {

    initMainZoom();

    zoomLens.style.display   = "block";
    zoomResult.style.display = "block";
});

mainWrapper.addEventListener("mouseleave", () => {

    zoomLens.style.display   = "none";
    zoomResult.style.display = "none";
});

mainWrapper.addEventListener("mousemove", (e) => {

    const rect   = mainWrapper.getBoundingClientRect();
    const lensW  = zoomLens.offsetWidth;
    const lensH  = zoomLens.offsetHeight;

    // Mouse position relative to the wrapper
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Position the lens (clamp so it stays within the image)
    const lensX = Math.max(lensW / 2, Math.min(x, rect.width  - lensW / 2));
    const lensY = Math.max(lensH / 2, Math.min(y, rect.height - lensH / 2));

    zoomLens.style.left = `${lensX}px`;
    zoomLens.style.top  = `${lensY}px`;

    // Calculate the background-position for the result panel so it
    // mirrors exactly the region under the lens
    const bgX = -((lensX - lensW / 2) * ZOOM_FACTOR);
    const bgY = -((lensY - lensH / 2) * ZOOM_FACTOR);

    zoomResult.style.backgroundPosition = `${bgX}px ${bgY}px`;
});

// Update zoom image when the carousel changes
function updateZoomImage() {
    initMainZoom();
}

// ---- THUMBNAIL ZOOM PREVIEW ----

// Margin between the cursor and the preview card (px)
const PREVIEW_OFFSET = 14;

thumbEls.forEach((thumb) => {

    const thumbImg = thumb.querySelector("img");

    thumb.addEventListener("mouseenter", (e) => {

        // Show the preview with the same image as the thumbnail
        thumbPreviewImg.src       = thumbImg.src.replace("w=300", "w=600");
        thumbPreview.style.display = "block";

        positionThumbPreview(e);
    });

    thumb.addEventListener("mousemove", positionThumbPreview);

    thumb.addEventListener("mouseleave", () => {
        thumbPreview.style.display = "none";
    });
});

function positionThumbPreview(e) {

    const pW = thumbPreview.offsetWidth;
    const pH = thumbPreview.offsetHeight;

    // Default: show above the cursor
    let left = e.clientX + PREVIEW_OFFSET;
    let top  = e.clientY - pH - PREVIEW_OFFSET;

    // Clamp to viewport
    if (left + pW > window.innerWidth)  left = e.clientX - pW - PREVIEW_OFFSET;
    if (top < 0)                        top  = e.clientY + PREVIEW_OFFSET;

    thumbPreview.style.left = `${left}px`;
    thumbPreview.style.top  = `${top}px`;
}


// =========================================================
// DATASHEET MODAL
// Opens when "Download Full Technical Datasheet" is clicked.
// Closes via × button, clicking the backdrop, or Escape key.
// =========================================================

const datasheetBtn   = document.getElementById("datasheetBtn");
const datasheetModal = document.getElementById("datasheetModal");
const modalClose     = document.getElementById("modalClose");
const modalSubmit    = document.getElementById("modalSubmit");
const modalEmail     = document.getElementById("modalEmail");

/* Open modal */
datasheetBtn.addEventListener("click", () => {
    datasheetModal.classList.add("active");
    // Focus the email field for accessibility
    setTimeout(() => modalEmail.focus(), 100);
    // Prevent page scroll while modal is open
    document.body.style.overflow = "hidden";
});

/* Close helpers */
function closeModal() {
    datasheetModal.classList.remove("active");
    document.body.style.overflow = "";
}

/* Close via × button */
modalClose.addEventListener("click", closeModal);

/* Close when clicking the backdrop (outside the modal box) */
datasheetModal.addEventListener("click", (e) => {
    if (e.target === datasheetModal) closeModal();
});

/* Close on Escape key */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && datasheetModal.classList.contains("active")) {
        closeModal();
    }
});

/* Handle form submission */
modalSubmit.addEventListener("click", () => {

    const email = modalEmail.value.trim();

    /* Basic validation — email is required */
    if (!email) {
        modalEmail.focus();
        modalEmail.style.borderColor = "#ef4444";
        modalEmail.style.boxShadow   = "0 0 0 3px rgba(239,68,68,0.12)";
        setTimeout(() => {
            modalEmail.style.borderColor = "";
            modalEmail.style.boxShadow   = "";
        }, 1800);
        return;
    }

    /* Show a brief confirmation, then close */
    modalSubmit.textContent = "✓ Request Sent!";
    modalSubmit.style.background = "#16a34a";

    setTimeout(() => {
        closeModal();
        /* Reset form and button */
        modalEmail.value = "";
        document.getElementById("modalContact").value = "";
        modalSubmit.textContent  = "Download Brochure";
        modalSubmit.style.background = "";
    }, 1500);
});


// =========================================================
// QUOTE MODAL ("Request a call back")
// Opened by any button with data-modal="quote"
// =========================================================

const quoteModal      = document.getElementById("quoteModal");
const quoteModalClose = document.getElementById("quoteModalClose");
const quoteSubmit     = document.getElementById("quoteSubmit");
const quoteName       = document.getElementById("quoteName");
const quoteEmail      = document.getElementById("quoteEmail");

/* All buttons that should open this modal */
document.querySelectorAll("[data-modal='quote']").forEach((btn) => {
    btn.addEventListener("click", () => {
        quoteModal.classList.add("active");
        // Focus the first field
        setTimeout(() => quoteName.focus(), 100);
        document.body.style.overflow = "hidden";
    });
});

/* Close helpers for quote modal */
function closeQuoteModal() {
    quoteModal.classList.remove("active");
    document.body.style.overflow = "";
}

quoteModalClose.addEventListener("click", closeQuoteModal);

quoteModal.addEventListener("click", (e) => {
    if (e.target === quoteModal) closeQuoteModal();
});

/* Escape key closes whichever modal is open */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && quoteModal.classList.contains("active")) {
        closeQuoteModal();
    }
});

/* Submit with validation */
quoteSubmit.addEventListener("click", () => {

    const name  = quoteName.value.trim();
    const email = quoteEmail.value.trim();

    /* Highlight first empty required field */
    function flashError(input) {
        input.focus();
        input.style.borderColor = "#ef4444";
        input.style.boxShadow   = "0 0 0 3px rgba(239,68,68,0.12)";
        setTimeout(() => {
            input.style.borderColor = "";
            input.style.boxShadow   = "";
        }, 1800);
    }

    if (!name)  { flashError(quoteName);  return; }
    if (!email) { flashError(quoteEmail); return; }

    /* Success state */
    quoteSubmit.textContent        = "✓ We'll call you back!";
    quoteSubmit.style.background   = "#16a34a";

    setTimeout(() => {
        closeQuoteModal();
        /* Reset */
        quoteName.value  = "";
        quoteEmail.value = "";
        document.getElementById("quoteCompany").value = "";
        document.getElementById("quotePhone").value   = "";
        quoteSubmit.textContent      = "Submit Form";
        quoteSubmit.style.background = "";
    }, 1600);
});