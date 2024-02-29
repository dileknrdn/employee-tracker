INSERT INTO department (name)

VALUES ('Sales'), ('Engineering'), ('Legal');

INSERT INTO roles (title, salary, department_id)

VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id, manager_confirm)

VALUES ('Ledy', 'Sweet', 1, null, true),
    ('Bob', 'Gonzales', 2, 1, false),
    ('Hillary', 'Rua', 2, 1, false),
    ('Mia', 'Baker', 3, null, true),
    ('Peter', 'Makah', 4, 2, false),
    ('Suzie', 'Alisson', 4, 2, false),
    ('Leena', 'Love', 4, 2, false),
    ('Pete', 'McFall', 5, null, true),
    ('Marwa', 'Noor', 6, 3, false),
    ('Yunis', 'Jonah', 6, 3, false);
INSERT INTO manager (first_name, last_name)
SELECT first_name,
    last_name
FROM employee
WHERE manager_confirm = 1;