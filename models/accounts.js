const mysql = require('mysql2');

// Cấu hình kết nối MySQL
const con = mysql.createConnection({
  host: 'nhathuy-mysql-server-cr10.mysql.database.azure.com',      // Địa chỉ máy chủ MySQL
  user: 'nhathuy123',           // Tên người dùng MySQL (mặc định là 'root')
  password: 'Toilaai123.',           // Mật khẩu người dùng MySQL (nếu có, nếu không để trống)
  database: 'btl_csdl_official' // Tên cơ sở dữ liệu cần kết nối
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

async function getRelevantPlayers(name) {
    return new Promise((resolve, reject) => { 
        const query = 'SELECT * FROM players WHERE LOWER(firstname) like ? or lower(lastname) LIKE ?';
        con.query(query,[`%${name}%`,`%${name}%`], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
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
        const query = 'select * from ranking';
        con.query(query,[id], function (err, result, fields) {
            if (err) {
                console.error('Lỗi khi gọi function: ' + err.stack);
                return reject(err); 
            }
            
            resolve(result); 
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
            
            resolve(result); 
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
    GetMatchDetail
};

