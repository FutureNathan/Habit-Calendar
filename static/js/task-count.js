var bar = new ProgressBar.Circle(container, {
    strokeWidth: 15,
    easing: 'easeInOut',
    duration: 100,
    color: '#FFEA82',
    trailColor: '#334A52',
    trailWidth: 15,
    svgStyle: null
});
//bar.animate(.6);
bar.setText("");

i = 0
var line = new ProgressBar.Line('#container');
var path = document.querySelector('#container > svg > path:last-child');

document.querySelector(".progressbar-text").setAttribute("id", "bar-text");
document.getElementById("bar-text").style.color = "#08CCF6";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];


function CountTask(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = monthNames[parseInt(String(today.getMonth() + 1).padStart(2, '0')) - 1];

    day_id = "star_"+ mm + "_" + dd
    // console.log("counting", day_id)
    // console.log(calanders)

    var req = "/get-completion?month=" + mm +"&day=" + dd;
    $.get(req, function (data, status) {
        total = data["total"];
        complete  = data['complete'];
        incomlete = data['incomplete'];

        complete = parseInt(complete)
        total    = parseInt(total);

        // console.log(total, complete, incomlete)

        bar.animate(-(complete/total))
        bar.setText(complete + "/" + total)
        document.getElementById("bar-text").style.color = "#08CCF6";
        path.setAttribute("stroke", "#08CCF6");
        if(complete === total)
        {
            document.getElementById("bar-text").style.color = "#FFC700";
            path.setAttribute("stroke", "#FFC700");

            document.getElementById(day_id).src = '/static/assets/star_streak.png';
            document.getElementById(day_id).setAttribute("value", "true");
            
            setTimeout(function() {
                
                var req = "/updatestreak?monthday=" + day_id;
                $.get(req, function (data, status) {
                });

            }, 1000)
            

                
        }
        // window.location.replace("/?curr="+ (num_calanders-1));
    });
};


setInterval(function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = monthNames[parseInt(String(today.getMonth() + 1).padStart(2, '0')) - 1];

    var req = "/get-completion?month=" + mm +"&day=" + dd;
    $.get(req, function (data, status) {
        total = data["total"];
        complete  = data['complete'];
        incomlete = data['incomplete'];

        complete = parseInt(complete)
        total    = parseInt(total);

        // console.log(total, complete, incomlete)

        bar.animate(-(complete/total))
        bar.setText(complete + "/" + total)
        document.getElementById("bar-text").style.color = "#08CCF6";
        path.setAttribute("stroke", "#08CCF6");
        if(complete === total)
        {
            document.getElementById("bar-text").style.color = "#FFC700";
            path.setAttribute("stroke", "#FFC700");
        }
        // window.location.replace("/?curr="+ (num_calanders-1));
    });
}, 300000);