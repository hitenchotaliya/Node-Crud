const mongoose = require('mongoose');
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Sucessfully Connected");
}).catch((err)=>{
    console.log("Failed Connection" + err);
})
const db = mongoose.connection;
//mongoose.set('useFindAndModify', false);

db.on('error', console.error.bind(console, 'connection error:'));
//SCHEMA
module.exports = mongoose