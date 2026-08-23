// Ease Functions
const  easeFunctions = {
    linear: (t, b, c, d) => {
        return c * t / d + b;
    },

    easeIn: (t, b, c, d) => {
        return c*(t/=d)*t + b;
    },

    easeOut: (t, b, c, d) => {
        return -c *(t/=d)*(t-2) + b;
    },

    easeInOut: (t, b, c, d) => {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    }
}

export class Tween {

    static _tween(obj, props, duration, easingFunc, onProgress, onComplete) {

        const [starts, changes] = [{}, {}]
        let startTime = performance.now();

		for(const prop in props) {
			starts[prop] = obj[prop];
			changes[prop] = props[prop] - starts[prop];
		}

        
		requestAnimationFrame(animate);

		function animate(timestamp) {

			let time = timestamp - startTime; // How many time as passed

			if(time < duration) { 
				for(const prop in props) {
					obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
				}
				onProgress();
				requestAnimationFrame(animate);

			} else {

				time = duration;
				for(const prop in props) {
					obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
				}
				onComplete();
			}
		}
    }

    static linear (obj, props, duration, onProgress, onComplete) {
        Tween._tween(obj, props, duration,  easeFunctions.linear, onProgress, onComplete)
    }

    static easeIn (obj, props, duration, onProgress, onComplete) {
        Tween._tween(obj, props, duration,  easeFunctions.easeIn, onProgress, onComplete)
    }
    
    static easeOut (obj, props, duration, onProgress, onComplete) {
        Tween._tween(obj, props, duration,  easeFunctions.easeOut, onProgress, onComplete)
    }
    
    static easeInOut (obj, props, duration, onProgress, onComplete) {
        Tween._tween(obj, props, duration,  easeFunctions.easeInOut, onProgress, onComplete)
    }
    
}

