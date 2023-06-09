let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_organic = sessionStorage.getItem('f_organic');

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}
$(document).ready(function () {
    if (urid) {
        if (f_organic == 'false') {
            $("#noauth").modal("show")
        }
    } else {
        $("#noauth").modal("show")
    }
})

$("#usrname").text(urname);

let userid;

let main = async () => {
    await liff.init({ liffId: "1655648770-JLXzogag" })
    if (liff.isLoggedIn()) {
        getUserProfile()
    } else {
        liff.login()
    }
}

// main()
let getUserProfile = async () => {
    const profile = await liff.getProfile();
    $('#profile').attr('src', await profile.pictureUrl);
    $('#userId').text(profile.userId);
    $('#statusMessage').text(await profile.statusMessage);
    $('#displayName').text(await profile.displayName);
    userid = profile.userId;
}

const url = "https://engrids.soc.cmu.ac.th/api";
let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

let dataurl;

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
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

var baseMap = {
    "Mapbox": mapbox,
    "google Hybrid": ghyb.addTo(map)
}

var overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
}

L.control.layers(baseMap, overlayMap).addTo(map);

var lat;
var lng;
let gps;
let onLocationFound = (e) => {
    // latlng = e.latlng;
    // lat = e.latlng.lat;
    // lng = e.latlng.lng;
    // console.log(e.latlng)
    // $('#lat').val(e.latlng.lat);
    // $('#lng').val(e.latlng.lng);
    // changeLatlng(e.latlng);
}
function changeLatlng(latlng) {
    // console.log(latlng)
    // gps = L.marker(latlng, {
    //     draggable: true,
    //     name: 'p'
    // });
    // gps.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
    // gps.on('dragend', (e) => {
    //     console.log(e)
    //     $('#lat').val(e.target._latlng.lat);
    //     $('#lng').val(e.target._latlng.lng);
    // })
}
map.on("locationfound", onLocationFound);

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: ""
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
}).addTo(map);

lc.start();

map.pm.addControls({
    position: 'topleft',
    drawMarker: false,
    drawCircle: false,
    drawPolyline: false,
    drawRectangle: true,
    drawCircleMarker: false,
    cutPolygon: false
});

var datageom

let geom = [];

map.on('pm:create', e => {
    $('#myModal').modal().show()
    datageom = e.layer.toGeoJSON();
});
// console.log(geom)
$("#pro").on("change", function () {
    getPro(this.value)
});
$("#amp").on("change", function () {
    getAmp(this.value)

});
$("#tam").on("change", function () {
    getTam(this.value)
});
let prov_name, prov_code, amp_name, amp_code, tam_name, tam_code;
let getPro = (procode) => {
    axios.get(url + `/eec-api/get-amp/${procode}`).then(r => {
        // console.log(r.data.data);
        $("#amp").empty();
        $("#tam").empty();
        r.data.data.map(i => {
            $("#amp").append(`<option value="${i.amphoe_idn}">${i.amp_namt}</option>`)
        })
    })
    prov_code = procode
    if (procode == 20) {
        prov_name = "ชลบุรี"
    } else if (procode == 21) {
        prov_name = "ระยอง"
    } else if (procode == 24) {
        prov_name = "ฉะเชิงเทรา"
    }
}
let getAmp = (ampcode) => {
    axios.get(url + `/eec-api/get-tam/${ampcode}`).then(r => {
        $("#tam").empty();
        r.data.data.map(i => {
            $("#tam").append(`<option value="${i.tambon_idn}">${i.tam_namt}</option>`)
        })
        tam_code = r.data.data[0].tambon_idn
        tam_name = r.data.data[0].tam_namt
    })

    axios.get(url + `/eec-api/get-amp/${prov_code}`).then(r => {
        let data = r.data.data.filter(e => e.amphoe_idn == ampcode)
        amp_name = data[0].amp_namt
        amp_code = ampcode
    })
}
let getTam = (tamcode) => {
    axios.get(url + `/eec-api/get-tam/${amp_code}`).then(r => {
        let data = r.data.data.filter(e => e.tambon_idn == tamcode)
        tam_name = data[0].tam_namt
        tam_code = tamcode
    })
}

var test = [{ Name: "", Date: "", Detail: "" }]
showTable(test)
function showTable(data) {
    // console.log(data)
    $.extend(true, $.fn.dataTable.defaults, {
        "language": {
            "sProcessing": "กำลังดำเนินการ...",
            "sLengthMenu": "แสดง_MENU_ แถว",
            "sZeroRecords": "ไม่พบข้อมูล",
            "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
            "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
            "sInfoPostFix": "",
            "sSearch": "ค้นหา:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "เริ่มต้น",
                "sPrevious": "ก่อนหน้า",
                "sNext": "ถัดไป",
                "sLast": "สุดท้าย"
            }
        }
    });
    let table = $('#tab').DataTable({
        paging: false,
        language: {
            processing: true,
        },
        data: data,
        columns: [
            { data: 'Name' },
            { data: 'Date' },
            { data: 'Detail' },
        ],
        searching: false,
        select: true,
        pageLength: 8,
        responsive: {
            details: false
        },
    });
}
function addrowtab(dataA, dataB, dataC) {
    var addTable = "<tr><td>" + dataA + "</td><td>" + dataB + "</td><td>" + dataC + "</td></tr";
    $("table tbody").prepend(addTable);
}
// 
// document.getElementById('agdate').valueAsDate = new Date();

// let sendData = () => {
//     console.log(geom[0]);
//     const obj = {
//         data: {
//             userid: userid,
//             agname: $('#agname').val(),
//             agdate: $('#agdate').val(),
//             agarea: $('#agarea').val(),
//             agtype: $('#agtype').val(),
//             agdetail: $('#agdetail').val(),
//             img: dataurl ? dataurl : dataurl = "",
//             geom: geom == "" ? "" : geom[0]
//         }
//     }
//     console.log(obj);
//     if (geom.length > 0) {
//         axios.post(url + "/agi-api/insert", obj).then((r) => {
//             r.data.data == "success" ? $("#okmodal").modal("show") : null
//         })
//     } else {
//         $("#modal").modal("show");
//     }
//     return false;
// }

// let gotoList = () => {
//     location.href = "./../list/index.html";
// }

let refreshPage = () => {
    location.reload(true);
}

$('#imgfile').change(function (evt) {
    // console.log(evt);
    var files = evt.target.files;
    var file = files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    resize();
});
let dataimgurl
let resize = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imgfile').files;
        var file = filesToUploads[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("img");
                img.src = e.target.result;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var MAX_WIDTH = 800;
                var MAX_HEIGHT = 800;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                dataimgurl = canvas.toDataURL(file.type);
                // console.log(dataurl)
                // document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}
function closeModal() {
    document.getElementById("FormModal").reset();
}
function closeNOdata() {
    $("#NOdatamodal").modal("hide")
}

$("#Tagri").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").show();
        $("#TypeB").hide();
        $("#TypeC").hide();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})
$("#Tanimal").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").hide();
        $("#TypeB").show();
        $("#TypeC").hide();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})
$("#Tfishery").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").show();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})
$("#standAgri").on("change", function () {
    var a = $("#standAgri").val()
    if (a == "มีการรับรอง") {
        $("#Namestand").show();
    } else if (a == "ไม่มีการรับรอง") {
        $("#Namestand").hide();
    }
})
$("#fishselect").on("change", function () {
    var a = $("#fishselect").val()
    if (a == '1') {
        $("#fish1").show()
        $("#fish2").hide()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '2') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '3') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '4') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").show()
        $("#fish5").hide()
    } else if (a == '5') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").show()
        $("#fish5").show()
    } else {
        $("#fish1").hide()
        $("#fish2").hide()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    }
})
$("#BuySellUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#BSselect").show();
        $("#Buy").show();
        $("#Sell").show();
        $("#BSselect").on("change", function () {
            var a = $("#BSselect").val();
            // console.log(a)
            if (a == "ซื้อขาย") {
                $("#Buy").show();
                $("#Sell").show();

            } else if (a == "ซื้อ") {
                $("#Buy").show();
                $("#Sell").hide();

            } else if (a == "ขาย") {
                $("#Buy").hide();
                $("#Sell").show();
            }
        })
    } else {
        $("#BSselect").hide();
        $("#Buy").hide();
        $("#Sell").hide();
    }
})
$("#KeepUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#Keep").show();
    } else {
        $("#Keep").hide();
    }
})
$("#TransUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#Transform").show();
    } else {
        $("#Transform").hide();
    }
})
$("#prodselect").on("change", function () {
    var a = $("#prodselect").val();
    if (a == "1") {
        $("#product1").show();
        $("#product2").hide();
        $("#product3").hide();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "2") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").hide();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "3") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "4") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").show();
        $("#product5").hide();
    } else if (a == "5") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").show();
        $("#product5").show();
    } else {
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
    }
})

$('#into2').on("input", function () {
    if (this.value == '') {
        $("#into2").addClass("is-invalid")
        console.log("false")
    } else {
        $("#into2").removeClass("is-invalid")
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
$('#rpdate').on("input", function () {
    if (this.value == '') {
        $("#rpdate").addClass("is-invalid")
        console.log("false")
    } else {
        $("#rpdate").removeClass("is-invalid")
        console.log("true")
    }
})
$('#TypeA1').on("input", function () {
    if (this.value == '') {
        $("#TypeA1").addClass("is-invalid")
        console.log("false")
    } else {
        $("#TypeA1").removeClass("is-invalid")
        console.log("true")
    }
})
$('#cateAgri').on("input", function () {
    if (this.value == '') {
        $("#cateAgri").addClass("is-invalid")
        console.log("false")
    } else {
        $("#cateAgri").removeClass("is-invalid")
        console.log("true")
    }
})
$('#dateAgri').on("input", function () {
    if (this.value == '') {
        $("#dateAgri").addClass("is-invalid")
        console.log("false")
    } else {
        $("#dateAgri").removeClass("is-invalid")
        console.log("true")
    }
})
$('#dateAgout').on("input", function () {
    if (this.value == '') {
        $("#dateAgout").addClass("is-invalid")
        console.log("false")
    } else {
        $("#dateAgout").removeClass("is-invalid")
        console.log("true")
    }
})
$('#areaAgri').on("input", function () {
    if (this.value == '') {
        $("#areaAgri").addClass("is-invalid")
        console.log("false")
    } else {
        $("#areaAgri").removeClass("is-invalid")
        console.log("true")
    }
})
$('#selAni').on("input", function () {
    if (this.value == '') {
        $("#selAni").addClass("is-invalid")
        console.log("false")
    } else {
        $("#selAni").removeClass("is-invalid")
        console.log("true")
    }
})
$('#quanAni').on("input", function () {
    if (this.value == '') {
        $("#quanAni").addClass("is-invalid")
        console.log("false")
    } else {
        $("#quanAni").removeClass("is-invalid")
        console.log("true")
    }
})
$('#areaAni').on("input", function () {
    if (this.value == '') {
        $("#areaAni").addClass("is-invalid")
        console.log("false")
    } else {
        $("#areaAni").removeClass("is-invalid")
        console.log("true")
    }
})
$('#unitAni').on("input", function () {
    if (this.value == '') {
        $("#unitAni").addClass("is-invalid")
        console.log("false")
    } else {
        $("#unitAni").removeClass("is-invalid")
        console.log("true")
    }
})
$('#areafish').on("input", function () {
    if (this.value == '') {
        $("#areafish").addClass("is-invalid")
        console.log("false")
    } else {
        $("#areafish").removeClass("is-invalid")
        console.log("true")
    }
})
$('#unitfish').on("input", function () {
    if (this.value == '') {
        $("#unitfish").addClass("is-invalid")
        console.log("false")
    } else {
        $("#unitfish").removeClass("is-invalid")
        console.log("true")
    }
})



function saveModal() {
    let into2 = $('#into2').val();
    let pro = $('#pro').val();
    let amp = $('#amp').val();
    let tam = $('#tam').val();
    let rpdate = $('#rpdate').val();
    let TypeA1 = $('#TypeA1').val();
    let cateAgri = $('#cateAgri').val();
    let dateAgri = $('#dateAgri').val();
    let dateAgout = $('#dateAgout').val();
    let areaAgri = $('#areaAgri').val();
    let unitAgri = $('#unitAgri').val();
    let selAni = $('#selAni').val();
    let quanAni = $('#quanAni').val();
    let areaAni = $('#areaAni').val();
    let unitAni = $('#unitAni').val();
    let areafish = $('#areafish').val();
    let unitfish = $('#unitfish').val();

    var typeagri = document.getElementById('Tagri');
    if (typeagri.checked == true) {

        if (into2 == "" || pro == "" || amp == "" || tam == "" || rpdate == "" || TypeA1 == "" || cateAgri == "" || dateAgri == "" || dateAgout == ""
            || areaAgri == "" || unitAgri == "") {
            // $('#NOdatamodal').modal("show");
            if (into2 == "") {
                $('#into2').addClass("is-invalid")
            }
            if (pro == "") {
                $('#pro').addClass("is-invalid")
            }
            if (amp == "") {
                $('#amp').addClass("is-invalid")
            }
            if (tam == "") {
                $('#tam').addClass("is-invalid")
            }
            if (rpdate == "") {
                $('#rpdate').addClass("is-invalid")
            }
            if (TypeA1 == "") {
                $('#TypeA1').addClass("is-invalid")
            }
            if (cateAgri == "") {
                $('#cateAgri').addClass("is-invalid")
            }
            if (dateAgri == "") {
                $('#dateAgri').addClass("is-invalid")
            }
            if (dateAgout == "") {
                $('#dateAgout').addClass("is-invalid")
            }
            if (areaAgri == "") {
                $('#areaAgri').addClass("is-invalid")
            }
            if (unitAgri == "") {
                $('#unitAgri').addClass("is-invalid")
            }
        } else {
            confirmdata()
        }
    }

    var typeanimal = document.getElementById('Tanimal');
    if (typeanimal.checked == true) {
        if (into2 == "" || pro == "" || amp == "" || tam == "" || rpdate == "" || selAni == "" || quanAni == "" || areaAni == "" || unitAni == "") {
            if (into2 == "") {
                $('#into2').addClass("is-invalid")
            }
            if (pro == "") {
                $('#pro').addClass("is-invalid")
            }
            if (amp == "") {
                $('#amp').addClass("is-invalid")
            }
            if (tam == "") {
                $('#tam').addClass("is-invalid")
            }
            if (rpdate == "") {
                $('#rpdate').addClass("is-invalid")
            }
            if (selAni == "") {
                $('#selAni').addClass("is-invalid")
            }
            if (quanAni == "") {
                $('#quanAni').addClass("is-invalid")
            }
            if (areaAni == "") {
                $('#areaAni').addClass("is-invalid")
            }
            if (unitAni == "") {
                $('#unitAni').addClass("is-invalid")
            }
        } else {
            confirmdata()
        }
    }

    var typefish = document.getElementById('Tfishery');
    if (typefish.checked == true) {
        if (into2 == "" || pro == "" || amp == "" || tam == "" || rpdate == "" || areafish == "" || unitfish == "") {
            if (into2 == "") {
                $('#into2').addClass("is-invalid")
            }
            if (pro == "") {
                $('#pro').addClass("is-invalid")
            }
            if (amp == "") {
                $('#amp').addClass("is-invalid")
            }
            if (tam == "") {
                $('#tam').addClass("is-invalid")
            }
            if (rpdate == "") {
                $('#rpdate').addClass("is-invalid")
            }
            if (areafish == "") {
                $('#areafish').addClass("is-invalid")
            }
            if (unitfish == "") {
                $('#unitfish').addClass("is-invalid")
            }

        } else {
            confirmdata()
        }
    }

}
let confirmdata = () => {
    let dataleght = [];
    let Agri, Animal, Fishery, UseBS, UseKeep, UseTrans
    let u1BS, u1buni, u1suni, u2kuni, u3staun, u3proun
    let TypeS, tcateg, tdate, tdateout, tare, taruni, tstdard, tstdName, tamount, t1type, tsel
    let t3sel, t3f1uni, t3f2uni, t3f3uni, t3f4uni, t3f5uni
    let u3prosel, u3p1suni, u3p2suni, u3p3suni, u3p4suni, u3p5suni, u3p1puni, u3p2puni, u3p3puni, u3p4puni, u3p5puni

    var TypeAgri = document.getElementById('Tagri');
    if (TypeAgri.checked == true) {
        tstdard = $('#standAgri').val() ? $('#standAgri').val() : $('#standAgri').val() = ""
        tstdName = $('#namestand').val()
        TypeS = "เกษตรกรรม"
        tcateg = $('#cateAgri').val()
        tdate = $('#dateAgri').val()
        tdateout = $("#dateAgout").val()
        tare = $('#areaAgri').val()
        taruni = $('#unitAgri').val()
        tamount = ""
        t1type = $('#TypeA1').val()
    } else {
        // TypeS = ""
        tstdName = ""
        tdateout = ""
        tstdard = ""
        tdate = ""
        taruni = ""
        t1type = ""
    }
    var TypeAnimal = document.getElementById('Tanimal');
    if (TypeAnimal.checked == true) {
        TypeS = "ปศุสัตว์"
        tcateg = $('#cateAni').val()
        tamount = $('#quanAni').val()
        tare = $('#areaAni').val()
        taruni = $('#unitAni').val()
        tsel = $("#selAni").val()
    } else {
        // TypeS = ""
        taruni = ""
    }
    var Typefishery = document.getElementById('Tfishery');
    if (Typefishery.checked == true) {
        TypeS = "การประมง"
        tcateg = $("#watercat").val()
        tare = $('#areafish').val()
        taruni = $('#unitfish').val()
        t3sel = $("#fishselect").val()
        t3f1uni = $("#fishunit1").val()
        t3f2uni = $("#fishunit2").val()
        t3f3uni = $("#fishunit3").val()
        t3f4uni = $("#fishunit4").val()
        t3f5uni = $("#fishunit5").val()
    } else {
        // TypeS = ""
        // tcateg = ""
        taruni = ""
        t3sel = ""
        t3f1uni = ""
        t3f2uni = ""
        t3f3uni = ""
        t3f4uni = ""
        t3f5uni = ""
    }

    var UBS = document.getElementById('BuySellUse');
    if (UBS.checked == true) {
        UseBS = "ซื้อขาย"
        u1BS = $('#BSselect').val()
        u1bUnit = $('#BuyUnit').val()
        u1sUnit = $('#SellUnit').val()
    } else {
        UseBS = ""
        u1BS = ""
        u1buni = ""
        u1suni = ""
    }
    var UK = document.getElementById('KeepUse');
    if (UK.checked == true) {
        UseKeep = "กักเก็บ"
        u2kuni = $('#KeepUnit').val()
    } else {
        UseKeep = ""
        u2kuni = ""
    }
    var UT = document.getElementById('TransUse');
    if (UT.checked == true) {
        UseTrans = "แปรรูป"
        u3prosel = $("#prodselect").val()
        u3staun = $('#stapleUnit').val()
        u3proun = $('#prodUnit').val()

        u3p1suni = $("#stapleUnit1").val()
        u3p2suni = $("#stapleUnit2").val()
        u3p3suni = $("#stapleUnit3").val()
        u3p4suni = $("#stapleUnit4").val()
        u3p5suni = $("#stapleUnit5").val()

        u3p1puni = $("#prodUnit1").val()
        u3p2puni = $("#prodUnit2").val()
        u3p3puni = $("#prodUnit3").val()
        u3p4puni = $("#prodUnit4").val()
        u3p5puni = $("#prodUnit5").val()

    } else {
        UseTrans = ""
        u3prosel = ""
        u3staun = ""
        u3proun = ""

        u3p1suni = ""
        u3p2suni = ""
        u3p3suni = ""
        u3p4suni = ""
        u3p5suni = ""

        u3p1puni = ""
        u3p2puni = ""
        u3p3puni = ""
        u3p4puni = ""
        u3p5puni = ""
    }
    let dataVG = [];
    dataVG.push({
        intono: $('#into1').val(),
        intoname: $('#into2').val(),

        typeag: TypeS,
        t1sdate: tdate,
        t1sdateout: tdateout,
        t1stdard: tstdard,
        t1stdname: tstdName,
        t1types: t1type,
        tcate: tcateg,
        tarea: tare,
        tarunit: taruni,
        t2sel: tsel,
        t2amount: tamount,

        t3wc: tcateg,
        t3select: t3sel,

        t3f1na: $("#namefish1").val(),
        t3f2na: $("#namefish2").val(),
        t3f3na: $("#namefish3").val(),
        t3f4na: $("#namefish4").val(),
        t3f5na: $("#namefish5").val(),

        t3f1num: $("#fishnum1").val(),
        t3f2num: $("#fishnum2").val(),
        t3f3num: $("#fishnum3").val(),
        t3f4num: $("#fishnum4").val(),
        t3f5num: $("#fishnum5").val(),

        t3f1unit: t3f1uni,
        t3f2unit: t3f2uni,
        t3f3unit: t3f3uni,
        t3f4unit: t3f4uni,
        t3f5unit: t3f5uni,

        use1: UseBS,
        use2: UseKeep,
        use3: UseTrans,

        u1bs: u1BS,
        u1bvalue: $('#BuyValue').val(),
        u1bunit: u1buni,
        u1bmony: $('#BuyMony').val(),
        u1blocat: $('#BuyLocat').val(),

        U1sValue: $('#SellValue').val(),
        u1sunit: u1suni,
        u1smony: $('#SellMony').val(),
        u1slocat: $('#SellLocat').val(),

        u2kvalue: $('#KeepValue').val(),
        u2kunit: u2kuni,
        // U3Name: $('#Transname').val(),
        // U3staVa: $('#staple').val(),
        // U3staUn: u3staun,
        // U3proVa: $('#prodValue').val(),
        // U3proUn: u3proun,
        // U3proMn: $('#prodMoney').val(),
        // U3prolo: $('#prodLocat').val(),
        u3pro: u3prosel,

        u3p1na: $("#Transname1").val(),
        u3p2na: $("#Transname2").val(),
        u3p3na: $("#Transname3").val(),
        u3p4na: $("#Transname4").val(),
        u3p5na: $("#Transname5").val(),

        u3p1staval: $("#staple1").val(),
        u3p2staval: $("#staple2").val(),
        u3p3staval: $("#staple3").val(),
        u3p4staval: $("#staple4").val(),
        u3p5staval: $("#staple5").val(),

        u3p1stauni: u3p1suni,
        u3p2stauni: u3p2suni,
        u3p3stauni: u3p3suni,
        u3p4stauni: u3p4suni,
        u3p5stauni: u3p5suni,

        U3p1proval: $("#prodValue1").val(),
        U3p2proval: $("#prodValue2").val(),
        U3p3proval: $("#prodValue3").val(),
        U3p4proval: $("#prodValue4").val(),
        U3p5proval: $("#prodValue5").val(),

        u3p1prouni: u3p1puni,
        u3p2prouni: u3p2puni,
        u3p3prouni: u3p3puni,
        u3p4prouni: u3p4puni,
        u3p5prouni: u3p5puni,


        u3p1promon: $("#prodMoney1").val(),
        u3p2promon: $("#prodMoney2").val(),
        u3p3promon: $("#prodMoney3").val(),
        u3p4promon: $("#prodMoney4").val(),
        u3p5promon: $("#prodMoney5").val(),

        u3p1prolo: $("#prodLocat1").val(),
        u3p2prolo: $("#prodLocat2").val(),
        u3p3prolo: $("#prodLocat3").val(),
        u3p4prolo: $("#prodLocat4").val(),
        u3p5prolo: $("#prodLocat5").val(),

        repordat: $('#rpdate').val(),
        datreport: $('#rpdate').val(),
        id_date: Date.now(),
        id_user: urname,
        id_userid: urid,
        province: prov_name,
        p_code: prov_code,
        amphoe: amp_name,
        a_code: amp_code,
        tambon: tam_name,
        t_code: tam_code,

        img: dataimgurl,
        geom: datageom ? datageom : datageom = "",
    })
    dataleght.push({ intono: $('#into1').val() })
    // console.log(obj)
    var TB1 = $('#into1').val();
    var TB2 = $('#into2').val();
    var TB3 = $('#rpdate').val();

    addrowtab(TB1, TB2, TB3)
    document.getElementById("FormModal").reset();
    $("#TypeA").hide();
    $("#TypeB").hide();
    $("#TypeC").hide();
    $("#BSselect").hide();
    $("#Buy").hide();
    $("#Sell").hide();
    $("#Keep").hide();
    $("#Transform").hide();
    $('#myModal').modal('hide');

    // console.log("SAVE")
    $("#typegarden2").val(dataleght.length)
    sendData(dataVG)
}
let sendData = (data) => {
    const obj = {
        data: data
    }
    $.post(url + "/form_insee/insert", obj).done((r) => {
        r.data.data == "success"
    })
}