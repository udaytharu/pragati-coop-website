// downloads.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const pdfList = document.getElementById('pdfList');

    // Add event listener for input changes
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Filter PDF list
        const pdfItems = pdfList.getElementsByTagName('li');
        for (let item of pdfItems) {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        }
    });
});