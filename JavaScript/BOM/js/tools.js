function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }
}

function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timers);
    let current = parseInt(getStyle(obj, attr));
    if (current > target) {
        speed = -speed;
    }
    obj.timers = setInterval(function () {
        let oldValue = parseInt(getStyle(obj, attr));
        let newValue = oldValue + speed;
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        obj.style[attr] = newValue + 'px';
        if (newValue === target) {
            clearInterval(obj.timers);
            callback && callback();
        }
    }, 30);
}

function hasClass(obj, cn) {
    let reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}

function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}

function removeClass(obj, cn) {
    let reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}

function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}