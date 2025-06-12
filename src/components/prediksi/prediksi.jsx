import React, { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { Link, useLocation } from 'react-router-dom';

const currencyPairs = {
  'EUR/USD': 'EURUSD=X',
  'USD/JPY': 'USDJPY=X',
  'AUD/USD': 'AUDUSD=X',
  'GBP/USD': 'GBPUSD=X',
  'NZD/USD': 'NZDUSD=X',
};

const indicators = ['SMA', 'EMA'];

const timeframes = [
  { label: '1 Hari', value: 1 },
  { label: '2 Hari', value: 2 },
  { label: '3 Hari', value: 3 },
  { label: '4 Hari', value: 4 },
  { label: '7 Hari', value: 7 },
  { label: '14 Hari', value: 14 },
  { label: '30 Hari', value: 30 },
];

export default function Prediksi({ onBack }) {
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [selectedIndicator, setSelectedIndicator] = useState('SMA');
  const [selectedTimeframe, setSelectedTimeframe] = useState(4);
  const [chartData, setChartData] = useState([]);
  const [indicatorData, setIndicatorData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [futureHigh, setFutureHigh] = useState(null);
  const [dailyPrediction, setDailyPrediction] = useState(null);
  const [zoneCounts, setZoneCounts] = useState({
    FBuy: 0,
    FSell: 0,
    DBuy: 0,
    DSell: 0,
    FBuy_pct: 0,
    FSell_pct: 0,
    DBuy_pct: 0,
    DSell_pct: 0,
    FBuy_strength: 0,
    FSell_strength: 0,
    DBuy_strength: 0,
    DSell_strength: 0,
  });
  const [weeklyPredictions, setWeeklyPredictions] = useState([]);
  const [yesterdayClose, setYesterdayClose] = useState(null); // State for yesterday's close price
  const [showPopup, setShowPopup] = useState(false);

  const url = 'https://flasknarastock.onrender.com';
  // const url = 'http://127.0.0.1:5000'; // Ganti dengan URL backend Anda jika perlu
  const symbol = currencyPairs[selectedPair];
  useEffect(() => {
    // Cek apakah user baru saja login
    if (localStorage.getItem('justLoggedIn') === 'true') {
      setShowPopup(true);
      localStorage.removeItem('justLoggedIn');
    }
  }, []);
  useEffect(() => {
    const period = `${selectedTimeframe}d`;
    fetch(`${url}/api/forex?symbol=${symbol}&period=${period}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) return;
        const formatted = data
          .filter((d) => d.Open != null && d.High != null && d.Low != null && d.Close != null)
          .map((d) => ({
            x: new Date(d.Datetime),
            y: [(d.Open).toFixed(4), (d.High).toFixed(4), (d.Low).toFixed(4), (d.Close).toFixed(4)],
          }));
        // Add a placeholder for tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow's date
        formatted.push({
          x: tomorrow,
          y: [null, null, null, null], // Empty data for tomorrow
        });
        setChartData(formatted);
        if (data.length > 1) {
          const closePrice = data[data.length - 2]?.Close; // Get the second-to-last close price
          setYesterdayClose(closePrice);
        }
      });
    if (selectedIndicator !== 'None') {
      fetch(`${url}/api/indicator?symbol=${symbol}&type=${selectedIndicator}&period=${period}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) return;
          const formatted = data.map((d) => ({
            x: new Date(d.Datetime),
            y: (d.Value).toFixed(4),
          }));
          setIndicatorData(formatted);
        });
    } else {
      setIndicatorData([]);
    }
    fetch(`${url}/predict?symbol=${symbol}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.predicted_close && data.predicted_high && data.predicted_low) {
          setDailyPrediction(data);
        } else {
          setDailyPrediction(null);
        }
      })
      .catch((err) => {
        console.error('Gagal fetch prediksi harian:', err);
        setDailyPrediction(null);
      });

    fetch(`${url}/api/zones?symbol=${symbol}&period=${period}`)
      .then((res) => res.json())
      .then((zones) => {
        if (zones.length === 0) return;
        const formattedZones = zones.map((z) => ({
          x: new Date(z.Datetime),
          y: z.Price,
          label: {
            borderColor: z.type.includes('Buy') ? '#00E396' : '#FF4560',
            style: {
              color: '#fff',
              background: z.type.includes('Buy') ? '#00E396' : '#FF4560',
            },
            text: z.type,
          },
        }));
        setZoneData(formattedZones);
      });

    fetch(`${url}/api/zones/counts?symbol=${symbol}&period=${period}`)
      .then((res) => res.json())
      .then((data) => setZoneCounts(data));
  }, [selectedPair, selectedTimeframe, selectedIndicator]);

  useEffect(() => {
    setWeeklyPredictions([]);
    setFutureHigh(null); // Reset futureHigh saat pair berubah

    fetch(`${url}/weekly?symbol=${symbol}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Weekly data received:', data); // Debug log

        if (Array.isArray(data) && data.length > 0) {
          const result = data.map((item) => {
            const [key, value] = Object.entries(item)[0];
            return {
              timeframe: key,
              classification: value.classification,
              probability: value.classification_probability,
              predictedClose: value.predicted_close_price,
            };
          });

          console.log('Processed weekly predictions:', result); // Debug log
          setWeeklyPredictions(result);

          // Add a placeholder for tomorrow's prediction
          const tomorrowPrediction = {
            classification: 'N/A',
            probability: null,
            predictedClose: null,
          };
          setWeeklyPredictions((prev) => [...prev, tomorrowPrediction]);

          // Filter out invalid values dan cari max
          const validPrices = result
            .map((item) => item.predictedClose)
            .filter((price) => price != null && !isNaN(price) && isFinite(price));

          if (validPrices.length > 0) {
            const maxpriceweek = Math.max(...validPrices);
            console.log('Future High calculated:', maxpriceweek); // Debug log
            setFutureHigh(maxpriceweek);
          } else {
            console.log('No valid prices found for futureHigh');
            setFutureHigh(null);
          }
        } else {
          console.log('No valid weekly data received');
          setWeeklyPredictions([]);
          setFutureHigh(null);
        }
      })
      .catch((err) => {
        console.error('Gagal fetch prediksi mingguan:', err);
        setWeeklyPredictions([]);
        setFutureHigh(null);
      });
  }, [selectedPair, selectedTimeframe]);

  const series = [
    { name: 'Candlestick', type: 'candlestick', data: chartData },
    { name: 'Indicator', type: 'line', data: indicatorData },
  ];
  const categoryToKey = {
    FastBuy: 'FBuy',
    FastSell: 'FSell',
    DelayedBuy: 'DBuy',
    DelayedSell: 'DSell',
  };
  // Debug futureHigh value
  console.log('Current futureHigh value:', futureHigh);
  console.log('futureHigh type:', typeof futureHigh);
  console.log(
    'Is futureHigh valid?',
    futureHigh != null && !isNaN(futureHigh) && isFinite(futureHigh),
  );
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    setUser(userStr ? JSON.parse(userStr) : null);
    // Debug output
    console.log('Loaded user:', userStr);
  }, [location]);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-2 text-black">Prediksi harga hari ini</h2>
            <h1 className="text-lg font-normal mb-2 text-black">Hai,  {user.username} semoga harimu menyenangkan. Kami memberikan insight untuk harga market minggu ini. Jangan lupa cek Notifikasi ya.</h1>
          </div>
        </div>
      )}
      <header className="flex items-center justify-between mb-8">
        <button
          className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
          onClick={onBack}
        >
          Kembali
        </button>
        <h1 className="text-2xl font-bold">Halaman Prediksi</h1>
        {user && (
          <div className="text-white text-xs sm:text-sm mr-2">
            Welcome, <span className="font-semibold">{user.username}</span>
            <span className="ml-2 text-gray-300">{user.email}</span>
          </div>
        )}
      </header>

      <main className="container mx-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(currencyPairs).map((pair) => (
            <button
              key={pair}
              className={`px-3 py-2 border border-gray-400 bg-gray-200 text-gray-800 cursor-pointer rounded-md transition-colors ${selectedPair === pair ? 'bg-blue-600 text-white border-blue-800' : 'hover:bg-gray-300'}`}
              onClick={() => setSelectedPair(pair)}
            >
              {pair}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="mr-2">Pilih Indikator: </label>
          <select
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-700 rounded-md text-white"
          >
            {indicators.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="mr-2">Pilih Timeframe: </label>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(parseInt(e.target.value))}
            className="p-2 border border-gray-600 bg-gray-700 rounded-md text-white"
          >
            {timeframes.map((tf) => (
              <option key={tf.value} value={tf.value}>
                {tf.label}
              </option>
            ))}
          </select>
        </div>

        {/* Debug info untuk futureHigh */}
        {futureHigh && (
          <div className="mb-4 p-2 bg-gray-800 rounded">
            <p className="text-sm text-yellow-400">
              Prediksi harga tertinggi minggu ini = {futureHigh.toFixed(4)}
            </p>
          </div>
        )}

        {chartData.length > 0 ? (
          <ApexChart
            options={{
              chart: {
                height: 500,
                type: 'candlestick',
                background: 'transparent',
              },
              title: {
                text: `${selectedPair} Candlestick Chart with ${selectedIndicator}`,
                align: 'left',
                style: { fontSize: '16px', fontWeight: 'bold', color: 'white' },
              },
              xaxis: {
                type: 'datetime',
                labels: { style: { colors: '#ffffff' } },
              },
              yaxis: {
                tooltip: { enabled: true },
                labels: { style: { colors: '#ffffff' } },
                valueFormatter: (val) => {
                  return val.toFixed(4);
                }
              },
              legend: { labels: { colors: '#ffffff' } },
              annotations: {
                points: zoneData,
                yaxis: [
                  ...(futureHigh && !isNaN(futureHigh)
                    ? [
                      {
                        y: futureHigh,
                        borderColor: '#FEB019',
                        borderWidth: 2,
                        strokeDashArray: 5,
                        label: {
                          borderColor: '#FEB019',
                          style: {
                            color: '#000',
                            background: '#FEB019',
                            fontSize: '12px',
                            fontWeight: 'bold',
                          },
                          text: `High Mingguan: ${futureHigh.toFixed(4)}`,
                          position: 'right',
                          offsetX: 0,
                          offsetY: 0,
                        },
                      },
                    ]
                    : []),

                  ...(dailyPrediction
                    ? [
                      {
                        y: dailyPrediction.predicted_high,
                        borderColor: '#FF4560',
                        label: {
                          borderColor: '#FF4560',
                          style: { color: '#000', background: '#FF4560' },
                          text: `Pred High: ${dailyPrediction.predicted_high.toFixed(4)}`,
                        },
                      },
                      {
                        y: dailyPrediction.predicted_close,
                        borderColor: '#00E396',
                        label: {
                          borderColor: '#00E396',
                          style: { color: '#000', background: '#00E396' },
                          text: `Pred Close: ${dailyPrediction.predicted_close.toFixed(4)}`,
                        },
                      },
                      {
                        y: dailyPrediction.predicted_low,
                        borderColor: '#775DD0',
                        label: {
                          borderColor: '#775DD0',
                          style: { color: '#000', background: '#775DD0' },
                          text: `Pred Low: ${dailyPrediction.predicted_low.toFixed(4)}`,
                        },
                      },
                    ]
                    : []),
                ],
              },

              theme: {
                mode: 'dark',
              },
            }}
            series={series}
            type="candlestick"
            height={500}
          />
        ) : (
          <p className="text-white">No data available for the chart.</p>
        )}

        {dailyPrediction && (
          <div className="mb-4 p-2 bg-gray-800 rounded">
            <p className="text-sm text-blue-400">
              Prediksi Harian - High: {dailyPrediction.predicted_high.toFixed(4)}, Close:{' '}
              {dailyPrediction.predicted_close.toFixed(4)}, Low:{' '}
              {dailyPrediction.predicted_low.toFixed(4)}
            </p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Prediksi Mingguan</h2>
          {weeklyPredictions.length > 0 ? (
            <table className="w-full text-sm bg-gray-800 border border-gray-600 rounded-md">
              <thead>
                <tr className="bg-gray-700 text-left">
                  <th className="p-2">Hari</th>
                  <th className="p-2">Prediksi</th>
                  <th className="p-2">Probabilitas Naik (%)</th>
                  <th className="p-2">Prediksi Close</th>
                  <th className="p-2">Prediksi P&L</th>
                </tr>
              </thead>
              <tbody>
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((hari, i) => {
                  const prediction = weeklyPredictions[i] || {
                    classification: 'N/A',
                    predictedClose: null,
                  };
                  const isUp = prediction.classification.toLowerCase() === 'naik';
                  const rowBg = isUp ? 'bg-green-600' : 'bg-red-600';

                  // Determine today's prediction
                  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
                  let predictionDayIndex = (today - 1) % 7; // Predict T+1 for Monday, T+2 for Tuesday, ..., T+5 for Friday, T+6 for Saturday, T+0 for Sunday

                  const isToday = i === predictionDayIndex;

                  // Calculate difference for today's prediction
                  const difference =
                    isToday && yesterdayClose != null
                      ? prediction.predictedClose - yesterdayClose
                      : null;

                  return (
                    <tr key={hari} className={`${rowBg} border-t border-gray-600`}>
                      <td className={`p-2 ${isToday ? 'bg-yellow-500' : ''}`}>{hari}</td>
                      <td className="p-2">{prediction.classification ?? '-'}</td>
                      <td className="p-2">
                        {prediction.probability != null
                          ? (prediction.probability * 100).toFixed(2)
                          : '-'}
                      </td>
                      <td className="p-2">
                        {prediction.predictedClose != null
                          ? prediction.predictedClose.toFixed(4)
                          : '-'}
                      </td>
                      {isToday && (
                        <td className="p-2">
                          {difference != null
                            ? `${difference > 0 ? '+' : ''}${difference.toFixed(4)}`
                            : '-'}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>Memuat prediksi mingguan...</p>
          )}
        </div>
        <div className="mt-8">
          {' '}
          {/* Changed from .zone-bar-chart */}
          <ApexChart
            options={{
              chart: { type: 'bar' },
              plotOptions: { bar: { distributed: true } },
              xaxis: {
                categories: ['FastBuy', 'FastSell', 'DelayedBuy', 'DelayedSell'],
                labels: { style: { colors: '#ffffff' } },
              },
              yaxis: { labels: { style: { colors: '#ffffff' } } },
              title: {
                text: 'Jumlah Zona & Insight (%)',
                align: 'center',
                style: { color: '#ffffff' },
              },
              dataLabels: {
                enabled: true,
                formatter: (val, opts) => {
                  const category = opts.w.globals.labels[opts.dataPointIndex];
                  const key = categoryToKey[category];
                  const pct = zoneCounts[`${key}_pct`] || 0;
                  return `${val} (${pct}%)`;
                },
              },
              legend: { labels: { colors: '#ffffff' } },
              tooltip: {
                y: {
                  formatter: (val, { dataPointIndex }) => {
                    const labels = ['FBuy', 'FSell', 'DBuy', 'DSell'];
                    const label = labels[dataPointIndex];
                    const pct = zoneCounts[`${label}_pct`] || 0;
                    const strength = zoneCounts[`${label}_strength`] || 0;
                    return `Jumlah: ${val}\nPersen: ${pct}%\nKekuatan: ${strength}%`;
                  },
                },
              },
              colors: ['#008FFB', '#FF4560', '#008FFB', '#FF4560'],
            }}
            series={[
              {
                name: 'Jumlah',
                data: [zoneCounts.FBuy, zoneCounts.FSell, zoneCounts.DBuy, zoneCounts.DSell],
              },
            ]}
            type="bar"
            height={500}
          />
        </div>
      </main>
    </div>
  );
}
