const express = require('express');
const app = express();
const port = 3000;
const bodyParser= require('body-parser')
// Tạo một router
const AccountModel = require('./models/accounts.js');
// Định nghĩa một route trong router

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
    const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : '';
    
    if (!keyword) {
        return res.status(400).json({ message: 'Keyword is required' }); // Handle empty keyword
    }
    AccountModel.getRelevantPlayers(keyword)
        .then(data => res.json(data)) // Send the data back as a response
        .catch(err => res.status(500).json('that bai')); // Handle errors
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
    AccountModel.getMatches(req.params.id)
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



app.listen(port, () => {
    console.log(`Ứng dụng đang lắng nghe trên port ${port}`);
});

