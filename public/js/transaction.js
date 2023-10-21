const showAll = () => {
    const showMore = document.getElementById('show-all')
    showMore.classList.add('d-none');
    
    const lastTransaction = document.querySelectorAll('.last-transaction');
    lastTransaction.forEach(el => el.classList.add('d-none'))

    const allTransaction = document.querySelectorAll('.all-transaction');
    allTransaction.forEach(el => el.classList.remove('d-none'))

    const judul = document.getElementById('judul');
    judul.innerHTML = 'Semua Transaksi'
}

const showMore =  (month) => {
    const offset = document.querySelectorAll(`.list-data-${month}`).length
    const loader = document.getElementById('loader');
    loader.classList.toggle('d-none')
    fetch(`/transaction?offset=${offset}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        listData(data, month);
        loader.classList.toggle('d-none')
    })
    .catch(error => {
        console.error(error)
    })
}

const listData =  (data, bulan) => {
    const group = document.querySelector(`.list-group-${bulan}`);
    const showmore = document.querySelector(`.show-more-${bulan}`);
    showmore.remove()

    const namaBulan = ["Januari", "Februari", "Maret", "April", 
                    "Mei", "Juni", "Juli", "Agustus", 
                    "September", "Oktober", "November", "Desember"]; 

    let newLi = '';
    
    let getData = 0;
    data.data.records.forEach(transaksi => {
        const createdOn = new Date(transaksi.created_on)
        const month = createdOn.getMonth();
        const day = createdOn.getDate();
        const year = createdOn.getFullYear();
        const jam = createdOn.getHours();
        const menit = createdOn.getMinutes();

        if(month == bulan && getData < 5){
            getData++
            newLi  +=  `<div class='card my-3 list-data-${bulan}'>
                            <div class='card-body'>
                                <div class='row'>
                                    <div class='col-6'>
                                        <div class='fw-bolder mb-1 fs-5 ${transaksi.transaction_type == 'TOPUP' ? 'text-success' : 'text-danger'} text-success'>+ Rp. ${transaksi.total_amount.toLocaleString('id-ID')}</div>
                                        <small class='text-small fw-normal fs-8'>${day} ${namaBulan[month]} ${year} </small> <small class='text-small fw-normal fs-8 ms-1'> ${jam}:${menit} WIB</small>
                                    </div>
                                    <div class='col-6 text-end'>
                                        <small class='text-small fw-normal fs-8'>${transaksi.description}</small>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        }

    })

    if (getData !== 0) {
        newLi += `<a class="text-center text-decoration-none fw-semibold text-danger d-block mt-3 show-more-${bulan}" onclick="showMore('${bulan}')" style="cursor: pointer;">Lainnya</a>`;
    }

    group.innerHTML += newLi
}
