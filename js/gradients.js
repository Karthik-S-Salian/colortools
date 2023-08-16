function copyGradient(style) {
    navigator.clipboard.writeText(style)
        .then(() => {
            
        })
        .catch((error) => {
            console.error('Error copying text to clipboard:', error);
        });
}