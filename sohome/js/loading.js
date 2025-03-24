document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // After content is fully loaded (images, scripts, etc.)
    window.addEventListener('load', () => {
        // Get the loading screen element
        const loadingScreen = document.querySelector('.loading-screen');
        
        // Set a timeout for a better user experience
        setTimeout(() => {
            // Add the fade-out class to fade out the loading screen
            loadingScreen.classList.add('fade-out');
            
            // After the fade animation completes, remove the loading screen from DOM
            setTimeout(() => {
                document.body.classList.remove('loading');
                loadingScreen.style.display = 'none';
            }, 800); // This should match the transition duration in CSS
        }, 1500); // Show loading screen for at least 1.5 seconds
    });
}); 