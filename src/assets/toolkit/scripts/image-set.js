'use strict';

var ImageSet = function(captionContainer, captionTextClass, captionLinkClass) {
	this.caption = captionContainer;
	this.captionTextClass = captionTextClass;
	this.captionLinkClass = captionLinkClass;
};

ImageSet.prototype.showCaption = function(slide) {
	var _this = this;

	_this.caption.find(_this.captionTextClass).text($(slide).find(_this.captionTextClass).text());
	_this.caption.find(_this.captionLinkClass).text($(slide).find(_this.captionLinkClass).text());
};

$(document).ready(function(){

	var imageSet = new ImageSet($('.js-caption'), '.js-caption__text', '.js-caption__link');
	var slider = $('.image-set');

	slider.slick({
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		focusOnSelect: true,
		nextArrow: '<button class="image-set__next"><svg class="icon-arrow-right--white image-set__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/toolkit/svgIcons/svgIcons.svg#arrow-right"></use></svg></button>',
		prevArrow: '<button class="image-set__prev"><svg class="icon-arrow-right--white image-set__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/toolkit/svgIcons/svgIcons.svg#arrow-right"></use></svg></button>'
	});

	slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		imageSet.showCaption($('.image-set__slide')[nextSlide]);
	});

	imageSet.showCaption($('.image-set__slide')[0]);
});
