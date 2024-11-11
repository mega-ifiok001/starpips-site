document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      
      const innerGlow = card.querySelector('.inner-glow');
      innerGlow.style.background = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(103, 132, 255, 0.2) 0%,
        transparent 70%
      )`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      
      const innerGlow = card.querySelector('.inner-glow');
      innerGlow.style.background = `radial-gradient(
        circle at 50% 50%,
        rgba(103, 132, 255, 0.15) 0%,
        transparent 70%
      )`;
    });
  });


