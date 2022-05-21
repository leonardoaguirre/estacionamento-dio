interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date;
}

(function () {
    const q = (query: string): HTMLInputElement | null => document.querySelector(query)

    q("#cadastrar")?.addEventListener('click', () => {
        const nome = q("#nome")?.value;
        const placa = q("#placa")?.value;

        if (!nome || !placa) {
            alert('O nome e placa são obrigatorios!');
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date() }, true)
    })

    function patio() {
        function ler(): Veiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : []
        }
        function adicionar(veiculo: Veiculo, salva?: boolean) {
            const linha = document.createElement("tr")

            linha.innerHTML = `
            <td>${veiculo.nome}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.entrada}</td>
            <td><button class="delete" data-placa="${veiculo.placa}">X</button></td>
            `

            q("#tbpatio")?.appendChild(linha)

            if (salva) salvar([...ler(), veiculo])
        }
        function remover() {

        }
        function salvar(veiculos: Veiculo[]) {
            localStorage.setItem('patio', JSON.stringify(veiculos))
        }
        function renderizar() {
            q("#tbpatio")!.innerHTML = ''
            const patio = ler()

            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo))
            }
        }
        return { ler, adicionar, remover, salvar, renderizar }
    }

    patio().renderizar()
})();