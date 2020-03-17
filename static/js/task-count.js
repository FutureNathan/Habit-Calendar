function addCount(count, total) {
    i = count;
    if (i < total)
        i = i + 1
    console.log(i)
    p_text = i + "/" + total;

    var bar2 = document.getElementById('prog').ldBar;
    perc = parseFloat(i / total) * 100;
    if (i < total) {
        document.getElementById("prog-text-val").style.color = '#08CCF6';
        document.getElementsByClassName("mainline")[0].setAttribute("stroke", "#08CCF6");
        bar2.set(perc);
        document.getElementsByClassName("prog-text")[0].innerText = p_text;
    }
    if (i == total) {
        bar2.set(perc);
        document.getElementsByClassName("prog-text")[0].innerText = p_text;
        document.getElementById("prog-text-val").style.color = '#FFC700';
        document.getElementsByClassName("mainline")[0].setAttribute("stroke", "#FFC700");
    }

}

function removeCount(count, total) {
    i = count;
    if (i > 0)
        i = i - 1
    console.log(i)
    p_text = i + "/" + total;

    var bar2 = document.getElementById('prog').ldBar;
    perc = parseFloat(i / total) * 100;
    if (i >= 0) {
        bar2.set(perc);
        document.getElementsByClassName("prog-text")[0].innerText = p_text;
        document.getElementById("prog-text-val").style.color = '#08CCF6';
        document.getElementsByClassName("mainline")[0].setAttribute("stroke", "#08CCF6");
    }
}