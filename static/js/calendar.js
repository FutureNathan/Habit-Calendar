function fillCal(data, year) {

    months = moment.monthsShort();
    //year = 2021
    //data = [[1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1]];
    console.log("type", typeof data);
    console.log("type", typeof data[0][3]);
    console.log("data", data[0][3]);
    var table = document.createElement("TABLE");
    var row = table.insertRow(-1);
    for (var j = 0; j < months.length; j++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = months[j];
        row.appendChild(headerCell);
    }

    for (var k = 1; k <= 31; k++) {
        row = table.insertRow(-1);
        for (var month = 0; month < months.length; month++) {
            var cell = row.insertCell(-1);
            days_in_month = moment([year, month]).daysInMonth();
            if (k <= days_in_month) {
                //cell.innerHTML = "<div class='star'><img class='img-cls' id='star_" + months[month] + "_" + k + "' value = 'true' src = '/static/assets/star_gold.png' ><div class='star-text'>" + k + "</div></div>";
                if(data[k - 1][month] == 9 )
                    cell.innerHTML = "<div class='star'><img class='img-cls' id='star_" + months[month] + "_" + k + "' value = 'true' src = '/static/assets/star_streak.png' ><div class='star-text'>" + k + "</div></div>";                     
                else if (data[k - 1][month] == 1)
                    cell.innerHTML = "<div class='star'><img class='img-cls' id='star_" + months[month] + "_" + k + "' value = 'true' src = '/static/assets/star_gold.png' ><div class='star-text'>" + k + "</div></div>";
                else //(data[k - 1][month] == 0)
                    cell.innerHTML = "<div class='star'><img class='img-cls' id='star_" + months[month] + "_" + k + "' value = 'false' src = '/static/assets/star_dark.png' ><div class='star-text'>" + k + "</div></div>";
            }
        }
    }

    var dvTable = document.getElementById("calender-table");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);

    var elements = document.getElementsByClassName("star");

    var daySelector = function () {
        var id = this.getElementsByClassName('img-cls')[0].id;
        //console.log(id);
        var star_val = document.getElementById(id).getAttribute("value");
        //console.log(star_val);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = monthNames[parseInt(String(today.getMonth() + 1).padStart(2, '0')) - 1]; //January is 0!
        today = 'star_' + mm + '_' + dd;

        console.log("star_id: " + id);
        c_name = document.getElementById('subtitle').innerHTML;
        c_name = c_name.replace(/ /g , '_');
        // console.log("calander_name: " + c_name)

        if (star_val === "true") {
            document.getElementById(id).src = '/static/assets/star_dark.png';
            document.getElementById(id).setAttribute("value", "false");
            updateCalander(c_name, id, "0")
        }
        else {
            document.getElementById(id).src = '/static/assets/star_gold.png';
            document.getElementById(id).setAttribute("value", "true");
            updateCalander(c_name, id, "1")
        }

    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', daySelector, false);
    }

    function updateCalander(name, month_day, value) {
        //updatecalander?name=yolo&monthday=y_Mar_5&value=1
        
        var req = "/updatecalander?name=" + name + "&monthday=" + month_day + "&value=" + value;
        $.get(req, function (data, status) {
            console.log("server Ret:" + data)
            CountTask();
        });
    }


}