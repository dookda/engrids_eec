let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_familyforest = sessionStorage.getItem('f_familyforest');
$(document).ready(() => {
    if (urid) {
        if (f_familyforest == 'false') {
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

$(document).ready(() => {
    loadMap();
    // getData();
});

let latlng = {
    lat: 13.196768,
    lng: 101.364720
}
let map = L.map('map', {
    center: latlng,
    zoom: 9
});

let marker, gps;

const url = "https://engrids.soc.cmu.ac.th/api";

let usr = urid;

function loadMap() {
    var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1,
        lyrname: "bmap"
    });

    const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        lyrname: "bmap"
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
}

let onLocationFound = async (e) => {
    // console.log(e.latlng)
}

let onLocationError = (e) => {
    // console.log(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({ setView: true, maxZoom: 16 });

map.pm.addControls({
    position: 'topleft',
    drawMarker: false,
    drawCircle: false,
    drawPolyline: false,
    drawRectangle: true,
    drawCircleMarker: false,
    cutPolygon: false,
    rotateMode: false,
    removalMode: false,
    editMode: false,
    dragMode: false
});

let geom = "";
let dataurl = "";

let rmlayer = () => {
    map.eachLayer(i => {
        i.options.cname ? map.removeLayer(i) : null;
    })
}

map.on("pm:drawstart", e => {
    rmlayer();
});

map.on("pm:create", e => {
    e.layer.options.cname = "created"
    geom = e.layer.toGeoJSON();
});

axios.post(url + "/ff-api/geteatlist", { ftype: "พืชกินได้" }).then(r => {
    r.data.data.map(i => $("#eat_plant_list").append(`<option value="${i.fplant}" >${i.fplant}</option>`))
})

axios.post(url + "/ff-api/geteatlist", { ftype: "พืชใช้สอย" }).then(r => {
    r.data.data.map(i => $("#use_plant_list").append(`<option value="${i.fplant}" >${i.fplant}</option>`))
})

axios.post(url + "/ff-api/geteatlist", { ftype: "พืชเศรษฐกิจ" }).then(r => {
    r.data.data.map(i => $("#econ_plant_list").append(`<option value="${i.fplant}" >${i.fplant}</option>`))
})

axios.post(url + "/ff-api/geteatlist", { ftype: "พืชสมุนไพร" }).then(r => {
    r.data.data.map(i => $("#herb_plant_list").append(`<option value="${i.fplant}" >${i.fplant}</option>`))
})

let addEatList = () => {
    let newItem = $("#newitem_eat_plant_list").val();
    $("#eat_plant_list").append(`<option value="${newItem}" selected>${newItem}</option>`);
    $("#newitem_eat_plant_list").val("")
}

let addUseList = () => {
    let newItem = $("#newitem_use_plant_list").val();
    $("#use_plant_list").append(`<option value="${newItem}" selected>${newItem}</option>`);
    $("#newitem_use_plant_list").val("")
}

let addEconList = () => {
    let newItem = $("#newitem_econ_plant_list").val();
    $("#econ_plant_list").append(`<option value="${newItem}" selected>${newItem}</option>`);
    $("#newitem_econ_plant_list").val("")
}

let addHerbList = () => {
    let newItem = $("#newitem_herb_plant_list").val();
    $("#herb_plant_list").append(`<option value="${newItem}" selected>${newItem}</option>`);
    $("#newitem_herb_plant_list").val("")
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

$("#fname").val(urname);
let chkData = () => {
    if (!geom) {
        $("#chkgeommodal").modal("show")
    } else {
        postData()
    }
}

let postData = async () => {
    let eat_plant_list = $("#eat_plant_list").val();
    let use_plant_list = $("#use_plant_list").val();
    let econ_plant_list = $("#econ_plant_list").val();
    let herb_plant_list = $("#herb_plant_list").val();
    let ffid = Date.now()

    await eat_plant_list.map(i => {
        let obj = {
            ftype: "พืชกินได้",
            fplant: i,
            ffid: ffid
        }
        axios.post(url + "/ff-api/insert", obj).then(
            // () => console.log("พืชกินได้ ok")
        );
    })

    await use_plant_list.map(i => {
        let obj = {
            ftype: "พืชใช้สอย",
            fplant: i,
            ffid: ffid
        }
        axios.post(url + "/ff-api/insert", obj).then(
            // () => console.log("พืชใช้สอย ok")
        );
    })

    await econ_plant_list.map(i => {
        let obj = {
            ftype: "พืชเศรษฐกิจ",
            fplant: i,
            ffid: ffid
        }
        axios.post(url + "/ff-api/insert", obj).then(
            // () => console.log("พืชเศรษฐกิจ ok")
        );
    })

    await herb_plant_list.map(i => {
        let obj = {
            ftype: "พืชสมุนไพร",
            fplant: i,
            ffid: ffid
        }
        axios.post(url + "/ff-api/insert", obj).then(
            // () => console.log("พืชสมุนไพร ok")
        );
    })

    // let fname = $("#fname").val();
    let frai = $("#frai").val();
    let flandtype = $("#flandtype").val();
    let datObj = {
        ffid: ffid,
        data: {
            usrid: urid,
            usrname: urname,
            frai: frai,
            flandtype: flandtype,
            geom: geom,
            img: dataurl
        }
    }
    await axios.post(url + "/ff-api/insert-regis", datObj).then(() => $("#okmodal").modal("show"));
}

let gotoDaily = () => {
    // console.log("ok");
    location.href = "./../daily/index.html";
    sessionStorage.setItem('usr', usr);
}






