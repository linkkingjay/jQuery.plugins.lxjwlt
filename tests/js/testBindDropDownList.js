$(document).ready(function () {
    $('#dropDownButton').bindDropDownList({
        start: function () {
            console.log('start drop down');
        },
        stop: function () {
            console.log('stop drop down');
        }
    });
});
