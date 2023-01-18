Dropzone.options.dropzone = {
    url: '/upload',
    method: 'post',
    autoProcessQueue: false,
    uploadMultiple: true,
    addRemoveLinks: true,
    dictCancelUpload: false,
    dictCancelUploadConfirmation: false,
    dictRemoveFile: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-trash-fill\" viewBox=\"0 0 16 16\">\n" + "  <path d=\"M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z\"/>\n" + "</svg>",
    init: function () {
        let dropzone = this;
        const btn = document.getElementById('btn-upload');
        const link = document.getElementById('btn-download');

        btn.addEventListener('click', () => {
            btn.animate({
                text: '3123123'
            }, 2000)
            btn.innerHTML = 'Загрузка...';
            dropzone.processQueue()
        })

        dropzone.on('successmultiple', (file, data) => {
            btn.classList.add('d-none');
            link.href = '/download?folder=' + data;
            link.classList.remove('d-none');
        });

        link.addEventListener('click', () => {
            btn.classList.remove('d-none');
            link.classList.add('d-none');
            btn.innerHTML = 'Отправить';
            dropzone.removeAllFiles(true);
        })
    }
}
