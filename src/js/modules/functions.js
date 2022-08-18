/* checking out of the webp support, the class webp adding or no-webp for HTML */
export function isWebP() {
	//checking out of webp support
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
	}
	// supplementation of the class of _webp or _no-webp for HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp'; //this function is cheking out the browser if only it supports images at webp and add relevant class for html tag
		document.documentElement.classList.add(className);	
		});
	}