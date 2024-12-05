<?php

require 'db.php';

try {

    if (isset($_GET["usersId"]) && count($_GET["usersId"]) == 2) {

        $pdo = getDbConnection();
        $user_id1 = $_GET["usersId"][0];
        $user_id2 = $_GET["usersId"][1];
    
        if ($pdo->query("SELECT * FROM users WHERE id = $user_id1")->rowCount() > 0
            && $pdo->query("SELECT * FROM users WHERE id = $user_id2")->rowCount() > 0) {
        
            $user_chat_sql = "SELECT cm.chat_id FROM chat_members cm
                                JOIN chats ch on ch.id = cm.chat_id
                                WHERE user_id = $user_id1 and ch.type = 'private';";
    
            $user_chats = $pdo->query($user_chat_sql)->fetchAll(PDO::FETCH_ASSOC);
    
            if (!empty($user_chats)) {
    
                $chat_id_arr = array_map(function($item) {
                    return $item['chat_id'];
                }, $user_chats);
    
                $chat_id_list = implode(',', $chat_id_arr);

                if ($pdo->query("SELECT * FROM chat_members 
                                WHERE user_id = $user_id2 and chat_id in ($chat_id_list) and ")
                                ->rowCount() > 0) {

                    throw new Exception("Чат с данным пользователем уже существует!");
                }

                else {

                }
    
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