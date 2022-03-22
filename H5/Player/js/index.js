window.addEventListener('load', () => {
    let video = document.querySelector('video');
    let control = document.querySelector('#wrap > .control');

    let progress = document.querySelector('#progress');
    let inner = document.querySelector('#inner');
    let deeppink = document.querySelector('#deeppink');

    let start = document.querySelector('.start');
    let stop = document.querySelector('.stop');

    let now = document.querySelector('.now');
    let all = document.querySelector('.all');

    let switchNode = document.querySelector('.switch');
    let switchSpan = document.querySelector('.switch span');

    let progress2 = document.querySelector('#progress2');
    let inner2 = document.querySelector('#inner2');
    let deeppink2 = document.querySelector('#deeppink2');

    let fullScreen = document.querySelector('.full-screen');
    let fullScreenSpan = document.querySelector('.full-screen span');

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
    let flag = 0;
    let isFullScreen = false;

    function player() {

        fullScreen.addEventListener('click', () => {
            if (isFullScreen) {
                removeClass(fullScreenSpan, "active")
                isFullScreen = false
                if (document.exitFullscreen) {
                    document.exitFullscreen().then(() => null);
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                addClass(fullScreenSpan, "active")
                isFullScreen = true
                let docElm = document.documentElement;
                //W3C
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen().then(() => null);
                }
                //FireFox
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                //Chrome等
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
                //IE11
                else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
            }
        });

        inner2.style.left = deeppink2.style.width = progress2.clientWidth - inner2.offsetWidth + "px";
        switchNode.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                removeClass(switchSpan, "active")
                flag = flag === 0 ? 1 : flag;
                video.volume = flag;
                inner2.style.left = deeppink2.style.width = (progress2.clientWidth - inner2.offsetWidth) * flag + "px";
            } else {
                video.muted = true;
                video.volume = 0;
                addClass(switchSpan, "active")
                inner2.style.left = deeppink2.style.width = 0 + "px";
            }
        });

        video.addEventListener("loadeddata", () => {
            all.innerHTML = changeTime(video.duration);
        });

        progress.addEventListener('click', evt => {
            addClass(start, "active");
            video.currentTime = video.duration * ((evt.clientX - progress.offsetLeft) / (progress.clientWidth - inner.offsetWidth))
            video.play().then(() => null);
            timer = setInterval(move, 100);
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
            inner.style.left = deeppink.style.width = (video.currentTime / video.duration) * (progress.clientWidth - inner.offsetWidth) + "px";
            now.innerHTML = changeTime(video.currentTime);
        }
    }

    let callback = {
        move: function () {
            deeppink.style.width = this.offsetLeft + 'px';
            let scale = this.offsetLeft / (progress.clientWidth - inner.offsetWidth);
            video.currentTime = video.duration * scale;
            now.innerHTML = changeTime(video.currentTime);
        }
    };
    let callback2 = {
        move: function () {
            deeppink2.style.width = this.offsetLeft + 'px';
            let scale = this.offsetLeft / (progress2.clientWidth - inner2.offsetWidth);
            flag = scale;
            video.volume = scale;
            if (video.volume === 0) {
                video.muted = true;
                addClass(switchSpan, "active")
            } else {
                removeClass(switchSpan, "active")
                video.muted = false;
            }
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