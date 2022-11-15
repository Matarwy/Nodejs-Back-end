import express from 'express';
import cors from "cors";
import bodyParser from "body-parser"
import adminRoutes from "./routers/admin.router";
import networkRoutes from "./routers/network.route";
import submitRoutes from "./routers/submit.route";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/network', networkRoutes);
app.use('/submit', submitRoutes);
app.use('/admin', adminRoutes);

// app.get('/network', function(req, res){
//     res.send('Hi there, network');
// });

// app.get('/submit', function(req, res){
//     res.send('Hi there, submit');
// });

// app.get('/admin', function(req, res){
//     res.send('Hi there, admin');
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
