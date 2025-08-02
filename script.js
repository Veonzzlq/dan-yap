// ===================== AOS (Animate On Scroll) INIT =====================
AOS.init({ duration: 1000, once: true }); 
// Inisialisasi AOS agar animasi berjalan 1 detik dan hanya sekali saat elemen muncul

// ===================== GSAP Animations =====================
gsap.from(".hero-content h1", { duration: 1, x: -100, opacity: 0 });
// Animasi untuk h1 di Hero Section: muncul dari kiri (-100px) dengan efek fade-in

gsap.from(".hero-content h2", { duration: 1.2, x: -100, opacity: 0, delay: 0.3 });
// Animasi untuk h2, sama seperti di atas tapi dengan delay 0.3 detik

gsap.from(".hero-img", { duration: 1.5, scale: 0.5, opacity: 0, delay: 0.5 });
// Animasi gambar profil: muncul dengan efek zoom (scale 0.5 → 1)

// ===================== Typed.js Effect =====================
new Typed("#typed-text", {
  strings: ["Web Developer", "Laravel Expert", "Network Engineer"], // Kata yang diketik
  typeSpeed: 50,   // Kecepatan mengetik per huruf (ms)
  backSpeed: 30,   // Kecepatan menghapus huruf
  loop: true       // Ulang terus-menerus
});

// ===================== Dark Mode Toggle =====================
const toggleBtn = document.getElementById('theme-toggle'); 
// Ambil tombol dark mode berdasarkan ID

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode'); 
  // Tambah/hapus class 'dark-mode' di body

  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙'; 
  // Ubah icon tombol sesuai mode

  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light'); 
  // Simpan preferensi tema ke localStorage
});

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️'; 
  // Jika sebelumnya dark mode, aktifkan kembali
}

// ===================== Scroll Progress Bar =====================
const progressBar = document.getElementById('progress-bar'); 
// Ambil elemen progress bar

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY; 
  // Posisi scroll saat ini

  const docHeight = document.body.scrollHeight - window.innerHeight; 
  // Tinggi total dokumen dikurangi tinggi layar

  const progress = (scrollTop / docHeight) * 100; 
  // Hitung persentase scroll

  progressBar.style.width = progress + '%'; 
  // Ubah lebar progress bar sesuai persentase
});

// ===================== Responsive Navbar (Mobile Menu) =====================
const menuBtn = document.getElementById('menu-toggle'); 
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', () => navMenu.classList.toggle('active')); 
// Klik tombol menu → tampilkan/sembunyikan nav menu

// ===================== Portfolio Modal =====================
const modal = document.getElementById('portfolio-modal'); 
const closeBtn = document.querySelector('.close-btn');
let swiperInstance; // Variabel untuk menyimpan instance Swiper

function openModal(id) {
  modal.style.display = 'flex'; 
  // Tampilkan modal

  swiperInstance = new Swiper(".mySwiper", {
    pagination: { el: ".swiper-pagination" }, 
    loop: true 
  }); 
  // Inisialisasi Swiper.js untuk slider gambar
}

function closeModal() {
  modal.style.display = 'none'; 
  // Sembunyikan modal
  if (swiperInstance) swiperInstance.destroy(); 
  // Hapus instance swiper agar tidak crash
}

closeBtn.addEventListener('click', closeModal); 
// Klik tombol close → tutup modal

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal(); 
  // Klik area luar modal → tutup modal
});

// ===================== Filter Portfolio =====================
const filters = document.querySelectorAll('.filter'); 
// Ambil semua tombol filter
const cards = document.querySelectorAll('.card'); 
// Ambil semua kartu portofolio

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active')); 
    // Hapus class active dari semua tombol filter
    filter.classList.add('active'); 
    // Tambahkan class active ke tombol yang diklik

    const category = filter.dataset.filter; 
    // Ambil kategori filter
    cards.forEach(card => {
      card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none'; 
      // Tampilkan hanya kartu sesuai kategori
    });
  });
});

// ===================== EmailJS Contact Form =====================
const contactForm = document.getElementById('contact-form'); 
// Ambil elemen form

contactForm.addEventListener('submit', function(e) {
  e.preventDefault(); 
  // Cegah reload halaman saat submit form

  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_PUBLIC_KEY') 
  // Kirim data form ke EmailJS (isi dengan data API kamu)

    .then(() => {
      alert('Pesan berhasil dikirim!'); 
      // Jika berhasil → tampilkan alert
      contactForm.reset(); 
      // Reset form
    }, (err) => {
      alert('Error: ' + JSON.stringify(err)); 
      // Jika gagal → tampilkan error
    });
});