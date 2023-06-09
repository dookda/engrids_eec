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

var mapbox = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9va2RhIiwiYSI6ImNsaW9vNnFnNjBhdWoza29jbzExaWd1OG4ifQ.ISRHvY9tOtX4kVDxEdCD-w", {
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

const tam = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

let lyrs = L.featureGroup().addTo(map)

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

var overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
}

L.control.layers(baseMap, overlayMap).addTo(map);

let geom = "";
let dataurl = "";

let onLocationFound = (e) => {
    // console.log(e);
    if (geom) {
        map.removeLayer(geom);
    }
    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

    $("#lat").val(e.latlng.lat);
    $("#lon").val(e.latlng.lng);
}

map.on("locationfound", onLocationFound);
map.locate({ setView: true, maxZoom: 16 });

map.on('click', (e) => {
    if (geom) {
        map.removeLayer(geom);
    }
    // lc.stop();
    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

    $("#lat").val(e.latlng.lat);
    $("#lon").val(e.latlng.lng);
});

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
                img: dataurl ? dataurl : dataurl = "",
                geom: geom == "" ? "" : geom.toGeoJSON()
            }
        }

        // console.log(obj);

        if (geom != "") {
            axios.post(url + "/biodiversity-api/insert", obj).then((r) => {
                r.data.data == "success" ? $("#okmodal").modal("show") : null
            })
        } else {
            $("#modal").modal("show");
        }
        return false;
    }
}

let gotoReport = () => {
    location.href = "./../report/index.html";
}

let refreshPage = () => {
    location.reload(true);
}

$("#imgfile").change(function (evt) {
    var filesToUploads = document.getElementById('imgfile').files;
    var file = filesToUploads[0];
    var reader = new FileReader();

    reader.onloadend = (e) => {
        let imageOriginal = reader.result;
        resizeImage(file);
        document.getElementById('preview').src = imageOriginal;
    }
    reader.readAsDataURL(file);
});

let resizeImage = (file) => {
    var maxW = 600;
    var maxH = 600;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = document.createElement('img');
    var result = '';
    img.onload = function () {
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        context.drawImage(img, 0, 0, iwScaled, ihScaled);
        result += canvas.toDataURL('image/jpeg', 0.5);
        dataurl = result;
        // document.getElementById('rez').src = that.imageResize;
    }
    img.src = URL.createObjectURL(file);
}

let removeLayer = () => {
    map.eachLayer(i => {
        // console.log(i);
        i.options.name == "bnd" ? map.removeLayer(i) : null;
    })
}

var boundStyle = {
    "color": "#ff7800",
    "fillColor": "#fffcf5",
    "weight": 5,
    "opacity": 0.45,
    "fillOpacity": 0.25
};

let getAmp = (e) => {
    // console.log(e);
    removeLayer();
    axios.get(`${url}/eec-api/get-bound/pro/${e}`).then(async (r) => {
        let geojson = await JSON.parse(r.data.data[0].geom);
        // console.log(geojson);
        let a = L.geoJSON(geojson, {
            style: boundStyle,
            name: "bnd"
        }).addTo(map);
        map.fitBounds(a.getBounds());
    })

    axios.get(url + "/eec-api/get-th-amp/" + e).then(r => {
        $("#amp").empty();
        $("#tam").empty();
        $("#amp").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#amp").append(`<option value="${i.ap_idn}">${i.amp_name}</option>`)
        });
    });
}

let getTam = (e) => {
    removeLayer();
    axios.get(`${url}/eec-api/get-bound/amp/${e}`).then(async (r) => {
        let geojson = await JSON.parse(r.data.data[0].geom);
        // console.log(geojson);
        let a = L.geoJSON(geojson, {
            style: boundStyle,
            name: "bnd"
        }).addTo(map);
        map.fitBounds(a.getBounds());
    })

    axios.get(url + "/eec-api/get-th-tam/" + e).then(r => {
        // console.log(r);
        $("#tam").empty();
        $("#tam").append(`<option value=""></option>`);
        r.data.data.map(i => {
            $("#tam").append(`<option value="${i.tb_idn}">${i.tam_name}</option>`)
        });
    });
}

let getTamOne = (e) => {
    removeLayer();
    axios.get(`${url}/eec-api/get-bound/tam/${e}`).then(async (r) => {
        let geojson = await JSON.parse(r.data.data[0].geom);
        // console.log(geojson);
        let a = L.geoJSON(geojson, {
            style: boundStyle,
            name: "bnd"
        }).addTo(map);
        map.fitBounds(a.getBounds());
    })

    axios.get(url + "/eec-api/get-th-onetam/" + e).then(r => {
        r.data.data.map(i => {
            // console.log(i);
            $("#pro_name").val(i.pro_name);
            $("#amp_name").val(i.amp_name);
            $("#tam_name").val(i.tam_name);
        });
    });
}


