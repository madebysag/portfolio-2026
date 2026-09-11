export class Particle {

	constructor (x, y, speed, direction, grav = 0) {
		this.x = x;
		this.y = y;
		this.vx = Math.cos(direction) * speed;
		this.vy = Math.sin(direction) * speed;
		this.gravity = grav;

		// this.friction = 1;
	
		return this;
	}

	get speed() {
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	}

	set speed (speed) {
		const direction = this.direction;
		this.vx = Math.cos(heading) * speed;
		this.vy = Math.sin(heading) * speed;
	}

	get direction() {
		return Math.atan2(this.vy, this.vx);
	}

	set direction (direction) {
		var speed = this.speed;
		this.vx = Math.cos(heading) * speed;
		this.vy = Math.sin(heading) * speed;
	}

	accelerate(ax, ay) {
		this.vx += ax;
		this.vy += ay;
	}

	update() {
		// this.vx *= this.friction;
		// this.vy *= this.friction;
		this.vy += this.gravity;
		this.x += this.vx;
		this.y += this.vy;
	}

	angleTo (p2) {
		return Math.atan2(p2.y - this.y, p2.x - this.x);
	}

	distanceTo (p2) {
		const dx = p2.x - this.x,
		    dy = p2.y - this.y;

		return Math.sqrt(dx * dx + dy * dy);
	}

};