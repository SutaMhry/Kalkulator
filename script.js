var screen = document.querySelector("#screen");
var btns = document.querySelectorAll(".btn");
var historyList = document.querySelector("#historyList");

// Event listener untuk tombol kalkulator
btns.forEach((item) => {
  item.addEventListener("click", handleButtonClick); // Menambahkan event listener untuk tombol kalkulator
});

// Event listener untuk input dari keyboard
document.addEventListener("keydown", handleKeyPress); // Menambahkan event listener untuk input dari keyboard

// Trigonometric Functions
function sin() {
  screen.value += "sin(";
}

function cos() {
  screen.value += "cos(";
}

function tan() {
  screen.value += "tan(";
}

// Power Function (x^y)
function powXY() {
  if (!screen.value.endsWith("^")) {
    screen.value += "^";
  }
}

// Square Root Function
function sqrt() {
  screen.value += "√(";
}

// Logarithm Function (Base 10)
function log() {
  screen.value += "log(";
}

// Function to handle the entry of Pi (π)
function pi() {
  screen.value += "π";
}

// Function to handle the entry of Euler's constant (e)
function insertE() {
  screen.value += "e";
}

// Factorial Function
function fact() {
  screen.value += "!";
}

// Fungsi untuk menangani klik pada tombol kalkulator
function handleButtonClick(e) {
  let btntext = e.target.innerText; // Mendapatkan teks dari tombol yang diklik

  // Jika tombol yang diklik adalah koma (",")
  if (btntext === ",") {
    handleCommaInput(); // Panggil fungsi untuk menangani input koma
    return;
  }

  // Jika tombol yang diklik adalah persen ("%")
  if (btntext === "%") {
    screen.value += "%"; // Tambahkan simbol persen ke layar kalkulator
    return;
  }

  // Menangani simbol yang diklik
  switch (btntext) {
    case "×":
      btntext = "x"; // Ganti simbol "×" menjadi "x"
      break;
    case "÷":
      btntext = ":"; // Ganti simbol "÷" menjadi ":"
      break;
    case "!":
      screen.value += "!"; // Tambahkan simbol "!" ke layar kalkulator
      return;
    case "π":
      screen.value += "π"; // Tambahkan simbol "π" ke layar kalkulator
      return;
    case "e":
      screen.value += "e"; // Tambahkan simbol "e" ke layar kalkulator
      return;
    case "sin":
    case "cos":
    case "tan":
    case "√":
    case "log":
      screen.value += btntext + "("; // Tambahkan fungsi matematika dan buka tanda kurung
      return;
  }

  screen.value += btntext; // Menambahkan teks tombol ke layar kalkulator
  formatScreenValue(); // Format nilai di layar kalkulator

  // Memperbaiki ekspresi yang tidak valid
  screen.value = screen.value.replace("x*", "x").replace(":/", ":");
}

// Fungsi untuk menangani input keyboard
function handleKeyPress(e) {
  const key = e.key; // Mendapatkan tombol yang ditekan pada keyboard
  switch (key) {
    case ",":
      handleCommaInput(); // Panggil fungsi untuk menangani input koma
      e.preventDefault(); // Cegah aksi default
      break;
    case "e":
      screen.value += "e"; // Tambahkan simbol "e" ke layar kalkulator
      e.preventDefault(); // Cegah aksi default
      break;
    case "!":
      screen.value += "!"; // Tambahkan simbol "!" ke layar kalkulator
      e.preventDefault(); // Cegah aksi default
      break;
    case "*":
      handleMultiplicationKey(); // Panggil fungsi untuk menangani input perkalian
      e.preventDefault(); // Cegah aksi default
      break;
    case "/":
      handleDivisionKey(); // Panggil fungsi untuk menangani input pembagian
      e.preventDefault(); // Cegah aksi default
      break;
    case "Enter":
    case "=": // Tombol "=" berfungsi sama dengan tombol "Enter"
      evaluateExpression(); // Evaluasi ekspresi
      e.preventDefault(); // Cegah aksi default
      break;
    case "Backspace":
      backspc(); // Panggil fungsi untuk menangani tombol backspace
      e.preventDefault(); // Cegah aksi default
      break;
    case "Delete":
      screen.value = ""; // Hapus seluruh isi layar kalkulator
      formatScreenValue(); // Format nilai di layar kalkulator
      e.preventDefault(); // Cegah aksi default
      break;
    case "s":
      screen.value += "sin("; // Tambahkan "sin(" ke layar kalkulator
      break;
    case "c":
      screen.value += "cos("; // Tambahkan "cos(" ke layar kalkulator
      break;
    case "t":
      screen.value += "tan("; // Tambahkan "tan(" ke layar kalkulator
      break;
    case "p":
      screen.value += "π"; // Tambahkan "π" ke layar kalkulator
      break;
    case "l":
      screen.value += "log("; // Tambahkan "log(" ke layar kalkulator
      break;
    case "a":
      screen.value += "√("; // Tambahkan "√(" ke layar kalkulator
      break;
    case "%":
      screen.value += "%"; // Tambahkan simbol persen ke layar kalkulator
      break;
    case "(":
    case ")":
    case "^":
      screen.value += key; // Tambahkan tanda kurung atau simbol "^" ke layar kalkulator
      break;
    default:
      if (/[0-9+\-*/:^]/.test(key)) {
        screen.value += key; // Tambahkan angka atau operator ke layar kalkulator
        formatScreenValue(); // Format nilai di layar kalkulator
      }
  }

  // Memperbaiki ekspresi yang tidak valid
  screen.value = screen.value.replace("x*", "x").replace(":/", ":");
}

// Fungsi untuk menangani input koma
function handleCommaInput() {
  let lastNumber = screen.value.split(/[\+\-\*\/\^:]/).pop(); // Dapatkan angka terakhir
  if (!lastNumber.includes(",")) {
    screen.value += ","; // Tambahkan koma jika angka terakhir tidak mengandung koma
  }
}

// Fungsi untuk menangani input persen (%)
function handlePercentageInput() {
  if (screen.value !== "" && screen.value !== "Error") {
    const result = parseFloat(screen.value.replace(",", ".")) / 100; // Hitung persen
    screen.value = result.toString().replace(".", ","); // Tampilkan hasilnya di layar kalkulator
    addToHistory(`${screen.value}%`, result); // Tambahkan hasil ke riwayat kalkulator
  }
}

// Fungsi untuk menangani input perkalian pada keyboard
function handleMultiplicationKey() {
  if (screen.value.endsWith("*")) {
    screen.value = screen.value.slice(0, -1) + "x"; // Ubah simbol "*" menjadi "x" jika sudah ada di akhir
  } else if (screen.value) {
    screen.value += "x"; // Tambahkan simbol "x" untuk perkalian
  }
}

// Fungsi untuk menangani input pembagian pada keyboard
function handleDivisionKey() {
  if (screen.value.endsWith("/")) {
    screen.value = screen.value.slice(0, -1) + ":"; // Ubah simbol "/" menjadi ":" jika sudah ada di akhir
  } else if (screen.value) {
    screen.value += ":"; // Tambahkan simbol ":" untuk pembagian
  }
}

// Evaluasi ekspresi dengan memproses angka
function evaluateExpression() {
  try {
    // Jika layar kosong
    if (screen.value.trim() === "") {
      screen.value = "Kesalahan";
      return;
    }

    // Salin ekspresi untuk ditampilkan di layar
    let displayExpression = screen.value
      .replace(/\*/g, "x")
      .replace(/\//g, ":")
      .replace(/\^/g, "^");

    // Hapus titik untuk format ribuan dan ubah koma menjadi titik untuk desimal
    let expression = screen.value
      .replace(/\./g, "") // Menghapus titik sebagai pemisah ribuan
      .replace(",", "."); // Mengganti koma dengan titik untuk angka desimal

    // Tangani kasus 'π' (pi)
    expression = expression.replace(/(\d+)π/g, (_, n) => `${n}*${Math.PI}`); // 3π menjadi 3*Math.PI
    expression = expression.replace(/π/g, Math.PI.toString()); // π menjadi Math.PI

    // Tangani kasus 'e' (Euler's number)
    expression = expression.replace(
      /(\d+)e/g,
      (_, n) => `${n}*2.718281828459045`
    ); // 4e menjadi 4*Math.E
    expression = expression.replace(/\be\b/g, "2.718281828459045"); // e yang muncul sendiri menjadi Math.E

    // Ganti operator yang ditampilkan
    expression = expression
      .replace(/x/g, "*")
      .replace(/:/g, "/")
      .replace(/\^/g, "**");

    // Evaluasi fungsi trigonometri dan matematika lainnya
    const trigFunctions = ["sin", "cos", "tan", "log", "√"];
    trigFunctions.forEach((func) => {
      const regex = new RegExp(`${func}\\(([^)]+)\\)`, "g");
      expression = expression.replace(regex, (_, value) => {
        let result;
        switch (func) {
          case "sin":
            result = Math.sin(parseFloat(value));
            break;
          case "cos":
            result = Math.cos(parseFloat(value));
            break;
          case "tan":
            result = Math.tan(parseFloat(value));
            break;
          case "log":
            result = Math.log10(parseFloat(value));
            break;
          case "√":
            result = Math.sqrt(parseFloat(value));
            break;
        }
        return result.toString();
      });
    });

    // Evaluasi persen
    expression = expression.replace(/(\d+)%/g, (_, n) => parseFloat(n) / 100);

    // Evaluasi faktorial
    expression = expression.replace(/(\d+)!/g, (_, n) => {
      let result = 1;
      for (let i = 1; i <= n; i++) result *= i;
      return result;
    });

    // Tangani pembagian dengan nol
    if (expression.includes("/0")) {
      screen.value = "Tidak dapat membagi dengan nol";
      return;
    }

    // Evaluasi ekspresi
    let result = eval(expression);

    // Pastikan hasil akhir selalu menggunakan koma sebagai pemisah desimal
    result = result.toString().replace(".", ","); // Mengganti titik dengan koma untuk desimal

    // Menyimpan riwayat ekspresi dan hasil
    addToHistory(displayExpression, result);

    // Menampilkan hasil tanpa format ribuan dan dengan koma sebagai desimal
    screen.value = result;
  } catch (error) {
    console.error(error);
    screen.value = "Kesalahan"; // Jika ada kesalahan
  }
}

// Fungsi backspace (hapus karakter terakhir)
function backspc() {
  if (screen.value.length > 0) {
    // Hapus semua pemformatan ribuan
    let cleanValue = screen.value.replace(/\./g, "").replace(",", ".");

    // Hapus karakter terakhir
    cleanValue = cleanValue.slice(0, -1);

    // Kembalikan dengan pemformatan yang benar
    screen.value = formatNumber(cleanValue);
  }
}

// Menghapus format ribuan dan memastikan koma sebagai desimal
function formatScreenValue() {
  // Menghapus pemisah ribuan dan mengganti koma dengan titik untuk desimal
  const cleanValue = screen.value.replace(/\./g, "").replace(",", ".");
  screen.value = formatNumber(cleanValue); // Format kembali setelah dibersihkan
}

// Fungsi untuk memformat angka tanpa format ribuan
function formatNumber(num) {
  if (num === undefined || num === null) return "";

  let numStr = num.toString();

  // Jika angka adalah desimal (memiliki tanda titik)
  if (numStr.includes(".")) {
    // Ganti titik dengan koma untuk format desimal
    return numStr.replace(".", ",");
  }

  return numStr; // Jika bukan desimal, kembalikan angka biasa tanpa format ribuan
}

// Fungsi untuk menambahkan entry baru ke dalam history
function addToHistory(expression, result) {
  const historyEntry = { expression, result };
  
  let history = JSON.parse(localStorage.getItem("calculatorHistory") || "[]");
  history.push(historyEntry);
  localStorage.setItem("calculatorHistory", JSON.stringify(history));

  displayHistory(); // Untuk menampilkan history yang terupdate
}


// Fungsi untuk menampilkan history
function displayHistory() {
  const historyList = document.getElementById("historyList");
  if (!historyList) return;  // Pastikan historyList ada

  // Ambil history dari localStorage
  let history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

  // Kosongkan daftar history sebelumnya
  historyList.innerHTML = '';

  // Tambahkan setiap entry ke dalam list
  history.forEach((entry) => {
    const historyEntry = document.createElement("li");
    historyEntry.innerText = `${entry.expression} = ${entry.result}`;
    historyList.appendChild(historyEntry);
  });

  // Scroll otomatis ke bawah
  historyList.scrollTop = historyList.scrollHeight;
}

// Fungsi untuk memanggil dan menampilkan history dari localStorage
function loadHistoryFromStorage() {
  const history = JSON.parse(localStorage.getItem("calculatorHistory") || "[]");
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = ""; // Kosongkan history yang ada sebelumnya
  
  history.forEach((entry) => {
    const historyEntry = document.createElement("li");
    const sanitizedExpression = entry.expression.replace(/\*/g, "x").replace(/\//g, ":").replace(/√/g, "√");
    historyEntry.innerText = `${sanitizedExpression} = ${entry.result}`;
    historyList.appendChild(historyEntry);
  });
}


// Fungsi untuk membersihkan history
function clearHistory() {
  localStorage.removeItem("calculatorHistory");
  displayHistory();  // Tampilkan history yang sudah dibersihkan
}

// Memuat history saat halaman kalkulator dimuat
document.addEventListener("DOMContentLoaded", loadHistoryFromStorage);
