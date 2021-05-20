document.getElementById("form")
    .addEventListener("submit", e => {
        e.preventDefault();
        register();    
})

document.getElementById('deregister')
        .addEventListener('click' , deregister)

function register(){
    let username = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;
    let pincode = document.getElementById("pincode").value;
    let covaxin = document.getElementById("covaxin").checked;
    let covishield = document.getElementById("covishield").checked;

    if ( isNaN(age) || (age < 0 || age > 110))
    {
        alert('Enter correct age');
        return;
    }

    if (! /^[0-9]{6}$/.test(pincode))
    {
        alert('Enter correct pincode');
        return;
    }

    if ( !covaxin && !covishield )
    {
        alert('Select atleast one Vaccine type');
        return;
    }
    
    if (! /^[0-9]{10}$/.test(phone))
    {
        alert('Phone number is invalid');
        return;
    }

    let data = {'username':username, 'phone':phone, 'password': password, 'age':age, 'pincode':pincode, 'covaxin':covaxin, 'covishield':covishield}
    fetch('/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {

        if (res.status == 400)
        {
            alert('Username already exists');
            return;
        }

        if (res.status != 200) throw res.status;

        alert('You have successfully registered\nNote: This app only notifies you, you still need to register it via the Cowin portal or Arogyasetu app')
        document.getElementById('form').reset()
    })
    .catch(err => {
        alert('Unable to register. Please try again later')
        console.log('Error in sending information',err)
    })

}

function deregister(){

    var name = prompt('Enter the exact name used during registration')
    var password = prompt('Enter Password')

    fetch(`/deregister/${name}/${password}`)
    .then(res => {

        if (res.status == 404)
            alert('Incorrect Username')

        if (res.status == 401)
            alert('Incorrect Password')

        if (res.status != 200)
            throw 'Cannot to deregister\nError code: '+res.status

        alert('Deregistered Successfully')
    })
    .catch(err => console.log(err))

}