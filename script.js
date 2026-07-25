// ==========================================
// AIRLIANA VEGGIES
// SCRIPT.JS FINAL
// BAGIAN 1
// ==========================================

// ================================
// DATA KERANJANG
// ================================

let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

 
// ================================
// SIMPAN KE LOCAL STORAGE
// ================================

function simpanKeranjang() {

    localStorage.setItem(
        "keranjang",
        JSON.stringify(keranjang)
    );

    updateBadge();

}


// ================================
// UPDATE BADGE KERANJANG
// ================================

function updateBadge() {

    const badge = document.getElementById("badgeKeranjang");

    if (!badge) return;

    let jumlah = 0;

    keranjang.forEach(function(item){

        jumlah += item.jumlah;

    });

    badge.textContent = jumlah;

    if(jumlah === 0){

        badge.style.display = "none";

    }else{

        badge.style.display = "inline-block";

    }

}


// ================================
// NOTIFIKASI
// ================================

function tampilNotifikasi(pesan){

    let notif = document.getElementById("notifProduk");

    if(notif){

        notif.remove();

    }

    notif = document.createElement("div");

    notif.id = "notifProduk";

    notif.innerHTML = pesan;

    notif.style.position = "fixed";

    notif.style.top = "20px";

    notif.style.right = "20px";

    notif.style.background = "#4CAF50";

    notif.style.color = "#fff";

    notif.style.padding = "12px 18px";

    notif.style.borderRadius = "10px";

    notif.style.boxShadow = "0 5px 15px rgba(0,0,0,.25)";

    notif.style.zIndex = "9999";

    document.body.appendChild(notif);

    setTimeout(function(){

        notif.remove();

    },2500);

}



// ================================
// TAMBAH KE KERANJANG
// ================================

function tambahKeranjang(nama,harga){

    let produk = keranjang.find(function(item){

        return item.nama === nama;

    });

    if(produk){

        produk.jumlah++;

    }else{

        keranjang.push({

            nama:nama,

            harga:harga,

            jumlah:1

        });

    }

    simpanKeranjang();

    tampilNotifikasi("✅ "+nama+" berhasil ditambahkan");

}
function tambahPaket(nama,harga,isi){

    let produk = keranjang.find(function(item){

        return item.nama === nama;

    });

    if(produk){

        produk.jumlah++;

    }else{

        keranjang.push({

            nama:nama,
            harga:harga,
            jumlah:1,
            isi:isi

        });

    }

    simpanKeranjang();

    tampilNotifikasi("🥗 "+nama+" berhasil ditambahkan");

}


// ================================
// LOAD HALAMAN
// ================================

document.addEventListener("DOMContentLoaded",function(){

    updateBadge();

});
// ==========================================
// AIRLIANA VEGGIES
// SCRIPT.JS FINAL
// BAGIAN 2
// TAMPILKAN KERANJANG
// ==========================================


// ================================
// TAMPILKAN ISI KERANJANG
// ================================

function tampilKeranjang(){

    const isi = document.getElementById("isiKeranjang");

    if(!isi) return;

    isi.innerHTML = "";

    let subtotal = 0;

    keranjang.forEach(function(item,index){

        let total = item.harga * item.jumlah;

        subtotal += total;

        isi.innerHTML += `

<tr>

<td>

<b>${item.nama}</b>

${item.isi ? "<br><small>"+item.isi+"</small>" : ""}

</td>

<td>Rp${item.harga.toLocaleString("id-ID")}</td>

<td>

<button onclick="kurangJumlah(${index})">➖</button>

<span style="margin:0 10px;">
${item.jumlah}
</span>

<button onclick="tambahJumlah(${index})">➕</button>

</td>

<td>

Rp${total.toLocaleString("id-ID")}

</td>

<td>

<button onclick="hapusProduk(${index})">

🗑 Hapus

</button>

</td>

</tr>

`;

    });

    const ongkir = subtotal >= 50000 ? 0 : 10000;

    const grandTotal = subtotal + ongkir;

    const sub = document.getElementById("subtotal");

    const ong = document.getElementById("ongkir");

    const grand = document.getElementById("grandTotal");

    if(sub){

        sub.innerHTML =
        "Subtotal : Rp" +
        subtotal.toLocaleString("id-ID");

    }

    if(ong){

        ong.innerHTML =
        "Ongkir : Rp" +
        ongkir.toLocaleString("id-ID");

    }

    if(grand){

        grand.innerHTML =
        "Grand Total : Rp" +
        grandTotal.toLocaleString("id-ID");

    }

}



// ================================
// TAMBAH JUMLAH
// ================================

function tambahJumlah(index){

    keranjang[index].jumlah++;

    simpanKeranjang();

    tampilKeranjang();

}



// ================================
// KURANG JUMLAH
// ================================

function kurangJumlah(index){

    if(keranjang[index].jumlah>1){

        keranjang[index].jumlah--;

    }else{

        keranjang.splice(index,1);

    }

    simpanKeranjang();

    tampilKeranjang();

}



// ================================
// HAPUS PRODUK
// ================================

function hapusProduk(index){

    if(confirm("Hapus produk ini?")){

        keranjang.splice(index,1);

        simpanKeranjang();

        tampilKeranjang();

        tampilNotifikasi("🗑 Produk dihapus");

    }

}



// ================================
// LOAD HALAMAN
// ================================

document.addEventListener("DOMContentLoaded",function(){

    updateBadge();

    tampilKeranjang();

});
// ==========================================
// AIRLIANA VEGGIES
// SCRIPT.JS FINAL
// BAGIAN 3
// SEARCH + CHECKOUT WHATSAPP
// ==========================================


// ================================
// SEARCH PRODUK
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("search");

    if (!search) return;

    search.addEventListener("input", function () {

        const keyword = this.value.toLowerCase().trim();

        const semuaProduk = document.querySelectorAll(".produk");

        semuaProduk.forEach(function (produk) {

            const nama = produk.querySelector("h3").textContent.toLowerCase();

            if (nama.includes(keyword)) {

                produk.style.display = "";

            } else {

                produk.style.display = "none";

            }

        });

    });

});




// ================================
// HITUNG SUBTOTAL
// ================================

function hitungSubtotal() {

    let subtotal = 0;

    keranjang.forEach(function(item){

        subtotal += item.harga * item.jumlah;

    });

    return subtotal;

}




// ================================
// HITUNG ONGKIR
// ================================

function hitungOngkir(){

    const subtotal = hitungSubtotal();

    if(subtotal >= 50000){

        return 0;

    }

    return subtotal === 0 ? 0 : 10000;

}




// ================================
// HITUNG TOTAL
// ================================

function hitungTotal(){

    return hitungSubtotal() + hitungOngkir();

}




// ================================
// CHECKOUT WHATSAPP
// ================================

function checkout(){

    if(keranjang.length===0){

        alert("Keranjang masih kosong!");

        return;

    }

    let pesan = "Halo AirLiana Veggies%0A%0A";

    pesan += "Saya ingin memesan:%0A%0A";

    keranjang.forEach(function(item){

        pesan +=
        "• " +
        item.nama +
        " x" +
        item.jumlah +
        " = Rp" +
        (item.harga*item.jumlah).toLocaleString("id-ID") +
        "%0A";

    });

    pesan += "%0A";

    pesan +=
    "Subtotal : Rp" +
    hitungSubtotal().toLocaleString("id-ID") +
    "%0A";

    pesan +=
    "Ongkir : Rp" +
    hitungOngkir().toLocaleString("id-ID") +
    "%0A";

    pesan +=
    "Total : Rp" +
    hitungTotal().toLocaleString("id-ID") +
    "%0A%0A";

    pesan += "Nama : %0A";
    pesan += "Alamat : %0A";
    pesan += "No. HP : %0A";
    pesan += "Catatan : %0A";

    window.open(
        "https://wa.me/6285780620013?text=" + pesan,
        "_blank"
    );

}
// ==========================================
// AIRLIANA VEGGIES
// SCRIPT.JS FINAL
// BAGIAN 4
// FILTER + POPUP + FLASH SALE
// ==========================================



// ================================
// FILTER KATEGORI
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const kategori = document.querySelectorAll(".kategori-grid div");

    if (kategori.length === 0) return;

    kategori.forEach(function(item){

        item.addEventListener("click", function(){

            let pilih = this.innerText.toLowerCase();

            document.querySelectorAll(".produk").forEach(function(card){

                let nama = card.querySelector("h3").innerText.toLowerCase();

                let tampil = true;

                if(pilih.includes("daun")){

                    tampil =
                    nama.includes("bayam") ||
                    nama.includes("kangkung") ||
                    nama.includes("pakcoy") ||
                    nama.includes("sawi") ||
                    nama.includes("selada");

                }

                else if(pilih.includes("umbi")){

                    tampil =
                    nama.includes("wortel");

                }

                else if(pilih.includes("brokoli")){

                    tampil =
                    nama.includes("brokoli");

                }

                else if(pilih.includes("buah")){

                    tampil =
                    nama.includes("tomat");

                }

                else if(pilih.includes("cabai")){

                  tampil =
                  nama.includes("cabai");

                }

                else if(pilih.includes("bumbu")){

                   tampil =
                   nama.includes("bawang");

                 }

                else if(pilih.includes("jamur")){

                   tampil =
                   nama.includes("jamur");

                 }

               else if(pilih.includes("paket")){

                   tampil = false;

                }

                card.style.display = tampil ? "" : "none";

            });

        });

    });

});



// ================================
// POPUP PROMO
// ================================

window.addEventListener("load", function(){

    if(sessionStorage.getItem("promoSudah")) return;

    setTimeout(function(){

        alert(
            "🎉 PROMO HARI INI\n\n" +
            "✅ Diskon 20%\n" +
            "✅ Gratis Ongkir Yogyakarta\n" +
            "✅ Cashback hingga Rp20.000"
        );

        sessionStorage.setItem("promoSudah","ya");

    },2000);

});




// ================================
// FLASH SALE COUNTDOWN
// ================================

let waktu = 7200;

const countdown = setInterval(function(){

    const jam = Math.floor(waktu/3600);

    const menit = Math.floor((waktu%3600)/60);

    const detik = waktu%60;

    const teks =
    String(jam).padStart(2,"0")+":"+
    String(menit).padStart(2,"0")+":"+
    String(detik).padStart(2,"0");

    const timer = document.getElementById("countdown");

    if(timer){

        timer.innerHTML = teks;

    }

    if(waktu<=0){

        clearInterval(countdown);

        if(timer){

            timer.innerHTML="FLASH SALE BERAKHIR";

        }

    }

    waktu--;

},1000);
// ==========================================
// AIRLIANA VEGGIES
// SCRIPT.JS FINAL
// BAGIAN 5
// SCROLL TOP + MENU + LOAD
// ==========================================



// ================================
// SCROLL TO TOP
// ================================

const tombolAtas = document.createElement("button");

tombolAtas.innerHTML = "⬆";

tombolAtas.id = "scrollTop";

tombolAtas.style.position = "fixed";
tombolAtas.style.bottom = "20px";
tombolAtas.style.right = "20px";
tombolAtas.style.width = "50px";
tombolAtas.style.height = "50px";
tombolAtas.style.border = "none";
tombolAtas.style.borderRadius = "50%";
tombolAtas.style.background = "#4CAF50";
tombolAtas.style.color = "white";
tombolAtas.style.fontSize = "20px";
tombolAtas.style.cursor = "pointer";
tombolAtas.style.display = "none";
tombolAtas.style.zIndex = "999";

document.body.appendChild(tombolAtas);



window.addEventListener("scroll", function(){

    if(window.scrollY > 300){

        tombolAtas.style.display = "block";

    }else{

        tombolAtas.style.display = "none";

    }

});



tombolAtas.addEventListener("click", function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});




// ================================
// RESPONSIVE MENU
// ================================

document.addEventListener("DOMContentLoaded",function(){

    const tombol = document.querySelector(".menu-toggle");

    const nav = document.querySelector("nav");

    if(!tombol || !nav) return;

    tombol.addEventListener("click",function(){

        nav.classList.toggle("active");

    });

});




// ================================
// EFEK TOMBOL PRODUK
// ================================

document.addEventListener("DOMContentLoaded",function(){

    document.querySelectorAll(".produk button").forEach(function(btn){

        btn.addEventListener("mouseenter",function(){

            this.style.transform="scale(1.05)";

        });

        btn.addEventListener("mouseleave",function(){

            this.style.transform="scale(1)";

        });

    });

});




// ================================
// LOAD SEMUA
// ================================

document.addEventListener("DOMContentLoaded",function(){

    updateBadge();

    if(document.getElementById("isiKeranjang")){

        tampilKeranjang();

    }

});

function kosongkanKeranjang(){

    if(keranjang.length===0){

        alert("Keranjang sudah kosong.");

        return;

    }

    if(confirm("Yakin ingin mengosongkan keranjang?")){

        keranjang = [];

        simpanKeranjang();

        tampilKeranjang();

        tampilNotifikasi("🗑 Keranjang dikosongkan");

    }

}

// ================================
// DARK MODE
// ================================

document.addEventListener("DOMContentLoaded",function(){

const tombol=document.getElementById("darkModeBtn");

if(!tombol) return;

// cek mode yang tersimpan
if(localStorage.getItem("mode")=="dark"){

document.body.classList.add("dark");

tombol.innerHTML="☀";

}

tombol.onclick=function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("mode","dark");

tombol.innerHTML="☀";

}else{

localStorage.setItem("mode","light");

tombol.innerHTML="🌙";

}

}

});

console.log("✅ AirLiana Veggies Script Loaded");
