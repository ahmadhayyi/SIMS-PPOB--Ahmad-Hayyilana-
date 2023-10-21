const editProfile = () => {
    const divAction = document.getElementById('action');
    divAction.classList.add('d-none');
    const input = document.querySelectorAll('.form-control.edit');
    input.forEach((inp, i) => {
        if(i == 0) {
            inp.focus()
        }
        inp.readOnly = false;
    });

    setTimeout(() => {
        const divSave = document.getElementById('save');
        divSave.classList.remove('d-none');
    }, 150);
}

const cancelEdit = () => {
    const divSave = document.getElementById('save');
    divSave.classList.add('d-none');
    const input = document.querySelectorAll('.form-control.edit');
    input.forEach((inp, i) => {
        inp.readOnly = true;
    });

    setTimeout(() => {
        const divAction = document.getElementById('action');
        divAction.classList.remove('d-none');
    }, 150); // Delay 1 detik (150 ms)
}

const submitImage = () => {
    const imageForm = document.getElementById('formimage');
    imageForm.submit()
}

const inputClick = () => {
    const file = document.getElementById('file');
    file.click()
}

const changeImage = () => {
    const file = document.getElementById('file');
    const selectedFile = file.files[0];

    if (selectedFile) {
        if (!selectedFile.type.startsWith('image/')) {
            alert('File yang dipilih bukan gambar. Silakan pilih file gambar.');
            return false;
        }

        // Validasi ekstensi file
        const allowedExtensions = /(\.png|\.jpg)$/i; // Hanya izinkan ekstensi .png dan .jpg
        if (!allowedExtensions.exec(selectedFile.name)) {
            alert('Hanya file gambar dengan ekstensi .png atau .jpg yang diizinkan.');
            return false;
        }
        
        // Validasi ukuran maksimal 100KB
        if (selectedFile.size > 100 * 1024) {
            alert('Ukuran gambar terlalu besar. Maksimal 100 kb');
            return false;
        }

        // Setelah validasi sukses, Anda dapat memanggil fungsi submitImage()
        submitImage();
    }
}
