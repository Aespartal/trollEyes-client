miModulo.filter('stringToDate', function () {
    return function (input) {
        if (!input)
            return null;
<<<<<<< HEAD
        var date = moment(input, "DD/MM/YYYY HH:mm");
=======

        var date = moment(input,"DD/MM/YYYY HH:mm");
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        return date.isValid() ? date.toDate() : null;
    };
});

miModulo.filter('clipString', function ($filter) {
    return function (input) {
        if (input == null) {
            return "";
        }
        if (input.length > 200) {
            return input.substr(0, 150).trim() + " ...";
<<<<<<< HEAD
=======

>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        } else {
            return input;
        }
    };
})