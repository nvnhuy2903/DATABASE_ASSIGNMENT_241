
DELIMITER $$
CREATE TRIGGER max_yellow_card_insert 
BEFORE INSERT ON yellowcard 
FOR EACH ROW
BEGIN
    DECLARE player_count INT;

    -- Đếm số lượng thẻ vàng của cầu thủ trong cùng trận đấu
    SELECT COUNT(*) INTO player_count 
    FROM yellowcard 
    WHERE PlayerID = NEW.PlayerID AND MatchID = NEW.MatchID;

    -- Nếu đã có 2 thẻ vàng, chặn việc thêm mới
    IF player_count >= 2 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Player can only take up to 2 yellow cards!';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER before_insert_playsin
BEFORE INSERT ON PlaysIn
FOR EACH ROW
BEGIN
    DECLARE last_match INT;
    DECLARE yellow_card_count INT;
    DECLARE red_card_time INT;

    -- Tìm MatchID gần nhất mà cầu thủ đã tham gia
    SELECT MAX(MatchID) 
    INTO last_match
    FROM PlaysIn
    WHERE PlayerID = NEW.PlayerID;

    -- Kiểm tra xem cầu thủ có trận gần nhất không (trường hợp lần đầu tham gia)
    IF last_match IS NOT NULL THEN
        -- Đếm số thẻ vàng trong trận gần nhất
        SELECT COUNT(*) 
        INTO yellow_card_count
        FROM YellowCard
        WHERE PlayerID = NEW.PlayerID AND MatchID = last_match;

        -- Lấy thời gian thẻ đỏ (nếu có) trong trận gần nhất
        SELECT RedCardTime 
        INTO red_card_time
        FROM PlaysIn
        WHERE PlayerID = NEW.PlayerID AND MatchID = last_match;

        -- Kiểm tra điều kiện:
        -- 1. Nếu cầu thủ có thẻ đỏ hoặc nhận 2 thẻ vàng, chặn thêm mới
        IF yellow_card_count >= 2 OR red_card_time IS NOT NULL THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Player is banned from participating in this match!';
        END IF;
    END IF;
END$$
DELIMITER ;


DELIMITER $$

CREATE TRIGGER BeforeUpdatePlayer
BEFORE Update ON players
FOR EACH ROW
BEGIN
    SET NEW.Age = TIMESTAMPDIFF(YEAR, NEW.Birthday, CURDATE());
    
    IF NEW.Age < 16 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Player must be at least 16 years old to be added';
    END IF;
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER BeforeInsertPlayer
BEFORE INSERT ON players
FOR EACH ROW
BEGIN
    SET NEW.Age = TIMESTAMPDIFF(YEAR, NEW.Birthday, CURDATE());
    
    IF NEW.Age < 16 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Player must be at least 16 years old to be added';
    END IF;
END $$

DELIMITER ;

DROP TRIGGER IF EXISTS max_yellow_card_insert;
DROP TRIGGER IF EXISTS before_insert_playsin;
drop trigger if exists BeforeUpdatePlayer;
drop trigger if exists BeforeInsertPlayer;
SHOW TRIGGERS;
DELIMITER ;
