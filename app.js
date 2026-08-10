console.log("APP CARREGOU");

// ==========================
// CONTROLE DAS TELAS
// ==========================
function esconderTudo() {
    document.querySelector(".inicio").style.display = "none";
    document.querySelector(".nossaslojas").style.display = "none";
    document.querySelector(".oferta").style.display = "none";
    document.querySelector(".trabalheconosco").style.display = "none";
}

function mostrarInicio() {
    esconderTudo();
    document.querySelector(".inicio").style.display = "block";
}

function mostrarLojas() {
    esconderTudo();
    document.querySelector(".nossaslojas").style.display = "block";
}

function mostrarOfertas() {
    esconderTudo();
    document.querySelector(".oferta").style.display = "block";
}

function mostrarTrabalhe() {
    esconderTudo();
    document.querySelector(".trabalheconosco").style.display = "block";
}

// ==========================
// CARREGAR DADOS DO JSON
// ==========================
fetch("dados.json")
    .then(res => res.json())
    .then(dados => {

        // ==========================
        // PRODUTOS
        // ==========================
        dados.produtos.forEach(produto => {

            const nome = document.getElementById("nome" + produto.id);
            const valor = document.getElementById("valor" + produto.id);
            const img = document.getElementById("img" + produto.id);

            if (nome) {
                nome.textContent = produto.nome || "";
            }

            if (valor) {
                valor.textContent = produto.valor || "";
            }

            if (img && produto.imagem) {
                img.src = produto.imagem;
            }
        });

        // ==========================
        // JORNAL DE OFERTAS
        // HTML:
        // <img id="pagfrente">
        // <img id="pagverso">
        // ==========================
        const pagFrente = document.getElementById("pagfrente");
        const pagVerso = document.getElementById("pagverso");

        if (pagFrente && dados.jornal.pagfrente) {
            pagFrente.src = dados.jornal.pagfrente;
        }

        if (pagVerso && dados.jornal.pagverso) {
            pagVerso.src = dados.jornal.pagverso;
        }

        // ==========================
        // PRODUTO EM DESTAQUE
        // HTML esperado:
        // imgDestaque, nomeDestaque,
        // descricaoDestaque, valorDestaque
        // ==========================
        const imgDestaque = document.getElementById("imgDestaque");
        const nomeDestaque = document.getElementById("nomeDestaque");
        const descricaoDestaque = document.getElementById("descricaoDestaque");
        const valorDestaque = document.getElementById("valorDestaque");

        if (imgDestaque && dados.destaque.imgDestaque) {
            imgDestaque.src = dados.destaque.imgDestaque;
        }

        if (nomeDestaque) {
            nomeDestaque.textContent = dados.destaque.nomeDestaque || "";
        }

        if (descricaoDestaque) {
            descricaoDestaque.textContent = dados.destaque.descricaoDestaque || "";
        }

        if (valorDestaque) {
            valorDestaque.textContent = dados.destaque.valorDestaque || "";
        }

    })
    .catch(err => console.error("Erro ao carregar dados.json:", err));