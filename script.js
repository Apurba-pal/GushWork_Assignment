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