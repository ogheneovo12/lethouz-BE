import cors from "cors";
import bodyParser from "body-parser";

/**
 * Configures and loads all routes
 * 
 * @param {Object} app express app instance 
 * @param {Config} config  config object
 */

const loader = (app,config) => 
    new Promise(resolve => { 
      app.use(cors);

      app.get('/',(req,res) => {
        res.send("mad oo from: "+ __dirname)
        })

      resolve()
    })
    
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({
    //   extended: false
    // }))

    // app.use((req,res,next)=> {
    //   console.log(req.url);
    //   next();
    // })

    // app.use(({ status, message}, req, res, next) =>{
    //   // handle server errors
    //   if(!status || !message){
    //     status = 500;
    //     message = "Internal Server Error"
    //   }
    //   console.log(status);
    //   res.status(status).json({ message })
    // })

    // console.log('ended');

export default loader