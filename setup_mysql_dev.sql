-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS key_dev_db;
CREATE USER IF NOT EXISTS 'key_dev'@'localhost' IDENTIFIED BY 'key_dev_pwd';
GRANT ALL PRIVILEGES ON `key_dev_db`.* TO 'key_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'key_dev'@'localhost';
FLUSH PRIVILEGES;
