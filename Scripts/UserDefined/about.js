var strHostName = "DemoProject";

$(document).ready(function () {

    var table = $("#contactCenters").DataTable({
        deferRender: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/" + strHostName + "/Home/PopulateDataTable",
            type: 'POST',
            error: function (e, ts, et) {
                alert(ts);
            }
        },
        columns: [
                    {
                        targets: [0],
                        data: "Id",
                        orderable: false,
                        searchable: false
                    },
                    {
                        targets: [1],
                        data: "Name",
                        searchable: true
                    },
                    {
                        targets: [2],
                        data: "Dob",
                        render:function (value) {
                            if (value === null) return "";

                            var pattern = /Date\(([^)]+)\)/;
                            var results = pattern.exec(value);
                            var dt = new Date(parseFloat(results[1]));

                            return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
                        }
                    },
                    {
                        targets: [3],
                        data: "EmailID"
                    },
                    {
                        targets: [4],
                        data: "Password",
                        searchable: false,
                        orderable: false
                    },
                    {
                        targets: [5],
                        data: "Auth"
                    }
        ],
        columnDefs: [{
            targets: [0],
            searchable: false,
            orderable: false,
            className: 'dt-body-center select-checkbox',
            render: function (data, type, full, meta) {
                return '<input type="checkbox" />';
            }
        }],
        style: 'os',
        selector: 'td:not(:first-child)',
        scrollY: "400px"

    });
    /* PARENT_CHECKBOX */
    $('#parentCheckbox').on('click', function () {
        var rows = table.rows({ 'search': 'applied' }).nodes();
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
    });


    /* Delete & Update buttons, that are dynamically generated */
    $("#contactCenters_length").append('<button id="deleteSelected" type="button" class="btn btn-warning" style="margin-left:20px;">Delete Selected</button>');
    $("#contactCenters_length").append('<button id="updateSelected" type="button" class="btn btn-warning" style="margin-left:20px; display:none">Edit Highlighted Row</button>');

    /* DELETE_BUTTON: Delete the records that are selected while syncing with the server. */
    $("#contactCenters_length").on('click', '#deleteSelected', function (e) {
        var listUserIds = [];
        var allCheckBoxes = document.querySelectorAll("input[type=checkbox]");
        for (var i = 1; i < allCheckBoxes.length; i++) {
            if (allCheckBoxes[i].checked == true) {
                userId = table.row(allCheckBoxes[i].parentNode).data().Id;
                JSON.stringify(listUserIds.push(userId));
            }
        }
        $.ajax({
            url: "/" + strHostName + "/Home/Delete",
            type: "POST",
            data: JSON.stringify({ "listUserIds": listUserIds }),
            contentType: "application/json; charset=utf-8",
            async: true,
            cache: false,
            success: function (reply) {
            },
            failure: function () { console.log("error"); }
        });
        table.ajax.reload().draw();
        allCheckBoxes[0].checked = false;

    });


    /* ROW_CLICK: When a ROW is selected/deselected/clicked, UPDATE_BUTTON is shown & hidden. 
     *            Further, if UPDATE_BUTTON is clicked, the data of selected row is submitted
     *            on the server, and server saves the data in TempData[] variable and redirects
     *            user to the ModifyRecord Page.
     */
    $("#contactCenters tbody").on('click', "td:not(:first-child)", function () {
        var userId = (table.row(this.parentNode).data().Id);
        $(this).addClass('selected');
        if (table.row(this).data().checked == true) {
        }
        else {
            $.ajax({
                url: "/" + strHostName + "/home/RequestToUpdateUser",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: '{ userId : ' + userId + '}',
                cache: false,
                async: true,
                success: function (reply) {
                    if (reply.result == 'Redirect')
                        window.location.href = "/" + strHostName + "/" + reply.url;
                },
                error: function (reply) {
                    alert("error in ajax call: " + JSON.stringify(reply));
                }
            });
        }
    });

});