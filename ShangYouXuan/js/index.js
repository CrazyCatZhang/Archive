window.onload = function () {
    let bigImgIndex = 0

    function navPathDataBind() {
        const navPath = document.getElementById('navPath')
        const path = goodData.path

        for (let i = 0; i < path.length; i++) {
            if (path.length - 1 === i) {
                const aNode = document.createElement('a')
                aNode.innerText = path[i].title
                navPath.appendChild(aNode)
            } else {
                const aNode = document.createElement('a')
                aNode.innerText = path[i].title
                aNode.href = path[i].url

                const iNode = document.createElement('i')
                iNode.innerText = '/'

                navPath.appendChild(aNode)
                navPath.appendChild(iNode)
            }
        }
    }

    navPathDataBind()

    function bigClassBind() {
        const smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
        const leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop')
        const imagesSrc = goodData.imagesSrc

        smallPic.onmouseenter = function () {
            const maskDiv = document.createElement('div')
            maskDiv.className = 'mask'

            const BigPic = document.createElement('div')
            BigPic.id = "bigPic"

            const BigImg = document.createElement('img')
            BigImg.src = imagesSrc[bigImgIndex].b

            BigPic.appendChild(BigImg)
            smallPic.appendChild(maskDiv)
            leftTop.appendChild(BigPic)

            smallPic.onmousemove = function (event) {
                let left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2
                let top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2

                if (left < 0) {
                    left = 0;
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }

                if (top < 0) {
                    top = 0;
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight;
                }

                maskDiv.style.left = left + 'px'
                maskDiv.style.top = top + 'px'

                const scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth)
                BigImg.style.left = -left / scale + "px"
                BigImg.style.top = -top / scale + "px"
            }

            smallPic.onmouseleave = function () {
                smallPic.removeChild(maskDiv)
                leftTop.removeChild(BigPic)
            }
        }
    }

    bigClassBind()

    function thumbnailData() {
        const ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
        const imagesSrc = goodData.imagesSrc

        for (let i = 0; i < imagesSrc.length; i++) {
            const newLi = document.createElement('li')

            const newImg = document.createElement('img')
            newImg.src = imagesSrc[i].s

            newLi.appendChild(newImg)

            ul.appendChild(newLi)
        }
    }

    thumbnailData()

    function thumbnailClick() {
        const liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');

        const smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');

        const imagesSrc = goodData.imagesSrc;

        smallPic_img.src = imagesSrc[0].s

        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].onclick = function () {
                bigImgIndex = i
                smallPic_img.src = imagesSrc[i].s
            }
        }
    }

    thumbnailClick()
}