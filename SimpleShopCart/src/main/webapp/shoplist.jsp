<%@ page contentType="text/html;charset=utf-8" language="java" isELIgnored="false" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>myshop</title>
    <link rel="stylesheet" href="css/shoplist.css" type="text/css">
    <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
</head>
<style type="text/css">
    th, td {
        border-bottom: 1px solid green;
    }

    th {
        background-color: #4CAF50;
        color: white;
    }

    table {
        text-align: center;
    }
</style>

<body style="background-color: #ffffe0" background="img/11.webp">
<h2 style="color: skyblue">:)</h2>

<script type="text/javascript">
    $(function () {
        $("#showbtn").click(function () {
            $.ajax({
                type: "GET",
                url: "${pageContext.request.contextPath}/judgecar",
                async: true,
                success: function (j) {
                    if (j == "购物车为空") {
                        alert("购物车为空")
                    } else {
                        window.location.href = "${pageContext.request.contextPath}/shopcar.jsp"
                    }
                }
            })
        })
    })
</script>
<h1 style="color: white;margin-left: 600px">商品页</h1>
<button id="showbtn" class="showcarbtn">查看购物车</button>
<form action="${pageContext.request.contextPath}/beforeCar" method="post" id="form_">
    <table cellspacing="0" style="  margin-top: 5px ; margin-left: 270px ;border-color: #8bff73">
        <tr>
            <th>序号</th>
            <th>商品名称</th>
            <th>添至购物车</th>
        </tr>

        <c:forEach items="${goodss}" var="goods" varStatus="goodStatus">
            <tr>
                <td>${goodStatus.count}</td>
                <td>${goods.goodsName}</td>
                <td>
                    <input type="checkbox" name="buy" value="${goods.goodsName}" style="margin-left: 30px">
                </td>
            </tr>
        </c:forEach>
    </table>
    <br>

    <input type="button" value="确定" id="btn" class="ensure">
    &nbsp;&nbsp;&nbsp;&nbsp;
    <input type="reset" value="重置" class="reset">

</form>

<script type="text/javascript">
    $(function () {
        $("#btn").click(function () {
            var flag = false;
            var $checkbox = $(":checkbox");
            /*for (var i = 0; i < $checkbox.length; i++) {
                if($checkbox[i].checked){
                    flag = true;
                }
            }*/
            //使用jQuery循环jQuery对象，其实jQuery对象就是一个dom数组
            /*$checkbox.each(function (i , n) {
                if(n.checked){
                    flag = true
                }
            })*/
            $.each($checkbox, function (i, n) {
                if (n.checked) {
                    flag = true;
                }
            })
            if (flag == false) {
                alert("未选择商品")
            } else {
                var $formElement = $("#form_")[0];
                $formElement.submit();
            }
        })
    })
</script>
</body>
</html>
