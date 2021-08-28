var colorPicker;

function initColor() {
    colorPicker = $("#colorPicker");
}

function changeColor() {
    console.log("changecolor aufgerufen"); 
   // console.log(colorPicker.val());
    $.ajax({
        url: "databaseRequests.php",
        type: "post",
        data: {color: colorPicker.val(), changeColor: true},
    });
}