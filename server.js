const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const useragent = require('express-useragent');
const ngrok = require('ngrok');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/publics');
app.use(session({ secret: "your-secret-key", resave: true, saveUninitialized: true }));

const Router = require("./Router/RouterWeb");
const { url } = require("inspector");

/*
  Konfigurasi Ngrok
  perlu diingat bahwa ngrok perlu autentikasi,
  jika anda sudah mendaftar ngrok anda,
  anda bisa mengunakan kode program di bawah ini.
  jika belum ada bisa langsung mendaftar di situs ngrok,
  dan ikuti langkah langkah yang tertera

 (async () => {
     const url = await ngrok.connect({
       proto: 'http', // Dapat disesuaikan dengan 'http' atau 'tcp'
       addr: 8000,     // Port server lokal
     });
     console.log('Ngrok URL:', url);
   })();
  */
 
  //hanya boleh di buka mengunakan browser
app.use(useragent.express());
const allowedBrowsers = ['Chrome', 'Firefox', 'Microsoft Edge', 'Opera', 'UC Browser', 'Safari', 'iCab', 'Flock', 'Internet Explorer'];
app.use((req, res, next) => {
  const userAgent = req.useragent.browser;
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Mencetak informasi ke console
  console.log(`IP ${clientIP} membuka halaman dengan User-Agent: ${userAgent}`);

  // Periksa apakah browser diizinkan
  if (!allowedBrowsers.some(browser => userAgent.includes(browser))) {
    return res.status(403).send('GUNAKAN BROWSER YANG TERPERCAYA');
  }

  next();
});




// manapilkan Semua Router
app.use(Router);

// pemangggil server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});


//soket io
io.on('connection', (socket) => {
    console.log('Client connected');

    // Menanggapi event 'dataSaved' dari klien
    socket.on('dataSaved', () => {
        console.log('Data saved, triggering refresh');
        
        // Mengirim event 'refresh' ke klien
        io.emit('refresh');
    });

    // Menanggapi event 'disconnect' saat klien terputus
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
