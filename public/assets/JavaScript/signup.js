const el_username = document.querySelector('#username');
const el_password = document.querySelector('#password');
const el_password2 = document.querySelector('#passwordConfirm');
const el_second = document.querySelector('#second');
const el_error1 = document.querySelector('#error1');
// const el_avatar = document.querySelector('#avatar');

// make an array of avatar URL paths
let picture = []; //Define array pictures



async function checkUser(event){
    event.preventDefault();
    const checkUser = await fetchJSON (`/api/usercheck/${el_username.value}`);
    console.log(checkUser.code);

    if (checkUser.code === 202){
        console.log('continuging on')
        el_second.classList.remove('d-none')
        showNext();
    } else {
        console.log ('username taken');
        el_error1.classList.remove('d-none');
        return;
    }
}


// this is a function to wrap the POST complexity
// note you must AWAIT this response.
function fetchJSON( url, method='get', data={} ){
    // post requires header, method + data to be sent
    const postUser = {
        headers: { 'Content-Type': 'application/json' },
        method,
    }
    if (method === 'post'){
        postUser.body = JSON.stringify (data)
    }
    return fetch( url, postUser ).then( res=>res.json() )
}



// Get the note data from the inputs, save it to the db and update the view
async function showNext(event){
    console.log( 'next');
    el_second.scrollIntoView();


}

async function register(event) {
    event.preventDefault();
    let newUser = {
        username: el_username.value,
        password: el_password.value,
        // avatar: el_avatar;
    };

    const response = await fetchJSON( '/api/register', 'post', newUser )
    if( response.message ) {
        alert( response.message )
    }
}