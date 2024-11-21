<?php

require 'db.php';

try {

    $requestBody = file_get_contents('php://input');

    $data = json_decode($requestBody, true);

    if ($data['chatId'] && $data['userId'] && $data['text']) {

        $pdo = getDbConnection();

        $chat_id = $data['chatId'];
        $user_id = $data['userId'];
        $text = htmlspecialchars($data['text']);

        if ($pdo->query("SELECT * FROM users WHERE id = $user_id")->rowCount() > 0 
            && $pdo->query("SELECT * FROM chats WHERE id = $chat_id")->rowCount() > 0) {
        
            $post_message_sql = "INSERT INTO messages (chat_id, user_id, text) VALUES (:chat_id, :user_id, :text)";
            $stmt = $pdo->prepare($post_message_sql);

            $stmt->bindParam(':chat_id', $chat_id, PDO::PARAM_INT);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':text', $text, PDO::PARAM_STR);

            $stmt->execute();

            http_response_code(201);
            echo "Сообщение отправлено!";
        }
        else {
            echo "Пользователь или чат не найдены";
        }
    }

    else {
        http_response_code(400);
        echo "Неверный формат данных";
    }

} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage();
}

?>