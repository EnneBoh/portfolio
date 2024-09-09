document.addEventListener("DOMContentLoaded", function () {
    const ctaButton = document.querySelector('.cta');
    const backToTopButton = document.getElementById('back-to-top');
    const aboutSection = document.querySelector('#about');
    const stickyHeader = document.getElementById('sticky-header');
    const navLinks = document.querySelectorAll('#sticky-header nav ul li a');
    const sideLinks = document.querySelectorAll('#sticky-header .sidebar ul li a');
    const navLogo = document.querySelectorAll('#sticky-header h2 a');
    const mobileSidebar = document.querySelector('.sidebar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const hamburgerIcon = document.querySelector('i.bx-menu');
    const closeIcon = document.querySelector('i.bx-x');
    const scrollable = document.querySelector(".projects");
    const scrollOffset = 40; // Regola questo valore in base alle tue esigenze

    // Evita lo spostamento delle immagini
    const projectImages = document.querySelectorAll('.project img');
    projectImages.forEach(img => {
        img.setAttribute('draggable', false);
    });

    // Scorrimento fluido verso la sezione 'about'
    ctaButton.addEventListener('click', function (event) {
        event.preventDefault();
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Scorrimento fluido per i link dell'header
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scorrimento fluido per il logo dell'header
    navLogo.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scorrimento fluido per i link della sidebar

    sideLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });

            // Chiudi la sidebar
            mobileSidebar.classList.remove('active');
            hamburgerIcon.classList.add('active');  // Assicura che l'icona del menu sia visibile
            closeIcon.classList.remove('active');  // Assicura che l'icona della croce non sia visibile
            }
        });
    });

    // Mostra/nascondi il pulsante "Torna su" basato sulla posizione della sezione 'about'
    window.addEventListener('scroll', function () {
        const aboutSectionTop = aboutSection.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY + windowHeight;

        if (scrollPosition >= aboutSectionTop && window.scrollY > 0) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }

        // Mostra/nascondi l'header in base allo scroll
        if (window.scrollY > 650) {
            stickyHeader.classList.add('show');
            stickyHeader.classList.remove('hide');
        } else {
            stickyHeader.classList.remove('show');
            stickyHeader.classList.add('hide');
            
            // Rimuove la classe active dalla sidebar mobile quando l'header scompare
            mobileSidebar.classList.remove('active');
        }
    });

    // Scorrimento fluido verso l'inizio pagina e nascondi il pulsante
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Sidebar
    // Imposta inizialmente l'icona del menu come visibile
    hamburgerIcon.classList.add("active");

    hamburgerMenu.addEventListener('click', function() {
        mobileSidebar.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');  // Usa toggle per gestire la visibilità
        closeIcon.classList.toggle('active');  // Usa toggle per gestire la visibilità
    });

    // Chiude la sidebar cliccando fuori da essa
    window.addEventListener('click', function(event) {
        if (!mobileSidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            mobileSidebar.classList.remove('active');
            hamburgerIcon.classList.add('active');  // Assicura che l'icona del menu sia visibile
            closeIcon.classList.remove('active');  // Assicura che l'icona della croce non sia visibile
        }
    });

    // Scroll orizzontale
    function handleHorizontalScroll() {
        scrollable.addEventListener("wheel", function(e) {
            e.preventDefault(); // Impedisce lo scorrimento verticale

            // Verifica la direzione dello scroll
            if (e.deltaY !== 0) {
                this.scrollLeft += e.deltaY; // Scorrimento orizzontale
            }
        }, { passive: false }); // Imposta passive a false per poter usare preventDefault
    }

    function handleVerticalScroll() {
        scrollable.removeEventListener("wheel", handleHorizontalScroll);
    }

    // Determina il comportamento dello scroll basato sulla larghezza della finestra
    function adjustScrollBehavior() {
        if (window.innerWidth <= 768) {
            handleHorizontalScroll();
        } else {
            handleVerticalScroll();
        }
    }

    // Applica il comportamento corretto all'inizio e quando la finestra viene ridimensionata
    adjustScrollBehavior();
    window.addEventListener('resize', adjustScrollBehavior);
});
