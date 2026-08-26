// Ease Functions
const  utils = {
    norm: function(value, min, max) {
		return (value - min) / (max - min);
	},

	lerp: function(norm, min, max) {
		return (max - min) * norm + min;
	},

	map: function(value, sourceMin, sourceMax, destMin, destMax) {
		return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
	},
    
    clamp: function(value, min, max) {
		return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	}
}

export class BoxWorker {
    static makeBoxes() {
        const boxes = []

        const width = window.innerWidth
        const height = window.innerHeight

        const size = width > 600 ? 50 : 25;
        
        const cols = Math.ceil(width / size);
        const rows = Math.ceil(height / size);
        const cells = rows * cols;

        for (let i = 0; i < cells; i++) {
            const x = (i % cols) * size,
                y = Math.floor(i / cols) * size,
                speed = Math.floor(Math.random() * 5 + 1);

            const box = { size, x, y, speed, alpha: 0}
            
            boxes.push(box)
        }

        return boxes;
    }

    static render(ctx, boxes, width, height) {

        ctx.clearRect(0, 0, width, height);
        
        boxes.forEach(box => {
            ctx.save()

            ctx.globalAlpha = box.alpha;
            ctx.fillRect(box.x, box.y, box.size, box.size)

            ctx.restore()
        })
    }
}

export class Transistion {

    static transit(boxes, duration, onProgress, onComplete, show) {

        duration *=1000 // Convert to milli seconds
        let startTime = performance.now();
        
        
        requestAnimationFrame(animate);

        let lastTimestamp = startTime;   // for calculation Delta time

        function animate(currentTimestamp) {

            const delta = currentTimestamp - lastTimestamp 

            lastTimestamp = currentTimestamp
            
            let elapsedTime = currentTimestamp - startTime; // How many time as passed

            
            if(elapsedTime < duration) { 
                
                boxes.forEach(box => {

                    // duration is the range
                    // speed determin the rate of increment by delta
                    // alpha is range 0 to 1
                    // const boxDuration = duration / box.speed;
                    
                    let calculatedAlpha = show ? box.alpha + (box.speed * delta * 0.005) : box.alpha - (box.speed * delta * 0.005)

                    calculatedAlpha = utils.clamp(calculatedAlpha, 0, 1);

                    // console.log(calculatedAlpha, boxDuration, box.speed)
                    // console.log(calculatedAlpha)
                    
                    box.alpha = calculatedAlpha
                })
                
                onProgress();
                requestAnimationFrame(animate);

            } else {

                elapsedTime = duration;

                boxes.forEach(box => {
                    // duration is the range
                    // speed determin the rate of increment by delta
                    // alpha is range 0 to 1
                    // const boxDuration = duration / box.speed;
                    
                    let calculatedAlpha = show ? box.alpha + (box.speed * delta * 0.005) : box.alpha - (box.speed * delta * 0.005)

                    calculatedAlpha = utils.clamp(calculatedAlpha, 0, 1);
                    
                    box.alpha = calculatedAlpha

                    
                })
                
                onComplete();
            }
        }
    }
    
    static showBoxes(boxes, duration, onProgress, onComplete) {
        Transistion.transit(boxes, duration, onProgress, onComplete, true)
    }

    static hideBoxes(boxes, duration, onProgress, onComplete) {
        Transistion.transit(boxes, duration, onProgress, onComplete, false)
    }
}

