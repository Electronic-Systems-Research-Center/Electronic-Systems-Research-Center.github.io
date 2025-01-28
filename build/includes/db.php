<?php
$host = "localhost";
$dbname = "esrc-website";
$username = "root";  // Update with your actual database username
$password = "";      // Update with your actual database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to the database: " . $e->getMessage());
}
?>