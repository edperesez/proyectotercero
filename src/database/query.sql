CREATE DATABASE prueba; 

USE prueba;  

CREATE tabla personas(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT null, 
    lastname VARCHAR(50) NOT HULL, 
    age INT 
), 
SELECT * FROM personas;  


CREATE USER 'prueba01 '@' localhost'IDENTIFIED BY 'Prueba01' ; 
GRANT ALL PREVILEGES ON prueba01.* TO 'prueba01'@'localhost';