let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
uid && typ == "admin" ? null : logout();
$("#aut").html(`${org}`)

if (typ == "admin") {
    $("#usermenu").append(`<li><a href=""><i class="bi bi-person-square"></i>&nbsp;<span >${org}</span></a></li>
        <li class="active"><a href="./../admin/index.html"><i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a></li>`)
}

const url = "https://engrids.soc.cmu.ac.th/api";

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
            },
            "emptyTable": "ไม่พบข้อมูล..."
        }
    });
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/login-api/getuser',
            data: { uid: uid },
            dataSrc: 'data'
        },
        columns: [
            { data: 'usrname' },
            { data: 'organize', width: "30%" },
            { data: 'tel' },
            { data: 'email' },
            { data: 'auth' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-margin btn-info" 
                                onclick="editProfile('${row.uid}')">
                                <i class="bi bi-tools"></i>&nbsp;แก้ไขข้อมูล
                            </button>
                            <button type="button" class="btn btn-margin btn-danger" 
                                onclick="confirmDelete('${row.uid}','${row.usrname}')">
                                <i class="bi bi-trash"></i>&nbsp;ลบ
                            </button>`
                },
                width: "23%"
            }
        ],
        searching: true,
    });
})

let confirmDelete = (uid, usrname) => {
    $("#uid").val(uid)
    $("#name").text(usrname)
    $("#usrname").val(usrname)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    let uid = $("#uid").val()
    let usrname = $("#usrname").val()
    axios.post(url + "/login-api/delete", { uid: uid, usrname: usrname }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

let editProfile = (uid) => {
    sessionStorage.setItem("pfuid", uid);
    location.href = "./../profile/index.html"

}










