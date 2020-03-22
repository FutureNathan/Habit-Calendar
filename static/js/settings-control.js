$.keyboard.keyaction.enter = function( kb ) {
    kb.close( true );
    saveTask()
    return false;     
  };

$.keyboard.keyaction.accept = function( kb ) {
    kb.close( true );
    saveTask()
    return false;    
};

function exitModal(){
    modal.style.display = "none";
}

function saveTask()
{
    data = document.getElementById("save_keyboard").value;
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
        rename_tag = document.getElementById("rename_input");
        new_name   = rename_tag.value;
        new_name   = new_name.replace(/ /g , '_');
        if(new_name !="")
        {
            curr_tasks = calanders;
            id = rename_tag.getAttribute("placeholder");
            id = id.replace(/ /g , '_');

            console.log("---------------")
            console.log("old name:"+ id);
            console.log("new name:"+ new_name);
            console.log(curr_tasks);
            console.log("---------------")

            index = curr_tasks.indexOf(id);
            curr_tasks[index] = new_name;
            console.log(curr_tasks)

            data = JSON.stringify(curr_tasks)
            console.log(data)
            $.post('/update-task-order', data, function (data, status) {
                console.log(data, status);
                var req = "/rename-task?old_name=" + id +"&new_name=" + new_name ;
                $.get(req, function (data, status) {
                    console.log("server Ret:" + data)
                    window.location.replace("/?curr="+ (num_calanders));
                });
                
            });

        }
        else{
            console.log('empty');
        }

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

var rename = document.getElementsByClassName('menu-text');
Array.from(rename).forEach(function(element){
    element.addEventListener("click", renameTask, false);   
});

var rename_modal = document.getElementById("rename");

function exitRenameModal(){
    rename_modal.style.display = "none";
}

function renameTask(){
    rename_modal.style.display = "block";
    var data = this.innerHTML;
    place = document.getElementById('rename_input');
    place_data = place.getAttribute("placeholder");
    place.setAttribute("placeholder", data)
    console.log(place_data)
}

function saveNewName(){
    new_name = document.getElementById('rename_input');
    data =new_name.innerHTML;
    console.log(data)
}

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

var Resetmodal = document.getElementById("reset-modal");
var Resetbtn = document.getElementById("reset-button-modal");

Resetbtn.onclick = function() {
    Resetmodal.style.display = "block";
}

function exitReset(){
    Resetmodal.style.display = "none";
}

function ResetDb(){
    console.log("reset")
    var req = "/reset-db";
    $.get(req, function (data, status) {
        console.log("server Ret:" + data)
        //window.location.replace("/?curr="+ (num_calanders));
        window.location.replace("/?curr="+ (num_calanders));
        window.location.reload(true);
    });
}