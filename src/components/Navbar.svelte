<script>
	import { onMount } from 'svelte'
</script>

<div class="position-fixed w-100 bg-dark" style="z-index: 999;">
	<nav class="navbar navbar-expand-lg">
		<header class="container d-flex flex-wrap py-3">
			<a
				href="/"
				class="d-flex align-items-center mb-0 me-md-auto link-body-emphasis text-decoration-none"
			>
				<span class="fs-5 fw-medium me-2">Kelompok 2</span><span class="fs-5 fw-lighter">| Learn Cryptography</span>
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<a href="#home" class="nav-link text-light" aria-current="page">
							Home
						</a>
					</li>
					<li class="nav-item">
						<a href="#simetris" class="nav-link text-light">
							Simetris
						</a>
					</li>
					<li class="nav-item">
						<a href="#asimetris" class="nav-link text-light">
							Asimetris
						</a>
					</li>
					<li class="nav-item">
						<a href="#about-us" class="nav-link text-light">
							Tentang Kami
						</a>
					</li>
				</ul>
			</div>
		</header>
	</nav>
</div>
