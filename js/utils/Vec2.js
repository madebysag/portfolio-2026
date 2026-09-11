export default class Vec2 {

    constructor(x = 1, y = 0) {
        this.x = x;
        this.y = y;

        return this;
    }
	
    // About angles
	set angle(angle) {
		const length = this.length;
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	}

	get angle() {
		return Math.atan2(this.y, this.x);
	}

    // about length of hypotenos/ magnitude of a vec
	set length(length) {
		const angle = this.angle;
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	}

	get lenght() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

    // Basic vec arithmetic operations
	add(v2) {
		return new Vec2(this.x + v2.x, this.y + v2.y);
	}

	subtract(v2) {
		return new Vec2(this.x - v2.x, this.y - v2.y);
	}

	multiply(val) {
		return new Vec2(this.x * val, this.y * val);
	}

	divide(val) {
		return new Vec2(this.x / val, this.y / val);
	}

	addTo(v2) {
		this.x += v2.x;
		this.y += v2.y;
	}

	subtractFrom(v2) {
		this.x -= v2.x;
		this.y -= v2.y;
	}

	multiplyBy(val) {
		this.x *= val;
		this.y *= val;
	}

	divideBy(val) {
		this.x /= val;
		this.y /= val;
	}
}