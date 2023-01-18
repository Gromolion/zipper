const express = require('express'),
    app = express(),
    fileUpload = require('express-fileupload'),
    fs = require('fs'),
    uuid = require('uuid'),
    admzip = require('adm-zip')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(fileUpload({
    defCharset: 'utf8',
    defParamCharset: 'utf8'
}));
app.set('view engine', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/upload', async (req, res) => {
    const _uuid = uuid.v4();
    const folderPath = __dirname + '/uploaded/' + _uuid + '/';

    await fs.mkdir(folderPath, async function (err) {
        if (err) return res.status(500).send(err);
        let file;

        for (let key in req.files) {
            file = req.files[key];

            await file.mv(folderPath + file.name, function (err) {
                if (err) return res.status(500).send(err);
            });
        }
    });

    res.send(_uuid);
});

app.get('/download', async (req, res) => {
    const folder = req.query.folder;
    const zip = new admzip();
    const archivePath = __dirname + '/uploaded/' + folder + '.zip';

    zip.addLocalFolder('./uploaded/' + folder );
    zip.writeZip(archivePath)

    res.download(archivePath)
})

app.listen(7000, () => {
    console.log('Сервер запущен на 7000 порту');
});
