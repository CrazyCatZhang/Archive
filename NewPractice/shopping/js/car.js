$(function () {
    $('.checkall').change(function () {
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    });
    $('.j-checkbox').change(function () {
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    });
    $('.increment').click(function () {
        let n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);
        let price = $(this).parents('.p-num').siblings('.p-price').html();
        price = price.substring(1);
        $(this).parents('.p-num').siblings('.p-sum').html("￥" + (price * n).toFixed(2));
        getSum();
    });
    $('.decrement').click(function () {
        let n = $(this).siblings('.itxt').val();
        if (parseInt(n) === 1) {
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        let price = $(this).parents('.p-num').siblings('.p-price').html();
        price = price.substring(1);
        $(this).parents('.p-num').siblings('.p-sum').html("￥" + (price * n).toFixed(2));
        getSum();
    });
    $('.itxt').change(function () {
        let n = $(this).val();
        if (isPositiveNum(n)) {
            let price = $(this).parents('.p-num').siblings('.p-price').html();
            price = price.substring(1);
            $(this).parents('.p-num').siblings('.p-sum').html("￥" + (price * n).toFixed(2));
        } else {
            $(this).val(1);
        }
        getSum();
    });

    getSum();

    function getSum() {
        let count = 0;
        let money = 0;
        $('.itxt').each(function (i, ele) {
            if ($(ele).parents('.cart-item').find('.j-checkbox').prop('checked') === true) {
                count += parseInt($(ele).val());
            }
        });
        $(".amount-sum em").text(count);
        $('.p-sum').each(function (i, ele) {
            if ($(ele).parents('.cart-item').find('.j-checkbox').prop('checked') === true) {
                money += parseFloat($(ele).text().substring(1));
            }
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })

    function isPositiveNum(s) {
        let reg = /^[0-9]*[1-9][0-9]*$/;
        return reg.test(s);
    }
});