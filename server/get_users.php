<?php

require 'db.php';

try {

    if (isset($_GET["userId"]))
    {
        $pdo = getDbConnection();
        $user_id = $_GET["userId"];
            
        $sql = "SELECT * FROM users WHERE id != $user_id";
        $stmt = $pdo->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($users)) {
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($users);
        }

    }
    
} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage();
}

?>