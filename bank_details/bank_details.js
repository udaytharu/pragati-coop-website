// bank_details.js
document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('uploadButton');
    const photoUpload = document.getElementById('photoUpload');
    const deleteButton = document.getElementById('deleteButton');
    const photoPreview = document.getElementById('photoPreview');
    const messageArea = document.getElementById('messageArea');
    const sendButton = document.getElementById('sendButton');

    let uploadedFile = null; // Store the uploaded file for sending

    // Function to update Send button state (enabled/disabled)
    const updateSendButtonState = () => {
        const message = messageArea.value.trim();
        sendButton.disabled = !uploadedFile && !message; // Disable if no file and no message
        sendButton.style.opacity = sendButton.disabled ? '0.5' : '1'; // Visual feedback
    };

    // Initial state
    updateSendButtonState();

    // Trigger file input when "Upload Photo" button is clicked
    uploadButton.addEventListener('click', () => {
        photoUpload.click();
    });

    // Handle photo upload and preview
    photoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate that the file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file (e.g., .jpg, .png).');
                photoUpload.value = '';
                return;
            }

            // Validate file size (e.g., max 5MB)
            const maxSizeInMB = 5;
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                alert(`File size exceeds ${maxSizeInMB}MB. Please upload a smaller image.`);
                photoUpload.value = '';
                return;
            }

            // Store the file for sending
            uploadedFile = file;

            // Display the image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.innerHTML = ''; // Clear previous preview
                const img = document.createElement('img');
                img.src = e.target.result;
                photoPreview.appendChild(img);
                deleteButton.style.display = 'inline-block'; // Show delete button
                updateSendButtonState(); // Update Send button state
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle delete button click
    deleteButton.addEventListener('click', () => {
        photoUpload.value = ''; // Clear the file input
        photoPreview.innerHTML = ''; // Clear the preview
        deleteButton.style.display = 'none'; // Hide delete button
        uploadedFile = null; // Clear the stored file
        updateSendButtonState(); // Update Send button state
    });

    // Update Send button state when message changes
    messageArea.addEventListener('input', () => {
        updateSendButtonState();
    });

    // Handle send button click
    sendButton.addEventListener('click', () => {
        const message = messageArea.value.trim();

        // This check is redundant since the button is disabled, but kept for clarity
        if (!uploadedFile && !message) {
            alert('Please upload a photo or add a message before sending.');
            return;
        }

        // Simulate sending (replace with actual backend logic if needed)
        const confirmationMessage = `Your voucher/screenshot and message have been sent successfully!\n\n` +
                                   `File: ${uploadedFile ? uploadedFile.name : 'No file uploaded'}\n` +
                                   `Message: ${message || 'No message provided'}`;
        alert(confirmationMessage);

        // Reset the form after "sending"
        photoUpload.value = '';
        photoPreview.innerHTML = '';
        deleteButton.style.display = 'none';
        messageArea.value = '';
        uploadedFile = null;
        updateSendButtonState(); // Update Send button state
    });
});