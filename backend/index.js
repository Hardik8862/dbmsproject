const express = require('express');
const router = express.Router;
const {Client} = require('pg');
const bodyParser = require("body-parser")
var app = express();
var PORT = 4920;

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '886610',
    database:'highway_db_134'
  })

  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })

var data;
router.get('/', (req, res) => {
    console.log("get in");
    getthedata();
	res.send(JSON.stringify(data));
});


function getthedata(){
    client.query(`Select * from highway_db.highway_details1`, (err, res) => {
        if(!err){
            data = res.rows;
        }
        else{  
        console.log(err.message);
        return null;
        }
      });
}

const deleteUser = async (userName) => {
    try {
        // await client.connect();  // gets connection
        await client.query("delete from highway_db.highway_details1 where highway_no=$1", [userName]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();  // closes connection
    }
};





// function deleteHighwayNumber(highway_no){
//     client.query("delete from highway_db.highway_details1 where highway_no='NH No.1B'",(err,res)=>{
//         if(!err){
//             console.log(res.affectedRows);
//             console.log('Delete Successful');
//         }
//         else{ 
//             console.log(err.message);
//         }
//     })
// }

// function postthedata
// app.post('/insertuser', (req, res)=> {
//     const user = req.body;
//     let insertQuery = `insert into highway_db.civil_engineer(registration_no, engineer_name, company_name, email) 
//                        values(${user.registration_no}, '${user.engineer_name}', '${user.company_name}', '${user.email}')`

//     client.query(insertQuery, (err, result)=>{
//         if(!err){
//             res.send('Insertion was successful')
//         }
//         else{ console.log(err.message) }
//     })
// })

// var urlencodedParser = bodyParser.urlencoded({ extended: false })  

// app.use(bodyParser.urlencoded({
//     extended:true
// }));

router.post("/deletehighways", function(req, res) {
    var highway_number = req.body;
    console.log(highway_number);
    // deleteUser('NH No.1').then((result) => {
    //     if (result) {
    //         console.log('User deleted');
    //     }
    // });
    res.send({message:"Deleted successfully!"});
});




app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
