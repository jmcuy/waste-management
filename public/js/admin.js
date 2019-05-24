
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
            
            document.getElementById('search-item-container').innerHTML += dom_result(name, address, status)
        })
    }
}

function dom_result(name, address, status){
    let a = '<div class="item" id="item1">' +
    '<b>name: ' +  name + '</b><br>' +
    'address: ' + address + '<br>' +
    'status: ' + status + '<br> <hr>'
    return a
        
}