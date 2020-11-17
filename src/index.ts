import { appendFile } from "fs";
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express"
const app = express();
import adminv1 from "../routes/admin/v1"
import userv1 from "../routes/user/v1"
import * as cors from "cors"
import { errRes } from "../helpers/tools";
const port = process.env.PORT || 3000


createConnection().then(async (connection) => {
app.use(cors({}));
app.use(express.json())
app.use("/v1",userv1)
app.use("/admin/v1",adminv1)

app.use((req, res, next) => {
    return errRes(res, "404 Not found");
  });
app.listen(port,()=>{
console.log(`Running on port ${port}`)
})
})
