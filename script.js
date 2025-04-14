document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    const words = ['Developer', 'Freelancer', 'Web Designer', 'Student'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 25; // Faster when deleting
        } else {
            // Typing text
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50; // Normal typing speed
        }

        // If word is complete, wait then start deleting
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        }

        // If deletion is complete, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start the typing effect
    type();
});

// Function to handle navigation highlighting based on scroll position
function updateNavigation() {
    // Get all sections that should be tracked for navigation
    const sections = document.querySelectorAll("section[id]");
    
    // Get current scroll position
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    // Loop through sections to find which one is currently visible
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        
        // Check if the current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to the corresponding nav link
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateNavigation);

// Update navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    
    // Add click event listeners to smooth scroll when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the section
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links that have href attributes starting with '#'
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target element from the href attribute
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // If target element exists, scroll to it
            if (targetElement) {
                // Scroll to the target element with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link class
                updateActiveLink(this);
            }
        });
    });
    
    // Function to update active link class
    function updateActiveLink(activeLink) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the clicked link
        activeLink.classList.add('active');
    }
    
    // Bonus: Update active link based on scroll position
    window.addEventListener('scroll', function() {
        // Debounce scroll event for better performance
        clearTimeout(window.scrollTimer);
        window.scrollTimer = setTimeout(function() {
            // Get current scroll position
            const scrollPosition = window.scrollY;
            
            // Find the current section
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100; // Offset for better UX
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to corresponding nav link
                    const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, 100);
    });
});

document.getElementById("email-text").addEventListener("click", function (e) {
    const email = this.querySelector(".email-address").textContent;
    navigator.clipboard.writeText(email).then(() => {
      createConfettiAtCursor(e.clientX, e.clientY);
    });
  });


document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add active class to the hovered item
            this.classList.add('active');
            
            // Get the position and size of the active item
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Push other items away
            techItems.forEach(otherItem => {
                if (otherItem !== this) {
                    const otherRect = otherItem.getBoundingClientRect();
                    const otherCenterX = otherRect.left + otherRect.width / 2;
                    const otherCenterY = otherRect.top + otherRect.height / 2;
                    
                    // Calculate distance and direction
                    const dx = otherCenterX - centerX;
                    const dy = otherCenterY - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // The closer the item, the more it gets pushed
                    const pushFactor = Math.max(0, 1 - distance / 150) * 20;
                    
                    if (distance < 150) {
                        const translateX = (dx / distance) * pushFactor;
                        const translateY = (dy / distance) * pushFactor;
                        
                        otherItem.style.transform = `translate(${translateX}px, ${translateY}px)`;
                    }
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Remove active class when mouse leaves
            this.classList.remove('active');
            
            // Reset all items
            techItems.forEach(otherItem => {
                otherItem.style.transform = '';
            });
        });
    });
});
// Debug and animate education section
document.addEventListener('DOMContentLoaded', function() {
    const educationSection = document.querySelector('.education');
    const educationContainers = document.querySelectorAll('.education-container');
    
    // Debug - log when user scrolls to education section
    window.addEventListener('scroll', function() {
      const sectionTop = educationSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight) {
        console.log('Education section is now in viewport!');
      }
    });
    
    // Animation with Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Log when container enters viewport
        console.log(`Container ${entries.indexOf(entry)} intersection: ${entry.isIntersecting}`);
        
        // Animate when in viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });
    
    // Observe each education container
    educationContainers.forEach((container, index) => {
      console.log(`Setting up observer for education container ${index}`);
      observer.observe(container);
    });
    
    // Force check visibility on load
    setTimeout(function() {
      // Force animation if already in view when page loads
      educationContainers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          console.log("Container already in view, forcing animation");
          container.classList.add('visible');
        }
      });
    }, 500);
  });
  // Add this to your existing JavaScript file

// Gradient background effect - show between About and Contact sections
document.addEventListener('DOMContentLoaded', function() {
    // Get required elements
    const gradientBg = document.querySelector('.gradient-background');
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    const educationSection = document.getElementById('education');
    
    // Update background visibility on scroll
    function checkBackgroundVisibility() {
        // Get the scroll position
        const scrollPosition = window.scrollY;
        
        // Get the position of start of about section (with a small offset to trigger slightly earlier)
        const aboutStart = aboutSection.offsetTop - 100;
        
        // Instead of fading out completely before contact, let's extend the gradient into the contact section
        // but with reduced opacity to let contact's own background effects show through
        
        if (scrollPosition >= aboutStart) {
            // Make the gradient visible once we reach the about section
            gradientBg.classList.add('visible');
            
            // Make education section transparent to show gradient
            if (educationSection) {
                educationSection.style.backgroundColor = "transparent";
            }
            
            // Check if we're in the contact section
            if (scrollPosition >= contactSection.offsetTop - 300) {
                // Calculate a reduced opacity for the gradient in contact section
                // Start fading 300px before contact section
                const fadePercent = 0.3; // Keep at 30% opacity in contact section
                gradientBg.style.opacity = fadePercent;
            } else {
                // Full opacity elsewhere after about section
                gradientBg.style.opacity = "1";
            }
        } else {
            // Before about section - no gradient
            gradientBg.classList.remove('visible');
            gradientBg.style.opacity = "0";
            
            // Reset education background if needed
            if (educationSection) {
                educationSection.style.backgroundColor = "black";
            }
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', checkBackgroundVisibility);
    
    // Check on initial load
    checkBackgroundVisibility();
});