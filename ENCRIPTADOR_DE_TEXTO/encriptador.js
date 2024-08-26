document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.querySelector(".form_input");
    const mensaje = document.querySelector(".result_text");
    const copiarBtn = document.querySelector("#copiarBtn");
    const encriptarBtn = document.querySelector("#encriptarBtn");
    const desencriptarBtn = document.querySelector("#desencriptarBtn");
    const resultContainer = document.querySelector(".result");
    const resultTitle = document.querySelector(".result_title");
    const loader = document.querySelector(".loader");
    const resultImg = document.querySelector(".result_img");
    const alertSpan = document.querySelector(".alert_msj span");

    const matrizCodigo = [
        ["a", "ai"], 
        ["e", "enter"], 
        ["i", "imes"], 
        ["o", "ober"], 
        ["u", "ufat"]
    ];

    function encriptar(texto) {
        return matrizCodigo.reduce((acc, [letra, codigo]) =>
            acc.replaceAll(letra, codigo), texto.toLowerCase());
    }

    function desencriptar(texto) {
        return matrizCodigo.slice().reverse().reduce((acc, [letra, codigo]) =>
            acc.replaceAll(codigo, letra), texto.toLowerCase());
    }

    function normalizarTexto(texto) {
        return texto.toLowerCase()
            .normalize('NFD') 
            .replace(/[\u0300-\u036f]/g, '');
    }

    function actualizarResultado(texto, tipo) {
        mensaje.innerText = texto;
        resultContainer.classList.remove('hidden');
        copiarBtn.classList.remove('hidden');
        resultTitle.classList.remove('hidden');
        resultTitle.innerText = tipo; 
    }

    function copiarTexto() {
        navigator.clipboard.writeText(mensaje.innerText)
            .then(() => {
                alert('¡Texto copiado al porta papeles!');
                mensaje.innerText = ""; 
                verificarTexto(); 
                resultTitle.classList.add('hidden'); 
            })
            .catch(err => console.error('Error al copiar el texto: ', err));
    }

    function mostrarLoader() {
        loader.classList.remove('hidden');
        resultImg.classList.add('hidden');
        resultTitle.classList.add('hidden'); 
    }

    function ocultarLoader() {
        loader.classList.add('hidden');
        resultImg.classList.remove('hidden');
        verificarTexto(); 
    }

    function verificarTexto() {
        if (textArea.value.trim() === "") {
            resultTitle.classList.remove('hidden');
        } else {
            resultTitle.classList.add('hidden');
        }
    }

    function verificarCaracteres() {
        const texto = textArea.value;
        const contieneCaracteresEspeciales = /[0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]/.test(texto);

        if (contieneCaracteresEspeciales) {
            alertSpan.style.color = 'red';
        } else {
            alertSpan.style.color = '';
        }
    }

    textArea.addEventListener('input', () => {
        textArea.value = normalizarTexto(textArea.value);
        mostrarLoader();
        verificarTexto();
        verificarCaracteres();
    });

    encriptarBtn.addEventListener('click', () => {
        const textoEncriptado = encriptar(textArea.value);
        actualizarResultado(textoEncriptado, " Texto encriptado");
        textArea.value = "";
        ocultarLoader();
    });

    desencriptarBtn.addEventListener('click', () => {
        const textoDesencriptado = desencriptar(textArea.value);
        actualizarResultado(textoDesencriptado, " Texto desencriptado");
        textArea.value = "";
        ocultarLoader();
    });

    copiarBtn.addEventListener('click', copiarTexto);

    
    verificarTexto();
});
