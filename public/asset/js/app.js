    
    let currentSlide = 0;
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;

    // Auto slide every 4 seconds
    let slideInterval = setInterval(() => moveSlide(1), 4000);

    function moveSlide(direction) {
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      slides.style.transform = `translateX(${-currentSlide * 100}%)`; // Change to 100% for full slides

      // Reset auto-slide timer when manually moving slides
      clearInterval(slideInterval);
      slideInterval = setInterval(() => moveSlide(1), 4000);
    }

    // Counter
    document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.counter');
        let startedCounting = false; // Flag to prevent multiple starts
    
        const updateCounter = (counter) => {
          const isPercentage = counter.getAttribute('data-target') === '80' || counter.getAttribute('data-target') === '100';
          counter.innerText = '0';
          
          const target = +counter.getAttribute('data-target');
          const increment = target / 200;
    
          const count = () => {
            const current = +counter.innerText.replace('%', '');
    
            if (current < target) {
              counter.innerText = `${Math.ceil(current + increment)}${isPercentage ? '%' : ''}`;
              setTimeout(count, 10);
            } else {
              counter.innerText = `${target}${isPercentage ? '%' : ''}`;
            }
          };
    
          count();
        };
    
        const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1 // Trigger when 10% of the element is visible
        };
    
        const observerCallback = (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !startedCounting) {
              startedCounting = true; // Set the flag to true
              counters.forEach(counter => updateCounter(counter)); // Start the counting
              observer.disconnect(); // Stop observing after the count starts
            }
          });
        };
    
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        counters.forEach(counter => observer.observe(counter));
      });