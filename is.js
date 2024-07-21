let currentIndexes = [0, 0];
let autoSlideIntervals = [null, null];

function showSlider(sliderIndex) {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach((slider, index) => {
        slider.style.display = index === sliderIndex ? 'block' : 'none';
    });
    showSlide(sliderIndex, currentIndexes[sliderIndex]);  // Ensure the correct slide is shown
    startAutoSlide(sliderIndex);  // Start auto slide for the selected slider
}

function showSlide(sliderIndex, slideIndex) {
    const slides = document.querySelectorAll(`#slider${sliderIndex + 1} .slides img`);
    if (slideIndex >= slides.length) {
        currentIndexes[sliderIndex] = 0;
    } else if (slideIndex < 0) {
        currentIndexes[sliderIndex] = slides.length - 1;
    } else {
        currentIndexes[sliderIndex] = slideIndex;
    }
    const offset = -currentIndexes[sliderIndex] * 100;
    document.querySelector(`#slider${sliderIndex + 1} .slides`).style.transform = `translateX(${offset}%)`;
}

function changeSlide(step, sliderIndex) {
    showSlide(sliderIndex, currentIndexes[sliderIndex] + step);
}

function startAutoSlide(sliderIndex) {
    stopAutoSlide(sliderIndex);  // Ensure no duplicate intervals
    autoSlideIntervals[sliderIndex] = setInterval(() => {
        changeSlide(1, sliderIndex);
    }, 3000);  // Change slide every 3 seconds
}

function stopAutoSlide(sliderIndex) {
    clearInterval(autoSlideIntervals[sliderIndex]);
    autoSlideIntervals[sliderIndex] = null;
}

document.addEventListener('DOMContentLoaded', () => {
    showSlider(0);  // Show the first slider by default
    currentIndexes.forEach((_, index) => {
        showSlide(index, 0);
        startAutoSlide(index);  // Start auto slide for all sliders initially
    });
});
