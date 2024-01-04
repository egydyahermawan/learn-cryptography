<script>
// @ts-nocheck
	import { onMount, afterUpdate } from 'svelte'
    import '../style.css'
    import CryptoJS from 'crypto-js'
    import { 
        generateP, generatePrimeNumber, isPrime, calculateG, generateX, 
        generateY, generateK, calculateKInvers, calculateR, calculateS
    } from '../Asimetris.js'

    let q, p, h, g, x, y, k, kInvers, r, s
    let pesan, hashed
    let showState = false

    const proses = (qVal) => {
        // Generasi Prima
        q = qVal
        p = generateP(q)

        // Generator
        let generator = calculateG(p, q)
        h = generator.h
        g = generator.g

        // Private Key & Public Key
        x = generateX(q)
        y = generateY(p, g, x)

        // Tanda Tangan (Signing)
        k = generateK(q)
        kInvers = calculateKInvers(k, q)

        showState = true
    }

    const hashMessage = msg => {
        return CryptoJS.SHA512(msg).toString()
    }

    const autoResize = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight + 16) + 'px';
        }
    }

    afterUpdate(() => {
        const textarea = document.getElementById('hashed');
        autoResize(textarea);
    })
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
    <div class="row justify-content-center mb-3">
        <div class="col-sm-10 col-md-4">
            <div class="card">
                <div class="card-header">
                    Generasi Parameter Prima
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="q" class="form-label">Variabel Q</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="q" class="form-control">
                            {#if !q}
                            <button class="btn btn-outline-secondary text-nowrap" on:click={() => {
                                let random = generatePrimeNumber(24)
                                document.getElementById('q').value = random
                            }}>Random Q</button>
                            {/if}
                        </div>
                        {#if !q}
                        <p class="fs-6 fw-light mt-1 mb-2">Masukkan bilangan prima atau gunakan Random Q dengan panjang max. 24 bit!</p>
                        <button class="btn btn-primary mt-2 form-control" on:click={() => {
                            let val = parseInt(document.getElementById('q').value)

                            if(!isPrime(val)){
                                alert('Mohon masukkan bilangan prima!')
                            }else{
                                proses(val)
                            }
                        }}>Submit</button>
                        {/if}
                    </div>
                    {#if p}
                    <div class="">
                        <label for="p" class="form-label">Variabel P</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="p" class="form-control" disabled value="{p}">
                        </div> 
                    </div>
                    {/if}
                </div>
            </div>
        </div>
        {#if showState}
        <div class="col-sm-10 col-md-4">
            <div class="card">
                <div class="card-header">
                    Menghitung nilai G
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="p" class="form-label">Variabel H</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="g" class="form-control" disabled value="{h}">
                        </div> 
                    </div>
                    <div class="">
                        <label for="p" class="form-label">Variabel G</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="g" class="form-control" disabled value="{g}">
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-10 col-md-4">
            <div class="card">
                <div class="card-header">
                    Generate Private & Public Key
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="p" class="form-label">Variabel X (Private Key)</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="g" class="form-control" disabled value="{x}">
                        </div> 
                    </div>
                    <div class="">
                        <label for="p" class="form-label">Variabel Y (Public Key)</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="g" class="form-control" disabled value="{y}">
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        {/if}
    </div>
    {#if showState}
    <div class="row justify-content-center">
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    Masukkan Pesan
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="pesan" class="form-label">Pesan</label>
                        <textarea id="pesan" class="form-control" on:input={(evt) => autoResize(evt.target)}></textarea>
                    </div>
                    <button class="btn btn-primary form-control" on:click={() => {
                        let val = document.getElementById('pesan').value

                        if(!val){
                            alert('Harap masukkan pesan yang akan di tanda tangani!')
                            return
                        }

                        pesan = val
                        hashed = hashMessage(pesan)
                        r = calculateR(p, q, g, k)
                        s = calculateS(q, x, kInvers, hashed, r)
                        console.log(r)
                        console.log(s)
                    }}>Hash!</button>
                </div>
            </div>
        </div>
        {#if hashed}
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    Hasil Hashing (SHA512)
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="hashed" class="form-label">Hasil</label>
                        <textarea id="hashed" class="form-control">{hashed}</textarea>
                    </div>
                </div>
            </div>
        </div>
        {/if}
    </div>
    {/if} 
</div>