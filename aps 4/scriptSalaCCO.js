// Função para adicionar um nome a um assento
function adicionarNome() {
    var id = document.getElementById("idCadeira").value;
    var nome = document.getElementById("nomeAdicionar").value;

    // Salvar no localStorage
    localStorage.setItem("assento_" + id, nome);

    // Atualizar o assento na página
    atualizarAssento(id, nome);
}

// Função para atualizar os assentos na página
function atualizarAssento(id, nome) {
    var assento = document.getElementById("assento" + id).querySelector(".nome");
    if (assento) {
        assento.textContent = nome;
    }
}

// Função para carregar os nomes salvos ao carregar a página
window.onload = function() {
    for (var i = 1; i <= 44; i++) {
        var nomeSalvo = localStorage.getItem("assento_" + i);
        if (nomeSalvo) {
            atualizarAssento(i, nomeSalvo);
        }
    }
}
