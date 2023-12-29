<script>
	import { onMount } from 'svelte'
</script>

<div class="position-fixed w-100 bg-dark" style="z-index: 999;">
	<div class="container">
		<header class="d-flex flex-wrap justify-content-center py-3">
			<a
				href="/"
				class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
			>
				<span class="fs-4">Kelompok 2</span>
			</a>

			<ul class="nav nav-pills">
				<li class="nav-item">
					<a href="#home" class="nav-link text-light" aria-current="page">
                        Home
                    </a>
				</li>
				<li class="nav-item">
                    <a href="#simetris" class="nav-link text-light">
                        Simetri
                    </a>
                </li>
				<li class="nav-item">
                    <a href="#asimetris" class="nav-link text-light">
                        Asimetri
                    </a>
                </li>
				<li class="nav-item">
                    <a href="#about-us" class="nav-link text-light">
                        Tentang Kami
                    </a>
                </li>
			</ul>
		</header>
	</div>
</div>
