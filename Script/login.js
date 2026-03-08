const button = document.getElementById('loginBtn');

button.addEventListener('click', ()=> {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username, password)
    if(username === "admin" && password === "admin123") {
        window.location.assign('./home.html');
    }else{
        alert("log in failed");
        return;
    }

})
