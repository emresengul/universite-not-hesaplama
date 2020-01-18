const dersler = document.getElementsByClassName("dersler")[0];
const dersSayisi = document.getElementById("ders-sayi");

const adAlan = document.getElementsByClassName("ad")[0];



dersSayisi.addEventListener("change", hesapla)
function hesapla() {

    const dersToplam = dersSayisi.value;
    if(adAlan == undefined){
    }
    else{
        adAlan.innerHTML = `
        <div class="form-group col-md-12">   
        <input type="text" name="ad" class="form-control bg-primary mb-3 mt-3 text-light" id="ad" placeholder="Adınız (İsteğe Bağlı) | Notunuzda İsminizi Görmek İçin Yazın">
    </div>
        `
    }

    dersler.innerHTML = ``;

    for (let i = 0; dersToplam > i; i++) {
        // var baslangic = baslangic + 1;
        var baslangic = Math.floor(Math.random() * 999) + 1;

        dersler.innerHTML += `
            <div class="form-group col-md-4">   
        <input type="text" name="ders${baslangic}" class="form-control" id="ders${baslangic}" placeholder="Ders Adı">
    </div>
    <div class="form-group col-md-4">
        <select class="form-control" id="kredi${baslangic}" name="kredi${baslangic}">
            <option value="1">1 Kredi</option>
            <option value="1.5">1.5 Kredi</option>
            <option value="2">2 Kredi</option>
            <option value="2.5">2.5 Kredi</option>
            <option value="3">3 Kredi</option>
            <option value="3.5">3.5 Kredi</option>
            <option value="4">4 Kredi</option>
            <option value="4.5">4.5 Kredi</option>
            <option value="5">5 Kredi</option>
            <option value="5.5">5.5 Kredi</option>
            <option value="6">6 Kredi</option>
            <option value="6.5">6.5 Kredi</option>
            <option value="7">7 Kredi</option>
            <option value="7.5">7.5 Kredi</option>
            <option value="8">8 Kredi</option>
            <option value="8.5">8.5 Kredi</option>
            <option value="9">9 Kredi</option>
            <option value="9.5">9.5 Kredi</option>
            <option value="10">10</option>
        </select>
    </div>
    <div class="form-group col-md-3">  
        <select class="form-control" id="harf${baslangic}" name="harf${baslangic}">
            <option value="4">AA</option>
            <option value="3.5">BA</option>
            <option value="3">BB</option>
            <option value="2.5">CB</option>
            <option value="2">CC</option>
            <option value="1.5">DC</option>
            <option value="1">DD</option>
            <option value="0.5">FD</option>
            <option value="0">FF</option>
        </select>
    </div>
    <hr>
            `
    }
}

