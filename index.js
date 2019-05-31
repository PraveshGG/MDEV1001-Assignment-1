//first create .gitignore file and add node_modules in the first line
// initialize NPM with command "npm init"
// now install sqlite, for each project you need to install separately with command "npm install --save-dev sqlite3"
//then create index.js file and do the following...

//import sqlite3 module and set the execution mode to verbose
const sqlite3 = require("sqlite3").verbose();

//creating immutable database object
const db = new sqlite3.Database(":memory:");

/* 
            Classroom relation:
            |    Building  |    Room_number  |   Capacity
            |    Packard   |    101          |   500
            |    Painter   |    514          |   10
            |    Taylor    |    3128         |   70
            |    Watson    |    100          |   30
            |    Watson    |    120          |   50

            Department relation:
            |    Dept_name  |   Building  |   Budget
            |    Biology    |   Watson    |   90000
            |    Comp. Sci. |   Taylor    |   100000
            |    Elec. Eng. |   Taylor    |   85000
            |    Finance    |   Painter   |   120000
            |    History    |   Painter   |   50000
            |    Music      |   Packard   |   80000
            |    Physics    |   Watson    |   70000

*/


//serialize mode  makes the execution structure to be one statement at a time...
db.serialize(function()
{

/* 
    1. Create an in memory database with a ‘Classroom’ and ‘Department’ table containing the above
        relations.
 */

    //creating a table called Classroom with followings params
    db.run ("CREATE TABLE Classroom (Building TEXT, Room_number NUMBER, Capacity NUMBER)");

    //inserting  values into the table.
    db.run("INSERT INTO Classroom VALUES('Packard', 101, 500)");
    db.run("INSERT INTO Classroom VALUES('Painter', 514, 10)");
    db.run("INSERT INTO Classroom VALUES('Taylor', 3128, 70)");
    db.run("INSERT INTO Classroom VALUES('Watson', 100, 30)");
    db.run("INSERT INTO Classroom VALUES('Watson', 120, 50)");

    //selecting all values from the classroom table and printing with console.log
    db.each("SELECT * FROM Classroom", function(err, row)
    {
        //console.log(row);
    });

    //creating another table called Department
    db.run("CREATE TABLE Department (Dept_name TEXT, Building TEXT, Budget NUMBER)");
    db.run("INSERT INTO Department VALUES('Biology','Watson' ,90000)");
    db.run("INSERT INTO Department VALUES('Comp. Sci.','Taylor' ,100000)");
    db.run("INSERT INTO Department VALUES('Elec. Eng.','Taylor' ,85000)");
    db.run("INSERT INTO Department VALUES('Finance','Painter' ,120000)");
    db.run("INSERT INTO Department VALUES('History','Painter' ,50000)");
    db.run("INSERT INTO Department VALUES('Music','Packard' ,80000)");
    db.run("INSERT INTO Department VALUES('Physics','Watson', 70000)");

    //selecting all values from the department table and printing with console.log
    db.each("SELECT * FROM Department", function(err, row)
    {
    //    console.log(row);
    });


    //  2. Print the room number and building name for those rooms whose capacity is greater than 50.
    db.each("SELECT Room_number, Building FROM Classroom WHERE Capacity > 50", function(err, row)
    {   
    //    console.log(row);
    });


    //  3. Print the names of those departments whose budgets are greater than $85,000.
    db.each("SELECT Dept_name FROM Department WHERE Budget > 85000", function(err, row)
    {
        //console.log(row);
    });

    //  4. For each department, print the total capacity available.

    //creating empy department object..
    let department = {};
    // table NATURAL JOIN table will merge two tables 
    db.each("SELECT * FROM Department NATURAL JOIN Classroom",
        function(err,row){
           if(department[row.Dept_name] === undefined)
                department[row.Dept_name] = 0;
                department[row.Dept_name] += row.Capacity;
        },
        function(err,count){
            //Object.Keys() returns array of  properties of given object
            let keys = Object.keys(department);

            //keys.length = 7 and keys[i] has department_name and department object holds capacity values
            for(let i = 0; i != keys.length; ++i){
                  //console.log(keys[i] + ": "+department[keys[i]]);
            }
        }
    );
});

//Always close the database connection
//db.close();