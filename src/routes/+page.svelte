<script>
	import Navbar from '../components/Navbar.svelte'
	import Simetris from '../components/Simetris.svelte'
	import Asimetris from '../components/Asimetris.svelte';
	import AboutUs from '../components/AboutUs.svelte';

	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
</script>

<svelte:head>
	<title>Learn Cryptography</title>
	<script src="js/bootstrap.bundle.js"></script>
	<style>
		.hero {
			background-image: url('/img/hero-bg.jpg');
			background-size: cover;
			height: 100vh;
		}
	
		.b-example-divider {
			width: 100%;
			height: 3rem;
			background-color: rgba(0, 0, 0, .1);
			border: solid rgba(0, 0, 0, .15);
			border-width: 1px 0;
			box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
		}
	</style>
</svelte:head>

<section id="home">
	<div class="hero d-flex flex-column">
		<Navbar />
		<div class="px-4 py-5 text-center text-light h-100 d-flex flex-column justify-content-center">
			<h1 class="display-5 fw-bold mb-4">Learn Cryptography</h1>
			<div class="col-lg-6 mx-auto">
				<p class="mb-4 fs-5 fw-normal">
					Selamat datang di Learn Cryptography! Jelajahi dunia kriptografi melalui simulasi
					interaktif enkripsi dan dekripsi menggunakan algoritma simetris dan asimetris. Mulai
					jelajahi keajaiban teknologi kriptografi dan asah keterampilan keamanan informasi Anda di
					sini!
				</p>
				<div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
					<a href="#simetris" class="btn btn-outline-light btn-lg px-4 gap-3">Ayo Mulai!</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="simetris">
	<Simetris/>
</section>

<div class="b-example-divider"></div>

<section id="asimetris">
	<Asimetris/>
</section>

<div class="b-example-divider"></div>

<section id="about-us">
	<AboutUs/>
</section>

<footer class="py-3">
	<ul class="nav justify-content-center border-bottom pb-3 mb-3">
		<li class="nav-item"><a href="#home" class="nav-link px-2 text-body-secondary">Home</a></li>
		<li class="nav-item"><a href="#simetris" class="nav-link px-2 text-body-secondary">Simetris</a></li>
		<li class="nav-item"><a href="#asimetris" class="nav-link px-2 text-body-secondary">Asimetris</a></li>
		<li class="nav-item"><a href="#about-us" class="nav-link px-2 text-body-secondary">About Us</a></li>
	</ul>
	<p class="text-center text-body-secondary">© 2023 Kelompok 2</p>
</footer>