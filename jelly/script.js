// Main JavaScript file for JellyFish Adventures

document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    
    // Function to hide loading screen
    const hideLoadingScreen = () => {
        // Add the loaded class to animate it away
        loadingScreen.classList.add('loaded');
        // Remove the loading class from body to enable scrolling
        body.classList.remove('loading');
        
        // After animation completes, hide the loading screen
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800); // Match this to the CSS transition time
    };
    
    // Hide loading screen after all content is loaded
    window.addEventListener('load', () => {
        // Delay slightly for a better UX
        setTimeout(hideLoadingScreen, 1500);
    });
    
    // Fallback if load event doesn't fire
    setTimeout(hideLoadingScreen, 3000);
    
    // Magnetic button effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        // Check if the button contains "Book Now" text
        const buttonText = btn.textContent.trim().toLowerCase();
        const isBookNowBtn = buttonText.includes('book now');
        
        if (!isBookNowBtn) return; // Skip if not a Book Now button
        
        btn.addEventListener('mousemove', e => {
            // Don't apply to selects within or near the button
            if (e.target.tagName === 'SELECT' || e.target.closest('select')) return;
            
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Calculate distance from center (0-1 value)
            const distance = Math.sqrt(x*x + y*y);
            const maxDistance = Math.sqrt(Math.pow(position.width/2, 2) + Math.pow(position.height/2, 2));
            const distanceRatio = Math.min(distance / maxDistance, 1);
            
            // Define max movement distance
            const maxMove = 10; // pixels - reduced from 15 for smoother effect
            
            // Calculate movement based on cursor position with reduced sensitivity
            // The closer to the edge, the less movement
            const moveX = (x / 6) * (1 - distanceRatio*0.7); // reduced intensity (was /4)
            const moveY = (y / 6) * (1 - distanceRatio*0.7); // reduced intensity (was /4)
            
            // Apply the transform with a smoother transition
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            // Adjust inner content for 3D effect - with reduced movement
            const btnContent = btn.querySelector('.btn-content');
            if (btnContent) {
                btnContent.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`; // reduced from 0.3
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            // Create smooth return animation
            btn.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)'; // increased from 0.5s
            btn.style.transform = 'translate(0px, 0px)';
            
            const btnContent = btn.querySelector('.btn-content');
            if (btnContent) {
                btnContent.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)'; // increased from 0.5s
                btnContent.style.transform = 'translate(0px, 0px)';
            }
            
            // Reset transition after animation completes
            setTimeout(() => {
                btn.style.transition = 'transform 0.3s cubic-bezier(0.21, 0.61, 0.35, 1)';
                if (btnContent) {
                    btnContent.style.transition = 'all 0.3s ease';
                }
            }, 700); // increased from 500
        });
        
        btn.addEventListener('mouseenter', () => {
            // Remove transition for instant response when entering
            btn.style.transition = 'none';
            const btnContent = btn.querySelector('.btn-content');
            if (btnContent) {
                btnContent.style.transition = 'none';
            }
        });
    });
    
    // Enhanced mobile menu functionality with animation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Initialize menu in hidden state at page load
        mobileMenu.classList.add('hidden');
        
        // Handle menu toggle with animation
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Enhanced menu button animation
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenuBtn.querySelector('svg').style.transform = 'rotate(90deg) scale(1.1)';
                mobileMenuBtn.querySelector('svg').style.color = '#f97316'; // Change to orange
                
                // Ensure the menu is visible and properly positioned
                mobileMenu.style.display = 'block';
                mobileMenu.style.transform = 'scaleY(1)';
                
                // Ensure the menu is positioned correctly
                const navHeight = mobileMenuBtn.closest('nav').offsetHeight;
                mobileMenu.style.top = `${navHeight}px`;
            } else {
                mobileMenuBtn.querySelector('svg').style.transform = 'rotate(0) scale(1)';
                mobileMenuBtn.querySelector('svg').style.color = 'currentColor';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
            !mobileMenuBtn.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('svg').style.transform = 'rotate(0) scale(1)';
            mobileMenuBtn.querySelector('svg').style.color = 'currentColor';
        }
    });
    
    // Custom date picker functionality with enhanced error handling
    const dateSelect = document.getElementById('date-select');
    const customDateInput = document.getElementById('custom-date');
    
    if (dateSelect && customDateInput) {
        // Set min date to today
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        customDateInput.min = formattedDate;
        
        // Handle date type selection
        dateSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customDateInput.classList.remove('hidden');
                customDateInput.focus();
                
                // Add animation for smoother appearance
                setTimeout(() => {
                    customDateInput.style.opacity = '1';
                    customDateInput.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Fade out first, then hide
                customDateInput.style.opacity = '0';
                customDateInput.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    customDateInput.classList.add('hidden');
                }, 300);
            }
        });
        
        // Default to today's date when selecting custom
        customDateInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = formattedDate;
            }
        });
    }
    
    // Enhanced select animations
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('focus', () => {
            select.style.transform = 'translateY(-2px)';
            select.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        });
        
        select.addEventListener('blur', () => {
            select.style.transform = 'translateY(0)';
            select.style.boxShadow = 'none';
        });
    });
    
    // Responsive booking controls for mobile
    const adjustBookingControls = function() {
        const bookingControls = document.querySelector('.booking-controls');
        if (bookingControls) {
            if (window.innerWidth < 768) {
                // Make sure we're not using the .absolute.bottom-8 classes on mobile
                bookingControls.classList.remove('absolute');
                bookingControls.classList.remove('bottom-8');
                
                // Ensure correct mobile layout
                bookingControls.classList.remove('flex');
                bookingControls.classList.remove('space-x-4');
                bookingControls.classList.add('flex-col');
                bookingControls.classList.add('gap-3');
                
                // Adjust vertical spacing
                const parentSection = bookingControls.closest('section');
                if (parentSection) {
                    parentSection.style.paddingBottom = '2rem';
                }
            } else {
                // Restore desktop classes
                bookingControls.classList.add('absolute');
                bookingControls.classList.add('bottom-8');
                bookingControls.classList.add('flex');
                bookingControls.classList.add('space-x-4');
                bookingControls.classList.remove('flex-col');
                bookingControls.classList.remove('gap-3');
                
                // Reset padding
                const parentSection = bookingControls.closest('section');
                if (parentSection) {
                    parentSection.style.paddingBottom = '';
                }
            }
        }
    };
    
    // Run on load and resize
    window.addEventListener('load', adjustBookingControls);
    window.addEventListener('resize', adjustBookingControls);
    
    // Call it immediately to set correct initial state
    adjustBookingControls();
    
    // Booking form validation
    const bookNowBtn = document.querySelector('button');
    if (bookNowBtn && bookNowBtn.textContent.includes('Book Now')) {
        bookNowBtn.addEventListener('click', function() {
            const activitySelect = document.querySelector('select:nth-of-type(1)');
            const locationSelect = document.querySelector('select:nth-of-type(2)');
            const dateSelect = document.getElementById('date-select');
            const customDateInput = document.getElementById('custom-date');
            
            if (activitySelect.selectedIndex === 0) {
                alert('Please select an activity');
                activitySelect.focus();
                return;
            }
            
            if (locationSelect.selectedIndex === 0) {
                alert('Please select a location');
                locationSelect.focus();
                return;
            }
            
            if (dateSelect.selectedIndex === 0) {
                alert('Please select a date');
                dateSelect.focus();
                return;
            }
            
            if (dateSelect.value === 'custom' && customDateInput.value === '') {
                alert('Please select a custom date');
                customDateInput.focus();
                return;
            }
            
            // Format the selected date for the confirmation message
            let selectedDate;
            if (dateSelect.value === 'today') {
                selectedDate = 'today';
            } else if (dateSelect.value === 'tomorrow') {
                selectedDate = 'tomorrow';
            } else if (dateSelect.value === 'custom') {
                const date = new Date(customDateInput.value);
                selectedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            }
            
            alert(`Booking successful! Your adventure is scheduled for ${selectedDate} at ${locationSelect.value}. We will contact you shortly with more details.`);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.querySelector('svg').style.transform = 'rotate(0) scale(1)';
                    mobileMenuBtn.querySelector('svg').style.color = 'currentColor';
                }
            }
        });
    });
    
    // Add animation to activity cards when they come into view
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.group');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.group').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}); 