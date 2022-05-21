interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string;
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
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true)
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

            linha.querySelector(".delete")?.addEventListener('click', function () {
                remover(this.dataset.placa)
            })

            if (salva) salvar([...ler(), veiculo])
        }

        function remover(placa: string) {
            const veiculo = ler().find(veiculo => veiculo.placa == placa)

            const tempo = calcTempo(new Date().getTime() - new Date(veiculo.entrada).getTime())

            if (!confirm(`O veiculo ${veiculo.nome} permaneceu por ${tempo}. Deseja encerrar?`)) return
            salvar(ler().filter(vec => vec.placa == veiculo.placa))
            renderizar()
        }

        function calcTempo(milisegundos: number): string {
            const minutos = Math.floor(milisegundos / 60000)
            const segundos = Math.floor((milisegundos % 60000) / 1000)

            return `${minutos} minuto(s) e ${segundos} segundo(s)`
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