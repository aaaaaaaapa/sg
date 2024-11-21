<?php

require 'db.php';

try {

    if (isset($_GET["chatId"]))
    {
        $pdo = getDbConnection();
        $chat_id = $_GET["chatId"];

        if ($pdo->query("SELECT * FROM chats WHERE id = $chat_id")->rowCount() > 0) {
            
            $sql = "SELECT us.id, us.username, m.text, m.created_at 
                    FROM messages m
                    INNER JOIN users us on us.id = m.user_id
                    WHERE m.chat_id = $chat_id";
            $stmt = $pdo->query($sql);
            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($messages);

        }

        else {
            http_response_code(404);
            echo "Чат не найден";
        }
    }
    
} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage();
}

?>