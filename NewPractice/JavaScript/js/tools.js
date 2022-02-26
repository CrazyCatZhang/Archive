function getStyle(obj, name) {
    return getComputedStyle(obj, null)[name];
}

function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);
    let current = parseInt(getStyle(obj, attr));
    if (current > target) {
        speed = -speed;
    }
    obj.timer = setInterval(function () {
        let oldValue = parseInt(getStyle(obj, attr));
        let newValue = oldValue + speed;
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        obj.style[attr] = newValue + 'px';
        if (newValue === target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}

function hasClass(obj, cls) {
    let reg = new RegExp('\\b' + cls + '\\b');
    return reg.test(obj.className);
}

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) {
        obj.className += ' ' + cls;
    }
}

function removeClass(obj, cls) {
    let reg = new RegExp('\\b' + cls + '\\b');
    obj.className = obj.className.replace(reg, '');
}

function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}