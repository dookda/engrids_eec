const express = require('express');
const app = express.Router();
const con = require("./db");
const eac3 = con.eac3;

app.post("/notice-eac/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT gid,id_date, noticename, noticedetail, noticeplace, noticetype, lat,lng,
    prov_tn, amp_tn, tam_tn, TO_CHAR(datetimes, 'DD-MM-YYYY') as datetimes, record, imgfile,   
            ST_AsGeojson(geom) as geojson  
        FROM notice_eac WHERE id_date='${proj_id}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/notice-eac/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT gid, id_date, noticename, noticedetail, noticeplace, noticetype,lat,lng,
    prov_tn, amp_tn, tam_tn, TO_CHAR(datetimes, 'DD-MM-YYYY') as datetimes, record, imgfile,   
            ST_AsGeojson(geom) as geojson  
        FROM notice_eac WHERE usrid='${usrid}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/notice-eac/getalldata", (req, res) => {
    const sql = `SELECT gid,imgfile, id_date, noticename, noticedetail, noticeplace, noticetype,lat,lng,
    prov_tn, amp_tn, tam_tn,TO_CHAR(datetimes, 'DD-MM-YYYY') as datetimes, record,    
            ST_AsGeojson(geom) as geojson  
        FROM notice_eac order by gid desc`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/notice-eac/insert", async (req, res) => {
    const { data } = req.body;
    // let proj_id = Date.now()
    await eac3.query(`INSERT INTO notice_eac (id_date) VALUES('${data.id_date}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== 'id_date') {
            let sql = `UPDATE notice_eac SET ${d}='${data[d]}' WHERE id_date='${data.id_date}'`;
            await eac3.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${data.id_date}'`;
        await eac3.query(sql)
    }

    res.status(200).json({
        data: "success"
    })
})
app.post("/notice-eac/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO notice_eac (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE notice_eac SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/notice-eac/save2", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO notice_eac (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE notice_eac SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            } else {
                let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
                await eac3.query(sql)
            }
        }
        // if (data.geom !== "") {
        //     let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
        //         WHERE id_date='${data.id_date}'`;
        //     await eec.query(sql)
        // }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/notice-eac/update", async (req, res) => {
    const { data } = req.body;
    // console.log(proj_id, data.geom);
    let d;
    data.map(async (x) => {
        for (d in x) {
            if (x[d] !== '' && d !== 'geom') {
                let sql = `UPDATE notice_eac SET ${d}='${x[d]}' WHERE id_date='${x.id_date}'`;
                await eac3.query(sql)
            }
        }

        if (x.geom !== "" && x.geom.geometry) {
            let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/notice-eac/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM notice_eac WHERE id_date='${proj_id}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

/////////////learning////////////////
app.post("/eac-learning/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT * FROM learning_eac WHERE id_date='${proj_id}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/learning-eac/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `select * from learning_eac WHERE usrid='${usrid}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get("/learning-eac/getalldata", (req, res) => {
    const sql = `select * from learning_eac`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/eac-learnning/add", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO learning_eac (id_date) VALUES ('${x.id_date}');`
        console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE learning_eac SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE learning_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/learning-eac/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM learning_eac WHERE id_date='${proj_id}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/learning-eac/update", async (req, res) => {
    const { data } = req.body;
    // console.log(proj_id, data.geom);
    data.map(async (x) => {
        let d;
        for (d in x) {
            if (x[d] !== '' && d !== 'geom') {
                let sql = `UPDATE learning_eac SET ${d}='${x[d]}' WHERE id_date='${x.id_date}'`;
                await eac3.query(sql)
            }
        }

        if (x.geom !== "" && x.geom.geometry) {
            let sql = `UPDATE learning_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/learning-eac/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO learning_eac (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE learning_eac SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE learning_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

module.exports = app;

/////////elephant////////////

app.get("/elephant-eac/getalldata", (req, res) => {
    const sql = `select * from elephant_eac`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/eac-elephant/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT * FROM elephant_eac WHERE id_date='${proj_id}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/elephant-eac/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `select * from elephant_eac WHERE usrid='${usrid}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/elephant-eac/insert", async (req, res) => {
    const { data } = req.body;
    // let proj_id = Date.now()
    await eac3.query(`INSERT INTO elephant_eac (id_date) VALUES('${data.id_date}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== 'id_date') {
            let sql = `UPDATE elephant_eac SET ${d}='${data[d]}' WHERE id_date='${data.id_date}'`;
            await eac3.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE elephant_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${data.id_date}'`;
        await eac3.query(sql)
    }

    res.status(200).json({
        data: "success"
    })
})

app.post("/elephant-eac/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO elephant_eac  (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE elephant_eac  SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE elephant_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/elephant-eac/add", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO elephant_eac (id_date) VALUES ('${x.id_date}');`
        console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE elephant_eac SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE elephant_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/elephant-eac/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM elephant_eac WHERE id_date='${proj_id}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/eac-elephant/update", async (req, res) => {
    const { id_date, data } = req.body;
    // console.log(proj_id, data.geom);
    data.map(async (x) => {
        let d;
        for (d in x) {
            if (x[d] !== '' && d !== 'geom' && d !== 'id_date') {
                let sql = `UPDATE elephant_eac SET ${d}='${x[d]}' WHERE id_date='${id_date}'`;
                await eac3.query(sql)
            }
        }

        if (x.geom !== "" && x.geom.geometry) {
            let sql = `UPDATE elephant_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${id_date}'`;
            await eac3.query(sql)
        }
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;

//////////////////////////////////dbwater////////////////////////////////////////
app.get("/dbwater-eac/getalldata", (req, res) => {
    const sql = `select * from dbwater_eac`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/dbwater-eac/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT * FROM dbwater_eac WHERE id_date='${proj_id}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/dbwater-eac/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `select * from dbwater_eac WHERE usrid='${usrid}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/dbwater-eac/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO dbwater_eac  (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE dbwater_eac  SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE dbwater_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/dbwater-eac/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM dbwater_eac WHERE id_date='${proj_id}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/dbwater-eac/update", async (req, res) => {
    const { id_date, data } = req.body;
    // console.log(proj_id, data.geom);
    data.map(async (x) => {
        let d;
        for (d in x) {
            if (x[d] !== '' && d !== 'geom' && d !== 'id_date') {
                let sql = `UPDATE dbwater_eac SET ${d}='${x[d]}' WHERE id_date='${id_date}'`;
                await eac3.query(sql)
            }
        }

        if (x.geom !== "" && x.geom.geometry) {
            let sql = `UPDATE dbwater_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${id_date}'`;
            await eac3.query(sql)
        }
        res.status(200).json({
            data: "success"
        })
    })
})
///////////////////////////disaster//////////////////////////////////////
app.get("/disaster-eac/getalldata", (req, res) => {
    const sql = `select * from disaster_eac`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/disaster-eac/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT * FROM disaster_eac WHERE id_date='${proj_id}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/disaster-eac/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `select * from disaster_eac WHERE usrid='${usrid}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/disaster-eac/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO disaster_eac  (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE disaster_eac  SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE disaster_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/disaster-eac/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM disaster_eac WHERE id_date='${proj_id}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/disaster-eac/update", async (req, res) => {
    const { id_date, data } = req.body;
    // console.log(proj_id, data.geom);
    data.map(async (x) => {
        let d;
        for (d in x) {
            if (x[d] !== '' && d !== 'geom' && d !== 'id_date') {
                let sql = `UPDATE disaster_eac SET ${d}='${x[d]}' WHERE id_date='${id_date}'`;
                await eac3.query(sql)
            }
        }

        if (x.geom !== "" && x.geom.geometry) {
            let sql = `UPDATE disaster_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${id_date}'`;
            await eac3.query(sql)
        }
        res.status(200).json({
            data: "success"
        })
    })
})
///////////////////////////seapollu//////////////////////////////////////
app.get("/seapollu-eac/getalldata", (req, res) => {
    const sql = `select * from seapollu_eac`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/seapollu-eac/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT * FROM seapollu_eac WHERE id_date='${proj_id}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/seapollu-eac/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `select * from seapollu_eac WHERE usrid='${usrid}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/seapollu-eac/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO seapollu_eac  (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE seapollu_eac  SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE seapollu_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/seapollu-eac/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM seapollu_eac WHERE id_date='${proj_id}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/seapollu-eac/update", async (req, res) => {
    const { id_date, data } = req.body;
    // console.log(proj_id, data.geom);
    data.map(async (x) => {
        let d;
        for (d in x) {
            if (x[d] !== '' && d !== 'geom' && d !== 'id_date') {
                let sql = `UPDATE seapollu_eac SET ${d}='${x[d]}' WHERE id_date='${id_date}'`;
                await eac3.query(sql)
            }
        }

        if (x.geom !== "" && x.geom.geometry) {
            let sql = `UPDATE seapollu_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${id_date}'`;
            await eac3.query(sql)
        }
        res.status(200).json({
            data: "success"
        })
    })
})
///////////////////////////garbage//////////////////////////////////////
app.get("/garbage-eac/getalldata", (req, res) => {
    const sql = `select * from garbage_eac`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/garbage-eac/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT * FROM garbage_eac WHERE id_date='${proj_id}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/garbage-eac/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `select * from garbage_eac WHERE usrid='${usrid}'`;

    eac3.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/garbage-eac/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO garbage_eac  (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eac3.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE garbage_eac  SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eac3.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE garbage_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}') 
                WHERE id_date='${x.id_date}'`;
            await eac3.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/garbage-eac/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM garbage_eac WHERE id_date='${proj_id}'`
    // console.log(sql);
    eac3.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/garbage-eac/update", async (req, res) => {
    const { id_date, data } = req.body;
    // console.log(proj_id, data.geom);
    data.map(async (x) => {
        let d;
        for (d in x) {
            if (x[d] !== '' && d !== 'geom' && d !== 'id_date') {
                let sql = `UPDATE garbage_eac SET ${d}='${x[d]}' WHERE id_date='${id_date}'`;
                await eac3.query(sql)
            }
        }

        if (x.geom !== "" && x.geom.geometry) {
            let sql = `UPDATE garbage_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${id_date}'`;
            await eac3.query(sql)
        }
        res.status(200).json({
            data: "success"
        })
    })
})


