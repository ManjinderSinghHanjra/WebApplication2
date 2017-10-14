var strHostName = "DemoProject";

$(document).ready(function () {
   
    var table = $("#contactCenters").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "/" + strHostName + "/Home/Details",
            type: 'POST',
            error: function (e, ts, et) {
                alert(ts);
            }
        },
        columns: [
                    { 'data': '' },
                    {
                        'data': "Name",
                        'searchable': true
                    },
                    { 'data': "Dob" },
                    { 'data': "EmailID" },
                    {
                        'data': "Password",
                        'searchable': false,
                        'orderable': false
                    },
                    { 'data': "Auth" }
        ],
        'columnDefs': [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center select-checkbox',
            'render': function (data, type, full, meta) {
                return '<input type="checkbox" />';
            },
            select: {
                style: 'os',
                selector: 'td:first-child'
            }
        }],
        "scrollY": "400px"

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
        var data;
        var allCheckBoxes = document.querySelectorAll("input[type=checkbox]");
        console.log(allCheckBoxes);
        for (var i = 2; i < allCheckBoxes.length; i++) {
            var checkBox = allCheckBoxes[i];
            if (checkBox.checked == true) {
                data = JSON.stringify(table.row(checkBox.parentNode).data());
                $.ajax({
                    url: "/" + strHostName + "/Home/Delete",
                    type: "POST",
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    cache: false,
                    success: function (reply) {
                        table.ajax.reload().draw();
                    },
                    failure: function () { console.log("error"); }
                });
            }
        }
    });


    /* ROW_CLICK: When a ROW is selected/deselected/clicked, UPDATE_BUTTON is shown & hidden. 
     *            Further, if UPDATE_BUTTON is clicked, the data of selected row is submitted
     *            on the server, and server saves the data in TempData[] variable and redirects
     *            user to the ModifyRecord Page.
     */
    $("#contactCenters").on('click', 'tr', function () {
        // Todo: Make row selection from multiple to single.
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $("#updateSelected").css('display', 'none');

        }
        else {
            $(this).addClass('selected');
            var rowdata = JSON.stringify(table.row(this).data());

            $("#updateSelected").css('display', 'inline');


            // To update the row selected, a new View will be fetched.
            $("#contactCenters_length").on('click', '#updateSelected', function (e) {
                $.ajax({
                    url: "/" + strHostName + "/home/ModifyRecord1",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: rowdata,
                    cache: false,
                    async: false,
                    success: function (reply) {
                        if (reply.result == 'Redirect')
                            window.location.href = "/" + strHostName + reply.url;
                    },
                    error: function (reply) {
                        alert("error in ajax call: " + JSON.stringify(reply));
                    }
                });
            });

        }
    });

});