;(function (window) {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

    // const FRAME_RATE = 60;
    const PARTICLE_NUM = 2000;
    const RADIUS = Math.PI * 2;
    const CANVAS_WIDTH = 650;
    const CANVAS_HEIGHT = 150;
    const CANVAS_ID = 'canvas';

    let texts = ['MY DEAR', 'ZHAO YANG', 'ARE YOU', 'LOOK UP AT THE', 'STARRY SKY', 'ARE YOU', 'LOOKING AT THE', 'SAME STAR', 'WITH ME ?', 'HAPPY', 'ONE MONTH', 'ANNIVERSARY', 'I MISS YOU', 'I LOVE YOU', 'AS WHO YOU ARE','You Complete Me'];

    let canvas,
        ctx,
        particles = [],
        quiver = true,
        text = texts[0],
        textIndex = 0,
        textSize = 70;

    function draw() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.textBaseline = 'middle';
        ctx.fontWeight = 'bold';
        ctx.font = textSize + 'px \'SimHei\', \'Avenger\', \'Helvetica Neu\', \'Arial\', \'sans-serif\'';
        ctx.fillText(text, (CANVAS_WIDTH - ctx.measureText(text).width) * 0.5, CANVAS_HEIGHT * 0.5);

        let imgData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        for (let i = 0, l = particles.length; i < l; i++) {
            let p = particles[i];
            p.inText = false;
        }
        particleText(imgData);

        window.requestAnimationFrame(draw);
    }

    function particleText(imgData) {
        let pls = [];
        for (let w = CANVAS_WIDTH; w > 0; w -= 3) {
            for (let h = 0; h < CANVAS_HEIGHT; h += 3) {
                let index = (w + h * (CANVAS_WIDTH)) * 4;
                if (imgData.data[index] > 1) {
                    pls.push([w, h]);
                }
            }
        }

        let count = pls.length;
        let j = parseInt((particles.length - count) / 2, 10);
        j = j < 0 ? 0 : j;

        for (let i = 0; i < pls.length && j < particles.length; i++, j++) {
            try {
                let p = particles[j],
                    X,
                    Y;

                if (quiver) {
                    X = (pls[i - 1][0]) - (p.px + Math.random() * 10);
                    Y = (pls[i - 1][1]) - (p.py + Math.random() * 10);
                } else {
                    X = (pls[i - 1][0]) - p.px;
                    Y = (pls[i - 1][1]) - p.py;
                }
                let T = Math.sqrt(X * X + Y * Y);
                let A = Math.atan2(Y, X);
                let C = Math.cos(A);
                let S = Math.sin(A);
                p.x = p.px + C * T * p.delta;
                p.y = p.py + S * T * p.delta;
                p.px = p.x;
                p.py = p.y;
                p.inText = true;
                p.fadeIn();
                p.draw(ctx);
            } catch (e) {

            }
        }
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            if (!p.inText) {
                p.fadeOut();

                let X = p.mx - p.px;
                let Y = p.my - p.py;
                let T = Math.sqrt(X * X + Y * Y);
                let A = Math.atan2(Y, X);
                let C = Math.cos(A);
                let S = Math.sin(A);

                p.x = p.px + C * T * p.delta / 2;
                p.y = p.py + S * T * p.delta / 2;
                p.px = p.x;
                p.py = p.y;

                p.draw(ctx);
            }
        }
    }

    function setDimensions() {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        canvas.style.position = 'absolute';
        canvas.style.left = '0%';
        canvas.style.top = '0%';
        canvas.style.bottom = '0%';
        canvas.style.right = '0%';
        canvas.style.marginTop = window.innerHeight * .15 + 'px';
    }



    function event() {
        document.addEventListener('click', function (e) {
            document.querySelector('#yang').play();
            textIndex++;
            if (textIndex >= texts.length) {
                textIndex--;
                return;
            }
            text = texts[textIndex];
            console.log(textIndex);
        }, false)

        document.addEventListener('touchstart', function (e) {
            document.querySelector('#yang').play();
            textIndex++;
            if (textIndex >= texts.length) {
                textIndex--;
                return;
            }
            text = texts[textIndex];
            console.log(textIndex);
        }, false)
    }

    function init() {
        canvas = document.getElementById(CANVAS_ID);
        if (canvas === null || !canvas.getContext) {
            return;
        }
        ctx = canvas.getContext('2d');
        setDimensions();
        event();

        for (let i = 0; i < PARTICLE_NUM; i++) {
            particles[i] = new Particle(canvas);
        }

        draw();
    }

    class Particle {
        constructor(canvas) {
            let spread = canvas.height
            let size = Math.random() * 1.2
            this.delta = 0.06
            this.x = 0
            this.y = 0
            this.px = Math.random() * canvas.width
            this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
            this.mx = this.px
            this.my = this.py
            this.size = size
            this.inText = false
            this.opacity = 0
            this.fadeInRate = 0.005
            this.fadeOutRate = 0.03
            this.opacityTresh = 0.98
            this.fadingOut = true
            this.fadingIn = true
        }

        fadeIn() {
            this.fadingIn = this.opacity <= this.opacityTresh
            if (this.fadingIn) {
                this.opacity += this.fadeInRate
            } else {
                this.opacity = 1
            }
        }

        fadeOut() {
            this.fadingOut = this.opacity >= 0
            if (this.fadingOut) {
                this.opacity -= this.fadeOutRate
                if (this.opacity < 0) {
                    this.opacity = 0
                }
            } else {
                this.opacity = 0
            }
        }

        draw(ctx) {
            ctx.fillStyle = 'rgba(226,225,142, ' + this.opacity + ')'
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, RADIUS, true)
            ctx.closePath()
            ctx.fill()
        }
    }

    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    // if (!isChrome) {
    //     $('#iframeAudio').remove();
    // }

    init();
})(window)
