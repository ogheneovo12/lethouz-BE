import { Router } from "express";
import authRoutes from "./auth";

const apiRouter = Router();

apiRouter.get('/',(req,res)=>{
  res.json({
    mesage: 'welcome to the api route'
  })
})

apiRouter.use('/auth',authRoutes);



export default apiRouter;