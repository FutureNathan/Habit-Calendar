function fillCal(data, year) {

    months = moment.monthsShort();
    //year = 2021
    //data = [[1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1]];

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
                if (data[k - 1][month] == 1)
                    cell.innerHTML = "<div class='star'><img class='img-cls' id='star_" + months[month] + "_" + k + "' value = 'true' src = '/static/assets/star_gold.png' ><div class='star-text'>" + k + "</div></div>";
                else
                    cell.innerHTML = "<div class='star'><img class='img-cls' id='star_" + months[month] + "_" + k + "' value = 'false' src = '/static/assets/star_white.png' ><div class='star-text'>" + k + "</div></div>";
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

        console.log("today: " + today);


        if (star_val === "true") {
            document.getElementById(id).src = '/static/assets/star_white.png';
            document.getElementById(id).setAttribute("value", "false");
            console.log("no")
        }
        else {
            document.getElementById(id).src = '/static/assets/star_gold.png';
            document.getElementById(id).setAttribute("value", "true");
            console.log("yes")
        }

    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', daySelector, false);
    }


}