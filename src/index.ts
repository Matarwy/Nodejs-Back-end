import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import adminRoutes from "./routers/admin.router";
import networkRoutes from "./routers/network.route";
import submitRoutes from "./routers/submit.route";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;


app.use('/network', networkRoutes);
app.use('/submit', submitRoutes);
app.use('/admin', adminRoutes);

app.get('/', function(req, res){
    res.render('index.js');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
