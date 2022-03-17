// CV indoor
// PM10 block
var kpm10;
var pm10=Number(msg.PM10);
    if (pm10<=20)  kpm10 = 0
    else if (pm10>20 & pm10<=50)  kpm10 =(pm10-20)/(50-20)
    else if (pm10>50 & pm10<=80)  kpm10 = 1+(pm10-50)/(80-50)
    else if (pm10>80 & pm10<=100) kpm10 = 2+(pm10-80)/(100-80)
    else if (pm10>100 & pm10<=120) kpm10 = 3+(pm10-100)/(120-100)
    else if (pm10>120 & pm10<=150) kpm10 = 4+(pm10-120)/(150-120)
    else  if (pm10>150)  kpm10 = 5;
metadata.kpm10 = kpm10.toFixed(3);

// PM25 block
var pm25=Number(msg.PM2_5);
    if (pm25<=25)  kpm25 = 0
    else if (pm25>25 & pm25<=40) kpm25 = 1+(pm25-25)/(40-25)
    else if (pm25>40 & pm25<=60) kpm25 = 2+(pm25-40)/(60-40)
    else if (pm25>60 & pm25<=80) kpm25 = 3+(pm25-60)/(80-60)
    else if (pm25>80 & pm25<=100) kpm25 = 4+(pm25-80)/(100-80)
    else if (pm25>100)            kpm25 = 5;
metadata.kpm25 = kpm25.toFixed(3);

// Ozone block
var koz;
var oz=Number(msg.Ozone);
    if (oz<=0.05)                 koz = 0
    else if (oz>0.05 & oz<=0.1)   koz = (oz-0.05)/(0.1-0.05)
    else if (oz>0.1 & oz<=0.13)   koz = 1+(oz-0.1)/(0.13-0.1)
    else if (oz>0.13 & oz<=0.16)  koz = 2+(oz-0.13)/(0.16-0.13)
    else if (oz>0.16 & oz<=0.19)  koz = 3+(oz-0.16)/(0.19-0.16)
    else if (oz>0.19 & oz<=0.22)  koz = 4+(oz-0.19)/(0.22-0.19)
    else if (oz>0.22)             koz = 5
metadata.koz = koz.toFixed(3);

//CO2 block
var co2=Number(msg.CO2);
    if (co2<=700)                  kco2 = 0
    else if (co2>700 & co2<=1000)  kco2 = (co2-700)/(1000-700)
    else if (co2>1000 & co2<=2000) kco2 = 1+(co2-1000)/(2000-1000)
    else if (co2>2000 & co2<=3000) kco2 = 2+(co2-2000)/(3000-2000)
    else if (co2>3000 & co2<=4000) kco2 = 3+(co2-3000)/(4000-3000)
    else if (co2>4000 & co2<=5000) kco2 = 4+(co2-4000)/(5000-4000)
    else if (co2>5000)             kco2 = 5
metadata.kco2 = kco2.toFixed(3);

//Noise block
var noise=Number(msg.Noise);
var knoise;
    if (noise<=40)  knoise = 0
    else if (noise>40 & noise<=50) knoise = (noise-40)/(50-40)
    else if (noise>50 & noise<=55) knoise = 1+(noise-50)/(55-50)
    else if (noise>55 & noise<=60) knoise = 2+(noise-55)/(60-55)
    else if (noise>60 & noise<=75) knoise = 3+(noise-60)/(75-60)
    else if (noise>75 & noise<=85) knoise = 4+(noise-75)/(85-75)
    else if (noise>85)            knoise = 5;
metadata.knoise = knoise.toFixed(3);

//CV block
var kpm10 = metadata.kpm10;
var kpm25 = metadata.kpm25;
var koz = metadata.koz;
var kco2 = metadata.kco2;
var knoise = metadata.knoise;
var arr = [kpm10,kpm25,koz,kco2,knoise];
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
if (AHR  == 'NaN') AHR = 0;
    var sum = Number(kpm10)+Number(kpm25)+Number(koz)+Number(kco2)+Number(knoise);
    var pm10_p_cv = Math.round((kpm10 / sum)*100);
    var pm25_p_cv = Math.round((kpm25 / sum)*100);
    var oz_p_cv = Math.round((koz / sum)*100);
    var co2_p_cv = Math.round((kco2 / sum)*100);
    var n_p_cv = Math.round((knoise/ sum)*100);
    msg = {
        "cvs":AHR,
        "pm10_p_cv":pm10_p_cv || 0,
        "pm25_p_cv":pm25_p_cv || 0,
        "oz_p_cv":oz_p_cv || 0,
        "co2_p_cv":co2_p_cv || 0,
        "n_p_cv":n_p_cv || 0
    }
retun msg;




