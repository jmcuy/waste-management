
function show_announcements(db){
    db.ref('announcements/').on('value', function(snapshot){
        let parent1 = document.getElementById("announcements-container");
        let parent2 = document.getElementById("notice-container");
            parent1.innerHTML = "";
            parent2.innerHTML = "";
        snapshot.forEach(function(child){
            if(child.child('type').val() == "announcement"){
                parent1.innerHTML += child.child('desc').val() + "<br>"
                + "<i>posted on " + child.child('date').val() + "</i><br><br>";
                // console.log(child.child('desc'))
            }
            if(child.child('type').val() == "notice"){
                parent2.innerHTML += "<b>DATE:  " + child.child('date').val() + "</b><br>"
                + "TO:  " + child.child('name').val() + "<br>Reason: " + child.child('reason').val() +"<br><i>"
                 + child.child('desc').val() + "</i><br><hr>";
            }  
        });
    });
   
}

$(document).ready(function () {
    show_announcements(db);
});