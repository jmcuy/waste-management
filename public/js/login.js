function login(){

    let id = document.getElementById('user_id').value
    let pass = document.getElementById('user_pass').value
    event.preventDefault()
    console.log(id)
    console.log(pass)
    db.ref('admins/').once('value').then(function(snapshot) {
      snapshot.forEach(child => {
          if (child.child('id').val() == id && child.child('pass').val() == pass){
            db.ref('admins/user1/').update({
              login: true              
            });
            console.log('here')
          }
      })
  })
  
    
}

