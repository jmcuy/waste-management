
function show_announcements(db){
    db.ref('announcements/').on('value', function(snapshot){
        let parent = document.getElementById("items-container");
        snapshot.forEach(function(child){
          
           
            if(child.child('type').val() == "announcement"){
                let new_child = document.createElement("div");
                new_child.className = "item pad"
                new_child.innerHTML = "<p>" + child.child('desc').val() +
                 "</p>" + "<i>posted on " + child.child('date').val() +
                "</i>"
                let del = document.createElement("div");
                del.className ="post-btn submit-btn"
                del.innerHTML = "Delete" + "<hr>"
                del.addEventListener("click",function(){
                   delete_announcement(child.key)
                });
                // del.value = snapshot.key
                new_child.appendChild(del) 
                parent.appendChild(new_child)   
                
            }          
        });
    });
}
function add_announcement(){
    let desc = document.getElementById("description").value;
    let size;
    db.ref('announcements/').once('value', function(snapshot){
        size = snapshot.numChildren()
    });
    let date = new Date();
    console.log(date)
    db.ref('announcements/' + "nan" + (size + 1)).set({
        date: date.toLocaleDateString(),
        desc: desc,
        type:"announcement"
    });
    location.reload()
}
function delete_announcement(c){
    console.log(c)
    db.ref('announcements/').child(c).remove();
   
    location.reload()
}
$(document).ready(function () {
    show_announcements(db);
});
