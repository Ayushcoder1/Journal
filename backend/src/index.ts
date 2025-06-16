import express      from "express";
import cors         from "cors";
import rootRouter   from "./routes/index";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", rootRouter);

app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});
