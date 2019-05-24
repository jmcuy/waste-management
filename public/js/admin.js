function drpdown(opt){
    let label = "Select"
    if(opt == "FN"){
        label = "First Name"
    } else if (opt == "LN") {
        label = "Last Name"
    } else {
        label = "City/Province"
    }
    document.getElementById("drpdown-item").innerHTML = label;
    // location.reload;
}