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