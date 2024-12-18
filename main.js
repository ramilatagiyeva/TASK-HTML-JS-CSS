let currentIndex = 0;
const profiles = document.querySelectorAll('.profil');
const points = document.querySelectorAll('.p-1');

function changeProfile(index) {
    profiles[currentIndex].style.opacity = 0;
    points[currentIndex].style.backgroundColor = "transparent";
    currentIndex = index;
    profiles[currentIndex].style.opacity = 1;
    points[currentIndex].style.backgroundColor = "#fff";
}
