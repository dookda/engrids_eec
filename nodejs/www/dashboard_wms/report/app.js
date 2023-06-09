let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');

if (urname) {
    $("#nav").append(`<li><a href="./../../form_register/profile/index.html"><i
        class="bi bi-person-square"></i>&nbsp;<span >${urname}</span>
      </a></li>
      <li><a href="./../../form_register/login/index.html"><i class="bi bi-box-arrow-right"></i>
      ออกจากระบบ</a></li>`);
} else {
    $("#nav").append(`
      <li><a href="./../../form_register/login/index.html"><i class="bi bi-box-arrow-right"></i>
      เข้าสู่ระบบ</a></li>`);
}
let Accept = sessionStorage.getItem('accept');
if (Accept || eecauth) {
    $('.toast').toast('hide')
}
else {
    $('.toast').toast('show')
}
$('#btnDeny').click(() => {
    // eraseCookie('allowCookies')
    $('.toast').toast('hide')
})
let setAccept
$('#btnAccept').click(() => {
    // setCookie('allowCookies','1',7)
    $('.toast').toast('hide')
    setAccept = sessionStorage.setItem('accept', 'Yes');
})

const url = "https://engrids.soc.cmu.ac.th/api";
const eecGeoserver = "https://engrids.soc.cmu.ac.th/geoserver";

let latlng = {
    lat: 13.205567,
    lng: 101.783101
};

let map = L.map('map', {
    center: latlng,
    zoom: 8
});
map.createPane('labels');
map.getPane('labels').style.zIndex = 0;
map.getPane('labels').style.pointerEvents = 'none';

const mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    name: "base",
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
});

const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    name: "base",
    pane: 'labels',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 19
});

const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    name: "base",
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const grod = L.tileLayer("https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}", {
    name: "base",
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
});

const gter = L.tileLayer('https://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
    name: "base",
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const lu61 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__46_lu_eec_61",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true,
});

const muni = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__04_municiple",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true,
});

const pro = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true,
    maxZoom: 10
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const amp = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true,
    maxZoom: 12
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const tam = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const wbody = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__14_w2_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const vill = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__05_village",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});
// cherry
const maintran = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__49_maintran",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const tran = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__49_tran",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const highway = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__49_highway",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const train = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__37_train",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const munilandmark = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__50_muni_lm_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const landmark = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__38_landmark",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const artsource = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__36_artsource",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const countour = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__11_countour",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const waterpath = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__13_water_path",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const basinquality = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__16_basinquality",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const mainbasin = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__12_main_basin_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const subbasin = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__12_sub_basin",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const hydrogeology = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__18_hydrogeology",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const waterlevel_sa = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__15_waterlevel_sa",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const wsup_pipe = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__53_wsup_pipe_wa_3p",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const wdiv_pipe = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__53_wdiv_pipe_3p",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const locarid9 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__53_loca_rid9",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const dambpk = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__53_dam_bpk",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const mainriver9 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__53_main_riv_3p",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const pjarea_rid9 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__53_pj_area_rid9_3p",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const pjloca_rid9 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__53_pj_loca_rid9_3p",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const soundpoint = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__08_soundpoint",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const waterstation = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__10_water_station",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const wastewater = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__57_wastewater",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const garbage = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__55_garbage",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const flood = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__41_flood",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const earthquake = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__42_earthquake",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const landslide = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__43_landslide",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const hole = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__44_hole",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const drought = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__45_drought",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const grpark = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__52_gr_park",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const f_reserved = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__26_f_reserved_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const nationalpark = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__28_nationalparkboi",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const park = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__29_park_dnp",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const wildlife = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__30_wildlife_boi",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const non_hunting = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__31_non_huntingboi",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const f_type63 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__27_f_type63_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const afforesta = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__33_afforestation",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const alroarea = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__35_alroarea",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const commu_forest = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__56_commu_forest",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const geology = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__19_geology",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const mineral = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__40_mineral",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const geoconser = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__22_geologi_conser",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const minerdev = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__20_mineral_develop",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const geominer = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__20_geology_miner",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const oremine = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__21_oremine",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const soil = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__25_soil_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const mang_forest = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__51_mang_forest_cabinet",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const lu56 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__46_lu_eec_56",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const lu59 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__46_lu_eec_59",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const lucbi63 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__47_lu_cbi_2563",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const luryg63 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__47_lu_ryg_2563",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const a9 = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__48_a9_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const MangLU = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__39_mangrovelu",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const Coastal = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__34_coastal",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const ProtecPollu = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__67_protec_pollu_cb_area_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const ancient = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__72_ancient_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const oldcommu = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__73_old_community_eec_point",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const oldtown_cco = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__74_oldtown_cco",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const oldtown_ryg = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__75_oldtown_ryg",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const pollu = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__81_pollution_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const landscape = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__82_landscape",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const water_mnre = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__58_water_mnre",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const water_onep = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__59_water_onep",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const water_stand = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__60_water_stand_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const sea = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__61_sea_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const cp_cco = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__68_complaint_pollu_cco",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const cp_cbi = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__69_complaint_pollu_cbi",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const cp_ryg = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__70_complaint_pollu_ryg",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const coastalradar = L.tileLayer.wms("https://ocean.gistda.or.th/geoserver/coastalradar/wms?", {
    layers: "coastalradar:recent_gulf,coastalradar:v_recent_gul5",
    name: "lyr",
    // iswms: "wms",
    format: "image/png",
    transparent: true
});


const coastalmon59 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline_2559.map", {
    layers: "shoreline_2559",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});
const coastalmon60 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline2560.map", {
    layers: "shoreline2560",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});

let coastalmon61 = L.layerGroup();

const coastalmon61n = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline2561_erosion_geo_status_normal.map", {
    layers: "shoreline2561_erosion_geo_status_normal",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
}).addTo(coastalmon61);

const coastalmon61e = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline2561_erosion_geo_status_erosion.map", {
    layers: "shoreline2561_erosion_geo_status_erosion",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});

coastalmon61.options.name = "lyr";
coastalmon61.options.iswms = "wms";
coastalmon61e.addTo(coastalmon61)
coastalmon61n.addTo(coastalmon61)

const coastalmon62 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fstatuscoast2562.map", {
    layers: "statuscoast2562",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});

const thaigreen = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__83_thaigreen_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const temple = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__84_temple",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const wetland = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__80_wetland_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const natural = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__71_natural_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const species = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__66_species_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const wscope = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__64_w_scope_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

const wpipe = L.tileLayer.wms(eecGeoserver + "/eec/wms?", {
    layers: "eec:a__63_w_pipe_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});

let lyrs = L.featureGroup().addTo(map)


// var baseMap = {
//     "Mapbox": mapbox.addTo(map),
//     "google Hybrid": ghyb
// }

// var overlayMap = {
//     "ขอบเขตตำบล": tam.addTo(map),
//     "ขอบเขตอำเภอ": amp.addTo(map),
//     "ขอบเขตจังหวัด": pro.addTo(map)
// }

function onLocationFound(e) {
    // latLng = e.latlng;
    // nearData(e)
}

map.on("locationfound", onLocationFound);
// map.on("locationerror", onLocationError);
// map.locate({ setView: true, maxZoom: 19 });

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: ""
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
}).addTo(map);

// lc.start();


// cherry
let lyr = {
    tam: tam,
    amp: amp,
    pro: pro,
    vill: vill,
    lu61: lu61,
    muni: muni,
    wbody: wbody,
    maintran: maintran,
    tran: tran,
    highway: highway,
    train: train,
    munilandmark: munilandmark,
    landmark: landmark,
    artsource: artsource,
    countour: countour,
    waterpath: waterpath,
    basinquality: basinquality,
    mainbasin: mainbasin,
    subbasin: subbasin,
    hydrogeology: hydrogeology,
    waterlevel_sa: waterlevel_sa,
    wsup_pipe: wsup_pipe,
    wdiv_pipe: wdiv_pipe,
    locarid9: locarid9,
    dambpk: dambpk,
    mainriver9: mainriver9,
    pjarea_rid9: pjarea_rid9,
    pjloca_rid9: pjloca_rid9,
    soundpoint: soundpoint,
    waterstation: waterstation,
    wastewater: wastewater,
    garbage: garbage,
    flood: flood,
    earthquake: earthquake,
    landslide: landslide,
    hole: hole,
    drought: drought,
    grpark: grpark,
    f_reserved: f_reserved,
    nationalpark: nationalpark,
    park: park,
    wildlife: wildlife,
    non_hunting: non_hunting,
    f_type63: f_type63,
    afforesta: afforesta,
    alroarea: alroarea,
    commu_forest: commu_forest,
    geology: geology,
    mineral: mineral,
    geoconser: geoconser,
    minerdev: minerdev,
    geominer: geominer,
    oremine: oremine,
    soil: soil,
    mang_forest: mang_forest,
    lu56: lu56,
    lu59: lu59,
    lucbi63: lucbi63,
    luryg63: luryg63,
    a9: a9,
    MangLU: MangLU,
    Coastal: Coastal,
    ProtecPollu: ProtecPollu,
    ancient: ancient,
    oldcommu: oldcommu,
    oldtown_cco: oldtown_cco,
    oldtown_ryg: oldtown_ryg,
    pollu: pollu,
    landscape: landscape,
    coastalradar: coastalradar,
    coastalmon59: coastalmon59,
    coastalmon60: coastalmon60,
    coastalmon61: coastalmon61,
    coastalmon62: coastalmon62,
    water_mnre: water_mnre,
    water_onep: water_onep,
    water_stand: water_stand,
    sea: sea,
    cp_cco: cp_cco,
    cp_cbi: cp_cbi,
    cp_ryg: cp_ryg,
    thaigreen: thaigreen,
    temple: temple,
    wetland: wetland,
    natural: natural,
    species: species,
    wscope: wscope,
    wpipe: wpipe
}

let base = {
    mapbox: mapbox.addTo(map),
    esri: esri,
    ghyb: ghyb,
    grod: grod,
    gter: gter
}

$("#spiner").hide()
var table;
let callAttribute = (lyr) => {
    $("#spiner").show()
    if (table) {
        table.destroy();
        $('#attrib').empty();
    }
    let geojson = "https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS" +
        "&version=1.0.0" +
        "&request=GetFeature" +
        "&typeName=eec%3A" + lyr +
        "&maxFeatures=140000&outputFormat=application%2Fjson";
    axios.get(geojson).then(r => {
        let col = [];
        let dat = [];
        let obj = r.data.features[0].properties;

        for (let prop in obj) {
            col.push({ title: prop })
        }

        r.data.features.map(i => {
            let obj = i.properties
            dat.push(Object.values(obj))
        })

        table = $('#attrib').DataTable({
            dom: "Bfrtip",
            data: dat,
            columns: col,
            scrollX: true
        });
        $("#spiner").hide()
    })
}


// L.control.layers(baseMap, overlayMap).addTo(map);
let refreshPage = () => {
    location.href = "./../report/index.html";
    // console.log("ok");
}

let getDetail = (e) => {
    sessionStorage.setItem('orgid', e);
    location.href = "./../detail/index.html";
}

let hpData = axios.get("https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/SouthEast_Asia/c56f7d70bc06160e3c443a592fd9c87e/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=5000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=geojson");
let onEachFeatureHotspot = (feature, layer) => {
    if (feature.properties) {
        layer.bindPopup(
            `<span class="kanit"><b>ตำแหน่งจุดความร้อน</b>
            <br/>ข้อมูลจาก VIIRS
            <br/>ตำแหน่งที่พบ : ${feature.properties.latitude}, ${feature.properties.longitude} 
            <br/>ค่า Brightness temperature: ${feature.properties.brightness} Kelvin
            <br/>วันที่: ${feature.properties.acq_datetime} UTC`
        );
    }
}

let loadHotspot = async () => {
    let hp = await hpData;
    // console.log(hp);
    const fs = hp.data.features;

    var geojsonMarkerOptions = {
        radius: 6,
        fillColor: "#ff5100",
        color: "#a60b00",
        weight: 0,
        opacity: 1,
        fillOpacity: 0.8
    };

    await L.geoJSON(fs, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        name: "lyr",
        onEachFeature: onEachFeatureHotspot
    }).addTo(map);
}

let responseAll = axios.get(url + '/eec-api/get-aqi-all');
let loadAqi = async () => {
    let iconblue = L.icon({
        iconUrl: './marker/location-pin-blue.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let icongreen = L.icon({
        iconUrl: './marker/location-pin-green.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconyellow = L.icon({
        iconUrl: './marker/location-pin-yellow.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconorange = L.icon({
        iconUrl: './marker/location-pin-orange.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconred = L.icon({
        iconUrl: './marker/location-pin-red.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let x = await responseAll;
    x.data.data.map(i => {

        let dat = {
            sta_id: i.sta_id,
            sta_th: i.sta_th,
            area_th: i.area_th,
            aqi: i.aqi,
            co: i.co,
            no2: i.no2,
            o3: i.o3,
            pm10: i.pm10,
            pm25: i.pm25,
            so2: i.so2
        }

        let marker;
        if (Number(i.aqi) <= 25) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconblue,
                name: 'lyr',
                data: dat
            });
        } else if (Number(i.aqi) <= 50) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: icongreen,
                name: 'lyr',
                data: dat
            });
        } else if (Number(i.aqi) <= 100) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconyellow,
                name: 'lyr',
                data: dat
            });
        } else if (Number(i.aqi) <= 200) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconorange,
                name: 'lyr',
                data: dat
            });
        } else {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconred,
                name: 'lyr',
                data: dat
            });
        }

        marker.addTo(map)
        marker.bindPopup(`รหัส : ${i.sta_id}<br> 
            ชื่อสถานี : ${i.sta_th} <br> 
            ค่า AQI : ${Number(i.aqi).toFixed(1)}<br> 
            ค่า PM10 : ${Number(i.pm10).toFixed(1)} µg./m<sup>3</sup><br> 
            ค่า PM2.5 : ${Number(i.pm25).toFixed(1)} µg./m<sup>3</sup><br> 
            ค่า CO : ${Number(i.co).toFixed(1)} ppm<br>
            ค่า NO<sub>2</sub> : ${Number(i.no2).toFixed(1)} ppm<br> 
            ค่า SO<sub>2</sub> : ${Number(i.so2).toFixed(1)} ppm<br> 
            ค่า O<sub>3</sub> : ${Number(i.o3).toFixed(1)} ppm<br> `
        )
    })
}

let responseWeather = axios.get(url + '/eec-api/get-weather-3hr-all');
let loadMeteo = async () => {
    let iconblue = L.icon({
        iconUrl: './marker-meteo/location-pin-blue.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let icongreen = L.icon({
        iconUrl: './marker-meteo/location-pin-green.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconyellow = L.icon({
        iconUrl: './marker-meteo/location-pin-yellow.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconorange = L.icon({
        iconUrl: './marker-meteo/location-pin-orange.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconred = L.icon({
        iconUrl: './marker-meteo/location-pin-red.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let x = await responseWeather;
    x.data.data.map(i => {
        // console.log(i);
        let dat = {
            sta_th: i.sta_th,
            rain24hr: i.rain24hr,
            air_temp: i.air_temp,
            rh: i.rh,
            msl_pressure: i.msl_pressure,
            windspeed: i.windspeed
        }
        let marker
        if (Number(i.rainfall) <= 25) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconblue,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        } else if (Number(i.rainfall) <= 50) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: icongreen,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        } else if (Number(i.rainfall) <= 100) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconyellow,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        } else if (Number(i.rainfall) <= 200) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconorange,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        } else {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconred,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        }
        marker.addTo(map)
        marker.bindPopup(`รหัส : ${i.sta_num}<br> 
            ชื่อสถานี : ${i.sta_th} <br> 
            ปริมาณน้ำฝนปัจจุบัน : ${Number(i.rainfall).toFixed(1)} mm.<br> 
            ปริมาณน้ำฝน 24 ชม. : ${Number(i.rain24hr).toFixed(1)} mm.<br> 
            ความชื้นสัมพัทธ์ : ${Number(i.rh).toFixed(1)} %.<br> 
            อุณหภูมิ : ${Number(i.air_temp).toFixed(1)} องศาเซลเซียส<br> 
            ความกดอากาศ : ${Number(i.msl_pressure).toFixed(1)} มิลลิบาร์<br> 
            ความเร็วลม : ${Number(i.windspeed).toFixed(1)} กิโลเมตร/ชั่วโมง`
        )
    })
}

const responseGwater = axios.get(url + "/gwater-api/getdata");
// const api_3 = axios.get("https://engrids.soc.cmu.ac.th:3700/api/rankWater/");

let onEachFeatureGw = (feature, layer) => {
    // console.log(lyr.properties);
    axios.post(url + "/gwater-api/sensordetail", { station_id: feature.properties.station_id }).then(async (r) => {
        let txt = "";
        await r.data.data.map(i => {
            // console.log(i);
            txt += `<br> <b>ความลึก ${i.depth} เมตร</b> <br>
                ข้อมูลล่าสุด ${i.wl_data_date}<br>
                - ระดับน้ำ: ${i.wl} เมตร<br>
                - การนำไฟฟ้า (ec):  ${i.ec} µs/cm<br>
                - pH: ${i.ph}<br>
                - ความเค็ม:  ${i.sal} ppm<br>
                - ของแข็งที่ละลายในน้ำ (tds):  ${i.tds} mg/L<br>
                - อุณหภูมิ:  ${i.temp} องศาเซลเซียส<br>
            `
        })
        layer.bindPopup(
            `<b>สถานี${feature.properties.station_name} (${feature.properties.station_code} ) </b> <br> 
            ${feature.properties.tambon} ${feature.properties.amphoe} ${feature.properties.province}<br> 
            ${txt}`
        );
    })
}

let loadGw = async () => {
    let x = await responseGwater;
    // console.log(x);
    x.data.data.map(async (i) => {
        // console.log(i);
        var geojsonMarkerOptions = {
            radius: 6,
            fillColor: "#b51ac9",
            color: "#651170",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5
        };

        let json = {
            type: "Feature",
            properties: {
                station_id: i.station_id,
                station_code: i.station_code,
                station_name: i.station_name,
                tambon: i.tambon,
                amphoe: i.amphoe,
                province: i.province
            },
            geometry: JSON.parse(i.json)
        }

        // console.log(json);
        var marker = await L.geoJSON(json, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            name: "lyr",
            onEachFeature: onEachFeatureGw
        });
        marker.addTo(map);
    });
}

var apiData = {};
var mapFrames = [];
var lastPastFramePosition = -1;
var radarLayers = [];

var optionKind = 'radar'; // can be 'radar' or 'satellite'

var optionTileSize = 256; // can be 256 or 512.
var optionColorScheme = 2; // from 0 to 8. Check the https://rainviewer.com/api/color-schemes.html for additional information
var optionSmoothData = 1; // 0 - not smooth, 1 - smooth
var optionSnowColors = 1; // 0 - do not show snow colors, 1 - show snow colors

var animationPosition = 0;
var animationTimer = false;

var apiRequest = new XMLHttpRequest();
apiRequest.open("GET", "https://api.rainviewer.com/public/weather-maps.json", true);
apiRequest.onload = function (e) {
    // store the API response for re-use purposes in memory
    apiData = JSON.parse(apiRequest.response);
    initialize(apiData, optionKind);
};
apiRequest.send();

function initialize(api, kind) {
    // remove all already added tiled layers
    for (var i in radarLayers) {
        map.removeLayer(radarLayers[i]);
    }
    mapFrames = [];
    radarLayers = [];
    animationPosition = 0;

    if (!api) {
        return;
    }
    if (kind == 'satellite' && api.satellite && api.satellite.infrared) {
        mapFrames = api.satellite.infrared;

        lastPastFramePosition = api.satellite.infrared.length - 1;
        showFrame(lastPastFramePosition);
    }
    else if (api.radar && api.radar.past) {
        mapFrames = api.radar.past;
        if (api.radar.nowcast) {
            mapFrames = mapFrames.concat(api.radar.nowcast);
        }
        lastPastFramePosition = api.radar.past.length - 1;
        showFrame(lastPastFramePosition);
    }
}

function addLayer(frame) {
    if (!radarLayers[frame.path]) {
        var colorScheme = optionKind == 'satellite' ? 0 : optionColorScheme;
        var smooth = optionKind == 'satellite' ? 0 : optionSmoothData;
        var snow = optionKind == 'satellite' ? 0 : optionSnowColors;

        radarLayers[frame.path] = new L.TileLayer(apiData.host + frame.path + '/' + optionTileSize + '/{z}/{x}/{y}/' + colorScheme + '/' + smooth + '_' + snow + '.png', {
            tileSize: 256,
            opacity: 0.001,
            zIndex: frame.time,
            name: "lyr"
        });
    }

    if (!map.hasLayer(radarLayers[frame.path])) {
        map.addLayer(radarLayers[frame.path]);
    }
}

function changeRadarPosition(position, preloadOnly) {
    while (position >= mapFrames.length) {
        position -= mapFrames.length;
    }
    while (position < 0) {
        position += mapFrames.length;
    }

    var currentFrame = mapFrames[animationPosition];
    var nextFrame = mapFrames[position];

    addLayer(nextFrame);

    if (preloadOnly) {
        return;
    }

    animationPosition = position;

    if (radarLayers[currentFrame.path]) {
        radarLayers[currentFrame.path].setOpacity(0);
    }
    radarLayers[nextFrame.path].setOpacity(100);
}

function showFrame(nextPosition) {
    var preloadingDirection = nextPosition - animationPosition > 0 ? 1 : -1;

    changeRadarPosition(nextPosition);
    changeRadarPosition(nextPosition + preloadingDirection, true);
}

$("input[type=checkbox]").change(async () => {
    await map.eachLayer(i => {
        // console.log(i);
        if (i.options.name == "lyr") {
            map.removeLayer(i)
        }
    })

    let chk = [];
    await $('input[type=checkbox]:checked').each(function () {
        chk.push($(this).val());
    });

    chk.map(i => {
        // console.log(i);
        if (lyr[`${i}`]) {
            lyr[`${i}`].addTo(map);
        }
        if (i == "hotspot") {
            loadHotspot();
        }

        if (i == "aqi") {
            loadAqi();
        }

        if (i == "meteo") {
            loadMeteo();
        }

        if (i == "gwater") {
            loadGw();
        }

        if (i == "radar") {
            initialize(apiData, optionKind);
        }

        if (i == "wtrl") {
            loadWtrl();
        }
        if (i == "Wqua") {
            loadWqua()
        }
    })

    getLayer()

})

$("input[name='basemap']").change(async (r) => {
    await map.eachLayer(i => {
        // console.log(i);
        if (i.options.name == "base") {
            map.removeLayer(i)
        }
    })

    let basemap = $("input[name='basemap']:checked").val();
    base[`${basemap}`].addTo(map);
})

let eecUrl = "https://engrids.soc.cmu.ac.th/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontName:Kanit&LAYER=";
let gistdaUrl = "http://ocean.gistda.or.th:80/geoserver/coastalradar/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=";
let costUrl = "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline_2559.map?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=";
// let rtiUrl = "https://rti2dss.com:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=";

//cherry
$("#lu61Legend").attr("src", eecUrl + "eec:a__46_lu_eec_61");
$("#munLegend").attr("src", eecUrl + "eec:a__04_municiple");
$("#proLegend").attr("src", eecUrl + "eec:a__01_prov_eec");
$("#ampLegend").attr("src", eecUrl + "eec:a__02_amphoe_eec");
$("#tamLegend").attr("src", eecUrl + "eec:a__03_tambon_eec");
$("#wbodyLegend").attr("src", eecUrl + "eec:a__14_w2_eec");
$("#maintranLegend").attr("src", eecUrl + "eec:a__49_maintran");
$("#tranLegend").attr("src", eecUrl + "eec:a__49_tran");
$("#highwayLegend").attr("src", eecUrl + "eec:a__49_highway");
$("#trainLegend").attr("src", eecUrl + "eec:a__37_train");
$("#munilandmarkLegend").attr("src", eecUrl + "eec:a__50_muni_lm_eec");
$("#landmarkLegend").attr("src", eecUrl + "	eec:a__38_landmark");
$("#artsourceLegend").attr("src", eecUrl + "eec:a__36_artsource");
$("#countourLegend").attr("src", eecUrl + "eec:a__11_countour");
$("#waterpathLegend").attr("src", eecUrl + "eec:a__13_water_path");
$("#basinqualityLegend").attr("src", eecUrl + "eec:a__16_basinquality");
$("#mainbasinLegend").attr("src", eecUrl + "eec:a__12_main_basin_eec");
$("#subbasinLegend").attr("src", eecUrl + "eec:a__12_sub_basin");
$("#hydrogeologyLegend").attr("src", eecUrl + "eec:a__18_hydrogeology");
$("#waterlevel_saLegend").attr("src", eecUrl + "eec:a__15_waterlevel_sa");
$("#wsup_pipeLegend").attr("src", eecUrl + "eec:a__53_wsup_pipe_wa_3p");
$("#wdiv_pipeLegend").attr("src", eecUrl + "eec:a__53_wdiv_pipe_3p");
$("#locarid9Legend").attr("src", eecUrl + "eec:a__53_loca_rid9");
$("#dambpkLegend").attr("src", eecUrl + "eec:a__53_dam_bpk");
$("#mainriver9Legend").attr("src", eecUrl + "eec:a__53_main_riv_3p");
$("#pjarea_rid9Legend").attr("src", eecUrl + "eec:a__53_pj_area_rid9_3p");
$("#pjloca_rid9Legend").attr("src", eecUrl + "eec:a__53_pj_loca_rid9_3p");
$("#soundpointLegend").attr("src", eecUrl + "eec:a__08_soundpoint");
$("#waterstationLegend").attr("src", eecUrl + "eec:a__10_water_station");
$("#wastewaterLegend").attr("src", eecUrl + "eec:a__57_wastewater");
$("#garbageLegend").attr("src", eecUrl + "eec:a__55_garbage");
$("#floodLegend").attr("src", eecUrl + "eec:a__41_flood");
$("#earthquakeLegend").attr("src", eecUrl + "eec:a__42_earthquake");
$("#landslideLegend").attr("src", eecUrl + "eec:a__43_landslide");
$("#holeLegend").attr("src", eecUrl + "eec:a__44_hole");
$("#droughtLegend").attr("src", eecUrl + "eec:a__45_drought");
$("#grparkLegend").attr("src", eecUrl + "eec:a__52_gr_park");
$("#f_reservedLegend").attr("src", eecUrl + "eec:a__26_f_reserved_eec");
$("#nationalparkLegend").attr("src", eecUrl + "eec:a__28_nationalparkboi");
$("#parkLegend").attr("src", eecUrl + "eec:a__29_park_dnp");
$("#wildlifeLegend").attr("src", eecUrl + "eec:a__30_wildlife_boi");
$("#non_huntingLegend").attr("src", eecUrl + "eec:a__31_non_huntingboi");
$("#f_type63Legend").attr("src", eecUrl + "eec:a__27_f_type63_eec");
$("#afforestaLegend").attr("src", eecUrl + "eec:a__33_afforestation");
$("#alroareaLegend").attr("src", eecUrl + "eec:a__35_alroarea");
$("#commu_forestLegend").attr("src", eecUrl + "eec:a__56_commu_forest");
$("#geologyLegend").attr("src", eecUrl + "eec:a__19_geology");
$("#mineralLegend").attr("src", eecUrl + "eec:a__40_mineral");
$("#geoconserLegend").attr("src", eecUrl + "eec:a__22_geologi_conser");
$("#minerdevLegend").attr("src", eecUrl + "eec:a__20_mineral_develop");
$("#geominerLegend").attr("src", eecUrl + "eec:a__20_geology_miner");
$("#oremineLegend").attr("src", eecUrl + "eec:a__21_oremine");
$("#soilLegend").attr("src", eecUrl + "eec:a__25_soil_eec");
$("#mang_forestLegend").attr("src", eecUrl + "eec:a__51_mang_forest_cabinet");
$("#lu56Legend").attr("src", eecUrl + "eec:a__46_lu_eec_56");
$("#lu59Legend").attr("src", eecUrl + "eec:a__46_lu_eec_59");
$("#lucbi63Legend").attr("src", eecUrl + "eec:a__47_lu_cbi_2563");
$("#luryg63Legend").attr("src", eecUrl + "eec:a__47_lu_ryg_2563");
$("#a9Legend").attr("src", eecUrl + "eec:a__48_a9_eec");
$("#MangLULegend").attr("src", eecUrl + "eec:a__39_mangrovelu");
$("#CoastalLegend").attr("src", eecUrl + "eec:a__34_coastal");
$("#ProtecPolluLegend").attr("src", eecUrl + "eec:a__67_protec_pollu_cb_area_eec");
$("#ancientLegend").attr("src", eecUrl + "eec:a__72_ancient_eec");
$("#oldcommuLegend").attr("src", eecUrl + "eec:a__73_old_community_eec_point");
$("#oldtown_ccoLegend").attr("src", eecUrl + "eec:a__74_oldtown_cco");
$("#oldtown_rygLegend").attr("src", eecUrl + "eec:a__75_oldtown_ryg");
$("#polluLegend").attr("src", eecUrl + "eec:a__81_pollution_eec");
$("#landscapeLegend").attr("src", eecUrl + "eec:a__82_landscape");
$("#water_mnreLegend").attr("src", eecUrl + "eec:a__58_water_mnre");
$("#water_onepLegend").attr("src", eecUrl + "eec:a__59_water_onep");
$("#water_standLegend").attr("src", eecUrl + "eec:a__60_water_stand_eec");
$("#seaLegend").attr("src", eecUrl + "eec:a__61_sea_eec");
$("#cp_ccoLegend").attr("src", eecUrl + "eec:a__68_complaint_pollu_cco");
$("#cp_cbiLegend").attr("src", eecUrl + "eec:a__69_complaint_pollu_cbi");
$("#cp_rygLegend").attr("src", eecUrl + "eec:a__70_complaint_pollu_ryg");
$("#thaigreenLegend").attr("src", eecUrl + "eec:a__83_thaigreen_eec");
$("#templeLegend").attr("src", eecUrl + "eec:a__84_temple");
$("#wetlandLegend").attr("src", eecUrl + "eec:a__80_wetland_eec");
$("#naturalLegend").attr("src", eecUrl + "eec:a__71_natural_eec");
$("#speciesLegend").attr("src", eecUrl + "eec:a__66_species_eec");
$("#wscopeLegend").attr("src", eecUrl + "eec:a__64_w_scope_eec");
$("#wpipeLegend").attr("src", eecUrl + "eec:a__63_w_pipe_eec");

$("#coastalradarLegend").attr("src", gistdaUrl + "coastalradar:recent_gulf");

$("#coastalmon59Legend").attr("src", "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/shoreline_2559.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.4311615570908689&SRS=EPSG:3857&SCALE=27734017.04636604&WIDTH=250&STYLE=&LAYER=shoreline_2559");
$("#coastalmon60Legend").attr("src", "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/shoreline2560.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.3282854129563051&SRS=EPSG:3857&SCALE=27734017.04636604&WIDTH=250&STYLE=&LAYER=shoreline2560");
$("#coastalmon61Legend").attr("src", "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/shoreline2561_erosion_geo_status_erosion.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.6537560267000855&SRS=EPSG:3857&SCALE=27734017.04636604&WIDTH=250&STYLE=&LAYER=shoreline2561_erosion_geo_status_erosion");
$("#coastalmon61Legend2").attr("src", "https://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/shoreline2561_erosion_geo_status_normal.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.8580349742667355&SRS=EPSG:3857&SCALE=433344.01634946937&WIDTH=250&STYLE=&LAYER=shoreline2561_erosion_geo_status_normal")
$("#coastalmon62Legend").attr("src", "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/statuscoast2562.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.9216863191450226&SRS=EPSG:3857&SCALE=27734017.04636604&WIDTH=250&STYLE=&LAYER=statuscoast2562")

$("#aqiLegend").attr("src", "./marker/location-pin-green.svg");
$("#meteoLegend").attr("src", "./marker-meteo/location-pin-green.svg");

$("#hpLegend").attr("src", "./img/hotspot.png");
$("#gwLegend").attr("src", "./img/gw.png");

$("#radarLegend").attr("src", "./img/radar.png");

$("#villLegend").attr("src", eecUrl + "eec:a__05_village");
$("#wtrlLegend").attr("src", "./marker-meteo/gas-station.png");
$("#WquaLegend").attr("src", "./marker/sta_qu.png");

$("#cardpop").hide()
$("#popcheck").click(function () {

    axios.get(url + `/thpopulation/get/pcode`).then(async (r) => {
        var d = r.data.data;
        d.map(i => {
            $('#pro').append(`<option value="${i.p_code}">${i.p_name}</option>`)
        })
    })
    if (this.checked) {
        $("#cardpop").fadeIn("slow").show();
        $("#poppresent").show();
        $("#poppast").hide();
        var a = $('#year').val();
        var b = $('#pro').val();
        var c = $("#gramen").attr('class')
        var d = $("#grawomen").attr('class')
        btnpro = 'year'
        presentpop(a, b, c, d)
    } else {
        $("#poppresent").fadeOut(300, function () {
            $("#cardpop").slideUp("slow");
        })
        $("#poppast").fadeOut(300, function () {
            $("#cardpop").slideUp("slow");
        })
    }

});

var btnpro
$('#pro').on("change", function () {
    var a = $('#year').val();
    var b = $('#pro').val();
    var c = $("#gramen").attr('class')
    var d = $("#grawomen").attr('class')
    var e = $("#typepop").val();
    var f = $("#item").val();
    // console.log(btnpro)
    if (f == "pop_sum") {
        if (btnpro == 'year') {
            presentpop(a, b, c, d)
        }
        else if (btnpro == 'history') {
            if (e == "แยกตามรายปี") {
                sumpop(b)
            } else if (e == "แยกตามเพศ") {
                MWPop(b)
            }
        }
    } else if (f == "pop_den") {
        denpop(b)
    } else if (f == "num_home") {
        homepop(b)
    }
})
$("#item").on("change", function () {
    var code = $("#item").val()
    if (code == "pop_sum") {
        var a = $('#year').val();
        var b = $('#pro').val();
        var c = $("#gramen").attr('class')
        var d = $("#grawomen").attr('class')
        var e = $("#typepop").val();
        if (btnpro == 'year') {
            presentpop(a, b, c, d)
        }
        else if (btnpro == 'history') {
            if (e == "แยกตามรายปี") {
                sumpop(b)
            } else if (e == "แยกตามเพศ") {
                MWPop(b)
            }
        }
        $("#poppresent").fadeIn("slow").show()
        $('#poppast').hide()

        $('#years').show()
        $('#btnhistory').show()
    }
    else if (code == "pop_den") {
        var a = $('#pro').val();
        denpop(a)
        $('#types').hide()
        $('#years').hide()
        $('#btnyear').hide()
        $('#btnhistory').hide()

        $("#poppresent").hide()
        $('#poppast').show()

    } else if (code == "num_home") {
        var a = $('#pro').val();
        homepop(a)
        $('#types').hide()
        $('#years').hide()
        $('#btnyear').hide()
        $('#btnhistory').hide()

        $("#poppresent").hide()
        $('#poppast').show()

    }
})
$("#year").on("change", function () {
    var a = $('#year').val();
    var b = $('#pro').val();
    var c = $("#gramen").attr('class')
    var d = $("#grawomen").attr('class')
    presentpop(a, b, c, d)
})
$("#typepop").on("change", function () {
    var a = $('#pro').val();
    var e = $("#typepop").val();
    if (e == "แยกตามรายปี") {
        sumpop(a)
    } else if (e == "แยกตามเพศ") {
        MWPop(a)
    }
})


function presentpop(year, pcode, Mclass, Wclass) {
    var a = year
    var b = pcode
    $('#Vyear1').html(a)
    $('#Vyear2').html(a)
    axios.get(url + `/thpopulation/get/year/${a}/${b}`).then(async (r) => {
        var d = r.data.data;
        // console.log(d)
        var men = d[0].yvalue;
        var women = d[1].yvalue;
        var all = d[5].yvalue;

        $('#getprov').html(`${d[5].p_name}`)
        $('#mennum').html(` ${d[0].yvalue.toLocaleString()} คน`)
        $('#womennum').html(` ${d[1].yvalue.toLocaleString()} คน`)
        $('#popall').html(`${d[5].yvalue.toLocaleString()}`)

        $('#areanum').html(`${d[2].yvalue.toLocaleString()}`)
        $('#dennum').html(`${d[3].yvalue.toFixed(2)}`)
        $('#homenum').html(`${d[4].yvalue.toLocaleString()}`)

        var pmen = (men / all) * 100
        var pwomen = (women / all) * 100
        $('#pmen').html(`${pmen.toFixed(0)}%`)
        $('#pwomen').html(`${pwomen.toFixed(0)}%`)
        $("#gramen").removeClass(`${Mclass}`).addClass(`c100 p${pmen.toFixed(0)} big men`)
        $("#grawomen").removeClass(`${Wclass}`).addClass(`c100 p${pwomen.toFixed(0)} big women`)
    })
}

$('#types').hide()
$('#btnyear').hide()
$('#poppast').hide()

let pophistory = () => {
    $('#types').show()
    $('#years').hide()
    $('#btnyear').show()
    $('#btnhistory').hide()

    btnpro = 'history'
    var a = $('#pro').val();
    var e = $("#typepop").val();
    if (e == "แยกตามรายปี") {
        sumpop(a)
    } else if (e == "แยกตามเพศ") {
        MWPop(a)
    }
    $('#poppresent').hide()
    $('#poppast').show()
}

let popyears = () => {
    $('#types').hide()
    $('#years').show()

    $('#btnyear').hide()
    $('#btnhistory').show()

    btnpro = 'year'
    $('#poppast').hide()
    $('#poppresent').fadeIn("slow").show()

    var a = $('#year').val();
    var b = $('#pro').val();
    var c = $("#gramen").attr('class')
    var d = $("#grawomen").attr('class')
    presentpop(a, b, c, d)
}

let MWPop = (pcode) => {
    var a = pcode
    var b = $('#typepop').val()
    var dat = [];
    axios.get(url + `/thpopulation/get/province/${a}`).then(async (r) => {
        var d = r.data.data
        if (a == "TH") {
            $('#hiprov').html(`ข้อมูลประชากรย้อนหลังตั้งแต่ปี 2554-2563 ทั้งประเทศ ประเภท${b}`)
        } else {
            $('#hiprov').html(`ข้อมูลประชากรย้อนหลังตั้งแต่ปี 2554-2563 จังหวัด${d[0].p_name} ประเภท${b}`)
        }
        dat.push({
            "year": 'ปี 2554',
            "men": d[0].y2554,
            "women": d[1].y2554,
        }, {
            "year": 'ปี 2555',
            "men": Number(d[0].y2555),
            "women": Number(d[1].y2555),
        }, {
            "year": 'ปี 2556',
            "men": Number(d[0].y2556),
            "women": Number(d[1].y2556),
        }, {
            "year": 'ปี 2557',
            "men": Number(d[0].y2557),
            "women": Number(d[1].y2557),
        }, {
            "year": 'ปี 2558',
            "men": Number(d[0].y2558),
            "women": Number(d[1].y2558),
        }, {
            "year": 'ปี 2559',
            "men": Number(d[0].y2559),
            "women": Number(d[1].y2559),
        }, {
            "year": 'ปี 2560',
            "men": Number(d[0].y2560),
            "women": Number(d[1].y2560),
        }, {
            "year": 'ปี 2561',
            "men": Number(d[0].y2561),
            "women": Number(d[1].y2561),
        }, {
            "year": 'ปี 2562',
            "men": Number(d[0].y2562),
            "women": Number(d[1].y2562),
        }, {
            "year": 'ปี 2563',
            "men": Number(d[0].y2563),
            "women": Number(d[1].y2563),
        })
        // popMW(dat)
        newpopMW(dat)
    })
}
function popMW(data) {
    $("#chartdiv").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.legend = new am4charts.Legend();
    chart.numberFormatter.numberFormat = "#,###,###,###.##";
    // Add data
    chart.data = data
    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "year";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueX.formatNumber('###,###,###')} คน[/]";
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;
        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);

        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.dx = 10;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;

        var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
        categoryLabel.label.text = "{name}";
        categoryLabel.label.horizontalCenter = "right";
        categoryLabel.label.dx = -10;
        categoryLabel.label.fill = am4core.color("#fff");
        categoryLabel.label.hideOversized = false;
        categoryLabel.label.truncate = false;

    }

    createSeries("men", "เพศชาย", "#a9d7f6", "#3DB2FF");
    createSeries("women", "เพศหญิง", "#f96d6d", "#FF2442");

    chart.exporting.menu = new am4core.ExportMenu();
}
let newpopMW = (data) => {
    $("#chartdiv").removeAttr("style").css({ "width": "1200px", "height": "520px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = data

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.opposite = true;
    valueAxis.numberFormatter.numberFormat = "#,###,###,###' " + "คน" + "'";
    // valueAxis.min = 10000000;
    // valueAxis.max = 70000000;

    // Create series
    function createSeries(field, name, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "year";
        series.stacked = true;
        series.name = name;
        series.columns.template.tooltipText = `{categoryY} : [bold]{valueX.formatNumber('###,###,###.##')} คน[/]`;
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;
        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);

        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.locationX = 0.5;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.label.fill = am4core.color("#fff");

    }

    createSeries("men", "เพศชาย", "#a9d7f6", "#3DB2FF");
    createSeries("women", "เพศหญิง", "#f96d6d", "#FF2442");

    chart.exporting.menu = new am4core.ExportMenu();

}
let sumpop = (pcode) => {
    var a = pcode
    var b = $('#typepop').val()
    var dat = [];
    axios.get(url + `/thpopulation/get/province/${a}`).then(async (r) => {
        var d = r.data.data
        if (a == "TH") {
            $('#hiprov').html(`ข้อมูลประชากรย้อนหลังตั้งแต่ปี 2554-2563 ทั้งประเทศ ประเภท${b}`)
        } else {
            $('#hiprov').html(`ข้อมูลประชากรย้อนหลังตั้งแต่ปี 2554-2563 จังหวัด${d[0].p_name} ประเภท${b}`)
        }
        dat.push({
            "year": 'ปี 2554',
            "value": Number(d[5].y2554),
        }, {
            "year": 'ปี 2555',
            "value": Number(d[5].y2555),
        }, {
            "year": 'ปี 2556',
            "value": Number(d[5].y2556),
        }, {
            "year": 'ปี 2557',
            "value": Number(d[5].y2557),
        }, {
            "year": 'ปี 2558',
            "value": Number(d[5].y2558),
        }, {
            "year": 'ปี 2559',
            "value": Number(d[5].y2559),
        }, {
            "year": 'ปี 2560',
            "value": Number(d[5].y2560),
        }, {
            "year": 'ปี 2561',
            "value": Number(d[5].y2561),
        }, {
            "year": 'ปี 2562',
            "value": Number(d[5].y2562),
        }, {
            "year": 'ปี 2563',
            "value": Number(d[5].y2563),
        })
        charthistory(dat, "จำนวนประชากรรวม", "คน", "#A2DBFA", "#39A2DB")
    })

}
let denpop = (pcode) => {
    var a = pcode;
    var dat = [];
    axios.get(url + `/thpopulation/get/province/${a}`).then(async (r) => {
        var d = r.data.data
        if (a == "TH") {
            $('#hiprov').html(`ข้อมูลความหนาแน่นของประชากรย้อนหลังตั้งแต่ปี 2554-2563 ${d[0].p_name}`)
        } else {
            $('#hiprov').html(`ข้อมูลความหนาแน่นของประชากรย้อนหลังตั้งแต่ปี 2554-2563 จังหวัด${d[0].p_name}`)
        }
        dat.push({
            "year": 'ปี 2554',
            "value": Number(d[3].y2554),
        }, {
            "year": 'ปี 2555',
            "value": Number(d[3].y2555),
        }, {
            "year": 'ปี 2556',
            "value": Number(d[3].y2556),
        }, {
            "year": 'ปี 2557',
            "value": Number(d[3].y2557),
        }, {
            "year": 'ปี 2558',
            "value": Number(d[3].y2558),
        }, {
            "year": 'ปี 2559',
            "value": Number(d[3].y2559),
        }, {
            "year": 'ปี 2560',
            "value": Number(d[3].y2560),
        }, {
            "year": 'ปี 2561',
            "value": Number(d[3].y2561),
        }, {
            "year": 'ปี 2562',
            "value": Number(d[3].y2562),
        }, {
            "year": 'ปี 2563',
            "value": Number(d[3].y2563),
        })
        charthistory(dat, "ความหนาแน่น", "คนต่อตร.กม.", "#B8B5FF", "#7868E6")
    })
}
let homepop = (pcode) => {
    var a = pcode;
    var dat = [];
    axios.get(url + `/thpopulation/get/province/${a}`).then(async (r) => {
        var d = r.data.data
        if (a == "TH") {
            $('#hiprov').html(`ข้อมูลจำนวนครัวเรือนย้อนหลังตั้งแต่ปี 2554-2563 ${d[0].p_name}`)
        } else {
            $('#hiprov').html(`ข้อมูลจำนวนครัวเรือนย้อนหลังตั้งแต่ปี 2554-2563 จังหวัด${d[0].p_name}`)
        }
        dat.push({
            "year": 'ปี 2554',
            "value": Number(d[4].y2554),
        }, {
            "year": 'ปี 2555',
            "value": Number(d[4].y2555),
        }, {
            "year": 'ปี 2556',
            "value": Number(d[4].y2556),
        }, {
            "year": 'ปี 2557',
            "value": Number(d[4].y2557),
        }, {
            "year": 'ปี 2558',
            "value": Number(d[4].y2558),
        }, {
            "year": 'ปี 2559',
            "value": Number(d[4].y2559),
        }, {
            "year": 'ปี 2560',
            "value": Number(d[4].y2560),
        }, {
            "year": 'ปี 2561',
            "value": Number(d[4].y2561),
        }, {
            "year": 'ปี 2562',
            "value": Number(d[4].y2562),
        }, {
            "year": 'ปี 2563',
            "value": Number(d[4].y2563),
        })
        charthistory(dat, "จำนวนครัวเรือน", "ครัวเรือน", "#94EBCD", "#6DDCCF")
    })
}
function charthistory(data, catename, nunit, c1, c2) {
    $("#chartdiv").removeAttr("style").css({ "width": "1200px", "height": "520px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    chart.numberFormatter.numberFormat = "#,###,###,###.##";
    // Add data
    chart.data = data
    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.opposite = true;
    if (nunit == 'ครัวเรือน') {
        valueAxis.numberFormatter.numberFormat = "#.0as' " + nunit + "'";
    } else {
        valueAxis.numberFormatter.numberFormat = "#,###,###,###' " + nunit + "'";

    }

    // Create series
    function createSeries(field, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "year";
        series.name = name;
        series.columns.template.tooltipText = `ปี {categoryY} : [bold]{valueX.formatNumber('###,###,###.##')} ${unit}[/]`;
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;
        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);

        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.dx = 10;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;

        var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
        categoryLabel.label.text = "{name}";
        categoryLabel.label.horizontalCenter = "right";
        categoryLabel.label.dx = -10;
        categoryLabel.label.fill = am4core.color("#fff");
        categoryLabel.label.hideOversized = false;
        categoryLabel.label.truncate = false;

    }

    createSeries("value", catename, nunit, c1, c2);
    chart.exporting.menu = new am4core.ExportMenu();
}

// set default layer
let wmsLyr = [];
let getLayer = () => {
    wmsLyr = [];
    map.eachLayer(i => {
        if (i.options.iswms) {
            wmsLyr.push(i.options.layers)
            // console.log(i);
        }
    })
    // console.log(x);
}


let lyrName = {
    a__01_prov_eec: "ขอบเขตจังหวัด",
    a__02_amphoe_eec: "ขอบเขตอำเภอ",
    a__03_tambon_eec: "ขอบเขตตำบล",
    a__04_municiple: "ขอบเขตเทศบาล",
    a__05_village: "หมู่บ้าน",
    a__49_maintran: "เส้นทางคมนาคมสายหลัก",
    a__49_tran: "เส้นทางคมนาคม",
    a__49_highway: "ทางหลวงแผ่นดิน",
    a__37_train: "ทางรถไฟ",
    a__50_muni_lm_eec: "สถานที่สำคัญในเขตเทศบาล",
    a__38_landmark: "สถานที่สำคัญ",
    a__36_artsource: "แหล่งศิลปกรรม",
    a__11_countour: "เส้นชั้นความสูง",
    a__13_water_path: "เส้นทางน้ำ",
    a__14_w2_eec: "แหล่งน้ำ",
    a__16_basinquality: "ชั้นคุณภาพลุ่มน้ำ",
    a__12_main_basin_eec: "ลุ่มน้ำหลัก",
    a__12_sub_basin: "ลุ่มน้ำย่อย",
    a__18_hydrogeology: "อุทกธรณีวิทยา",
    a__15_waterlevel_sa: "สถานีตรวจวัดระดับน้ำ(สถานีอุทกวิทยา)",
    a__58_water_mnre: "จุดเฝ้าระวังคุณภาพน้ำจากสสภ.13",
    a__59_water_onep: "จุดเก็บน้ำเพื่อวิเคราะห์คุณภาพน้ำในโครงการฯ",
    a__60_water_stand_eec: "จุดวัดคุณภาพน้ำผิวดิน",
    a__61_sea_eec: "จุดวัดคุณภาพน้ำทะเล",
    a__53_wsup_pipe_wa_3p: "ท่อส่งน้ำการประปา",
    a__53_wdiv_pipe_3p: "ท่อผันน้ำ กรมชลประทาน",
    a__53_loca_rid9: "สำนักชลประทานที่ 9",
    a__53_dam_bpk: "เขื่อนทดน้ำบางปะกง",
    a__53_main_riv_3p: "แม่น้ำสายหลักสชป.9",
    a__53_pj_area_rid9_3p: "พื้นที่โครงการสชป.9",
    a__53_pj_loca_rid9_3p: "ที่ตั้งโครงการ สชป9",
    a__08_soundpoint: "จุดตรวจวัดเสียง",
    a__81_pollution_eec: "แหล่งกำเนิดมลพิษ",
    a__67_protec_pollu_cb_area_eec: "เขตพื้นที่คุ้มครองและเขตควบคุมมลพิษ",
    a__10_water_station: "สถานีตรวจวัดคุณภาพน้ำอัตโนมัติ",
    a__57_wastewater: "บ่อบำบัดน้ำเสีย",
    a__55_garbage: "บ่อขยะ",
    a__41_flood: "พื้นที่เสี่ยงภัยน้ำท่วม",
    a__42_earthquake: "พื้นที่เสี่ยงภัยแผ่นดินไหว",
    a__43_landslide: "ตำแหน่งพื้นที่เสี่ยงดินถล่ม",
    a__44_hole: "พื้นที่เสี่ยงภัยหลุมยุบ",
    a__45_drought: "พื้นที่เสี่ยงภัยแล้ง",
    a__52_gr_park: "พื้นที่สีเขียวสาธาณะ",
    a__26_f_reserved_eec: "ป่าสงวนแห่งชาติ",
    a__28_nationalparkboi: "อุทยานแห่งชาติ",
    a__29_park_dnp: "วนอุทยาน",
    a__30_wildlife_boi: "เขตรักษาพันธุ์สัตว์ป่า",
    a__31_non_huntingboi: "เขตห้ามล่าสัตว์ป่า",
    a__27_f_type63_eec: "ประเภทป่าไม้ปีพ.ศ.2563",
    a__33_afforestation: "พื้นที่ปลูกป่า",
    a__35_alroarea: "พื้นที่สปก",
    a__56_commu_forest: "ป่าชุมชน",
    a__19_geology: "ธรณีวิทยา",
    a__40_mineral: "ทรัพยากรแร่",
    a__22_geologi_conser: "แหล่งอนุรักษ์ทางธรณีวิทยา",
    a__20_mineral_develop: 'พื้นที่จำแนกเขตพัฒนาทรัพยากรแร่',
    a__20_geology_miner: "ข้อมูลธรณีและแหล่งทรัพยากรแร่",
    a__21_oremine: 'ประทานบัตร',
    a__25_soil_eec: 'แผนที่ดิน',
    a__46_lu_eec_56: 'การใช้ประโยชน์ที่ดิน ปีพ.ศ.2556',
    a__46_lu_eec_59: 'การใช้ประโยชน์ที่ดิน ปีพ.ศ.2559',
    a__46_lu_eec_61: 'การใช้ประโยชน์ที่ดิน ปีพ.ศ.2561',
    a__47_lu_cbi_2563: 'การใช้ประโยชน์ที่ดินพื้นที่จังหวัดชลบุรี ปี 2563',
    a__47_lu_ryg_2563: 'การใช้ประโยชน์ที่ดินพื้นที่จังหวัดระยอง ปี 2563',
    a__82_landscape: 'ภูมินิเวศ',
    a__48_a9_eec: 'พื้นที่เกษตรกรรมประเภทเพาะเลี้ยงสัตว์น้ำ',
    a__51_mang_forest_cabinet: 'เขตป่าชายเลนตามมติคณะรัฐมนตรี',
    a__39_mangrovelu: "การใช้ประโยชน์ที่ดินในป่าชายเลน",
    a__34_coastal: "เขตที่ดินชายฝั่งทะเล",
    a__72_ancient_eec: 'โบราณสถาน',
    a__73_old_community_eec_point: 'ย่านชุมชนเก่า',
    a__74_oldtown_cco: "เขตเมืองเก่า จังหวัดฉะเชิงเทรา",
    a__75_oldtown_ryg: "เขตเมืองเก่า จังหวัดระยอง",
    a__68_complaint_pollu_cco: "เรื่องร้องเรียนมลพิษ จังหวัดฉะเชิงเทรา",
    a__69_complaint_pollu_cbi: "เรื่องร้องเรียนมลพิษ จังหวัดชลบุรี",
    a__70_complaint_pollu_ryg: "เรื่องร้องเรียนมลพิษ จังหวัดระยอง",
    a__83_thaigreen_eec: "พื้นที่สีเขียวจาก Thai Green Urban",
    a__84_temple: "วัดและแหล่งศิลปกรรม",
    a__80_wetland_eec: "พื้นที่ชุ่มน้ำ",
    a__71_natural_eec: "ตำแหน่งแหล่งธรรมชาติ",
    a__66_species_eec: "ชนิดพันธุ์สำคัญ หายาก และชีวภาพที่มีความสำคัญ",
    a__64_w_scope_eec: "ขอบเขตระบบบำบัดน้ำเสีย",
    a__63_w_pipe_eec: "เส้นท่อระบบบำบัดน้ำเสีย"

}

let fieldInfo = {
    prov_nam_t: "จังหวัด",
    amphoe_t: "อำเภอ",
    tam_nam_t: "ตำบล",
    name: "ชื่อ",
    vill_name: "ชื่อหมู่บ้าน",
    name_t: "ชื่อ",
    culture_na: "ชื่อแหล่งศิลปกรรม",
    type_nam_t: "ประเภท",
    contour: "เส้นชั้นความสูง",
    desc_t: "คำอธิบาย",
    length: "ความยาว",
    lu_code: "รหัสการใช้ประโยชน์ที่ดิน",
    lu_des_th: "คำอธิบายการใช้ประโยชน์ที่ดิน",
    wsc_class: "ชั้นคุณภาพลุ่มน้ำ",
    mb_code: "รหัสลุ่มน้ำหลัก",
    mbasin_t: "ชื่อลุ่มน้ำหลัก",
    sb_code: "รหัสลุ่มน้ำย่อย",
    sb_name_t: "ชื่อลุ่มน้ำย่อย",
    hydrount: "ชั้นข้อมูลอุทกธรณี",
    descript_t: "คำอธิบาย",
    name_code: "รหัสสถานี",
    type_gage: "ประเภทเครื่องตรวจวัด",
    station: "รหัสสถานี",
    name_river: "ชื่อแม่น้ำ",
    wqi: "เกณฑ์การวัดน้ำ",
    quality: "เกณฑ์มาตราฐาน",
    station_n: "ชื่อสถานี",
    station_id: "รหัสสถานี",
    value: "เกณฑ์มาตราฐาน",
    controller: "ผู้ดูแล",
    project: "โครงการ",
    projcode: "รหัสโครงการ",
    pj_name: "โครงการ",
    owner_name: "ผู้รับผิดชอบโครงการ",
    sta_name_t: "ชื่อสถานีตรวจวัดเสียง",
    type: "ประเภท",
    ws_code: "รหัสสถานี",
    ws_name: "ชื่อสถานี",
    river: "แม่น้ำ",
    status: "สถานะ",
    agency: "หน่วยงานรับผิดชอบ",
    descriptio: "คำอธิบาย",
    system: "ชื่อบ่อบำบัด",
    flood_desc: "คำอธิบาย",
    intensity: "ระดับความรุนแรงของการเกิดแผ่นดินไหว",
    hazard_t: "ลักษณะความรุนแรง",
    vill_nam_t: "ชื่อหมู่บ้าน",
    hazard: "ลักษณะพื้นที่เสี่ยง",
    dry_class: "ประเภทพื้นที่เสี่ยงภัยแล้ง",
    dry_desc: "คำอธิบาย",
    gr_name: "ชื่อพื้นที่สีเขียวสาธารณะ",
    sup_type: "ประเภทพื้นที่สีเขียว",
    fr_name: "ชื่อ",
    สจป: "สำนักงานจัดการทรัพยากรป่าไม้",
    typt: 'ประเภทวนอุทยานภาษาไทย',
    namt: 'ชื่อวนอุทยานภาษาไทย',
    ftype_thai: 'ประเภทป่า',
    loca_tam: "ตำบล",
    loca_amp: "อำเภอ",
    loca_prov: "จังหวัด",
    alro_name: 'ชื่อพื้นที่สปก.',
    alro_statu: 'สถานะพื้นที่สปก.',
    fcg_name: 'ชื่อป่าชุมชน',
    rai: 'ขนาดพื้นที่ (ไร่)',
    ngan: 'ขนาดพื้นที่ (งาน)',
    wha: 'ขนาดพื้นที่ (วา)',
    rock_type_: 'ประเภทของหินภาษาไทย',
    rock_type1: 'ประเภทของหินภาษาอังกฤษ',
    formation_: 'หมวดหินภาษาไทย',
    formation1: 'หมวดหินภาษาอังกฤษ',
    period_t: 'ยุคทางธรณีวิทยาภาษาไทย',
    period_e: 'ยุคทางธรณีวิทยาภาษาอังกฤษ',
    symbol: 'สัญลักษณ์',
    legend: 'คำอธิบายสัญลักษณ์',
    m_name_t: 'ชื่อทรัพยากรแร่',
    gen_geo: 'คำอธิบายลักษณะแหล่งแร่',
    com_namt: 'ชนิดแร่',
    min_cat: 'หมวดหมู่ทรัพยากรแร่',
    min_gen: 'แหล่งแร่',
    usage_t: 'ประโยชน์การใช้งาน',
    pn_name_t: 'ชื่อแหล่งธรรมชาติทางธรณีวิทยา',
    ge_type_id: 'รหัสประเภทแหล่งธรรมชาติทางธรณีวิทยา',
    ge_type: 'ประเภทแหล่งธรรมชาติทางธรณีวิทยา',
    comname_t: 'ชื่อแร่ทางการค้าภาษาไทย',
    comname_e: 'ชื่อแร่ทางการค้าภาษาอังกฤษ',
    com_symbol: 'สัญลักษณ์ชื่อแร่',
    name_t_: "สถานที่พบ",
    gen_geo: 'ข้อมูลธรณีวิทยาทั่วไป',
    min_geo: 'ข้อมูลแร่',
    min_gen: 'ข้อมูลแหล่งแร่',
    m_name_t: 'ชื่อแร่ภาษาไทย',
    m_name_e: 'ชื่อแร่ภาษาอังกฤษ',
    createby: 'สร้างข้อมูลโดย',
    reserve: 'ปริมาณแร่สำรองประทานบัตร',
    mineral_ab: 'ชื่อแร่อักษรย่อ',
    mineral_t: 'ชื่อแร่ภาษาไทย',
    mineral_e: 'ชื่อแร่ภาษาอังกฤษ',
    fertility: 'ความอุดมสมบูรณ์ของดิน',
    texture_to: 'ลักษณะดิน',
    soilserien: 'ชุดดินจัดตั้ง',
    ph_top: 'ค่าความเป็นกรดด่าง',
    des_th: 'คำอธิบายการใช้ประโยชน์ที่ดิน',
    zonename30: 'ชื่อเขตป่าชายเลน',
    zonename43: 'ชื่อเขตพื้นที่',
    lu52_nam: 'การใช้ประโยชน์ที่ดินในป่าชายเลน',
    ot_name: 'ชื่อเมืองเก่า',
    zone_detai: 'รายละเอียดโซน',
    name_: "ชื่อวนอุทยานภาษาอังกฤษ",
    compliantly: "เรื่องร้องเรียน",
    type2: "ประเภท",
    prov: "จังหวัด",
    greengroup: "ประเภทพื้นที่สีเขียว",
    temple_name: "ชื่อแหล่งศิปกรรม",
    typ: "ประเภท",
    location: "สถานที่",
    muni_name: "ชื่อ",
    id: "หมายเลข"
}


map.on("click", async (e) => {
    var pnt = await map.latLngToContainerPoint(e.latlng, map.getZoom());
    var size = await map.getSize();
    var bbox = await map.getBounds().toBBoxString();
    // console.log(pnt, size, bbox);
    // console.log(e.latlng)
    $("#showlat").text(e.latlng.lat)
    $("#showlng").text(e.latlng.lng)

    let lyrInfoUrl = eecGeoserver + "/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=" + wmsLyr +
        "&LAYERS=" + wmsLyr +
        "&Feature_count=" + wmsLyr.length +
        "&INFO_FORMAT=application/json" +
        "&X=" + Math.round(pnt.x) +
        "&Y=" + Math.round(pnt.y) +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;

    await axios.get(lyrInfoUrl).then(r => {
        if (r.data.features) {
            $("#accordion_info").empty();
            // console.log(r.data.features);
            r.data.features.map(async (i, k) => {
                // console.log(i, k);

                let lname = i.id.split(".")
                // console.log(lname[0]);
                $("#a" + k).empty();

                await $("#accordion_info").append(
                    `<div class="d-flex flex-column card-list">
                        <div id="heading${k}">
                            <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${k}"
                            aria-expanded="true" aria-controls="collapse${k}">
                            ${lyrName[lname[0]]}
                        </button>
                            </h5>
                            <div id="collapse${k}" class="collapse show wf" aria-labelledby="heading${k}" data-parent="#accordion">
                                <div class="card-body p-2">
                                    <ul id="a${k}"></ul>
                                </div>
                            </div>
                        </div>
                    </div>`)

                for (const [key, value] of Object.entries(i.properties)) {
                    // console.log(fieldInfo[key]);
                    fieldInfo[key] != undefined ? $("#a" + k).append(`<li><span class="p-2">${fieldInfo[key]}: ${value} </span></li>`) : null;
                }
            })
            $("#infoModal").modal("show")
        }
    })
})

pro.addTo(map)
getLayer()

let loadWtrl = async () => {
    let iconblue = L.icon({
        iconUrl: './marker/gas-station.png',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let sta = [
        {
            stname: "station_01",
            latlon: [12.846510200000028, 100.9376361],
            measure: 275.5
        }, {
            stname: "station_02",
            latlon: [12.848099999999983, 100.95313000000002],
            measure: 244
        }, {
            stname: "station_03",
            latlon: [12.8661616, 100.9989804],
            measure: 298
        }, {
            stname: "station_04",
            latlon: [12.694406999999996, 101.44470699999997],
            measure: 294
        }, {
            stname: "station_05",
            latlon: [12.703484000000008, 101.468717],
            measure: 280
        }, {
            stname: "station_06",
            latlon: [12.70139960000001, 101.49543049999],
            measure: 435
        }, {
            stname: "station_07",
            latlon: [12.985111299999994, 101.6776677],
            measure: 380.6
        }, {
            stname: "station_08",
            latlon: [12.909515899999995, 101.71460159999998],
            measure: 512
        }, {
            stname: "station_09",
            latlon: [12.836749900000017, 101.73254899999998],
            measure: 550.5
        }]

    sta.map(async (i) => {
        let resSt01 = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get-by-day.php', { stname: i.stname, limit: 1 });
        resSt01.then(r => {
            let d = r.data.data[0];

            let num = i.measure - Number(d.dept);
            let a = num.toFixed(2)

            let marker = L.marker(i.latlon, {
                icon: iconblue,
                name: 'lyr',
                // data: dat
            });
            // console.log(i.measure);
            marker.addTo(map)
            marker.bindPopup(`<div style="font-family:'Kanit'"> 
            ชื่อสถานี : ${i.stname} <br>
            ระดับน้ำ : ${a < 1 ? 0 : a} mm.<br>
            ความชื้นสัมพัทธ์ : ${Number(d.humi).toFixed(1)} %.<br>
            อุณหภูมิ : ${Number(d.temp).toFixed(1)} องศาเซลเซียส<br>
            ดูกราฟ <span style="font-size: 20px; color:#006fa2; cursor: pointer;" onclick="wtrlModal('${i.stname}','${i.measure}')"><i class="bi bi-file-earmark-bar-graph"></i></span>
            </div>`
            )
        })
    })
}


let wtrlModal = (staname, measure) => {
    // console.log(staname);
    let arrDept = [];
    let arrTemp = [];
    let arrHumi = [];
    axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get-by-day.php", { stname: staname, limit: 10000 }).then(r => {
        // console.log(r.data.data);
        r.data.data.map(i => {
            let num = measure - Number(i.dept);
            let a = num.toFixed(2)

            arrDept.push({
                "date": i.dt,
                "value": a < 1 ? 0 : a
            });
            arrTemp.push({
                "date": i.dt,
                "value": Math.round(Number(i.temp))
            });
            arrHumi.push({
                "date": i.dt,
                "value": Math.round(Number(i.humi))
            });
        })
    })

    $('#chart_sta').text(staname).hide()
    setTimeout(() => {
        $("#wtrlModal").modal("show");
    }, 1500)

    setTimeout(() => {
        $('#chart_sta').fadeIn();
        wtrlChart(arrDept, "depthChart", "ระดับน้ำ (cm.)");
        wtrlChart(arrTemp, "tempChart", "อุณหภูมิ (°C)");
        wtrlChart(arrHumi, "humiChart", "ความชื้น (%)");
        // console.log(arrDept, arrTemp, arrHumi);
    }, 2000)



}
let wtrlChart = (arrData, div, unit) => {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // console.log(arrData)
    // Add data
    chart.data = arrData;

    // Set input format for the dates
    // chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = unit;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    // series.tensionX = 0.8;
    series.strokeWidth = 2;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#00b80f");

    // Drop-shaped tooltips
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color("#00b80f");
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // var range = valueAxis.createSeriesRange(series);
    // range.value = index;
    // range.endValue = -1000;
    // range.contents.stroke = am4core.color("#ff0000");
    // range.contents.fill = range.contents.stroke;

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.59;
    dateAxis.keepSelection = true;
}

let loadWqua = async () => {
    let sta = [
        {
            staname: "station_01",
            latlon: [13.691624, 101.442835]
        }, {
            staname: "station_02",
            latlon: [13.0465397, 100.9197114]
        }, {
            staname: "station_03",
            latlon: [12.8291659, 101.3244348]
        }]

    let sum_data = []
    sta.map(async (i) => {
        let dat_ec = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ec", sort: "DESC", stname: i.staname, limit: 1 });
        dat_ec.then(r => {
            let A1 = r.data.data;

            let dat_ph = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ph", sort: "DESC", stname: i.staname, limit: 1 });
            dat_ph.then(r => {
                let B1 = r.data.data;

                let dat_do = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "do", sort: "DESC", stname: i.staname, limit: 1 });
                dat_do.then(r => {
                    let C1 = r.data.data;

                    let dat_tmp = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "tmp", sort: "DESC", stname: i.staname, limit: 1 });
                    dat_tmp.then(r => {
                        let D1 = r.data.data;
                        sum_data.push({ staname: i.staname, latlon: i.latlon, ec: Number(A1[0].val), ec_time: A1[0].t, ph: Number(B1[0].val), ph_time: B1[0].t, do: Number(C1[0].val), do_time: C1[0].t, tmp: Number(D1[0].val), tmp_time: D1[0].t, tmp: Number(D1[0].val), tmp_time: D1[0].t });

                        if (sum_data.length == '3') {
                            marker_Wqua(sum_data)
                        }
                    })
                })
            })
        })
    })
}

let staW_qua
let marker_Wqua = (d) => {
    let iconblue = L.icon({
        iconUrl: './marker/sta_qu.png',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });
    staW_qua = L.layerGroup()
    let data = d;
    data.map(i => {
        let marker = L.marker(i.latlon, {
            icon: iconblue,
            name: 'lyr',
            // data: dat
        });
        marker.addTo(map)
        marker.bindPopup(`<div style="font-family:'Kanit'; font-size: 15px;"> 
                        ชื่อสถานี : ${i.staname} <br>
                        ค่า pH : ${Number(i.ph).toFixed(1)}<br>
                        ค่าการนำไฟฟ้า : ${Number(i.ec).toFixed(1)} µS/cm<br>
                        ค่า DO : ${Number(i.do).toFixed(1)} ppm<br>
                        อุณหภูมิ : ${Number(i.tmp).toFixed(1)} องศาเซลเซียส<br>
                        ดูกราฟ <span style="font-size: 20px; color:#006fa2; cursor: pointer;" onclick="WquaModal('${i.staname}')"><i class="bi bi-file-earmark-bar-graph"></i></span>
                        </div>`)
        staW_qua.addLayer(marker);
    })
}

let WquaModal = (stname) => {
    // console.log(stname);
    let arrPh = [];
    let arrTemp = [];
    let arrEC = [];
    let arrDO = [];

    let dat_ec = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ec", sort: "DESC", stname: stname, limit: 90 });
    dat_ec.then(r => {
        let A1 = r.data.data;
        // console.log(A1)
        A1.map(i => {
            arrEC.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_ph = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ph", sort: "DESC", stname: stname, limit: 90 });
    dat_ph.then(r => {
        let B1 = r.data.data;
        // console.log(B1)
        B1.map(i => {
            arrPh.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_do = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "do", sort: "DESC", stname: stname, limit: 90 });
    dat_do.then(r => {
        let C1 = r.data.data;
        // console.log(C1)
        C1.map(i => {
            arrDO.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_tmp = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "tmp", sort: "DESC", stname: stname, limit: 90 });
    dat_tmp.then(r => {
        let D1 = r.data.data;
        // console.log(D1)
        D1.map(i => {
            arrTemp.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    setTimeout(() => {
        // console.log(arrDept, arrTemp, arrHumi);
        Wquachart(arrPh, "pHChart", "ค่า pH");
        Wquachart(arrEC, "ECChart", "ค่าการนำไฟฟ้า (µS/cm)");
        Wquachart(arrTemp, "TempChart", "อุณหภูมิ (°C)");
        Wquachart(arrDO, "DOChart", "ค่า DO (ppm)");
    }, 500)


    $("#WquaModal").modal("show");

}

let Wquachart = function (data, div, title) {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create(div, am4charts.XYChart);
    chart.paddingRight = 60;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
    };

    dateAxis.dateFormats.setKey("dd MMMM yyyy");
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.tooltipDateFormat = "yyyy-MM-dd HH:mm:ss";

    chart.data = data;

    // Create axes
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = title;


    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    // series.tensionX = 0.8;
    series.stroke = am4core.color("#00BFFF");
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "value";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    // var range = valueAxis.createSeriesRange(series);
    // range.value = 35;
    // range.endValue = 100;
    // range.contents.stroke = am4core.color("#ff0000");
    // range.contents.fill = range.contents.stroke;


    // chart.scrollbarY = new am4core.Scrollbar();
    // chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

};