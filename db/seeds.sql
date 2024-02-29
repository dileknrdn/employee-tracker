INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Accountant', 125000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ledy', 'Sweet', 1, NULL),
       ('Bob', 'Gonzales', 2, 2),     
       ('Hillary', 'Rua', 2, 2),      
       ('Mia', 'Baker', 3, 3),        
       ('Peter', 'Makah', 2, 2),      
       ('Suzie', 'Alisson', 3, 2),    
       ('Leena', 'Love', 1, 2),       
       ('Pete', 'McFall', 3, NULL),   
       ('Marwa', 'Noor', 2, 3),       
       ('Yunis', 'Jonah', 2, 3);      


INSERT INTO manager (first_name, last_name)
SELECT first_name, last_name
FROM employee
WHERE id IN (
    SELECT DISTINCT manager_id
    FROM employee 
    WHERE manager_id IS NOT NULL 
); 
