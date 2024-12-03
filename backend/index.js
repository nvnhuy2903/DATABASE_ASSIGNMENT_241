const express = require('express');
const app = express();
const port = 3001;
const bodyParser= require('body-parser')
// Tạo một router
const AccountModel = require('./models/accounts.js');
// Định nghĩa một route trong router
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// tinh toan tat ca so the vang cua 1 cau thu
// id là id của cau thu
app.get('/yellow/:id',(req,res,next)=>{
    AccountModel.getYellow(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})


// tinh toan tat ca so the do cua 1 cau thu 
// id là id của cau thu
app.get('/red/:id',(req,res,next)=>{
    AccountModel.getRed(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})



// tinh toan tat ca so ban thang cua 1 cau thu 
// id là id của cau thu
app.get('/goal/:id',(req,res,next)=>{
    AccountModel.getGoal(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})



app.get('/getInfo/:id',(req,res,next)=>{
    AccountModel.getInformation(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})


// danh sach cac cau thu co so ban thang nhieu nhat trong 1 giai dau
// id là id cua mua giai
app.get('/topscorer/:id',(req,res,next)=>{
    AccountModel.getTopScorers(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})


// danh sach cac mua giai trong csdl(nhom minh lam 1)
app.get('/tournament',(req,res,next)=>{
    AccountModel.getAllTournament()
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})


// danh sach cac cau thu trong csdl
app.get('/players',(req,res,next)=>{
    AccountModel.getAllPlayers()
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})


// danh sach cac clb trong csdl
app.get('/clubs',(req,res,next)=>{
    AccountModel.getAllClubs()
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})



// danh sach cac trong tai trong csdl
app.get('/refs',(req,res,next)=>{
    AccountModel.getAllRefs()
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})


// danh sach cac hlv trong csdl
app.get('/coaches',(req,res,next)=>{
    AccountModel.getAllCoaches()
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
})


// api tim kiem cau thu dua tren keyword nhap vao tu nguoi dung
// co dang /searchPlayer?keyword=bru
app.get('/searchPlayer', (req, res) => {
    // Lấy các giá trị query parameter từ URL
    var name = req.query.name ? req.query.name.toLowerCase() : '';  
    var position = req.query.position ? req.query.position.toLowerCase() : '';  
    var minAge = req.query.min_age ? parseInt(req.query.min_age) : 0;  
    var maxAge = req.query.max_age ? parseInt(req.query.max_age) : 100;  
    var minSalary = req.query.min_salary ? parseFloat(req.query.min_salary) : 0;  
    var maxSalary = req.query.max_salary ? parseFloat(req.query.max_salary) : 100000000; 
    var numred = req.query.numred ? parseFloat(req.query.numred):0;

    if (!name && !position&& !minAge && !maxAge && !minSalary && !maxSalary && !numred) {
        return res.status(400).json({ message: 'At least one search parameter (name or position) is required.' });
    }

    AccountModel.getRelevantPlayers(name, position, minAge, maxAge, minSalary, maxSalary,numred)
        .then(data => {
            if (data) {
                return res.json(data);
            } else {
                return res.status(404).json({ message: 'No players found matching the search criteria.'});
            }
        })
        .catch(err => {
            return res.status(500).json({ message: 'Error while searching players', details: err });
        });
});


// tuong tu cai tren
app.get('/searchClub', (req, res) => {
    const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : '';
    
    if (!keyword) {
        return res.status(400).json({ message: 'Keyword is required' }); // Handle empty keyword
    }
    AccountModel.getRelevantClubs(keyword)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});

//tuong tu cai tren
app.get('/searchRef', (req, res) => {
    const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : '';
    
    if (!keyword) {
        return res.status(400).json({ message: 'Keyword is required' }); // Handle empty keyword
    }
    AccountModel.getRelevantRefs(keyword)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


//tuong tu cai tren
app.get('/searchCoach', (req, res) => {
    const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : '';
    
    if (!keyword) {
        return res.status(400).json({ message: 'Keyword is required' }); 
    }
    AccountModel.getRelevantCoaches(keyword)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


//lay thong tin cau thu thong qua id
app.get('/getPlayer/:id', (req, res) => {
    AccountModel.getPlayers(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


//lay lich su chuyen nhuong cau thu thong qua id
app.get('/getHistory/:id', (req, res) => {
    AccountModel.getHistory(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});

//lay thong tin tat ca tran dau thong qua id mua giai
app.get('/getAllMatch/:id', (req, res) => {
    AccountModel.GetMatchResultsByTournament(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});



//lay bang xep hang thong qua id mua giai
app.get('/getRank/:id', (req, res) => {
    AccountModel.getRank(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


//lay cac hlv cua mot doi bong qua id doi bong do
app.get('/getCoaches/:id', (req, res) => {
    AccountModel.getCoaches(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


//lay 2 doi bong cua tran dau qua id tran do
app.get('/getTeamsforMatch/:id', (req, res) => {
    AccountModel.getTeamforMatch(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


// lay ds ra sân gom ca chinh thuc va khong chinh thuc cua 1 tran dau qua id tran dau do
app.get('/getLineup/:id', (req, res) => {
    AccountModel.getLineups(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


//Lay ds du bi
app.get('/getSub/:id', (req, res) => {
    AccountModel.getSub(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});



app.get('/getResult/:id', (req, res) => {
    AccountModel.getResult(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});

//lay so phut thi dau cua 1 cau thu tu truoc den nay
app.get('/getMin/:id', (req, res) => {
    AccountModel.getMin(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


//lay thong ve cac ban thang, the vnag, the do, thay nguoi cua 1 tran
app.get('/getDetailMatch/:id', (req, res) => {
    AccountModel.GetMatchDetail(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});




app.post('/insertPlayer', (req, res) => {
    const { Salary, Birthday, FirstName, LastName, Position } = req.body;

    AccountModel.insertPlayer(Salary, Birthday, FirstName, LastName, Position)
        .then(data => {
            if (data) {
                return res.json(data); // Send the data back as a response
            } else {
                return res.status(200).json({ message: 'Insert successfully' });
            }
        })
        .catch(err => {
            return res.status(500).json({ message: err.message, details: err });
        }); 
});


app.post('/updatePlayer', async (req, res) => {
    const { Id, Salary, Birthday, FirstName, LastName, Position } = req.body;

    AccountModel.updatePlayer(Id,Salary, Birthday, FirstName, LastName, Position)
        .then(data => {
            if (data) {
                return res.json(data); // Send the data back as a response
            } else {
                return res.status(200).json({ message: 'Update successfully' });
            }
        })
        .catch(err => res.status(500).json({ message: err.message, details: err })) // Handle errors
});

app.post('/deletePlayer', async (req, res) => {
    const { Id } = req.body;

    AccountModel.deletePlayer(Id)
        .then(data => {
            if (data) {
                return res.status(200).json({ message: 'Cannot delete player that attended any match before or be possessed by any club before' }); // Send the data back as a response
            } else {
                return res.status(200).json({ message: 'Delete successfully' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Cannot delete player that attended any match before or be possessed by any club before' })) // Handle errors
});

app.post('/updateMatch', async (req, res) => {
    const { Id,newdate } = req.body;

    AccountModel.updateMatch(Id,newdate)
        .then(data => {
            if (data) {
                return res.json(data); // Send the data back as a response
            } else {
                return res.status(200).json({ message: 'Update successfully' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Cannot update match that happened' })) // Handle errors
});

app.post('/deleteMatch', async (req, res) => {
    const { Id } = req.body;

    AccountModel.deleteMatch(Id)
        .then(data => {
            if (data) {
                return res.json(data); // Send the data back as a response
            } else {
                return res.status(200).json({ message: 'Delete match successfully' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Cannot delete match that happened' }))
});


app.get('/getPlayerwithRed', (req, res) => {
    const { num } = req.body;
    AccountModel.getRedPlayers(num)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


app.get('/getMatchbyName', (req, res) => {
    var name = req.query.name ? req.query.name.toLowerCase() : '';  
    AccountModel.getMatchbyName(name)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


app.get('/getReferee/:id', (req, res) => {
    AccountModel.getReferee(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});


app.get('/getStadium/:id', (req, res) => {
    AccountModel.getStadium(req.params.id)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
});



app.listen(port, () => {
    console.log(`Ứng dụng đang lắng nghe trên port ${port}`);
});

