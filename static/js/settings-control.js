$.keyboard.keyaction.enter = function( kb ) {
    kb.close( true );
    console.log("enter")
    saveTask()
    return false;     
  };

$.keyboard.keyaction.accept = function( kb ) {
    kb.close( true );
    console.log("accept")
    saveTask()
    return false;    
};
function exitModal(){
    modal.style.display = "none";
}

function saveTask()
{
    data = document.getElementById("keyboard").value;
    if(data !="")
    {
        console.log(data)
        var req = "/create-task?task-name=" + data ;
        $.get(req, function (data, status) {
            console.log("server Ret:" + data)
            window.location.replace("/?curr="+ (num_calanders+1));
        });
    }
    else{
        console.log('empty')
    }

}

var modal = document.getElementById("myModal");
var btn = document.getElementById("new-habit-modal");
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    
    }
}