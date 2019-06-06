const sqlite3 =require("sqlite3").verbose();

const db=new sqlite3.Database(":memory:");
 //1.Create an in memory database with a ‘Classroom’ and ‘Department’ table containing the above relations.
db.serialize(function()
{

  db.run("CREATE TABLE IF NOT EXISTS Classroom ( Building TEXT, Room_Number NUMBER,Capacity NUMBER)");
  db.run("INSERT INTO Classroom VALUES('Packard', 101,500)");
  db.run("INSERT INTO Classroom VALUES('Painter', 514,10)");
  db.run("INSERT INTO Classroom VALUES('Taylor', 3128,70)");
  db.run("INSERT INTO Classroom VALUES('Watson', 100,30)");
  db.run("INSERT INTO Classroom VALUES('Watson', 120,50)");

  //2.Print the room number and building name for those rooms whose capacity is greater than 50.

  db.each("SELECT Room_Number,Building  FROM Classroom where Capacity>50",function(err,row)
  {
     if(err)
     console.log(err);
     console.log(row);
  }   
  );
     
});
db.serialize(function()
{

  db.run("CREATE TABLE IF NOT EXISTS Department ( Dept_Name TEXT, Building Text,Budget NUMBER)");
  db.run("INSERT INTO Department VALUES('Biology', 'Watson',90000)");
  db.run("INSERT INTO Department VALUES('Comp_sci', 'Taylor',100000)");
  db.run("INSERT INTO Department VALUES('Elec.Eng', 'Taylor',85000)");
  db.run("INSERT INTO Department VALUES('Finance', 'Painter',1200000)");
  db.run("INSERT INTO Department VALUES('History', 'Painter',50000)");
  db.run("INSERT INTO Department VALUES('Music', 'Packard',80000)");
  db.run("INSERT INTO Department VALUES('Physics', 'Watson',70000)");

  //3.Print the names of those departments whose budgets are greater than $85,000.

  db.each("SELECT Dept_Name FROM Department where Budget>85000",function(err,row)
{
     if(err)
     console.log(err);
     console.log(row);
  }
  );

  //4.For each department, print the total capacity available.
  
  let depts = {}
  db.each("SELECT DISTINCT Dept_Name, Capacity FROM Department NATURAL JOIN Classroom" , function(err,row){

      if(depts[row.Dept_Name] === undefined)
          depts[row.Dept_Name]=0;

          depts[row.Dept_Name] += row.Capacity;

  },function(err,count){
      let keys = Object.keys(depts);

      for( let i=0; i != keys.length; ++i){
          console.log(keys[i] + ":"+depts[keys[i]]);
      }
  });

});




