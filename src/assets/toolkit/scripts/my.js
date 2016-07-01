svg4everybody();

$(document).ready(function(){

  $('.main-slider').on('init', function(slick) {

    $.each($('.main-slider__heading'), function(i,e) {
      $clamp(e, {clamp: 3});
    });

  });


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


