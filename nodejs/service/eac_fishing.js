const express = require('express');
const app = express.Router();
const con = require("./db");
const eac3 = con.eac3;

app.get("/fishing-eac/data", (req, res) => {
    const sql = `SELECT * FROM fishing_eac order by rid desc`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/fishing-eac/getdata", (req, res) => {
    const { fid } = req.body;
    const sql = `SELECT * FROM fishing_eac WHERE id_date ='${fid}' order by rid desc`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/fishing-eac/sentdata", async (req, res) => {
    const { fid } = req.body;
    const sql = `INSERT INTO fishing_eac (id_date) VALUES ('${fid}');`
    await eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/fishing-eac/save2", async (req, res) => {
    const { fid, data } = req.body;
    let y = `INSERT INTO fishing_eac (id_date) VALUES ('${fid}');`
    // console.log(y)
    await eac3.query(y)
    // let x;
    for (x in data) {
        // console.log(x)
        if (x !== 'geom' && x !== 'id_date') {
            let sql = `UPDATE fishing_eac SET ${x} = '${data[x]}' WHERE id_date ='${fid}' ;`
            // console.log(sql);
            eac3.query(sql)
        } else if (x == 'geom') {
            let sql = `UPDATE fishing_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
                        WHERE id_date ='${fid}'`
            eac3.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/fishing-eac/update", async (req, res) => {
    const { fid, data } = req.body;
    // console.log(fid, data);
    for (x in data) {
        // console.log(x)
        if (x !== 'geom') {
            let sql = `UPDATE fishing_eac SET ${x} = '${data[x]}' WHERE id_date ='${fid}' ;`
            // console.log(sql);
            eac3.query(sql)
        } else if (x == 'geom') {
            let sql = `UPDATE fishing_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
                        WHERE id_date ='${fid}'`
            eac3.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/fishing-eac/delete", (req, res) => {
    const { fid } = req.body;
    const sql = `DELETE FROM fishing_eac WHERE id_date='${fid}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})


module.exports = app;