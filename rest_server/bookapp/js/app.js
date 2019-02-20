$.ajax({
    url: 'http://127.0.0.1:8000/book',
    data: {},
    type: "GET",
    dataType: "json"
}).done(function (result) {
    var doc = $('.books');

    for (var i = 0; i < result.length; i++) {
        // console.log(result[i].author, result[i].title);
        var title = $('<p></p>').attr('id', result[i].id);
        // title.data('id', result[i].id);
        title.text(result[i].title);
        doc.append(title);

        var description = $('<div></div>');
        doc.append(description);
        description.hide();


        title.on('click', function () {
            var id = $(this).attr('id');
            var desc = $(this).next();
            desc.toggle();


            $.ajax({
                url: 'http://127.0.0.1:8000/book/' + id,
                data: {},
                type: "GET",
                dataType: "json"
            }).done(function (result) {

                var bookInfo = $('<p>Autor: ' + result.author + '</p>'
                + '<p>ISBN: ' + result.isbn + '</p>' + '<p>Wydawca: ' + result.publisher + '</p><br>');

                desc.html(bookInfo);
            })
        });


        var form = $('input');
        var submit = $('button');
        var info = {
            title: form.find('[name="title"]'),
            author: form.find('[name="author"]'),
            isbn: form.find('[name="isbn"]'),
            publisher: form.find('[name="title"]')
        };

        $.ajax({
            url: 'http://127.0.0.1:8000/book/',
            data: {},
            type: "POST",
            dataType: "json"
        }).done(function (result) {

        })
    }
})




