const express = require('express');
const app = express.Router();
const con = require("./db");
const eac3 = con.eac3;

app.get("/air-eac/data", (req, res) => {
    const sql = `SELECT * FROM air_eac order by rid desc`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/air-eac/getdata", (req, res) => {
    const sql = `SELECT * FROM air_eac order by rid desc `;
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/formair-eac/save", async (req, res) => {
    const { airid, data } = req.body;
    let y = `INSERT INTO air_eac (airid) VALUES ('${airid}');`
    // console.log(y)
    await eac3.query(y)
    // let x;
    for (x in data) {
        // console.log(x)
        if (x !== 'geom' && x !== 'airid') {
            let sql = `UPDATE air_eac SET ${x} = '${data[x]}' WHERE airid ='${airid}' ;`
            // console.log(sql);
            eac3.query(sql)
        } else if (x == 'geom') {
            let sql = `UPDATE air_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
                        WHERE airid ='${airid}'`
            eac3.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/air-eac/delete", (req, res) => {
    const { airid } = req.body;
    const sql = `DELETE FROM air_eac WHERE airid='${airid}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;