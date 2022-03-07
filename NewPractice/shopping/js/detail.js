window.addEventListener('load', function () {
    let preview_img = document.querySelector('.preview_img');
    let mask = document.querySelector('.mask');
    let big = document.querySelector('.big');
    preview_img.addEventListener("mouseover", function () {
        mask.style.display = "block";
        big.style.display = "block";
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener("mousemove", function (event) {
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;
        let maskX = x - mask.offsetWidth / 2;
        let maskY = y - mask.offsetHeight / 2;
        let maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        let bigImg = document.querySelector('.bigImg');
        let bigMax = bigImg.offsetWidth - big.offsetWidth;
        let bigX = maskX * bigMax / maskMax;
        let bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})