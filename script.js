document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Search functionality
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchForm = document.querySelector('.search-form');
    
    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.style.display = 'block';
            setTimeout(() => {
                searchOverlay.style.opacity = '1';
                document.querySelector('.search-input').focus();
            }, 10);
        });
        
        searchClose.addEventListener('click', closeSearch);
        
        // Close search on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.style.display === 'block') {
                closeSearch();
            }
        });
        
        // Close search when clicking outside search container
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
    }
    
    function closeSearch() {
        searchOverlay.style.opacity = '0';
        setTimeout(() => {
            searchOverlay.style.display = 'none';
        }, 300);
    }
    
    // Search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search-input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // In a real app, this would trigger search functionality
                console.log('Searching for:', searchTerm);
                alert(`Search functionality would show results for: "${searchTerm}"`);
                searchInput.value = '';
                closeSearch();
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mainNav.style.display === 'block';
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainNav.style.display === 'block' && 
                !mainNav.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    function openMobileMenu() {
        mainNav.style.display = 'block';
        setTimeout(() => {
            mainNav.style.opacity = '1';
            mainNav.style.transform = 'translateY(0)';
        }, 10);
        mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
    }
    
    function closeMobileMenu() {
        mainNav.style.opacity = '0';
        mainNav.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            mainNav.style.display = 'none';
        }, 300);
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // Add to cart functionality
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productTitle = this.closest('.product-info').querySelector('.product-title').textContent;
            
            // Animation effect
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = '#4ecdc4';
            this.textContent = 'Added! ✓';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.backgroundColor = '';
                this.textContent = 'Add to Cart';
            }, 1000);
            
            // Update cart count
            cartItems++;
            cartCount.textContent = cartItems;
            cartCount.style.animation = 'none';
            setTimeout(() => {
                cartCount.style.animation = 'bounce 0.5s';
            }, 10);
            
            // In a real app, this would add to cart storage/API
            console.log(`Added product ${productId}: ${productTitle} to cart`);
            
            // Show notification
            showNotification(`Added ${productTitle} to cart!`);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.form-input');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real app, this would submit to newsletter service
                console.log('Newsletter subscription:', email);
                
                // Show success message
                const submitButton = this.querySelector('.btn-newsletter');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Subscribed! ✓';
                submitButton.style.backgroundColor = '#ff6b6b';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.backgroundColor = '';
                }, 2000);
                
                showNotification('Thank you for subscribing to our newsletter!');
            } else {
                emailInput.style.border = '2px solid #ff6b6b';
                setTimeout(() => {
                    emailInput.style.border = '';
                }, 2000);
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Notification system
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4ecdc4;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Image lazy loading enhancement
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading animation for images
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s';
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
    });
    
    // Add CSS animation for cart bounce
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        
        .notification {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize mobile menu styles
    if (mainNav) {
        mainNav.style.transition = 'opacity 0.3s, transform 0.3s';
        mainNav.style.opacity = '0';
        mainNav.style.transform = 'translateY(-10px)';
    }
    
    // Initialize search overlay styles
    if (searchOverlay) {
        searchOverlay.style.transition = 'opacity 0.3s';
        searchOverlay.style.opacity = '0';
    }
});