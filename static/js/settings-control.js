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

var delbuttons = document.getElementsByClassName("del-btn");

Array.from(delbuttons).forEach(function(element){
      element.addEventListener("click", deleteTask, false);   
});

var change_order = document.getElementsByClassName('menu-img');
Array.from(change_order).forEach(function(element){
    element.addEventListener("click", changeOrder, false);   
});

function changeOrder(){
    var data  = this;
    task_id   = data['id'];
    all_tasks = calanders;
    
    if(task_id !=""){
        num_tasks = all_tasks.length;

        task_index = all_tasks.indexOf(task_id);
        if(task_index != 0)
        {
            temp = all_tasks[task_index-1]
            all_tasks[task_index - 1] = all_tasks[task_index]
            all_tasks[task_index] = temp
            
            console.log(all_tasks);
            //data = {'data': all_tasks}
            data = JSON.stringify(all_tasks)
            console.log(data)
            $.post('/update-task-order', data, function (data, status) {
                console.log(data, status);
                window.location.replace("/?curr="+ (num_calanders));
            });
        }
    }
}


function deleteTask()
{   
    var data = this;
    task_name = data['value'];
    console.log(task_name);
    var req = "/delete-task?task-name=" + task_name ;
    $.get(req, function (data, status) {
        console.log("server Ret:" + data)
        window.location.replace("/?curr="+ (num_calanders-1));
    });
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

function changeDisplayOn(){
    on_time = document.getElementById("disp_on_time").value;
    console.log(on_time);
    var req = "/on_time?on-time=" + on_time ;
    $.get(req, function (data, status) {
        console.log("server Ret:" + data)
        //window.location.replace("/?curr="+ (num_calanders));
    });


}
function changeDisplayOff(){
    off_time = document.getElementById("disp_off_time").value;
    console.log(off_time);
    var req = "/off_time?off-time=" + off_time ;
    $.get(req, function (data, status) {
        console.log("server Ret:" + data)
        //window.location.replace("/?curr="+ (num_calanders));
    });
}