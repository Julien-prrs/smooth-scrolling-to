class Easing {
    static linear(t, b, c, d) {
        return c * t / d + b;
    }

    static easeInQuad(t, b, c, d) {
        t /= d;
        return c * t * t + b;
    };

    static easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    };

    static easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    static easeInCubic(t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    };

    static easeOutCubic(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    };

    static easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    static easeInQuart(t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
    };

    static easeOutQuart(t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    };

    static easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    };

    static easeInQuint(t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    };

    static easeOutQuint(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    };

    static easeInOutQuint(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    };

    static easeInSine(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };

    static easeOutSine(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };

    static easeInOutSine(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };

    static easeInExpo(t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    };

    static easeOutExpo(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };

    static easeInOutExpo(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    static easeInCirc(t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
    };

    static easeOutCirc(t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t * t) + b;
    };

    static easeInOutCirc(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
    };
}

class SmoothScrollingTo {
    constructor() {
        this.easing = Easing;
        this.animation = {};

        this._requestAnimationFrameScoped = this.raf.bind(this);
    }

    /**
     * @param {Object} options
     * @param {Number} [options.speed=1600] - Scroll animation duration in ms
     * @param {Node} [options.scrollElement=document.documentElement] - Element to scroll throught
     * @param {Node|Number} options.target - Scroll target element or y position
     * @param {String} [options.easing=easeInOutExpo] - Scroll easing
     */
    scroll(options) {
        const speed = options.speed ? options.speed : 1600;
        const scrollElement = options.scrollElement ? options.scrollElement : document.documentElement;
        const target = options.target;
        const easing = options.easing ? options.easing : 'easeInOutExpo';

        const targetTopValue = typeof target == 'number' ? target : target.offsetTop;

        const settings = {
            scrollElement: scrollElement,
            target: target,
            beginPosition: scrollElement.scrollTop,
            speed: speed,
            distance: targetTopValue - scrollElement.scrollTop,
            beginTime: new Date().getTime(),
            easing: easing,
        }

        this.animation = settings;
        this._raf = requestAnimationFrame(this._requestAnimationFrameScoped);
    }

    raf() {
        this.animation.currentTime = new Date().getTime();

        let scrollValue = this.easing[this.animation.easing](
            this.animation.currentTime - this.animation.beginTime,
            this.animation.beginPosition,
            this.animation.distance,
            this.animation.speed
        );

        this.animation.scrollElement.scrollTop = scrollValue;
        this._raf = requestAnimationFrame(this._requestAnimationFrameScoped);

        if ((this.animation.currentTime - this.animation.beginTime) > this.animation.speed) {
            cancelAnimationFrame(this._raf);
        }
    }
}