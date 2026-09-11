import { deleteStock, deleteUser } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnDelete = document.getElementById('btn-delete');
    const btnCancel = document.getElementById('btn-cancel');
    const statusMessage = document.getElementById('status-message');

    // Mendapatkan ID dari URL Parameter redirect mobile
    // Contoh URL: https://domainanda.com/delete.html?userId=YrkhBDNLbOR92jjaF4pp&stockId=frPvP0v2lib0GIJCTqmS
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId') || 'YrkhBDNLbOR92jjaF4pp'; // Fallback ke default dari contoh
    const stockId = urlParams.get('stockId') || 'frPvP0v2lib0GIJCTqmS';

    const showMessage = (msg, type) => {
        statusMessage.textContent = msg;
        statusMessage.className = type; 
        statusMessage.classList.remove('hidden');
    };

    const toggleButtons = (disabled) => {
        btnDelete.disabled = disabled;
        btnCancel.disabled = disabled;
        btnDelete.textContent = disabled ? 'Memproses...' : 'Ya, Hapus Akun';
    };

    btnCancel.addEventListener('click', () => {
        // Fallback action untuk tombol batal (misal redirect ke skema aplikasi native)
        window.location.href = 'tavlelang://app/home'; 
    });

    btnDelete.addEventListener('click', async () => {
        if (!confirm('Apakah Anda benar-benar yakin ingin menghapus data ini?')) return;

        toggleButtons(true);
        statusMessage.classList.add('hidden');

        // Eksekusi API secara paralel jika kedua ID ada
        const promises = [];
        if (userId) promises.push(deleteUser(userId));
        if (stockId) promises.push(deleteStock(stockId));

        if (promises.length === 0) {
            showMessage('Tidak ada ID yang ditemukan untuk dihapus.', 'error');
            toggleButtons(false);
            return;
        }

        const results = await Promise.all(promises);
        
        // Mengecek apakah ada request yang gagal
        const hasError = results.some(res => !res.success);

        if (hasError) {
            showMessage('Terjadi kesalahan saat menghapus data. Silakan coba lagi.', 'error');
            toggleButtons(false);
        } else {
            showMessage('Akun dan data berhasil dihapus permanen.', 'success');
            btnCancel.style.display = 'none';
            btnDelete.style.display = 'none';
        }
    });
});