// #slider swiper
var slider_swiper = new Swiper(".sliderSwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: "#slider .swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});



// # best swiper
var new_swiper = new Swiper(".bestSwiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    pagination: {
        el: "#best .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: "#best .swiper-button-next",
        prevEl: "#best .swiper-button-prev",
    },
    slidesPerGroup: 3

});

// # new swiper
var new_swiper = new Swiper(".newSwiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    pagination: {
        el: "#new .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: "#new .swiper-button-next",
        prevEl: "#new .swiper-button-prev",
    },
    slidesPerGroup: 3

});