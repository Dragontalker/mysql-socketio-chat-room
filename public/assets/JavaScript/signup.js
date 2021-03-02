const el_username = document.querySelector('#username');
const el_password = document.querySelector('#password');
const el_password2 = document.querySelector('#passwordConfirm');
const el_second = document.querySelector('#second');
const el_error1 = document.querySelector('#error1');


// this is a function to wrap the POST complexity
// note you must AWAIT this response.
// alternatively use jQuery $.post()
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
    event.preventDefault()
    //fetch the existing username list
    const userList = await fetchJSON('/api/register');

    if ( userList.filter( value => {return value.username === el_username})){
        error1.classList.remove('d-none');
        break;
    } else {

    }

    const newUser = {
        username: el_username.value,
        password: (el_password.value === el_password2.value ? el_password : 
    };

    // let it save the note before we trigger a re-render
    const response = await callUrl( '/api/register', newUser )
    if( response.message ) {
        alert( response.message )
    }

    loadAndDisplayNotes()
}

// async function handleNoteDelete( event, noteId ){
//     event.preventDefault()

//     // prevents the click listener for the list from being called when the button inside of it is clicked
//     if( !confirm('Are you sure you want to delete this?') ) {
//         return
//     }

//     // delete the note
//     const response = await callUrl( `/api/notes/${noteId}`, {}, 'delete' )
//     if( response.message ) {
//         alert( response.message )
//     }

//     if( activeNote.id === noteId ){
//     // oops deleting the actively showing card!
//         activeNote = {}
//         updateActiveCard()
//     }

//     // get and display the cards
//     loadAndDisplayNotes();
// }

// // Sets the activeNote and displays it
// function handleShowNote( event ){
//     event.preventDefault();
//     const id = event.currentTarget.id;
//     console.log( `[handleShowNote] two ways: id='${id}' dataset: `, event.currentTarget.dataset )
//     activeNote = {
//         id,
//         title: event.currentTarget.dataset.title,
//         text: event.currentTarget.dataset.text
//     }
//     updateActiveCard();
// }

// // Sets the activeNote to and empty object and allows the user to enter a new note
// function handleCreateNewNote( event ){
//     event.preventDefault();
//     console.log( '[handleCreateNewNote]', event )

//     activeNote = {}
//     updateActiveCard();
// }

// // if anything typed, we enable the save button
// const handleShowSaveBtn = function ( event ) {
//     console.log( '[handleShowSaveBtn]')
//     // if it's an already-created note, then can't edit!
//     if( activeNote.id || (el_noteTitle.value.trim()==='' && el_noteText.value.trim()==='') ){
//         el_saveNoteBtn.classList.add('d-none')
//     } else {
//         console.log( ' ... showing the save button!' )
//         el_saveNoteBtn.classList.remove('d-none')
//     }
// };

// // Gets notes from the db and renders them to the sidebar
// async function loadAndDisplayNotes(){
//     const notes = await fetch( '/api/notes' ).then( r=>r.json() )

//     const el_noteList = document.querySelector('#noteList');

//     // clear the list
//     el_noteList.innerHTML = '';

//     if( notes.length===0 ){
//         el_noteList.innerHTML = '<li class=\'list-group-item\'><span>No save Notes</span></li>'
//         return
//     }

//     notes.forEach( (note) => {
//         el_noteList.innerHTML += `
//       <li onClick="handleShowNote(event)" id='${note.id}' data-title="${note.title}" data-text="${note.text}" class='list-group-item'><span>${note.title}</span>
//       <small onClick="handleNoteDelete(event,'${note.id}')" class='badge bg-secondary float-right'><i class='fas fa-trash-alt icon-resize-small'></i></small>
//       `
//     });
// }

// // Gets and renders the initial list of notes
// loadAndDisplayNotes();