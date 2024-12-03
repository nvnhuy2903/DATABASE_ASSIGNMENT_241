const mysql = require('mysql2');

// Cấu hình kết nối MySQL
const con = mysql.createConnection({
  host: 'nhathuy-mysql-server-cr10.mysql.database.azure.com',    
  user: 'nhathuy123',          
  password: 'Toilaai123.',         
  database: 'btl_csdl_official' 
});

// Kết nối đến MySQL
con.connect(function(err) {
    if (err) {
        console.error('Lỗi kết nối: ' + err.stack);
        return;
    }
    console.log('Đã kết nối với MySQL ');
});

async function getYellow(id) {
    return new Promise((resolve, reject) => { 
        const query='SELECT GetYellowCardCount(?) as a';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0].a); 
        });
    });
}

async function getRed(id) {
    return new Promise((resolve, reject) => { 
        const query='SELECT GetRedCardCount(?) as a';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0].a); 
        });
    });
}

async function getGoal(id) {
    return new Promise((resolve, reject) => { 
        const query = 'SELECT GetGoals(?) AS goal';  // Sử dụng tham số '?' trong query
        con.query(query, [id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err);  
            }
            // In ra tổng lương trả về từ function
            resolve(result[0].goal);  
        });
    });
}


async function getInformation(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetPlayerInfo(?)';  // Sử dụng tham số '?' trong query
        con.query(query, [id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err);  
            }
                        // In ra tổng lương trả về từ function
            resolve(result[0]);  
        });
    });
}

async function getTopScorers(id) {
    return new Promise((resolve, reject) => { 
        const query='call GetTopScorers(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function getAllTournament() {
    return new Promise((resolve, reject) => { 
        const query='select * from tournament';
        con.query(query, function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getAllPlayers() {
    return new Promise((resolve, reject) => { 
        const query='select * from players';
        con.query(query, function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getAllClubs() {
    return new Promise((resolve, reject) => { 
        const query='select * from clubs';
        con.query(query, function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getAllRefs() {
    return new Promise((resolve, reject) => { 
        const query='select * from referee';
        con.query(query, function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getAllCoaches() {
    return new Promise((resolve, reject) => { 
        const query='select * from coaches';
        con.query(query, function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getRelevantPlayers(name, position, minAge, maxAge, minSalary, maxSalary,numred) {
    return new Promise((resolve, reject) => { 
        const query = 'call SearchPlayers(?,?,?,?,?,?,?)';
        con.query(query,[`%${name}%`,`%${position}%`,minAge,maxAge,minSalary,maxSalary,numred
        ], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function getRelevantClubs(name) {
    return new Promise((resolve, reject) => { 
        const query = 'SELECT * FROM clubs WHERE LOWER(firstname) like ? or lower(lastname) LIKE ?';
        con.query(query,[`%${name}%`,`%${name}%`], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            resolve(result); 
        });
    });
}

async function getRelevantCoaches(name) {
    return new Promise((resolve, reject) => { 
        const query = 'SELECT * FROM coaches WHERE LOWER(name) like ?';
        con.query(query,[`%${name}%`], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            resolve(result);
        });
    });
}


async function getRelevantRefs(name) {
    return new Promise((resolve, reject) => { 
        const query = 'SELECT * FROM referee WHERE LOWER(name) like ?';
        con.query(query,[`%${name}%`], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getPlayers(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetPlayersForClub(?);';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getHistory(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetPlayerHistory(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}


async function getMatches(id) {
    return new Promise((resolve, reject) => { 
        const query = 'select * from matches where tournamentid=?';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getCoaches(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetCoachesForClub(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function getTeamforMatch(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetTeamsForMatch(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}


async function getLineups(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetStartingLineups(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}


async function getSub(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetSub(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function getRank(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetRankingWithClubNameByTournament(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}


async function getResult(id) {
    return new Promise((resolve, reject) => { 
        const query = 'select * from result where matchid=?';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
        });
    });
}

async function getMin(id) {
    return new Promise((resolve, reject) => { 
        const query = 'select GetPlayMinutes(?) as a';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0].a); 
        });
    });
}


async function GetMatchResultsByTournament(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetMatchResultsByTournament(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}


async function GetMatchDetail(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetMatchDetailsByMatchID(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function insertPlayer(p_Salary, p_Birthday, p_FirstName, p_LastName, p_Position) {
    return new Promise((resolve, reject) => { 
        const query = 'call InsertPlayer(?,?,?,?,?)';
        con.query(query,[p_Salary, p_Birthday, p_FirstName, p_LastName, p_Position], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function updatePlayer(id,p_Salary, p_Birthday, p_FirstName, p_LastName, p_Position) {
    return new Promise((resolve, reject) => { 
        const query = 'call UpdatePlayer(?,?,?,?,?,?)';
        con.query(query,[id,p_Salary, p_Birthday, p_FirstName, p_LastName, p_Position], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function deletePlayer(p_Id) {
    return new Promise((resolve, reject) => {
        const query = 'CALL DeletePlayer(?)';
        con.query(query, [p_Id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi thủ tục DeletePlayer: ' + err.stack);
                return reject(err);  
            }
            
            resolve(result[0]); 
        });
    });
}


async function deleteMatch(p_Id) {
    return new Promise((resolve, reject) => {
        const query = 'CALL DeleteMatch(?)';
        con.query(query, [p_Id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi thủ tục DeleteMatch: ' + err.stack);
                return reject(err);  
            }
            
            resolve(result[0]); 
        });
    });
}



async function updateMatch(id,newdate) {
    return new Promise((resolve, reject) => { 
        const query = 'call updateMatch(?,?)';
        con.query(query,[id,newdate], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function getRedPlayers(num) {
    return new Promise((resolve, reject) => { 
        const query = 'call getPlayershadRed(?)';
        con.query(query,[num], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}


async function getMatchbyName(name) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetMatchesByTeamName(?)';
        con.query(query,[`%${name}%`], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}

async function getReferee(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetMatchReferee(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}


async function getStadium(id) {
    return new Promise((resolve, reject) => { 
        const query = 'call GetMatchStadium(?)';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result[0]); 
        });
    });
}


module.exports = {
    getYellow,
    getRed,
    getGoal,
    getTopScorers,
    getAllTournament,
    getAllPlayers,
    getAllClubs,
    getAllRefs,
    getAllCoaches,
    getRelevantPlayers,
    getRelevantClubs,
    getRelevantCoaches,
    getRelevantRefs,
    getPlayers,
    getHistory,
    getMatches,
    getCoaches,
    getTeamforMatch,
    getLineups,
    getRank,
    getSub,
    getResult,
    getMin,
    GetMatchResultsByTournament,
    GetMatchDetail,
    insertPlayer,
    updatePlayer,
    deletePlayer,
    getInformation,
    deleteMatch,
    updateMatch,
    getRedPlayers,
    getMatchbyName,
    getReferee,
    getStadium
};

