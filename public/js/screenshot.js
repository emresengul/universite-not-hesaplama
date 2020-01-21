var ekranGoruntusuButonu = document.getElementById("ekran-goruntusu");




ekranGoruntusuButonu.addEventListener("click", screenShot)


function screenShot() {
    var obje = []
    var kullaniciGelen = document.getElementsByClassName("text-primary")[0];
    var kullanici = kullaniciGelen.innerHTML;
    var ortalama = Number(document.getElementsByClassName("bilgiler")[0].children[0].textContent.split(":")[1]);
    console.log(ortalama)

    for (let x = 0; x < 20; x++) {
        var dersHepsi = document.getElementsByName(`ders${x}`)[0] // Dersleri Alma
        var krediHepsi = document.getElementsByName(`kredi${x}`)[0] // Kredileri Alma
        var harfHepsi = document.getElementsByName(`harf${x}`)[0] // Harfleri Alma
        if (dersHepsi != undefined || dersHepsi != null || krediHepsi != undefined || krediHepsi != null || harfHepsi != undefined || harfHepsi != null) {
            var dersAdi = dersHepsi.value;
            var kredi = krediHepsi.value;
            var secilenHarf = document.getElementsByName(`harf${x}`)[0].options[document.getElementsByName(`harf${x}`)[0].selectedIndex].textContent

            obje.push({ ders: dersAdi, kredi: Number(kredi), harf: secilenHarf })
        }
    }
    console.log(obje)
    var htmlAlan = `

    <style>
    *{
        background-color: rgb(22,27,29);
        color:white;
    }
    body{
    }

    h2{
        font-size: 2rem;
        text-align:center;
    }


    </style>
        <h1 style="color:red; font-size:3rem; text-align:center;">Üniversite Ortalamam: ${ortalama}</h1>
        <h1 style="color:red; font-size:1.5rem; text-align:center;">Hesaplayan Kişi: ${kullanici}</h1>
        <table border="3" style="border-collapse:collapse; border-color:black;"> 
            <tr>
                <th width="1020" colspan="3"><h1>Üniversite Not Hesaplama <small> (universite.emresengul.com)</small></h1></th>    
            </tr>
            <tr>
                <th width="750"><h1>Ders Adı</h1></th>
                <th width="100"><h1>Ders Kredisi</h1></th>
                <th width="100"><h1>Harf Notu</h1></th>
            </tr>
    ` ;


    // 1-2
    // 3-5
    // 6-8
    // 9-11
    // 12-14
    // 15-18
    // 18 ve yukarısı
    if (obje.length >= 1 && obje.length < 3) {
        console.log("1-3")
        var tableCC = 5;
        var normalCC = 5;
        var notlarCC = 4;
        var destek = "destekliyor"
        var marginCC = 0;

    }
    if (obje.length >= 3 && obje.length <= 5) {
        console.log("3-5")
        var tableCC = 4.75; // Ders Adı
        var normalCC = 3.80; // Hesaplayan Kişi ve Ortalama Kısmı
        var notlarCC = 4; // Harf ve Kredi Kısmı
        var destek = "destekliyor"
        var marginCC = 0;


    }
    if (obje.length >= 6 && obje.length <= 8) {
        console.log("6-8")
        var tableCC = 3; // Ders Adı
        var normalCC = 4; // Hesaplayan Kişi ve Ortalama Kısmı
        var notlarCC = 2; // Harf ve Kredi Kısmı
        var destek = "destekliyor"
        var marginCC = 0;


    }
    if (obje.length >= 9 && obje.length <= 11) {
        console.log("9-11")
        var tableCC = 2.5; // Ders Adı
        var normalCC = 4; // Hesaplayan Kişi ve Ortalama Kısmı
        var notlarCC = 1.75; // Harf ve Kredi Kısmı
        var destek = "destekliyor"
        var marginCC = 0;


    }
    if (obje.length >= 12 && obje.length <= 14) {
        console.log("12-14")
        var tableCC = 2.5; // Ders Adı
        var normalCC = 2.60; // Hesaplayan Kişi ve Ortalama Kısmı
        var notlarCC = 1.75; // Harf ve Kredi Kısmı
        var destek = "destekliyor"
        var marginCC = 1;


    }
    if (obje.length >= 15 && obje.length <= 18) {
        console.log("15-18")
        var tableCC = 2; // Ders Adı
        var normalCC = 2.40; // Hesaplayan Kişi ve Ortalama Kısmı
        var notlarCC = 1.75; // Harf ve Kredi Kısmı
        var dersCC = 2;
        var destek = "destekliyor"
        var marginCC = 1;

    }
    if (obje.length > 19) {
        var destek = null;
        console.log("desteklemiyor")
    }
    if (destek != null) {
        for (let i = 0; i < obje.length; i++) {
            var htmlAlan = htmlAlan + `
            <style>
                table{
                    margin-left: ${marginCC}rem;
                }


                td h1{
                    font-size: ${tableCC}rem !important;
                }
                h1{
                    font-size: ${normalCC}rem !important;
                }
                td h2{
                    font-size: ${notlarCC}rem !important;
                }
                th h1{
                    font-size: ${dersCC}rem !important; 
                }
    
            </style>           
            <tr>
                <td><h1>${obje[i].ders}</h1></td>
                <td><h2>${obje[i].kredi}</h2></td>
                <td><h2>${obje[i].harf}</h2></td>
            </tr>`
        }
    }

    const ctx = document.getElementById('myCanvas').getContext('2d');
    const html = htmlAlan;
    render_html_to_canvas(html, ctx, 0, 0, 1080, 1920);


    function render_html_to_canvas(html, ctx, x, y, width, height) {
        var data = "data:image/svg+xml;charset=utf-8," + '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
            '<foreignObject width="100%" height="100%">' +
            html_to_xml(html) +
            '</foreignObject>' +
            '</svg>';

        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, x, y);
        }
        img.src = data;
    }

    function html_to_xml(html) {
        var doc = document.implementation.createHTMLDocument('');
        doc.write(html);

        doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);

        // Get well-formed markup
        html = (new XMLSerializer).serializeToString(doc.body);
        return html;
    }


}
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 100);
ctx.lineWidth = 10;
ctx.strokeRect(20, 20, 60, 60);

function DownloadCanvasAsImage(){
	let downloadLink = document.createElement('a');
	downloadLink.setAttribute('download', 'universite_not_emresengul.com.png');
	let canvas = document.getElementById('myCanvas');
  let dataURL = canvas.toDataURL('image/png');
  let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
	downloadLink.setAttribute('href',url);
	downloadLink.click();
}
