DELIMITER $$
CREATE FUNCTION `GetGoals`(playerID INT) RETURNS int
    DETERMINISTIC
BEGIN
	
    DECLARE totalGoals INT DEFAULT 0;
    DECLARE playerExists INT DEFAULT 0;
    IF playerID <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid PlayerID';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM players p WHERE p.PlayerID = playerID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CANNOT FIND PLAYER WITH THIS ID';
    END IF;
    SELECT COUNT(*) INTO playerExists
    FROM players
    WHERE PlayerID = playerID;
    
    IF playerExists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cầu thủ không hợp lệ hoặc không tồn tại';
    END IF;

    SELECT COUNT(*) INTO totalGoals
    FROM Goal g
    WHERE g.PlayerID = playerID
    AND g.Type != 'Own Goal';  
    
    RETURN totalGoals;
END$$


CREATE FUNCTION `GetPlayMinutes`(playerID INT) RETURNS int
    DETERMINISTIC
BEGIN
	
    DECLARE totalMinutes INT DEFAULT 0;
    DECLARE enterMinute INT DEFAULT 0;
    DECLARE enterMinute1 INT DEFAULT -1;
    DECLARE outMinute INT DEFAULT -1;
    DECLARE matchMinute INT DEFAULT -1;
    DECLARE yellowCardCount INT DEFAULT -1;
    DECLARE yellowCardTime int DEFAULT -1;
    DECLARE redCardTime int DEFAULT -1;
    DECLARE timeOut INT DEFAULT -1;
    DECLARE matchID INT;
    DECLARE done BOOL DEFAULT FALSE;
    DECLARE currentMatchCursor CURSOR FOR 
        SELECT DISTINCT pi.MatchID
        FROM PlaysIn pi
        WHERE pi.PlayerID = playerID;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    IF playerID <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid PlayerID';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM players p WHERE p.PlayerID = playerID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CANNOT FIND PLAYER WITH THIS ID';
    END IF;

    OPEN currentMatchCursor;
    
    read_loop: LOOP
		SET done= false;
        FETCH currentMatchCursor INTO matchID;

        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Log: Lấy thời gian bù (AdditionalTime) từ bảng matches
        INSERT INTO DebugLog (PlayerID, MatchID, LogMessage)
        VALUES (playerID, matchID, CONCAT('Match ', matchID, ' - Additional Time: ', (SELECT m.AdditionalTime FROM matches m WHERE m.MatchID = matchID)));

        SELECT m.AdditionalTime FROM matches m WHERE m.MatchID = matchID INTO matchMinute;
        
        SET matchMinute = 90 + matchMinute;
        SET outMinute = matchMinute;
        SET enterMinute = matchMinute;

        -- Tính phút vào sân (enterMinute1) nếu cầu thủ vào sân từ ghế dự bị
        SELECT CASE
                    WHEN s.IsOut = FALSE THEN s.minute 
                    ELSE matchMinute
                END INTO enterMinute1
        FROM Substitute s
        WHERE s.PlayerID = playerID AND s.MatchID = matchID; 
        
        IF enterMinute1 !=-1 THEN
            SET enterMinute = enterMinute1;
        END IF;

        -- Log: Thời gian vào sân chính thức
        

        -- Tính phút vào sân chính thức trong trường hợp cầu thủ bắt đầu trận đấu
        SELECT CASE 
                    WHEN pi.IsMain = TRUE THEN 0 
                    ELSE enterMinute
                END INTO enterMinute
        FROM PlaysIn pi
        WHERE pi.PlayerID = playerID AND pi.MatchID = matchID;
        
        INSERT INTO DebugLog (PlayerID, MatchID, LogMessage)
        VALUES (playerID, matchID, CONCAT('Match ', matchID, ' - Enter Time: ', enterMinute));

        -- Kiểm tra số thẻ vàng và xử lý thẻ vàng thứ 2
        SELECT COUNT(*) INTO yellowCardCount
        FROM YellowCard yc
        WHERE yc.PlayerID = playerID AND yc.MatchID = matchID;

        -- Log: Kiểm tra thẻ vàng
        INSERT INTO DebugLog (PlayerID, MatchID, LogMessage)
        VALUES (playerID, matchID, CONCAT('Match ', matchID, ' - Yellow Cards Count: ', yellowCardCount));

        IF yellowCardCount >= 2 THEN
            -- Lấy thời gian thẻ vàng thứ 2
            SELECT yc.YellowCardTime
            INTO yellowCardTime
            FROM YellowCard yc
            WHERE yc.PlayerID = playerID AND yc.MatchID = matchID
            ORDER BY yc.YellowCardTime
            LIMIT 1 OFFSET 1;  -- Lấy thẻ vàng thứ hai
            
            -- Nếu có thẻ vàng thứ 2, thay đổi thời gian ra sân (outMinute)
            SET outMinute = yellowCardTime;
            
            -- Log: Thẻ vàng thứ 2
            INSERT INTO DebugLog (PlayerID, MatchID, LogMessage)
            VALUES (playerID, matchID, CONCAT('Match ', matchID, ' - Yellow Card Time: ', yellowCardTime));
        END IF;

        -- Kiểm tra thẻ đỏ
        SELECT pi.RedCardTime INTO redCardTime
        FROM PlaysIn pi
        WHERE pi.PlayerID = playerID AND pi.MatchID = matchID AND pi.RedCardTime IS NOT NULL
        LIMIT 1;

        IF redCardTime !=-1 THEN
            -- Nếu có thẻ đỏ, thay đổi thời gian ra sân (outMinute)
            SET outMinute = redCardTime;

            -- Log: Thẻ đỏ
            INSERT INTO DebugLog (PlayerID, MatchID, LogMessage)
            VALUES (playerID, matchID, CONCAT('Match ', matchID, ' - Red Card Time: ', redCardTime));
        END IF;

        -- Kiểm tra thời gian cầu thủ bị thay ra
        SELECT s.minute INTO timeOut
        FROM Substitute s
        WHERE s.PlayerID = playerID AND s.MatchID = matchID AND s.IsOut = TRUE; 
        
        IF timeOut !=-1 THEN
            -- Nếu cầu thủ bị thay ra, cập nhật thời gian ra sân (outMinute)
            SET outMinute = timeOut;

            -- Log: Thay ra
            INSERT INTO DebugLog (PlayerID, MatchID, LogMessage)
            VALUES (playerID, matchID, CONCAT('Match ', matchID, ' - Substituted Out Time: ', timeOut));
        END IF;

        -- Tính tổng số phút thi đấu của cầu thủ trong trận đấu này
        SET totalMinutes = totalMinutes + (outMinute - enterMinute);

        INSERT INTO DebugLog (PlayerID, MatchID, LogMessage)
        VALUES (playerID, matchID, CONCAT('Match ', matchID, ' - Total Minutes Played: ', (outMinute - enterMinute)));


        SET enterMinute = -1;
        SET enterMinute1 = -1;
        SET outMinute = -1;
        SET matchMinute = -1;
        SET yellowCardCount = -1;
        SET yellowCardTime = -1;
        SET redCardTime = -1;
        SET timeOut = -1;
        
    END LOOP;

    CLOSE currentMatchCursor;

    RETURN totalMinutes;
END$$


CREATE FUNCTION `GetRedCardCount`(p_PlayerID INT) RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE red_card_count INT;

    SELECT COUNT(*) INTO red_card_count
    FROM PlaysIn
    WHERE PlayerID = p_PlayerID AND RedCardTime IS NOT NULL;

    RETURN red_card_count;
END$$


CREATE DEFINER=`nhathuy123`@`%` FUNCTION `GetYellowCardCount`(p_PlayerID INT) RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE yellow_card_count INT;

    SELECT COUNT(*) INTO yellow_card_count
    FROM YellowCard
    WHERE PlayerID = p_PlayerID;

    RETURN yellow_card_count;
END$$

DELIMITER ;