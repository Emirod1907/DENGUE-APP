CREATE DATABASE DENGUE;

use DENGUE;

CREATE table usuarios(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR (50) NOT NULL,
    password VARCHAR (50) NOT NULL
);
	
CREATE table pacientes(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (50) NOT NULL,
    apellido VARCHAR (50) NOT NULL,
    direccion VARCHAR (50) NOT NULL,
    departamento VARCHAR (50) NOT NULL,
    edad INT (3),
    genero VARCHAR (50) NOT NULL,
    criticidad ENUM('GRAVE','MEDIO','LEVE'),
    id_usuarios INT(6) unsigned,  FOREIGN KEY (id_usuarios) references usuarios(id)
);

SHOW TABLES

