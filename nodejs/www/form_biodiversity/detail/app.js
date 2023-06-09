let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_biodiversity = sessionStorage.getItem('f_biodiversity');
$(document).ready(() => {
    if (urid) {
        if (f_biodiversity == 'false') {
            $("#noauth").modal("show");
        }
    } else {
        $("#noauth").modal("show");
    }
})
let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

let proj_id = sessionStorage.getItem('biodiversity_proj_gid');
let fromAdmin = sessionStorage.getItem('biodiversity_from_admin');
// console.log(fromAdmin);
let link;
if (fromAdmin) {
    link = "./../report_admin/index.html"
    sessionStorage.removeItem('biodiversity_from_admin');
} else {
    link = "./../report/index.html"
}

let userid;

const url = "https://engrids.soc.cmu.ac.th/api";

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
});

const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: 'th:province_4326',
    format: 'image/png',
    transparent: true
});

// let lyrs = L.featureGroup().addTo(map)

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

var overlayMap = {
    "ขอบเขตจังหวัด": pro
}

L.control.layers(baseMap, overlayMap).addTo(map);

let geom = "";
let dataurl = "";

map.on('click', (e) => {
    if (geom) {
        map.removeLayer(geom);
    }

    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

    $("#lat").val(e.latlng.lat)
    $("#lon").val(e.latlng.lng)
});

axios.post(url + "/biodiversity-api/getdataone", { proj_id: proj_id }).then(r => {
    // console.log(r);
    getAmp(r.data.data[0].pro);
    getTam(r.data.data[0].amp);
    setTimeout(() => {
        $('#pro').val(r.data.data[0].pro);
        $('#amp').val(r.data.data[0].amp);
        $('#tam').val(r.data.data[0].tam);
    }, 1000);

    $('#bioname').val(r.data.data[0].bioname);
    $('#biodetail').val(r.data.data[0].biodetail);
    $('#bioplace').val(r.data.data[0].bioplace);
    $('#biotype').val(r.data.data[0].biotype);
    $('#lat').val(r.data.data[0].lat);
    $('#lon').val(r.data.data[0].lon);
    $("#preview").attr("src", r.data.data[0].img);
    $('#reporter').val(r.data.data[0].usrname);

    let json = JSON.parse(r.data.data[0].geojson);
    // console.log(json);
    geom = L.geoJSON(json, {
        name: "p"
    }).addTo(map)

    map.setView([Number(r.data.data[0].lat), Number(r.data.data[0].lon)], 12);
})

$('#bioname').on("input", function () {
    if (this.value == '') {
        $("#bioname").addClass("is-invalid")
        console.log("false")
    } else {
        $("#bioname").removeClass("is-invalid")
        console.log("true")
    }
})
$('#bioplace').on("input", function () {
    if (this.value == '') {
        $("#bioplace").addClass("is-invalid")
        console.log("false")
    } else {
        $("#bioplace").removeClass("is-invalid")
        console.log("true")
    }
})
$('#biotype').on("input", function () {
    if (this.value == '') {
        $("#biotype").addClass("is-invalid")
        console.log("false")
    } else {
        $("#biotype").removeClass("is-invalid")
        console.log("true")
    }
})
$('#pro').on("input", function () {
    if (this.value == '') {
        $("#pro").addClass("is-invalid")
        console.log("false")
    } else {
        $("#pro").removeClass("is-invalid")
        console.log("true")
    }
})
$('#amp').on("input", function () {
    if (this.value == '') {
        $("#amp").addClass("is-invalid")
        console.log("false")
    } else {
        $("#amp").removeClass("is-invalid")
        console.log("true")
    }
})
$('#tam').on("input", function () {
    if (this.value == '') {
        $("#tam").addClass("is-invalid")
        console.log("false")
    } else {
        $("#tam").removeClass("is-invalid")
        console.log("true")
    }
})

let sendData = () => {
    // console.log(geom[0]);
    if ($('#bioname').val() == "" || $('#bioplace').val() == "" || $('#biotype').val() == "" || $('#pro').val() == "" || $('#amp').val() == "" || $('#tam').val() == "") {
        $("#NOdatamodal").modal("show")
        if ($('#bioname').val() == "") {
            $("#bioname").addClass("is-invalid")
        }
        if ($('#bioplace').val() == "") {
            $("#bioplace").addClass("is-invalid")
        }
        if ($('#biotype').val() == "") {
            $("#biotype").addClass("is-invalid")
        }
        if ($('#pro').val() == "") {
            $("#pro").addClass("is-invalid")
        }
        if ($('#amp').val() == "") {
            $("#amp").addClass("is-invalid")
        }
        if ($('#tam').val() == "") {
            $("#tam").addClass("is-invalid")
        }
    } else if ($('#bioname').val() !== "" || $('#bioplace').val() !== "" || $('#biotype').val() == "" || $('#pro').val() == "" || $('#amp').val() == "" || $('#tam').val() == "") {
        const obj = {
            proj_id: proj_id,
            data: {
                usrid: urid,
                usrname: urname,
                bioname: $('#bioname').val(),
                biodetail: $('#biodetail').val(),
                bioplace: $('#bioplace').val(),
                biotype: $('#biotype').val(),
                pro: $('#pro').val(),
                amp: $('#amp').val(),
                tam: $('#tam').val(),
                pro_name: $('#pro_name').val(),
                amp_name: $('#amp_name').val(),
                tam_name: $('#tam_name').val(),
                lat: $('#lat').val(),
                lon: $('#lon').val(),
                // img: dataurl ? dataurl : dataurl = "",
                geom: geom == "" ? "" : geom.toGeoJSON()
            }
        }
        // console.log(obj);
        if (geom != "") {
            axios.post(url + "/biodiversity-api/update", obj).then((r) => {
                r.data.data == "success" ? $("#okmodal").modal("show") : null;
                sessionStorage.removeItem('biodiversity_proj_gid');
            })
        } else {
            $("#modal").modal("show");
        }
        return false;
    }
}

let gotoReport = () => {
    location.href = link;
    sessionStorage.removeItem('biodiversity_proj_gid');
}

let refreshPage = () => {
    location.reload(true);
}

let getAmp = (e) => {
    axios.get(url + "/eec-api/get-th-amp/" + e).then(r => {
        $("#amp").empty()
        $("#tam").empty()
        $("#amp").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#amp").append(`<option value="${i.ap_idn}">${i.amp_name}</option>`)
        })
    })
}

let getTam = (e) => {
    axios.get(url + "/eec-api/get-th-tam/" + e).then(r => {
        // console.log(r);
        $("#tam").empty()
        $("#tam").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#tam").append(`<option value="${i.tb_idn}">${i.tam_name}</option>`)
        })
    })
}

let getTamOne = (e) => {
    axios.get(url + "/eec-api/get-th-onetam/" + e).then(r => {
        r.data.data.map(i => {
            // console.log(i);
            $("#pro_name").val(i.pro_name)
            $("#amp_name").val(i.amp_name)
            $("#tam_name").val(i.tam_name)
        })
    })
}


