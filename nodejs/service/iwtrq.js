const express = require('express');
const app = express.Router();
const con = require("./db");
const iwtrq = con.iwtrq;

// INSERT post //
app.post('/iwtrq/insert', function (req, res) {
    let { stname, ec, ph, do2, tmp } = req.body
    console.log(stname, ec, ph, do2, tmp)

    let sql = `INSERT INTO wtrq_iot (stname,ec,ph,"do",tmp,ts)
    VALUES ('${stname}',${ec},${ph}, ${do2}, ${tmp},'now')`
    console.log(sql);

    iwtrq.query(sql).then((r) => {
        res.status(200).json({
            status: "insert ok"
        })
    })
})

// INSERT get //
app.get('/iwtrq/insert/:dd/:ec', function (req, res) {
    let { dd, ec } = req.params

    let sql = `INSERT INTO wtrq_iot (stname,ec,ph,"do",tmp)
    VALUES ('station05', 9, 5, ${dd}, ${ec});`

    console.log(sql);

    iwtrq.query(sql).then(r => {
        // console.log(r)
        res.status(200).json({
            data: "insent ok"
        })
    })
})

//get-alldata//
app.get("/iwtrq/getalldata", (req, res) => {
    const sql = `select gid,stname,ec,ph,"do",tmp, TO_CHAR(ts, 'DD-MM-YYYY HH24:MI:ss') as datetime from wtrq_iot`;

    iwtrq.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;