use btl_csdl_official;

-- Tạo lại bảng players với auto_increment cho PlayerID
CREATE TABLE players (
    PlayerID INT AUTO_INCREMENT PRIMARY KEY,
    Salary DECIMAL(15, 2) NOT NULL CHECK (Salary >= 0),
    Birthday DATE NOT NULL,
    Age INT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Position VARCHAR(30) NOT NULL,
    FULLTEXT (FirstName, LastName)
);

-- Tạo lại bảng coaches với auto_increment cho CoachID
CREATE TABLE coaches (
    CoachID INT AUTO_INCREMENT PRIMARY KEY,
    Salary DECIMAL(15, 2) NOT NULL CHECK (Salary >= 0),
    ExperienceYears INT NOT NULL CHECK (ExperienceYears >= 0),
    Type ENUM('technical','specialized') NOT NULL,
    Name VARCHAR(50) NOT NULL
);

-- Tạo lại bảng clubs với auto_increment cho ClubID
CREATE TABLE clubs (
    ClubID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Tạo lại bảng stadiums với auto_increment cho StadiumID
CREATE TABLE stadiums (
    StadiumID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Capacity INT NOT NULL CHECK (Capacity > 0),
    ClubID INT,
    FOREIGN KEY (ClubID) REFERENCES clubs(ClubID) ON DELETE SET NULL
);

-- Tạo lại bảng Referee với auto_increment cho RefereeID
CREATE TABLE Referee (
    RefereeId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Tạo lại bảng Tournament với auto_increment cho TournamentID
CREATE TABLE Tournament (
    TournamentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    StartingDate DATE NOT NULL,
    EndingDate DATE NOT NULL,
    ChampionClubId INT,
    ScoringMostGoalsPlayerId INT,
    FOREIGN KEY (ChampionClubId) REFERENCES clubs(ClubID),
    FOREIGN KEY (ScoringMostGoalsPlayerId) REFERENCES players(PlayerID)
);

CREATE TABLE Goal (
    MatchID INT,
    Ordinal INT,
    Type VARCHAR(50),
    PlayerID INT,
    Minute INT,
    PRIMARY KEY (MatchID, Ordinal),
    FOREIGN KEY (PlayerID) REFERENCES players(PlayerID)
);


-- Tạo lại bảng SpecializedCoach với auto_increment cho CoachID
CREATE TABLE SpecializedCoach (
    CoachID INT AUTO_INCREMENT PRIMARY KEY,
    Position VARCHAR(100),
    FOREIGN KEY (CoachID) REFERENCES Coaches(CoachID)
);

-- Tạo lại bảng TechnicalCoach với auto_increment cho CoachID
CREATE TABLE TechnicalCoach (
    CoachID INT AUTO_INCREMENT PRIMARY KEY,
    Skill VARCHAR(100),
    FOREIGN KEY (CoachID) REFERENCES Coaches(CoachID)
);

-- Tạo lại bảng Matches với auto_increment cho MatchID
CREATE TABLE Matches (
    MatchID INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE NOT NULL,
    AdditionalTime INT,
    TournamentID INT,
    FOREIGN KEY (TournamentID) REFERENCES Tournament(TournamentID)
);

-- Tạo lại bảng Substitute với auto_increment cho MatchID và Ordinal
CREATE TABLE Substitute (
    MatchID INT,
    Ordinal INT,
    Minute INT,
    PlayerID INT,
    IsOut BOOLEAN,
    PRIMARY KEY (MatchID, Ordinal, PlayerID, IsOut),
    FOREIGN KEY (MatchID) REFERENCES Matches(MatchID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID)
);

-- Tạo lại bảng Trains với auto_increment cho SuperviseeNumber và SupervisorNumber
CREATE TABLE Trains (
    SuperviseeNumber INT,
    SupervisorNumber INT,
    PRIMARY KEY (SuperviseeNumber),
    FOREIGN KEY (SuperviseeNumber) REFERENCES Players(PlayerID),
    FOREIGN KEY (SupervisorNumber) REFERENCES Players(PlayerID)
);

-- Tạo lại bảng certificates với auto_increment cho CertificateExpiredDate và CertificateName
CREATE TABLE certificates (
    CertificateName VARCHAR(100) NOT NULL,
    CertificateExpiredDate DATE NOT NULL,
    CoachID INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (CoachID) REFERENCES coaches(CoachID)
);

-- Tạo lại bảng IsControlledBy với auto_increment cho MatchID và RefereeID
CREATE TABLE IsControlledBy (
    MatchID INT,
    RefereeID INT,
    Position VARCHAR(50),
    PRIMARY KEY (MatchID, RefereeID),
    FOREIGN KEY (MatchID) REFERENCES matches(MatchID),
    FOREIGN KEY (RefereeID) REFERENCES Referee(RefereeID)
);

-- Tạo lại bảng Participate với auto_increment cho MatchID và ClubID
CREATE TABLE Participate (
    MatchID INT,
    ClubID INT,
    IsHome BOOLEAN,
    PRIMARY KEY (MatchID, ClubID),
    FOREIGN KEY (MatchID) REFERENCES matches(MatchID),
    FOREIGN KEY (ClubID) REFERENCES clubs(ClubID)
);

-- Tạo lại bảng PlaysIn với auto_increment cho PlayerID và MatchID
CREATE TABLE PlaysIn (
    PlayerID INT,
    MatchID INT,
    IsMain BOOLEAN,
    Position VARCHAR(50),
    RedCardTime INT,
    IsLeader BOOLEAN,
    PRIMARY KEY (PlayerID, MatchID),
    FOREIGN KEY (PlayerID) REFERENCES players(PlayerID),
    FOREIGN KEY (MatchID) REFERENCES matches(MatchID)
);

-- Tạo lại bảng YellowCard với auto_increment cho PlayerID và MatchID
CREATE TABLE YellowCard (
    PlayerID INT NOT NULL,
    MatchID INT NOT NULL,
    YellowCardTime INT NOT NULL,
    PRIMARY KEY (PlayerID, MatchID, YellowCardTime),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (MatchID) REFERENCES Matches(MatchID)
);

-- Tạo lại bảng PlayAsLoanPlayer với auto_increment cho PlayerID và ClubID
CREATE TABLE PlayAsLoanPlayer (
    PlayerID INT NOT NULL,
    ClubID INT NOT NULL,
    PRIMARY KEY (PlayerID, ClubID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (ClubID) REFERENCES Clubs(ClubID)
);

-- Tạo lại bảng PlayOfficially với auto_increment cho PlayerID và ClubID
CREATE TABLE PlayOfficially (
    PlayerID INT NOT NULL,
    ClubID INT NOT NULL,
    PRIMARY KEY (PlayerID, ClubID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (ClubID) REFERENCES Clubs(ClubID)
);

-- Tạo lại bảng coachedby với auto_increment cho CoachID và ClubID
CREATE TABLE coachedby (
    coachid INT NOT NULL,
    ClubID INT NOT NULL,
    PRIMARY KEY (coachid, ClubID),
    FOREIGN KEY (coachid) REFERENCES coaches(coachid),
    FOREIGN KEY (ClubID) REFERENCES Clubs(ClubID)
);

-- Tạo lại bảng DurationOfLoanPlayer với auto_increment cho PlayerID, ClubID và StartDay
CREATE TABLE DurationOfLoanPlayer (
    PlayerID INT NOT NULL,
    ClubID INT NOT NULL,
    StartDay DATE NOT NULL,
    EndDay DATE,
    PRIMARY KEY (PlayerID, ClubID, StartDay),
    FOREIGN KEY (PlayerID, ClubID) REFERENCES PlayAsLoanPlayer(PlayerID, ClubID)
);

-- Tạo lại bảng DurationOfOfficialPlayer với auto_increment cho PlayerID, ClubID và StartDay
CREATE TABLE DurationOfOfficialPlayer (
    PlayerID INT NOT NULL,
    ClubID INT NOT NULL,
    StartDay DATE NOT NULL,
    EndDay DATE,
    PRIMARY KEY (PlayerID, ClubID, StartDay),
    FOREIGN KEY (PlayerID, ClubID) REFERENCES PlayOfficially(PlayerID, ClubID)
);

-- Tạo lại bảng DurationOfCoach với auto_increment cho CoachID, ClubID và StartDay
CREATE TABLE DurationOfCoach (
    CoachID INT NOT NULL,
    ClubID INT NOT NULL,
    StartDay DATE NOT NULL,
    EndDay DATE,
    PRIMARY KEY (CoachID, ClubID, StartDay),
    FOREIGN KEY (CoachID, ClubID) REFERENCES coachedby(CoachID, ClubID)
);



-- Manchester United
INSERT INTO players (FirstName, LastName, Position, Salary, Birthday) VALUES
('David', 'De Gea', 'Goalkeeper', 200000, '1990-11-07'),
('Harry', 'Maguire', 'Defender', 180000, '1993-03-05'),
('Paul', 'Pogba', 'Midfielder', 150000, '1993-03-15'),
('Bruno', 'Fernandes', 'Midfielder', 170000, '1994-09-08'),
('Marcus', 'Rashford', 'Forward', 140000, '1997-10-31'),
('Cristiano', 'Ronaldo', 'Forward', 300000, '1985-02-05'),
('Jadon', 'Sancho', 'Forward', 160000, '2000-03-25'),
('Edinson', 'Cavani', 'Forward', 220000, '1987-02-14'),
('Luke', 'Shaw', 'Defender', 120000, '1995-07-12'),
('Aaron', 'Wan-Bissaka', 'Defender', 130000, '1997-11-26'),
('Victor', 'Lindelöf', 'Defender', 130000, '1994-07-17'),
('Fred', 'Rodrigues', 'Midfielder', 130000, '1993-10-05'),
('Raphaël', 'Varane', 'Defender', 240000, '1993-04-25'),
('Donny', 'van de Beek', 'Midfielder', 110000, '1997-04-18'),
('Dean', 'Henderson', 'Goalkeeper', 110000, '1997-03-12');

-- Liverpool
INSERT INTO players (FirstName, LastName, Position, Salary, Birthday) VALUES
('Mohamed', 'Salah', 'Forward', 220000, '1992-06-15'),
('Virgil', 'Van Dijk', 'Defender', 250000, '1991-07-08'),
('Sadio', 'Mane', 'Forward', 200000, '1992-04-10'),
('Trent', 'Alexander-Arnold', 'Defender', 180000, '1998-10-07'),
('Alisson', 'Becker', 'Goalkeeper', 230000, '1992-10-02'),
('Roberto', 'Firmino', 'Forward', 210000, '1991-10-02'),
('James', 'Milner', 'Midfielder', 160000, '1986-01-04'),
('Jordan', 'Henderson', 'Midfielder', 170000, '1990-06-17'),
('Fabinho', 'Tavares', 'Midfielder', 140000, '1993-10-23'),
('Naby', 'Keita', 'Midfielder', 130000, '1995-02-10'),
('Joel', 'Matip', 'Defender', 150000, '1991-08-08'),
('Diogo', 'Jota', 'Forward', 140000, '1996-12-04'),
('Andrew', 'Robertson', 'Defender', 150000, '1994-03-11'),
('Kostas', 'Tsimikas', 'Defender', 100000, '1996-05-12'),
('Divock', 'Origi', 'Forward', 120000, '1995-04-18');

-- Arsenal (15 cầu thủ)
INSERT INTO players (FirstName, LastName, Position, Salary, Birthday) VALUES
('Pierre-Emerick', 'Aubameyang', 'Forward', 200000, '1989-06-18'),
('Bukayo', 'Saka', 'Forward', 140000, '2001-09-05'),
('Emile', 'Smith Rowe', 'Midfielder', 120000, '2000-07-28'),
('Martin', 'Ødegaard', 'Midfielder', 160000, '1998-12-17'),
('Granit', 'Xhaka', 'Midfielder', 150000, '1992-09-27'),
('Thomas', 'Partey', 'Midfielder', 180000, '1993-06-13'),
('Gabriel', 'Jesus', 'Forward', 210000, '1997-04-03'),
('Alexandre', 'Lacazette', 'Forward', 170000, '1991-05-28'),
('Ben', 'White', 'Defender', 150000, '1997-10-08'),
('Kieran', 'Tierney', 'Defender', 140000, '1997-06-05'),
('Aaron', 'Ramsdale', 'Goalkeeper', 130000, '1998-05-14'),
('William', 'Saliba', 'Defender', 130000, '2001-03-24'),
('Cedric', 'Soares', 'Defender', 100000, '1991-08-31'),
('Nicolas', 'Pepe', 'Forward', 160000, '1995-05-29'),
('Martin', 'Keown', 'Defender', 120000, '1966-04-24');

-- Manchester City (15 cầu thủ)
INSERT INTO players (FirstName, LastName, Position, Salary, Birthday) VALUES
('Kevin', 'De Bruyne', 'Midfielder', 250000, '1991-06-28'),
('Erling', 'Haaland', 'Forward', 350000, '2000-07-21'),
('Phil', 'Foden', 'Forward', 200000, '2000-05-28'),
('Ruben', 'Dias', 'Defender', 220000, '1997-05-14'),
('Jack', 'Grealish', 'Forward', 230000, '1995-09-10'),
('Bernardo', 'Silva', 'Midfielder', 220000, '1994-08-10'),
('Ilkay', 'Gündogan', 'Midfielder', 180000, '1990-10-24'),
('Rodri', 'Hernández', 'Midfielder', 210000, '1996-06-22'),
('Kyle', 'Walker', 'Defender', 180000, '1990-05-28'),
('Joao', 'Cancelo', 'Defender', 200000, '1994-05-27'),
('Ederson', 'Moraes', 'Goalkeeper', 240000, '1993-08-17'),
('Aymeric', 'Laporte', 'Defender', 210000, '1994-05-27'),
('Nathan', 'Ake', 'Defender', 150000, '1995-02-18'),
('Zack', 'Steffen', 'Goalkeeper', 100000, '1995-04-02'),
('Julian', 'Alvarez', 'Forward', 170000, '2000-01-31');

-- Chelsea (15 cầu thủ)
INSERT INTO players (FirstName, LastName, Position, Salary, Birthday) VALUES
('Mason', 'Mount', 'Midfielder', 160000, '1999-01-10'),
('Raheem', 'Sterling', 'Forward', 220000, '1994-12-08'),
('N’Golo', 'Kanté', 'Midfielder', 200000, '1991-03-29'),
('Jorginho', 'Frello', 'Midfielder', 180000, '1991-12-20'),
('Kai', 'Havertz', 'Forward', 210000, '1999-06-11'),
('Christian', 'Pulisic', 'Forward', 190000, '1998-09-18'),
('Thiago', 'Silva', 'Defender', 250000, '1984-09-22'),
('Ben', 'Chilwell', 'Defender', 150000, '1996-12-21'),
('Reece', 'James', 'Defender', 170000, '2000-12-08'),
('Edouard', 'Mendy', 'Goalkeeper', 200000, '1992-03-01'),
('Kepa', 'Arrizabalaga', 'Goalkeeper', 190000, '1994-10-03'),
('César', 'Azpilicueta', 'Defender', 180000, '1989-08-28'),
('Mateo', 'Kovačić', 'Midfielder', 170000, '1994-05-06'),
('Ruben', 'Loftus-Cheek', 'Midfielder', 150000, '1996-01-23'),
('Timo', 'Werner', 'Forward', 230000, '1996-03-06');

-- Tottenham (15 cầu thủ)
INSERT INTO players (FirstName, LastName, Position, Birthday, Salary) 
VALUES 
('Harry', 'Kane', 'Striker', '1993-07-28', 150000),
('Son', 'Heung-min', 'Forward', '1992-07-08', 130000),
('Hugo', 'Lloris', 'Goalkeeper', '1986-12-26', 140000),
('Eric', 'Dier', 'Defender', '1994-01-15', 110000),
('Christian', 'Romero', 'Defender', '1998-04-27', 100000),
('Pierre-Emile', 'Højbjerg', 'Midfielder', '1995-08-05', 120000),
('Dejan', 'Kulusevski', 'Winger', '2000-04-25', 90000),
('Richarlison', '', 'Forward', '1997-05-10', 80000),
('Ivan', 'Perišić', 'Winger', '1989-02-02', 95000),
('Ryan', 'Sessegnon', 'Defender', '2000-05-18', 60000),
('Tanguy', 'Ndombélé', 'Midfielder', '1996-12-28', 85000),
('Oliver', 'Skipp', 'Midfielder', '2000-09-16', 70000),
('Ben', 'Davies', 'Defender', '1993-04-24', 75000),
('Clement', 'Lenglet', 'Defender', '1995-06-17', 90000),
('Emerson', 'Royal', 'Defender', '1999-01-14', 70000);






UPDATE players 
SET Age = TIMESTAMPDIFF(YEAR, Birthday, CURDATE())
WHERE Age IS NULL;





INSERT INTO clubs (ClubID, Name) VALUES
    (1, 'Manchester United'),
    (2, 'Liverpool'),
    (3, 'Arsenal'),
    (4, 'Manchester City'),
    (5, 'Chelsea'),
    (6, 'Tottenham');	


-- Thêm huấn luyện viên cho Manchester United
INSERT INTO coaches (Name, Salary, ExperienceYears, Type) VALUES
('Erik ten Hag', 51000, 11, 'technical'),
('Mitchell van der Gaag', 46000, 9, 'specialized'),
('Steve McClaren', 63000, 19, 'technical');

-- Thêm huấn luyện viên cho Liverpool
INSERT INTO coaches (Name, Salary, ExperienceYears, Type) VALUES
('Jürgen Klopp', 54000, 14, 'technical'),
('Pepijn Lijnders', 49000, 8, 'specialized'),
('Peter Krawietz', 61000, 16, 'technical');

-- Thêm huấn luyện viên cho Arsenal
INSERT INTO coaches (Name, Salary, ExperienceYears, Type) VALUES
('Mikel Arteta', 50000, 10, 'technical'),
('Steve Round', 45000, 8, 'specialized'),
('Carlos Cuesta', 60000, 15, 'technical');

-- Thêm huấn luyện viên cho Man City
INSERT INTO coaches (Name, Salary, ExperienceYears, Type) VALUES
('Pep Guardiola', 55000, 12, 'technical'),
('Juanma Lillo', 47000, 9, 'specialized'),
('Rodolfo Borrell', 65000, 20, 'technical');

-- Thêm huấn luyện viên cho Chelsea
INSERT INTO coaches (Name, Salary, ExperienceYears, Type) VALUES
('Graham Potter', 52000, 10, 'technical'),
('Anthony Barry', 48000, 7, 'specialized'),
('Zsolt Low', 62000, 18, 'technical');

-- Thêm huấn luyện viên cho Tottenham
INSERT INTO coaches (Name, Salary, ExperienceYears, Type) 
VALUES
('Antonio Conte', 80000, 15, 'technical'),
('Cristiano Gatti', 60000, 10, 'specialized'),
('Giuseppe Bergomi', 70000, 12, 'technical');




-- Chèn cầu thủ vào Manchester United (ClubID = 1)
INSERT INTO PlayOfficially (PlayerID, ClubID)
SELECT PlayerID, 1
FROM players
WHERE PlayerID BETWEEN 1 AND 15;
-- Chèn cầu thủ vào Liverpool (ClubID = 2)
INSERT INTO PlayOfficially (PlayerID, ClubID)
SELECT PlayerID, 2
FROM players
WHERE PlayerID BETWEEN 16 AND 30;
-- Chèn cầu thủ vào Arsenal (ClubID = 3)
INSERT INTO PlayOfficially (PlayerID, ClubID)
SELECT PlayerID, 3
FROM players
WHERE PlayerID BETWEEN 31 AND 45;
-- Chèn cầu thủ vào Manchester City (ClubID = 4)
INSERT INTO PlayOfficially (PlayerID, ClubID)
SELECT PlayerID, 4
FROM players
WHERE PlayerID BETWEEN 46 AND 60;
-- Chèn cầu thủ vào Chelsea (ClubID = 5)
INSERT INTO PlayOfficially (PlayerID, ClubID)
SELECT PlayerID, 5
FROM players
WHERE PlayerID BETWEEN 61 AND 75;
-- Chèn cầu thủ vào Tottenham (ClubID = 6)
INSERT INTO PlayOfficially (PlayerID, ClubID)
SELECT PlayerID, 6
FROM players
WHERE PlayerID BETWEEN 76 AND 90;



-- Liên kết huấn luyện viên với câu lạc bộ Arsenal
INSERT INTO coachedby (coachid, ClubID) VALUES
(1, 1),  -- Mikel Arteta cho Arsenal
(2, 1),  -- Steve Round cho Arsenal
(3, 1);  -- Carlos Cuesta cho Arsenal

-- Liên kết huấn luyện viên với câu lạc bộ Man City
INSERT INTO coachedby (coachid, ClubID) VALUES
(4, 2),  -- Pep Guardiola cho Man City
(5, 2),  -- Juanma Lillo cho Man City
(6, 2);  -- Rodolfo Borrell cho Man City

-- Liên kết huấn luyện viên với câu lạc bộ Chelsea
INSERT INTO coachedby (coachid, ClubID) VALUES
(7, 3),  -- Graham Potter cho Chelsea
(8, 3),  -- Anthony Barry cho Chelsea
(9, 3);  -- Zsolt Low cho Chelsea

-- Liên kết huấn luyện viên với câu lạc bộ Manchester United
INSERT INTO coachedby (coachid, ClubID) VALUES
(10, 4),  -- Erik ten Hag cho Manchester United
(11, 4),  -- Mitchell van der Gaag cho Manchester United
(12, 4);  -- Steve McClaren cho Manchester United

-- Liên kết huấn luyện viên với câu lạc bộ Liverpool
INSERT INTO coachedby (coachid, ClubID) VALUES
(13, 5),  -- Jürgen Klopp cho Liverpool
(14, 5),  -- Pepijn Lijnders cho Liverpool
(15, 5);  -- Peter Krawietz cho Liverpool

-- Mối quan hệ giữa huấn luyện viên và câu lạc bộ Tottenham
INSERT INTO coachedby (CoachID, ClubID) 
VALUES
(16, 6), -- Antonio Conte
(17, 6), -- Cristiano Gatti
(18, 6); -- Giuseppe Bergomi


INSERT INTO Referee (Name) VALUES
('Michael Oliver'),
('Anthony Taylor'),
('Mike Dean'),
('Martin Atkinson'),
('Chris Kavanagh'),
('Paul Tierney'),
('Craig Pawson'),
('Stuart Attwell'),
('Andre Marriner'),
('Kevin Friend'),
('Jonathan Moss'),
('Simon Hooper'),
('Peter Bankes'),
('David Coote'),
('Lee Mason'),
('Graham Scott'),
('Robert Jones'),
('Jarred Gillett'),
('Darren England'),
('John Brooks');





INSERT INTO Tournament (Name, StartingDate, EndingDate, ChampionClubId, ScoringMostGoalsPlayerId)
VALUES
    ('English Premier League', '2024-01-10', '2025-03-20', NULL, NULL);




-- Chèn dữ liệu mẫu vào bảng stadiums
INSERT INTO stadiums (Name, Address, Capacity, ClubID)
VALUES
    ('Old Trafford', 'Sir Matt Busby Way, Manchester', 74140, 1), -- Manchester United
    ('Anfield', 'Anfield Rd, Liverpool', 53394, 2),               -- Liverpool
    ('Emirates Stadium', 'Hornsey Rd, London', 60260, 3),         -- Arsenal
    ('Etihad Stadium', 'Ashton New Rd, Manchester', 53400, 4),    -- Manchester City
    ('Stamford Bridge', 'Fulham Rd, London', 40834, 5),           -- Chelsea
    ('Tottenham Hotspur Stadium', 'Tottenham, London', 62850, 6);         -- Tottenham



INSERT INTO DurationOfOfficialPlayer (PlayerID, ClubID, StartDay, EndDay)
VALUES
    -- Manchester United (15 players)
    (1, 1, '2024-01-01', '2025-03-20'),
    (2, 1, '2024-01-01', '2025-03-20'),
    (3, 1, '2024-01-01', '2025-03-20'),
    (4, 1, '2024-01-01', '2025-03-20'),
    (5, 1, '2024-01-01', '2025-03-20'),
    (6, 1, '2024-01-01', '2025-03-20'),
    (7, 1, '2024-01-01', '2025-03-20'),
    (8, 1, '2024-01-01', '2025-03-20'),
    (9, 1, '2024-01-01', '2025-03-20'),
    (10, 1, '2024-01-01', '2025-03-20'),
    (11, 1, '2024-01-01', '2025-03-20'),
    (12, 1, '2024-01-01', '2025-03-20'),
    (13, 1, '2024-01-01', '2025-03-20'),
    (14, 1, '2024-01-01', '2025-03-20'),
    (15, 1, '2024-01-01', '2025-03-20'),

    -- Liverpool (15 players)
    (16, 2, '2024-01-01', '2025-03-20'),
    (17, 2, '2024-01-01', '2025-03-20'),
    (18, 2, '2024-01-01', '2025-03-20'),
    (19, 2, '2024-01-01', '2025-03-20'),
    (20, 2, '2024-01-01', '2025-03-20'),
    (21, 2, '2024-01-01', '2025-03-20'),
    (22, 2, '2024-01-01', '2025-03-20'),
    (23, 2, '2024-01-01', '2025-03-20'),
    (24, 2, '2024-01-01', '2025-03-20'),
    (25, 2, '2024-01-01', '2025-03-20'),
    (26, 2, '2024-01-01', '2025-03-20'),
    (27, 2, '2024-01-01', '2025-03-20'),
    (28, 2, '2024-01-01', '2025-03-20'),
    (29, 2, '2024-01-01', '2025-03-20'),
    (30, 2, '2024-01-01', '2025-03-20'),

    -- Arsenal (15 players)
    (31, 3, '2024-01-01', '2025-03-20'),
    (32, 3, '2024-01-01', '2025-03-20'),
    (33, 3, '2024-01-01', '2025-03-20'),
    (34, 3, '2024-01-01', '2025-03-20'),
    (35, 3, '2024-01-01', '2025-03-20'),
    (36, 3, '2024-01-01', '2025-03-20'),
    (37, 3, '2024-01-01', '2025-03-20'),
    (38, 3, '2024-01-01', '2025-03-20'),
    (39, 3, '2024-01-01', '2025-03-20'),
    (40, 3, '2024-01-01', '2025-03-20'),
    (41, 3, '2024-01-01', '2025-03-20'),
    (42, 3, '2024-01-01', '2025-03-20'),
    (43, 3, '2024-01-01', '2025-03-20'),
    (44, 3, '2024-01-01', '2025-03-20'),
    (45, 3, '2024-01-01', '2025-03-20'),

    -- Manchester City (15 players)
    (46, 4, '2024-01-01', '2025-03-20'),
    (47, 4, '2024-01-01', '2025-03-20'),
    (48, 4, '2024-01-01', '2025-03-20'),
    (49, 4, '2024-01-01', '2025-03-20'),
    (50, 4, '2024-01-01', '2025-03-20'),
    (51, 4, '2024-01-01', '2025-03-20'),
    (52, 4, '2024-01-01', '2025-03-20'),
    (53, 4, '2024-01-01', '2025-03-20'),
    (54, 4, '2024-01-01', '2025-03-20'),
    (55, 4, '2024-01-01', '2025-03-20'),
    (56, 4, '2024-01-01', '2025-03-20'),
    (57, 4, '2024-01-01', '2025-03-20'),
    (58, 4, '2024-01-01', '2025-03-20'),
    (59, 4, '2024-01-01', '2025-03-20'),
    (60, 4, '2024-01-01', '2025-03-20'),

    -- Chelsea (15 players)
    (61, 5, '2024-01-01', '2025-03-20'),
    (62, 5, '2024-01-01', '2025-03-20'),
    (63, 5, '2024-01-01', '2025-03-20'),
    (64, 5, '2024-01-01', '2025-03-20'),
    (65, 5, '2024-01-01', '2025-03-20'),
    (66, 5, '2024-01-01', '2025-03-20'),
    (67, 5, '2024-01-01', '2025-03-20'),
    (68, 5, '2024-01-01', '2025-03-20'),
    (69, 5, '2024-01-01', '2025-03-20'),
    (70, 5, '2024-01-01', '2025-03-20'),
    (71, 5, '2024-01-01', '2025-03-20'),
    (72, 5, '2024-01-01', '2025-03-20'),
    (73, 5, '2024-01-01', '2025-03-20'),
    (74, 5, '2024-01-01', '2025-03-20'),
    (75, 5, '2024-01-01', '2025-03-20'),

    -- Tottenham (15 players)
    (76, 6, '2024-01-01', '2025-03-20'),
    (77, 6, '2024-01-01', '2025-03-20'),
    (78, 6, '2024-01-01', '2025-03-20'),
    (79, 6, '2024-01-01', '2025-03-20'),
    (80, 6, '2024-01-01', '2025-03-20'),
    (81, 6, '2024-01-01', '2025-03-20'),
    (82, 6, '2024-01-01', '2025-03-20'),
    (83, 6, '2024-01-01', '2025-03-20'),
    (84, 6, '2024-01-01', '2025-03-20'),
    (85, 6, '2024-01-01', '2025-03-20'),
    (86, 6, '2024-01-01', '2025-03-20'),
    (87, 6, '2024-01-01', '2025-03-20'),
    (88, 6, '2024-01-01', '2025-03-20'),
    (89, 6, '2024-01-01', '2025-03-20'),
    (90, 6, '2024-01-01', '2025-03-20');




INSERT INTO Trains (SuperviseeNumber, SupervisorNumber)
VALUES
    -- Players in Club 1 (1–15)
    (1, 2),  -- Player 1 is trained by Player 2
    (3, 4),  -- Player 3 is trained by Player 4
    (5, 6),  -- Player 5 is trained by Player 6

    -- Players in Club 2 (16–30)
    (16, 17),  -- Player 16 is trained by Player 17
    (18, 19),  -- Player 18 is trained by Player 19
    (20, 21),  -- Player 20 is trained by Player 21

    -- Players in Club 3 (31–45)
    (31, 32),  -- Player 31 is trained by Player 32
    (33, 34),  -- Player 33 is trained by Player 34
    (35, 36),  -- Player 35 is trained by Player 36

    -- Players in Club 4 (46–60)
    (46, 47),  -- Player 46 is trained by Player 47
    (48, 49),  -- Player 48 is trained by Player 49
    (50, 51),  -- Player 50 is trained by Player 51

    -- Players in Club 5 (61–75)
    (61, 62),  -- Player 61 is trained by Player 62
    (63, 64),  -- Player 63 is trained by Player 64
    (65, 66),  -- Player 65 is trained by Player 66

    -- Players in Club 6 (76–90)
    (76, 77),  -- Player 61 is trained by Player 62
    (78, 79),  -- Player 63 is trained by Player 64
    (80, 81);  -- Player 65 is trained by Player 66

-- Matches

INSERT INTO Matches (Date, AdditionalTime, TournamentID)
VALUES
('2024-01-20', 3, 1), -- Match 1
('2024-01-20', 2, 1), -- Match 2
('2024-01-20', 4, 1); -- Match 3

-- Round 1 (Matches 1, 2, 3)
INSERT INTO IsControlledBy (MatchID, RefereeID, Position) VALUES
(1, 1, 'Main Referee'),      -- Michael Oliver
(1, 2, 'Assistant Referee'), -- Anthony Taylor
(1, 3, 'Assistant Referee'), -- Mike Dean

(2, 4, 'Main Referee'),      -- Martin Atkinson
(2, 5, 'Assistant Referee'), -- Chris Kavanagh
(2, 6, 'Assistant Referee'), -- Paul Tierney

(3, 7, 'Main Referee'),      -- Craig Pawson
(3, 8, 'Assistant Referee'), -- Stuart Attwell
(3, 9, 'Assistant Referee'); -- Andre Marriner



-- Participates

-- Match 1: Manchester United vs Liverpool
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(1, 1, TRUE),  -- Manchester United (Home)
(1, 2, FALSE); -- Liverpool (Away)

-- Match 2: Arsenal vs Chelsea
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(2, 3, TRUE),  -- Arsenal (Home)
(2, 5, FALSE); -- Chelsea (Away)

-- Match 3: Manchester City vs Tottenham
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(3, 4, TRUE),  -- Manchester City (Home)
(3, 6, FALSE); -- Tottenham (Away)


-- Match1
-- Club1: MU
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(1, 1, TRUE, 'Goalkeeper', NULL, FALSE),  
(2, 1, TRUE, 'Defender', NULL, FALSE),  
(9, 1, TRUE, 'Defender', NULL, FALSE),  
(3, 1, TRUE, 'Midfielder', NULL, FALSE), 
(4, 1, TRUE, 'Midfielder', NULL, TRUE),  
-- Bench
(10, 1, FALSE, 'Defender', NULL, FALSE),  
(11, 1, FALSE, 'Defender', NULL, FALSE),
(12, 1, FALSE, 'Midfielder', NULL, FALSE), 
(14, 1, FALSE, 'Midfielder', NULL, FALSE),
(6, 1, FALSE, 'Forward', NULL, FALSE); 
-- Club2: Liverpool
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(20, 1, TRUE, 'Goalkeeper', NULL, FALSE),  
(17, 1, TRUE, 'Defender', NULL, TRUE),  
(19, 1, TRUE, 'Defender', NULL, FALSE),  
(23, 1, TRUE, 'Midfielder', NULL, FALSE), 
(16, 1, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(26, 1, FALSE, 'Defender', NULL, FALSE),  
(24, 1, FALSE, 'Midfielder', NULL, FALSE),
(25, 1, FALSE, 'Midfielder', NULL, FALSE), 
(27, 1, FALSE, 'Forward', NULL, FALSE),
(30, 1, FALSE, 'Forward', NULL, FALSE);  
-- Match2
-- Club3: Arsenal
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(41, 2, TRUE, 'Goalkeeper', NULL, FALSE),  
(39, 2, TRUE, 'Defender', NULL, FALSE),  
(40, 2, TRUE, 'Defender', NULL, FALSE),  
(34, 2, TRUE, 'Midfielder', NULL, TRUE), 
(32, 2, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(42, 2, FALSE, 'Defender', NULL, FALSE),  
(43, 2, FALSE, 'Defender', NULL, FALSE),
(35, 2, FALSE, 'Midfielder', NULL, FALSE), 
(36, 2, FALSE, 'Midfielder', NULL, FALSE),
(37, 2, FALSE, 'Forward', NULL, FALSE);  
-- Match2
-- Club5: Chelsea
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(70, 2, TRUE, 'Goalkeeper', NULL, FALSE),  
(67, 2, TRUE, 'Defender', NULL, TRUE),  
(68, 2, TRUE, 'Defender', NULL, FALSE),  
(61, 2, TRUE, 'Midfielder', NULL, FALSE), 
(62, 2, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(69, 2, FALSE, 'Defender', NULL, FALSE),  
(73, 2, FALSE, 'Midfielder', NULL, FALSE),
(74, 2, FALSE, 'Midfielder', NULL, FALSE), 
(65, 2, FALSE, 'Forward', NULL, FALSE),
(75, 2, FALSE, 'Forward', NULL, FALSE);  
-- Match3
-- Club4: MC
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(56, 3, TRUE, 'Goalkeeper', NULL, FALSE),  
(49, 3, TRUE, 'Defender', NULL, TRUE),  
(54, 3, TRUE, 'Defender', NULL, FALSE),  
(46, 3, TRUE, 'Midfielder', NULL, FALSE), 
(47, 3, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(58, 3, FALSE, 'Defender', NULL, FALSE),  
(55, 3, FALSE, 'Defender', NULL, FALSE),
(51, 3, FALSE, 'Midfielder', NULL, FALSE), 
(53, 3, FALSE, 'Midfielder', NULL, FALSE),
(60, 3, FALSE, 'Forward', NULL, FALSE);  
-- Match3
-- Club4: Tottenham
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(78, 3, TRUE, 'Goalkeeper', NULL, FALSE),  
(79, 3, TRUE, 'Defender', NULL, TRUE),  
(80, 3, TRUE, 'Defender', NULL, FALSE),  
(81, 3, TRUE, 'Midfielder', NULL, FALSE), 
(76, 3, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(89, 3, FALSE, 'Defender', NULL, FALSE),  
(88, 3, FALSE, 'Defender', NULL, FALSE),
(86, 3, FALSE, 'Midfielder', NULL, FALSE), 
(87, 3, FALSE, 'Midfielder', 85, FALSE),
(83, 3, FALSE, 'Forward', NULL, FALSE);


-- Goal
-- Manchester United vs Liverpool
INSERT INTO Goal (MatchID, Ordinal, Type, PlayerID, Minute)
VALUES
(1, 1, 'Header', 4, 10),    -- Bruno Fernandes ghi bàn bằng đầu
(1, 2, 'Penalty', 16, 22),   -- Ronaldo ghi bàn từ chấm phạt đền
(1, 3, 'Open Play', 16, 67); -- Mohamed Salah ghi bàn trong tình huống mở

-- Arsenal vs Chelsea
INSERT INTO Goal (MatchID, Ordinal, Type, PlayerID, Minute)
VALUES
(2, 1, 'Free Kick', 35, 25), -- Kevin De Bruyne ghi bàn từ cú đá phạt
(2, 2, 'Own Goal', 39, 18);  -- Ben White phản lưới nhà

-- Manchester City vs Tottenham
INSERT INTO Goal (MatchID, Ordinal, Type, PlayerID, Minute)
VALUES
(3, 1, 'Open Play', 47, 45);-- Erling Haaland ghi bàn

-- Match 1: Manchester United vs Liverpool
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(1, 1, 60, 9, TRUE),  -- Player 10 substituted out at 60th minute
(1, 1, 60, 10, FALSE), -- Player 11 substituted in at 69th minute
(1, 1, 75, 23, TRUE),  -- Player 14 substituted out at 75th minute
(1, 1, 75, 24, FALSE),  -- Player 14 substituted out at 75th minute
(1, 2, 78, 3, TRUE),  -- Player 14 substituted out at 75th minute
(1, 2, 78, 14, FALSE);  -- Player 14 substituted out at 75th minute

-- Match 2: Arsenal vs Chelsea
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(2, 1, 65, 40, TRUE),  -- Player 35 substituted out at 65th minute
(2, 1, 65, 35, FALSE); -- Player 43 substituted in at 70th minute

-- Match 3: Manchester City vs Tottenham
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(3, 1, 50, 78, TRUE),  -- Player 47 substituted out at 50th minute
(3, 1, 50, 88, FALSE), -- Player 60 substituted in at 60th minute
(3, 2, 60, 79, TRUE),  -- Player 47 substituted out at 50th minute
(3, 2, 60, 87, FALSE), -- Player 60 substituted in at 60th minute
(3, 1, 50, 54, TRUE),  -- Player 47 substituted out at 50th minute
(3, 1, 50, 55, FALSE), -- Player 60 substituted in at 60th minute
(3, 2, 50, 47, TRUE),  -- Player 47 substituted out at 50th minute
(3, 2, 50, 60, FALSE); -- Player 60 substituted in at 60th minute

-- ////////////////////////////////////////////////////////////


INSERT INTO Matches (Date, AdditionalTime, TournamentID)
VALUES
('2024-01-27', 5, 1), -- Match 4
('2024-01-27', 2, 1), -- Match 5
('2024-01-27', 3, 1); -- Match 6

-- Round 2 (Matches 4, 5, 6)
INSERT INTO IsControlledBy (MatchID, RefereeID, Position) VALUES
(4, 10, 'Main Referee'),     -- Kevin Friend
(4, 11, 'Assistant Referee'),-- Jonathan Moss
(4, 12, 'Assistant Referee'),-- Simon Hooper

(5, 13, 'Main Referee'),     -- Peter Bankes
(5, 14, 'Assistant Referee'),-- David Coote
(5, 15, 'Assistant Referee'),-- Lee Mason

(6, 16, 'Main Referee'),     -- Graham Scott
(6, 17, 'Assistant Referee'),-- Robert Jones
(6, 18, 'Assistant Referee');-- Jarred Gillett



-- Match 4: Arsenal vs MU
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(4, 3, TRUE),  -- Manchester United (Home)
(4, 1, FALSE); -- Liverpool (Away)

-- Match 5: Liver vs MC
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(5, 2, TRUE),  -- Arsenal (Home)
(5, 4, FALSE); -- Chelsea (Away)

-- Match 6: Chel vs Tottenham
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(6, 5, TRUE),  -- Manchester City (Home)
(6, 6, FALSE); -- Tottenham (Away)



-- Match4: Arsenal vs MU
-- Club1: Arsenal
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(41, 4, TRUE, 'Goalkeeper', NULL, FALSE),  
(39, 4, TRUE, 'Defender', NULL, FALSE),  
(42, 4, TRUE, 'Defender', NULL, FALSE),  
(34, 4, TRUE, 'Midfielder', NULL, TRUE), 
(37, 4, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(40, 4, FALSE, 'Defender', NULL, FALSE),  
(43, 4, FALSE, 'Defender', NULL, FALSE),
(35, 4, FALSE, 'Midfielder', NULL, FALSE), 
(36, 4, FALSE, 'Midfielder', NULL, FALSE),
(32, 4, FALSE, 'Forward', NULL, FALSE);  

-- Club2: MU
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(1, 4, TRUE, 'Goalkeeper', NULL, FALSE),  
(2, 4, TRUE, 'Defender', NULL, FALSE),  
(10, 4, TRUE, 'Defender', NULL, FALSE),  
(12, 4, TRUE, 'Midfielder', NULL, FALSE), 
(4, 4, TRUE, 'Midfielder', NULL, TRUE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(9, 4, FALSE, 'Defender', NULL, FALSE),  
(11, 4, FALSE, 'Defender', 90, FALSE),
(3, 4, FALSE, 'Midfielder', NULL, FALSE), 
(14, 4, FALSE, 'Midfielder', NULL, FALSE),
(6, 4, FALSE, 'Forward', NULL, FALSE); 

-- Match5: Liverpool vs MC
-- Club1: Liverpool
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(20, 5, TRUE, 'Goalkeeper', NULL, FALSE),  
(17, 5, TRUE, 'Defender', NULL, TRUE),  
(19, 5, TRUE, 'Defender', NULL, FALSE),  
(25, 5, TRUE, 'Midfielder', NULL, FALSE), 
(30, 5, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(26, 5, FALSE, 'Defender', NULL, FALSE),  
(24, 5, FALSE, 'Midfielder', NULL, FALSE),
(23, 5, FALSE, 'Midfielder', NULL, FALSE), 
(27, 5, FALSE, 'Forward', NULL, FALSE),
(16, 5, FALSE, 'Forward', NULL, FALSE);  

-- Club2: MC
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(56, 5, TRUE, 'Goalkeeper', NULL, FALSE),  
(49, 5, TRUE, 'Defender', NULL, TRUE),  
(54, 5, TRUE, 'Defender', NULL, FALSE),  
(51, 5, TRUE, 'Midfielder', NULL, FALSE), 
(47, 5, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(58, 5, FALSE, 'Defender', NULL, FALSE),  
(55, 5, FALSE, 'Defender', NULL, FALSE),
(46, 5, FALSE, 'Midfielder', NULL, FALSE), 
(53, 5, FALSE, 'Midfielder', NULL, FALSE),
(60, 5, FALSE, 'Forward', NULL, FALSE);  

-- Match6: Chelsea vs Tottenham
-- Club1: Chelsea
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(70, 6, TRUE, 'Goalkeeper', NULL, FALSE),  
(67, 6, TRUE, 'Defender', NULL, TRUE),  
(68, 6, TRUE, 'Defender', NULL, FALSE),  
(73, 6, TRUE, 'Midfielder', NULL, FALSE), 
(65, 6, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(69, 6, FALSE, 'Defender', NULL, FALSE),  
(61, 6, FALSE, 'Midfielder', NULL, FALSE),
(74, 6, FALSE, 'Midfielder', NULL, FALSE), 
(62, 6, FALSE, 'Forward', NULL, FALSE),
(75, 6, FALSE, 'Forward', NULL, FALSE);  

-- Club2: Tottenham
-- Main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(78, 6, TRUE, 'Goalkeeper', NULL, FALSE),  
(79, 6, TRUE, 'Defender', NULL, TRUE),  
(80, 6, TRUE, 'Defender', NULL, FALSE),  
(87, 6, TRUE, 'Midfielder', NULL, FALSE), 
(76, 6, TRUE, 'Forward', NULL, FALSE);  
-- Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(89, 6, FALSE, 'Defender', NULL, FALSE),  
(88, 6, FALSE, 'Defender', NULL, FALSE),
(86, 6, FALSE, 'Midfielder', NULL, FALSE), 
(81, 6, FALSE, 'Midfielder', NULL, FALSE),
(83, 6, FALSE, 'Forward', NULL, FALSE);  



-- Goal
-- Arsenal vs MU
INSERT INTO Goal (MatchID, Ordinal, Type, PlayerID, Minute)
VALUES
(4, 1, 'Header', 10, 22),   -- Bruno Fernandes ghi bàn bằng đầu
(4, 2, 'Own Goal', 2, 44);  -- Ben White phản lưới nhà


-- Liver vs MC
INSERT INTO Goal (MatchID, Ordinal, Type, PlayerID, Minute)
VALUES
(5, 1, 'Free Kick', 25, 19); -- Kevin De Bruyne ghi bàn từ cú đá phạt

-- Arsenal thay người
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES 
(4, 1, 55, 34, TRUE),  -- Midfielder OUT
(4, 1, 55, 35, FALSE), -- Midfielder IN
(4, 2, 65, 37, TRUE),  -- Forward OUT
(4, 2, 65, 32, FALSE), -- Forward IN
(4, 3, 75, 39, TRUE),  -- Defender OUT
(4, 3, 75, 40, FALSE); -- Defender IN

-- MU thay người
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES 
(4, 1, 50, 2, TRUE),  -- Midfielder OUT
(4, 1, 50, 3, FALSE),  -- Midfielder IN
(4, 2, 70, 4, TRUE),   -- Midfielder OUT
(4, 2, 70, 14, FALSE), -- Midfielder IN
(4, 3, 85, 10, TRUE),  -- Defender OUT
(4, 3, 85, 11, FALSE); -- Defender IN

-- Liverpool thay người
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES 
(5, 1, 60, 25, TRUE),  -- Midfielder OUT
(5, 1, 60, 23, FALSE), -- Midfielder IN
(5, 2, 70, 30, TRUE),  -- Forward OUT
(5, 2, 70, 27, FALSE), -- Forward IN
(5, 3, 80, 19, TRUE),  -- Defender OUT
(5, 3, 80, 26, FALSE); -- Defender IN

-- MC thay người
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES 
(5, 1, 55, 51, TRUE),  -- Midfielder OUT
(5, 1, 55, 46, FALSE), -- Midfielder IN
(5, 2, 75, 47, TRUE),  -- Forward OUT
(5, 2, 75, 60, FALSE), -- Forward IN
(5, 3, 85, 54, TRUE),  -- Defender OUT
(5, 3, 85, 58, FALSE); -- Defender IN

-- Chelsea thay người
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES 
(6, 1, 50, 73, TRUE),  -- Midfielder OUT
(6, 1, 50, 61, FALSE), -- Midfielder IN
(6, 2, 65, 65, TRUE),  -- Forward OUT
(6, 2, 65, 62, FALSE), -- Forward IN
(6, 3, 80, 67, TRUE),  -- Defender OUT
(6, 3, 80, 69, FALSE); -- Defender IN

-- Tottenham thay người
INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES 
(6, 1, 60, 87, TRUE),  -- Midfielder OUT
(6, 1, 60, 81, FALSE), -- Midfielder IN
(6, 2, 75, 76, TRUE),  -- Forward OUT
(6, 2, 75, 83, FALSE), -- Forward IN
(6, 3, 85, 79, TRUE),  -- Defender OUT
(6, 3, 85, 88, FALSE); -- Defender IN

-- Yellow card
INSERT INTO YellowCard (PlayerID, MatchID, YellowCardTime)
VALUES 
(12, 4, 15);  -- Thẻ vàng đầu tiên ở phút 15
-- Yellow card
INSERT INTO YellowCard (PlayerID, MatchID, YellowCardTime)
VALUES 
(12, 4, 50);  -- Thẻ vàng đầu tiên ở phút 15
-- Yellow card
INSERT INTO YellowCard (PlayerID, MatchID, YellowCardTime)
VALUES 
(51, 5, 30);  -- Thẻ vàng đầu tiên ở phút 15

-- ////////////////////////////////////////////////////////////
INSERT INTO Matches (Date, AdditionalTime, TournamentID)
VALUES
('2024-02-03', 4, 1), -- Match 7
('2024-02-03', 1, 1), -- Match 8
('2024-02-03', 3, 1); -- Match 9

-- Round 3 (Matches 7, 8, 9)
INSERT INTO IsControlledBy (MatchID, RefereeID, Position) VALUES
(7, 19, 'Main Referee'),     -- Darren England
(7, 1, 'Assistant Referee'), -- Michael Oliver
(7, 2, 'Assistant Referee'), -- Anthony Taylor

(8, 3, 'Main Referee'),      -- Mike Dean
(8, 4, 'Assistant Referee'), -- Martin Atkinson
(8, 5, 'Assistant Referee'), -- Chris Kavanagh

(9, 6, 'Main Referee'),      -- Paul Tierney
(9, 7, 'Assistant Referee'), -- Craig Pawson
(9, 8, 'Assistant Referee'); -- Stuart Attwell


-- Match 7: MU vs MC
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(7, 1, TRUE),  -- Manchester United (Home)
(7, 4, FALSE); -- MC

-- Match 2: Liver vs Chel
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(8, 2, TRUE),  -- Liver
(8, 5, FALSE); -- Chelsea (Away)

-- Match 3: Ars vs Tot
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(9, 3, TRUE),  -- Arsenal
(9, 6, FALSE); -- Tottenham (Away)
-- Match7: MU vs MC
-- MU main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(1, 7, TRUE, 'Goalkeeper', NULL, FALSE),
(2, 7, TRUE, 'Defender', NULL, TRUE),
(10, 7, TRUE, 'Defender', NULL, FALSE),
(4, 7, TRUE, 'Midfielder', NULL, FALSE),
(5, 7, TRUE, 'Forward', NULL, FALSE);
-- MU Bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(9, 7, FALSE, 'Defender', NULL, FALSE),
(3, 7, FALSE, 'Midfielder', NULL, FALSE),
(14, 7, FALSE, 'Midfielder', NULL, FALSE),
(6, 7, FALSE, 'Forward', NULL, FALSE),
(7, 7, FALSE, 'Forward', NULL, FALSE);
-- MC main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(56, 7, TRUE, 'Goalkeeper', NULL, FALSE),
(49, 7, TRUE, 'Defender', NULL, TRUE),
(54, 7, TRUE, 'Defender', NULL, FALSE),
(51, 7, TRUE, 'Midfielder', NULL, FALSE),
(47, 7, TRUE, 'Forward', NULL, FALSE);
-- MC bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(58, 7, FALSE, 'Defender', NULL, FALSE),
(55, 7, FALSE, 'Defender', NULL, FALSE),
(46, 7, FALSE, 'Midfielder', NULL, FALSE),
(53, 7, FALSE, 'Midfielder', NULL, FALSE),
(60, 7, FALSE, 'Forward', NULL, FALSE);
-- Match 8: Liver vs Chel
-- Liver main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(20, 8, TRUE, 'Goalkeeper', NULL, FALSE),
(17, 8, TRUE, 'Defender', NULL, TRUE),
(19, 8, TRUE, 'Defender', NULL, FALSE),
(25, 8, TRUE, 'Midfielder', NULL, FALSE),
(30, 8, TRUE, 'Forward', NULL, FALSE);
-- Liver bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(26, 8, FALSE, 'Defender', NULL, FALSE),
(24, 8, FALSE, 'Midfielder', NULL, FALSE),
(23, 8, FALSE, 'Midfielder', NULL, FALSE),
(27, 8, FALSE, 'Forward', NULL, FALSE),
(16, 8, FALSE, 'Forward', NULL, FALSE);
-- Chel main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(70, 8, TRUE, 'Goalkeeper', NULL, FALSE),
(67, 8, TRUE, 'Defender', 73, TRUE),
(68, 8, TRUE, 'Defender', NULL, FALSE),
(73, 8, TRUE, 'Midfielder', NULL, FALSE),
(65, 8, TRUE, 'Forward', NULL, FALSE);
-- Chel bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(69, 8, FALSE, 'Defender', NULL, FALSE),
(61, 8, FALSE, 'Midfielder', NULL, FALSE),
(74, 8, FALSE, 'Midfielder', NULL, FALSE),
(62, 8, FALSE, 'Forward', NULL, FALSE),
(75, 8, FALSE, 'Forward', NULL, FALSE);

-- Match 9: Arsenal vs Tot
-- Arsenal main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(41, 9, TRUE, 'Goalkeeper', NULL, FALSE),
(39, 9, TRUE, 'Defender', NULL, TRUE),
(42, 9, TRUE, 'Defender', NULL, FALSE),
(34, 9, TRUE, 'Midfielder', NULL, FALSE),
(37, 9, TRUE, 'Forward', NULL, FALSE);
-- Arsenal bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(40, 9, FALSE, 'Defender', NULL, FALSE),
(43, 9, FALSE, 'Defender', NULL, FALSE),
(35, 9, FALSE, 'Midfielder', NULL, FALSE),
(36, 9, FALSE, 'Midfielder', NULL, FALSE),
(32, 9, FALSE, 'Forward', 87, FALSE);
-- Tot main
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(78, 9, TRUE, 'Goalkeeper', NULL, FALSE),
(79, 9, TRUE, 'Defender', NULL, TRUE),
(80, 9, TRUE, 'Defender', NULL, FALSE),
(87, 9, TRUE, 'Midfielder', 60, FALSE),
(76, 9, TRUE, 'Forward', NULL, FALSE);
-- Tot bench
INSERT INTO PlaysIn (PlayerID, MatchID, IsMain, Position, RedCardTime, IsLeader)
VALUES
(89, 9, FALSE, 'Defender', NULL, FALSE),
(88, 9, FALSE, 'Defender', NULL, FALSE),
(86, 9, FALSE, 'Midfielder', NULL, FALSE),
(81, 9, FALSE, 'Midfielder', NULL, FALSE),
(83, 9, FALSE, 'Forward', NULL, FALSE);

-- MU vs Man City
INSERT INTO Goal (MatchID, Ordinal, Type, PlayerID, Minute)
VALUES
(7, 1, 'Header', 10, 25),   -- Bruno Fernandes ghi bàn bằng đầu
(7, 2, 'Own Goal', 51, 39); -- John Stones phản lưới nhà

-- Liverpool vs Chelsea
INSERT INTO Goal (MatchID, Ordinal, Type, PlayerID, Minute)
VALUES
(8, 1, 'Free Kick', 25, 22); -- Mohamed Salah ghi bàn từ cú đá phạt

-- Arsenal vs Tottenham
INSERT INTO Goal (MatchID, Ordinal, Type, PlayerID, Minute)
VALUES
(9, 1, 'Penalty', 34, 10),   -- Martin Ødegaard ghi bàn từ chấm penalty
(9, 2, 'Volley', 76, 20);    -- Harry Kane ghi bàn bằng cú volley


INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(7, 1, 60, 4, TRUE),  -- Midfielder OUT
(7, 1, 60, 14, FALSE), -- Midfielder IN
(7, 2, 75, 5, TRUE),  -- Forward OUT
(7, 2, 75, 6, FALSE), -- Forward IN
(7, 3, 85, 10, TRUE), -- Defender OUT
(7, 3, 85, 9, FALSE); -- Defender IN


INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(7, 1, 55, 51, TRUE),  -- Midfielder OUT
(7, 1, 55, 46, FALSE), -- Midfielder IN
(7, 2, 70, 47, TRUE),  -- Forward OUT
(7, 2, 70, 60, FALSE), -- Forward IN
(7, 3, 80, 54, TRUE),  -- Defender OUT
(7, 3, 80, 58, FALSE); -- Defender IN


INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(8, 1, 60, 25, TRUE),  -- Midfielder OUT
(8, 1, 60, 24, FALSE), -- Midfielder IN
(8, 2, 75, 30, TRUE),  -- Forward OUT
(8, 2, 75, 27, FALSE), -- Forward IN
(8, 3, 85, 19, TRUE),  -- Defender OUT
(8, 3, 85, 26, FALSE); -- Defender IN

INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(8, 1, 55, 73, TRUE),  -- Midfielder OUT
(8, 1, 55, 61, FALSE), -- Midfielder IN
(8, 2, 70, 65, TRUE),  -- Forward OUT
(8, 2, 70, 75, FALSE), -- Forward IN
(8, 3, 80, 68, TRUE),  -- Defender OUT
(8, 3, 80, 69, FALSE); -- Defender IN

INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(9, 1, 65, 34, TRUE),  -- Midfielder OUT
(9, 1, 65, 35, FALSE), -- Midfielder IN
(9, 2, 75, 37, TRUE),  -- Forward OUT
(9, 2, 75, 32, FALSE), -- Forward IN
(9, 3, 85, 42, TRUE),  -- Defender OUT
(9, 3, 85, 40, FALSE); -- Defender IN

INSERT INTO Substitute (MatchID, Ordinal, Minute, PlayerID, IsOut)
VALUES
(9, 1, 55, 79, TRUE),  -- Midfielder OUT
(9, 1, 55, 81, FALSE), -- Midfielder IN
(9, 2, 70, 76, TRUE),  -- Forward OUT
(9, 2, 70, 83, FALSE), -- Forward IN
(9, 3, 80, 80, TRUE),  -- Defender OUT
(9, 3, 80, 88, FALSE); -- Defender IN

-- Yellow card
INSERT INTO YellowCard (PlayerID, MatchID, YellowCardTime)
VALUES 
(25, 8, 10);  -- Thẻ vàng đầu tiên ở phút 10
INSERT INTO YellowCard (PlayerID, MatchID, YellowCardTime)
VALUES 
(25, 8, 20);  -- Thẻ vàng đầu tiên ở phút 20
-- Yellow card
INSERT INTO YellowCard (PlayerID, MatchID, YellowCardTime)
VALUES 
(65, 8, 12);  -- Thẻ vàng đầu tiên ở phút 12

INSERT INTO PlayAsLoanPlayer (PlayerID, ClubID)
VALUES
(52, 1),  -- Cầu thủ 52 chơi cho CLB 1
(8, 4);   -- Cầu thủ 8 chơi cho CLB 4

INSERT INTO DurationOfLoanPlayer (PlayerID, ClubID, StartDay, EndDay)
VALUES
(52, 1, '2024-02-10', '2025-01-01'),  -- Cầu thủ 52, CLB 1, thời gian 3/2/2021 đến 20/3/2021
(8, 4, '2024-02-10', '2025-01-01');   -- Cầu thủ 8, CLB 4, thời gian 3/2/2021 đến 20/3/2021

-- ////////////////////////////////////////////////////////////
INSERT INTO Matches (Date, AdditionalTime, TournamentID)
VALUES
('2024-12-20', NULL, 1), -- Match 10
('2024-12-20', NULL, 1), -- Match 11
('2024-12-20', NULL, 1); -- Match 12


-- Match 10: Chelsea vs MU
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(10, 5, TRUE),  -- Chelsea (Home)
(10, 1, FALSE); -- MU

-- Match 11: MC vs Arsenal
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(11, 4, TRUE),  -- MC
(11, 3, FALSE); -- Arsenal

-- Match 12: Tot vs Liver
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(12, 6, TRUE),  -- Tot
(12, 2, FALSE); -- Liver (Away)

-- ////////////////////////////////////////////////////////////
INSERT INTO Matches (Date, AdditionalTime, TournamentID)
VALUES
('2024-12-27', NULL, 1), -- Match 13
('2024-12-27', NULL, 1), -- Match 14
('2024-12-27', NULL, 1); -- Match 15


-- Match 13: Tot vs MU
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(13, 6, TRUE),  -- Tot
(13, 1, FALSE); -- MU

-- Match 14: Liver vs Arsenal
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(14, 2, TRUE),  -- Liver
(14, 3, FALSE); -- Arsenal

-- Match 15: Chelsea vs MC
INSERT INTO Participate (MatchID, ClubID, IsHome)
VALUES
(15, 5, TRUE),  -- Chelsea
(15, 4, FALSE); -- MC


