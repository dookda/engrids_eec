const express = require('express');
const app = express.Router();
const con = require("./db");
const eac3 = con.eac3;

const eec = con.eec;

app.get("/gwater-api/getdata", (req, res) => {
    const sql = `SELECT s.station_id, s.station_code, s.station_name, s.tambon, s.amphoe, s.province, ST_AsGeoJson(s.geom) as json
        FROM sta_detail s, eec_pro_4326 e
        WHERE st_intersects(s.geom, e.geom)`;



    const sql2 = `SELECT * FROM air_eac order by rid desc`;

    eac3.query(sql2).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/gwater-api/sensordetail", (req, res) => {
    const { station_id } = req.body;
    const sql = `SELECT * FROM sensor_detail
        WHERE station_id = ${station_id}`;

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;