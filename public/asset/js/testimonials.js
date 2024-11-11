// Remove the intro section after the animation
setTimeout(() => {
    document.querySelector('.intro').style.display = 'none';
  }, 4000);
  
  // Select all panels
  const panels = document.querySelectorAll('.panel');
  
  // Add event listeners for hover effect on each panel
  panels.forEach(panel => {
    panel.addEventListener('mouseover', () => {
      panel.classList.add('active');
      removeActiveClasses(panel);
    });
  
    panel.addEventListener('mouseleave', () => {
      panel.classList.remove('active');
    });
  });
  
  // Remove the active class from other panels
  function removeActiveClasses(activePanel) {
    panels.forEach(panel => {
      if (panel !== activePanel) {
        panel.classList.remove('active');
      }
    });
  }
  