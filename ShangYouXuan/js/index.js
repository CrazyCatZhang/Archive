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

    function thumbnailArrowsClick() {
        const prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev')
        const next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next')

        const ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')

        const liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li')

        let start = 0

        const step = (liNodes[0].offsetWidth + 20) * 2
        const endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20)

        prev.onclick = function () {
            start -= step
            if (start < 0) {
                start = 0
            }
            ul.style.left = -start + "px"
        }

        next.onclick = function () {
            start += step
            if (start > endPosition) {
                start = endPosition
            }
            ul.style.left = -start + "px"
        }
    }

    thumbnailArrowsClick()

    function rightTopData() {
        const rightTop = document.querySelector('#wrapper #content .contentMain #center .right .rightTop')
        const goodsDetail = goodData.goodsDetail

        rightTop.innerHTML = `<h3>${goodsDetail.title}</h3>
                <p>${goodsDetail.recommend}</p>
                <div class="priceWrap">
                    <div class="priceTop">
                        <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                        <div class="price">
                            <span>￥</span>
                            <p>${goodsDetail.price}</p>
                            <i>降价通知</i>
                        </div>
                        <p>
                            <span>累计评价</span>
                            <span>${goodsDetail.evaluateNum}</span>
                        </p>
                    </div>
                    <div class="priceBottom">
                        <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                        <p>
                            <span>${goodsDetail.promoteSales.type}</span>
                            <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                    </div>
                </div>
                <div class="support">
                    <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                    <p>${goodsDetail.support}</p>
                </div>
                <div class="address">
                    <span>配&nbsp;送&nbsp;至</span>
                    <p>${goodsDetail.address}</p>
                </div>`
    }

    rightTopData()

    function rightBottomData() {
        const chooseWrap = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap')
        const crumbData = goodData.goodsDetail.crumbData

        for (let i = 0; i < crumbData.length; i++) {
            const dlNode = document.createElement('dl')
            const dtNode = document.createElement('dt')
            dtNode.innerText = crumbData[i].title

            dlNode.appendChild(dtNode)

            for (let j = 0; j < crumbData[i].data.length; j++) {
                const ddNode = document.createElement('dd')
                ddNode.innerText = crumbData[i].data[j].type
                ddNode.setAttribute('price', crumbData[i].data[j].changePrice)

                dlNode.appendChild(ddNode)
            }

            chooseWrap.appendChild(dlNode)
        }
    }

    rightBottomData()

    function clickDDBind() {
        const dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap dl')
        const choose = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .choose')
        const arr = new Array(dlNodes.length).fill(0)

        for (let i = 0; i < dlNodes.length; i++) {
            const ddNodes = dlNodes[i].querySelectorAll('dd')
            for (let j = 0; j < ddNodes.length; j++) {
                ddNodes[j].onclick = function () {

                    choose.innerHTML = ''

                    for (let k = 0; k < ddNodes.length; k++) {
                        ddNodes[k].style.color = "#666"
                    }

                    this.style.color = "red"

                    arr[i] = this
                    changePrice(arr)

                    arr.forEach(value => {
                        if (value) {
                            //创建div元素
                            const markDiv = document.createElement('div')
                            //并且设置class属性
                            markDiv.className = 'mark'
                            //并且设置值
                            markDiv.innerText = value.innerText
                            //创建a元素
                            const aNode = document.createElement('a')
                            //并且设置值
                            aNode.innerText = 'X'
                            //让div追加a 
                            markDiv.appendChild(aNode)

                            //让choose元素追加div
                            choose.appendChild(markDiv)
                        }
                    })

                    const aNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .choose .mark a')

                    for (let k = 0; k < aNodes.length; k++) {
                        aNodes[k].onclick = function () {

                            arr[k] = 0
                            changePrice(arr)

                            const ddList = dlNodes[k].querySelectorAll('dd')
                            for (let l = 0; l < ddList.length; l++) {
                                ddList[l].style.color = '#666'
                            }
                            ddList[0].style.color = 'red'

                            choose.removeChild(this.parentNode)
                        }
                    }
                }
            }
        }
    }

    clickDDBind()

    function changePrice(arr) {
        const oldPrice = document.querySelector('#wrapper #content .contentMain #center .right .rightTop .priceWrap .priceTop .price p')
        let price = goodData.goodsDetail.price

        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                const changePrice = Number(arr[i].getAttribute('price'))
                price += changePrice
            }
        }

        oldPrice.innerText = price

        const leftPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p')

        leftPrice.innerText = '¥' + price

        const ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input')

        const newPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i')

        for (let j = 0; j < ipts.length; j++) {
            if (ipts[j].checked) {
                price += Number(ipts[j].value);
            }
        }

        newPrice.innerText = '¥' + price;
    }

    function choosePrice() {
        const ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input')
        const leftPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p')
        const newPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i')

        for (let i = 0; i < ipts.length; i++) {
            ipts[i].onclick = function () {
                let oldPrice = Number(leftPrice.innerText.slice(1));
                for (let j = 0; j < ipts.length; j++) {
                    if (ipts[j].checked) {
                        oldPrice = oldPrice + Number(ipts[j].value);
                    }
                }

                newPrice.innerText = '¥' + oldPrice;
            }
        }
    }

    choosePrice()


    function TAB(tabBtns, tabConts) {
        for (let i = 0; i < tabBtns.length; i++) {
            tabBtns[i].addEventListener('click', function () {
                for (let j = 0; j < tabBtns.length; j++) {
                    tabBtns[j].className = ''
                    tabConts[j].className = ''
                }
                this.className = 'active'
                tabConts[i].className = 'active'
            })
        }
    }

    function leftTab() {
        const h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4')
        const divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideContent>div')
        TAB(h4s, divs)
    }

    leftTab()

    function rightTab() {
        const lis = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li')
        const divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div')

        TAB(lis, divs)
    }

    rightTab()

    function rightAsideBind() {
        const btns = document.querySelector('#wrapper .rightAside .btns')

        let flag = true

        const rightAside = document.querySelector('#wrapper .rightAside')

        btns.onclick = function () {
            if (flag) {
                btns.className = "btns btnsOpen"

                rightAside.className = "rightAside asideOpen"

            } else {
                btns.className = "btns btnsClose"

                rightAside.className = "rightAside asideClose"
            }

            flag = !flag
        }
    }

    rightAsideBind()
}