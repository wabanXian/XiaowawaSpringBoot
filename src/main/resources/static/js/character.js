(function() {
	'use strict';

	$(function() {
		var Character = new window.Character();
	});

	window.Character = (function() {
		function Character() {
			this.init();
		}

		Character.prototype.init = function() {
			var hash = location.hash;

			this.Helpers = new Helpers();
			this.cacheElements();
			this.bindEvents();
			this.Helpers.resizeMainArea();

			if( hash !== '' ) {
				this.changeCharacter(hash);
			} else {
				location.hash = 'list';
			}
		};

		Character.prototype.cacheElements = function() {
			this.$wrap = $('#wrap');
			this.$main = this.$wrap.find('#main');
			this.$side = this.$wrap.find('#side');
			this.$contents = this.$main.find('.character');
			this.$charaNav = this.$main.find('.character__nav');
			this.$toScroll = this.$wrap.find('.toScroll');

			this.cached = this.$contents.html();
		};

		Character.prototype.bindEvents = function() {
			var self = this;

			$(window).on({
				load: function() {
					self.Helpers.adaptSideArea();
                    self.Helpers.pageLoaded();
				},
				resize: function() {
					self.Helpers.resizeMainArea();
				},
				hashchange: function() {
					var hash = location.hash;

					self.$contents.velocity('scroll', 700, 'easeOutQuart');
					self.changeCharacter( hash );
				}
			});

		  	$(document).on('click', '.toScroll', function() {
				var target = $(this).attr('data-target');

				$('#' + target).velocity('scroll', {
					offset: -60,
					duration: 700,
					easing: 'easeOutQuart'
				});
			});
		};

		Character.prototype.changeCharacter = function(hash) {
			var self = this;

			hash = hash.slice(1);

			this.$contents.velocity({ opacity: [0, 1] }, {
				duration: 400,
				queue: false,
				complete: function() {
					if( hash !== 'list' ) {
						$.ajax({
							url: './?q=' + hash,
							type: 'GET',
							dataType: 'html',
							cache: false
						}).done(function(res) {
							self.contentsLoaded(res, hash);
						}).fail(function() { location.hash = 'list'; });
					} else {
						self.contentsLoaded(self.cached, hash);
					}
				}
			})
		};

		Character.prototype.contentsLoaded = function(res, hash) {
			var self = this;

			self.$contents.empty().html(res).imagesLoaded(function() {
				$(this.elements).velocity({ opacity: [1, 0] }, 400, function() {
					if(hash !== 'list') {
						self.showNavigation();
					} else {
						self.hideNavigation();
					}
					self.Helpers.adaptSideArea();
				});
			});
		};

		Character.prototype.hideNavigation = function() {
			this.$charaNav.css('display', 'none');
		};

		Character.prototype.showNavigation = function() {
			this.$charaNav.css('display', 'block');
		};

		return Character;
	}());
}());