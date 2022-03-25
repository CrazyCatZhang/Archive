window.addEventListener('load', () => {
    let arrowElement = document.querySelector('#head .headMain > .arrow');
    let liNodes = document.querySelectorAll("#head .headMain > .nav > .list > li");
    let upNodes = document.querySelectorAll("#head .headMain > .nav > .list > li .up");
    let firstNode = liNodes[0];
    let firstUpNode = firstNode.querySelector(".up");
    let head = document.querySelector("#head");
    let content = document.querySelector("#content");
    let cLiNodes = document.querySelectorAll("#content .list > li");
    let cList = document.querySelector("#content .list");
    let home2LiNodes = document.querySelectorAll("#content > .list > .home .home2 > li");
    let home1LiNodes = document.querySelectorAll("#content > .list > .home .home1 > li");
    let home1 = document.querySelector("#content > .list > .home .home1");
    let aboutUls = document.querySelectorAll("#content > .list > .about .about3 > .item > ul");


    let now = 0;
    let timer = 0;

    //第四屏图片炸裂效果
    picBoom();

    function picBoom() {
        for (let i = 0; i < aboutUls.length; i++) {
            change(aboutUls[i]);
        }

        function change(UL) {
            let src = UL.dataset.src;
            let w = UL.offsetWidth / 2;
            let h = UL.offsetHeight / 2;
            for (let i = 0; i < 4; i++) {
                let liNode = document.createElement("li");
                liNode.style.width = w + "px";
                liNode.style.height = h + "px";

                let imgNode = document.createElement("img");
                imgNode.style.left = -(i % 2) * w + "px";
                imgNode.style.top = -Math.floor(i / 2) * h + "px";
                imgNode.src = src;
                liNode.appendChild(imgNode);
                UL.appendChild(liNode);
            }

            UL.addEventListener('mouseenter', function () {
                let imgNodes = this.querySelectorAll("li>img");
                imgNodes[0].style.top = h + "px";
                imgNodes[1].style.left = -2 * w + "px";
                imgNodes[2].style.left = w + "px";
                imgNodes[3].style.top = -2 * h + "px";
            });
            UL.addEventListener('mouseleave', function () {
                let imgNodes = this.querySelectorAll("li>img");
                imgNodes[0].style.top = 0 + "px";
                imgNodes[1].style.left = -w + "px";
                imgNodes[2].style.left = 0 + "px";
                imgNodes[3].style.top = -h + "px";
            });
        }
    }

    //第一屏3D效果
    let oldIndex = 0;
    let timer3D = 0;
    let autoIndex = 0;

    home3D();

    function home3D() {
        for (let i = 0; i < home2LiNodes.length; i++) {
            home2LiNodes[i].addEventListener('click', function () {
                clearInterval(timer3D);
                for (let j = 0; j < home2LiNodes.length; j++) {
                    home2LiNodes[j].classList.remove("active");
                }
                this.classList.add("active");
                if (i > oldIndex) {
                    if (hasClass(home1LiNodes[i], "leftShow")) {
                        removeClass(home1LiNodes[i], "leftShow");
                    } else if (hasClass(home1LiNodes[i], "leftHide")) {
                        removeClass(home1LiNodes[i], "leftHide");
                    } else if (hasClass(home1LiNodes[i], "rightHide")) {
                        removeClass(home1LiNodes[i], "rightHide");
                    }
                    addClass(home1LiNodes[i], "rightShow");

                    if (hasClass(home1LiNodes[oldIndex], "leftShow")) {
                        removeClass(home1LiNodes[oldIndex], "leftShow");
                    } else if (hasClass(home1LiNodes[oldIndex], "rightShow")) {
                        removeClass(home1LiNodes[oldIndex], "rightShow");
                    } else if (hasClass(home1LiNodes[oldIndex], "rightHide")) {
                        removeClass(home1LiNodes[oldIndex], "rightHide");
                    }
                    addClass(home1LiNodes[oldIndex], "leftHide");
                }

                if (i < oldIndex) {
                    if (hasClass(home1LiNodes[i], "rightShow")) {
                        removeClass(home1LiNodes[i], "rightShow");
                    } else if (hasClass(home1LiNodes[i], "leftHide")) {
                        removeClass(home1LiNodes[i], "leftHide");
                    } else if (hasClass(home1LiNodes[i], "rightHide")) {
                        removeClass(home1LiNodes[i], "rightHide");
                    }
                    addClass(home1LiNodes[i], "leftShow");

                    if (hasClass(home1LiNodes[oldIndex], "leftShow")) {
                        removeClass(home1LiNodes[oldIndex], "leftShow");
                    } else if (hasClass(home1LiNodes[oldIndex], "rightShow")) {
                        removeClass(home1LiNodes[oldIndex], "rightShow");
                    } else if (hasClass(home1LiNodes[oldIndex], "leftHide")) {
                        removeClass(home1LiNodes[oldIndex], "leftHide");
                    }
                    addClass(home1LiNodes[oldIndex], "rightHide");
                }
                oldIndex = i;
                autoIndex = oldIndex;
                // move();
            });
        }

        move();

        function move() {
            clearInterval(timer3D);
            timer3D = setInterval(() => {
                autoIndex++;

                if (autoIndex === home1LiNodes.length) {
                    autoIndex = 0;
                }

                for (let i = 0; i < home2LiNodes.length; i++) {
                    home2LiNodes[i].classList.remove("active");
                }
                home2LiNodes[autoIndex].classList.add("active");

                home1LiNodes[autoIndex].classList.remove("leftShow");
                home1LiNodes[autoIndex].classList.remove("leftHide");
                home1LiNodes[autoIndex].classList.remove("rightHide");
                home1LiNodes[autoIndex].classList.add("rightShow");

                home1LiNodes[oldIndex].classList.remove("leftShow");
                home1LiNodes[oldIndex].classList.remove("rightShow");
                home1LiNodes[oldIndex].classList.remove("rightHide");
                home1LiNodes[oldIndex].classList.add("leftHide");

                oldIndex = autoIndex;
            }, 3000);
        }

        home1.addEventListener('mouseenter', () => {
            clearInterval(timer3D);
        });

        home1.addEventListener('mouseleave', () => {
            move();
        });
    }

    //内容区交互
    window.addEventListener("resize", () => {
        contentBind();
        cList.style.top = -now * (document.documentElement.clientHeight - head.offsetHeight) + "px";
        arrowElement.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth / 2 - arrowElement.offsetWidth / 2 + "px";
    });

    content.addEventListener('wheel', evt => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(evt);
        }, 100);
    });

    function fn(evt) {
        let dir = evt.deltaY > 0 ? "down" : "up";
        switch (dir) {
            case "up":
                if (now > 0) {
                    now--;
                    move(now);
                }
                break;
            case "down":
                if (now < cLiNodes.length - 1) {
                    now++;
                    move(now);
                }
                break;
        }
    }

    contentBind();

    function contentBind() {
        content.style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
        for (let i = 0; i < cLiNodes.length; i++) {
            cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
        }
    }

    //头部交互
    headBind();

    function headBind() {
        firstUpNode.style.width = "100%";
        arrowElement.style.left = firstNode.offsetLeft + firstNode.offsetWidth / 2 - arrowElement.offsetWidth / 2 + "px";
        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].addEventListener('click', () => {
                move(i);
                now = i;
            });
        }
    }

    move(3);

    //动画的核心函数
    function move(i) {
        for (let j = 0; j < upNodes.length; j++) {
            upNodes[j].style.width = "";
        }
        upNodes[i].style.width = "100%";
        arrowElement.style.left = liNodes[i].offsetLeft + liNodes[i].offsetWidth / 2 - arrowElement.offsetWidth / 2 + "px";
        cList.style.top = -i * (document.documentElement.clientHeight - head.offsetHeight) + "px";
    }


});