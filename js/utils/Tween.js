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

    static _tween(objects, props, duration, easingFunc, onProgress, onComplete) {

        // const [starts, changes] = [{}, {}]
        let startTime = performance.now();
        
        objects.forEach(obj => {
            
            for(const prop in props) {
                
                
                obj._starts = {}
                obj._changes = {}

                obj._starts[prop] = obj[prop];
                obj._changes[prop] = props[prop] - obj._starts[prop];
            }
        })

        
		requestAnimationFrame(animate);

        let lastTimestamp;   // for calculation Delta time

		function animate(currentTimestamp) {

            const delta = lastTimestamp ? currentTimestamp - lastTimestamp : 16

            lastTimestamp = currentTimestamp
            
            let elapsedTime = currentTimestamp - startTime; // How many time as passed

			if(elapsedTime < duration) { 
                
                objects.forEach(obj => {

                    for(const prop in props) {
                        obj[prop] = easingFunc(elapsedTime, obj._starts[prop], obj._changes[prop], duration);
                    }
                })
                
				onProgress();
				requestAnimationFrame(animate);

			} else {

				elapsedTime = duration;

				objects.forEach(obj => {

                    for(const prop in props) {
                        obj[prop] = easingFunc(elapsedTime, obj._starts[prop], obj._changes[prop], duration);
                    }
                })
                
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

