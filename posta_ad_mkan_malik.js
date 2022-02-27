var scriptUrl = "https://script.google.com/macros/s/AKfycbwPmiJUlMKUr2y47ITvUX2wuLGwQVhHQB5BADH_dSJF8hdiHtfOYLHhXRMvv9ZeK5I4AA/exec"
function readFiles() {
    return new Promise(function (res, rej) {
        let files = $('input:file')[0].files
        let filesArr = [];
        $(files).each(function (index) {
            let reader = new FileReader();
            let fileObj = {};
            reader.onload = function () {
                fileObj['fileContent'] = reader.result;
                fileObj['filename'] = files[index].name;
                filesArr.push(fileObj);

                if (filesArr.length == files.length)
                    return res(filesArr);
            }
            reader.readAsDataURL(files[index]);
        });
    });
}

function submit() {
    // disabling submit button;
    $('input:button').prop('disabled', true);
    let payload = {};
    $('input:text').each(function (index) {
        let propname = $(this).attr('id')
        payload[propname] = $(this).val();
    });

    readFiles()
        .then(function (result) {
            payload['files'] = result;
            payload['totalFiles'] = result.length;
            postPayload(payload)
                .then(function (result) {
                    console.log("completed call");
                    $('input:text').val('');
                    $('input:file').val('');
                    $('input:button').prop('disabled', false);
                    alert("Your Ad Submit Successfully");
                })
                .catch(function (error) {
                    console.log("error occured");
                    $('input:button').prop('disabled', false);
                })
        }).catch(function (err) {
            console.error("some error occured");
            $('input:button').prop('disabled', false);
        });

}

function postPayload(payload) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: scriptUrl,
            data: payload,
            success: function (result) {
                resolve(result);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}
