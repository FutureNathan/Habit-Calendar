var bar = new ProgressBar.Circle(container, {
    strokeWidth: 15,
    easing: 'easeInOut',
    duration: 100,
    color: '#FFEA82',
    trailColor: '#eee',
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

setInterval(function () {
    i = i + 1
    console.log(-(i / 10));
    bar.animate(-(i / 10));
    bar.setText(i + "/" + 10);

    document.getElementById("bar-text").style.color = "#08CCF6";
    path.setAttribute("stroke", "#08CCF6");

    if (i == 10) {
        i = 0;
        document.getElementById("bar-text").style.color = "#FFC700";
        path.setAttribute("stroke", "#FFC700");
    }
}, 2000);