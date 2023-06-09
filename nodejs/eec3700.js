var https = require('https');
var fs = require('fs');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

const whk = require('./service/webhook');
app.use(whk);

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

// var https_options = {
//     key: fs.readFileSync("/etc/apache2/ssl/private.key"),
//     cert: fs.readFileSync("/etc/apache2/ssl/public.crt"),
//     ca: fs.readFileSync('/etc/apache2/ssl/intermediate.crt')
// };

//  var https_options = {
//      key: fs.readFileSync("C:/xampp/apache/cert/eec-onep_privatekey.key"),
//      cert: fs.readFileSync("C:/xampp/apache/cert/www.eec-onep.onlinePEM.crt"),
//      ca: fs.readFileSync('C:/xampp/apache/cert/www.eec-onep.onlineICA.crt')
//  };

// var server = https.createServer(https_options, app);
// var port = process.env.PORT || 3700;
// server.listen(port, function () {
//     console.log('listening on port ' + server.address().port);
// });

app.listen(3700, () => {
    console.log('running on http://localhost:3700')
});

app.use(express.static(__dirname + '/www'));

const api = require('./service/api');
app.use(api);

const api_water = require('./service/api_water');
app.use(api_water);

const api_familyforest = require('./service/api_familyforest');
app.use(api_familyforest);

const api_station = require('./service/api_station');
app.use(api_station);

const pf = require('./service/profile');
app.use(pf);

const projmon = require('./service/projmon');
app.use(projmon);

const green = require('./service/green');
app.use(green);

const watquality = require('./service/watquality');
app.use(watquality);

const seaquality = require('./service/seaquality');
app.use(seaquality);

const wastewat = require('./service/wastewat');
app.use(wastewat);

const login = require('./service/login');
app.use(login);

const watsurface = require('./service/watsurface');
app.use(watsurface);

const foodmile = require('./service/foodmile');
app.use(foodmile);

const agrimon = require('./service/agrimon');
app.use(agrimon);

const iot = require('./service/iot');
app.use(iot);

const org = require('./service/organization');
app.use(org);

const notice = require('./service/notice');
app.use(notice);

const insee = require('./service/insee');
app.use(insee);

const biodiversity = require('./service/biodiversity');
app.use(biodiversity);

const garbage = require('./service/garbage');
app.use(garbage);

const formgw = require("./service/formgw")
app.use(formgw)

const forminsee = require("./service/forminsee")
app.use(forminsee)

const formap = require("./service/formap")
app.use(formap)

const familyforest = require("./service/familyforest")
app.use(familyforest)

const waterlevel = require("./service/waterlevel")
app.use(waterlevel)


const eac_notice = require('./service/eac_notice');
app.use(eac_notice);

const eac_fishing = require('./service/eac_fishing');
app.use(eac_fishing);

const eac_air = require('./service/eac_air');
app.use(eac_air);

const eac_familyforest = require('./service/eac_familyforest');
app.use(eac_familyforest);

const gwater = require('./service/gwater');
app.use(gwater);

const end_form = require('./service/end_form');
app.use(end_form);

const iwtrq = require('./service/iwtrq');
app.use(iwtrq);
