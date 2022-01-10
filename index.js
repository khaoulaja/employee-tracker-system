const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

var departments = [];
var roles = [];
var employees =['N/A'] ;
var chooseEmpl=[];

function getDepartments(){
    departments=[];
db.query('select name from department', (err, rows)=>{
        if(err){
            throw err;
        }
        //console.log(rows);
        rows.map(row => departments.push(row.name));
        
      // console.log(departments);
    });
}
function getRoles(){
    roles = [];
db.query('select title from role', (err, rows)=>{
        if(err){
            throw err;
        }
        //console.log(rows);
        rows.map(row => roles.push(row.title));
        //console.log(roles);
    });
}
function getEmployees(){
    // employees = ['N/A'];
    
db.query(`select CONCAT(first_name,' ',last_name) AS name from employee`, (err, rows)=>{
        if(err){
            throw err;
        }
        rows.map(row => employees.push(row.name));
        chooseEmpl=employees.filter(emp=>{return emp !== 'N/A'});
        
    });
    
}
getDepartments();
getRoles();
getEmployees();
//Menu 
const menu = ()=>{
   return inquirer.prompt({
        type : 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [ 'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }).then(({action})=>{
        switch (action) {
            case 'view all departments': allDepartments();
                break;
            case 'view all roles': allRoles();
                break;
            case 'view all employees': allEmployees();
                break;
            case 'add a department': addDepartment();
                break;
            case 'add a role': addRole();
                break;
            case 'add an employee': addEmployee();
                break;
            case 'update an employee role': updateEmployee();
                break;
            
        }
    });
}
const allDepartments = ()=>{
    const sql =`select * from department`;
    db.query(sql, (err, rows)=>{
        if(err){
            console.log(err);
        }
        console.log('======== All Departments ========\n');
        console.table(rows);
        console.log('=================================');
        
        menu();
    });
}
const allRoles = ()=>{
    const sql =`select role.id, title as job_title, department.name as department, salary from role left join department on role.department_id=department.id`;
    db.query(sql, (err, rows)=>{
        if(err){
            console.log(err);
        }
        console.log('========== All Roles ==========\n');
        console.table(rows);
        console.log('===============================');
        
        menu();
    });
}
const allEmployees = ()=>{
    const sql =`select e.id, e.first_name, e.last_name, role.title as job_title, department.name as department, salary,
     CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
     from employee e left join employee m on e.manager_id=m.id 
     left join role on e.role_id=role.id 
     left join department on role.department_id=department.id 
     order by role.id`;

    db.query(sql, (err, rows)=>{
        if(err){
            console.log(err);
        }
        console.log('======== All Employees ========\n');
        console.table(rows);
        console.log('================================ ');
        
        menu();
    });
}
const addDepartment = ()=>{
    
    return inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?(Required)',
        validate: department =>{
            if(department){
                return true;
            }else{
                return false;
            }
        }
    }).then(({departmentName})=>{
        //insert department into db
        const sql =`insert into department (name) values ("${departmentName}")`;
        db.query(sql, (err, result)=>{
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Added ${departmentName}`);
            
            menu();
        });
    });

}
const addRole = ()=>{
    getDepartments();
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?(Required)',
            validate: roleName =>{
                if(roleName){
                    return true;
                }else{
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: roleSal=>{
                if(roleSal){
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to?',
            choices: departments
        }
]).then(({role, salary, department})=>{
        //add new role to db
        const sql =`insert into role (title, salary, department_id) values('${role}', ${salary}, (select id from department where name='${department}'));`;
        db.query(sql, (err, result)=>{
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Added ${role} to the database`);
            menu();
        });
    });

}
const addEmployee = ()=>{
    getRoles();
    // getEmployees();
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?(Required)",
            validate: fstName =>{
                if(fstName){
                    return true;
                }else{
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?(Required)",
            validate: roleName =>{
                if(roleName){
                    return true;
                }else{
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roles            
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: employees
        }
]).then(({firstName, lastName, role, manager})=>{
let sql =`insert into employee (first_name, last_name, role_id, manager_id) values('${firstName}', '${lastName}', (select id from role where title='${role}'),`
        
    db.query(`select id from employee where first_name='${manager.split(" ")[0]}' and last_name='${manager.split(" ")[1]}'`, (err,row)=>{
        if (err) {
            return null;
        }
        else {
        console.log(row);
        //test if a manager was selected
        if(row.length !== 0){
            sql +=`${row[0].id});`;
        } else{
            sql+=`null)`
        }   
            db.query(sql, (err, result)=>{
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Added ${firstName} ${lastName} to the database`);
            employees.push(`${firstName} ${lastName}`);
            chooseEmpl.push(`${firstName} ${lastName}`);
            menu();
        });
        }
    });
       
    });

}
const updateEmployee = ()=>{
    // getEmployees();
    // getRoles();
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: "Which employee's role do you want to update?",
            choices: chooseEmpl
        },
        {
            type: 'list',
            name: 'newRole',
            message: "What is the new role?",
            choices: roles            
        }
]).then(({employee, newRole})=>{

    // get the empoyee's id and then update the role    
    db.query(`select id from employee where first_name='${employee.split(" ")[0]}' and last_name='${employee.split(" ")[1]}'`, (err,row)=>{
        if (err) {
            return null;
        }
        else {
            console.log(row);  
            db.query(`update employee set role_id=(select id from role where title='${newRole}') where id=${row[0].id};`, (err, result)=>{
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Role updated to ${newRole}!`);
            menu();
        });
        }
    });
       
    });

}

menu();

