(function () {
    var _a;
    const q = (query) => document.querySelector(query);
    (_a = q("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = q("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = q("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert('O nome e placa são obrigatorios!');
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const linha = document.createElement("tr");
            linha.innerHTML = `
            <td>${veiculo.nome}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.entrada}</td>
            <td><button class="delete" data-placa="${veiculo.placa}">X</button></td>
            `;
            (_a = q("#tbpatio")) === null || _a === void 0 ? void 0 : _a.appendChild(linha);
            (_b = linha.querySelector(".delete")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const veiculo = ler().find(veiculo => veiculo.placa == placa);
            const tempo = calcTempo(new Date().getTime() - new Date(veiculo.entrada).getTime());
            if (!confirm(`O veiculo ${veiculo.nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter(vec => vec.placa == veiculo.placa));
            renderizar();
        }
        function calcTempo(milisegundos) {
            const minutos = Math.floor(milisegundos / 60000);
            const segundos = Math.floor((milisegundos % 60000) / 1000);
            return `${minutos} minuto(s) e ${segundos} segundo(s)`;
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function renderizar() {
            q("#tbpatio").innerHTML = '';
            const patio = ler();
            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, renderizar };
    }
    patio().renderizar();
})();
