import { CONFIG } from './config.js';

/**
 * Fungsi pembantu untuk melakukan HTTP Request (AJAX)
 */
async function fetchApi(endpoint, method = 'DELETE') {
    try {
        const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || `HTTP Error ${response.status}`);
        }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const deleteUser = async (userId) => {
    return await fetchApi(`/user/delete_without_auth/${userId}`);
};

export const deleteStock = async (stockId) => {
    return await fetchApi(`/stock/delete_by_id/${stockId}`);
};