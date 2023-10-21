const btnNomimal = (number) => {
    const nominal = document.getElementById('nominal');
    const angka = document.getElementById('angka');
    const formattedNominal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number);

    // Menghilangkan koma dan dua angka desimal terakhir
    const formattedValue = formattedNominal.replace(/,00$/, '');

    nominal.value = formattedValue;
    angka.innerHTML = formattedValue;
    cekTopup()
}

function inpNomimal() {
    const nominalInput = document.getElementById('nominal');
    const angka = document.getElementById('angka');
    let value = nominalInput.value;

    // Hilangkan karakter selain angka dan titik (.)
    value = value.replace(/[^0-9.]/g, '');

    // Hapus nol di depan jika ada
    value = value.replace(/^0+/, '');

    // Konversi ke angka (tanpa tanda ribuan)
    let numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));

    if (!isNaN(numericValue)) {
        // Format nilai menjadi format mata uang Rupiah
        value = 'Rp ' + numericValue.toLocaleString('id-ID', { minimumFractionDigits: 0 });
    } else {
        value = 'Rp ';
    }

    // Setel nilai kembali ke input
    nominalInput.value = value;
    angka.innerHTML = value;
    cekTopup()
}

function cekTopup() {
    const nominal = document.getElementById('nominal');
    const btnTopup = document.getElementById('btntopup');
    
    // Menghapus karakter non-angka, seperti "Rp" dan tanda ribuan
    const nominalText = nominal.value.replace(/[^\d]/g, '');
    
    // Mengonversi teks ke angka
    const nominalValue = parseFloat(nominalText);

    if (!isNaN(nominalValue) && nominalValue >= 10000 && nominalValue <= 1000000) {
        btnTopup.classList.add('btn-danger');
        btnTopup.classList.remove('btn-secondary');
        btnTopup.disabled = false;
        nominal.classList.remove('is-invalid')
    } else {
        btnTopup.classList.remove('btn-danger');
        btnTopup.classList.add('btn-secondary');
        btnTopup.disabled = true;
        nominal.classList.add('is-invalid')
    }
}