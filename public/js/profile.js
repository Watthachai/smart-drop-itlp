const logOut = document.getElementById('logOut');
const mergeAccounts = document.getElementById('mergeAccounts');
const modifyAccount = document.getElementById('modifyAccount');
const displayNameHolder = document.getElementById('displayNameHolder');
const photoHolder = document.getElementById('photoHolder');
const displayphoneNumber = document.getElementById('displayphoneNumber');

const auth = firebase.auth();

logOut.addEventListener('click', () => {
    //signOut() is a built in firebase function responsible for signing a user out
    auth.signOut()
    .then(() => {
        window.location.assign('index.html');
    })
    .catch(error => {
        console.error(error);
    })
})

auth.onAuthStateChanged(user => {
    console.log(user);
    //display the displayName and photoURL of the user on the page
    if(user.displayName)
        displayNameHolder.innerText = user.displayName;
        displayphoneNumber.innerText = user.phoneNumber;
    if(user.photoURL)
        photoHolder.setAttribute('src', user.photoURL);
})

//Go to modification page
modifyAccount.addEventListener('click', () => {
    window.location.assign('edit.html');
});

//Go to merge accounts pag
mergeAccounts.addEventListener('click', () => {
    window.location.assign('merge.html');
});
