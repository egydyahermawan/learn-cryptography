<script>
// @ts-nocheck
    import '../style.css'
    import {toDecimal, generateKey, encription, decription }  from '../Simetris.js'
    import { fade, fly } from "svelte/transition"
    import { afterUpdate, onMount } from "svelte"
    import 'bootstrap/dist/css/bootstrap.min.css'

    let selectedAlgorithm = '', plaintext = '', kunci = '', aksi = ''
    let chatState = false, activeScenario = 0, mentorChatStatus = "Online", scenarios = []
    
    // Narator
    let preparedNarator = [
        {nickname: 'Egy', fullname: 'Egy Dya Hermawan', image: '/img/avatars/egy.jpg'},
        {nickname: 'Theo', fullname: 'Theo Agustin', image: '/img/avatars/theo.jpg'},
        {nickname: 'Nandez', fullname: 'Michael Hernandez', image: '/img/avatars/nandes.jpeg'},
    ]

    let activeNarator = null, arrPlaintext, decKunci, decPlaintext, arrCiphertext, ciphertext, decCiphertext

    const proses = () => {
        activeNarator = preparedNarator[Math.floor(Math.random() * 3)]

        // Persiapan
        plaintext = plaintext.toUpperCase()
        kunci = kunci.toUpperCase()
        arrPlaintext = plaintext.split('')
        decKunci = selectedAlgorithm == 'caesar' ? parseInt(kunci) : toDecimal(generateKey(kunci, arrPlaintext))
        decPlaintext = toDecimal(arrPlaintext)

        // Enkripsi
        arrCiphertext = encription(decPlaintext, decKunci, selectedAlgorithm)
        ciphertext = arrCiphertext.join('')
        decCiphertext = toDecimal(arrCiphertext)

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
                    `Hallo, perkenalkan saya ${activeNarator.fullname}, panggil saya ${activeNarator.nickname}! Kamu ingin mempelajari Algoritma Caesar Cipher ya? Kalau begitu, aku ajari ya!`,
                    `Mungkin kita kenalan dulu dengan apa itu Caesar Cipher!`,
                    `Algoritma Caesar adalah teknik enkripsi klasik yang melibatkan pergeseran karakter dalam teks. Cara kerjanya sederhana, yakni dengan menggeser setiap huruf dalam teks sejumlah langkah tertentu dalam alfabet. Misalnya, dengan pergeseran 3 langkah ke kanan, huruf 'A' akan menjadi 'D', 'B' menjadi 'E', dan seterusnya.`,
                    `Sampai disini bisa dipahami?`
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Berarti ini hanya tentang pergeseran karakter pada plaintext berdasarkan nilai kunci yang dimiliki ya?',
                    `Hmm, kalau begitu saya paham sampai disini.`,
                    `${activeNarator.nickname}, bisakah kamu tunjukkan proses enkripsi dan dekripsi sesuai plaintext dan kunci yang saya masukkan?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tentu saja. Perhatikan baik baik ya!',
                    `Kamu memiliki Plaintext berupa "${plaintext}" dengan kunci ${kunci}.`,
                    'Sebelum menggeser tiap karakter berdasarkan kunci yang dimasukkan, kita dapat mengetahui nilai index atau urutan setiap huruf pada Plaintext sesuai dengan alfabet!',
                    'Boleh dicatat, urutan karakter pada alfabet dimulai dari 0 hingga 25. Sehingga A berada pada urutan ke 0 dan Z pada urutan ke 25.',
                    'Hal ini dapat mempermudah proses berikutnya!',
                    'Bagaimana, kita lanjutkan?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Okay!'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Saya akan berikan tabel urutan dari karakter pada plaintext yang kamu berikan!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Plaintext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Setelah mengetahui urutan dari masing-masing karakter, yang perlu kita lakukan yaitu menjumlahkan urutan dari masing-masing karakter dengan kunci yang telah ditentukan sebelumnya!',
                    'Untuk memastikan hasil penjumlahan tidak melebihi 25, maka kita dapat melakukan mod 26!',
                    'Lihat tabel berikut, saya akan jumlahkan setiap nilai urutan karakter dengan kunci yang kita miliki!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Pergeseran (+)</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " + " + decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Hasil</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Mod 26</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                    'Saya akan rekap ulang langkah-langkah enkripsi yang telah kita lakukan agar kamu dapat melihat keseluruhan prosesnya dengan baik!',
                    `
                    <table class="table table-bordered mb-0 table-responsive">
                        <tbody>
                            <tr>
                                <td class='text-nowrap'>Plaintext</td>
                                ${arrPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Pergeseran (+)</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " + " + decKunci}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Hasil</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + decKunci}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Mod 26</td>
                                ${decCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Ciphertext</td>
                                ${arrCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                        </tbody>
                    </table>
                    `,
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `Wah, terimakasih ${activeNarator.nickname}! Sekarang saya paham seluruh proses enkripsinya!`,
                    `Untuk proses dekripsinya bagaimana ${activeNarator.nickname}?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Untuk proses dekripsi sangat mudah dilakukan apabila kamu memahami konsep enkripsi sebelumnya!',
                    'Dekripsi pada Caesar Cipher merupakan kebalikan dari proses enkripsinya.',
                    'Apabila enkripsi kita menggeser karakter dengan cara menjumlahkan tiap-tiap urutan atau index karakter pada plaintext dengan nilai kunci, maka pada dekripsi kita hanya perlu melakukan hal sebaliknya yaitu pengurangan!',
                    'Apabila saya minta kamu melakukannya apakah kamu bisa?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `Tentu saja!`,
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Pergeseran (-)</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " - " + decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Hasil</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm - decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Mod 26</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Plaintext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                    'Selamat, kamu telah berhasil melakukan dan memahami proses enkripsi dan dekripsi menggunakan algoritma Caesar Cipher!'
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

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Berarti ini hanya tentang pergeseran karakter pada plaintext berdasarkan karakter pada kunci yang dimiliki ya?',
                    `Hmm, kalau begitu saya paham sampai disini.`,
                    `${activeNarator.nickname}, bisakah kamu tunjukkan proses enkripsi dan dekripsi sesuai plaintext dan kunci yang saya masukkan?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tentu saja. Perhatikan baik baik ya!',
                    `Kamu memiliki Plaintext berupa "${plaintext}" dengan kunci "${kunci}".`,
                    'Sebelum menggeser tiap karakter berdasarkan kunci yang dimasukkan, kita dapat mengetahui nilai index atau urutan setiap huruf pada Plaintext sesuai dengan alfabet!',
                    'Boleh dicatat, urutan karakter pada alfabet dimulai dari 0 hingga 25. Sehingga A berada pada urutan ke 0 dan Z pada urutan ke 25.',
                    'Hal ini dapat mempermudah proses berikutnya!',
                    'Bagaimana, kita lanjutkan?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Okay!'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Saya akan berikan tabel urutan dari karakter pada plaintext yang kamu berikan!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td colspan="${decKunci.length + 1}" align="center" class='text-nowrap'>Plaintext</td>
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Plaintext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Kita juga perlu mengetahui urutan dari masing-masing karakter pada kunci, kita dapat lakukan hal yang sama dengan sebelumnya!',
                    'Tetapi apabila jumlah karakter pada kunci yang dimiliki kurang dengan jumlah karakter pada plaintext, maka kita harus mengulangi karakter pada kunci secara berurutan hingga jumlah karakter antara plaintext dan kunci sama!',
                    'Agar lebih jelas, lihat tabel berikut!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td colspan="${decKunci.length + 1}" align="center" class='text-nowrap'>Kunci Vigenère</td>
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Kunci</td>
                                    ${generateKey(kunci, plaintext).map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decKunci.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Setelah mengetahui urutan dari masing-masing karakter pada plaintext maupun kunci, yang perlu kita lakukan yaitu menjumlahkan urutan dari masing-masing karakter pada plaintext dengan urutan masing-masing karakter pada kunci yang telah ditentukan sebelumnya!',
                    'Untuk memastikan hasil penjumlahan tidak melebihi 25, maka kita dapat melakukan mod 26!',
                    'Lihat tabel berikut, saya akan jumlahkan setiap nilai urutan karakter pada plaintext dengan nilai urutan karakter pada kunci yang kita miliki!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Pergeseran (+)</td>
                                    ${decPlaintext.map((elm, index) => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " + " + decKunci[index]}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Hasil</td>
                                    ${decPlaintext.map((elm, index) => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + decKunci[index]}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Mod 26</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                    'Saya akan rekap ulang langkah-langkah enkripsi yang telah kita lakukan agar kamu dapat melihat keseluruhan prosesnya dengan baik!',
                    `
                    <table class="table table-bordered mb-0 table-responsive">
                        <tbody>
                            <tr>
                                <td class='text-nowrap'>Plaintext</td>
                                ${arrPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Kunci Vigenère</td>
                                ${generateKey(kunci, plaintext).map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decKunci.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Pergeseran (+)</td>
                                ${decPlaintext.map((elm, index) => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " + " + decKunci[index]}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Hasil</td>
                                ${decPlaintext.map((elm, index) => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + decKunci[index]}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Mod 26</td>
                                ${decCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Ciphertext</td>
                                ${arrCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                        </tbody>
                    </table>
                    `,
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `Wah, terimakasih ${activeNarator.nickname}! Sekarang saya paham seluruh proses enkripsinya!`,
                    `Untuk proses dekripsinya bagaimana ${activeNarator.nickname}?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Untuk proses dekripsi sangat mudah dilakukan apabila kamu memahami konsep enkripsi sebelumnya!',
                    'Dekripsi pada Vigenère Cipher merupakan kebalikan dari proses enkripsinya.',
                    'Apabila enkripsi kita menggeser karakter dengan cara menjumlahkan tiap-tiap urutan atau index karakter pada plaintext dengan tiap-tiap urutan atau index pada kunci, maka pada dekripsi kita hanya perlu melakukan hal sebaliknya yaitu pengurangan!',
                    'Apabila saya minta kamu melakukannya apakah kamu bisa?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `Tentu saja!`,
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Kunci Vigenère</td>
                                    ${generateKey(kunci, plaintext).map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decKunci.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Pergeseran (-)</td>
                                    ${decCiphertext.map((elm, index) => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " - " + decKunci[index]}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Hasil</td>
                                    ${decCiphertext.map((elm, index) => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm - decKunci[index]}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Mod 26</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Plaintext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                    'Selamat, kamu telah berhasil melakukan dan memahami proses enkripsi dan dekripsi menggunakan algoritma Caesar Cipher!'
                ]
            })
        }

        chatState = true
    }

    const enkripsi = () => {
        activeNarator = preparedNarator[Math.floor(Math.random() * 3)]

        // Persiapan
        plaintext = plaintext.toUpperCase()
        kunci = kunci.toUpperCase()
        arrPlaintext = plaintext.split('')
        decKunci = selectedAlgorithm == 'caesar' ? parseInt(kunci) : toDecimal(generateKey(kunci, arrPlaintext))
        decPlaintext = toDecimal(arrPlaintext)

        // Enkripsi
        arrCiphertext = encription(decPlaintext, decKunci, selectedAlgorithm)
        ciphertext = arrCiphertext.join('')
        decCiphertext = toDecimal(arrCiphertext)

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
                    `Hallo, perkenalkan saya ${activeNarator.fullname}, panggil saya ${activeNarator.nickname}! Kamu ingin mempelajari Enkripsi dengan Algoritma Caesar Cipher ya? Kalau begitu, aku ajari ya!`,
                    `Mungkin kita kenalan dulu dengan apa itu Caesar Cipher!`,
                    `Algoritma Caesar adalah teknik enkripsi klasik yang melibatkan pergeseran karakter dalam teks. Cara kerjanya sederhana, yakni dengan menggeser setiap huruf dalam teks sejumlah langkah tertentu dalam alfabet. Misalnya, dengan pergeseran 3 langkah ke kanan, huruf 'A' akan menjadi 'D', 'B' menjadi 'E', dan seterusnya.`,
                    `Sampai disini bisa dipahami?`
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Berarti ini hanya tentang pergeseran karakter pada plaintext berdasarkan nilai kunci yang dimiliki ya?',
                    `Hmm, kalau begitu saya paham sampai disini.`,
                    `${activeNarator.nickname}, bisakah kamu tunjukkan proses enkripsi sesuai plaintext dan kunci yang saya masukkan?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tentu saja. Perhatikan baik baik ya!',
                    `Kamu memiliki Plaintext berupa "${plaintext}" dengan kunci ${kunci}.`,
                    'Sebelum menggeser tiap karakter berdasarkan kunci yang dimasukkan, kita dapat mengetahui nilai index atau urutan setiap huruf pada Plaintext sesuai dengan alfabet!',
                    'Boleh dicatat, urutan karakter pada alfabet dimulai dari 0 hingga 25. Sehingga A berada pada urutan ke 0 dan Z pada urutan ke 25.',
                    'Hal ini dapat mempermudah proses berikutnya!',
                    'Bagaimana, kita lanjutkan?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Okay!'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Saya akan berikan tabel urutan dari karakter pada plaintext yang kamu berikan!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Plaintext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Setelah mengetahui urutan dari masing-masing karakter, yang perlu kita lakukan yaitu menjumlahkan urutan dari masing-masing karakter dengan kunci yang telah ditentukan sebelumnya!',
                    'Untuk memastikan hasil penjumlahan tidak melebihi 25, maka kita dapat melakukan mod 26!',
                    'Lihat tabel berikut, saya akan jumlahkan setiap nilai urutan karakter dengan kunci yang kita miliki!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Pergeseran (+)</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " + " + decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Hasil</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Mod 26</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                    'Saya akan rekap ulang langkah-langkah enkripsi yang telah kita lakukan agar kamu dapat melihat keseluruhan prosesnya dengan baik!',
                    `
                    <table class="table table-bordered mb-0 table-responsive">
                        <tbody>
                            <tr>
                                <td class='text-nowrap'>Plaintext</td>
                                ${arrPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Pergeseran (+)</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " + " + decKunci}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Hasil</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + decKunci}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Mod 26</td>
                                ${decCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Ciphertext</td>
                                ${arrCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                        </tbody>
                    </table>
                    `,
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `Wah, terimakasih ${activeNarator.nickname}! Sekarang saya paham seluruh proses enkripsinya!`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Selamat, kamu telah berhasil melakukan dan memahami proses enkripsi menggunakan algoritma Caesar Cipher!'
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

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Berarti ini hanya tentang pergeseran karakter pada plaintext berdasarkan karakter pada kunci yang dimiliki ya?',
                    `Hmm, kalau begitu saya paham sampai disini.`,
                    `${activeNarator.nickname}, bisakah kamu tunjukkan proses enkripsi sesuai plaintext dan kunci yang saya masukkan?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tentu saja. Perhatikan baik baik ya!',
                    `Kamu memiliki Plaintext berupa "${plaintext}" dengan kunci "${kunci}".`,
                    'Sebelum menggeser tiap karakter berdasarkan kunci yang dimasukkan, kita dapat mengetahui nilai index atau urutan setiap huruf pada Plaintext sesuai dengan alfabet!',
                    'Boleh dicatat, urutan karakter pada alfabet dimulai dari 0 hingga 25. Sehingga A berada pada urutan ke 0 dan Z pada urutan ke 25.',
                    'Hal ini dapat mempermudah proses berikutnya!',
                    'Bagaimana, kita lanjutkan?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Okay!'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Saya akan berikan tabel urutan dari karakter pada plaintext yang kamu berikan!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td colspan="${decKunci.length + 1}" align="center" class='text-nowrap'>Plaintext</td>
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Plaintext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Kita juga perlu mengetahui urutan dari masing-masing karakter pada kunci, kita dapat lakukan hal yang sama dengan sebelumnya!',
                    'Tetapi apabila jumlah karakter pada kunci yang dimiliki kurang dengan jumlah karakter pada plaintext, maka kita harus mengulangi karakter pada kunci secara berurutan hingga jumlah karakter antara plaintext dan kunci sama!',
                    'Agar lebih jelas, lihat tabel berikut!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td colspan="${decKunci.length + 1}" align="center" class='text-nowrap'>Kunci Vigenère</td>
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Kunci</td>
                                    ${generateKey(kunci, plaintext).map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decKunci.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Setelah mengetahui urutan dari masing-masing karakter pada plaintext maupun kunci, yang perlu kita lakukan yaitu menjumlahkan urutan dari masing-masing karakter pada plaintext dengan urutan masing-masing karakter pada kunci yang telah ditentukan sebelumnya!',
                    'Untuk memastikan hasil penjumlahan tidak melebihi 25, maka kita dapat melakukan mod 26!',
                    'Lihat tabel berikut, saya akan jumlahkan setiap nilai urutan karakter pada plaintext dengan nilai urutan karakter pada kunci yang kita miliki!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Pergeseran (+)</td>
                                    ${decPlaintext.map((elm, index) => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " + " + decKunci[index]}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Hasil</td>
                                    ${decPlaintext.map((elm, index) => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + decKunci[index]}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Mod 26</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                    'Saya akan rekap ulang langkah-langkah enkripsi yang telah kita lakukan agar kamu dapat melihat keseluruhan prosesnya dengan baik!',
                    `
                    <table class="table table-bordered mb-0 table-responsive">
                        <tbody>
                            <tr>
                                <td class='text-nowrap'>Plaintext</td>
                                ${arrPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Kunci Vigenère</td>
                                ${generateKey(kunci, plaintext).map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decKunci.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Pergeseran (+)</td>
                                ${decPlaintext.map((elm, index) => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " + " + decKunci[index]}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Hasil</td>
                                ${decPlaintext.map((elm, index) => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + decKunci[index]}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Mod 26</td>
                                ${decCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Ciphertext</td>
                                ${arrCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                        </tbody>
                    </table>
                    `,
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `Wah, terimakasih ${activeNarator.nickname}! Sekarang saya paham seluruh proses enkripsinya!`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tepat sekali. Apabila setelah proses dekripsi hasil yang diperoleh sama dengan Plaintext yang dimasukkan diawal, maka proses dekripsi berhasil!',
                    'Selamat, kamu telah berhasil melakukan dan memahami proses enkripsi menggunakan algoritma Caesar Cipher!'
                ]
            })
        }

        chatState = true
    }

    const dekripsi = () => {
        activeNarator = preparedNarator[Math.floor(Math.random() * 3)]

        // Persiapan
        ciphertext = plaintext.toUpperCase()
        kunci = kunci.toUpperCase()
        arrCiphertext = ciphertext.split('')
        decKunci = selectedAlgorithm == 'caesar' ? parseInt(kunci) : toDecimal(generateKey(kunci, arrCiphertext))
        decCiphertext = toDecimal(arrCiphertext)

        // Dekripsi
        arrPlaintext = decription(decCiphertext, decKunci, selectedAlgorithm)
        plaintext = arrPlaintext.join('')
        decPlaintext = toDecimal(arrPlaintext)

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
                    `Hallo, perkenalkan saya ${activeNarator.fullname}, panggil saya ${activeNarator.nickname}! Kamu ingin mempelajari Dekripsi dengan Algoritma Caesar Cipher ya? Kalau begitu, aku ajari ya!`,
                    `Mungkin kita kenalan dulu dengan apa itu Caesar Cipher!`,
                    `Algoritma Caesar adalah teknik enkripsi klasik yang melibatkan pergeseran karakter dalam teks. Cara kerjanya sederhana, yakni dengan menggeser setiap huruf dalam teks sejumlah langkah tertentu dalam alfabet. Misalnya, dengan pergeseran 3 langkah ke kanan, huruf 'A' akan menjadi 'D', 'B' menjadi 'E', dan seterusnya.`,
                    `Sampai disini bisa dipahami?`
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Berarti ini hanya tentang pergeseran karakter pada Plaintext berdasarkan nilai kunci yang dimiliki ya?',
                    `Hmm, kalau begitu saya paham sampai disini.`,
                    `${activeNarator.nickname}, bisakah kamu tunjukkan proses dekripsi sesuai Ciphertext dan kunci yang saya masukkan?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tentu saja. Perhatikan baik baik ya!',
                    `Kamu memiliki Ciphertext berupa "${ciphertext}" dengan kunci ${kunci}.`,
                    'Sebelum menggeser tiap karakter berdasarkan kunci yang dimasukkan, kita dapat mengetahui nilai index atau urutan setiap huruf pada Ciphertext sesuai dengan alfabet!',
                    'Boleh dicatat, urutan karakter pada alfabet dimulai dari 0 hingga 25. Sehingga A berada pada urutan ke 0 dan Z pada urutan ke 25.',
                    'Hal ini dapat mempermudah proses berikutnya!',
                    'Bagaimana, kita lanjutkan?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Okay!'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Saya akan berikan tabel urutan dari karakter pada Ciphertext yang kamu berikan!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Cipertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Setelah mengetahui urutan dari masing-masing karakter, untuk dekripsi, yang perlu kita lakukan yaitu mengurangi urutan dari masing-masing karakter dengan kunci yang telah ditentukan sebelumnya!',
                    'Untuk memastikan hasil pengurangan tidak melebihi kurang dari 0, maka kita dapat melakukan mod 26!',
                    'Lihat tabel berikut, saya akan mengurangkan setiap nilai urutan karakter dengan kunci yang kita miliki!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Pergeseran (-)</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " - " + decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Hasil</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm - decKunci}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Mod 26</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Untuk langkah terakhir, kita hanya perlu menemukan huruf apa pada alfabet yang cocok dengan hasil pengurangan dan mod 26 sebelumnya! Hasilnya akan menjadi Plaintext dan dekripsi-pun berhasil!',
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
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                    'Saya akan rekap ulang langkah-langkah enkripsi yang telah kita lakukan agar kamu dapat melihat keseluruhan prosesnya dengan baik!',
                    `
                    <table class="table table-bordered mb-0 table-responsive">
                        <tbody>
                            <tr>
                                <td class='text-nowrap'>Ciphertext</td>
                                ${arrCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Pergeseran (-)</td>
                                ${decCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " - " + decKunci}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Hasil</td>
                                ${decCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm - decKunci}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Mod 26</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Ciphertext</td>
                                ${arrPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                        </tbody>
                    </table>
                    `,
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `Wah, terimakasih ${activeNarator.nickname}! Sekarang saya paham seluruh proses dekripsinya!`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Selamat, kamu telah berhasil melakukan dan memahami proses dekripsi menggunakan algoritma Caesar Cipher!'
                ]
            })
        }else{
            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    `Hallo, perkenalkan saya ${activeNarator.fullname}, panggil saya ${activeNarator.nickname}! Kamu ingin mempelajari Dekripsi dengan Algoritma ${selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)} Cipher ya? Kalau begitu, aku ajari ya!`,
                    `Mungkin kita kenalan dulu dengan apa itu ${selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)} Cipher!`,
                    `Algoritma Vigenère adalah salah satu metode enkripsi klasik yang menggunakan substitusi Caesar cipher dengan variasi kunci yang terdiri dari beberapa karakter. Kunci yang digunakan dalam algoritma Vigenère terdiri dari deretan karakter. Kunci ini digunakan untuk menggeser setiap karakter dalam teks terbuka (plaintext).`,
                    `Sampai disini bisa dipahami?`
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Berarti ini hanya tentang pergeseran karakter pada plaintext berdasarkan karakter pada kunci yang dimiliki ya?',
                    `Hmm, kalau begitu saya paham sampai disini.`,
                    `${activeNarator.nickname}, bisakah kamu tunjukkan proses dekripsi sesuai ciphertext dan kunci yang saya masukkan?`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Tentu saja. Perhatikan baik baik ya!',
                    `Kamu memiliki Ciphertext berupa "${ciphertext}" dengan kunci "${kunci}".`,
                    'Sebelum menggeser tiap karakter berdasarkan kunci yang dimasukkan, kita dapat mengetahui nilai index atau urutan setiap huruf pada Ciphertext sesuai dengan alfabet!',
                    'Boleh dicatat, urutan karakter pada alfabet dimulai dari 0 hingga 25. Sehingga A berada pada urutan ke 0 dan Z pada urutan ke 25.',
                    'Hal ini dapat mempermudah proses berikutnya!',
                    'Bagaimana, kita lanjutkan?'
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    'Okay!'
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Saya akan berikan tabel urutan dari karakter pada Ciphertext yang kamu berikan!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td colspan="${decKunci.length + 1}" align="center" class='text-nowrap'>Ciphertext</td>
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decCiphertext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Kita juga perlu mengetahui urutan dari masing-masing karakter pada kunci, kita dapat lakukan hal yang sama dengan sebelumnya!',
                    'Tetapi apabila jumlah karakter pada kunci yang dimiliki kurang dengan jumlah karakter pada ciphertext, maka kita harus mengulangi karakter pada kunci secara berurutan hingga jumlah karakter antara ciphertext dan kunci sama!',
                    'Agar lebih jelas, lihat tabel berikut!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td colspan="${decKunci.length + 1}" align="center" class='text-nowrap'>Kunci Vigenère</td>
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Kunci</td>
                                    ${generateKey(kunci, ciphertext).map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decKunci.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Setelah mengetahui urutan dari masing-masing karakter pada plaintext maupun kunci, yang perlu kita lakukan yaitu menjumlahkan urutan dari masing-masing karakter pada plaintext dengan urutan masing-masing karakter pada kunci yang telah ditentukan sebelumnya!',
                    'Untuk memastikan hasil penjumlahan tidak melebihi 25, maka kita dapat melakukan mod 26!',
                    'Lihat tabel berikut, saya akan jumlahkan setiap nilai urutan karakter pada plaintext dengan nilai urutan karakter pada kunci yang kita miliki!',
                    `
                        <table class="table table-bordered mb-0 table-responsive">
                            <tbody>
                                <tr>
                                    <td class='text-nowrap'>Pergeseran (-)</td>
                                    ${decCiphertext.map((elm, index) => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " - " + decKunci[index]}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Hasil</td>
                                    ${decCiphertext.map((elm, index) => {
                                        return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm - decKunci[index]}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Mod 26</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                            </tbody>
                        </table>
                    `,
                    'Untuk langkah terakhir, kita hanya perlu menemukan huruf apa pada alfabet yang cocok dengan hasil penjumlahan dan mod 26 sebelumnya! Hasilnya akan menjadi Plaintext dan dekripsi-pun berhasil!',
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
                                    <td class='text-nowrap'>Urutan</td>
                                    ${decPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
                                    }).join("")}
                                </tr>
                                <tr>
                                    <td class='text-nowrap'>Ciphertext</td>
                                    ${arrPlaintext.map(elm => {
                                        return `<td align="center" class='text-nowrap'>${elm}</td>`
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
                    'Saya akan rekap ulang langkah-langkah dekripsi yang telah kita lakukan agar kamu dapat melihat keseluruhan prosesnya dengan baik!',
                    `
                    <table class="table table-bordered mb-0 table-responsive">
                        <tbody>
                            <tr>
                                <td class='text-nowrap'>Ciphertext</td>
                                ${arrCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decCiphertext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Kunci Vigenère</td>
                                ${generateKey(kunci, ciphertext).map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Urutan</td>
                                ${decKunci.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Pergeseran (+)</td>
                                ${decCiphertext.map((elm, index) => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm + " - " + decKunci[index]}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Hasil</td>
                                ${decCiphertext.map((elm, index) => {
                                    return `<td align="center" class='text-nowrap'>${elm === ' ' ? '' : elm - decKunci[index]}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Mod 26</td>
                                ${decPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                            <tr>
                                <td class='text-nowrap'>Ciphertext</td>
                                ${arrPlaintext.map(elm => {
                                    return `<td align="center" class='text-nowrap'>${elm}</td>`
                                }).join("")}
                            </tr>
                        </tbody>
                    </table>
                    `,
                ]
            })

            scenarios.push({
                person: '/img/avatars/user.png',
                position: 'right',
                message: [
                    `Wah, terimakasih ${activeNarator.nickname}! Sekarang saya paham seluruh proses dekripsinya!`
                ]
            })

            scenarios.push({
                person: activeNarator.image,
                position: 'left',
                message: [
                    'Selamat, kamu telah berhasil melakukan dan memahami proses enkripsi dan dekripsi menggunakan algoritma Caesar Cipher!'
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
                    chatContainer.scrollTop = chatContainer.scrollHeight
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
            chatContainer.scrollTop = chatContainer.scrollHeight
        })
    }

    const autoResize = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight + 16) + 'px';
        }
    }

    afterUpdate(() => {
        const textarea = document.getElementById('result');
        autoResize(textarea);
    })
</script>

<div class="container mb-5">
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
                    <div class="mb-2">
                        <label for="algoritma" class="form-label">Algoritma</label>
                        <select class="form-select" id="algoritma" 
                            on:change={(evt) => {selectedAlgorithm = evt.target.value}}
                            disabled="{chatState ? true : false}">
                            <option value="" selected hidden>Pilih Algoritma</option>
                            <option value="caesar">Algoritma Caesar</option>
                            <option value="vigenere">Algoritma Vigenère</option>
                        </select>
                    </div>
                    <div>
                        <label for="aksi" class="form-label">Aksi</label>
                        <select id="aksi" class="form-select" on:change={(evt) => aksi = evt.target.value} disabled="{chatState ? true : false}">
                            <option value="both" selected>Enkripsi & Dekripsi</option>
                            <option value="enkripsi">Enkripsi</option>
                            <option value="dekripsi">Dekripsi</option>
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
                    <h5 class="card-title mb-3">Masukkan Pesan ({aksi != 'dekripsi' ? 'Plaintext' : 'Ciphertext'})</h5>
                    <div>
                        <label for="plaintext" class="form-label">{aksi != 'dekripsi' ? 'Plaintext' : 'Ciphertext'}</label>
                        <textarea class="form-control" id="plaintext" on:input={(evt) => autoResize(evt.target)}
                        disabled="{chatState ? true : false}" placeholder="Masukkan Pesan"></textarea>
                        <p class="fs-6 fw-light my-1">Contoh "RAHASIA"</p>
                        {#if plaintext == ""}
                        <button class="btn btn-outline-primary form-control" on:click={() => {
                            if(document.getElementById('plaintext').value == "" || document.getElementById('plaintext').value == " "){
                                alert('Harap masukkan plaintext. Contoh: "RAHASIA"')
                                return
                            }

                            plaintext = document.getElementById('plaintext').value
                        }}>Submit</button>
                        {/if}
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
                        <label for="kunci" class="form-label">Kunci {selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)}</label>
                        {#if selectedAlgorithm == 'caesar'}
                        <input type='number' class="form-control" id="kunci" 
                            disabled="{chatState ? true : false}">
                        <p class="fs-6 fw-light my-1">Karena Algoritma Caesar Cipher menggunakan kunci berupa angka, maka masukkan angka min. 0 max. 25!</p>
                        {:else}
                        <input type='text' class="form-control" id="kunci" 
                            disabled="{chatState ? true : false}"
                            placeholder={selectedAlgorithm == 'vigenere' ? 'Masukkan Kata' : ''}>
                        <p class="fs-6 fw-light my-1">Algoritma Vigenère Cipher menggunakan kunci dalam bentuk kata. Contoh "AKU"</p>
                        {/if}
                        {#if kunci == ""}
                        <button class="btn btn-outline-primary form-control" on:click={() => {
                            if(document.getElementById('kunci').value == "" || document.getElementById('kunci').value == " "){
                                alert('Harap masukkan kunci!')
                                return
                            }

                            if(/\d/.test(document.getElementById('kunci').value) && selectedAlgorithm == 'vigenere'){
                                alert('Kunci Vigenère menggunakan kata, tidak boleh menggunakan angka!')
                                return
                            }

                            kunci = document.getElementById('kunci').value
                        }}>Submit</button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        {/if}
    </div>
    {#if kunci != ''}
    <div class="row py-4" transition:fly={{ y: -50 }}>
        <div class="d-flex justify-content-center gap-2">
            {#if !chatState}
            <button class="btn btn-primary" on:click={() => {
                let aksi = document.getElementById('aksi').value

                if(aksi == 'dekripsi'){
                    dekripsi()
                }else if(aksi == 'both'){
                    proses()
                }else{
                    enkripsi()
                }
            }}>Proses</button>
            {/if}
            <button class="btn btn-outline-light" on:click={() => window.location.reload()}>Reset</button>
        </div>
    </div>
    {/if}

    {#if chatState}
    <div class="row justify-content-center">
        <div class="col-6 mb-4" transition:fade={{ duration: 500 }}>
            <div class="card">
                <div class="card-header">
                    Hasil
                </div>
                <div class="card-body">
                    {#if aksi != 'dekripsi'}
                    <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                        <h5 class="card-title mb-0">Ciphertext</h5>
                        <button class="btn btn-outline-secondary" on:click={async () => {
                            try{
                                let value = document.getElementById('result').value
                                await navigator.clipboard.writeText(value)
                                alert('Berhasil menyalin ke Clipboard!')
                            }catch(err){
                                alert('Gagal menyalin ke Clipboard!')
                            }
                        }}>
                            <span>Copy</span>
                            <i class="bi bi-copy"></i>
                        </button>
                    </div>  
                    <div>
                        <textarea class="form-control" disabled id="result" rows="auto">{ ciphertext }</textarea>
                    </div>
                    {:else}
                    <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                        <h5 class="card-title mb-0">Plaintext</h5>
                        <button class="btn btn-outline-secondary" on:click={async () => {
                            try{
                                let value = document.getElementById('result').value
                                await navigator.clipboard.writeText(value)
                                alert('Berhasil menyalin ke Clipboard!')
                            }catch(err){
                                alert('Gagal menyalin ke Clipboard!')
                            }
                        }}>
                            <span>Copy</span>
                            <i class="bi bi-copy"></i>
                        </button>
                    </div>  
                    <div>
                        <textarea class="form-control" disabled id="result" rows="auto">{ plaintext }</textarea>
                    </div>
                    {/if}
                </div>
            </div>
        </div>
        {#if aksi != 'dekripsi'}
        <div class="col-12 mb-4" transition:fade={{ duration: 500, delay: 1000 }}>
            <div class="card">
                <div class="card-header">
                    Proses Enkripsi
                </div>
                <div class="card-body" style="overflow-x: auto;">
                    <table class="table table-bordered mb-0 table-responsive table-striped">
                        <tbody>
                            <tr>
                                <td class="text-nowrap">Plaintext</td>
                                {#each arrPlaintext as p}
                                    <td align="center" class="text-nowrap">{ p }</td>
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Urutan</td>
                                {#each decPlaintext as d}
                                    <td align="center" class="text-nowrap">{ d }</td>
                                {/each}
                            </tr>
                            {#if selectedAlgorithm == 'vigenere'}
                            <tr>
                                <td class="text-nowrap">Kunci</td>
                                {#each generateKey(kunci, plaintext) as k}
                                    <td align="center" class="text-nowrap">{ k }</td>
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Urutan</td>
                                {#each decKunci as d}
                                    <td align="center" class="text-nowrap">{ d }</td>
                                {/each}
                            </tr>
                            {/if}
                            <tr>
                                <td class="text-nowrap">Pergeseran (+)</td>
                                {#each decPlaintext as d, i}
                                    {#if selectedAlgorithm == 'vigenere'}
                                        <td align="center" class="text-nowrap">{ d === ' ' ? ' ' : d + " + " + decKunci[i] }</td>
                                    {:else}
                                        <td align="center" class="text-nowrap">{ d === ' ' ? ' ' : d + " + " + decKunci }</td>
                                    {/if}
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Hasil Geser</td>
                                {#each decPlaintext as d, i}
                                {#if selectedAlgorithm == 'vigenere'}
                                    <td align="center" class="text-nowrap">{ d === ' ' ? ' ' : d + decKunci[i] }</td>
                                {:else}
                                    <td align="center" class="text-nowrap">{ d === ' ' ? ' ' : d + decKunci }</td>
                                {/if}
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Mod 26</td>
                                {#each decCiphertext as d}
                                    <td align="center" class="text-nowrap">{ d }</td>
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Ciphertext</td>
                                {#each arrCiphertext as c}
                                    <td align="center" class="text-nowrap">{ c }</td>
                                {/each}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/if}
        {#if document.getElementById('aksi').value != 'enkripsi'}
        <div class="col-12 mb-4" transition:fade={{ duration: 500, delay: 2000 }}>
            <div class="card">
                <div class="card-header">Proses Dekripsi</div>
                <div class="card-body" style="overflow-x: auto;">
                    <table class="table table-bordered mb-0 table-responsive table-striped">
                        <tbody>
                            <tr>
                                <td class="text-nowrap">Ciphertext</td>
                                {#each arrCiphertext as c}
                                    <td align="center" class="text-nowrap">{ c }</td>
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Urutan</td>
                                {#each decCiphertext as d}
                                    <td align="center" class="text-nowrap">{ d }</td>
                                {/each}
                            </tr>
                            {#if selectedAlgorithm == 'vigenere'}
                            <tr>
                                <td class="text-nowrap">Kunci</td>
                                {#each generateKey(kunci, ciphertext) as k}
                                    <td align="center" class="text-nowrap">{ k }</td>
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Urutan</td>
                                {#each decKunci as d}
                                    <td align="center" class="text-nowrap">{ d }</td>
                                {/each}
                            </tr>
                            {/if}
                            <tr>
                                <td class="text-nowrap">Pergeseran (-)</td>
                                {#each decCiphertext as d, i}
                                {#if selectedAlgorithm == 'vigenere'}
                                    <td align="center" class="text-nowrap">{ d === ' ' ? ' ' : d + " - " + decKunci[i] }</td>
                                {:else}
                                    <td align="center" class="text-nowrap">{ d === ' ' ? ' ' : d + " - " + decKunci }</td>
                                {/if}
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Hasil Geser</td>
                                {#each decCiphertext as d, i}
                                {#if selectedAlgorithm == 'vigenere'}
                                    <td align="center" class="text-nowrap">{ d === ' ' ? ' ' : d - decKunci[i] }</td>
                                {:else}
                                    <td align="center" class="text-nowrap">{ d === ' ' ? ' ' : d - decKunci }</td>
                                {/if}
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Mod 26</td>
                                {#each decPlaintext as d}
                                    <td align="center" class="text-nowrap">{ d }</td>
                                {/each}
                            </tr>
                            <tr>
                                <td class="text-nowrap">Plaintext</td>
                                {#each arrPlaintext as p}
                                    <td align="center" class="text-nowrap">{ p }</td>
                                {/each}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/if}
        <div class="col-12 mb-3" transition:fade={{ duration: 500, delay: 3000 }}>
            {#if aksi == 'both'}
            <div class="alert alert-secondary text-center" role="alert">
                Ingin lebih memahami langkah-langkah enkripsi maupun dekripsi dari Algoritma { selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1) } Cipher? Gunakan fitur chat dibawah ya!
            </div>
            {:else if aksi == 'enkripsi'}
            <div class="alert alert-secondary text-center" role="alert">
                Ingin lebih memahami langkah-langkah enkripsi dari Algoritma { selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1) } Cipher? Gunakan fitur chat dibawah ya!
            </div>
            {:else}
            <div class="alert alert-secondary text-center" role="alert">
                Ingin lebih memahami langkah-langkah dekripsi dari Algoritma { selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1) } Cipher? Gunakan fitur chat dibawah ya!
            </div>
            {/if}
        </div>
    </div>

    <div class="row justify-content-center" transition:fade={{ duration: 500, delay: 4000 }}>
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