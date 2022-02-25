/**
 * Validates the user's email address.
 * @param {string} email - The users email address.
 * **/
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
/**
 * @author Jukka-Pekka Lappalainen
 * @param {string} password - The user's password
 * @param {string} confPass - The user's confirmation password.
 * Validates the user password
 * **/
const validLength = (password) => {
    let passwordValidation = true;
    if(password.length <= 8){
        passwordValidation = false;
    }
    return passwordValidation;
}
/**
 * @author Jukka-Pekka Lappalainen
 * @param {string} password - User's password.
 * Checks if the string contains uppercase.
 * **/
function hasUpperCase(password) {
    return(/[A-Z]/.test(password))
}
/**
 * @author Jukka-Pekka Lappalainen
 * @param {string} password - User's password
 * Checks if the string contains special characters.
 * **/
function hasSpecialCharacters(password){
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(password);
}

export {validateEmail, validLength, hasUpperCase, hasSpecialCharacters}