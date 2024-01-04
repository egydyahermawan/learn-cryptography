<script>
	import { onMount } from 'svelte'
    import '../style.css'


</script>

<div class="container">
    <div class="p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-5 fw-normal text-body-emphasis mt-5">Kriptografi Asimetris</h1>
        <p class="fs-6 text-body-secondary">
            Kriptografi asimetris adalah metode keamanan data yang menggunakan sepasang kunci, yaitu kunci publik dan kunci privat, yang berbeda satu sama lain. 
            Kunci publik digunakan untuk mengenkripsi pesan, sementara kunci privat digunakan untuk mendekripsinya. 
            Contohnya adalah Digital Signature Algorithm (DSA), sebuah algoritma kriptografi yang memungkinkan pembuatan tanda tangan digital yang autentik dan tidak dapat dipalsukan. 
            Dalam DSA, pengguna dapat menggunakan kunci privat untuk menghasilkan tanda tangan digital pada pesan, dan kunci publik digunakan untuk memverifikasi 
            keaslian tanda tangan tersebut, memastikan bahwa pesan tidak diubah dan berasal dari pengirim yang sah. 
            Jadi, kriptografi asimetris memainkan peran penting dalam menjaga keamanan data dengan menggunakan dua kunci yang saling terkait namun berbeda fungsi.
        </p>
    </div>
    <div class="p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-6 fw-normal text-body-emphasis mt-5">Pembuatan Kunci</h1>
        <p class="fs-6 text-body-secondary">
            Tahapan pembuatan kunci pada Digital Signature Algorithm (DSA) melibatkan beberapa langkah yang penting untuk menghasilkan pasangan kunci publik-privat yang 
            diperlukan untuk proses tanda tangan digital. Ikuti proses-proses berikut ini!
        </p>
    </div>
    <div class="row justify-content-center">
        <div class="col-sm-10 col-md-4">
            <div class="card mb-3">
                <div class="card-header">
                    Generasi Parameter Prima
                </div>
                <div class="card-body">
                    
                </div>
            </div>
        </div>
    </div> 
</div>