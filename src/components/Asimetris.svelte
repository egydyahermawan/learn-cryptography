<script>
// @ts-nocheck
	import { onMount, afterUpdate } from 'svelte'
    import '../style.css'
    import CryptoJS from 'crypto-js'
    import { 
        generateP, generatePrimeNumber, isPrime, calculateG, generateX, 
        generateY, generateK, calculateInvers, calculateR, calculateS, verifySignature
    } from '../Asimetris.js'
	import { fade, fly } from 'svelte/transition';

    let q, p, h, g, x, y, k, kInvers, r, s
    let inputHashed, inputR, inputS, w, u1, u2, v, isVerified
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
        kInvers = calculateInvers(k, q)

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

    <hr>

    <div class="p-3 pb-md-4 mx-auto text-center">
        <h1 class="fs-2 fw-normal text-body-emphasis mt-3">Pembuatan Kunci</h1>
        <p class="fs-6 text-body-secondary">
            Tahap Pembuatan Kunci dalam algoritma DSA merupakan proses pertama dalam menciptakan tanda tangan digital yang aman. Tahap ini melibatkan pembuatan parameter kunci kriptografi, 
            yaitu bilangan prima p dan q! Setelah parameter diatur, langkah selanjutnya adalah menciptakan kunci privat dan publik. Kunci privat (x) dihasilkan dari pemilihan bilangan acak, 
            sementara kunci publik (y) dihitung dari nilai sebelumnya dan kunci privat. Kunci publik dapat dibagikan untuk verifikasi tanda tangan digital yang dibuat dengan kunci privat yang sesuai.
        </p>
    </div>
    <div class="row justify-content-center mb-5">
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
                            document.getElementById('q').disabled = true

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
        <div class="col-sm-10 col-md-4" transition:fly={{ x: -250, delay: 500 }}>
            <div class="card">
                <div class="card-header">
                    Menghitung nilai G
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="h" class="form-label">Variabel H</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="h" class="form-control" disabled value="{h}">
                        </div> 
                    </div>
                    <div class="">
                        <label for="g" class="form-label">Variabel G</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="g" class="form-control" disabled value="{g}">
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-10 col-md-4" transition:fly={{ x: -250, delay: 1000 }}>
            <div class="card">
                <div class="card-header">
                    Generate Private & Public Key
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="x" class="form-label">Variabel X (Private Key)</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="x" class="form-control" disabled value="{x}">
                        </div> 
                    </div>
                    <div class="">
                        <label for="y" class="form-label">Variabel Y (Public Key)</label>
                        <div class="d-flex flex-row gap-2">
                            <input type="number" id="y" class="form-control" disabled value="{y}">
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        {/if}
    </div>
    {#if showState}
    <hr>
    <div class="p-3 pb-md-4 mx-auto text-center" transition:fade={{ delay: 2000 }}>
        <h1 class="fs-2 fw-normal text-body-emphasis mt-3">Pembuatan Tanda Tangan</h1>
        <p class="fs-6 text-body-secondary">
            Dalam pembuatan tanda tangan menggunakan algoritma DSA, langkah pertama adalah meng-hash pesan yang akan ditandatangani. Selanjutnya, sebuah bilangan acak dipilih untuk 
            menghasilkan tanda tangan yang unik. Dengan menggunakan kunci privat dan publik yang telah dibuat sebelumnya, proses matematis dilakukan untuk menghasilkan pasangan 
            bilangan r dan s yang membentuk tanda tangan digital. Tahap ini memastikan bahwa setiap tanda tangan yang dihasilkan unik dan sah untuk pesan tertentu.
        </p>
    </div>
    <div class="row justify-content-center mb-4" transition:fly={{ y: 250, delay: 2500 }}>
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    Hashing Pesan
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="pesan" class="form-label">Pesan</label>
                        <textarea id="pesan" class="form-control" on:input={(evt) => autoResize(evt.target)}></textarea>
                    </div>
                    {#if !hashed}
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

                        document.getElementById('pesan').disabled = true
                    }}>Hash!</button>
                    {:else}
                    <div class="mb-3">
                        <label for="hashed" class="form-label">Hasil Hashing (SHA512)</label>
                        <textarea id="hashed" class="form-control" disabled>{hashed}</textarea>
                    </div>
                    {/if}
                </div>
            </div>
        </div>
    </div> 
    {#if hashed}
    <div class="row justify-content-center mb-4" transition:fly={{ y: -250, delay: 500 }}>
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    Proses Tanda Tangan
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-6">
                                <label for="p" class="form-label">Variabel K</label>
                                <div class="d-flex flex-row gap-2">
                                    <input type="number" id="k" class="form-control" disabled value="{k}">
                                </div> 
                            </div>
                            <div class="col-6">
                                <label for="p" class="form-label">Variabel K<sup>-1</sup></label>
                                <div class="d-flex flex-row gap-2">
                                    <input type="number" id="kInvers" class="form-control" disabled value="{kInvers}">
                                </div>         
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-6">
                                <label for="p" class="form-label">Variabel R</label>
                                <div class="d-flex flex-row gap-2">
                                    <input type="number" id="r" class="form-control" disabled value="{r}">
                                </div> 
                            </div>
                            <div class="col-6">
                                <label for="p" class="form-label">Variabel S</label>
                                <div class="d-flex flex-row gap-2">
                                    <input type="number" id="s" class="form-control" disabled value="{s}">
                                </div> 
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center mb-5" transition:fly={{ y: -250, delay: 1000 }}>
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    Hasil Tanda Tangan
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                            <label for="hashed" class="form-label mb-0">Pesan</label>
                            <button class="btn btn-sm btn-outline-secondary" on:click={async () => {
                                try{
                                    await navigator.clipboard.writeText(hashed)
                                    alert('Berhasil menyalin ke Clipboard!')
                                }catch(err){
                                    alert('Gagal menyalin ke Clipboard!')
                                }
                            }}>
                                <span>Copy</span>
                                <i class="bi bi-copy"></i>
                            </button>
                        </div>
                        <textarea id="hashed" class="form-control" disabled>{hashed}</textarea>
                    </div>
                    <div class="row mb-3">
                        <div class="col-6">
                            <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                                <label for="hashed" class="form-label mb-0">Nilai R</label>
                                <button class="btn btn-sm btn-outline-secondary" on:click={async () => {
                                    try{
                                        await navigator.clipboard.writeText(r)
                                        alert('Berhasil menyalin ke Clipboard!')
                                    }catch(err){
                                        alert('Gagal menyalin ke Clipboard!')
                                    }
                                }}>
                                    <span>Copy</span>
                                    <i class="bi bi-copy"></i>
                                </button>
                            </div>
                            <div class="d-flex flex-row gap-2">
                                <input type="number" id="r" class="form-control" disabled value="{r}">
                            </div> 
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                                <label for="hashed" class="form-label mb-0">Nilai S</label>
                                <button class="btn btn-sm btn-outline-secondary" on:click={async () => {
                                    try{
                                        await navigator.clipboard.writeText(s)
                                        alert('Berhasil menyalin ke Clipboard!')
                                    }catch(err){
                                        alert('Gagal menyalin ke Clipboard!')
                                    }
                                }}>
                                    <span>Copy</span>
                                    <i class="bi bi-copy"></i>
                                </button>
                            </div>
                            <div class="d-flex flex-row gap-2">
                                <input type="number" id="s" class="form-control" disabled value="{s}">
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    
    <hr>
    <div class="p-3 pb-md-4 mx-auto text-center" transition:fade={{ delay: 2500 }}>
        <h1 class="fs-2 fw-normal text-body-emphasis mt-3">Verifikasi Tanda Tangan</h1>
        <p class="fs-6 text-body-secondary">
            Proses verifikasi tanda tangan dalam algoritma DSA adalah langkah validasi keaslian tanda tangan digital terhadap suatu pesan. Dalam tahap ini, kunci publik digunakan untuk 
            memeriksa keabsahan tanda tangan terhadap pesan yang terkait. Dengan menggunakan perhitungan matematis, verifikasi dilakukan untuk memastikan bahwa tanda tangan tersebut 
            benar-benar berasal dari pemilik kunci privat yang sesuai dengan kunci publik yang digunakan. Proses ini menegaskan bahwa pesan yang ditandatangani tetap utuh dan tidak 
            diubah sejak ditandatangani. Verifikasi ini sangat penting dalam memastikan integritas dan keaslian dari pesan yang telah ditandatangani digital.
        </p>
    </div>
    <div class="row justify-content-center mb-4" transition:fly={{ y: -250, delay: 3000 }}>
        <div class="col-12 col-md-6">
            {#if isVerified != undefined }
            {#if isVerified}
            <div class="alert alert-success" role="alert" transition:fly={{ y:-100, delay:100 }}>
                Verifikasi Tanda Tangan Berhasil! Tanda Tangan dinyatakan Valid!
            </div>
            {:else}
            <div class="alert alert-danger" role="alert" transition:fly={{ y:-100, delay:100 }}>
                Verifikasi Tanda Tangan Gagal! Tanda Tangan dinyatakan Tidak Valid!
            </div>
            {/if}
            {/if}
            <div class="card">
                <div class="card-header">
                    Signature Verification
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="inputHashed" class="form-label">Pesan (Hashed)</label>
                        <textarea id="inputHashed" class="form-control" on:input={(evt) => autoResize(evt.target)}></textarea>
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-6">
                                <label for="inputR" class="form-label">Variabel R</label>
                                <div class="d-flex flex-row gap-2">
                                    <input type="number" id="inputR" class="form-control">
                                </div> 
                            </div>
                            <div class="col-6">
                                <label for="inputS" class="form-label">Variabel S</label>
                                <div class="d-flex flex-row gap-2">
                                    <input type="number" id="inputS" class="form-control">
                                </div> 
                            </div>
                        </div>  
                    </div>
                    <button class="btn btn-primary form-control" on:click={() => {
                        isVerified = undefined
                        if(!document.getElementById('inputHashed').value) {
                            return alert('Masukkan pesan yang telah di Hashing!')
                        }

                        if(!document.getElementById('inputR').value) {
                            return alert('Masukkan nilai R dari proses tanda tangan!')
                        }

                        if(!document.getElementById('inputS').value) {
                            return alert('Masukkan nilai S dari proses tanda tangan!')
                        }

                        inputHashed = document.getElementById('inputHashed').value
                        inputR = document.getElementById('inputR').value
                        inputS = document.getElementById('inputS').value

                        // Signature Verification
                        w = calculateInvers(inputS, q)
                        u1 = (BigInt(`0x${inputHashed}`) * BigInt(w)) % BigInt(q)
                        u2 = (BigInt(inputR) * BigInt(w)) % BigInt(q)

                        let verify = verifySignature(p, q, g, y, u1, u2, inputR)
                        v = verify.v
                        isVerified = verify.verified
                    }}>Verify!</button>
                </div>
            </div>
        </div>
    </div>
    {/if}
    {/if}
</div>