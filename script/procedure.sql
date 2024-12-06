DELIMITER $$

-- Procedure to delete a match
CREATE PROCEDURE `DeleteMatch`(
    IN p_MatchID INT
)
BEGIN
    DECLARE matchDate DATE;

    -- Get the match date
    SELECT m.date INTO matchDate
    FROM Matches m
    WHERE m.MatchID = p_MatchID;

    -- Prevent deletion if match is in the past
    IF matchDate < CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete match in the past';
    ELSE
        -- Delete related records in Participate table
        DELETE FROM Participate WHERE MatchID = p_MatchID;

        -- Delete match from Matches table
        DELETE FROM Matches WHERE MatchID = p_MatchID;
    END IF;
END$$

-- Procedure to delete a player
CREATE PROCEDURE `DeletePlayer`(
    IN p_PlayerID INT
)
BEGIN
    -- Validate PlayerID
    IF p_PlayerID IS NULL OR p_PlayerID <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid PlayerID';
    END IF;

    -- Check if PlayerID exists
    IF NOT EXISTS (SELECT 1 FROM players WHERE PlayerID = p_PlayerID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'PlayerID not found';
    END IF;

    -- Delete player
    DELETE FROM players WHERE PlayerID = p_PlayerID;
END$$

-- Procedure to get coaches for a club
CREATE PROCEDURE `GetCoachesForClub`(
    IN input_club_id INT
)
BEGIN
    SELECT 
        c.CoachID,
        c.Name AS CoachName,
        c.Salary,
        c.ExperienceYears,
        c.Type AS CoachType,
        cl.Name AS ClubName
    FROM 
        coaches c
    JOIN 
        coachedby cb ON c.CoachID = cb.CoachID
    JOIN 
        clubs cl ON cb.ClubID = cl.ClubID
    WHERE 
        cb.ClubID = input_club_id;
END$$

-- Procedure to get match details by MatchID
CREATE PROCEDURE `GetMatchDetailsByMatchID`(
    IN p_MatchID INT
)
BEGIN
    SELECT
        'Goal' AS EventType,
        g.Minute AS EventTime,
        p.FirstName AS PlayerFirstName,
        p.LastName AS PlayerLastName,
        g.Type AS GoalType,
        NULL AS isOut
    FROM Goal g
    JOIN players p ON g.PlayerID = p.PlayerID
    WHERE g.MatchID = p_MatchID

    UNION ALL

    SELECT
        'Substitute' AS EventType,
        s.Minute AS EventTime,
        p.FirstName AS PlayerFirstName,
        p.LastName AS PlayerLastName,
        NULL AS GoalType,
        s.isOut AS isOut
    FROM Substitute s
    JOIN players p ON s.PlayerID = p.PlayerID
    WHERE s.MatchID = p_MatchID

    UNION ALL

    SELECT
        'YellowCard' AS EventType,
        yc.YellowCardTime AS EventTime,
        p.FirstName AS PlayerFirstName,
        p.LastName AS PlayerLastName,
        NULL AS GoalType,
        NULL AS isOut
    FROM YellowCard yc
    JOIN players p ON yc.PlayerID = p.PlayerID
    WHERE yc.MatchID = p_MatchID

    UNION ALL

    SELECT
        'RedCard' AS EventType,
        pp.RedCardTime AS EventTime,
        p.FirstName AS PlayerFirstName,
        p.LastName AS PlayerLastName,
        NULL AS GoalType,
        NULL AS isOut
    FROM playsin pp
    JOIN players p ON pp.PlayerID = p.PlayerID
    WHERE pp.RedCardTime IS NOT NULL AND pp.MatchID = p_MatchID

    ORDER BY EventTime;
END$$


CREATE PROCEDURE `GetStartingLineups`(
    IN input_match_id INT
)
BEGIN
    DECLARE home_club_id INT;
    DECLARE away_club_id INT;
    declare da DATE;
    select m.date into da from matches m where m.matchID=input_match_id;
    
    CREATE TEMPORARY TABLE TempPlayers1 (
        PlayerID INT,
        FullName VARCHAR(100),
        Position VARCHAR(50),
        Salary DECIMAL(15, 2),
        Age INT,
        Birthday DATE
    );
    
    CREATE TEMPORARY TABLE TempPlayers2 (
        PlayerID INT,
        FullName VARCHAR(100),
        Position VARCHAR(50),
        Salary DECIMAL(15, 2),
        Age INT,
        Birthday DATE
    );

    -- Lấy ID đội nhà và đội khách từ bảng Participate
    SELECT ClubID INTO home_club_id
    FROM Participate
    WHERE MatchID = input_match_id
      AND IsHome = TRUE;

    SELECT ClubID INTO away_club_id
    FROM Participate
    WHERE MatchID = input_match_id
      AND IsHome = FALSE;

    -- Trường hợp 1: Cầu thủ đang thi đấu chính thức cho đội nhà và không bị cho mượn
    INSERT INTO TempPlayers1 (PlayerID, FullName, Position, Salary, Age, Birthday)
    SELECT DISTINCT 
        p.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS FullName,
        p.Position,
        p.Salary,
        p.Age,
        p.Birthday
    FROM 
        players p
    LEFT JOIN 
        PlayOfficially po ON p.PlayerID = po.PlayerID
    LEFT JOIN 
        DurationOfOfficialPlayer dofpo ON p.PlayerID = dofpo.PlayerID AND po.ClubID = dofpo.ClubID and (da between dofpo.startday and dofpo.endday)
    WHERE 
        po.ClubID = home_club_id
    AND NOT EXISTS (
        SELECT 1 
        FROM PlayAsLoanPlayer plp 
        LEFT JOIN DurationOfLoanPlayer dolp ON p.PlayerID = dolp.PlayerID
        WHERE plp.PlayerID = p.PlayerID and (da between dolp.startday and dolp.endday)
    );

    INSERT INTO TempPlayers1 (PlayerID, FullName, Position, Salary, Age, Birthday)
    SELECT DISTINCT 
        p.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS FullName,
        p.Position,
        p.Salary,
        p.Age,
        p.Birthday
    FROM 
        players p
    LEFT JOIN 
        PlayAsLoanPlayer plp ON p.PlayerID = plp.PlayerID
    LEFT JOIN 
        DurationOfLoanPlayer dolp ON p.PlayerID = dolp.PlayerID AND plp.ClubID = dolp.ClubID
    WHERE 
        plp.ClubID = home_club_id and (da between dolp.startday and dolp.endday) ;
        
        
	INSERT INTO TempPlayers2 (PlayerID, FullName, Position, Salary, Age, Birthday)
    SELECT DISTINCT 
        p.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS FullName,
        p.Position,
        p.Salary,
        p.Age,
        p.Birthday
    FROM 
        players p
    LEFT JOIN 
        PlayOfficially po ON p.PlayerID = po.PlayerID
    LEFT JOIN 
        DurationOfOfficialPlayer dofpo ON p.PlayerID = dofpo.PlayerID AND po.ClubID = dofpo.ClubID
    WHERE 
        po.ClubID = away_club_id and (da between dofpo.startday and dofpo.endday)
    AND NOT EXISTS (
        SELECT 1 
        FROM PlayAsLoanPlayer plp 
        LEFT JOIN DurationOfLoanPlayer dolp ON p.PlayerID = dolp.PlayerID
        WHERE plp.PlayerID = p.PlayerID and (da between dolp.startday and dolp.endday)
    );

    INSERT INTO TempPlayers2 (PlayerID, FullName, Position, Salary, Age, Birthday)
    SELECT DISTINCT 
        p.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS FullName,
        p.Position,
        p.Salary,
        p.Age,
        p.Birthday
    FROM 
        players p
    LEFT JOIN 
        PlayAsLoanPlayer plp ON p.PlayerID = plp.PlayerID
    LEFT JOIN 
        DurationOfLoanPlayer dolp ON p.PlayerID = dolp.PlayerID AND plp.ClubID = dolp.ClubID
    WHERE 
        plp.ClubID = away_club_id and (da between dolp.startday and dolp.endday);
    SELECT 
        pi.MatchID,
        pi.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS PlayerName,
        pi.Position AS PlayerPosition,
        pi.IsLeader AS IsCaptain,
        'Home' AS Team
    FROM 
        PlaysIn pi
    JOIN 
        Players p ON pi.PlayerID = p.PlayerID
    WHERE 
        pi.MatchID = input_match_id
        AND pi.IsMain = TRUE
        AND pi.PlayerID IN (SELECT PlayerID FROM TempPlayers1)

    UNION ALL

    -- Lấy đội hình ra sân của đội khách
    SELECT 
        pi.MatchID,
        pi.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS PlayerName,
        pi.Position AS PlayerPosition,
        pi.IsLeader AS IsCaptain,
        'Away' AS Team
    FROM 
        PlaysIn pi
    JOIN 
        Players p ON pi.PlayerID = p.PlayerID
    WHERE 
        pi.MatchID = input_match_id
        AND pi.IsMain = TRUE
        AND pi.PlayerID IN (SELECT PlayerID FROM TempPlayers2)

    ORDER BY Team, PlayerPosition;
    
    -- Xóa bảng tạm sau khi sử dụng xong
    DROP TEMPORARY TABLE IF EXISTS TempPlayers1;
    DROP TEMPORARY TABLE IF EXISTS TempPlayers2;
END$$


CREATE PROCEDURE `GetSub`(
    IN input_match_id INT
)
BEGIN
    DECLARE home_club_id INT;
    DECLARE away_club_id INT;
    declare da DATE;
    select m.date into da from matches m where m.matchID=input_match_id;
    
    CREATE TEMPORARY TABLE TempPlayers1 (
        PlayerID INT,
        FullName VARCHAR(100),
        Position VARCHAR(50),
        Salary DECIMAL(15, 2),
        Age INT,
        Birthday DATE
    );
    
    CREATE TEMPORARY TABLE TempPlayers2 (
        PlayerID INT,
        FullName VARCHAR(100),
        Position VARCHAR(50),
        Salary DECIMAL(15, 2),
        Age INT,
        Birthday DATE
    );

    -- Lấy ID đội nhà và đội khách từ bảng Participate
    SELECT ClubID INTO home_club_id
    FROM Participate
    WHERE MatchID = input_match_id
      AND IsHome = TRUE;

    SELECT ClubID INTO away_club_id
    FROM Participate
    WHERE MatchID = input_match_id
      AND IsHome = FALSE;

    -- Trường hợp 1: Cầu thủ đang thi đấu chính thức cho đội nhà và không bị cho mượn
    INSERT INTO TempPlayers1 (PlayerID, FullName, Position, Salary, Age, Birthday)
    SELECT DISTINCT 
        p.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS FullName,
        p.Position,
        p.Salary,
        p.Age,
        p.Birthday
    FROM 
        players p
    LEFT JOIN 
        PlayOfficially po ON p.PlayerID = po.PlayerID
    LEFT JOIN 
        DurationOfOfficialPlayer dofpo ON p.PlayerID = dofpo.PlayerID AND po.ClubID = dofpo.ClubID and (da between dofpo.startday and dofpo.endday)
    WHERE 
        po.ClubID = home_club_id
    AND NOT EXISTS (
        SELECT 1 
        FROM PlayAsLoanPlayer plp 
        LEFT JOIN DurationOfLoanPlayer dolp ON p.PlayerID = dolp.PlayerID
        WHERE plp.PlayerID = p.PlayerID and (da between dolp.startday and dolp.endday)
    );

    INSERT INTO TempPlayers1 (PlayerID, FullName, Position, Salary, Age, Birthday)
    SELECT DISTINCT 
        p.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS FullName,
        p.Position,
        p.Salary,
        p.Age,
        p.Birthday
    FROM 
        players p
    LEFT JOIN 
        PlayAsLoanPlayer plp ON p.PlayerID = plp.PlayerID
    LEFT JOIN 
        DurationOfLoanPlayer dolp ON p.PlayerID = dolp.PlayerID AND plp.ClubID = dolp.ClubID
    WHERE 
        plp.ClubID = home_club_id and (da between dolp.startday and dolp.endday) ;
        
        
	INSERT INTO TempPlayers2 (PlayerID, FullName, Position, Salary, Age, Birthday)
    SELECT DISTINCT 
        p.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS FullName,
        p.Position,
        p.Salary,
        p.Age,
        p.Birthday
    FROM 
        players p
    LEFT JOIN 
        PlayOfficially po ON p.PlayerID = po.PlayerID
    LEFT JOIN 
        DurationOfOfficialPlayer dofpo ON p.PlayerID = dofpo.PlayerID AND po.ClubID = dofpo.ClubID
    WHERE 
        po.ClubID = away_club_id and (da between dofpo.startday and dofpo.endday)
    AND NOT EXISTS (
        SELECT 1 
        FROM PlayAsLoanPlayer plp 
        LEFT JOIN DurationOfLoanPlayer dolp ON p.PlayerID = dolp.PlayerID
        WHERE plp.PlayerID = p.PlayerID and (da between dolp.startday and dolp.endday)
    );

    INSERT INTO TempPlayers2 (PlayerID, FullName, Position, Salary, Age, Birthday)
    SELECT DISTINCT 
        p.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS FullName,
        p.Position,
        p.Salary,
        p.Age,
        p.Birthday
    FROM 
        players p
    LEFT JOIN 
        PlayAsLoanPlayer plp ON p.PlayerID = plp.PlayerID
    LEFT JOIN 
        DurationOfLoanPlayer dolp ON p.PlayerID = dolp.PlayerID AND plp.ClubID = dolp.ClubID
    WHERE 
        plp.ClubID = away_club_id and (da between dolp.startday and dolp.endday);


    SELECT 
        pi.MatchID,
        pi.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS PlayerName,
        pi.Position AS PlayerPosition,
        pi.IsLeader AS IsCaptain,
        'Home' AS Team
    FROM 
        PlaysIn pi
    JOIN 
        Players p ON pi.PlayerID = p.PlayerID
    WHERE 
        pi.MatchID = input_match_id
        AND pi.IsMain = FALSE
        AND pi.PlayerID IN (SELECT PlayerID FROM TempPlayers1)

    UNION ALL

    SELECT 
        pi.MatchID,
        pi.PlayerID,
        CONCAT(p.FirstName, ' ', p.LastName) AS PlayerName,
        pi.Position AS PlayerPosition,
        pi.IsLeader AS IsCaptain,
        'Away' AS Team
    FROM 
        PlaysIn pi
    JOIN 
        Players p ON pi.PlayerID = p.PlayerID
    WHERE 
        pi.MatchID = input_match_id
        AND pi.IsMain = FALSE
        AND pi.PlayerID IN (SELECT PlayerID FROM TempPlayers2)

    ORDER BY Team, PlayerPosition;
    
    DROP TEMPORARY TABLE IF EXISTS TempPlayers1;
    DROP TEMPORARY TABLE IF EXISTS TempPlayers2;
END$$


CREATE DEFINER=`nhathuy123`@`%` PROCEDURE `GetTeamsForMatch`(
    IN input_match_id INT
)
BEGIN
    SELECT 
        p.MatchID,
        p.ClubID,
        c.Name AS ClubName,
        p.IsHome
    FROM 
        Participate p
    JOIN 
        clubs c ON p.ClubID = c.ClubID
    WHERE 
        p.MatchID = input_match_id;
END$$


CREATE DEFINER=`nhathuy123`@`%` PROCEDURE `GetTopScorers`(tournamentID INT)
BEGIN
    DECLARE maxGoals INT DEFAULT 0;
    
    SELECT MAX(TotalGoals) INTO maxGoals
    FROM (
        SELECT COUNT(g.Ordinal) AS TotalGoals
        FROM Goal g
        JOIN Matches m ON g.MatchID = m.MatchID
        WHERE g.Type != 'Own Goal'  
        AND m.TournamentID = tournamentID  
        GROUP BY g.PlayerID
    ) AS PlayerGoals;

    SELECT p.PlayerID, p.FirstName, p.LastName, COUNT(g.Ordinal) AS TotalGoals
    FROM players p
    LEFT JOIN Goal g ON p.PlayerID = g.PlayerID
    JOIN Matches m ON g.MatchID = m.MatchID
    WHERE g.Type != 'Own Goal'  
    AND m.TournamentID = tournamentID 
    GROUP BY p.PlayerID
    HAVING TotalGoals = maxGoals;
END$$


CREATE PROCEDURE `InsertPlayer`(
    IN p_Salary DECIMAL(15, 2),
    IN p_Birthday DATE,
    IN p_FirstName VARCHAR(50),
    IN p_LastName VARCHAR(50),
    IN p_Position VARCHAR(30)
)
BEGIN
    IF p_Salary < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Salary must be greater than or equal to 0';
    END IF;

    IF p_Birthday > CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Birthday cannot be in the future';
    END IF;

    IF p_FirstName IS NULL OR p_FirstName = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'First name cannot be empty';
    END IF;

    IF p_LastName IS NULL OR p_LastName = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Last name cannot be empty';
    END IF;

    IF p_Position IS NULL OR p_Position = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Position cannot be empty';
    END IF;

    IF p_Position NOT IN ('Forward', 'Midfielder', 'Defender', 'Goalkeeper','Winger','Striker') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Position must be one of the following: Forward, Midfield, Defender, Goalkeeper';
    END IF;

    INSERT INTO players (Salary, Birthday, FirstName, LastName, Position)
    VALUES (p_Salary, p_Birthday, p_FirstName, p_LastName, p_Position);

    -- SELECT 'Player inserted successfully' AS message;
END$$


CREATE PROCEDURE `SearchPlayers`(
    IN p_name VARCHAR(255),
    IN p_Position VARCHAR(255),
    IN p_min_age INT,
    IN p_max_age INT,
    IN p_min_salary DECIMAL(15, 2),
    IN p_max_salary DECIMAL(15, 2),
    IN num INT
)
BEGIN
    SELECT * 
    FROM viewplayershadred 
    WHERE 
        Fullname LIKE LOWER(CONCAT('%', p_name, '%'))
        AND LOWER(position) LIKE LOWER(CONCAT('%', p_Position, '%'))
        AND age BETWEEN p_min_age AND p_max_age
        AND salary BETWEEN p_min_salary AND p_max_salary
        AND TotalRedCards >= num;
End$$


CREATE PROCEDURE `updateMatch`(
    IN p_MatchID INT,
    IN newDate Date
)
BEGIN
    DECLARE matchDate DATE;
    
    SELECT m.date INTO matchDate
    FROM Matches m
    WHERE m.MatchID = p_MatchID;
    
    IF newDate < curdate() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot update match in the past';
    ELSE
        UPDATE Matches
        SET date = newDate
        WHERE MatchID = p_MatchID;
    END IF;
    
END$$


CREATE PROCEDURE `UpdatePlayer`(
    IN p_PlayerID INT,
    IN p_Salary DECIMAL(15, 2),
    IN p_Birthday DATE,
    IN p_FirstName VARCHAR(50),
    IN p_LastName VARCHAR(50),
    IN p_Position VARCHAR(30)
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM players WHERE PlayerID = p_PlayerID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'PlayerID not found';
    END IF;

    IF p_Salary < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Salary must be greater than or equal to 0';
    END IF;

    IF p_Birthday > CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Birthday cannot be in the future';
    END IF;

    IF p_FirstName IS NULL OR p_FirstName = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'First name cannot be empty';
    END IF;

    IF p_LastName IS NULL OR p_LastName = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Last name cannot be empty';
    END IF;

    IF p_Position IS NULL OR p_Position = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Position cannot be empty';
    END IF;
    
    IF p_Position NOT IN ('Forward', 'Midfielder', 'Defender', 'Goalkeeper') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Position must be one of the following: Forward, Midfield, Defender, Goalkeeper';
    END IF;

    

    UPDATE players
    SET 
        Salary = p_Salary,
        Birthday = p_Birthday,
        FirstName = p_FirstName,
        LastName = p_LastName,
        Position = p_Position
    WHERE PlayerID = p_PlayerID;


    -- SELECT 'Player updated successfully' AS message;
END$$

DELIMITER ;