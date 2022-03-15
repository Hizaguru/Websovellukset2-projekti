# Websovellukset2-projekti

React Api calls:

Posts credentials to the database: 

await axios.post('http://localhost:5000/credentials', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword

            });
Deletes the refreshTOken:

const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

Authenticates the user:

await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });

Creators: Jukka-Pekka Lappalainen & Joona Kamu

1. Clone the repo
2. go to the backend folder with "cd backend" -command
3. write "npm i" in the backend folder
4. Create the database for the user "root" with the password "root" or edit the "database.js" file for the database you've installed.
5. Make sure, you've installed nodemon and write "nodemon Index.js" this should start your database.
6. go to the frontend folder and install depencies with "npm i" command
7. run "npm start" and the project should start.
