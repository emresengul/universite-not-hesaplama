const moment = require("moment")


function tarih() {
    const momentTarih = moment().locale("tr")
    const gunMoment = momentTarih.format("LLLL")
    var yil = momentTarih.year();
    var ay = momentTarih.month()+1;
    var gun = momentTarih.date();
    var saat = momentTarih.hour();
    var dakika = momentTarih.minute();
    var saniye = momentTarih.second();

    // console.log("Yıl =",yil," Ay= ",ay," Gün= ",gun," Saat=",saat," Dakika=",dakika," Saniye=",saniye)


    return {
        tarih: gunMoment,
        yil: yil,
        ay:ay,
        gun:gun,
        saat: saat,
        dakika:dakika,
        saniye:saniye
    }
}
module.exports = tarih