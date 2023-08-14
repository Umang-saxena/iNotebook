const mongoose=require('mongoose');
// const mongoURI = "mongodb+srv://Umang:12345hanu@cluster1.3lqrugj.mongodb.net/inotebook?retryWrites=true&w=majority";

// const connectToMongo= async ()=>{
//      await mongoose.connect(mongoURI);
//      console.log("Connected");
// } 
const connectToMongo=async()=>{ 
     try {
          await mongoose.connect("mongodb://127.0.0.1:27017/inotebook", {
              useNewUrlParser: true,
              useUnifiedTopology: true
          });
          console.log("Connected to Local Database");
      } catch (error) {
          console.error("Error connecting to database:", error);
      }
     
}
// To get connection String Go to mongodb website and connect


 module.exports = connectToMongo()