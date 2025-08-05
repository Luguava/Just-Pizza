//toggling the hamburger menu
        const mobileMenu = document.querySelector('.desktopmenuMobile');
        const openMenuIcon = document.querySelector('.mobileopen');
        const closeMenuIcon = document.querySelector('.mobileclose');

        openMenuIcon.addEventListener('click', () => {
            //Add class "open"
            mobileMenu.classList.add('open'); 
            openMenuIcon.style.display = 'none';
            closeMenuIcon.style.display = 'block';
        });

        closeMenuIcon.addEventListener('click', () => {
            mobileMenu.classList.remove('open'); // Remove the "open" class
            openMenuIcon.style.display = 'block';
            closeMenuIcon.style.display = 'none';
        });
