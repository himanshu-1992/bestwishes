
var scriptUrl = "https://script.google.com/macros/s/AKfycbwitIs2KK4HXdG7bQ0V-QRiDQGSBd58npRuusDjiTmtktTj1lfc/exec"

//https://script.google.com/macros/s/AKfycbwitIs2KK4HXdG7bQ0V-QRiDQGSBd58npRuusDjiTmtktTj1lfc/exec

//https://script.google.com/macros/s/AKfycbyZHXFhMCvM6sY62yUFqpYn9xRtI8emEZxbGrOssObdGax7b2w/exec

//var scriptUrl = "https://script.google.com/macros/s/AKfycbyZHXFhMCvM6sY62yUFqpYn9xRtI8emEZxbGrOssObdGax7b2w/exec"

                   //https://script.google.com/macros/s/AKfycbyZHXFhMCvM6sY62yUFqpYn9xRtI8emEZxbGrOssObdGax7b2w/exec

//var scriptUrl = "https://script.google.com/macros/s/1_pmtomXDB3yfj-0VtNBhSlVY_pagsvmEtMdcKEq-RSU/exec"
//https://script.google.com/macros/s/AKfycbyZHXFhMCvM6sY62yUFqpYn9xRtI8emEZxbGrOssObdGax7b2w/exec


//https://script.google.com/macros/s/AKfycbyZHXFhMCvM6sY62yUFqpYn9xRtI8emEZxbGrOssObdGax7b2w/exec

//https://script.google.com/macros/s/AKfycbzI5LqEpv0TJ6tUXj4ua4qvgecjZNZCssYXctHI-jrPTGNFqdE/exec

//var scriptUrl = "https://script.google.com/macros/s/AKfycbzI5LqEpv0TJ6tUXj4ua4qvgecjZNZCssYXctHI-jrPTGNFqdE/exec"

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
                    alert("File Uploaded Successfully");
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