function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var mousedownid = null;
var blockMenuHeaderScroll = false;
var rendering = false;

function mouseDown(element) {

    blockMenuHeaderScroll = true;
    var evt = window.event || arguments.callee.caller.arguments[0];
    mousedownid = element.id;
    //$("#log").html(evt.type + " - " + element.id + "<br>" + $("#log").html());
    evt.stopImmediatePropagation();
}

function mouseUp(element) {
    //console.log("mouseup" + element.id);
    var evt = window.event || arguments.callee.caller.arguments[0];


    try { // statements to try
        if (evt.type == "touchend") {

            event.preventDefault();
            event.stopPropagation();
            var changedTouch = evt.changedTouches[0];
            element = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
        }
    }
    catch (e) {
        $("#log").html(e.message + "<br>" + $("#log").html());
    }
    //$("#log").html(evt.type + " - " + element.id + "<br>" + $("#log").html());
    var array = [];
    //alert(mousedownid);
    if (mousedownid.length == 5) {
        array.push(mousedownid.substring(0, 2));
        array.push(mousedownid.substring(3, 5));
    } else {
        array.push(mousedownid);
    }

    if (element.id.length == 5) {
        array.push(element.id.substring(0, 2));
        array.push(element.id.substring(3, 5));
    } else {
        array.push(element.id);
    }
    array.sort(function (a, b) { return a - b });

    var unselect = $('#' + array[0]).hasClass("selected");
    var minid = parseInt(array[0]);
    var maxid = parseInt(array[array.length - 1]);

    while (minid <= maxid) {
        $("#" + minid).removeClass(unselect ? "selected" : "notselected");
        $("#" + minid).addClass(unselect ? "notselected" : "selected");
        minid++;
    }

    $(".tempselected").removeClass("tempselected");

    blockMenuHeaderScroll = false;
    mousedownid = null;

}

function onMove(evt) {

    //$("#log").html(mousedownid + "<br>" + $("#log").html());
    if (mousedownid != null) {

        var element = document.elementFromPoint(evt.clientX, evt.clientY);
        if (evt.type == "touchmove") {

            var changedTouch = evt.changedTouches[0];
            element = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
        }
        var array = [];
        //alert(mousedownid);
        if (mousedownid.length == 5) {
            array.push(mousedownid.substring(0, 2));
            array.push(mousedownid.substring(3, 5));
        } else {
            array.push(mousedownid);
        }

        if (element.id.length == 5) {
            array.push(element.id.substring(0, 2));
            array.push(element.id.substring(3, 5));
        } else {
            array.push(element.id);
        }
        array.sort(function (a, b) { return a - b });

        var unselect = $('#' + array[0]).hasClass("selected");
        var minid = parseInt(array[0]);
        var maxid = parseInt(array[array.length - 1]);

        while (minid <= maxid) {
            //$("#log").html(minid + "<br>" + $("#log").html());
            $("#" + minid).removeClass(unselect ? "tempselected" : "tempnotselected");
            $("#" + minid).addClass(unselect ? "tempnotselected" : "tempselected");
            minid++;
        }
    }

}

$(window).on('touchmove', function (e) {
    //$("#log").html(blockMenuHeaderScroll + "<br>" + $("#log").html());
    if (blockMenuHeaderScroll) {
        e.preventDefault();
        if (!rendering) {
            onMove(e);
        }
    }
});


$(window).on('mousemove', function (e) {
    //$("#log").html("i like to move it move it" + "<br>" + $("#log").html());
    if (!rendering) {
        onMove(e);
    }
});