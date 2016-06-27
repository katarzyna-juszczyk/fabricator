svg4everybody();

$(document).ready(function(){
   $('.main-slider').slick({
      dots: true,
      infinite: true,
      speed: 500,
      cssEase: 'linear',
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      focusOnSelect: true
  });
 });
