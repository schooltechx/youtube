<?php
$host = 'db';
$user = 'webmaster';
$pass = 'P@ssw0rd';
$mydatabase = 'my_web';
$users = [];
$conn = new mysqli($host, $user, $pass, $mydatabase);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = 'SELECT * FROM users';
if ($result = $conn->query($sql)) {
    while ($data = $result->fetch_object()) {
        $users[] = $data;
    }
}
?>
<html>
    <head>
        <title>PHP APP</title>
    </head>
    <body>
    <?php
    foreach ($users as $user) {
        echo "<br>";
        echo $user->username . " " . $user->password;
        echo "<br>";
    }
    ?>

    </body>
</html>