<script>
// @ts-nocheck
    import '../style.css'
    import { onMount, onDestroy } from "svelte"
    import {toDecimal, generateKey, encription }  from '../Simetris.js'
    import { fade, fly } from "svelte/transition"

    let selectedAlgorithm = ''
    let plaintext = ''
    let kunci = null

    let chatState = false
    let activeScenario = 0
    let mentorChatStatus = "Online"

    let scenarios = []

    // Narator
    let preparedNarator = [
        {nickname: 'Egy', fullname: 'Egy Dya Hermawan', image: '/img/avatars/egy.jpg'},
        {nickname: 'Theo', fullname: 'Theo Agustin', image: '/img/avatars/theo.jpg'},
        {nickname: 'Nandez', fullname: 'Michael Hernandez', image: '/img/avatars/nandes.jpeg'},
    ]
    let activeNarator = null

    const proses = () => {
        activeNarator = preparedNarator[Math.floor(Math.random() * 3)]

        // Persiapan
        plaintext = plaintext.toUpperCase()
        kunci = kunci.toUpperCase()
        let arrPlaintext = plaintext.split('')
        let decKunci = selectedAlgorithm == 'caesar' ? parseInt(kunci) : toDecimal(generateKey(kunci, arrPlaintext))
        let decPlaintext = toDecimal(arrPlaintext)

        // Enkripsi
        let arrCiphertext = encription(decPlaintext, decKunci, selectedAlgorithm)
        let ciphertext = arrCiphertext.join('')
        let decCiphertext = toDecimal(arrCiphertext)

        console.log(plaintext)
        console.log(kunci)
        console.log(decPlaintext)
        console.log(decKunci)
        console.log(ciphertext)
        console.log(arrCiphertext)
        console.log(decCiphertext)

        scenarios.push({
            person: '/img/avatars/user.png',
            position: 'right',
            message: ['Hallo!']
        })

        if(selectedAlgorithm == 'caesar'){
            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    `Hallo, perkenalkan saya ${activeNarator.fullname}, panggil saya ${activeNarator.nickname}! Kamu ingin mempelajari Algoritma ${selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)} Cipher ya? Kalau begitu, aku ajari ya!`,
                    `Mungkin kita kenalan dulu dengan apa itu ${selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)} Cipher!`,
                    `Algoritma Caesar adalah teknik enkripsi klasik yang melibatkan pergeseran karakter dalam teks. Cara kerjanya sederhana, yakni dengan menggeser setiap huruf dalam teks sejumlah langkah tertentu dalam alfabet. Misalnya, dengan pergeseran 3 langkah ke kanan, huruf 'A' akan menjadi 'D', 'B' menjadi 'E', dan seterusnya.`,
                    `Sampai disini bisa dipahami?`
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Berarti ini hanya tentang pergeseran karakter pada plaintext, dan banyak pergeserannya tergantung dengan kunci yang dimiliki ya?',
                    `Hmm, kalau begitu saya paham sampai disini.`,
                    `${activeNarator.nickname}, bisakah kamu tunjukkan proses enkripsi sesuai plaintext dan kunci yang saya masukkan?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tentu saja. Perhatikan baik baik ya!',
                    `Kamu memiliki Plaintext berupa "${plaintext}".`,
                    'Sebelum menggeser tiap karakter berdasarkan kunci yang dimasukkan, kita dapat mengetahui nilai index atau urutan setiap huruf pada Plaintext sesuai dengan alfabet!',
                    'Silahkan diingat, urutan karakter pada alfabet dimulai dari 0 hingga 25. Sehingga A berada pada urutan ke 0 dan Z pada urutan ke 25.',
                    'Hal ini dapat mempermudah proses berikutnya!'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Okay, bagaimana caranya?'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tenang, saya akan coba gambarkan sedikit ya.',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td>Plaintext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td>Urutan</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Setelah mengetahui urutan dari masing-masing karakter, yang perlu kita lakukan yaitu menjumlahkan urutan dari masing-masing karakter dengan kunci yang telah ditentukan sebelumnya!',
                    'Lihat tabel berikut, saya akan jumlahkan setiap nilai urutan karakter dengan kunci yang kita miliki!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td>Penjumlahan</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center">${elm === ' ' ? '' : elm + " + " + decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td>Hasil</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center">${elm === ' ' ? '' : elm + decKunci}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Untuk memastikan hasil penjumlahan tidak melebihi 25, maka kita dapat melakukan mod 26!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td>Mod 26</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Untuk langkah terakhir, kita hanya perlu menemukan huruf apa pada alfabet yang cocok dengan hasil penjumlahan dan mod 26 sebelumnya! Hasilnya akan menjadi Ciphertext dan enkripsi-pun berhasil!',
                    'Bisakah kamu mencobanya sesuai penjelasan yang sudah saya berikan?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Tentu saja, akan saya coba!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Benarkah seperti itu?'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tepat sekali!',
                    '💯 untuk kamu!',
                    'Sekarang dekripsi. Hal ini akan sangat mudah dilakukan apabila kamu memahami konsep enkripsi sebelumnya!',
                    'Dekripsi pada Caesar Cipher merupakan kebalikan dari proses enkripsinya.',
                    'Apabila enkripsi kita menggeser karakter dengan cara menjumlahkan dengan nilai kunci, maka pada dekripsi kita hanya perlu melakukan pengurangan!',
                    'Sekarang, saya tantang kamu untuk melakukan proses dekripsi tanpa harus aku berikan contoh, bagaimana?'

                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `${activeNarator.nickname}, kamu nantangin saya? Siapa takut!`,
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td>Pergeseran</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center">${elm === ' ' ? '' : elm + " - " + decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td>Hasil</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center">${elm === ' ' ? '' : elm - decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td>Mod 26</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td>Plaintext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center">${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Wah, Ciphertext-nya telah berhasil berubah kembali menjadi Plaintext!'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tepat sekali. Apabila setelah proses dekripsi hasil yang diperoleh sama dengan Plaintext yang dimasukkan diawal, maka proses dekripsi berhasil!',
                    'Selamat, kamu telah berhasil melakukan dan memahami proses enkripsi dan dekripsi menggunakan algoritma Caesar Cipher'
                ]
            })
        }else{
            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    `Hallo, perkenalkan saya ${activeNarator.fullname}, panggil saya ${activeNarator.nickname}! Kamu ingin mempelajari Algoritma ${selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)} Cipher ya? Kalau begitu, aku ajari ya!`,
                    `Mungkin kita kenalan dulu dengan apa itu ${selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)} Cipher!`,
                    `Algoritma Vigenère adalah salah satu metode enkripsi klasik yang menggunakan substitusi Caesar cipher dengan variasi kunci yang terdiri dari beberapa karakter. Kunci yang digunakan dalam algoritma Vigenère terdiri dari deretan karakter. Kunci ini digunakan untuk menggeser setiap karakter dalam teks terbuka (plaintext).`,
                    `Sampai disini bisa dipahami?`
                ]
            })
        }

        chatState = true
    }

    let printChat = (scenario) => {
        mentorChatStatus = scenario.position == 'left' ? 'Typing...' : 'Online'
        let promises = []
        let chatContainer = document.getElementsByClassName('chat-body')[0]

        let container = document.createElement('div')
        container.id = `chat-${activeScenario}`
        container.className = scenario.position == 'left' ? 'chat' : 'chat-right'

        let imageProfile = document.createElement('img')
        imageProfile.src = scenario.person
        imageProfile.className = 'border border-2 rounded-circle avatar'
        imageProfile.alt = 'person'
        
        let chats = document.createElement('div')
        chats.className = `${scenario.position == 'left' ? 'chat-bubble' : 'chat-bubble-right'} w-100 gap-2 fs-6 text-light`

        container.appendChild(imageProfile)
        container.appendChild(chats)
        chatContainer.appendChild(container)

        scenario.message.forEach((msg, index) => {
            let chat = document.createElement('div')
            chat.className = 'chat-message'
            chat.innerHTML = msg

            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    chats.appendChild(chat)
                    resolve()
                }, 1000 * index)
            })

            promises.push(promise)
        })

        Promise.all(promises).then(() => {
            mentorChatStatus = 'Online'
            activeScenario++
            console.log('All Printed!')

            let buttonContainer = document.createElement('div')
            buttonContainer.className = 'd-flex justify-content-center'

            let button = document.createElement('button')
            button.className = 'btn btn-outline-success'
            button.innerText = 'Lanjutkan!'
            button.onclick = (evt) => {
                evt.target.remove()
                printChat(scenarios[activeScenario])
            }

            buttonContainer.appendChild(button)
            chatContainer.appendChild(buttonContainer)
        })
    }
</script>

<div class="container">
    <div class="p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-5 fw-normal text-body-emphasis mt-5">Kriptografi Simetris</h1>
        <p class="fs-6 text-body-secondary">
            Kriptografi dengan algoritma simetris menggunakan kunci yang sama untuk menyembunyikan (enkripsi)
            dan mengembalikan (dekripsi) pesan. Dengan satu kunci, pesan diacak menjadi bentuk tidak
            terbaca (cipher text), dan kunci yang sama mengubah kembali cipher text menjadi pesan asli.
            Caesar Cipher dan Vigenère Cipher adalah contoh algoritma simetris yang umum. Ayo belajar
            bagaimana proses Enkripsi dan Dekripsi menggunakan Caesar dan Vigenère Cipher.
        </p>
    </div>
    <div class="row justify-content-center">
        <div class="col-sm-10 col-md-4">
            <div class="card mb-3">
                <div class="card-header">
                    Persiapan 1
                </div>
                <div class="card-body">
                    <h5 class="card-title mb-3">Pilih Algoritma</h5>
                    <div>
                        <label for="algoritma" class="form-label">Algoritma</label>
                        <select class="form-select" id="algoritma" 
                            on:change={(evt) => {selectedAlgorithm = evt.target.value}}
                            disabled="{chatState ? true : false}">
                            <option value="" selected hidden>Pilih Algoritma</option>
                            <option value="caesar">Algoritma Caesar</option>
                            <option value="vigenere">Algoritma Vigenere</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        {#if selectedAlgorithm != ""}
        <div class="col-sm-10 col-md-4" transition:fly={{ x: -50 }}>
            <div class="card mb-3">
                <div class="card-header">
                    Persiapan 2
                </div>
                <div class="card-body">
                    <h5 class="card-title mb-3">Masukkan Pesan (Plaintext)</h5>
                    <div>
                        <label for="plaintext" class="form-label">Plaintext</label>
                        <input type="text" class="form-control" id="plaintext" 
                            disabled="{chatState ? true : false}"
                            on:change={(evt) => {plaintext = evt.target.value}} placeholder="Masukkan Pesan">
                    </div>
                </div>
            </div>
        </div>
        {/if}
        {#if plaintext != ""}
        <div class="col-sm-10 col-md-4" transition:fly={{ x: -50 }}>
            <div class="card mb-3">
                <div class="card-header">
                    Persiapan 3
                </div>
                <div class="card-body">
                    <h5 class="card-title mb-3">Tentukan Kunci</h5>
                    <div>
                        <label for="kunci" class="form-label">Kunci Caesar</label>
                        {#if selectedAlgorithm == 'caesar'}
                        <input type='number' class="form-control" id="kunci" 
                            disabled="{chatState ? true : false}"
                            on:change={(evt) => {kunci = evt.target.value}}>    
                        {:else}
                        <input type='text' class="form-control" id="kunci" 
                            disabled="{chatState ? true : false}"
                            placeholder={selectedAlgorithm == 'vigenere' ? 'Masukkan Kata' : ''} 
                            on:change={(evt) => {kunci = evt.target.value}}>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        {/if}
    </div>
    {#if kunci != null}
    <div class="row py-4" transition:fly={{ y: -50 }}>
        <div class="d-flex justify-content-center gap-2">
            {#if !chatState}
            <button class="btn btn-primary" on:click={proses}>Proses</button>
            {/if}
            <button class="btn btn-outline-light" on:click={() => window.location.reload()}>Reset</button>
        </div>
    </div>
    {/if}

    {#if chatState}
    <div class="row justify-content-center mt-5" transition:fade={{ duration: 500 }}>
        <div class="col-sm-12 col-md-10">
            <div class="chat-container">
                <div class="chat-header">
                    <img src="{activeNarator.image}" alt="person" class="img-thumbnail rounded-circle" width="60">
                    <div class="d-flex flex-column justify-content-center">
                        <p class="fs-5 fw-semibold mb-0">{activeNarator.fullname}</p>
                        <p class="fw-light mb-0 text-success">{mentorChatStatus}</p>
                    </div>
                </div>
                <div class="chat-body bg-light">
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-outline-success" on:click={(evt) => {
                            evt.target.remove()
                            printChat(scenarios[activeScenario])
                        }}>Start Chatting!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}

    <div class="chat chat-message d-none"></div>
</div>