let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_familyforest = sessionStorage.getItem('f_familyforest');

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}
$("#usrname").text(urname);

let latlng = {
    lat: 13.196768,
    lng: 101.364720
}
let map = L.map('map', {
    center: latlng,
    zoom: 9
});

let marker, gps, dataurl;

const url = "https://engrids.soc.cmu.ac.th/api";

function loadMap() {
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
$(document).ready(() => {
    if (urid) {
        if (f_familyforest == 'false') {
            $("#noauth").modal("show");
        } else {
            loadMap();
        }
    } else {
        $("#noauth").modal("show")
    }
});
let fc = L.featureGroup();

let datArr = [];

var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);

$('#dt').val(today);

$("#plantlist").on("change", function () {
    // console.log(this.value);
    if (this.value) {
        axios.post(url + "/ff-api/getpacelgid", { gid: this.value }).then(r => {
            // console.log(r);
            $("#ffid").val(`${r.data.data[0].ffid}`);
            $("#fplant").val(`${r.data.data[0].fplant}`);
            $("#ftype").val(`${r.data.data[0].ftype}`);
        })
    }
})

let getDetail = (ffid) => {
    axios.post(url + "/ff-api/getpacelone", { ffid: ffid }).then(r => {
        // console.log(r);
        $("#plantlist").empty();
        $("#plantlist").append(`<option >เลือกชนิดพืช</option>`)
        r.data.data.map(i => $("#plantlist").append(`<option value="${i.gid}">${i.fplant}</option>`));
    })
}

let getParcel = (ffid) => {
    map.eachLayer(i => {
        // console.log(i);
        if (i.options.name) {
            map.removeLayer(i);
        }
    });

    let style = {
        fillColor: '#FED976',
        weight: 4,
        opacity: 1,
        color: '#FC4E2A',
        dashArray: '5',
        fillOpacity: 0.7
    }

    let json = fc.toGeoJSON();
    json.features.map((i) => {
        if (i.properties.name == ffid) {
            let a = L.geoJSON(i, { name: "current", style: style }).addTo(map);
            map.fitBounds(a.getBounds());
        }
    });
    getDetail(ffid)
}

axios.post(url + "/ff-api/getpacellist", { usrid: urid }).then(r => {
    $("#fname").val(urname);
    // console.log(r);
    r.data.data.map((i, k) => {
        // console.log(k);
        let dat = {
            "type": "Feature",
            "geometry": JSON.parse(i.geom),
            "properties": {
                "name": i.ffid
            }
        }

        let json = L.geoJSON(dat);
        json.addTo(fc);
        $("#listItem").append(`<a class="list-group-item list-group-item-action" onclick="getParcel(${i.ffid})">แปลงที่ ${k + 1} (รหัสแปลง ${i.ffid})</a>`);
    })
    map.fitBounds(fc.getBounds());
    // console.log(fc);
});

fc.on("click", (e) => {
    // console.log(e.layer.toGeoJSON());
});
$(document).ready(function () {
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

    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/ff-api/getdaily',
            data: { usrid: urid },
            dataSrc: 'data'
        },
        columns: [
            {
                data: '',
                render: (data, type, row, meta) => {
                    return `${meta.row + 1}`
                }
            },
            { data: 'ffid' },
            { data: 'fplant' },
            { data: 'ftype' },
            { data: 'date' },
            {
                data: '',
                render: (data, type, row, meta) => {
                    return `${row.eat} ${row.eat_unit} `
                }
            },
            {
                data: '',
                render: (data, type, row, meta) => {
                    return `${row.herb} ${row.herb_unit}`
                }
            },
            {
                data: '',
                render: (data, type, row, meta) => {
                    return `${row.use} ${row.use_unit}`
                }
            },
            {
                data: '',
                render: (data, type, row, meta) => {
                    return `${row.econ}  ${row.econ_unit}`
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-margin btn-danger" onclick="confirmDelete(${row.gid},'${row.fplant}', '${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                // width: "15%"
            }
        ],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        // order: [2, 'asc'],
    });
})
let sendData = () => {
    let obj = {
        data: {
            usrid: urid,
            ffid: $("#ffid").val(),
            fplant: $("#fplant").val(),
            ftype: $("#ftype").val(),
            eat: $("#eat").val(),
            eat_unit: $("#eat_unit").val(),
            use: $("#use").val(),
            use_unit: $("#use_unit").val(),
            econ: $("#econ").val(),
            econ_unit: $("#econ_unit").val(),
            herb: $("#herb").val(),
            herb_unit: $("#herb_unit").val(),
            dt: $("#dt").val()
        }
    }

    axios.post(url + "/ff-api/insertdaily", obj).then(r => {
        $('#okModal').modal('show');
        setZero();
    });
}

let setZero = () => {
    $("#eat").val(0);
    $("#use").val(0);
    $("#econ").val(0);
    $("#herb").val(0);
}

setZero();

let confirmDelete = (prj_id, prj_name, tbType) => {
    $("#projId").val(prj_id);
    $("#projName").text(prj_name);
    $("#tbType").val(tbType);
    $("#deleteModal").modal("show");
}

let closeModal = () => {
    $('#editModal').modal('hide');
    $('#deleteModal').modal('hide');
    $('#myTable').DataTable().ajax.reload();
    window.location.reload();
}

let confirmAdd = () => {
    $('#okModal').modal('hide');
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let gid = $("#projId").val()
    axios.post(url + "/ff-api/delete", { gid: gid }).then(r => {
        if (r.data.data == "success") {
            $('#deleteModal').modal('hide')
            $('#myTable').DataTable().ajax.reload();
            window.location.reload();
        }
    })
}

