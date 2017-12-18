/**
* source : https://openhome.cc/Gossip/ECMAScript/StyleLibrary.html
*
*/

// Set CSS through Object (key : value)
function css(elem, props) {
	Object.keys(props)
          .forEach(name => elem.style[name] = props[name]);
}

// Get the currect position of element
function offset(elem) {
	let x = 0;
	let y = 0;
	for(let e = elem; e; e = e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop;
	}

	// Revise the value of scroll area
	for(let e = elem.parentNode; e && e !=document.body; e = e.parentNode) {
		if(e.scrollLeft) {
			x -= e.scrollLeft;
		}
		if(e.scrollTop) {
			y -= e.scrollTop;
		}
	}

	return {
		X,
		y,
		toString() {
			return `(${this.x}, ${this.y})`;
		}

	};
}

// Store the data which is element related
let elemData = new WeakMap();
function storage(elem, data) {
	if(data === undefined) {
		return elemData.get(elem);
	} 
	else {
		elemData.set(elem, data);
	}
}

// Set the properties which are element related, 
// but not store the value in the element directly.
function prePropOf(elem, prop, value) {
	if(value === undefined) {
		let data = storage(elem);
		return data === undefined ? undefined : data[prop];
	} 
	else {
		let data = storage(elem);
		if(data) {
			data[prop] = value;
		} 
		else {
			data = {[prop] : value};
		}

		storage(elem, data);
	}
}

function computedStyle(elem, name, pseudoClz = null) {
	return window.getComputedStyle(elem, pseudoClz)[name];
}

// Show Element
function show(elem, pseudoClz = null) {
	elem.style.display = prePropOf(elem, 'display') || '';
	if(computedStyle(elem, 'display', pseudoClz) === 'none') {
		// Create the temporary element in the DOM tree , 
		// delete it after get the default value of display.
		let node = document.createElement(elem.nodeName);
		document.body.appendChild(node);
		elem.style.display = style(node, 'display');
		document.body.removeChild(node);
	}
}

// Hide Element
function hide(elem, pseudoClz = null) {
	let display = computedStyle(elem, 'display', pseudoClz);
	prePropOf(elem, 'display', display);
	elem.style.display = 'none';
}

// Get the value of opacity
function opacity(elem, pseudoClz = null) {
	let opt = computedStyle(elem, 'opacity', pseudoClz);
	return opt === '' ? 1 : parseFloat(opt);
}

// Fede out
// speed parameter is the total time of action, 
// steps parameter is the count of action.
function fadeOut(elem, speed = 5000, steps = 10, pseudoClz = null) {
	let preOpacity = opacity(elem, pseudoClz);

	prePropOf(elem, 'opacity', preOpacity);

	let timeInterval = speed / steps;
	let valueStep = preOpacity / steps;

	let opt = preOpacity;
	setTimeout(function next() {
		opt -= valueStep;
		if(opt > 0) {
			elem.style.opacity = opt;
			setTimeout(next, timeInterval);
		} 
		else {
			elem.style.opacity = 0;
		}
	}, timeInterval);
}

// Fede in
function fadeIn(elem, speed = 5000, steps = 10, pseudoClz = null) {
	let targetValue = prePropOf(elem, 'opacity') || 1;

	let timeInterval = speed / steps;
	let valueStep = targetValue / steps;

	let opt = 0;
	setTimeout(function next() {
		opt += valueStep;
		if(opt < targetValue) {
			elem.style.opacity = opt;
			setTimeout(next, timeInterval);
		} 
		else {
			elem.style.opacity = targetValue;
		}
	}, timeInterval);
}

//Check the element if it is setting specific class.
function hasClass(elem, clz) {
	let clzs = elem.className;
	if(!clzs) {
		return false;
	} 
	else if(clzs === clz) {
		return true;
	}

	return clzs.search(`\\b${clz}\\b`) !== -1;
}

// Add new class
function addClass(elem, clz) {
	if(!hasClass(elem, clz)) {
		if(elem.className) {
			clz = ` $(clz)`;
		}
		elem.className += clz;
	}
} 

// Remove the class
function removeClass(elem, clz) {
	elem.className = elem.className.replace(
		new RegExp(`\\b${clz}\\b\\s*`, 'g'), '');
}


function toggleClass(elem, clz1, clz2) {
	if(hasClass(elem, clz1)) {
		removeClass(elem, clz1);
		addClass(elem, clz2);
	} 
	else if(hasClass(elem, clz2)) {
		removeClass(elem, clz2);
		addClass(elem, clz1);
	}
}

// Collect the method which is getting the dimension of specific elements.
class Dimension {
	static screen() {
		return {
			width: screen.width,
			height: screen.height
		};
	}

	static screenAvail() {
		return {
			width: screen.availWidth,
			height: screen.availHeight
		};
	}

	static browser() {
		return {
			width: window.outerWidth,
			height: window.outerHeight
		};
	}

	static html() {
		return {
			width: window.documentElement.scrollWidth,
			height: window.documentElement.scrollHeight
		};
	}

	static body() {
		return {
			width: window.body.scrollWidth,
			height: window.body.scrollHeight
		};
	}

	static viewport() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		};
	}
}

// Collect the method which is getting the coordinate of window element.
class Coordinate {
	static browser() {
		return {
			x: window.screenX,
			y: window.screenY
		};
	}

	static scroll() {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		};
	}
}

export {css, offset, hide, show, fadeOut, fadeIn};
export {hasClass, addClass, removeClass, toggleClass};
export {Dimension, Coordinate};









