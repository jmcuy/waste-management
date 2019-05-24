$(document).ready(function (){
    $('#filter-container').html("Filter by > <b>No filter selected</b>");
    let i = window.location.href.indexOf("filter=");
    let j = window.location.href.indexOf("$");
    document.getElementById("item-expand").style = "display:none"
    console.log(i + 7,j);
    let title, filter;
    if( j < 0){
        title = window.location.href.substr(i + 7);
    } else {
        title = window.location.href.substr(i + 7,  (j - (i + 7)));
        filter = window.location.href.substr(j+1, window.location.href.lastIndexOf("?")  - (j + 1))
        $('#filter-container').html('Filter by > ' + "<b>" + decodeURI(filter) + "</b");
    }
    
    $('.title').html('Category: ' + "<b>" + decodeURI(title) + "</b>");
    
    let end = window.location.href.lastIndexOf("?")
    if(end <= i){
        sort_items(decodeURI(title), filter="")    
    } else {
        sort_items(decodeURI(title), window.location.href.substr(end + 1 ))
    }
    
});

function sort_items(cat,filter){
    
    db.ref('items/').once("value", function(snapshot){
        console.log("sort")
        console.log(cat, filter)
        let parent = document.getElementById("items-container")
        let size = snapshot.numChildren()
        snapshot.forEach(function(child){
            if(Number.isNaN(filter) || filter == ""){
                console.log("no filter")
                if(cat.toLowerCase() == child.child('category').val()){
                    let item_id = child.child('id').val()
                    let item = document.createElement("div")
                    item.className = "item";
                    item.id = item_id

                    let status = ""
                    if(child.child('status').val() == "okay"){
                        status +=  '<div class="bar" style="display:inline-block;width:20px;background:green;text-align:center">&nbsp</div> /okay'
                    } 
                    if(child.child('status').val() == "waiting"){
                        status +=  '<div class="bar" style="display:inline-block;width:20px;background:yellow;text-align:center">&nbsp</div> /waiting'
                    }
                    if(child.child('status').val() == "delayed"){
                        status += '<div class="bar" style="display:inline-block;width:20px;background:red;text-align:center">&nbsp</div> /delayed'
                    }
                    
                    item.innerHTML = "name: " + child.child("name").val() + "<br><hr>"
                    + "address: " + child.child("address").val() + "<br>" + "status: " + status;

                    item.setAttribute("value","inactive")
                    let warn_button = document.createElement("div");
                    warn_button.className = "warn"
                   
                    item.addEventListener("click", function(){
                        expand(item_id)
                    });

                    if(child.child('notified').val() == "false"){
                        console.log(!child.child('notified').val())
                        warn_button.innerHTML = "WARN"
                        warn_button.addEventListener("click", function(){
                            warn(item_id); 
                        });
                    } else {
                        warn_button.innerHTML = "alerted"
                    }

                    
                    item.appendChild(warn_button)
                    parent.appendChild(item)
                }
            } else {
                let filter2 = child.child('Septic').val()
                if(cat == child.child('category').val() && filter == "NST" && filter2){
                    console.log("NST",child)
                }
                if(cat == child.child('category').val() && filter == "FD2" && child.child('delay') > 0){
                    console.log(child.child('delay').val())
                    console.log("Delayed",child)
                }
                if(cat == child.child('category').val() && filter == "None"){
                    console.log("None",child)
                }
            }
        });
    });
    
}
let warning = false;
function warn(id){
    let val = document.getElementById(id).getAttribute('value');
    if(val != "active"){
        warning = true;           
        $('.overlay').addClass('active');
        db.ref('items/').child(id).update({
            notified: "true"
        });
        document.getElementById("status-report").style.display ="block";        
    }
}
function filter(opt){
    
    let label = opt;
    if(opt == 1){
        label = "No Septic Tank" + "?NST"
    } else if(opt == 2){
        label = "Full Septic Tank" + "?FST"
    } else if(opt == 3){
        label = "Failure to dispose" + "?FD2"
    } else {
        label = "None" + "?Nan"
    }
    let loc = window.location.href 
    if (loc.indexOf('$') >= 0){
        window.location.href =  loc.substr(0,loc.indexOf("$")) + "$" + label;
    } else {
        window.location.href =  loc + "$" + label;
    }
      
}

function expand(id){
    let path = db.ref('items/' + id);
    console.log(path)
    if (!warning){
        $('.overlay').addClass('active');
        document.getElementById("item-expand").style.display = "block"
        
        let parent = document.getElementById("view-content1");
        let parent2 = document.getElementById("view2-items");
        path.once("value", function(snap){
            if(snap.key == id){
                let check = snap.child('problems').val().toLowerCase().indexOf("delay")
                if(check >= 0){
                    console.log(snap.child('Delay').val())
                } else {
                    console.log(check)
                }
                parent.innerHTML = "name: " + snap.child('name').val() + "<br><hr>"
                + "address: " + snap.child('address').val() + "<br>" +
                "contact info: "+ snap.child('contact').val() + "<br><hr>"
                + "problems:<br>" + snap.child('problems').val() + "<br><hr>"
                + "if delayed:<br>" + "weeks delayed: " + snap.child('Delay').val()

                

               
            }  
        }); 

        db.ref('transactions').once("value", function(snapshot){
            parent2.innerHTML = ""
            snapshot.forEach(function(child){
                console.log(child.child('id'))
                if(child.child('id').val() == id){
                    parent2.innerHTML += "Date: " + child.child('date').val() + "<br>"
                    + "Status: " + child.child('status').val() + "<br>" +
                    "Type of waste: " + child.child('waste').val() + 
                    "<br>Schedule: " +  child.child('schedule').val() + "<hr>"
                }
            });
        });
    }   
   warning = false
}
function close_alert(id){
    
    document.getElementById(id).style = "display:none"
    document.getElementById("view1").style = "display:block"
    document.getElementById("view2").style = "display:none"
    $('.overlay').removeClass('active')
    location.reload()
}

function switch_view(){
    document.getElementById("view2").style = "display:block"
    document.getElementById("view1").style = "display:none"
}