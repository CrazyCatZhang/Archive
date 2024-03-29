window.addEventListener('load', function () {
    let arrow_l = document.querySelector('.arrow-l');
    let arrow_r = document.querySelector('.arrow-r');
    let focus = document.querySelector('.focus');
    let focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    });

    let ul = focus.querySelector('ul');
    let ol = focus.querySelector('.circle');
    let num = 0;
    let circle = 0;
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('index', i.toString());
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            let index = parseInt(this.getAttribute('index'));
            num = index;
            circle = index;
            animate(ul, -index * focusWidth, function () {

            });
        })
    }
    ol.children[0].className = 'current';
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    let flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num === ul.children.length - 1) {
                ul.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            })
            circle++;
            if (circle === ul.children.length - 1) {
                circle = 0;
            }
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num === 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            })
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });

    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    let timer = setInterval(function () {
        arrow_r.click();
    }, 2000);
});