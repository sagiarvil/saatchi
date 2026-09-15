
// ==========================================================
// SAATCHI — MASTER ÜRÜN VE KOLEKSİYON VERİTABANI
// ==========================================================

const allCatalog = [
  {
    "id": "1",
    "brand": "Rolex",
    "modelName": "Rolex Submariner Date Siyah Kadran",
    "title": "Rolex Submariner Date Siyah Kadran",
    "price": "₺1.325.490",
    "calculatedPrice": 1325490,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Submariner+Date+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "2",
    "brand": "Rolex",
    "modelName": "Rolex Daytona Mavi Kadran",
    "title": "Rolex Daytona Mavi Kadran",
    "price": "₺853.910",
    "calculatedPrice": 853910,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Daytona+Blue+Dial+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "3",
    "brand": "Rolex",
    "modelName": "Rolex GMT-Master II Beyaz Kadran",
    "title": "Rolex GMT-Master II Beyaz Kadran",
    "price": "₺2.619.360",
    "calculatedPrice": 2619360,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Gmt+Master+Ii+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "4",
    "brand": "Rolex",
    "modelName": "Rolex Datejust 41 Yeşil Kadran",
    "title": "Rolex Datejust 41 Yeşil Kadran",
    "price": "₺3.725.635",
    "calculatedPrice": 3725635,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Datejust+41+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "5",
    "brand": "Rolex",
    "modelName": "Rolex Oyster Perpetual Gümüş Kadran",
    "title": "Rolex Oyster Perpetual Gümüş Kadran",
    "price": "₺731.510",
    "calculatedPrice": 731510,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+With+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "6",
    "brand": "Rolex",
    "modelName": "Rolex Sky-Dweller Altın Detaylı",
    "title": "Rolex Sky-Dweller Altın Detaylı",
    "price": "₺3.121.115",
    "calculatedPrice": 3121115,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "7",
    "brand": "Rolex",
    "modelName": "Rolex Sea-Dweller Rose Gold",
    "title": "Rolex Sea-Dweller Rose Gold",
    "price": "₺1.778.965",
    "calculatedPrice": 1778965,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Submariner+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "8",
    "brand": "Rolex",
    "modelName": "Rolex Yacht-Master Çelik",
    "title": "Rolex Yacht-Master Çelik",
    "price": "₺1.515.295",
    "calculatedPrice": 1515295,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "9",
    "brand": "Rolex",
    "modelName": "Rolex Explorer Titanyum",
    "title": "Rolex Explorer Titanyum",
    "price": "₺2.905.045",
    "calculatedPrice": 2905045,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "10",
    "brand": "Rolex",
    "modelName": "Rolex Milgauss Siyah Kadran",
    "title": "Rolex Milgauss Siyah Kadran",
    "price": "₺816.935",
    "calculatedPrice": 816935,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Milgauss+Black+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "11",
    "brand": "Rolex",
    "modelName": "Rolex Submariner Date Mavi Kadran",
    "title": "Rolex Submariner Date Mavi Kadran",
    "price": "₺2.208.895",
    "calculatedPrice": 2208895,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Submariner+Watch+Blue+Face&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "12",
    "brand": "Rolex",
    "modelName": "Rolex Daytona Beyaz Kadran",
    "title": "Rolex Daytona Beyaz Kadran",
    "price": "₺1.459.620",
    "calculatedPrice": 1459620,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Daytona+White+Face&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "13",
    "brand": "Rolex",
    "modelName": "Rolex GMT-Master II Yeşil Kadran",
    "title": "Rolex GMT-Master II Yeşil Kadran",
    "price": "₺1.867.365",
    "calculatedPrice": 1867365,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Gmt+Master+Ii+Green+And+Black+Bezel&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "14",
    "brand": "Rolex",
    "modelName": "Rolex Datejust 41 Gümüş Kadran",
    "title": "Rolex Datejust 41 Gümüş Kadran",
    "price": "₺708.390",
    "calculatedPrice": 708390,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Datejust+41+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "15",
    "brand": "Rolex",
    "modelName": "Rolex Oyster Perpetual Altın Detaylı",
    "title": "Rolex Oyster Perpetual Altın Detaylı",
    "price": "₺622.285",
    "calculatedPrice": 622285,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+With+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "16",
    "brand": "Rolex",
    "modelName": "Rolex Sky-Dweller Rose Gold",
    "title": "Rolex Sky-Dweller Rose Gold",
    "price": "₺3.261.025",
    "calculatedPrice": 3261025,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Sky+Dweller+Rose+Gold+Jubilee&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "17",
    "brand": "Rolex",
    "modelName": "Rolex Sea-Dweller Çelik",
    "title": "Rolex Sea-Dweller Çelik",
    "price": "₺3.125.195",
    "calculatedPrice": 3125195,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+With+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "18",
    "brand": "Rolex",
    "modelName": "Rolex Yacht-Master Titanyum",
    "title": "Rolex Yacht-Master Titanyum",
    "price": "₺1.703.740",
    "calculatedPrice": 1703740,
    "image": "https://tse1.mm.bing.net/th?q=Titanium+Yachtmaster&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "19",
    "brand": "Rolex",
    "modelName": "Rolex Explorer Siyah Kadran",
    "title": "Rolex Explorer Siyah Kadran",
    "price": "₺2.309.705",
    "calculatedPrice": 2309705,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Explorer+Black+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "20",
    "brand": "Rolex",
    "modelName": "Rolex Milgauss Mavi Kadran",
    "title": "Rolex Milgauss Mavi Kadran",
    "price": "₺2.483.275",
    "calculatedPrice": 2483275,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Milgauss+Blue+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "21",
    "brand": "Rolex",
    "modelName": "Rolex Submariner Date Beyaz Kadran",
    "title": "Rolex Submariner Date Beyaz Kadran",
    "price": "₺3.265.615",
    "calculatedPrice": 3265615,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "22",
    "brand": "Rolex",
    "modelName": "Rolex Daytona Yeşil Kadran",
    "title": "Rolex Daytona Yeşil Kadran",
    "price": "₺1.335.095",
    "calculatedPrice": 1335095,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Daytona+Green+Dial+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "23",
    "brand": "Rolex",
    "modelName": "Rolex GMT-Master II Gümüş Kadran",
    "title": "Rolex GMT-Master II Gümüş Kadran",
    "price": "₺2.351.695",
    "calculatedPrice": 2351695,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Gmt+Master+Ii+White+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "24",
    "brand": "Rolex",
    "modelName": "Rolex Datejust 41 Altın Detaylı",
    "title": "Rolex Datejust 41 Altın Detaylı",
    "price": "₺831.640",
    "calculatedPrice": 831640,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Datejust+41Mm+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "25",
    "brand": "Rolex",
    "modelName": "Rolex Oyster Perpetual Rose Gold",
    "title": "Rolex Oyster Perpetual Rose Gold",
    "price": "₺3.710.930",
    "calculatedPrice": 3710930,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Oyster+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "26",
    "brand": "Rolex",
    "modelName": "Rolex Sky-Dweller Çelik",
    "title": "Rolex Sky-Dweller Çelik",
    "price": "₺2.329.085",
    "calculatedPrice": 2329085,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "27",
    "brand": "Rolex",
    "modelName": "Rolex Sea-Dweller Titanyum",
    "title": "Rolex Sea-Dweller Titanyum",
    "price": "₺2.823.445",
    "calculatedPrice": 2823445,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+With+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "28",
    "brand": "Rolex",
    "modelName": "Rolex Yacht-Master Siyah Kadran",
    "title": "Rolex Yacht-Master Siyah Kadran",
    "price": "₺1.668.465",
    "calculatedPrice": 1668465,
    "image": "https://tse1.mm.bing.net/th?q=Black+Rolex+Yachtmaster&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "29",
    "brand": "Rolex",
    "modelName": "Rolex Explorer Mavi Kadran",
    "title": "Rolex Explorer Mavi Kadran",
    "price": "₺812.855",
    "calculatedPrice": 812855,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Explorer+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "30",
    "brand": "Rolex",
    "modelName": "Rolex Milgauss Beyaz Kadran",
    "title": "Rolex Milgauss Beyaz Kadran",
    "price": "₺3.592.950",
    "calculatedPrice": 3592950,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Milgauss+White&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "31",
    "brand": "Rolex",
    "modelName": "Rolex Submariner Date Yeşil Kadran",
    "title": "Rolex Submariner Date Yeşil Kadran",
    "price": "₺2.750.090",
    "calculatedPrice": 2750090,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Submariner+Watch+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "32",
    "brand": "Rolex",
    "modelName": "Rolex Daytona Gümüş Kadran",
    "title": "Rolex Daytona Gümüş Kadran",
    "price": "₺1.492.005",
    "calculatedPrice": 1492005,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Daytona+Watch+Dial+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "33",
    "brand": "Rolex",
    "modelName": "Rolex GMT-Master II Altın Detaylı",
    "title": "Rolex GMT-Master II Altın Detaylı",
    "price": "₺1.954.150",
    "calculatedPrice": 1954150,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Gmt+Master+Ii+Yellow+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "34",
    "brand": "Rolex",
    "modelName": "Rolex Datejust 41 Rose Gold",
    "title": "Rolex Datejust 41 Rose Gold",
    "price": "₺1.512.915",
    "calculatedPrice": 1512915,
    "image": "https://tse1.mm.bing.net/th?q=Rose+Gold+Datejust+41&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "35",
    "brand": "Rolex",
    "modelName": "Rolex Oyster Perpetual Çelik",
    "title": "Rolex Oyster Perpetual Çelik",
    "price": "₺2.222.750",
    "calculatedPrice": 2222750,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+On+White+Backpr&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "36",
    "brand": "Rolex",
    "modelName": "Rolex Sky-Dweller Titanyum",
    "title": "Rolex Sky-Dweller Titanyum",
    "price": "₺1.845.180",
    "calculatedPrice": 1845180,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "37",
    "brand": "Rolex",
    "modelName": "Rolex Sea-Dweller Siyah Kadran",
    "title": "Rolex Sea-Dweller Siyah Kadran",
    "price": "₺529.805",
    "calculatedPrice": 529805,
    "image": "https://tse1.mm.bing.net/th?q=Black+Rolex+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "38",
    "brand": "Rolex",
    "modelName": "Rolex Yacht-Master Mavi Kadran",
    "title": "Rolex Yacht-Master Mavi Kadran",
    "price": "₺2.400.825",
    "calculatedPrice": 2400825,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Yacht+Master+Blue+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "39",
    "brand": "Rolex",
    "modelName": "Rolex Explorer Beyaz Kadran",
    "title": "Rolex Explorer Beyaz Kadran",
    "price": "₺493.340",
    "calculatedPrice": 493340,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Explorer+White+Face&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "40",
    "brand": "Rolex",
    "modelName": "Rolex Milgauss Yeşil Kadran",
    "title": "Rolex Milgauss Yeşil Kadran",
    "price": "₺2.721.955",
    "calculatedPrice": 2721955,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Milgauss+Green+Glass&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "41",
    "brand": "Rolex",
    "modelName": "Rolex Submariner Date Gümüş Kadran",
    "title": "Rolex Submariner Date Gümüş Kadran",
    "price": "₺3.814.715",
    "calculatedPrice": 3814715,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Submariner+Date+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "42",
    "brand": "Rolex",
    "modelName": "Rolex Daytona Altın Detaylı",
    "title": "Rolex Daytona Altın Detaylı",
    "price": "₺764.830",
    "calculatedPrice": 764830,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "43",
    "brand": "Rolex",
    "modelName": "Rolex GMT-Master II Rose Gold",
    "title": "Rolex GMT-Master II Rose Gold",
    "price": "₺1.911.820",
    "calculatedPrice": 1911820,
    "image": "https://tse1.mm.bing.net/th?q=Rose+Gold+Gmt+Master+2&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "44",
    "brand": "Rolex",
    "modelName": "Rolex Datejust 41 Çelik",
    "title": "Rolex Datejust 41 Çelik",
    "price": "₺2.951.455",
    "calculatedPrice": 2951455,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Datejust+41Mm+Stainless+Steel&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "45",
    "brand": "Rolex",
    "modelName": "Rolex Oyster Perpetual Titanyum",
    "title": "Rolex Oyster Perpetual Titanyum",
    "price": "₺1.764.855",
    "calculatedPrice": 1764855,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Watch+With+White+Background&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "46",
    "brand": "Rolex",
    "modelName": "Rolex Sky-Dweller Siyah Kadran",
    "title": "Rolex Sky-Dweller Siyah Kadran",
    "price": "₺2.256.155",
    "calculatedPrice": 2256155,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "47",
    "brand": "Rolex",
    "modelName": "Rolex Sea-Dweller Mavi Kadran",
    "title": "Rolex Sea-Dweller Mavi Kadran",
    "price": "₺1.955.000",
    "calculatedPrice": 1955000,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "48",
    "brand": "Rolex",
    "modelName": "Rolex Yacht-Master Beyaz Kadran",
    "title": "Rolex Yacht-Master Beyaz Kadran",
    "price": "₺1.637.185",
    "calculatedPrice": 1637185,
    "image": "https://tse1.mm.bing.net/th?q=White+Rolex+Yachtmaster&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "49",
    "brand": "Rolex",
    "modelName": "Rolex Explorer Yeşil Kadran",
    "title": "Rolex Explorer Yeşil Kadran",
    "price": "₺1.689.205",
    "calculatedPrice": 1689205,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Explorer+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "50",
    "brand": "Rolex",
    "modelName": "Rolex Milgauss Gümüş Kadran",
    "title": "Rolex Milgauss Gümüş Kadran",
    "price": "₺491.215",
    "calculatedPrice": 491215,
    "image": "https://tse1.mm.bing.net/th?q=Rolex+Milgauss+Cheapest&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "51",
    "brand": "Omega",
    "modelName": "Omega Speedmaster Professional Moonwatch Siyah Kadran",
    "title": "Omega Speedmaster Professional Moonwatch Siyah Kadran",
    "price": "₺3.055.665",
    "calculatedPrice": 3055665,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Moonwatch+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "52",
    "brand": "Omega",
    "modelName": "Omega Seamaster Diver 300M Mavi Kadran",
    "title": "Omega Seamaster Diver 300M Mavi Kadran",
    "price": "₺1.754.145",
    "calculatedPrice": 1754145,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+Diver+300M+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "53",
    "brand": "Omega",
    "modelName": "Omega Aqua Terra Beyaz Kadran",
    "title": "Omega Aqua Terra Beyaz Kadran",
    "price": "₺2.086.325",
    "calculatedPrice": 2086325,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Aqua+Terra+White&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "54",
    "brand": "Omega",
    "modelName": "Omega Planet Ocean Yeşil Kadran",
    "title": "Omega Planet Ocean Yeşil Kadran",
    "price": "₺3.273.265",
    "calculatedPrice": 3273265,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Planet+Ocean+45+5Mm+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "55",
    "brand": "Omega",
    "modelName": "Omega Constellation Gümüş Kadran",
    "title": "Omega Constellation Gümüş Kadran",
    "price": "₺1.539.095",
    "calculatedPrice": 1539095,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Constellation+Silver+Dial+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "56",
    "brand": "Omega",
    "modelName": "Omega De Ville Altın Detaylı",
    "title": "Omega De Ville Altın Detaylı",
    "price": "₺747.235",
    "calculatedPrice": 747235,
    "image": "https://tse1.mm.bing.net/th?q=Omega+De+Ville+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "57",
    "brand": "Omega",
    "modelName": "Omega Speedmaster '57 Rose Gold",
    "title": "Omega Speedmaster '57 Rose Gold",
    "price": "₺1.271.770",
    "calculatedPrice": 1271770,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Rose+Gold+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "58",
    "brand": "Omega",
    "modelName": "Omega Seamaster 300 Çelik",
    "title": "Omega Seamaster 300 Çelik",
    "price": "₺1.684.360",
    "calculatedPrice": 1684360,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300+M&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "59",
    "brand": "Omega",
    "modelName": "Omega Speedmaster Professional Moonwatch Titanyum",
    "title": "Omega Speedmaster Professional Moonwatch Titanyum",
    "price": "₺3.648.710",
    "calculatedPrice": 3648710,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "60",
    "brand": "Omega",
    "modelName": "Omega Seamaster Diver 300M Siyah Kadran",
    "title": "Omega Seamaster Diver 300M Siyah Kadran",
    "price": "₺3.319.080",
    "calculatedPrice": 3319080,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300M+Black+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "61",
    "brand": "Omega",
    "modelName": "Omega Aqua Terra Mavi Kadran",
    "title": "Omega Aqua Terra Mavi Kadran",
    "price": "₺797.725",
    "calculatedPrice": 797725,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Aqua+Terra+41Mm+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "62",
    "brand": "Omega",
    "modelName": "Omega Planet Ocean Beyaz Kadran",
    "title": "Omega Planet Ocean Beyaz Kadran",
    "price": "₺2.271.795",
    "calculatedPrice": 2271795,
    "image": "https://tse1.mm.bing.net/th?q=White+Omega+Planet+Ocean&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "63",
    "brand": "Omega",
    "modelName": "Omega Constellation Yeşil Kadran",
    "title": "Omega Constellation Yeşil Kadran",
    "price": "₺3.429.920",
    "calculatedPrice": 3429920,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Constellation+Green+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "64",
    "brand": "Omega",
    "modelName": "Omega De Ville Gümüş Kadran",
    "title": "Omega De Ville Gümüş Kadran",
    "price": "₺3.471.995",
    "calculatedPrice": 3471995,
    "image": "https://tse1.mm.bing.net/th?q=Omega+De+Ville+Tm2c34685288&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "65",
    "brand": "Omega",
    "modelName": "Omega Speedmaster '57 Altın Detaylı",
    "title": "Omega Speedmaster '57 Altın Detaylı",
    "price": "₺902.530",
    "calculatedPrice": 902530,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Canopus+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "66",
    "brand": "Omega",
    "modelName": "Omega Seamaster 300 Rose Gold",
    "title": "Omega Seamaster 300 Rose Gold",
    "price": "₺487.560",
    "calculatedPrice": 487560,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300M+Sedna+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "67",
    "brand": "Omega",
    "modelName": "Omega Speedmaster Professional Moonwatch Çelik",
    "title": "Omega Speedmaster Professional Moonwatch Çelik",
    "price": "₺534.140",
    "calculatedPrice": 534140,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Professional+Moonwatch+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "68",
    "brand": "Omega",
    "modelName": "Omega Seamaster Diver 300M Titanyum",
    "title": "Omega Seamaster Diver 300M Titanyum",
    "price": "₺2.421.820",
    "calculatedPrice": 2421820,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "69",
    "brand": "Omega",
    "modelName": "Omega Aqua Terra Siyah Kadran",
    "title": "Omega Aqua Terra Siyah Kadran",
    "price": "₺2.878.440",
    "calculatedPrice": 2878440,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Aqua+Terra+Black+Lacquer+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "70",
    "brand": "Omega",
    "modelName": "Omega Planet Ocean Mavi Kadran",
    "title": "Omega Planet Ocean Mavi Kadran",
    "price": "₺2.011.015",
    "calculatedPrice": 2011015,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+Planet+Ocean+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "71",
    "brand": "Omega",
    "modelName": "Omega Constellation Beyaz Kadran",
    "title": "Omega Constellation Beyaz Kadran",
    "price": "₺688.245",
    "calculatedPrice": 688245,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Constellation+Silver+Dial+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "72",
    "brand": "Omega",
    "modelName": "Omega De Ville Yeşil Kadran",
    "title": "Omega De Ville Yeşil Kadran",
    "price": "₺2.570.740",
    "calculatedPrice": 2570740,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Green+Face+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "73",
    "brand": "Omega",
    "modelName": "Omega Speedmaster '57 Gümüş Kadran",
    "title": "Omega Speedmaster '57 Gümüş Kadran",
    "price": "₺575.620",
    "calculatedPrice": 575620,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "74",
    "brand": "Omega",
    "modelName": "Omega Seamaster 300 Altın Detaylı",
    "title": "Omega Seamaster 300 Altın Detaylı",
    "price": "₺2.332.825",
    "calculatedPrice": 2332825,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300M+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "75",
    "brand": "Omega",
    "modelName": "Omega Speedmaster Professional Moonwatch Rose Gold",
    "title": "Omega Speedmaster Professional Moonwatch Rose Gold",
    "price": "₺3.191.665",
    "calculatedPrice": 3191665,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Moonwatch+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "76",
    "brand": "Omega",
    "modelName": "Omega Seamaster Diver 300M Çelik",
    "title": "Omega Seamaster Diver 300M Çelik",
    "price": "₺3.777.400",
    "calculatedPrice": 3777400,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "77",
    "brand": "Omega",
    "modelName": "Omega Aqua Terra Titanyum",
    "title": "Omega Aqua Terra Titanyum",
    "price": "₺1.127.185",
    "calculatedPrice": 1127185,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+Aqua+Terra+150M+Titanium&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "78",
    "brand": "Omega",
    "modelName": "Omega Planet Ocean Siyah Kadran",
    "title": "Omega Planet Ocean Siyah Kadran",
    "price": "₺818.040",
    "calculatedPrice": 818040,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Planet+Ocean+45+5Mm+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "79",
    "brand": "Omega",
    "modelName": "Omega Constellation Mavi Kadran",
    "title": "Omega Constellation Mavi Kadran",
    "price": "₺948.175",
    "calculatedPrice": 948175,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Constellation+Blue+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "80",
    "brand": "Omega",
    "modelName": "Omega De Ville Beyaz Kadran",
    "title": "Omega De Ville Beyaz Kadran",
    "price": "₺1.866.855",
    "calculatedPrice": 1866855,
    "image": "https://tse1.mm.bing.net/th?q=Omega+De+Ville+Tm2c34685288&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "81",
    "brand": "Omega",
    "modelName": "Omega Speedmaster '57 Yeşil Kadran",
    "title": "Omega Speedmaster '57 Yeşil Kadran",
    "price": "₺3.724.785",
    "calculatedPrice": 3724785,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Green+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "82",
    "brand": "Omega",
    "modelName": "Omega Seamaster 300 Gümüş Kadran",
    "title": "Omega Seamaster 300 Gümüş Kadran",
    "price": "₺1.272.535",
    "calculatedPrice": 1272535,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300M+No+Date&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "83",
    "brand": "Omega",
    "modelName": "Omega Speedmaster Professional Moonwatch Altın Detaylı",
    "title": "Omega Speedmaster Professional Moonwatch Altın Detaylı",
    "price": "₺2.050.710",
    "calculatedPrice": 2050710,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Canopus+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "84",
    "brand": "Omega",
    "modelName": "Omega Seamaster Diver 300M Rose Gold",
    "title": "Omega Seamaster Diver 300M Rose Gold",
    "price": "₺2.761.990",
    "calculatedPrice": 2761990,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "85",
    "brand": "Omega",
    "modelName": "Omega Aqua Terra Çelik",
    "title": "Omega Aqua Terra Çelik",
    "price": "₺2.555.440",
    "calculatedPrice": 2555440,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Aqua+Terra+150M&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "86",
    "brand": "Omega",
    "modelName": "Omega Planet Ocean Titanyum",
    "title": "Omega Planet Ocean Titanyum",
    "price": "₺2.672.910",
    "calculatedPrice": 2672910,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+Planet+Ocean+Titanium&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "87",
    "brand": "Omega",
    "modelName": "Omega Constellation Siyah Kadran",
    "title": "Omega Constellation Siyah Kadran",
    "price": "₺2.468.060",
    "calculatedPrice": 2468060,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Constellation+Black+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "88",
    "brand": "Omega",
    "modelName": "Omega De Ville Mavi Kadran",
    "title": "Omega De Ville Mavi Kadran",
    "price": "₺2.215.950",
    "calculatedPrice": 2215950,
    "image": "https://tse1.mm.bing.net/th?q=Omega+De+Ville+Blue+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "89",
    "brand": "Omega",
    "modelName": "Omega Speedmaster '57 Beyaz Kadran",
    "title": "Omega Speedmaster '57 Beyaz Kadran",
    "price": "₺1.419.415",
    "calculatedPrice": 1419415,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "90",
    "brand": "Omega",
    "modelName": "Omega Seamaster 300 Yeşil Kadran",
    "title": "Omega Seamaster 300 Yeşil Kadran",
    "price": "₺1.677.390",
    "calculatedPrice": 1677390,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300M+Green+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "91",
    "brand": "Omega",
    "modelName": "Omega Speedmaster Professional Moonwatch Gümüş Kadran",
    "title": "Omega Speedmaster Professional Moonwatch Gümüş Kadran",
    "price": "₺800.445",
    "calculatedPrice": 800445,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "92",
    "brand": "Omega",
    "modelName": "Omega Seamaster Diver 300M Altın Detaylı",
    "title": "Omega Seamaster Diver 300M Altın Detaylı",
    "price": "₺3.766.180",
    "calculatedPrice": 3766180,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "93",
    "brand": "Omega",
    "modelName": "Omega Aqua Terra Rose Gold",
    "title": "Omega Aqua Terra Rose Gold",
    "price": "₺2.567.000",
    "calculatedPrice": 2567000,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Aqua+Terra+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "94",
    "brand": "Omega",
    "modelName": "Omega Planet Ocean Çelik",
    "title": "Omega Planet Ocean Çelik",
    "price": "₺1.680.620",
    "calculatedPrice": 1680620,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Planet+Ocean+Quartz&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "95",
    "brand": "Omega",
    "modelName": "Omega Constellation Titanyum",
    "title": "Omega Constellation Titanyum",
    "price": "₺3.810.635",
    "calculatedPrice": 3810635,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "96",
    "brand": "Omega",
    "modelName": "Omega De Ville Siyah Kadran",
    "title": "Omega De Ville Siyah Kadran",
    "price": "₺1.400.460",
    "calculatedPrice": 1400460,
    "image": "https://tse1.mm.bing.net/th?q=Omega+De+Ville+Tm2c34685266&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "97",
    "brand": "Omega",
    "modelName": "Omega Speedmaster '57 Mavi Kadran",
    "title": "Omega Speedmaster '57 Mavi Kadran",
    "price": "₺679.915",
    "calculatedPrice": 679915,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+57+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "98",
    "brand": "Omega",
    "modelName": "Omega Seamaster 300 Beyaz Kadran",
    "title": "Omega Seamaster 300 Beyaz Kadran",
    "price": "₺2.001.665",
    "calculatedPrice": 2001665,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+300+White&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "99",
    "brand": "Omega",
    "modelName": "Omega Speedmaster Professional Moonwatch Yeşil Kadran",
    "title": "Omega Speedmaster Professional Moonwatch Yeşil Kadran",
    "price": "₺3.707.275",
    "calculatedPrice": 3707275,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Speedmaster+Green+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "100",
    "brand": "Omega",
    "modelName": "Omega Seamaster Diver 300M Gümüş Kadran",
    "title": "Omega Seamaster Diver 300M Gümüş Kadran",
    "price": "₺2.670.955",
    "calculatedPrice": 2670955,
    "image": "https://tse1.mm.bing.net/th?q=Omega+Seamaster+Diver+300M+Co+Axial+Master+Chronometer&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "101",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Siyah Kadran",
    "title": "Patek Philippe Nautilus 5711 Siyah Kadran",
    "price": "₺12.133.155",
    "calculatedPrice": 12133155,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Nautilus+5711+Black+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "102",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Mavi Kadran",
    "title": "Patek Philippe Aquanaut Mavi Kadran",
    "price": "₺10.759.300",
    "calculatedPrice": 10759300,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Aquanaut+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "103",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Calatrava Beyaz Kadran",
    "title": "Patek Philippe Calatrava Beyaz Kadran",
    "price": "₺5.127.370",
    "calculatedPrice": 5127370,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Calatrava+White+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "104",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Complications Yeşil Kadran",
    "title": "Patek Philippe Complications Yeşil Kadran",
    "price": "₺3.706.000",
    "calculatedPrice": 3706000,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Green+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "105",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Grand Complications Gümüş Kadran",
    "title": "Patek Philippe Grand Complications Gümüş Kadran",
    "price": "₺8.432.765",
    "calculatedPrice": 8432765,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Grand+Complications+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "106",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Golden Ellipse Altın Detaylı",
    "title": "Patek Philippe Golden Ellipse Altın Detaylı",
    "price": "₺9.574.485",
    "calculatedPrice": 9574485,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Golden+Ellipse+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "107",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Rose Gold",
    "title": "Patek Philippe Nautilus 5711 Rose Gold",
    "price": "₺3.439.100",
    "calculatedPrice": 3439100,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Nautilus+5712+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "108",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Çelik",
    "title": "Patek Philippe Aquanaut Çelik",
    "price": "₺10.996.280",
    "calculatedPrice": 10996280,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Aquanaut+Steel&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "109",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Calatrava Titanyum",
    "title": "Patek Philippe Calatrava Titanyum",
    "price": "₺11.093.690",
    "calculatedPrice": 11093690,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Watches+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "110",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Complications Siyah Kadran",
    "title": "Patek Philippe Complications Siyah Kadran",
    "price": "₺4.900.760",
    "calculatedPrice": 4900760,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Watches+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "111",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Grand Complications Mavi Kadran",
    "title": "Patek Philippe Grand Complications Mavi Kadran",
    "price": "₺5.616.375",
    "calculatedPrice": 5616375,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "112",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Golden Ellipse Beyaz Kadran",
    "title": "Patek Philippe Golden Ellipse Beyaz Kadran",
    "price": "₺4.363.390",
    "calculatedPrice": 4363390,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Golden+Ellipse+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "113",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Yeşil Kadran",
    "title": "Patek Philippe Nautilus 5711 Yeşil Kadran",
    "price": "₺10.510.420",
    "calculatedPrice": 10510420,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+5711+Green+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "114",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Gümüş Kadran",
    "title": "Patek Philippe Aquanaut Gümüş Kadran",
    "price": "₺9.153.990",
    "calculatedPrice": 9153990,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "115",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Calatrava Altın Detaylı",
    "title": "Patek Philippe Calatrava Altın Detaylı",
    "price": "₺11.034.445",
    "calculatedPrice": 11034445,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Calatrava+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "116",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Complications Rose Gold",
    "title": "Patek Philippe Complications Rose Gold",
    "price": "₺10.702.860",
    "calculatedPrice": 10702860,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Watches+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "117",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Grand Complications Çelik",
    "title": "Patek Philippe Grand Complications Çelik",
    "price": "₺2.559.775",
    "calculatedPrice": 2559775,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Grand+Complications+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "118",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Golden Ellipse Titanyum",
    "title": "Patek Philippe Golden Ellipse Titanyum",
    "price": "₺9.466.705",
    "calculatedPrice": 9466705,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Golden+Ellipse+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "119",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Siyah Kadran",
    "title": "Patek Philippe Nautilus 5711 Siyah Kadran",
    "price": "₺6.579.510",
    "calculatedPrice": 6579510,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Nautilus+5711+Black+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "120",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Mavi Kadran",
    "title": "Patek Philippe Aquanaut Mavi Kadran",
    "price": "₺1.804.125",
    "calculatedPrice": 1804125,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Aquanaut+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "121",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Calatrava Beyaz Kadran",
    "title": "Patek Philippe Calatrava Beyaz Kadran",
    "price": "₺7.214.630",
    "calculatedPrice": 7214630,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Calatrava+White+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "122",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Complications Yeşil Kadran",
    "title": "Patek Philippe Complications Yeşil Kadran",
    "price": "₺1.565.785",
    "calculatedPrice": 1565785,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Green+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "123",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Grand Complications Gümüş Kadran",
    "title": "Patek Philippe Grand Complications Gümüş Kadran",
    "price": "₺10.547.140",
    "calculatedPrice": 10547140,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Grand+Complications+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "124",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Golden Ellipse Altın Detaylı",
    "title": "Patek Philippe Golden Ellipse Altın Detaylı",
    "price": "₺1.598.510",
    "calculatedPrice": 1598510,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Golden+Ellipse+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "125",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Rose Gold",
    "title": "Patek Philippe Nautilus 5711 Rose Gold",
    "price": "₺1.443.895",
    "calculatedPrice": 1443895,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Nautilus+5712+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "126",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Çelik",
    "title": "Patek Philippe Aquanaut Çelik",
    "price": "₺10.502.855",
    "calculatedPrice": 10502855,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Aquanaut+Steel&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "127",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Calatrava Titanyum",
    "title": "Patek Philippe Calatrava Titanyum",
    "price": "₺10.992.880",
    "calculatedPrice": 10992880,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Watches+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "128",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Complications Siyah Kadran",
    "title": "Patek Philippe Complications Siyah Kadran",
    "price": "₺7.933.220",
    "calculatedPrice": 7933220,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Watches+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "129",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Grand Complications Mavi Kadran",
    "title": "Patek Philippe Grand Complications Mavi Kadran",
    "price": "₺12.073.825",
    "calculatedPrice": 12073825,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Grand+Complications+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "130",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Golden Ellipse Beyaz Kadran",
    "title": "Patek Philippe Golden Ellipse Beyaz Kadran",
    "price": "₺2.549.405",
    "calculatedPrice": 2549405,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Golden+Ellipse+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "131",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Yeşil Kadran",
    "title": "Patek Philippe Nautilus 5711 Yeşil Kadran",
    "price": "₺6.393.105",
    "calculatedPrice": 6393105,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+5711+Green+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "132",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Gümüş Kadran",
    "title": "Patek Philippe Aquanaut Gümüş Kadran",
    "price": "₺10.198.725",
    "calculatedPrice": 10198725,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "133",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Calatrava Altın Detaylı",
    "title": "Patek Philippe Calatrava Altın Detaylı",
    "price": "₺9.752.815",
    "calculatedPrice": 9752815,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Calatrava+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "134",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Complications Rose Gold",
    "title": "Patek Philippe Complications Rose Gold",
    "price": "₺2.296.275",
    "calculatedPrice": 2296275,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Watches+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "135",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Grand Complications Çelik",
    "title": "Patek Philippe Grand Complications Çelik",
    "price": "₺5.217.640",
    "calculatedPrice": 5217640,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Grand+Complications+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "136",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Golden Ellipse Titanyum",
    "title": "Patek Philippe Golden Ellipse Titanyum",
    "price": "₺8.787.725",
    "calculatedPrice": 8787725,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Golden+Ellipse+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "137",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Siyah Kadran",
    "title": "Patek Philippe Nautilus 5711 Siyah Kadran",
    "price": "₺1.291.150",
    "calculatedPrice": 1291150,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Nautilus+5711+Black+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "138",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Mavi Kadran",
    "title": "Patek Philippe Aquanaut Mavi Kadran",
    "price": "₺4.647.460",
    "calculatedPrice": 4647460,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Aquanaut+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "139",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Calatrava Beyaz Kadran",
    "title": "Patek Philippe Calatrava Beyaz Kadran",
    "price": "₺6.251.155",
    "calculatedPrice": 6251155,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Calatrava+White+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "140",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Complications Yeşil Kadran",
    "title": "Patek Philippe Complications Yeşil Kadran",
    "price": "₺4.977.855",
    "calculatedPrice": 4977855,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Green+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "141",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Grand Complications Gümüş Kadran",
    "title": "Patek Philippe Grand Complications Gümüş Kadran",
    "price": "₺10.967.125",
    "calculatedPrice": 10967125,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Grand+Complications+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "142",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Golden Ellipse Altın Detaylı",
    "title": "Patek Philippe Golden Ellipse Altın Detaylı",
    "price": "₺2.839.425",
    "calculatedPrice": 2839425,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Golden+Ellipse+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "143",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Rose Gold",
    "title": "Patek Philippe Nautilus 5711 Rose Gold",
    "price": "₺1.276.700",
    "calculatedPrice": 1276700,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Nautilus+5712+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "144",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Çelik",
    "title": "Patek Philippe Aquanaut Çelik",
    "price": "₺7.350.715",
    "calculatedPrice": 7350715,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Aquanaut+Steel&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "145",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Calatrava Titanyum",
    "title": "Patek Philippe Calatrava Titanyum",
    "price": "₺1.509.685",
    "calculatedPrice": 1509685,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Watches+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "146",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Complications Siyah Kadran",
    "title": "Patek Philippe Complications Siyah Kadran",
    "price": "₺3.783.350",
    "calculatedPrice": 3783350,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Watches+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "147",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Grand Complications Mavi Kadran",
    "title": "Patek Philippe Grand Complications Mavi Kadran",
    "price": "₺1.404.880",
    "calculatedPrice": 1404880,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Grand+Complications+Price&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "148",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Golden Ellipse Beyaz Kadran",
    "title": "Patek Philippe Golden Ellipse Beyaz Kadran",
    "price": "₺2.501.125",
    "calculatedPrice": 2501125,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+Golden+Ellipse+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "149",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Nautilus 5711 Yeşil Kadran",
    "title": "Patek Philippe Nautilus 5711 Yeşil Kadran",
    "price": "₺1.941.740",
    "calculatedPrice": 1941740,
    "image": "https://tse1.mm.bing.net/th?q=Patek+Philippe+5711+Green+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "150",
    "brand": "Patek Philippe",
    "modelName": "Patek Philippe Aquanaut Gümüş Kadran",
    "title": "Patek Philippe Aquanaut Gümüş Kadran",
    "price": "₺6.221.235",
    "calculatedPrice": 6221235,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "151",
    "brand": "Cartier",
    "modelName": "Cartier Santos de Cartier Siyah Kadran",
    "title": "Cartier Santos de Cartier Siyah Kadran",
    "price": "₺1.898.900",
    "calculatedPrice": 1898900,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Santos+Watch+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "152",
    "brand": "Cartier",
    "modelName": "Cartier Tank Must Mavi Kadran",
    "title": "Cartier Tank Must Mavi Kadran",
    "price": "₺1.231.905",
    "calculatedPrice": 1231905,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Tank+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "153",
    "brand": "Cartier",
    "modelName": "Cartier Ballon Bleu Beyaz Kadran",
    "title": "Cartier Ballon Bleu Beyaz Kadran",
    "price": "₺1.830.815",
    "calculatedPrice": 1830815,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "154",
    "brand": "Cartier",
    "modelName": "Cartier Panthere Yeşil Kadran",
    "title": "Cartier Panthere Yeşil Kadran",
    "price": "₺1.817.215",
    "calculatedPrice": 1817215,
    "image": "https://tse1.mm.bing.net/th?q=Green+Cartier+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "155",
    "brand": "Cartier",
    "modelName": "Cartier Pasha de Cartier Gümüş Kadran",
    "title": "Cartier Pasha de Cartier Gümüş Kadran",
    "price": "₺3.409.520",
    "calculatedPrice": 3409520,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Pasha+De+Cartier+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "156",
    "brand": "Cartier",
    "modelName": "Cartier Drive de Cartier Altın Detaylı",
    "title": "Cartier Drive de Cartier Altın Detaylı",
    "price": "₺1.178.015",
    "calculatedPrice": 1178015,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Drive+De+Cartier+Extra+Flat&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "157",
    "brand": "Cartier",
    "modelName": "Cartier Tank Francaise Rose Gold",
    "title": "Cartier Tank Francaise Rose Gold",
    "price": "₺920.465",
    "calculatedPrice": 920465,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "158",
    "brand": "Cartier",
    "modelName": "Cartier Santos de Cartier Çelik",
    "title": "Cartier Santos de Cartier Çelik",
    "price": "₺2.316.590",
    "calculatedPrice": 2316590,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Watch+Silver+Santos&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "159",
    "brand": "Cartier",
    "modelName": "Cartier Tank Must Titanyum",
    "title": "Cartier Tank Must Titanyum",
    "price": "₺3.096.550",
    "calculatedPrice": 3096550,
    "image": "https://tse1.mm.bing.net/th?q=Must+De+Cartier+Vintage+Tank+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "160",
    "brand": "Cartier",
    "modelName": "Cartier Ballon Bleu Siyah Kadran",
    "title": "Cartier Ballon Bleu Siyah Kadran",
    "price": "₺3.386.995",
    "calculatedPrice": 3386995,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Watch+Ballon+Bleu+De+Cc9008&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "161",
    "brand": "Cartier",
    "modelName": "Cartier Panthere Mavi Kadran",
    "title": "Cartier Panthere Mavi Kadran",
    "price": "₺3.720.705",
    "calculatedPrice": 3720705,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Panthere+Orologio&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "162",
    "brand": "Cartier",
    "modelName": "Cartier Pasha de Cartier Beyaz Kadran",
    "title": "Cartier Pasha de Cartier Beyaz Kadran",
    "price": "₺1.702.040",
    "calculatedPrice": 1702040,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Pasha+De+Cartier+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "163",
    "brand": "Cartier",
    "modelName": "Cartier Drive de Cartier Yeşil Kadran",
    "title": "Cartier Drive de Cartier Yeşil Kadran",
    "price": "₺1.671.185",
    "calculatedPrice": 1671185,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Green+Dial+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "164",
    "brand": "Cartier",
    "modelName": "Cartier Tank Francaise Gümüş Kadran",
    "title": "Cartier Tank Francaise Gümüş Kadran",
    "price": "₺1.573.690",
    "calculatedPrice": 1573690,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Stainless+Steel+Tank+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "165",
    "brand": "Cartier",
    "modelName": "Cartier Santos de Cartier Altın Detaylı",
    "title": "Cartier Santos de Cartier Altın Detaylı",
    "price": "₺2.456.925",
    "calculatedPrice": 2456925,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Santos+Gold+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "166",
    "brand": "Cartier",
    "modelName": "Cartier Tank Must Rose Gold",
    "title": "Cartier Tank Must Rose Gold",
    "price": "₺1.696.090",
    "calculatedPrice": 1696090,
    "image": "https://tse1.mm.bing.net/th?q=Must+De+Cartier+Tank+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "167",
    "brand": "Cartier",
    "modelName": "Cartier Ballon Bleu Çelik",
    "title": "Cartier Ballon Bleu Çelik",
    "price": "₺1.369.945",
    "calculatedPrice": 1369945,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Ballon+Bleu+Quartz+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "168",
    "brand": "Cartier",
    "modelName": "Cartier Panthere Titanyum",
    "title": "Cartier Panthere Titanyum",
    "price": "₺2.721.870",
    "calculatedPrice": 2721870,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Panthere+Watch+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "169",
    "brand": "Cartier",
    "modelName": "Cartier Pasha de Cartier Siyah Kadran",
    "title": "Cartier Pasha de Cartier Siyah Kadran",
    "price": "₺2.787.405",
    "calculatedPrice": 2787405,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Pasha+De+Cartier+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "170",
    "brand": "Cartier",
    "modelName": "Cartier Drive de Cartier Mavi Kadran",
    "title": "Cartier Drive de Cartier Mavi Kadran",
    "price": "₺1.782.535",
    "calculatedPrice": 1782535,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Drive+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "171",
    "brand": "Cartier",
    "modelName": "Cartier Tank Francaise Beyaz Kadran",
    "title": "Cartier Tank Francaise Beyaz Kadran",
    "price": "₺2.318.630",
    "calculatedPrice": 2318630,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Tank+Fran%c3%a7aise+Watch+Women&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "172",
    "brand": "Cartier",
    "modelName": "Cartier Santos de Cartier Yeşil Kadran",
    "title": "Cartier Santos de Cartier Yeşil Kadran",
    "price": "₺2.329.680",
    "calculatedPrice": 2329680,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Santos+Watch+Green+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "173",
    "brand": "Cartier",
    "modelName": "Cartier Tank Must Gümüş Kadran",
    "title": "Cartier Tank Must Gümüş Kadran",
    "price": "₺1.489.540",
    "calculatedPrice": 1489540,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Tank+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "174",
    "brand": "Cartier",
    "modelName": "Cartier Ballon Bleu Altın Detaylı",
    "title": "Cartier Ballon Bleu Altın Detaylı",
    "price": "₺1.129.650",
    "calculatedPrice": 1129650,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Ballon+Bleu+Yellow+Gold+Ladies+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "175",
    "brand": "Cartier",
    "modelName": "Cartier Panthere Rose Gold",
    "title": "Cartier Panthere Rose Gold",
    "price": "₺3.108.620",
    "calculatedPrice": 3108620,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Santos+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "176",
    "brand": "Cartier",
    "modelName": "Cartier Pasha de Cartier Çelik",
    "title": "Cartier Pasha de Cartier Çelik",
    "price": "₺1.810.415",
    "calculatedPrice": 1810415,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Pasha+De+Cartier+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "177",
    "brand": "Cartier",
    "modelName": "Cartier Drive de Cartier Titanyum",
    "title": "Cartier Drive de Cartier Titanyum",
    "price": "₺1.715.980",
    "calculatedPrice": 1715980,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Drive+De+Cartier&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "178",
    "brand": "Cartier",
    "modelName": "Cartier Tank Francaise Siyah Kadran",
    "title": "Cartier Tank Francaise Siyah Kadran",
    "price": "₺3.487.805",
    "calculatedPrice": 3487805,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Tank+Small+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "179",
    "brand": "Cartier",
    "modelName": "Cartier Santos de Cartier Mavi Kadran",
    "title": "Cartier Santos de Cartier Mavi Kadran",
    "price": "₺3.155.880",
    "calculatedPrice": 3155880,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Santos+Watch+Blue+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "180",
    "brand": "Cartier",
    "modelName": "Cartier Tank Must Beyaz Kadran",
    "title": "Cartier Tank Must Beyaz Kadran",
    "price": "₺514.165",
    "calculatedPrice": 514165,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Tank+Must+De+Cartier+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "181",
    "brand": "Cartier",
    "modelName": "Cartier Ballon Bleu Yeşil Kadran",
    "title": "Cartier Ballon Bleu Yeşil Kadran",
    "price": "₺2.219.775",
    "calculatedPrice": 2219775,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Watch+Ballon+Bleu+De+Cc9008&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "182",
    "brand": "Cartier",
    "modelName": "Cartier Panthere Gümüş Kadran",
    "title": "Cartier Panthere Gümüş Kadran",
    "price": "₺2.852.175",
    "calculatedPrice": 2852175,
    "image": "https://tse1.mm.bing.net/th?q=Silver+Cartier+Square+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "183",
    "brand": "Cartier",
    "modelName": "Cartier Pasha de Cartier Altın Detaylı",
    "title": "Cartier Pasha de Cartier Altın Detaylı",
    "price": "₺3.377.050",
    "calculatedPrice": 3377050,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Pasha+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "184",
    "brand": "Cartier",
    "modelName": "Cartier Drive de Cartier Rose Gold",
    "title": "Cartier Drive de Cartier Rose Gold",
    "price": "₺1.123.190",
    "calculatedPrice": 1123190,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "185",
    "brand": "Cartier",
    "modelName": "Cartier Tank Francaise Çelik",
    "title": "Cartier Tank Francaise Çelik",
    "price": "₺2.553.485",
    "calculatedPrice": 2553485,
    "image": "https://tse1.mm.bing.net/th?q=Yellow+Gold+Cartier+Tank+Fran%c3%a7aise+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "186",
    "brand": "Cartier",
    "modelName": "Cartier Santos de Cartier Titanyum",
    "title": "Cartier Santos de Cartier Titanyum",
    "price": "₺2.016.625",
    "calculatedPrice": 2016625,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "187",
    "brand": "Cartier",
    "modelName": "Cartier Tank Must Siyah Kadran",
    "title": "Cartier Tank Must Siyah Kadran",
    "price": "₺843.285",
    "calculatedPrice": 843285,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Tank+Must+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "188",
    "brand": "Cartier",
    "modelName": "Cartier Ballon Bleu Mavi Kadran",
    "title": "Cartier Ballon Bleu Mavi Kadran",
    "price": "₺573.580",
    "calculatedPrice": 573580,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Watches+Ballon+Bleu&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "189",
    "brand": "Cartier",
    "modelName": "Cartier Panthere Beyaz Kadran",
    "title": "Cartier Panthere Beyaz Kadran",
    "price": "₺1.360.170",
    "calculatedPrice": 1360170,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Panthere+Watch+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "190",
    "brand": "Cartier",
    "modelName": "Cartier Pasha de Cartier Yeşil Kadran",
    "title": "Cartier Pasha de Cartier Yeşil Kadran",
    "price": "₺3.236.290",
    "calculatedPrice": 3236290,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Pasha+Watch+503870Nx&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "191",
    "brand": "Cartier",
    "modelName": "Cartier Drive de Cartier Gümüş Kadran",
    "title": "Cartier Drive de Cartier Gümüş Kadran",
    "price": "₺1.521.755",
    "calculatedPrice": 1521755,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Drive+Extra+Flat&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "192",
    "brand": "Cartier",
    "modelName": "Cartier Tank Francaise Altın Detaylı",
    "title": "Cartier Tank Francaise Altın Detaylı",
    "price": "₺3.342.370",
    "calculatedPrice": 3342370,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "193",
    "brand": "Cartier",
    "modelName": "Cartier Santos de Cartier Rose Gold",
    "title": "Cartier Santos de Cartier Rose Gold",
    "price": "₺2.851.070",
    "calculatedPrice": 2851070,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Santos+Rose+Gold+Medium&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "194",
    "brand": "Cartier",
    "modelName": "Cartier Tank Must Çelik",
    "title": "Cartier Tank Must Çelik",
    "price": "₺2.677.245",
    "calculatedPrice": 2677245,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Tank+Watch+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "195",
    "brand": "Cartier",
    "modelName": "Cartier Ballon Bleu Titanyum",
    "title": "Cartier Ballon Bleu Titanyum",
    "price": "₺1.536.290",
    "calculatedPrice": 1536290,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Watch+Ballon+Bleu+De+Cc9008&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "196",
    "brand": "Cartier",
    "modelName": "Cartier Panthere Siyah Kadran",
    "title": "Cartier Panthere Siyah Kadran",
    "price": "₺671.245",
    "calculatedPrice": 671245,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Panthere+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "197",
    "brand": "Cartier",
    "modelName": "Cartier Pasha de Cartier Mavi Kadran",
    "title": "Cartier Pasha de Cartier Mavi Kadran",
    "price": "₺3.558.610",
    "calculatedPrice": 3558610,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Pasha+De+Cartier+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "198",
    "brand": "Cartier",
    "modelName": "Cartier Drive de Cartier Beyaz Kadran",
    "title": "Cartier Drive de Cartier Beyaz Kadran",
    "price": "₺563.805",
    "calculatedPrice": 563805,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Drive+Extra+Flat&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "199",
    "brand": "Cartier",
    "modelName": "Cartier Tank Francaise Yeşil Kadran",
    "title": "Cartier Tank Francaise Yeşil Kadran",
    "price": "₺2.242.045",
    "calculatedPrice": 2242045,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Tank+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "200",
    "brand": "Cartier",
    "modelName": "Cartier Santos de Cartier Gümüş Kadran",
    "title": "Cartier Santos de Cartier Gümüş Kadran",
    "price": "₺2.300.015",
    "calculatedPrice": 2300015,
    "image": "https://tse1.mm.bing.net/th?q=Cartier+Watch+Silver+Santos&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "201",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Siyah Kadran",
    "title": "TAG Heuer Carrera Siyah Kadran",
    "price": "₺655.945",
    "calculatedPrice": 655945,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Carrera+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "202",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Mavi Kadran",
    "title": "TAG Heuer Monaco Mavi Kadran",
    "price": "₺2.614.345",
    "calculatedPrice": 2614345,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "203",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Aquaracer Beyaz Kadran",
    "title": "TAG Heuer Aquaracer Beyaz Kadran",
    "price": "₺2.034.305",
    "calculatedPrice": 2034305,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Aquaracer+White+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "204",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Formula 1 Yeşil Kadran",
    "title": "TAG Heuer Formula 1 Yeşil Kadran",
    "price": "₺1.056.805",
    "calculatedPrice": 1056805,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Formula+1+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "205",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Autavia Gümüş Kadran",
    "title": "TAG Heuer Autavia Gümüş Kadran",
    "price": "₺2.209.915",
    "calculatedPrice": 2209915,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Autavia+Heritage&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "206",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Link Altın Detaylı",
    "title": "TAG Heuer Link Altın Detaylı",
    "price": "₺2.220.540",
    "calculatedPrice": 2220540,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Gold+Watches+For+Men&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "207",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Rose Gold",
    "title": "TAG Heuer Carrera Rose Gold",
    "price": "₺3.795.165",
    "calculatedPrice": 3795165,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Rose+Gold+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "208",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Çelik",
    "title": "TAG Heuer Monaco Çelik",
    "price": "₺2.886.005",
    "calculatedPrice": 2886005,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+High+Resolution&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "209",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Aquaracer Titanyum",
    "title": "TAG Heuer Aquaracer Titanyum",
    "price": "₺2.048.330",
    "calculatedPrice": 2048330,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Aquaracer+Professional+Titanium&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "210",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Formula 1 Siyah Kadran",
    "title": "TAG Heuer Formula 1 Siyah Kadran",
    "price": "₺3.618.620",
    "calculatedPrice": 3618620,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Formula+1+Watch+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "211",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Autavia Mavi Kadran",
    "title": "TAG Heuer Autavia Mavi Kadran",
    "price": "₺3.056.855",
    "calculatedPrice": 3056855,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Autavia+Light+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "212",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Link Beyaz Kadran",
    "title": "TAG Heuer Link Beyaz Kadran",
    "price": "₺448.885",
    "calculatedPrice": 448885,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+White+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "213",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Yeşil Kadran",
    "title": "TAG Heuer Carrera Yeşil Kadran",
    "price": "₺747.830",
    "calculatedPrice": 747830,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Carrera+Green+Face&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "214",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Gümüş Kadran",
    "title": "TAG Heuer Monaco Gümüş Kadran",
    "price": "₺1.187.535",
    "calculatedPrice": 1187535,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+High+Resolution&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "215",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Aquaracer Altın Detaylı",
    "title": "TAG Heuer Aquaracer Altın Detaylı",
    "price": "₺1.089.955",
    "calculatedPrice": 1089955,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Aquaracer+Gold+And+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "216",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Formula 1 Rose Gold",
    "title": "TAG Heuer Formula 1 Rose Gold",
    "price": "₺2.954.005",
    "calculatedPrice": 2954005,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "217",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Autavia Çelik",
    "title": "TAG Heuer Autavia Çelik",
    "price": "₺1.724.735",
    "calculatedPrice": 1724735,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Autavia+Calibre+5&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "218",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Link Titanyum",
    "title": "TAG Heuer Link Titanyum",
    "price": "₺2.367.505",
    "calculatedPrice": 2367505,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Link+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "219",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Siyah Kadran",
    "title": "TAG Heuer Carrera Siyah Kadran",
    "price": "₺3.736.515",
    "calculatedPrice": 3736515,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Carrera+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "220",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Mavi Kadran",
    "title": "TAG Heuer Monaco Mavi Kadran",
    "price": "₺2.455.990",
    "calculatedPrice": 2455990,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "221",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Aquaracer Beyaz Kadran",
    "title": "TAG Heuer Aquaracer Beyaz Kadran",
    "price": "₺2.316.080",
    "calculatedPrice": 2316080,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Aquaracer+White+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "222",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Formula 1 Yeşil Kadran",
    "title": "TAG Heuer Formula 1 Yeşil Kadran",
    "price": "₺809.200",
    "calculatedPrice": 809200,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Formula+1+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "223",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Autavia Gümüş Kadran",
    "title": "TAG Heuer Autavia Gümüş Kadran",
    "price": "₺2.541.415",
    "calculatedPrice": 2541415,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "224",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Link Altın Detaylı",
    "title": "TAG Heuer Link Altın Detaylı",
    "price": "₺1.740.290",
    "calculatedPrice": 1740290,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Gold+Watches+For+Men&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "225",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Rose Gold",
    "title": "TAG Heuer Carrera Rose Gold",
    "price": "₺3.636.555",
    "calculatedPrice": 3636555,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Rose+Gold+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "226",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Çelik",
    "title": "TAG Heuer Monaco Çelik",
    "price": "₺1.168.750",
    "calculatedPrice": 1168750,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+High+Resolution&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "227",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Aquaracer Titanyum",
    "title": "TAG Heuer Aquaracer Titanyum",
    "price": "₺1.388.305",
    "calculatedPrice": 1388305,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Aquaracer+Professional+Titanium&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "228",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Formula 1 Siyah Kadran",
    "title": "TAG Heuer Formula 1 Siyah Kadran",
    "price": "₺1.247.630",
    "calculatedPrice": 1247630,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Formula+1+Watch+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "229",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Autavia Mavi Kadran",
    "title": "TAG Heuer Autavia Mavi Kadran",
    "price": "₺1.927.205",
    "calculatedPrice": 1927205,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Autavia+Light+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "230",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Link Beyaz Kadran",
    "title": "TAG Heuer Link Beyaz Kadran",
    "price": "₺3.219.035",
    "calculatedPrice": 3219035,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+White+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "231",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Yeşil Kadran",
    "title": "TAG Heuer Carrera Yeşil Kadran",
    "price": "₺635.545",
    "calculatedPrice": 635545,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Carrera+Green+Face&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "232",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Gümüş Kadran",
    "title": "TAG Heuer Monaco Gümüş Kadran",
    "price": "₺915.620",
    "calculatedPrice": 915620,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+High+Resolution&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "233",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Aquaracer Altın Detaylı",
    "title": "TAG Heuer Aquaracer Altın Detaylı",
    "price": "₺3.630.180",
    "calculatedPrice": 3630180,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Aquaracer+Gold+And+Silver&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "234",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Formula 1 Rose Gold",
    "title": "TAG Heuer Formula 1 Rose Gold",
    "price": "₺2.381.530",
    "calculatedPrice": 2381530,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "235",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Autavia Çelik",
    "title": "TAG Heuer Autavia Çelik",
    "price": "₺1.870.935",
    "calculatedPrice": 1870935,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Autavia+Calibre+5&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "236",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Link Titanyum",
    "title": "TAG Heuer Link Titanyum",
    "price": "₺3.591.845",
    "calculatedPrice": 3591845,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Link+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "237",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Siyah Kadran",
    "title": "TAG Heuer Carrera Siyah Kadran",
    "price": "₺1.597.405",
    "calculatedPrice": 1597405,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Carrera+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "238",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Mavi Kadran",
    "title": "TAG Heuer Monaco Mavi Kadran",
    "price": "₺2.833.220",
    "calculatedPrice": 2833220,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "239",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Aquaracer Beyaz Kadran",
    "title": "TAG Heuer Aquaracer Beyaz Kadran",
    "price": "₺3.651.175",
    "calculatedPrice": 3651175,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Aquaracer+White+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "240",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Formula 1 Yeşil Kadran",
    "title": "TAG Heuer Formula 1 Yeşil Kadran",
    "price": "₺3.635.620",
    "calculatedPrice": 3635620,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Formula+1+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "241",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Autavia Gümüş Kadran",
    "title": "TAG Heuer Autavia Gümüş Kadran",
    "price": "₺867.765",
    "calculatedPrice": 867765,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Autavia+Heritage&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "242",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Link Altın Detaylı",
    "title": "TAG Heuer Link Altın Detaylı",
    "price": "₺2.188.580",
    "calculatedPrice": 2188580,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Gold+Watches+For+Men&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "243",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Rose Gold",
    "title": "TAG Heuer Carrera Rose Gold",
    "price": "₺1.769.955",
    "calculatedPrice": 1769955,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Rose+Gold+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "244",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Çelik",
    "title": "TAG Heuer Monaco Çelik",
    "price": "₺2.210.510",
    "calculatedPrice": 2210510,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+High+Resolution&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "245",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Aquaracer Titanyum",
    "title": "TAG Heuer Aquaracer Titanyum",
    "price": "₺1.168.835",
    "calculatedPrice": 1168835,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Aquaracer+Professional+Titanium&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "246",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Formula 1 Siyah Kadran",
    "title": "TAG Heuer Formula 1 Siyah Kadran",
    "price": "₺3.651.855",
    "calculatedPrice": 3651855,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Formula+1+Watch+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "247",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Autavia Mavi Kadran",
    "title": "TAG Heuer Autavia Mavi Kadran",
    "price": "₺1.807.780",
    "calculatedPrice": 1807780,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Autavia+Light+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "248",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Link Beyaz Kadran",
    "title": "TAG Heuer Link Beyaz Kadran",
    "price": "₺1.036.830",
    "calculatedPrice": 1036830,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+White+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "249",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Carrera Yeşil Kadran",
    "title": "TAG Heuer Carrera Yeşil Kadran",
    "price": "₺2.418.250",
    "calculatedPrice": 2418250,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "250",
    "brand": "TAG Heuer",
    "modelName": "TAG Heuer Monaco Gümüş Kadran",
    "title": "TAG Heuer Monaco Gümüş Kadran",
    "price": "₺3.059.490",
    "calculatedPrice": 3059490,
    "image": "https://tse1.mm.bing.net/th?q=Tag+Heuer+Monaco+High+Resolution&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "251",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Siyah Kadran",
    "title": "IWC Pilot's Watch Chronograph Siyah Kadran",
    "price": "₺1.726.435",
    "calculatedPrice": 1726435,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "252",
    "brand": "IWC",
    "modelName": "IWC Portugieser Mavi Kadran",
    "title": "IWC Portugieser Mavi Kadran",
    "price": "₺1.977.355",
    "calculatedPrice": 1977355,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portugieser+Chronograph+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "253",
    "brand": "IWC",
    "modelName": "IWC Portofino Beyaz Kadran",
    "title": "IWC Portofino Beyaz Kadran",
    "price": "₺2.803.130",
    "calculatedPrice": 2803130,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portofino+Automatic+37&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "254",
    "brand": "IWC",
    "modelName": "IWC Aquatimer Yeşil Kadran",
    "title": "IWC Aquatimer Yeşil Kadran",
    "price": "₺540.430",
    "calculatedPrice": 540430,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "255",
    "brand": "IWC",
    "modelName": "IWC Ingenieur Gümüş Kadran",
    "title": "IWC Ingenieur Gümüş Kadran",
    "price": "₺3.700.050",
    "calculatedPrice": 3700050,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "256",
    "brand": "IWC",
    "modelName": "IWC Da Vinci Altın Detaylı",
    "title": "IWC Da Vinci Altın Detaylı",
    "price": "₺1.070.150",
    "calculatedPrice": 1070150,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Da+Vinci+Automatic&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "257",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Rose Gold",
    "title": "IWC Pilot's Watch Chronograph Rose Gold",
    "price": "₺2.799.135",
    "calculatedPrice": 2799135,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "258",
    "brand": "IWC",
    "modelName": "IWC Portugieser Çelik",
    "title": "IWC Portugieser Çelik",
    "price": "₺1.145.460",
    "calculatedPrice": 1145460,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Schaffhausen+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "259",
    "brand": "IWC",
    "modelName": "IWC Portofino Titanyum",
    "title": "IWC Portofino Titanyum",
    "price": "₺3.751.305",
    "calculatedPrice": 3751305,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "260",
    "brand": "IWC",
    "modelName": "IWC Aquatimer Siyah Kadran",
    "title": "IWC Aquatimer Siyah Kadran",
    "price": "₺2.131.970",
    "calculatedPrice": 2131970,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "261",
    "brand": "IWC",
    "modelName": "IWC Ingenieur Mavi Kadran",
    "title": "IWC Ingenieur Mavi Kadran",
    "price": "₺635.630",
    "calculatedPrice": 635630,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Ingenieur+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "262",
    "brand": "IWC",
    "modelName": "IWC Da Vinci Beyaz Kadran",
    "title": "IWC Da Vinci Beyaz Kadran",
    "price": "₺1.555.075",
    "calculatedPrice": 1555075,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "263",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Yeşil Kadran",
    "title": "IWC Pilot's Watch Chronograph Yeşil Kadran",
    "price": "₺1.453.075",
    "calculatedPrice": 1453075,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Pilot+Xx+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "264",
    "brand": "IWC",
    "modelName": "IWC Portugieser Gümüş Kadran",
    "title": "IWC Portugieser Gümüş Kadran",
    "price": "₺778.175",
    "calculatedPrice": 778175,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portugieser+Automatic+40&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "265",
    "brand": "IWC",
    "modelName": "IWC Portofino Altın Detaylı",
    "title": "IWC Portofino Altın Detaylı",
    "price": "₺507.025",
    "calculatedPrice": 507025,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portofino+Automatic&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "266",
    "brand": "IWC",
    "modelName": "IWC Aquatimer Rose Gold",
    "title": "IWC Aquatimer Rose Gold",
    "price": "₺2.929.780",
    "calculatedPrice": 2929780,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "267",
    "brand": "IWC",
    "modelName": "IWC Ingenieur Çelik",
    "title": "IWC Ingenieur Çelik",
    "price": "₺3.299.955",
    "calculatedPrice": 3299955,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "268",
    "brand": "IWC",
    "modelName": "IWC Da Vinci Titanyum",
    "title": "IWC Da Vinci Titanyum",
    "price": "₺2.307.070",
    "calculatedPrice": 2307070,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Da+Vinci+Automatic&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "269",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Siyah Kadran",
    "title": "IWC Pilot's Watch Chronograph Siyah Kadran",
    "price": "₺2.212.125",
    "calculatedPrice": 2212125,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "270",
    "brand": "IWC",
    "modelName": "IWC Portugieser Mavi Kadran",
    "title": "IWC Portugieser Mavi Kadran",
    "price": "₺999.005",
    "calculatedPrice": 999005,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portugieser+Chronograph+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "271",
    "brand": "IWC",
    "modelName": "IWC Portofino Beyaz Kadran",
    "title": "IWC Portofino Beyaz Kadran",
    "price": "₺1.379.805",
    "calculatedPrice": 1379805,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portofino+Automatic+37&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "272",
    "brand": "IWC",
    "modelName": "IWC Aquatimer Yeşil Kadran",
    "title": "IWC Aquatimer Yeşil Kadran",
    "price": "₺3.030.845",
    "calculatedPrice": 3030845,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "273",
    "brand": "IWC",
    "modelName": "IWC Ingenieur Gümüş Kadran",
    "title": "IWC Ingenieur Gümüş Kadran",
    "price": "₺916.045",
    "calculatedPrice": 916045,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "274",
    "brand": "IWC",
    "modelName": "IWC Da Vinci Altın Detaylı",
    "title": "IWC Da Vinci Altın Detaylı",
    "price": "₺1.430.040",
    "calculatedPrice": 1430040,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Da+Vinci+Automatic&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "275",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Rose Gold",
    "title": "IWC Pilot's Watch Chronograph Rose Gold",
    "price": "₺827.645",
    "calculatedPrice": 827645,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "276",
    "brand": "IWC",
    "modelName": "IWC Portugieser Çelik",
    "title": "IWC Portugieser Çelik",
    "price": "₺476.765",
    "calculatedPrice": 476765,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Schaffhausen+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "277",
    "brand": "IWC",
    "modelName": "IWC Portofino Titanyum",
    "title": "IWC Portofino Titanyum",
    "price": "₺3.441.650",
    "calculatedPrice": 3441650,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "278",
    "brand": "IWC",
    "modelName": "IWC Aquatimer Siyah Kadran",
    "title": "IWC Aquatimer Siyah Kadran",
    "price": "₺2.822.340",
    "calculatedPrice": 2822340,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "279",
    "brand": "IWC",
    "modelName": "IWC Ingenieur Mavi Kadran",
    "title": "IWC Ingenieur Mavi Kadran",
    "price": "₺3.253.885",
    "calculatedPrice": 3253885,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Ingenieur+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "280",
    "brand": "IWC",
    "modelName": "IWC Da Vinci Beyaz Kadran",
    "title": "IWC Da Vinci Beyaz Kadran",
    "price": "₺3.104.115",
    "calculatedPrice": 3104115,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "281",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Yeşil Kadran",
    "title": "IWC Pilot's Watch Chronograph Yeşil Kadran",
    "price": "₺2.290.920",
    "calculatedPrice": 2290920,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Pilot+Xx+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "282",
    "brand": "IWC",
    "modelName": "IWC Portugieser Gümüş Kadran",
    "title": "IWC Portugieser Gümüş Kadran",
    "price": "₺2.825.060",
    "calculatedPrice": 2825060,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portugieser+Automatic+40&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "283",
    "brand": "IWC",
    "modelName": "IWC Portofino Altın Detaylı",
    "title": "IWC Portofino Altın Detaylı",
    "price": "₺3.425.585",
    "calculatedPrice": 3425585,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portofino+Automatic&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "284",
    "brand": "IWC",
    "modelName": "IWC Aquatimer Rose Gold",
    "title": "IWC Aquatimer Rose Gold",
    "price": "₺1.366.205",
    "calculatedPrice": 1366205,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "285",
    "brand": "IWC",
    "modelName": "IWC Ingenieur Çelik",
    "title": "IWC Ingenieur Çelik",
    "price": "₺1.279.675",
    "calculatedPrice": 1279675,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "286",
    "brand": "IWC",
    "modelName": "IWC Da Vinci Titanyum",
    "title": "IWC Da Vinci Titanyum",
    "price": "₺3.781.225",
    "calculatedPrice": 3781225,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Da+Vinci+Automatic&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "287",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Siyah Kadran",
    "title": "IWC Pilot's Watch Chronograph Siyah Kadran",
    "price": "₺2.391.815",
    "calculatedPrice": 2391815,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "288",
    "brand": "IWC",
    "modelName": "IWC Portugieser Mavi Kadran",
    "title": "IWC Portugieser Mavi Kadran",
    "price": "₺3.583.005",
    "calculatedPrice": 3583005,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portugieser+Chronograph+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "289",
    "brand": "IWC",
    "modelName": "IWC Portofino Beyaz Kadran",
    "title": "IWC Portofino Beyaz Kadran",
    "price": "₺1.903.830",
    "calculatedPrice": 1903830,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portofino+Automatic+37&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "290",
    "brand": "IWC",
    "modelName": "IWC Aquatimer Yeşil Kadran",
    "title": "IWC Aquatimer Yeşil Kadran",
    "price": "₺863.005",
    "calculatedPrice": 863005,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "291",
    "brand": "IWC",
    "modelName": "IWC Ingenieur Gümüş Kadran",
    "title": "IWC Ingenieur Gümüş Kadran",
    "price": "₺2.013.480",
    "calculatedPrice": 2013480,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "292",
    "brand": "IWC",
    "modelName": "IWC Da Vinci Altın Detaylı",
    "title": "IWC Da Vinci Altın Detaylı",
    "price": "₺1.924.400",
    "calculatedPrice": 1924400,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Da+Vinci+Automatic&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "293",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Rose Gold",
    "title": "IWC Pilot's Watch Chronograph Rose Gold",
    "price": "₺3.463.070",
    "calculatedPrice": 3463070,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "294",
    "brand": "IWC",
    "modelName": "IWC Portugieser Çelik",
    "title": "IWC Portugieser Çelik",
    "price": "₺1.752.700",
    "calculatedPrice": 1752700,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Schaffhausen+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "295",
    "brand": "IWC",
    "modelName": "IWC Portofino Titanyum",
    "title": "IWC Portofino Titanyum",
    "price": "₺2.608.565",
    "calculatedPrice": 2608565,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "296",
    "brand": "IWC",
    "modelName": "IWC Aquatimer Siyah Kadran",
    "title": "IWC Aquatimer Siyah Kadran",
    "price": "₺3.437.145",
    "calculatedPrice": 3437145,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "297",
    "brand": "IWC",
    "modelName": "IWC Ingenieur Mavi Kadran",
    "title": "IWC Ingenieur Mavi Kadran",
    "price": "₺2.495.600",
    "calculatedPrice": 2495600,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Ingenieur+Blue&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "298",
    "brand": "IWC",
    "modelName": "IWC Da Vinci Beyaz Kadran",
    "title": "IWC Da Vinci Beyaz Kadran",
    "price": "₺2.034.985",
    "calculatedPrice": 2034985,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "299",
    "brand": "IWC",
    "modelName": "IWC Pilot's Watch Chronograph Yeşil Kadran",
    "title": "IWC Pilot's Watch Chronograph Yeşil Kadran",
    "price": "₺1.228.420",
    "calculatedPrice": 1228420,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Pilot+Xx+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "300",
    "brand": "IWC",
    "modelName": "IWC Portugieser Gümüş Kadran",
    "title": "IWC Portugieser Gümüş Kadran",
    "price": "₺3.627.375",
    "calculatedPrice": 3627375,
    "image": "https://tse1.mm.bing.net/th?q=Iwc+Portugieser+Automatic+40&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "301",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Siyah Kadran",
    "title": "Hublot Big Bang Siyah Kadran",
    "price": "₺3.219.885",
    "calculatedPrice": 3219885,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "302",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Mavi Kadran",
    "title": "Hublot Classic Fusion Mavi Kadran",
    "price": "₺3.469.870",
    "calculatedPrice": 3469870,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Classic+Fusion+Blue+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "303",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Beyaz Kadran",
    "title": "Hublot Spirit of Big Bang Beyaz Kadran",
    "price": "₺1.481.380",
    "calculatedPrice": 1481380,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+White+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "304",
    "brand": "Hublot",
    "modelName": "Hublot King Power Yeşil Kadran",
    "title": "Hublot King Power Yeşil Kadran",
    "price": "₺3.573.145",
    "calculatedPrice": 3573145,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "305",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Gümüş Kadran",
    "title": "Hublot Big Bang Gümüş Kadran",
    "price": "₺1.609.900",
    "calculatedPrice": 1609900,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Steel+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "306",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Altın Detaylı",
    "title": "Hublot Classic Fusion Altın Detaylı",
    "price": "₺2.262.615",
    "calculatedPrice": 2262615,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "307",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Rose Gold",
    "title": "Hublot Spirit of Big Bang Rose Gold",
    "price": "₺1.310.020",
    "calculatedPrice": 1310020,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Rose+Gold+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "308",
    "brand": "Hublot",
    "modelName": "Hublot King Power Çelik",
    "title": "Hublot King Power Çelik",
    "price": "₺3.056.855",
    "calculatedPrice": 3056855,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "309",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Titanyum",
    "title": "Hublot Big Bang Titanyum",
    "price": "₺3.377.390",
    "calculatedPrice": 3377390,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "310",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Siyah Kadran",
    "title": "Hublot Classic Fusion Siyah Kadran",
    "price": "₺2.210.595",
    "calculatedPrice": 2210595,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Classic+Fusion+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "311",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Mavi Kadran",
    "title": "Hublot Spirit of Big Bang Mavi Kadran",
    "price": "₺1.788.825",
    "calculatedPrice": 1788825,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "312",
    "brand": "Hublot",
    "modelName": "Hublot King Power Beyaz Kadran",
    "title": "Hublot King Power Beyaz Kadran",
    "price": "₺751.825",
    "calculatedPrice": 751825,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Men+White&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "313",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Yeşil Kadran",
    "title": "Hublot Big Bang Yeşil Kadran",
    "price": "₺1.570.545",
    "calculatedPrice": 1570545,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "314",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Gümüş Kadran",
    "title": "Hublot Classic Fusion Gümüş Kadran",
    "price": "₺3.573.315",
    "calculatedPrice": 3573315,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Classic+Fusion+45Mm&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "315",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Altın Detaylı",
    "title": "Hublot Spirit of Big Bang Altın Detaylı",
    "price": "₺974.015",
    "calculatedPrice": 974015,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+King+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "316",
    "brand": "Hublot",
    "modelName": "Hublot King Power Rose Gold",
    "title": "Hublot King Power Rose Gold",
    "price": "₺2.131.120",
    "calculatedPrice": 2131120,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Rose+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "317",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Çelik",
    "title": "Hublot Big Bang Çelik",
    "price": "₺3.020.985",
    "calculatedPrice": 3020985,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Steel+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "318",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Titanyum",
    "title": "Hublot Classic Fusion Titanyum",
    "price": "₺3.655.680",
    "calculatedPrice": 3655680,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "319",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Siyah Kadran",
    "title": "Hublot Spirit of Big Bang Siyah Kadran",
    "price": "₺1.580.575",
    "calculatedPrice": 1580575,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "320",
    "brand": "Hublot",
    "modelName": "Hublot King Power Mavi Kadran",
    "title": "Hublot King Power Mavi Kadran",
    "price": "₺546.040",
    "calculatedPrice": 546040,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Blue+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "321",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Beyaz Kadran",
    "title": "Hublot Big Bang Beyaz Kadran",
    "price": "₺1.814.240",
    "calculatedPrice": 1814240,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+White+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "322",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Yeşil Kadran",
    "title": "Hublot Classic Fusion Yeşil Kadran",
    "price": "₺1.253.240",
    "calculatedPrice": 1253240,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "323",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Gümüş Kadran",
    "title": "Hublot Spirit of Big Bang Gümüş Kadran",
    "price": "₺2.149.565",
    "calculatedPrice": 2149565,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Steel+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "324",
    "brand": "Hublot",
    "modelName": "Hublot King Power Altın Detaylı",
    "title": "Hublot King Power Altın Detaylı",
    "price": "₺2.524.925",
    "calculatedPrice": 2524925,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Men+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "325",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Rose Gold",
    "title": "Hublot Big Bang Rose Gold",
    "price": "₺575.875",
    "calculatedPrice": 575875,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Rose+Gold+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "326",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Çelik",
    "title": "Hublot Classic Fusion Çelik",
    "price": "₺2.220.370",
    "calculatedPrice": 2220370,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Steel+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "327",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Titanyum",
    "title": "Hublot Spirit of Big Bang Titanyum",
    "price": "₺1.789.760",
    "calculatedPrice": 1789760,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "328",
    "brand": "Hublot",
    "modelName": "Hublot King Power Siyah Kadran",
    "title": "Hublot King Power Siyah Kadran",
    "price": "₺3.184.185",
    "calculatedPrice": 3184185,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "329",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Mavi Kadran",
    "title": "Hublot Big Bang Mavi Kadran",
    "price": "₺3.518.915",
    "calculatedPrice": 3518915,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Blue+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "330",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Beyaz Kadran",
    "title": "Hublot Classic Fusion Beyaz Kadran",
    "price": "₺3.025.745",
    "calculatedPrice": 3025745,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Men+White&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "331",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Yeşil Kadran",
    "title": "Hublot Spirit of Big Bang Yeşil Kadran",
    "price": "₺1.247.715",
    "calculatedPrice": 1247715,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "332",
    "brand": "Hublot",
    "modelName": "Hublot King Power Gümüş Kadran",
    "title": "Hublot King Power Gümüş Kadran",
    "price": "₺1.174.700",
    "calculatedPrice": 1174700,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Steel+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "333",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Altın Detaylı",
    "title": "Hublot Big Bang Altın Detaylı",
    "price": "₺1.141.125",
    "calculatedPrice": 1141125,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Men+Gold&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "334",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Rose Gold",
    "title": "Hublot Classic Fusion Rose Gold",
    "price": "₺3.694.950",
    "calculatedPrice": 3694950,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Rose+Gold+Skeleton+Fusion&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "335",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Çelik",
    "title": "Hublot Spirit of Big Bang Çelik",
    "price": "₺1.963.160",
    "calculatedPrice": 1963160,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "336",
    "brand": "Hublot",
    "modelName": "Hublot King Power Titanyum",
    "title": "Hublot King Power Titanyum",
    "price": "₺3.148.910",
    "calculatedPrice": 3148910,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Titanium+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "337",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Siyah Kadran",
    "title": "Hublot Big Bang Siyah Kadran",
    "price": "₺1.296.845",
    "calculatedPrice": 1296845,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "338",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Mavi Kadran",
    "title": "Hublot Classic Fusion Mavi Kadran",
    "price": "₺3.041.895",
    "calculatedPrice": 3041895,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Classic+Fusion+Blue+Dial&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "339",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Beyaz Kadran",
    "title": "Hublot Spirit of Big Bang Beyaz Kadran",
    "price": "₺2.774.740",
    "calculatedPrice": 2774740,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+White+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "340",
    "brand": "Hublot",
    "modelName": "Hublot King Power Yeşil Kadran",
    "title": "Hublot King Power Yeşil Kadran",
    "price": "₺2.972.875",
    "calculatedPrice": 2972875,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "341",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Gümüş Kadran",
    "title": "Hublot Big Bang Gümüş Kadran",
    "price": "₺3.799.075",
    "calculatedPrice": 3799075,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Steel+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "342",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Altın Detaylı",
    "title": "Hublot Classic Fusion Altın Detaylı",
    "price": "₺1.654.865",
    "calculatedPrice": 1654865,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "343",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Rose Gold",
    "title": "Hublot Spirit of Big Bang Rose Gold",
    "price": "₺3.751.220",
    "calculatedPrice": 3751220,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Rose+Gold+Watch&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "344",
    "brand": "Hublot",
    "modelName": "Hublot King Power Çelik",
    "title": "Hublot King Power Çelik",
    "price": "₺455.175",
    "calculatedPrice": 455175,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watch+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "345",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Titanyum",
    "title": "Hublot Big Bang Titanyum",
    "price": "₺3.248.870",
    "calculatedPrice": 3248870,
    "image": "",
    "category": "Elit Kategori"
  },
  {
    "id": "346",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Siyah Kadran",
    "title": "Hublot Classic Fusion Siyah Kadran",
    "price": "₺3.762.950",
    "calculatedPrice": 3762950,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Classic+Fusion+Black&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "347",
    "brand": "Hublot",
    "modelName": "Hublot Spirit of Big Bang Mavi Kadran",
    "title": "Hublot Spirit of Big Bang Mavi Kadran",
    "price": "₺2.268.565",
    "calculatedPrice": 2268565,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "348",
    "brand": "Hublot",
    "modelName": "Hublot King Power Beyaz Kadran",
    "title": "Hublot King Power Beyaz Kadran",
    "price": "₺3.031.100",
    "calculatedPrice": 3031100,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Watches+Men+White&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "349",
    "brand": "Hublot",
    "modelName": "Hublot Big Bang Yeşil Kadran",
    "title": "Hublot Big Bang Yeşil Kadran",
    "price": "₺3.147.380",
    "calculatedPrice": 3147380,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Green&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "350",
    "brand": "Hublot",
    "modelName": "Hublot Classic Fusion Gümüş Kadran",
    "title": "Hublot Classic Fusion Gümüş Kadran",
    "price": "₺3.121.795",
    "calculatedPrice": 3121795,
    "image": "https://tse1.mm.bing.net/th?q=Hublot+Classic+Fusion+45Mm&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "351",
    "brand": "Richard Mille",
    "modelName": "RM 11-03 Automatic Flyback Chronograph",
    "title": "RM 11-03 Automatic Flyback Chronograph",
    "price": "₺29.750.000",
    "calculatedPrice": 29750000,
    "image": "https://www.thewatchbox.com/on/demandware.static/-/Sites-watchbox-catalog/default/dw106d34e5/images/watches/Richard%20Mille/RM%2011-03/11-03_RM11-03.png",
    "category": "Elit Kategori"
  },
  {
    "id": "352",
    "brand": "Richard Mille",
    "modelName": "RM 35-02 Rafael Nadal Carbon TPT",
    "title": "RM 35-02 Rafael Nadal Carbon TPT",
    "price": "₺35.700.000",
    "calculatedPrice": 35700000,
    "image": "https://tse1.mm.bing.net/th?q=90&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "353",
    "brand": "Richard Mille",
    "modelName": "RM 65-01 Split-Seconds Chronograph",
    "title": "RM 65-01 Split-Seconds Chronograph",
    "price": "₺46.750.000",
    "calculatedPrice": 46750000,
    "image": "https://tse1.mm.bing.net/th?q=Richard+Mille+RM+65-01+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "354",
    "brand": "Richard Mille",
    "modelName": "RM 055 Bubba Watson White Ceramic",
    "title": "RM 055 Bubba Watson White Ceramic",
    "price": "₺26.350.000",
    "calculatedPrice": 26350000,
    "image": "https://tse1.mm.bing.net/th?q=Richard+Mille+RM+055+White+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "355",
    "brand": "Richard Mille",
    "modelName": "RM 72-01 Lifestyle In-House Chronograph",
    "title": "RM 72-01 Lifestyle In-House Chronograph",
    "price": "₺24.225.000",
    "calculatedPrice": 24225000,
    "image": "https://tse1.mm.bing.net/th?q=Richard+Mille+RM+72-01+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Elit Kategori"
  },
  {
    "id": "356",
    "brand": "Panerai",
    "modelName": "Luminor Marina 44mm PAM01312",
    "title": "Luminor Marina 44mm PAM01312",
    "price": "₺722.500",
    "calculatedPrice": 722500,
    "image": "https://tse1.mm.bing.net/th?q=Panerai+Luminor+Marina+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Erkek"
  },
  {
    "id": "357",
    "brand": "Panerai",
    "modelName": "Submersible 42mm PAM00683",
    "title": "Submersible 42mm PAM00683",
    "price": "₺867.000",
    "calculatedPrice": 867000,
    "image": "https://tse1.mm.bing.net/th?q=Panerai+Submersible+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Erkek"
  },
  {
    "id": "358",
    "brand": "Panerai",
    "modelName": "Radiomir 8 Days PAM00992",
    "title": "Radiomir 8 Days PAM00992",
    "price": "₺773.500",
    "calculatedPrice": 773500,
    "image": "https://tse1.mm.bing.net/th?q=Panerai+Radiomir+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Erkek"
  },
  {
    "id": "359",
    "brand": "Panerai",
    "modelName": "Luminor Due 38mm PAM01273",
    "title": "Luminor Due 38mm PAM01273",
    "price": "₺578.000",
    "calculatedPrice": 578000,
    "image": "https://tse1.mm.bing.net/th?q=Panerai+Luminor+Due+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Kadın"
  },
  {
    "id": "360",
    "brand": "Panerai",
    "modelName": "Luminor Chrono PAM01109",
    "title": "Luminor Chrono PAM01109",
    "price": "₺833.000",
    "calculatedPrice": 833000,
    "image": "https://tse1.mm.bing.net/th?q=Panerai+Luminor+Chrono+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Erkek"
  },
  {
    "id": "361",
    "brand": "Longines",
    "modelName": "Master Collection Moonphase",
    "title": "Master Collection Moonphase",
    "price": "₺238.000",
    "calculatedPrice": 238000,
    "image": "https://tse1.mm.bing.net/th?q=Longines+Master+Collection+Moonphase+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Erkek"
  },
  {
    "id": "362",
    "brand": "Longines",
    "modelName": "HydroConquest Ceramic Bezel",
    "title": "HydroConquest Ceramic Bezel",
    "price": "₺165.750",
    "calculatedPrice": 165750,
    "image": "https://tse1.mm.bing.net/th?q=Longines+HydroConquest+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Erkek"
  },
  {
    "id": "363",
    "brand": "Longines",
    "modelName": "Spirit Zulu Time GMT",
    "title": "Spirit Zulu Time GMT",
    "price": "₺272.000",
    "calculatedPrice": 272000,
    "image": "https://tse1.mm.bing.net/th?q=Longines+Spirit+Zulu+Time+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Erkek"
  },
  {
    "id": "364",
    "brand": "Longines",
    "modelName": "DolceVita Steel & Diamonds",
    "title": "DolceVita Steel & Diamonds",
    "price": "₺178.500",
    "calculatedPrice": 178500,
    "image": "https://tse1.mm.bing.net/th?q=Longines+DolceVita+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Kadın"
  },
  {
    "id": "365",
    "brand": "Longines",
    "modelName": "Avigation BigEye Titanium",
    "title": "Avigation BigEye Titanium",
    "price": "₺314.500",
    "calculatedPrice": 314500,
    "image": "https://tse1.mm.bing.net/th?q=Longines+Avigation+BigEye+png&w=2000&h=2000&c=7&rs=1&p=0&dpr=2",
    "category": "Lüks Erkek"
  }
];
