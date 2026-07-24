let keranjang = JSON.parse(localStorage.getItem("cart")) || [];

function tambah(nama, harga){
    keranjang.push({nama, harga});
    localStorage.setItem("cart", JSON.stringify(keranjang));
    alert("Ditambahkan!");
}

function tampilKeranjang(){
    let list = document.getElementById("list");
    let total = 0;
    list.innerHTML = "";

    keranjang.forEach(item => {
        list.innerHTML += `<p>${item.nama} - Rp ${item.harga}</p>`;
        total += item.harga;
    });

    document.getElementById("total").innerText = "Total: Rp " + total;
}

function kirimWA(){
    let teks = "Pesanan:%0A";
    let total = 0;

    keranjang.forEach(item => {
        teks += item.nama + " - Rp " + item.harga + "%0A";
        total += item.harga;
    });

    teks += "Total: Rp " + total;

    window.open("https://wa.me/6285780620013?text=" + teks);
}