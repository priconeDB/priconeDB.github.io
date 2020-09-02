(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							'images/bg/bg1.jpg': 'center',
							'images/bg/bg2.jpg': 'center',
							'images/bg/bg3.jpg': 'center',
							'images/bg/bg4.jpg': 'center',
							'images/bg/bg5.jpg': 'center',
							'images/bg/bg6.jpg': 'center',
							'images/bg/bg7.jpg': 'center',
							'images/bg/bg8.jpg': 'center',
							'images/bg/bg9.jpg': 'center',
							'images/bg/bg10.jpg': 'center',
							'images/bg/bg12.jpg': 'center',
							'images/bg/bg13.jpg': 'center',
							'images/bg/bg14.jpg': 'center',
							'images/bg/bg15.jpg': 'center',
							'images/bg/bg16.jpg': 'center',
							'images/bg/bg17.jpg': 'center',
							'images/bg/bg18.jpg': 'center',
							'images/bg/bg19.jpg': 'center',
							'images/bg/bg20.jpg': 'center',
							'images/bg/bg21.jpg': 'center',
							'images/bg/bg22.jpg': 'center',
							'images/bg/bg23.jpg': 'center',
							'images/bg/bg24.jpg': 'center',
							'images/bg/bg25.jpg': 'center',
							'images/bg/bg26.jpg': 'center',
							'images/bg/bg27.jpg': 'center',
							'images/bg/bg28.jpg': 'center',
							'images/bg/bg29.jpg': 'center',
							'images/bg/bg30.jpg': 'center',
							'images/bg/bg31.jpg': 'center',
							'images/bg/bg32.jpg': 'center',
							'images/bg/bg33.jpg': 'center',
							'images/bg/bg34.jpg': 'center',
						},

					// Delay.
						delay: 6000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

				var	jsrandom;
				var i, max = 34;
				var num = 0;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for(k in settings.images)
				{
					jsrandom = Math.random();
					num = Math.floor(jsrandom*max+1);
					// Create BG.
					$bg = document.createElement('div');
					//$bg.style.backgroundImage = 'url("' + k + '")';
					$bg.style.backgroundImage = 'url("images/bg/bg' + num + '.jpg")';
					$bg.style.backgroundPosition = settings.images[k];
					$wrapper.appendChild($bg);

					//document.write(num+'\n');
					
				// Add it to array.
					$bgs.push($bg);
				}

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();
})();