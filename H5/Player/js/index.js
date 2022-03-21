window.addEventListener('load', () => {
    let video = document.querySelector('video');
    let control = document.querySelector('#wrap > .control');
    let inner = document.querySelector('#inner');
    let deeppink = document.querySelector('#deeppink');
    let inner2 = document.querySelector('#inner2');
    let deeppink2 = document.querySelector('#deeppink2');
    let start = document.querySelector('.start');
    let stop = document.querySelector('.stop');
    let progress = document.querySelector('#progress');
    video.width = document.documentElement.clientWidth;
    video.height = document.documentElement.clientHeight - control.offsetHeight;

    window.addEventListener('resize', () => {
        if (document.documentElement.clientWidth >= 600) {
            video.width = document.documentElement.clientWidth;
            video.height = document.documentElement.clientHeight - control.offsetHeight;
        }
    });

    player();
    let timer = 0;

    function player() {

        progress.addEventListener('click', evt => {
            addClass(start, "active");
            video.play().then(() => null);
            timer = setInterval(move, 100);
            video.currentTime = video.duration * ((evt.clientX - progress.offsetLeft) / (progress.clientWidth - inner.offsetWidth))
        });

        stop.addEventListener('click', () => {
            removeClass(start, "active");
            video.pause();
            clearInterval(timer);
            inner.style.left = deeppink.style.width = 0 + "px";
            video.currentTime = 0;
        });

        start.addEventListener('click', () => {
            if (video.paused) {
                addClass(start, 'active');
                video.play().then(() => null);
                timer = setInterval(move, 100);
            } else {
                removeClass(start, 'active');
                video.pause();
                clearInterval(timer);
            }
        });

        function move() {
            inner.style.left = deeppink.style.width = deeppink.style.width = (video.currentTime / video.duration) * (progress.clientWidth - inner.offsetWidth) + "px";

        }
    }

    let callback = {
        move: function () {
            deeppink.style.width = this.offsetLeft + 'px';
        }
    };
    let callback2 = {
        move: function () {
            deeppink2.style.width = this.offsetLeft + 'px';
        }
    };

    $.drag(inner, callback);
    $.drag(inner2, callback2);


    function changeTime(time) {
        time = parseInt(time);

        let h = toZero(Math.floor(time / 3600));
        let m = toZero(Math.floor(time % 3600 / 60));
        let s = toZero(Math.round(time % 3600));

        return h + ":" + m + ":" + s;
    }

    function toZero(num) {
        let val = "";
        if (num < 10) {
            val = "0" + num;
        } else {
            val = val + num;
        }
        return val;
    }

    function addClass(node, className) {
        let reg = new RegExp("\\b" + className + "\\b");
        if (!reg.test(node.className)) {
            node.className += (" " + className);
        }
    }

    function removeClass(node, className) {
        if (node.className) {
            let reg = new RegExp("\\b" + className + "\\b");
            let classes = node.className;
            node.className = classes.replace(reg, "");
            if (/^\s*$/g.test(node.className)) {
                node.removeAttribute("class");
            }
        } else {
            node.removeAttribute("class");
        }
    }
});