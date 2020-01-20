const Not = require("../models/not");
const moment = require("moment")

exports.getIndex = (req, res, next) => {
    Not.find().sort({ _id: -1 }).limit(10)
        .then(result => {
            var zamanlar = [];
            result.forEach(element => {
                let deger = moment([element.date.yil, element.date.ay - 1, element.date.gun, element.date.saat, element.date.dakika, element.date.saniye]).locale("tr").fromNow()
                // zamanlar.push(deger)
                zamanlar.push({
                    zaman: deger
                })
            });
            let olusturucu = Object.assign({}, zamanlar);
            for (let index = 0; index < result.length; index++) {
                result[index].date.zaman = olusturucu[index].zaman
            }
            if (req.cookies.hesap != undefined) {
                var gelenCookies = req.cookies.hesap.split(":")
                Not.find({
                    url: { $in: gelenCookies }
                }).sort({_id:-1}).limit(5)
                    .then(kullanici => {
                        var zamanlar2 = [];
                        kullanici.forEach(el => {
                            let degerci = moment([el.date.yil, el.date.ay - 1, el.date.gun, el.date.saat, el.date.dakika, el.date.saniye]).locale("tr").fromNow()
                            zamanlar2.push({
                                zaman: degerci
                            })
                        });
                        let olusturucum = Object.assign({}, zamanlar2);
                        for (let index = 0; index < kullanici.length; index++) {
                            kullanici[index].date.zaman = olusturucum[index].zaman
                        }
                        res.render("main/index", {
                            dersler: 0,
                            ortalama: 0,
                            bilgi: result,
                            url: req.protocol + "://" + req.get('host') + "/" + "hesapla/",
                            action: req.query.action,
                            kullanici: kullanici
                        });
                    })
                    .catch(err=>{
                        next(err);
                    })
            }
            else{
                res.render("main/index", {
                    dersler: 0,
                    ortalama: 0,
                    bilgi: result,
                    url: req.protocol + "://" + req.get('host') + "/" + "hesapla/",
                    action: req.query.action,
                    kullanici: undefined
                });

            }


        })
        .catch(err => {
            next(err);
        })
}
exports.sonuclariGetir = (req, res, next) => {
    let dersAdlari = []
    let krediler = [];
    let harfler = []
    var toplam = 0;
    var krediToplam = 0;
    var obje = [];
    var ad = [];
    let idGenerator = Math.floor(Math.random() * 999) + 1;
    let idGenerator2 = Math.floor(Math.random() * 999) + 1;
    let idGenerator3 = Math.floor(Math.random() * 999) + 1;
    let idGenerator4 = Math.floor(Math.random() * 999) + 1;
    let idGenerator5 = Math.floor(Math.random() * 999) + 1;

    var splitWithoutrandomId = [idGenerator, idGenerator2, idGenerator3, idGenerator4, idGenerator5] + [idGenerator + idGenerator2];
    var splitRandomId = splitWithoutrandomId.split(",");
    var randomId = splitRandomId[0] + splitRandomId[1] + splitRandomId[2] + splitRandomId[3] + splitRandomId[4]




    var dersler = Object.entries(req.body);
    if (dersler.length <= 0) {
        res.redirect("../?action=fail")
    }
    else {
        for (let x = 0; x < Number(dersler.length); x++) {
            if (dersler[x][0].includes("ders")) {
                dersAdlari.push(dersler[x][1])
            }
            if (dersler[x][0].includes("kredi")) {
                krediler.push(dersler[x][1])
                var krediToplam = krediToplam + Number(dersler[x][1]);
            }
            if (dersler[x][0].includes("harf")) {
                harfler.push(dersler[x][1])
            }
            if (dersler[x][0].includes("ad")) {
                if (dersler[x][1].length <= 0) {
                    ad.push(undefined)
                }
                else {
                    ad.push(dersler[x][1]);
                }
            }
        }
        for (let i = 0; i < dersAdlari.length; i++) {
            var toplam = (toplam + (Number(krediler[i]) * Number(harfler[i])) / krediToplam);
        }
        var ortalama = toplam.toFixed(2)
        for (let i = 0; i < dersAdlari.length; i++) {
            obje.push({
                dersadi: dersAdlari[i],
                dersharf: harfler[i],
                derskredi: krediler[i]
            })
        }
        var yeniHesaplama = new Not({
            dersler: obje,
            url: randomId,
            ortalama: ortalama,
            ad: ad[0]
        })
        yeniHesaplama.save()
            .then(() => {
                var bilcookie = randomId
                if (req.cookies.hesap != undefined) {
                    var bilcookie = req.cookies.hesap + ":" + bilcookie;
                }
                else {
                    var bilcookie = bilcookie;
                }
                return res.cookie("hesap", bilcookie)
            })
            .then(() => {
                res.redirect(`hesapla/${randomId}`)
            })
            .catch(err => {
                next(err);
            })


    }
}
exports.sonuclariGoster = (req, res, next) => {


    const url = req.params.link;
    Not.findOne({ url: url })
        .then(result => {
            const dersler = result.dersler;
            const ortalama = result.ortalama;
            res.render("main/show", {
                dersler: dersler,
                ortalama: ortalama,
                derssayisi: result.dersler.length,
                tarih: result.date.tarih,
                ad: result.ad,
                action: req.query.action
            })
        })
        .catch(err => {
            next(err);
        })
}


exports.cacheSifirla = (req,res,next)=>{
    res.clearCookie("hesap")
        res.redirect("/")

}
