// PM10 block
var kpm10;
var pm10=Number(msg.PM10);
    if (pm10<=20)  kpm10 = 0
    else if (pm10>20 & pm10<=50)   kpm10 = (pm10-20)/(50-20)
    else if (pm10>50 & pm10<=80)   kpm10 = 1+(pm10-50)/(80-50)
    else if (pm10>80 & pm10<=100)   kpm10 = 2+(pm10-80)/(100-80)
    else if (pm10>100 & pm10<=120)   kpm10 = 3+(pm10-100)/(120-100)
    else if (pm10>120)  kpm10 = 4;
metadata.kpm10 = kpm10.toFixed(3);

// PM2.5 block
var pm25=Number(msg.PM2_5);
    if (pm25<=25)  kpm25 = 0
    else if (pm25>25 & pm25<=40) kpm25 = 1+(pm25-25)/(40-25)
    else if (pm25>40 & pm25<=60) kpm25 = 2+(pm25-40)/(60-40)
    else if (pm25>60 & pm25<=80) kpm25 = 3+(pm25-60)/(80-60)
    else if (pm25>80)            kpm25 = 4;
metadata.kpm25 = kpm25.toFixed(3);

// Ozone block
var koz;
var oz=Number(msg.Ozone);
    if (oz<=0.1)                 koz = 0
    else if (oz>0.1 & oz<=0.13)   koz = 1+(oz-0.1)/(0.13-0.1)
    else if (oz>0.13 & oz<=0.16)  koz = 2+(oz-0.13)/(0.16-0.13)
    else if (oz>0.16 & oz<=0.19)  koz = 3+(oz-0.16)/(0.19-0.16)
    else if (oz>0.19)             koz = 4
metadata.koz = koz.toFixed(3);

// Formaldehyde block
var kfde;
var fde=(msg.formaldehyde);
    if (fde<=3)                  kfde = 0
    else if (fde>3 & fde<=7)     kfde = (fde-3)/(7-3)
    else if (fde>7 & fde<=100)   kfde = 1+(fde-7)/(100-7)
    else if (fde>100 & fde<=300) kfde = 2+(fde-100)/(300-100)
    else if (fde>300 & fde<=500) kfde = 3+(fde-300)/(500-300)
    else if (fde>500)            kfde = 4
metadata.kfde = kfde.toFixed(3);

// Humidity block
var h=Number(msg.Humidity);
    if (h>=30 & h<=60)     kh = 0
    else if (h>20 & h<30)  kh = 1+(h-20)/(30-20)
    else if (h>15 & h<=20) kh = 2+(h-15)/(20-15)
    else if (h<15)         kh = 3
    else if (h>70)     kh = 4;
metadata.kh = kh.toFixed(3);

// Allergy block 
var kpm10 = metadata.kpm10;
var kpm25 = metadata.kpm25;
var koz = metadata.koz;
var kfde = metadata.kfde;
var kh = metadata.kh;
var arr = [kpm10,kpm25,koz,kfde,kh];
var NOF = [1,1.15,1.20,1.30,1.35];
var n=0;
var sum=0;
for (var i=0;i<arr.length;i++){
    if (arr[i] > 0) {
        n++;
        sum=sum+parseFloat(arr[i]);
    }
}

var AHR = ((sum/n)*NOF[n-1]).toFixed(2);
if (AHR == "NaN") AHR  = 0;


    var sum = Number(kpm10)+Number(kpm25)+Number(koz)+Number(kfde)+Number(kh);
    var pm10_p_al = Math.round((kpm10 / sum)*100);
    var pm25_p_al = Math.round((kpm25 / sum)*100);
    var oz_p_al = Math.round((koz / sum)*100);
    var fde_p_al = Math.round((kfde / sum)*100);
    var h_p_al = Math.round((kh/ sum)*100);
    msg = {
        "al":AHR,
        "pm10_p_al":pm10_p_al || 0,
        "pm25_p_al":pm25_p_al || 0,
        "oz_p_al":oz_p_al || 0,
        "fde_p_al":fde_p_al || 0,
        "h_p_al":h_p_al || 0
    }

return msg
