const Clarifai = require('clarifai');

const app = new Clarifai.App({
   apiKey: 'ef4b92b47b164d29bc5adc12fc195dfa'
  });

const handleApiCall = (req,res) =>{

 app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data =>{
      	res.json(data);
      })
      .catch(err=> res.status(400).json('unable to work with API'))
}



const handleImagePUT = (req,res,db)=> {
	const {id}=req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImagePUT: handleImagePUT,
	handleApiCall
};