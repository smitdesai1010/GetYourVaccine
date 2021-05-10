document.getElementById("form")
    .addEventListener("submit", e => {
        e.preventDefault();
        register();    
})

document.getElementById('deregister')
        .addEventListener('click' , deregister)

function register(){
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
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

    let data = {'name':name, 'phone':phone, 'age':age, 'pincode':pincode, 'covaxin':covaxin, 'covishield':covishield}

    fetch('/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(txt => {
        console.log(txt)
        document.getElementById('form').reset()
    })
    .catch(err => console.log('Error in sending information',err))

}

function deregister(){

    var name = prompt('Enter the exact name used during registration)')

    fetch(`/deregister/${name}`)
    .then(res => {
        if (res.status != 200)
            throw 'Cannot send information to deregister'+res.status

        return res.text()
    })
    .then(text => console.log(text))
    .catch(err => console.log(err))

}