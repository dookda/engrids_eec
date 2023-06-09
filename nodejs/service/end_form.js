const express = require('express');
const app = express.Router();
const con = require("./db");
const end_form = con.end_form;

const eec = con.eec;
////formuser////
app.post('/fuser-api/userid', (req, res) => {
    const { username, password } = req.body
    end_form.query(`select id_user,username,form_limit,quset_limit,file_limit,img_limit from formuser where username = '${username}' and password = '${password}';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/fuser-api/userid/option', (req, res) => {
    const { id_user } = req.body
    end_form.query(`select form_limit,quset_limit,ans_limit,file_limit,img_limit,map_limit from formuser where id_user = '${id_user}';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
////formbuider////
app.get('/fb-api/gets', (req, res) => {
    // const { staid } = req.body
    end_form.query(`SELECT *, 
    TO_CHAR(editdate, 'DD-MM-YYYY HH24:MI:ss')
    FROM formbuider order by editdate desc;`, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/listform', (req, res) => {
    const { id_user } = req.body
    end_form.query(`SELECT *, 
    TO_CHAR(editdate, 'DD-MM-YYYY HH24:MI:ss')
    FROM formbuider WHERE id_user = '${id_user}' order by editdate desc;`, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/getform', (req, res) => {
    const { id_date } = req.body;
    const sql = `select * from formbuider WHERE id_date='${id_date}'`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/getform/tool', (req, res) => {
    const { id_date } = req.body;
    const sql = `select pj_tool from formbuider WHERE id_date='${id_date}'`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/getform/map', (req, res) => {
    const { id_date } = req.body;
    const sql = `select * from formbuider WHERE id_date='${id_date}' and pj_map='Single';`
    end_form.query(sql).then(r => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/fb-api/deleteform', (req, res) => {
    const { id_date } = req.body;
    const sql = `DELETE FROM formbuider WHERE id_date = '${id_date}'`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: 'success'
        })
    })
})
app.get('/fb-api/checkform/:id_date', (req, res) => {
    const id_date = req.params.id_date;
    const sql = `select * from formbuider WHERE id_date='${id_date}' and pj_map='Multiple';`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/selectform', (req, res) => {
    const { id_date } = req.body;
    const sql = `select * from formbuider WHERE pj_html IS NOT NULL and pj_status = 'public' order by editdate desc;`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/selectform/map', (req, res) => {
    const { id_date } = req.body;
    const sql = `select * from formbuider WHERE pj_html IS NOT NULL and pj_status = 'public' and pj_map='Single' order by editdate desc;`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/selectform/notmap', (req, res) => {
    const { id_date } = req.body;
    const sql = `select * from formbuider WHERE pj_html IS NOT NULL and pj_status = 'public' and pj_map='Multiple' order by editdate desc;`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/selectform/partner', (req, res) => {
    const { id_date } = req.body;
    const sql = `select * from formbuider WHERE pj_html IS NOT NULL and pj_status = 'somepeople' and id_date = '${id_date}';`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fb-api/save', async (req, res) => {
    // const { id_date, id_user, pj_name, pj_data, pj_html } = req.body;
    // const sql = `INSERT INTO formbuider(id_date , id_user,pj_name , pj_data, pj_html)VALUES('${id_date}', '${id_user}','${pj_name}','${pj_data}','${pj_html}')`
    // end_form.query(sql).then(r => {
    //     res.status(200).json({
    //         data: 'Save data'
    //     })
    // })

    const { id_date, data } = req.body;
    await end_form.query(`INSERT INTO formbuider(id_date)VALUES('${id_date}');`)
    await end_form.query(`UPDATE formbuider SET editdate=now() WHERE id_date='${id_date}'`)
    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE formbuider SET ${d}='${data[d]}' WHERE id_date='${id_date}'`;
            console.log(sql)
            await end_form.query(sql)
        }
    }
    res.status(200).json({
        data: 'Save data'
    })

})
app.post('/fb-api/update', async (req, res) => {
    const { id_date, data } = req.body;
    await end_form.query(`UPDATE formbuider SET editdate=now() WHERE id_date='${id_date}'`)
    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE formbuider SET ${d}='${data[d]}' WHERE id_date='${id_date}'`;
            console.log(sql)
            await end_form.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})
////formanswer////
app.post('/fans-api/save', async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    await end_form.query(`INSERT INTO formanswer(id_ans)VALUES('${data.id_ans}');`)
    await end_form.query(`UPDATE formanswer SET ans_dt=now() WHERE id_ans='${data.id_ans}'`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'id_ans') {
            let sql = `UPDATE formanswer SET ${d}='${data[d]}' WHERE id_ans ='${data.id_ans}'`;
            // console.log(sql)
            await end_form.query(sql)
        }
    }
    res.status(200).json({
        data: 'Save data'
    })

})
app.post('/fans-api/deleteans', (req, res) => {
    const { id_ans, id_user, id_form } = req.body;
    const sql = `DELETE FROM formanswer WHERE id_ans = '${id_ans}' and id_user ='${id_user}' and id_form ='${id_form}';`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: 'success'
        })
    })
})
app.post('/fans-api/deleteans/byform', (req, res) => {
    const { id_form } = req.body;
    const sql = `DELETE FROM formanswer WHERE id_form ='${id_form}';`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: 'success'
        })
    })
})
app.post('/fans-api/selectform', (req, res) => {
    const { id_form } = req.body;
    const sql = `SELECT* FROM public.formanswer where id_form = '${id_form}' order by ans_dt DESC;`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/fans-api/listform', (req, res) => {
    const { id_user } = req.body;
    const sql = `
    SELECT DISTINCT ans_fname, MAX(ans_dt) ,MIN(id_form) FROM formanswer  WHERE id_user = '${id_user}' 
    GROUP BY ans_fname 
    ORDER BY MAX(ans_dt) DESC, ans_fname;`
    end_form.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
////datasource////
app.get('/ds-api/get', (req, res) => {
    // const { staid } = req.body
    end_form.query(`SELECT * FROM datasource order by d_row desc;`, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/ds-api/getdata', (req, res) => {
    // const { staid } = req.body
    end_form.query(`SELECT d_name,d_detail,d_groups,d_keywords,d_id,d_username,d_tnow,d_sd,d_datafiles  FROM datasource where d_access='publish' order by d_tnow desc;`, (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/ds-api/save', async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    await end_form.query(`INSERT INTO datasource(d_id)VALUES('${data.d_id}');`)
    await end_form.query(`UPDATE datasource SET d_tnow=now() WHERE d_id ='${data.d_id}';`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'd_id') {
            let sql = `UPDATE datasource SET ${d}='${data[d]}' WHERE d_id ='${data.d_id}'`;
            // console.log(sql)
            await end_form.query(sql)
        }
    }
    res.status(200).json({
        data: 'Save data'
    })

})
app.post('/ds-api/listdata', (req, res) => {
    const { d_iduser } = req.body
    if (d_iduser !== 'administrator') {
        end_form.query(`select d_name,d_id,d_access,d_tnow,d_sd from datasource where d_iduser='${d_iduser}' order by d_tnow desc;`, (e, r) => {
            res.status(200).json({
                data: r.rows
            })
        })
    } else {
        end_form.query(`select d_name,d_id,d_access,d_tnow,d_sd from datasource order by d_tnow desc;`, (e, r) => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})
app.post('/ds-api/editdata', (req, res) => {
    const { d_id } = req.body
    end_form.query(`select * from datasource where d_id='${d_id}';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/ds-api/loaddata', (req, res) => {
    const { d_id } = req.body
    end_form.query(`select * from datasource where d_id='${d_id}';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/ds-api/checkdata', (req, res) => {
    const { d_id } = req.body
    end_form.query(`select * from datasource where d_id='${d_id}' and d_access ='publish';`, (e, r) => {
        if (r.rows.length == 0) {
            res.status(200).json({
                data: 'false'
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})
app.post('/ds-api/update', async (req, res) => {
    const { data } = req.body
    await end_form.query(`UPDATE datasource SET d_tnow=now() WHERE d_id ='${data.d_id}';`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'd_id') {
            let sql = `UPDATE datasource SET ${d}='${data[d]}' WHERE d_id ='${data.d_id}'`;
            // console.log(sql)
            await end_form.query(sql)
        }
    }
    res.status(200).json({
        data: 'Update data'
    })
})
app.post('/ds-api/deletedata', async (req, res) => {
    const { d_id } = req.body
    await end_form.query(`DELETE FROM datasource WHERE d_id ='${d_id}';`).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: 'success'
        })
    })
})
app.post('/ds-api/access', async (req, res) => {
    const { d_id, d_access } = req.body
    if (d_id) {
        await end_form.query(`UPDATE datasource SET d_access='${d_access}' WHERE d_id ='${d_id}';
            UPDATE datasource SET d_tpublish=now() WHERE d_id ='${d_id}';`).then(r => {
            // console.log(r.rows)
            res.status(200).json({
                data: 'access'
            })
        })
    }
})
app.post('/ds-api/sd', async (req, res) => {
    const { d_id } = req.body
    if (d_id) {
        await end_form.query(`SELECT d_sd from datasource WHERE d_id ='${d_id}';`).then(r => {
            var sd = Number(r.rows[0].d_sd) + 1
            end_form.query(`UPDATE datasource SET d_sd='${sd}' WHERE d_id ='${d_id}';`).then(r => {
                res.status(200).json({
                    data: 'success'
                })
            })
        })
    }
})
////datahitstory////
app.post('/ds-api/hitstory', async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    await end_form.query(`INSERT INTO datahitstory (id_user,username,dataid,dataname,datafile,d_tdate) 
    VALUES('${data.id_user}','${data.username}','${data.dataid}','${data.dataname}','${data.datafile}','${data.d_tdate}');`).then(r => {
        res.status(200).json({
            data: 'hitstory'
        })
    })
})
app.post('/ds-api/hitstory/getdata', async (req, res) => {
    const { id_user } = req.body;
    // console.log(data)
    if (id_user == 'admin') {
        await end_form.query(`SELECT username,dataname,datafile,d_tdate FROM datahitstory ORDER BY Hrow DESC;`).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})
module.exports = app;