let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "user") {
    location.href = "./../../form_register/login/index.html";
}
const url = "https://engrids.soc.cmu.ac.th/api";

$.get(url+"/api/getLv").done(r => {
    console.log(r)
    let name = [];
    let waterLv = [];
    r.data.map(i => {

        name.push(i.p_name);
        waterLv.push(Number(i.water_l));

    })

    setTimeout(() => {
        showChart(name, waterLv)
    }, 500)
})

function showChart(name, waterLv) {
    console.log(name, waterLv)
    Highcharts.chart('chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'ระดับน้ำ'
        },

        xAxis: {
            categories: name,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'ค่าความสูง'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: name,
            data: waterLv

        },]
    });

}
