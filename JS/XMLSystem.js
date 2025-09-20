(function () {
    const title = document.getElementById('FrontTitle');
    const weather = document.getElementById('Weather')
    const weatherTitle = document.getElementById('WeatherText');
    const WeatherComment = document.getElementById('WeatherComment');
    const WindsTitle = document.getElementById('WindsTitle');
    const windsComment = document.getElementById('windsComment');
    const TempText= document.getElementById('TempTitle');
    const TempSebu = document.getElementById('Sebu');
    const WeatherCommnet = document.getElementById('WeatherComment');
    const TempMax = document.getElementById('TempMax');
    const TempMin = document.getElementById('TempMin');
    const precipTitle = document.getElementById('precipTitle');
    const precipMorning = document.getElementById('precipMorning');
    const precipNoon = document.getElementById('precipNoon')
    const precipNight = document.getElementById('precipNight');
    const AverageTitle = document.getElementById('AverageTitle');
    const AverageTitleArea = document.getElementById('AverageTitleArea')
    const TempAverageTitleElements = document.getElementById('TempAverageTitleText');
    const TempAverageText = document.getElementById('TempAverageText')
    const PrecipAverageTitleElements = document.getElementById('PrecipAverageTitleText');
    const PrecipAverageText = document.getElementById('PrecipAverageText');

    //const date = new Date();

    main();
    function main(){
        WeatherAPI();
    }
    
    /**
     * https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json
     * 愛知県 
     * https://www.jma.go.jp/bosai/forecast/data/forecast/xxxxxx.json
     * 
     * 
     */


    
    function WeatherAPI () {
        const JMAAPI = {
            URL: "https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json",
        }
        //const OpenWeatherAPIUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + OpenWeastherAPIObj.Area + 
        //                          "&units=" + OpenWeastherAPIObj.units + "&appid=" + OpenWeastherAPIObj.Key + "&lang=" + OpenWeastherAPIObj.lang
        //console.log(OpenWeastherAPIObj.Area);
    
        fetch(JMAAPI.URL).then( function (response) {
            return response.json();
        }).then(function(Data) {
            //コメントや都市名を取得
            const CityName = Data[1].timeSeries[1].areas[0].area.name;
            const WeatherComment1 = String(Data[0].timeSeries[0].areas[0].weathers[0]).replace(/　/g,"");
            const WeatherComment2 = String(Data[0].timeSeries[0].areas[0].weathers[1]).replace(/　/g,"");
            const WeatherComment3 = String(Data[0].timeSeries[0].areas[0].weathers[2]).replace(/　/g,"");
            const windsComment1 = String(Data[0].timeSeries[0].areas[0].winds[0]).replace(/　/g,"");
            const windsComment2 = String(Data[0].timeSeries[0].areas[0].winds[1]).replace(/　/g,"");
            const windsComment3 = String(Data[0].timeSeries[0].areas[0].winds[2]).replace(/　/g,"");
            console.log(windsComment1)
            //平均気温取得
            const AverageTemp_Max = Data[1].tempAverage.areas[0].max
            const AverageTemp_Min = Data[1].tempAverage.areas[0].min
            //降水確率取得
            const precip_Morning = Data[0].timeSeries[1].areas[0].pops[0] /* 午前 */
            const precip_Noon = Data[0].timeSeries[1].areas[0].pops[1] /* 昼　*/
            const precip_Night = Data[0].timeSeries[1].areas[0].pops[2] /* 夜 */
            console.log(precipMorning)
            //ゲットしたデータを配列に格納
            const GetData = [
                CityName,WeatherComment1,WeatherComment2,WeatherComment3,windsComment1,windsComment2,windsComment3,
                AverageTemp_Max,AverageTemp_Min,precip_Morning,precip_Noon,precip_Night
            ]
            DataJoin(GetData)
            }
        );
    }

    function AverageCalc(MaxTemp,MinTemp,PrecipMorning,PrecipNoon,PrecipNight){
        const Temps = [MaxTemp,MinTemp];
        const Precip = [PrecipMorning,PrecipNoon,PrecipNight]

        const TempAverage = Math.floor((Number(Temps[0]) +  Number(Temps[1])) / 2)
        const PrecipAverage = Math.floor((Number(Precip[0]) + Number(Precip[1]) + Number(Precip[2])) / 3) 

        console.log(MaxTemp,MinTemp,PrecipMorning,PrecipNoon,PrecipNight)
        console.log(TempAverage,PrecipAverage)

        
        const Averages = [TempAverage,PrecipAverage]
        return Averages;
    }


    function DataJoin (WeatherData) {
        const Average = AverageCalc(WeatherData[7],WeatherData[8],WeatherData[9],WeatherData[10],WeatherData[11]);
        title.innerHTML = "天気情報";
        weatherTitle.innerHTML = WeatherData[0] + "市の詳細情報"
        weather.innerHTML = "🌞天気🌞"
        WeatherCommnet.innerHTML = "<marquee class='SlideStyle'>" +  WeatherData[1] + "</marquee>"
        WindsTitle.innerHTML ="🌪風速情報🌪"
        windsComment.innerHTML = "<marquee class='SlideStyle'>" + WeatherData[4] + "</marquee>";
        TempText.innerHTML = "気温";
        TempSebu.innerHTML = "愛知県西部";
        TempMax.innerHTML = "🥵" +  WeatherData[7] + "℃";
        TempMin.innerHTML = "🥶" + WeatherData[8] + "℃";
        precipTitle.innerHTML = "☔降水確率☔";
        precipMorning.innerHTML = "朝(6~12):" + WeatherData[9] + "%";
        precipNoon.innerHTML = "昼(12~18):" + WeatherData[10] + "%";
        precipNight.innerHTML = "夜(18~24):" + WeatherData[11]+ "%";
        AverageTitleArea.innerHTML = "平均値";
        TempAverageTitleElements.innerHTML = "平均気温:";
        TempAverageText.innerHTML = Average[0] + "℃";
        PrecipAverageTitleElements.innerHTML = "平均降水確率:";
        PrecipAverageText.innerHTML = Average[1] + "%";
    }
}());