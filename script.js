// Author: Jason Pippin
// Section: WD-201
// Date: October 18, 2025
// JavaScript for Osiris Surplus Emporium

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
});

// Array - Product Categories
const productCategories = [
    'Clothing',
    'Footwear', 
    'Equipment',
    'Accessories',
    'Collectibles'
];

// Loop - Display categories
function displayCategories() {
    const categoryContainer = document.getElementById('category-display');
    if (categoryContainer) {
        let html = '<h3>Our Product Categories:</h3><ul>';
        for (let i = 0; i < productCategories.length; i++) {
            html += `<li>${productCategories[i]}</li>`;
        }
        html += '</ul>';
        categoryContainer.innerHTML = html;
    }
}

// Condition - Form Validation
function validateForm() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const firstName = form.querySelector('#firstName');
            const lastName = form.querySelector('#lastName');
            const email = form.querySelector('#email');
            const message = form.querySelector('#message');
            
            let isValid = true;
            
            // Check required fields
            if (firstName && firstName.value.trim() === '') {
                showError(firstName, 'First name is required');
                isValid = false;
            }
            
            if (lastName && lastName.value.trim() === '') {
                showError(lastName, 'Last name is required');
                isValid = false;
            }
            
            if (email && email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (email && !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (message && message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// Helper function for email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error messages
function showError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9em';
    errorDiv.style.marginTop = '0.5%';
    errorDiv.textContent = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
    field.style.borderColor = '#e74c3c';
    
    // Remove error on focus
    field.addEventListener('focus', function() {
        field.style.borderColor = '#ddd';
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    });
}

// Object & Methods - Shopping Cart Simulation
const shoppingCart = {
    items: [],
    
    addItem: function(name, price, quantity = 1) {
        const existingItem = this.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ name, price, quantity });
        }
        this.updateCartDisplay();
    },
    
    removeItem: function(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.updateCartDisplay();
    },
    
    getTotal: function() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    updateCartDisplay: function() {
        const cartDisplay = document.getElementById('cart-display');
        if (cartDisplay) {
            if (this.items.length === 0) {
                cartDisplay.innerHTML = '<p>Your cart is empty</p>';
            } else {
                let html = '<h3>Shopping Cart:</h3><ul>';
                this.items.forEach(item => {
                    html += `<li>${item.name} - $${item.price} x ${item.quantity}</li>`;
                });
                html += `<li><strong>Total: $${this.getTotal().toFixed(2)}</strong></li></ul>`;
                cartDisplay.innerHTML = html;
            }
        }
    },
    
    clearCart: function() {
        this.items = [];
        this.updateCartDisplay();
    }
};

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayCategories();
    validateForm();
    shoppingCart.updateCartDisplay();
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
});

