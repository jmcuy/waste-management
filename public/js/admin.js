
function drpdown(opt){
    let label = "Select"
    if(opt == "N"){
        label = "Name"
    } else if(opt == "CP") {
        label = "City/Province"
    }
    document.getElementById("drpdown-item").innerHTML = label;
    // location.reload;
}

function search_results(){
    let field = document.getElementById("drpdown-item").innerHTML
    let data = document.getElementById("search-data").value

    if (data.trim() != ""){
        if (field == 'Name') {
            field = 'name'
        } else if (field == 'City/Province'){
            field = 'address'
        }
        db.ref('items/').once('value').then(function(snapshot) {
            result = []
            snapshot.forEach(function(childsnap){
                console.log(field)
                if (childsnap.child(field).val().toLowerCase().includes(data)){
                    result.push(childsnap)
                }
            })
            console.log('here')
            console.log(result)
            output_result(result)
          });
    }
    console.log(data)
}

function output_result(snap){
    document.getElementById('search-result').style.display ='block'
    document.getElementById('search-item-container').innerHTML = ''
    if (snap.length == 0){
        document.getElementById('search-item-container').innerHTML = 'None'

    } else {
        snap.forEach((data) => {
            let name = data.child('name').val()
            let address = data.child('address').val()
            let status = data.child('status').val()
            // let id = data.child('id')
            document.getElementById('search-item-container').innerHTML += dom_result(name, address, status)
        })
    }
}

function dom_result(name, address, status){
    let a = '<div class="item" id="item1" onclick="view_info(\'' + name +'\')">' +
    '<b>name: ' +  name + '</b><br>' +
    'address: ' + address + '<br>' +
    'status: ' + status + '<br> <hr>'
    return a
       
}
var id = ''

function view_info(name){
    
    $('.overlay').addClass('active');
    document.getElementById('item-expand').style.display = 'block'
    let parent = document.getElementById("view-content1");
    db.ref('items/').once('value').then(function(snapshot) {
        snapshot.forEach(child => {
            if (child.child('name').val() == name ){
                parent.innerHTML = ''
                id = child.child('id').val()
                parent.innerHTML = "name: " + child.child('name').val() + "<br><hr>"
                + "address: " + child.child('address').val() + "<br>" +
                "contact info: "+ child.child('contact').val() + "<br><hr>"
                + "problems:<br>" + child.child('problems').val() + "<br><hr>"
                + "if delayed:<br>" + "weeks delayed: " + child.child('Delay').val()
            }
        })
    })
    
        

}
function close_alert(id){
    
    document.getElementById(id).style = "display:none"
    document.getElementById("view1").style = "display:block"
    document.getElementById("view2").style = "display:none"
    $('.overlay').removeClass('active')
    location.reload()
}

function switch_view(){
    let parent = document.getElementById("view2-items");
    
    db.ref('transactions/').once('value').then(function(snapshot) {
        snapshot.forEach(child => {
            if (child.child('id').val() == id ){
                parent.innerHTML = ''
                parent.innerHTML += "Date: " + child.child('date').val() + "<br>"
                    + "Status: " + child.child('status').val() + "<br>" +
                    "Type of waste: " + child.child('waste').val() + 
                    "<br>Schedule: " +  child.child('schedule').val() + "<hr>"
            }
        })
    })
    document.getElementById("view2").style = "display:block"
    document.getElementById("view1").style = "display:none"
}