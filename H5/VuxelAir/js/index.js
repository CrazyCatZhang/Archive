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
    let dotLis = document.querySelectorAll("#content > .dot > li");
    let team3 = document.querySelector("#content > .list > .team  .team3");
    let team3Ul = document.querySelector("#content > .list > .team .team3 ul");
    let team3Lis = document.querySelectorAll("#content > .list > .team .team3 > ul > li");
    let music = document.querySelector("#head > .headMain .music");
    let audio = document.querySelector("#head > .headMain .music audio");
    let mask = document.querySelector("#mask");
    let line = document.querySelector("#mask .line");
    let surfaces = document.querySelectorAll("#mask div");


    let now = 0;
    let timer = 0;

    //上一屏
    let preIndex = 0;

    //开机动画
    loading();

    function loading() {
        let arr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'team.png', 'greenLine.png'];
        let flag = 0;
        for (let i = 0; i < arr.length; i++) {
            let img = new Image();
            img.src = "../img/" + arr[i];
            img.onload = () => {
                flag++;
                line.style.width = flag / arr.length * 100 + "%";
            }
        }

        line.addEventListener("transitionend", () => {
            if (flag === arr.length) {
                for (let i = 0; i < surfaces.length; i++) {
                    surfaces[i].style.height = "0";
                }
                line.style.display = "none";
            }
        });

        surfaces[0].addEventListener("transitionend", () => {
            mask.remove();
            let promise = audio.play();
            console.log(promise)
            if (promise !== undefined) {
                promise.then(() => {
                    audio.play();
                }).catch(error => {
                    // let context = new AudioContext();
                });
            }
            home3D();
        });
    }

    //音频
    music.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            music.style.background = "url(../img/musicon.gif)";
        } else {
            audio.pause();
            music.style.background = "url(../img/musicoff.gif)";
        }
    });

    //出入场
    let anArr = [
        {
            inAnimations: function () {
                let home1 = document.querySelector("#content > .list > .home .home1");
                let home2 = document.querySelector("#content > .list > .home .home2");
                home1.style.transform = "translateY(0)";
                home2.style.transform = "translateY(0)";
                home1.style.opacity = "1";
                home2.style.opacity = "1";
            },
            outAnimations: function () {
                let home1 = document.querySelector("#content > .list > .home .home1");
                let home2 = document.querySelector("#content > .list > .home .home2");
                home1.style.transform = "translateY(-400px)";
                home2.style.transform = "translateY(100px)";
                home1.style.opacity = "0";
                home2.style.opacity = "0";
            }
        },
        {
            inAnimations: function () {
                let plane1 = document.querySelector("#content  .course .plane1");
                let plane2 = document.querySelector("#content  .course .plane2");
                let plane3 = document.querySelector("#content  .course .plane3");

                plane1.style.transform = "translate(0px,0px)";
                plane2.style.transform = "translate(0px,0px)";
                plane3.style.transform = "translate(0px,0px)";
            },
            outAnimations: function () {
                let plane1 = document.querySelector("#content  .course .plane1");
                let plane2 = document.querySelector("#content  .course .plane2");
                let plane3 = document.querySelector("#content  .course .plane3");

                plane1.style.transform = "translate(-200px,-200px)";
                plane2.style.transform = "translate(-200px,200px)";
                plane3.style.transform = "translate(200px,-200px)";
            }
        },
        {
            inAnimations: function () {
                let pencil1 = document.querySelector("#content  .works .pencil1");
                let pencil2 = document.querySelector("#content  .works .pencil2");
                let pencil3 = document.querySelector("#content  .works .pencil3");

                pencil1.style.transform = "translateY(0px)";
                pencil2.style.transform = "translateY(0px)";
                pencil3.style.transform = "translateY(0px)";
            },
            outAnimations: function () {
                let pencil1 = document.querySelector("#content  .works .pencil1");
                let pencil2 = document.querySelector("#content  .works .pencil2");
                let pencil3 = document.querySelector("#content  .works .pencil3");

                pencil1.style.transform = "translateY(-100px)";
                pencil2.style.transform = "translateY(100px)";
                pencil3.style.transform = "translateY(100px)";
            }
        },
        {
            inAnimations: function () {
                let Rect1 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(1)");
                let Rect2 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(2)");

                Rect1.style.transform = "rotate(0deg)";
                Rect2.style.transform = "rotate(0deg)";
            },
            outAnimations: function () {
                let Rect1 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(1)");
                let Rect2 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(2)");

                Rect1.style.transform = "rotate(45deg)";
                Rect2.style.transform = "rotate(-45deg)";
            }
        },
        {
            inAnimations: function () {
                let Rect1 = document.querySelector("#content > .list > .team .team1");
                let Rect2 = document.querySelector("#content > .list > .team .team2");

                Rect1.style.transform = "translateX(0px)";
                Rect2.style.transform = "translateX(0px)";
            },
            outAnimations: function () {
                let Rect1 = document.querySelector("#content > .list > .team .team1");
                let Rect2 = document.querySelector("#content > .list > .team .team2");

                Rect1.style.transform = "translateX(-200px)";
                Rect2.style.transform = "translateX(200px)";
            }
        },
    ];

    for (let i = 0; i < anArr.length; i++) {
        anArr[i]["outAnimations"]();
    }
    setTimeout(function () {
        anArr[0].inAnimations();
    }, 2000);


    //第五屏气泡效果
    bubble();

    function bubble() {
        let canvas = null;
        let timer1 = 0;
        let timer2 = 0;
        for (let i = 0; i < team3Lis.length; i++) {
            team3Lis[i].addEventListener('mouseenter', () => {
                for (let j = 0; j < team3Lis.length; j++) {
                    team3Lis[j].style.opacity = "0.5";
                }
                team3Lis[i].style.opacity = "1";
                addCanvas();
                canvas.style.left = team3Lis[i].offsetLeft + "px";
            });
        }

        function addCanvas() {
            if (!canvas) {
                canvas = document.createElement("canvas");
                canvas.width = team3Lis[0].offsetWidth;
                canvas.height = team3Lis[0].offsetHeight * 4 / 5;
                team3.addEventListener('mouseleave', () => {
                    for (let i = 0; i < team3Lis.length; i++) {
                        team3Lis[i].style.opacity = "1";
                    }
                    removeCanvas();
                });
                canvas.addEventListener('mouseleave', () => {
                    removeCanvas();
                });
                team3.appendChild(canvas);
                bubbles();
            }
        }

        function bubbles() {
            let ctx = canvas.getContext("2d");
            let arr = [];

            timer1 = setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < arr.length; i++) {
                    arr[i].deg += 10;
                    arr[i].x = arr[i].startX + Math.sin(arr[i].deg * Math.PI / 180) * arr[i].step * 2;
                    arr[i].y = arr[i].startY - (arr[i].deg * Math.PI / 180) * arr[i].step;

                    if (arr[i].y <= 50) {
                        arr.splice(i, 1)
                    }
                }
                for (let i = 0; i < arr.length; i++) {
                    ctx.save();
                    ctx.fillStyle = "rgba(" + arr[i].red + "," + arr[i].green + "," + arr[i].blue + "," + arr[i].alp + ")";
                    ctx.beginPath();
                    ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.restore();
                }
            }, 1000 / 60);

            timer2 = setInterval(() => {
                let r = Math.random() * 6 + 2;
                let x = Math.random() * canvas.width;
                let y = canvas.height - r;
                let red = Math.round(Math.random() * 255);
                let green = Math.round(Math.random() * 255);
                let blue = Math.round(Math.random() * 255);
                let alp = 1;

                let deg = 0;
                let startX = x;
                let startY = y;
                //曲线的运动形式
                let step = Math.random() * 20 + 10;
                arr.push({
                    x: x,
                    y: y,
                    r: r,
                    red: red,
                    green: green,
                    blue: blue,
                    alp: alp,
                    deg: deg,
                    startX: startX,
                    startY: startY,
                    step: step
                })
            }, 50);
        }

        function removeCanvas() {
            canvas.remove();
            canvas = null;
            clearInterval(timer1);
            clearInterval(timer2);
        }
    }

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

    // home3D();

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
        preIndex = now;
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
                preIndex = now;
                move(i);
                now = i;
            });
        }

        for (let i = 0; i < dotLis.length; i++) {
            dotLis[i].addEventListener('click', () => {
                preIndex = now;
                move(i);
                now = i;
            });
        }
    }

    // move(4);

    //动画的核心函数
    function move(i) {
        for (let j = 0; j < upNodes.length; j++) {
            upNodes[j].style.width = "";
        }
        upNodes[i].style.width = "100%";
        arrowElement.style.left = liNodes[i].offsetLeft + liNodes[i].offsetWidth / 2 - arrowElement.offsetWidth / 2 + "px";
        cList.style.top = -i * (document.documentElement.clientHeight - head.offsetHeight) + "px";
        for (let j = 0; j < dotLis.length; j++) {
            dotLis[j].className = "";
        }
        dotLis[i].className = "active";

        //出入场
        if (anArr[preIndex] && typeof anArr[preIndex]["outAnimations"] === "function") {
            anArr[preIndex]["outAnimations"]();
        }
        if (anArr[i] && typeof anArr[i]["inAnimations"] === "function") {
            anArr[i]["inAnimations"]();
        }
    }


});