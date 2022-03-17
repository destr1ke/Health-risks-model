// PM10 block
var kmp10;
var pm10=Number(msg.PM10);
    if (pm10<=20)  kpm10 = 0
    else if (pm10>20 & pm10<=50)   kpm10 = (pm10-20)/(50-20)
    else if (pm10>50 & pm10<=100)  kpm10 = 1+(pm10-50)/(100-50)
    else if (pm10>100 & pm10<=150) kpm10 = 2+(pm10-100)/(150-100)
    else if (pm10>150 & pm10<=200) kpm10 = 3+(pm10-150)/(200-150)
    else if (pm10>200 & pm10<=300) kpm10 = 4+(pm10-200)/(300-200)
    else  if (pm10>300)  kpm10 = 5;
metadata.kpm10 = kpm10.toFixed(3);

// PM2.5 block
var pm25=Number(msg.PM2_5);
    if (pm25<=25)  kpm25 = 0
    else if (pm25>25 & pm25<=40) kpm25 = 1+(pm25-25)/(40-25)
    else if (pm25>40 & pm25<=60) kpm25 = 2+(pm25-40)/(60-40)
    else if (pm25>60 & pm25<=80) kpm25 = 3+(pm25-60)/(80-60)
    else if (pm25>80 & pm25<=100) kpm25 = 4+(pm25-80)/(100-80)
    else if (pm25>100)            kpm25 = 5;
metadata.kpm25 = kpm25.toFixed(3);

// CO2 block
var co2=Number(msg.CO2);
    if (co2<=700)                  kco2 = 0
    else if (co2>700 & co2<=1000)  kco2 = (co2-700)/(1000-700)
    else if (co2>1000 & co2<=2000) kco2 = 1+(co2-1000)/(2000-1000)
    else if (co2>2000 & co2<=3000) kco2 = 2+(co2-2000)/(3000-2000)
    else if (co2>3000 & co2<=4000) kco2 = 3+(co2-3000)/(4000-3000)
    else if (co2>4000 & co2<=5000) kco2 = 4+(co2-4000)/(5000-4000)
    else if (co2>5000)             kco2 = 5

metadata.kco2 = kco2.toFixed(3);

// Noise block
var knoise; 
var noise=Number(msg.Noise);
    if (noise<=40)  knoise = 0
    else if (noise>40 & noise<=50) knoise = (noise-40)/(50-40)
    else if (noise>50 & noise<=55) knoise = 1+(noise-50)/(55-50)
    else if (noise>55 & noise<=60) knoise = 2+(noise-55)/(60-55)
    else if (noise>60 & noise<=75) knoise = 3+(noise-60)/(75-60)
    else if (noise>75 & noise<=85) knoise = 4+(noise-75)/(85-75)
    else if (noise>85)            knoise = 5;
metadata.knoise = knoise.toFixed(3);

// Light block
var klight;
var light=Number(msg.Light);
    if (light>=500)  klight = 0
    else if (light>300 & light<500)   klight = 1+(light-300)/(500-300)
    else if (light<300)  klight = 2;
metadata.klight = klight.toFixed(3);

// Formaldehyde and sensorial block
var kfde;
var fde=(msg.formaldehyde);
    if (fde<=3)                   kfde = 0
    else if (fde>7 & fde<=100)    kfde = (fde-7)/(100-7)
    else if (fde>100 & fde<=300)  kfde = 1+(fde-100)/(300-100)
    else if (fde>300 & fde<=1000) kfde = 2+(fde-300)/(1000-300)

metadata.ss = kfde.toFixed(2);

// Mental block
var kpm10 = metadata.kpm10;
var kpm25 = metadata.kpm25;
var kco2 = metadata.kco2;
var knoise = metadata.knoise;
var klight = metadata.klight;
var arr = [kpm10,kpm25,kco2,knoise,klight];
var NOF = [1,1.15,1.20,1.30,1.35];
var n=0;
var sum=0;
for (var i=0;i<arr.length;i++){
    if (arr[i] > 0) {
        n++;
        sum=sum+parseFloat(arr[i]);
    }
}

var AHR = Number(((sum/n)*NOF[n-1]).toFixed(2));
if (AHR == "NaN") AHR = 0;

var ss = Number(metadata.ss).toFixed(2);

    var sum = Number(kpm10)+Number(kpm25)+Number(kco2)+Number(knoise)+Number(klight);
    var pm10_p_me = Math.round((kpm10 / sum)*100);
    var pm25_p_me = Math.round((kpm25 / sum)*100);
    var co2_p_me = Math.round((kco2 / sum)*100);
    var n_p_me = Math.round((knoise / sum)*100);
    var l_p_me = Math.round((klight / sum)*100);
    msg = {
        "mh":AHR,
        "ss":ss || 0,
        "pm10_p_me":pm10_p_me || 0,
        "pm25_p_me":pm25_p_me || 0,
        "co2_p_me":co2_p_me || 0,
        "n_p_me":n_p_me || 0,
        "l_p_me":l_p_me || 0
    }
return msg
