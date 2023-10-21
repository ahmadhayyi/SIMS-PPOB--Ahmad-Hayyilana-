const btnNomimal = (number) => {
    const nominal = document.getElementById('nominal');
    const angka = document.getElementById('angka');
    const formattedNominal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number);

    const formattedValue = formattedNominal.replace(/,00$/, '');

    nominal.value = formattedValue;
    angka.innerHTML = formattedValue;
    cekTopup()
}

function inpNomimal() {
    const nominalInput = document.getElementById('nominal');
    const angka = document.getElementById('angka');
    let value = nominalInput.value;

    value = value.replace(/[^0-9.]/g, '');

    value = value.replace(/^0+/, '');

    let numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));

    if (!isNaN(numericValue)) {
        value = 'Rp ' + numericValue.toLocaleString('id-ID', { minimumFractionDigits: 0 });
    } else {
        value = 'Rp ';
    }

    nominalInput.value = value;
    angka.innerHTML = value;
    cekTopup()
}

function cekTopup() {
    const nominal = document.getElementById('nominal');
    const btnTopup = document.getElementById('btntopup');
    
    const nominalText = nominal.value.replace(/[^\d]/g, '');
    
    const nominalValue = parseFloat(nominalText);

    if (!isNaN(nominalValue) && nominalValue >= 10000 && nominalValue <= 1000000) {
        btnTopup.classList.add('btn-danger');
        btnTopup.classList.remove('btn-secondary');
        btnTopup.disabled = false;
    } else {
        btnTopup.classList.remove('btn-danger');
        btnTopup.classList.add('btn-secondary');
        btnTopup.disabled = true;
    }
}