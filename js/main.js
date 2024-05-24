$(function () {

	// var updateTopSpacing = function() {
	//     var scrollTop = $(window).scrollTop();
	//     if (scrollTop > 0) {
	//         $(".js-sticky-header").sticky('update', { topSpacing: 10 });
	//     } else {
	//         $(".js-sticky-header").sticky('update', { topSpacing: 0 });
	//     }
	// };

	// Attach the updateTopSpacing function to the scroll event
	// $(window).on('scroll', updateTopSpacing);

	var siteMenuClone = function () {

		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function () {

			var counter = 0;
			$('.site-mobile-menu .has-children').each(function () {
				var $this = $(this);

				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});

				counter++;

			});

		}, 1000);

		$('body').on('click', '.arrow-collapse', function (e) {
			var $this = $(this);
			if ($this.closest('li').find('.collapse').hasClass('show')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();

		});

		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	siteMenuClone();

	
	

});
$(document).ready(function() {
	// Initialize sticky with initial topSpacing of 10
	

	var updateTopSpacing = function () {
		var hT = $('#scroll-to').offset().top,
			hH = $('#scroll-to').outerHeight(),
			wH = $(window).height(),
			wS = $(window).scrollTop() + 200;

		console.log((hT - wH), wS);

		// Check the scroll position and update the topSpacing
		if (wS > (hT + hH - wH) && (wS + wH > hT + hH)) {
			// Update topSpacing to 0
			$(".js-sticky-header").sticky({ topSpacing: 10 });
			$(".js-sticky-header").css('top', '10');
		} else {
			// Reset topSpacing to 10
			$(".sticky-wrapper").removeClass("is-sticky")
			$(".js-sticky-header").css('top', '20px');
		}
	};

	// Attach the updateTopSpacing function to the scroll event
	$(window).on('scroll', updateTopSpacing);
});