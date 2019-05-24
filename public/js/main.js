const config = {
    apiKey: "AIzaSyAspq1LgFi8nx3MODxglDjlNPWRfARVOLc",
    authDomain: "waste-management-db.firebaseapp.com",
    databaseURL: "https://waste-management-db.firebaseio.com",
    projectId: "waste-management-db",
    storageBucket: "waste-management-db.appspot.com",
    messagingSenderId: "1041857566086",
    appId: "1:1041857566086:web:92122680862e9b34"
};
firebase.initializeApp(config);

let db = firebase.database()

function write(db){
    db.ref('admins/').once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            let key = childSnapshot.key;
            // console.log(key)

        });
    });
}
function search_results(){
    document.getElementById("search-result").style.display = "block";
    
}

function Close(){
    document.getElementById("search-result").style.display = "none";
    console.log("got here")
}

function close_supp(){
    document.getElementById("supp-button").style = 'display:block;'
    document.getElementsByClassName("supp-container")[0].style.display = "none";
}

function redirect(path, val=""){
    // window.location = path;
    window.location.href = path + "?" + val;
}


function open_cust(){
    document.getElementsByClassName("supp-container")[0].style.display = "block";
    document.getElementById("supp-button").style = 'display:none;'
    // document.getElementsByClassName("container")[1].firstChild.style.display = "none";
}


$(document).ready(function () {
    
    write(db)
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    db.ref('admins/user1').once('value').then(function(snapshot) {
        if (!snapshot.child('login').val()){
            document.getElementById('for-admin').style.display = 'None'
        }
    })
});