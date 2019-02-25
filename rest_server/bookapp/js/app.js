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

                        var edit = $('<p>Edytuj</p>').addClass('edit');

                        var editform = $("<label>Tytuł</label>"
                        + "<input type='text' id='title1'>"
                        + "<label>Autor</label>"
                        + "<input type='text' id='author1'>"
                        + "<label>ISBN</label>"
                        + "<input type='number' id='isbn1'>"
                        + "<label>Wydawca</label>"
                        + "<input type='text' id='publisher1'>"
                        + "<label>Gatunek</label>"
                        + "<select id='genre1'>"
                           + "<option value='1'>Romans</option>"
                            + "<option value='2'>Obyczajowa</option>"
                            + "<option value='3'>Sci-fi i fantasy</option>"
                            + "<option value='4'>Literatura faktu</option>"
                            + "<option value='5'>Popularnonaukowa</option>"
                            + "<option value='6'>Poradnik</option>"
                            + "<option value='7'>Kryminał, sensacja</option>"
                        + "</select>"
                        + "<button>Zmień</button>");

                        edit.append(editform);

                        desc.html(bookInfo);
                        desc.append(edit);
                        desc.toggle();


                         $('.edit').find('button').on('click', function (event) {
                              event.preventDefault();
                              var bookinfo = {
                                    title: $('#title1').val(),
                                    author: $('#author1').val(),
                                    isbn: $('#isbn1').val(),
                                    publisher: $('#publisher1').val(),
                                    genre: $('#genre1').val()};
                            var editBook = function () {
                                alert('Dane zostały zmienione');
                                location.reload(true);
                            };
                            callAjax((baseUrl + id), bookinfo, "PUT", editBook);
                         });
                };
                    callAjax((baseUrl + id), {}, "GET", bookDetails);

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
            event.preventDefault();
            var info = {
                title: form.find('#title').val(),
                author: form.find('#author').val(),
                isbn: form.find('#isbn').val(),
                publisher: form.find('#publisher').val(),
                genre: form.find('#genre').val()
            };
            var addBook = function () {
                 alert('Dodano książkę');
                 location.reload(true);
            };
            callAjax(baseUrl, info, "POST", addBook);
        });

        callAjax(baseUrl,{}, 'GET', showBooks);

        $('.header').on('click', function () {
            $(this).next().toggle()
        })
 });

