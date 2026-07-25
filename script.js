// ================================
// AIRLIANA VEGGIES
// ================================

// Ambil data keranjang
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

// ================================
// TAMBAH KE KERANJANG
// ================================
function tambahKeranjang(nama, harga) {

    let produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    simpanKeranjang();

    alert("✅ " + nama + " berhasil ditambahkan!");
}

// ================================
// SIMPAN
// ================================
function simpanKeranjang() {

    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    tampilKeranjang();

}

// ================================
// TAMPILKAN KERANJANG
// ================================
function tampilKeranjang() {

    const isi = document.getElementById("isiKeranjang");

    if (!isi) return;

    isi.innerHTML = "";

    let subtotal = 0;

    keranjang.forEach((item, index) => {

        let total = item.harga * item.jumlah;

        subtotal += total;

        isi.innerHTML += `
        <tr>

        <td>${item.nama}</td>

        <td>Rp${item.harga.toLocaleString()}</td>

        <td>

        <button onclick="kurangJumlah(${index})">-</button>

        ${item.jumlah}

        <button onclick="tambahJumlah(${index})">+</button>

        </td>

        <td>Rp${total.toLocaleString()}</td>

        <td>

        <button onclick="hapusProduk(${index})">
        🗑 Hapus
        </button>

        </td>

        </tr>
        `;

    });

    let ongkir = subtotal >= 50000 ? 0 : 10000;

    document.getElementById("subtotal").innerHTML =
    "Subtotal : Rp" + subtotal.toLocaleString();

    document.getElementById("ongkir").innerHTML =
    "Ongkos Kirim : Rp" + ongkir.toLocaleString();

    document.getElementById("grandTotal").innerHTML =
    "Grand Total : Rp" + (subtotal + ongkir).toLocaleString();

}

// ================================
// TAMBAH JUMLAH
// ================================
function tambahJumlah(index){

    keranjang[index].jumlah++;

    simpanKeranjang();

}

// ================================
// KURANG JUMLAH
// ================================
function kurangJumlah(index){

    if(keranjang[index].jumlah > 1){

        keranjang[index].jumlah--;

    }else{

        keranjang.splice(index,1);

    }

    simpanKeranjang();

}

// ================================
// HAPUS PRODUK
// ================================
function hapusProduk(index){

    if(confirm("Hapus produk ini?")){

        keranjang.splice(index,1);

        simpanKeranjang();

    }

}

// ================================
// CHECKOUT
// ================================
function checkout(){

    if(keranjang.length==0){

        alert("Keranjang masih kosong!");

        return;

    }

    alert("🎉 Terima kasih telah berbelanja di AirLiana Veggies.");

    keranjang=[];

    simpanKeranjang();

}

// ================================
// LOAD HALAMAN
// ================================
document.addEventListener("DOMContentLoaded", tampilKeranjang);
// ================================
// SEARCH PRODUK
// ================================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", function () {

        let keyword = this.value.toLowerCase().trim();

        document.querySelectorAll(".produk").forEach(function(item){

            let nama = item.querySelector("h3").textContent.toLowerCase();

            if(nama.includes(keyword)){

                item.style.display = "";

            }else{

                item.style.display = "none";

            }

        });

    });

}


// ================================
// FILTER KATEGORI
// ================================

const kategori = document.querySelectorAll(".kategori-grid div");

kategori.forEach(function(btn){

    btn.addEventListener("click",function(){

        let pilih = this.innerText.toLowerCase();

        const produk = document.querySelectorAll(".produk");

        produk.forEach(function(item){

            let nama = item.querySelector("h3").innerText.toLowerCase();

            if(
                pilih.includes("daun") &&
                (
                    nama.includes("bayam") ||
                    nama.includes("kangkung") ||
                    nama.includes("sawi") ||
                    nama.includes("selada") ||
                    nama.includes("pakcoy")
                )
            ){

                item.style.display="block";

            }

            else if(
                pilih.includes("umbi") &&
                nama.includes("wortel")
            ){

                item.style.display="block";

            }

            else if(
                pilih.includes("brokoli") &&
                nama.includes("brokoli")
            ){

                item.style.display="block";

            }

            else if(
                pilih.includes("buah") &&
                nama.includes("tomat")
            ){

                item.style.display="block";

            }

            else{

                item.style.display="none";

            }

        });

    });

});


// ================================
// RESET FILTER
// ================================

const logo=document.querySelector(".logo");

if(logo){

logo.addEventListener("click",function(){

document.querySelectorAll(".produk").forEach(function(item){

item.style.display="block";

});

});

}


// ================================
// NOTIFIKASI
// ================================

function tampilNotifikasi(teks){

const notif=document.createElement("div");

notif.innerHTML=teks;

notif.style.position="fixed";

notif.style.top="20px";

notif.style.right="20px";

notif.style.background="#4CAF50";

notif.style.color="white";

notif.style.padding="15px";

notif.style.borderRadius="10px";

notif.style.zIndex="9999";

notif.style.boxShadow="0 5px 15px rgba(0,0,0,.2)";

document.body.appendChild(notif);

setTimeout(function(){

notif.remove();

},2500);

}


// ================================
// GANTI ALERT TAMBAH KERANJANG
// ================================

function tambahKeranjang(nama,harga){

let produk=keranjang.find(item=>item.nama===nama);

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


// ================================
// POPUP PROMO
// ================================

window.addEventListener("load",function(){

setTimeout(function(){

if(!sessionStorage.getItem("promo")){

alert("🎉 PROMO HARI INI\n\nDiskon 20% minimal belanja Rp100.000");

sessionStorage.setItem("promo","sudah");

}

},1500);

});

// ===========================================
// AIRLIANA VEGGIES - BAGIAN 3
// Flash Sale • Scroll To Top • Badge Keranjang
// Responsive Menu • Rating Produk
// ===========================================


// ===============================
// FLASH SALE COUNTDOWN
// ===============================

const flashSale = document.getElementById("countdown");

if (flashSale) {

let waktu = 7200;

setInterval(() => {

let jam = Math.floor(waktu / 3600);

let menit = Math.floor((waktu % 3600) / 60);

let detik = waktu % 60;

flashSale.innerHTML =
`${jam.toString().padStart(2,"0")} :
${menit.toString().padStart(2,"0")} :
${detik.toString().padStart(2,"0")}`;

if(waktu>0){

waktu--;

}else{

flashSale.innerHTML="FLASH SALE BERAKHIR";

}

},1000);

}



// ===============================
// SCROLL TO TOP
// ===============================

const tombol=document.createElement("button");

tombol.innerHTML="⬆";

tombol.id="scrollTop";

document.body.appendChild(tombol);

tombol.style.position="fixed";
tombol.style.bottom="25px";
tombol.style.right="25px";
tombol.style.display="none";
tombol.style.padding="12px";
tombol.style.borderRadius="50%";
tombol.style.border="none";
tombol.style.cursor="pointer";
tombol.style.background="#4CAF50";
tombol.style.color="white";
tombol.style.fontSize="18px";
tombol.style.boxShadow="0 5px 15px rgba(0,0,0,.3)";
tombol.style.zIndex="9999";

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

tombol.style.display="block";

}else{

tombol.style.display="none";

}

});

tombol.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};




// ===============================
// BADGE JUMLAH KERANJANG
// ===============================

function updateBadge(){

const link=document.querySelector('a[href="keranjang.html"]');

if(!link) return;

let total=0;

keranjang.forEach(item=>{

total+=item.jumlah;

});

let badge=document.getElementById("badgeKeranjang");

if(!badge){

badge=document.createElement("span");

badge.id="badgeKeranjang";

badge.style.background="red";

badge.style.color="white";

badge.style.padding="2px 8px";

badge.style.borderRadius="20px";

badge.style.marginLeft="6px";

badge.style.fontSize="12px";

link.appendChild(badge);

}

badge.innerHTML=total;

}

updateBadge();




// ===============================
// RESPONSIVE MENU
// ===============================

const nav=document.querySelector("nav");

if(nav){

const menu=document.createElement("button");

menu.innerHTML="☰";

menu.className="menu-toggle";

menu.style.display="none";

document.querySelector(".navbar").prepend(menu);

function cekUkuran(){

if(window.innerWidth<768){

menu.style.display="block";

nav.style.display="none";

}else{

menu.style.display="none";

nav.style.display="flex";

}

}

cekUkuran();

window.addEventListener("resize",cekUkuran);

menu.onclick=function(){

if(nav.style.display==="none"){

nav.style.display="flex";

nav.style.flexDirection="column";

}else{

nav.style.display="none";

}

};

}




// ===============================
// RATING PRODUK
// ===============================

document.querySelectorAll(".card").forEach(card=>{

let rating=card.querySelector("p");

if(rating && rating.innerHTML.includes("⭐⭐⭐⭐⭐")){

rating.innerHTML="⭐⭐⭐⭐⭐ (4.9 / 5)";

}

});




// ===============================
// UPDATE BADGE SETIAP PERUBAHAN
// ===============================

const simpanLama=simpanKeranjang;

simpanKeranjang=function(){

simpanLama();

updateBadge();

};




// ===============================
// PESAN SELAMAT DATANG
// ===============================

window.addEventListener("load",()=>{

console.log("AirLiana Veggies Siap Digunakan 🌿");

});
