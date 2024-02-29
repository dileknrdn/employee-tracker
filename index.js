const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connection to the database

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
});

// Initial prompt 
const promptUser = () => { 
    inquirer.prompt({
        type: 'list',
        name: 'begin choices',
        message: 'What would you like to do? (Select on of the following)',
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Update Employee Role', 'View Departments', 'Add Department', 'View Roles', 'Add Role', 'View totalized budget', 'I am finished']
    })
    .then((data) => {
        switch (data['begin choices']) {
            case 'View All Employees':
                viewAllEmp();
                break;
            case 'View All Employees By Department':
                viewAllEmpByDep();
                break;
            case 'View All Employees By Manager':
                viewEmpByMngt();
                break;
            case 'Add Employee':
                addEmp();
                break;
            case 'Update Employee Role':
                updateEmp();
                break;
            case 'View Departments':
                viewDep();
                break;
            case 'Add Department':
                addDep();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View totalized budget':
                addTotalByDep();
                break;
            case 'I am finished':
                console.log('Goodbye');
                break;
        }
    });
}

// Function to view all employees 

const viewAllEmp = () => { 
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, roles.salary AS salary, manager.first_name AS manager,
    department.name AS department 
    connection.query('SELECT * FROM department', function(err, res) {
    ON employee.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = department.id
    LEFT JOIN manager
    ON employee.manager_id = manager.id`, 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
   
        console.table(res);
        promptUser();
    });
}

// Function to view all employees by department

const viewAllEmpByDep = () => { 
    connection.query('SELECT * FROM department', 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        const depChoices = res.map(dep => dep.name);
        inquirer.prompt({
            type: 'list',
            name: 'depChoice',
            message: 'Which department would you like to view?',
            choices: depChoices
        })
        .then((data) => {
            connection.query('SELECT * FROM employee WHERE department_id = (SELECT id FROM department WHERE name = ?)', data.depChoice, function(err, res) {
                if (err) throw err;
                console.table(res);
                promptUser();
            });
        });
    }
    );
}

// Function to view all employees by manager

const viewEmpByMngt = () => {
    connection.query('SELECT * FROM employee WHERE manager_id IS NOT NULL', 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        const mngtChoices = res.map(mngt => mngt.manager_id);
        inquirer.prompt({
            type: 'list',
            name: 'mngtChoice',
            message: 'Which manager would you like to view?',
            choices: mngtChoices
        })
        .then((data) => {
            connection.query('SELECT * FROM employee WHERE manager_id = ?', data.mngtChoice, function(err, res) {
                if (err) throw err;
                console.table(res);
                promptUser();
            });
        });
    }
    );
}

// Function to add an employee

const addEmp = () => {
    connection.query('SELECT * FROM roles', 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        const roleChoices = res.map(role => role.title);
        connection.query('SELECT * FROM employee WHERE manager_id IS NULL', 
        function(err, res, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            const mngtChoices = res.map(mngt => mngt.first_name);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employee\'s first name?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employee\'s last name?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employee\'s role?',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the employee\'s manager?',
                    choices: mngtChoices
                }
            ])
            .then((data) => {
                connection.query('INSERT INTO employee SET ?', {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    role_id: roleChoices.indexOf(data.role) + 1,
                    manager_id: mngtChoices.indexOf(data.manager) + 1
                }, function(err, res) {
                    if (err) throw err;
                    console.log('Employee added');
                    promptUser();
                });
            });
        });
    });
}

// Function to update an employee's role

const updateEmp = () => {
    connection.query('SELECT * FROM employee', 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        const empChoices = res.map(emp => emp.first_name);
        connection.query('SELECT * FROM roles', 
        function(err, res, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            const roleChoices = res.map(role => role.title);
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'empChoice',
                    message: 'Which employee would you like to update?',
                    choices: empChoices
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employee\'s new role?',
                    choices: roleChoices
                }
            ])
            .then((data) => {
                connection.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [roleChoices.indexOf(data.role) + 1, data.empChoice], function(err, res) {
                    if (err) throw err;
                    console.log('Employee updated');
                    promptUser();
                });
            });
        });
    });
}

// Function to view all departments

const viewDep = () => {
    connection.query('SELECT * FROM department', 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(res);
        promptUser();
    });
}

// Function to add a department

const addDep = () => {
    inquirer.prompt({
        type: 'input',
        name: 'depName',
        message: 'What is the name of the department?'
    })
    .then((data) => {
        connection.query('INSERT INTO department SET ?', {
            name: data.depName
        }, function(err, res) {
            if (err) throw err;
            console.log('Department added');
            promptUser();
        });
    });
}

// Function to view all roles

const viewRoles = () => {
    connection.query('SELECT * FROM roles', 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(res);
        promptUser();
    });
}

// Function to add a role

const addRole = () => {
    connection.query('SELECT * FROM department', 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        const depChoices = res.map(dep => dep.name);
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'dep',
                message: 'What department does the role belong to?',
                choices: depChoices
            }
        ])
        .then((data) => {
            connection.query('INSERT INTO roles SET ?', {
                title: data.roleTitle,
                salary: data.salary,
                department_id: depChoices.indexOf(data.dep) + 1
            }, function(err, res) {
                if (err) throw err;
                console.log('Role added');
                promptUser();
            });
        });
    });
}

// Function to view the totalized budget of a department

const addTotalByDep = () => {
    connection.query('SELECT * FROM department', 
    function(err, res, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        const depChoices = res.map(dep => dep.name);
        inquirer.prompt({
            type: 'list',
            name: 'depChoice',
            message: 'Which department would you like to view?',
            choices: depChoices
        })
        .then((data) => {
            connection.query('SELECT SUM(salary) FROM roles WHERE department_id = (SELECT id FROM department WHERE name = ?)', data.depChoice, function(err, res) {
                if (err) throw err;
                console.table(res);
                promptUser();
            });
        });
    });
}

// Connect to the database

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId);
    promptUser();
}
); 


module.exports = connection; 
