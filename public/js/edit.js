const mailField = document.getElementById('mail');
const passwordField = document.getElementById('password');
const displayNameField = document.getElementById('displayName');
const photoField = document.getElementById('photo');
const labels = document.getElementsByTagName('label');
const backButton = document.getElementById('back');
const editButton = document.getElementById('edit');
const deleteButton = document.getElementById('delete');
const displayNameHolder = document.getElementById('displayNameHolder');

const auth = firebase.auth();

// Just to print your current user information so you can the changes once done
auth.onAuthStateChanged(user => {
    console.log(user);

    if(user.displayName)
    displayNameHolder.innerHTML = user.displayName;
});

const editInformation = () => {
    const newNameAndPhoto = {
        newDisplayName: displayNameField.value,
    };
    // Holds all the information about the current signed in user
    const user = auth.currentUser;
    changeNameAndPhoto(user, newNameAndPhoto);
}
const changeNameAndPhoto = (user, newNameAndPhoto) => {
    const {newDisplayName} = newNameAndPhoto;
    // Changes displayName and photoURL properties
    if(newDisplayName)
        user.updateProfile({
            displayName: newDisplayName
        })
        .then(() => {
            console.log('Profile Updated Successfully !');
            window.location.href = 'profile.html';
        })
        .catch(error => {
            console.error(error);
        })
    // Changes the displayName only
    else if(newDisplayName)
        user.updateProfile({
            displayName: newDisplayName
        })
        .then(() => {
            console.log('Display Name Updated Successfully !');
            window.location.href = 'profile.html';
        })
        .catch(error => {
            console.error(error);
        })
    //Changes photoURL only
    else if(newPhotoURL)
        user.updateProfile({
            photoURL: newPhotoURL
        })
        .then(() => {
            console.log('PhotoURL Updated Successfully !');
        })
        .catch(error => {
            console.error(error);
        })
}

// Creates credential for the reauthenticationWithCredential function which is a most do
// in order to change critical information such as changing email, password or
// deleting the account
const createCredential = user => {
    const password = prompt('Password:');
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );
    return credential;
}

const changePassword = (user, credential, newPassword) => {
    user.reauthenticateWithCredential(credential)
    .then(() => {
        user.updatePassword(newPassword);
        console.log('Password Updated!');
    })
    .catch(error => {
        console.error(error);
    })
}

const changeEmail = (user, credential, newEmail) => {
    user.reauthenticateWithCredential(credential)
    .then(() => {
        user.updateEmail(newEmail);
        console.log('Email Updated!');
    })
    .catch(error => {
        console.error(error);
    })
}


editButton.addEventListener('click', editInformation);

backButton.addEventListener('click', () => {
    window.location.assign('profile.html');
});

//Animations

displayNameField.addEventListener('focus', () => {
    labels.item(0).className = "focused-field";
});

displayNameField.addEventListener('blur', () => {
    if(!displayNameField.value)
        labels.item(0).className = "unfocused-field";
});
