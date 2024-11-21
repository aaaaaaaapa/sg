<?php

require 'db.php';

try {

    if (isset($_GET["userId"])) {

        $pdo = getDbConnection();
        $user_id = $_GET["userId"];
    
        if ($pdo->query("SELECT * FROM users WHERE id = $user_id")->rowCount() > 0) {
        
            $user_chat_sql = "SELECT chat_id FROM chat_members 
                            WHERE user_id = $user_id;";
    
            $user_chats = $pdo->query($user_chat_sql)->fetchAll(PDO::FETCH_ASSOC);
    
            if (!empty($user_chats)) {
    
                $chat_id_arr = array_map(function($item) {
                    return $item['chat_id'];
                }, $user_chats);
    
                $chat_id_list = implode(',', $chat_id_arr);
    
                $chat_details_sql = "SELECT m.chat_id, ch.type, ch.name, GROUP_CONCAT(u.username) AS members
                                FROM chat_members m
                                INNER JOIN chats ch ON ch.id = m.chat_id
                                INNER JOIN users u ON u.id = m.user_id
                                WHERE m.user_id != $user_id and m.chat_id in ($chat_id_list)
                                GROUP BY m.chat_id, ch.type, ch.name
                                ORDER BY m.chat_id desc;";
            
                $chat_details = $pdo->query($chat_details_sql)->fetchAll(PDO::FETCH_ASSOC);        
                
                foreach ($chat_details as &$chat) {
                    $chat['members'] = explode(',', $chat['members']);
                }
                
                header('Content-Type: application/json');
                http_response_code(200);
                echo json_encode($chat_details);
    
            }
        }
    
        else {
            http_response_code(404);
            echo "Пользователь не найден";
        }
    }

} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage();
}


?>