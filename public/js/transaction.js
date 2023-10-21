const showAll = () => {
    const showMore = document.getElementById('show-all')
    showMore.classList.add('d-none');
    
    const lastTransaction = document.querySelectorAll('.last-transaction');
    lastTransaction.forEach(el => el.classList.add('d-none'))

    const allTransaction = document.querySelectorAll('.all-transaction');
    allTransaction.forEach(el => el.classList.remove('d-none'))
}

const showMore =  (month) => {
    const offset = document.querySelectorAll(`.list-data-${month}`).length
    const data = {
        offset,
    }
    fetch(`/transaction?offset=${offset}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        listData(data);
    })
    .catch(error => {
        console.error(error)
    })
}

const listData =  (data) => {
    const group = document.querySelector(`.list-group-${data.month}`);
    const showmore = document.getElementById('showmore');

    const namaBulan = ["Januari", "Februari", "Maret", "April", 
                    "Mei", "Juni", "Juli", "Agustus", 
                    "September", "Oktober", "November", "Desember"]; 

    // if (data.data.records.length == 0) {
    //     showmore.classList.add('d-none')
    // }

    // let newLi = '';
    
    // data.data.records.forEach(transaksi => {
    //     const type = transaksi.transaction_type 
    //     const amount = transaksi.total_amount
    //     const createdOn = new Date(transaksi.created_on)
    //     const day = createdOn.getDate();
    //     const month = namaBulan[createdOn.getMonth()];
    //     const year = createdOn.getFullYear();
    //     const jam = createdOn.toLocaleTimeString()
    //     const description = transaksi.description

    //     newLi  +=  `<li class='list-group-item d-flex justify-content-between align-items-start my-3 px-4 py-3'>
    //                 <div class='ms-2 me-auto'>
    //                     <div class='fw-bolder fs-4 ${type == 'TOPUP' ? 'text-success' : 'text-danger'}  text-success'>+ Rp. ${amount.toLocaleString('id-ID')}</div>
    //                     <span class='small'> ${day} ${month} ${year} ${jam}</span>
    //                 </div>
    //                 <p class='fs-6 text-secondary'>${description}</p>
    //             </li>`;

        
    // })

    // group.innerHTML += newLi
}
