let keranjang = JSON.parse(localStorage.getItem("cart")) || [];

function simpan(){
    localStorage.setItem("cart", JSON.stringify(keranjang));
}

function tambah(nama, harga){
    let item = keranjang.find(i => i.nama === nama);

    if(item){
        item.qty += 1;
    } else {
        keranjang.push({nama, harga, qty:1});
    }

    simpan();
    alert("Ditambahkan ke keranjang!");
}

function tampilKeranjang(){
    let list = document.getElementById("list");
    let total = 0;
    list.innerHTML = "";

    keranjang.forEach((item, index) => {
        let subtotal = item.harga * item.qty;
        total += subtotal;

        list.innerHTML += `
        <div class="item">
            <h3>${item.nama}</h3>
            <p>Rp ${item.harga}</p>

            <div class="qty">
                <button onclick="kurang(${index})">➖</button>
                <span>${item.qty}</span>
                <button onclick="tambah('${item.nama}', ${item.harga})">➕</button>
            </div>

            <p>Subtotal: Rp ${subtotal}</p>
            <button onclick="hapus(${index})">❌ Hapus</button>
        </div>
        `;
    });

    document.getElementById("total").innerText = "Total: Rp " + total;
}

function kurang(index){
    keranjang[index].qty -= 1;

    if(keranjang[index].qty <= 0){
        keranjang.splice(index,1);
    }

    simpan();
    tampilKeranjang();
}

function hapus(index){
    keranjang.splice(index,1);
    simpan();
    tampilKeranjang();
}

function kirimWA(){
    let teks = "Pesanan:%0A";
    let total = 0;

    keranjang.forEach(item => {
        teks += `${item.nama} (${item.qty}x) - Rp ${item.harga * item.qty}%0A`;
        total += item.harga * item.qty;
    });

    teks += "Total: Rp " + total;

    window.open("https://wa.me/6285780620013?text=" + teks);
}
