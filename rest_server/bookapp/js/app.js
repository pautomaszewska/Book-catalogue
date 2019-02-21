$(document).ready( function () {

    var callAjax = function (url, data, type, fun) {
        $.ajax({
            url: url,
            data: data,
            type: type,
            dataType: "json"
        }).done(fun)
    };

    var baseUrl = 'http://127.0.0.1:8000/book/';
    var doc = $('.books');

    var showBooks = function (result) {

        for (var i = 0; i < result.length; i++) {
            var title = $('<li></li>').attr('id', result[i].id).addClass('position');

            title.text(result[i].title);

            var del = $('<p>Usuń</p>').addClass('delete');
            title.append(del);

            doc.append(title);

            var description = $('<div></div>');
            doc.append(description);
            description.hide();

            title.on('click',function () {

                    var id = $(this).attr('id');
                    var desc = $(this).next();

                    var bookDetails = function (result) {
                        var bookInfo = $('<p>Autor: ' + result.author + '</p>'
                         + '<p>ISBN: ' + result.isbn + '</p>' + '<p>Wydawca: ' + result.publisher + '</p>'
                         + '<p>Gatunek: ' + result.genre + '</p><br>');

                        desc.html(bookInfo);
                };
                    callAjax((baseUrl + id), {}, "GET", bookDetails);
                     desc.toggle();
            });

            del.on('click',function () {
            var id = $(this).parent().attr('id');
            var deleteBook = function () {
                alert('Usunięto wybraną książkę');
                location.reload(true)
            };
            callAjax((baseUrl + id), {}, "DELETE", deleteBook());
        });
        }
    };

        var submit = $('button');
        var form = $('form');

        submit.on('click', function (event) {
            event.preventDefault()
            var info = {
                title: form.find('#title').val(),
                author: form.find('#author').val(),
                isbn: form.find('#isbn').val(),
                publisher: form.find('#publisher').val(),
                genre: form.find('#genre').val()
            };
            var addBook = function () {
                 alert('Dodano książkę');
                 location.reload(true)
            };
            callAjax(baseUrl, info, "POST", addBook);
        });

        callAjax(baseUrl,{}, 'GET', showBooks);

 });