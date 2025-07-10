// lấy dữ liệu 
const hero = document.querySelector('.hero');
const slides = document.querySelectorAll('.slide');
const images = [
  'img/img2.jpg',
  'img/img3.jpg',
  'img/img7.jpg',
  'img/img5.jpg',
  'img/img4.jpg',
];
let index = 0;

const dotsContainer = document.querySelector('.dots');

//  Tạo dots
images.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
  dotsContainer.appendChild(dot);
});

//  Hàm hiển thị slide
function showSlide(newIndex) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === newIndex % slides.length);
    slide.style.backgroundImage = `url(${images[i]})`;
  });
  updateDots(newIndex);
}

// Cập nhật trạng thái chấm
function updateDots(newIndex) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === newIndex);
  });
}

// Khởi tạo
showSlide(index);

// Tự động chạy
setInterval(() => {
  index = (index + 1) % images.length;
  showSlide(index);
}, 5000);

