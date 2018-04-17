const express = require('express');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const knex= require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'smartBrain',
    password : 'SmartBrain',
    database : 'smart-brain'
  }
});

/*db.select('*').from('users').then(data =>{
	console.log(data);
})*/

const app = express();


/*const database ={
	users: [
	{
		id: '123',
		name: 'John',
		password: 'cookies',
		email: 'john@gmail.com',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		password: 'bananas',
		email: 'sally@gmail.com',
		entries: 0,
		joined: new Date()
	}
	],
	login:[
	{
		id:'987',
		hash: '',
		email: 'john@gmail.com'
	}
	]
}*/

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{res.send(database.users);})

app.post('/signin',(req,res)=> {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{ image.handleImagePUT(req,res,db)})
app.post('/imageurl',(req,res)=>{ image.handleApiCall(req,res)})


/* bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
	});*/
/*// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/

app.listen(3000,()=>{
	console.log('app is running smoothly on port 3000');
})

