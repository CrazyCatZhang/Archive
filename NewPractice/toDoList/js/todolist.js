$(function () {
    load();
    $('#title').on('keydown', function (e) {
        if (e.keyCode === 13) {
            // console.log(typeof $(this).val());
            if ($(this).val() !== '') {
                let local = getData();
                local.push({title: $(this).val(), done: false});
                saveData(local);
                load();
                $(this).val('');
            } else {
                alert('不能输入空白信息');
            }
        }
    });
    $('ol,ul').on('click', 'a', function (e) {
        let data = getData();
        let index = $(this).attr('id');
        data.splice(index, 1);
        saveData(data);
        load();
    });

    $('ol,ul').on('click', 'input', function (e) {
        let data = getData();
        let index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        saveData(data);
        load();
    });

    function getData() {
        let data = localStorage.getItem('todolist');
        if (data !== '') {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    function load() {
        let data = getData();
        $('ol,ul').empty();
        let todoCount = 0;
        let doneCount = 0;
        $.each(data, function (index, element) {
            if (element.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + element.title + "</p> <a href='javascript:;' id=" + index + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + element.title + "</p> <a href='javascript:;' id=" + index + " ></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }

});