// Function to open the lightbox
function openLightbox(projectId) {
    const lightbox = document.getElementById(`lightbox-${projectId}`);
    lightbox.style.display = 'block';

    // Force carousel to reset to the first image each time the lightbox is opened
    const carousel = lightbox.querySelector('.carousel');
    $(carousel).carousel(0); // Reset carousel to the first item
    $(carousel).carousel('pause'); // Pause the carousel to prevent auto-sliding issues

    // Ensure images resize correctly
    setTimeout(() => {
        $(carousel).carousel('cycle'); // Restart carousel cycling if needed
    }, 100); // Adjust timeout if necessary
}

// Function to close the lightbox
function closeLightbox(projectId) {
    document.getElementById(`lightbox-${projectId}`).style.display = 'none';
}

// Function to make the lightbox draggable
function makeDraggable(element) {
    let offsetX = 0, offsetY = 0, initialX, initialY;

    element.onmousedown = function (e) {
        e.preventDefault();

        // Get the initial cursor position
        initialX = e.clientX;
        initialY = e.clientY;

        document.onmousemove = dragMouse;
        document.onmouseup = closeDragElement;
    };

    function dragMouse(e) {
        e.preventDefault();

        // Calculate the new cursor position
        offsetX = initialX - e.clientX;
        offsetY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        // Set the lightbox's new position
        element.style.top = (element.offsetTop - offsetY) + "px";
        element.style.left = (element.offsetLeft - offsetX) + "px";
    }

    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Initialize draggable functionality for all lightboxes
document.querySelectorAll('.lightbox').forEach(lightbox => {
    makeDraggable(lightbox);
});

// Toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        const comment = skill.getAttribute('data-comment');
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerText = comment;
        skill.appendChild(tooltip);
    });

    skill.addEventListener('mouseleave', function() {
        const tooltip = skill.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});