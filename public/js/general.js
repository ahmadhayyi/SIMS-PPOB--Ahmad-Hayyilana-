const toggleSaldo = () =>{
    const viewsaldo = document.getElementById('viewsaldo');
    const closesaldo = document.getElementById('closesaldo');
    const btnView = document.getElementById('btnview');

    viewsaldo.classList.toggle('d-none')
    closesaldo.classList.toggle('d-none')

    btnView.innerHTML = (btnView.innerHTML == "Tutup Saldo" ? 'Buka Saldo' : 'Tutup Saldo');
}