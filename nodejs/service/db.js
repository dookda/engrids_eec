const Pool = require('pg').Pool

const eec = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eec',
    password: 'Eec-MIS2564db',
    port: 5432,
});

const geo = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eecgeo',
    password: 'Eec-MIS2564db',
    port: 5432,
});

const dat = new Pool({
    user: 'postgres',
    host: '119.59.125.134',
    database: 'data',
    password: 'Pgis@rti2dss@2020',
    port: 5432,
});

const iot = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eeciot',
    password: 'Eec-MIS2564db',
    port: 5432,
});

const th = new Pool({
    user: 'postgres',
    host: '119.59.125.134',
    database: 'th',
    password: 'Pgis@rti2dss@2020',
    port: 5432,
});
const eac = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eac_data',
    password: 'Eec-MIS2564db',
    port: 5432,
});

const oauth = {
    client_id: '1092148959082-up4fbcj72fjfklenhdrnncb56ai2ebr6.apps.googleusercontent.com',
    client_secret: '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',
    redirect_uri: 'https://developers.google.com/oauthplayground',
    refresh_token: '1//04CMPywdqJEgUCgYIARAAGAQSNwF-L9Irc_Mx9yac3-z6sxbQ2o9hUrkJBzlptryBgf-AMR3d8xr-ra9H26ltpdK1vTY8Dvo8o1s'
}

const eac2 = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eac_data',
    password: 'Eec-MIS2564db',
    port: 5432,
});

const eac3 = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eac_data3',
    password: 'Eec-MIS2564db',
    port: 5432,
});

const end_form = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'end_form',
    password: 'Eec-MIS2564db',
    port: 5432,
});

const iwtrq = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'Eec-MIS2564db',
    port: 5432,
});


exports.oauth = oauth;
exports.eec = eec;
exports.geo = geo;
exports.dat = dat;
exports.iot = iot;
exports.th = th;
exports.eac = eac;
exports.eac2 = eac2;
exports.eac3 = eac3;
exports.end_form = end_form;
exports.iwtrq = iwtrq;