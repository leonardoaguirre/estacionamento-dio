(function () {
    const q = (query: string): HTMLInputElement | null => document.querySelector(query)

    q("#cadastrar")?.addEventListener('click', () => {
        const nome = q("#nome")?.value;
        const placa = q("#placa")?.value;

        if (!nome || !placa) {
            alert('O nome e placa são obrigatorios!');
            return;
        }
    })
})();