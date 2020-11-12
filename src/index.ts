import { appendFile } from "fs";
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express"
const app = express();
import v1 from "../routes/v1"
const port = 3000


createConnection().then(async connection => {
app.use(express.json())
app.use("/v1",v1)



app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})
})
