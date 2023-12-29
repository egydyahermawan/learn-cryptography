<script>
	import { onMount } from 'svelte'
	import Navbar from '../components/Navbar.svelte'
	import Simetris from '../components/Simetris.svelte'
	import { fly } from 'svelte/transition';
</script>

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

<footer class="py-3">
	<ul class="nav justify-content-center border-bottom pb-3 mb-3">
		<li class="nav-item"><a href="#home" class="nav-link px-2 text-body-secondary">Home</a></li>
		<li class="nav-item"><a href="#simetris" class="nav-link px-2 text-body-secondary">Simetris</a></li>
		<li class="nav-item"><a href="#asimetris" class="nav-link px-2 text-body-secondary">Asimetris</a></li>
		<li class="nav-item"><a href="#about-us" class="nav-link px-2 text-body-secondary">About Us</a></li>
	</ul>
	<p class="text-center text-body-secondary">© 2023 Kelompok 2</p>
</footer>

<style>
	.hero {
		background-image: url('/img/hero-bg.jpg');
		background-size: cover;
		height: 100vh;
	}
</style>
