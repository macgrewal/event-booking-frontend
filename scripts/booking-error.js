document.addEventListener('DOMContentLoaded', () => {
    const error = localStorage.getItem('error');
    const errorData = error ? JSON.parse(error) : null;
    document.getElementById('errorMessage').textContent = errorData.information || "An unexpected error occurred.";
});
