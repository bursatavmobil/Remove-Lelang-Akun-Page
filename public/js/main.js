import { deleteStock, deleteUser } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnDelete = document.getElementById('btn-delete');
    const btnCancel = document.getElementById('btn-cancel');
    const statusMessage = document.getElementById('status-message');

    const customAlert = document.getElementById('custom-alert');
    const alertBtnYes = document.getElementById('alert-btn-yes');
    const alertBtnNo = document.getElementById('alert-btn-no');

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId') || 'YrkhBDNLbOR92jjaF4pp';
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
        window.location.href = 'tavlelang://app/home';
    });

    btnDelete.addEventListener('click', () => {
        customAlert.classList.remove('hidden');
    });

    alertBtnNo.addEventListener('click', () => {
        customAlert.classList.add('hidden');
    });

    alertBtnYes.addEventListener('click', async () => {
        customAlert.classList.add('hidden');
        toggleButtons(true);
        statusMessage.classList.add('hidden');

        const promises = [];
        if (userId) promises.push(deleteUser(userId));
        if (stockId) promises.push(deleteStock(stockId));

        if (promises.length === 0) {
            showMessage('Tidak ada ID yang ditemukan untuk dihapus.', 'error');
            toggleButtons(false);
            return;
        }

        const results = await Promise.all(promises);
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