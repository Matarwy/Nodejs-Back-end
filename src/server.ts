import express from 'express';
import cors from "cors";
import bodyParser from "body-parser"
import adminRoutes from "./routers/admin.router";
import networkRoutes from "./routers/network.route";
import submitRoutes from "./routers/submit.route";
import Moralis from "moralis";

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/network', networkRoutes);
app.use('/submit', submitRoutes);
app.use('/admin', adminRoutes);

app.get('/network', function(req, res){
    res.send('If I medicined you, you’d think a brain tumor was a birthday present');
});

app.get('/submit', function(req, res){
    res.send('Don’t fuck with me buddy or I’ll kick your ass so hard you’ll have to unbutton your collar to shit');
});

app.get('/admin', function(req, res){
    res.send('I will find you...');
});

app.get('/', function(req, res){
    res.send('Go ahead, make my day');
});

Moralis.start({
    apiKey: 'FGePo2URsh8SkpeascUIopcNZASG3rhY2j4ji9LctJViGGRtyJNvPSwAzGKcBtRi'
}).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
