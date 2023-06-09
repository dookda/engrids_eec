const express = require('express');
const app = express.Router();
const con = require("./db");
const eac3 = con.eac3;

app.get("/ff-eac/data", (req, res) => {
    const sql = `SELECT * FROM familyforest_eac order by rid desc`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/ff-eac/type/databyid", (req, res) => {
    const { ffid } = req.body;
    const sql = `SELECT * FROM familyforest_eac where ffid = '${ffid}' order by rid desc`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get("/ff-eac/geom/data", (req, res) => {
    const sql = `SELECT *, ST_AsGeoJson(geom) as geom FROM ff_geom_eac order by date_dt desc`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/ff-eac/geom/databyid", (req, res) => {
    const { ffid } = req.body;
    const sql = `SELECT *, ST_AsGeoJson(geom) as geom  FROM ff_geom_eac where ffid = '${ffid}' order by rid desc`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ff-eac/insert", async (req, res) => {
    const { ffid, ftype, fplant, usrid, usrname, date_dt } = req.body;
    if (ftype && fplant) {
        let sql = `INSERT INTO familyforest_eac(ffid, ftype, fplant, usrid, usrname, date_dt )VALUES('${ffid}', '${ftype}', '${fplant}' , '${usrid}', '${usrname}', '${date_dt}')`;
        await eac3.query(sql);
    }

    res.status(200).json({
        data: "success"
    });
})

app.post("/ff-eac/save/geom", async (req, res) => {
    const { ffid, data } = req.body;
    let y = `INSERT INTO ff_geom_eac (ffid) VALUES ('${ffid}');`
    // console.log(y)
    await eac3.query(y)
    // let x;
    for (x in data) {
        // console.log(x)
        if (x !== 'geom' && x !== 'ffid') {
            let sql = `UPDATE ff_geom_eac SET ${x} = '${data[x]}' WHERE ffid ='${ffid}' ;`
            // console.log(sql);
            eac3.query(sql)
        } else if (x == 'geom') {
            let sql = `UPDATE ff_geom_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
                        WHERE ffid ='${ffid}'`
            eac3.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})
app.post("/ff-eac/save/geom2", async (req, res) => {
    const { ffid, data } = req.body;
    for (x in data) {
        if (x == 'geom') {
            let sql = `UPDATE ff_geom_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
                        WHERE ffid ='${ffid}'`
            eac3.query(sql)
        } else {
            let sql = `UPDATE ff_geom_eac SET ${x} = '${data[x]}' WHERE ffid ='${ffid}'`
            eac3.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})


app.post("/ff-eac/geom/delete", (req, res) => {
    const { ffid } = req.body;
    const sql = `DELETE FROM ff_geom_eac WHERE ffid='${ffid}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/ff-eac/type/update", async (req, res) => {
    const { ffid, fplant, data } = req.body;
    for (x in data) {
        let sql = `UPDATE familyforest_eac SET ${x} = '${data[x]}' WHERE ffid ='${ffid}' and fplant = '${fplant}';`
        eac3.query(sql)

    }
    res.status(200).json({
        data: "success"
    })
})
app.post("/ff-eac/type/delete", async (req, res) => {
    const { ffid, fplant, data } = req.body;
    const sql = `DELETE FROM familyforest_eac WHERE ffid='${ffid}' and fplant = '${fplant}'; `
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;