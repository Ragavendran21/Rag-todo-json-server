# RagTodoJsonServer

This project was done usng Angular 16,Angular Material,Bootstrap 5.3,JSON-SERVER being the major technologies which are used 

Here Basic CRUD operation with Technologies like Anackend but acts as fake backend where the data are stored in db.json inside src folder of the project.Using service we try to add,get,update,delete operation using Angular the form module.

Before running the project please install node,NPM ,Angular CLI in your local machine for this project to run in your local


To Run the project in your local machine after cloning or downloading please follow the following steps :
1. Move to the dowload/cloned path of code base and in command prompt/terminal please type following command
    npm install
2.Open another terminal window with same path and install npm package which acts as fake backend api named JSON_SERVER 
   npm install -g json-server
3.Move to folder containing src of the project folder and again in terminal type the following command at first to run the backend server running 
   npx json-server --watch db.json
4.Open another terminal window without closing the previous terminal window type the following 
   ng serve -o

   Now you will be to view the UI 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
