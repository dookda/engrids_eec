var map = L.map('map', {
    center: [18.335017, 99.719808],
    zoom: 9,
    zoomControl: false
});


var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    lyr: 'basemap'
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

const grod = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});
const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});

// let lyrs = L.layerGroup();
// axios.get('http://localhost:3700/api/basestation').then((r) => {
//     // console.log(r);
//     r.data.data.map(i => {
//         // console.log(i);
//         let mk = L.marker([i.y_coor, i.x_coor]);
//         mk.bindPopup('สถานี ' + i.stat_name)
//         mk.addTo(lyrs)
//     })
// })

var baseMap = {
    "แผนที่ OSM": osm,
    "แผนที่ CartoDB": CartoDB_Positron.addTo(map),
    "แผนที่ถนน": grod,
    "แผนที่ภาพถ่าย": ghyb
}

var overlayMap = {
    // "ตำแหน่งสถานีตรวจวัด": lyrs.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map)
L.control.zoom({ position: 'bottomright' }).addTo(map);

var chart;


let showChart = (param, unit, dat, sta) => {
    // console.log(param, unit, dat, sta);
    Highcharts.chart(param, {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            // marginRight: 100,
            events: {
                load: function () {
                    var series = this.series[0];
                    var last = "";
                    setInterval(async () => {
                        axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrq-api.php", { param: param, sort: "DESC", stname: sta, limit: 1 }).then((r) => {
                            // console.log(r);

                            let x = (new Date()).getTime();
                            let y = Number(r.data.data[0].val);
                            return series.addPoint([x, y], true, true);
                        })
                    }, 5000);
                }
            },
            zoomType: 'x'
        },

        time: {
            useUTC: false
        },

        title: false,
        accessibility: {
            announceNewData: {
                enabled: true,
                minAnnounceInterval: 15000,
                announcementFormatter: function (allSeries, newSeries, newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
                    return false;
                }
            }
        },

        xAxis: {
            type: 'datetime',
            tickPixelInterval: 120,
            minorTickInterval: 'auto',
            startOnTick: false,
            endOnTick: false
        },

        yAxis: {
            title: {
                text: unit
            },
            // min: -5,
            // max: 5,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            tickInterval: 1
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            //  pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} cm'
            pointFormat: 'เวลา {point.x:%H:%M:%S} น.<br/>{point.y:.2f} cm'
        },

        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'value',
            data: dat
        }]
    })
}


$("#sta").on('change', function () {
    console.log(this.value)
    axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrq-api.php", { param: "do", sort: "DESC", stname: this.value, limit: 5 }).then(async (r) => {
        console.log(r);
        let data = [];
        let time = (new Date()).getTime();
        r.data.data.map((i, k) => {
            data.push({
                x: time + k * 1000,
                y: Number(i.val)
            });
        })
        showChart("do", "mg/L", data, this.value)
    })

    axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrq-api.php", { param: "ec", sort: "DESC", stname: this.value, limit: 5 }).then(async (r) => {
        // console.log(r);
        let data = [];
        let time = (new Date()).getTime();
        r.data.data.map((i, k) => {
            data.push({
                x: time + k * 1000,
                y: Number(i.val)
            });
        })
        showChart("ec", "mS/cm", data, this.value)
    })

    axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrq-api.php", { param: "ph", sort: "DESC", stname: this.value, limit: 5 }).then(async (r) => {
        // console.log(r);
        let data = [];
        let time = (new Date()).getTime();
        r.data.data.map((i, k) => {
            data.push({
                x: time + k * 1000,
                y: Number(i.val)
            });
        })
        showChart("ph", "pH", data, this.value)
    })

    axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrq-api.php", { param: "tmp", sort: "DESC", stname: this.value, limit: 5 }).then(async (r) => {
        // console.log(r);
        let data = [];
        let time = (new Date()).getTime();
        r.data.data.map((i, k) => {
            data.push({
                x: time + k * 1000,
                y: Number(i.val)
            });
        })
        showChart("tmp", "tmp", data, this.value)
    })
})