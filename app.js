console.log("APP CARREGOU");

// =====================================================
// LIMPAR / EXTRAIR URL DA IMAGEM
// =====================================================

function limparUrl(url) {

    if (!url || typeof url !== "string") {
        return "";
    }

    url = url.trim();

    // -------------------------------------------------
    // Markdown:
    // [texto](https://site.com/imagem.png)
    // -------------------------------------------------

    const markdown =
        url.match(/\]\((https?:\/\/[^)]+)\)/);

    if (markdown) {
        url = markdown[1];
    }

    // -------------------------------------------------
    // Caso ainda esteja no formato:
    // [https://site.com/imagem.png]
    // -------------------------------------------------

    if (
        url.startsWith("[") &&
        url.endsWith("]")
    ) {
        url =
            url.substring(
                1,
                url.length - 1
            );
    }

    // -------------------------------------------------
    // Se ainda houver uma URL dentro do texto,
    // pega a primeira URL http/https encontrada
    // -------------------------------------------------

    const urlEncontrada =
        url.match(/https?:\/\/[^\s\])]+/);

    if (urlEncontrada) {
        url = urlEncontrada[0];
    }

    // -------------------------------------------------
    // Remove caracteres que podem ter vindo
    // escapados do JSON / Markdown
    // -------------------------------------------------

    url = url
        .replace(/\\:/g, ":")
        .replace(/\\&/g, "&")
        .replace(/\\_/g, "_")
        .replace(/\\+/g, "+");

    return url.trim();
}


// =====================================================
// CONVERTER GOOGLE DRIVE
// =====================================================

function converterImagem(url) {

    url = limparUrl(url);

    if (!url) {
        return "";
    }


    // -------------------------------------------------
    // GOOGLE DRIVE
    //
    // /file/d/ID/view
    // -------------------------------------------------

    let match =
        url.match(
            /drive\.google\.com\/file\/d\/([^\/?]+)/
        );

    if (match) {

        const id =
            match[1];

        return (
            "https://drive.google.com/uc?export=view&id=" +
            id
        );
    }


    // -------------------------------------------------
    // GOOGLE DRIVE
    //
    // /open?id=ID
    // -------------------------------------------------

    match =
        url.match(
            /drive\.google\.com\/open\?id=([^&]+)/
        );

    if (match) {

        const id =
            match[1];

        return (
            "https://drive.google.com/uc?export=view&id=" +
            id
        );
    }


    // -------------------------------------------------
    // GOOGLE DRIVE
    //
    // /uc?id=ID
    // -------------------------------------------------

    match =
        url.match(
            /drive\.google\.com\/uc\?(?:[^#]*&)?id=([^&]+)/
        );

    if (match) {

        const id =
            match[1];

        return (
            "https://drive.google.com/uc?export=view&id=" +
            id
        );
    }


    // -------------------------------------------------
    // GOOGLE DRIVE
    //
    // /drive/u/0/folders/ID
    //
    // ATENÇÃO:
    // Pasta do Drive não pode ser usada diretamente
    // como imagem.
    // -------------------------------------------------

    if (
        url.includes(
            "drive.google.com/drive/"
        )
    ) {

        console.warn(
            "O link informado é de uma pasta do Google Drive e não de uma imagem:",
            url
        );

        return url;
    }


    // -------------------------------------------------
    // OUTRAS IMAGENS
    // -------------------------------------------------

    return url;
}


// =====================================================
// COLOCAR IMAGEM
// =====================================================

function colocarImagem(elemento, url) {

    if (!elemento || !url) {
        return;
    }


    const imagemConvertida =
        converterImagem(url);


    if (!imagemConvertida) {
        return;
    }


    elemento.src =
        imagemConvertida;


    elemento.onerror = function () {

        console.warn(
            "Não foi possível carregar a imagem:",
            imagemConvertida
        );

        elemento.style.display =
            "none";
    };
}


// =====================================================
// CONTROLE DAS TELAS
// =====================================================

function esconderTudo() {

    const inicio =
        document.querySelector(".inicio");

    const lojas =
        document.querySelector(".nossaslojas");

    const oferta =
        document.querySelector(".oferta");

    const receitas =
        document.querySelector(".receitas");

    const clube =
        document.querySelector(".clube");

    const noticias =
        document.querySelector(".noticias");

    const trabalhe =
        document.querySelector(".trabalheconosco");


    if (inicio)
        inicio.style.display = "none";

    if (lojas)
        lojas.style.display = "none";

    if (oferta)
        oferta.style.display = "none";

    if (receitas)
        receitas.style.display = "none";

    if (clube)
        clube.style.display = "none";

    if (noticias)
        noticias.style.display = "none";

    if (trabalhe)
        trabalhe.style.display = "none";
}


// =====================================================
// MOSTRAR TELAS
// =====================================================

function mostrarInicio() {

    esconderTudo();

    const elemento =
        document.querySelector(".inicio");

    if (elemento) {
        elemento.style.display = "block";
    }
}


function mostrarLojas() {

    esconderTudo();

    const elemento =
        document.querySelector(".nossaslojas");

    if (elemento) {
        elemento.style.display = "block";
    }
}


function mostrarOfertas() {

    esconderTudo();

    const elemento =
        document.querySelector(".oferta");

    if (elemento) {
        elemento.style.display = "block";
    }
}


function mostrarReceitas() {

    esconderTudo();

    const elemento =
        document.querySelector(".receitas");

    if (elemento) {
        elemento.style.display = "block";
    }
}


function mostrarClube() {

    esconderTudo();

    const elemento =
        document.querySelector(".clube");

    if (elemento) {
        elemento.style.display = "block";
    }
}


function mostrarNoticias() {

    esconderTudo();

    const elemento =
        document.querySelector(".noticias");

    if (elemento) {
        elemento.style.display = "block";
    }
}


function mostrarTrabalhe() {

    esconderTudo();

    const elemento =
        document.querySelector(".trabalheconosco");

    if (elemento) {
        elemento.style.display = "block";
    }
}


// =====================================================
// CRIAR CATEGORIA
// =====================================================

function criarCategoriaProdutos(
    container,
    nome,
    id
) {

    const categoria =
        document.createElement("div");

    categoria.className =
        "categoria";

    categoria.id =
        "categoria-" + id;


    const titulo =
        document.createElement("h2");

    titulo.textContent =
        nome;


    const grid =
        document.createElement("div");

    grid.className =
        "produtos-grid";

    grid.id =
        id;


    categoria.appendChild(
        titulo
    );

    categoria.appendChild(
        grid
    );

    container.appendChild(
        categoria
    );


    return grid;
}


// =====================================================
// PRODUTOS
// =====================================================

function carregarProdutos(dados) {

    const produtosContainer =
        document.getElementById("produtos");


    if (
        !produtosContainer ||
        !Array.isArray(dados.produtos)
    ) {
        console.warn(
            "Container #produtos ou dados.produtos não encontrado."
        );

        return;
    }


    // -------------------------------------------------
    // Limpa somente o conteúdo gerado anteriormente
    // -------------------------------------------------

    produtosContainer.innerHTML = "";


    // -------------------------------------------------
    // Criar os grupos de categorias
    // -------------------------------------------------

    const categorias = {

        Merc: {
            nome: "Mercearia",
            produtos: []
        },

        Beb: {
            nome: "Bebidas",
            produtos: []
        },

        Aco: {
            nome: "Açougue",
            produtos: []
        },

        Hig: {
            nome: "Higiene",
            produtos: []
        },

        Pad: {
            nome: "Padaria",
            produtos: []
        }

    };


    // -------------------------------------------------
    // Separar produtos pela primeira parte do ID
    // -------------------------------------------------

    dados.produtos.forEach(
        produto => {

            if (
                !produto.nome &&
                !produto.valor &&
                !produto.imagem
            ) {
                return;
            }


            const id =
                String(
                    produto.id || ""
                );


            // Exemplo:
            //
            // Merc1 -> Merc
            // Beb2  -> Beb
            // Aco3  -> Aco
            // Hig5  -> Hig
            // Pad1  -> Pad

            let categoriaId = "";

            if (
                id.startsWith("Merc")
            ) {

                categoriaId =
                    "Merc";

            } else if (
                id.startsWith("Beb")
            ) {

                categoriaId =
                    "Beb";

            } else if (
                id.startsWith("Aco")
            ) {

                categoriaId =
                    "Aco";

            } else if (
                id.startsWith("Hig")
            ) {

                categoriaId =
                    "Hig";

            } else if (
                id.startsWith("Pad")
            ) {

                categoriaId =
                    "Pad";
            }


            if (
                categoriaId &&
                categorias[categoriaId]
            ) {

                categorias[categoriaId]
                    .produtos
                    .push(produto);
            }

        }
    );


    // -------------------------------------------------
    // Criar categorias somente quando tiver produto
    // -------------------------------------------------

    Object.keys(categorias).forEach(
        categoriaId => {

            const categoria =
                categorias[categoriaId];


            if (
                categoria.produtos.length === 0
            ) {
                return;
            }


            const grid =
                criarCategoriaProdutos(
                    produtosContainer,
                    categoria.nome,
                    categoriaId
                );


            // -------------------------------------------------
            // Criar cards
            // -------------------------------------------------

            categoria.produtos.forEach(
                produto => {

                    const card =
                        document.createElement(
                            "div"
                        );

                    card.className =
                        "produto-card";


                    // -----------------------------------------
                    // IMAGEM
                    // -----------------------------------------

                    if (
                        produto.imagem
                    ) {

                        const img =
                            document.createElement(
                                "img"
                            );

                        img.className =
                            "produto-imagem";

                        img.alt =
                            produto.nome ||
                            "Produto";


                        colocarImagem(
                            img,
                            produto.imagem
                        );


                        card.appendChild(
                            img
                        );
                    }


                    // -----------------------------------------
                    // NOME
                    // -----------------------------------------

                    if (
                        produto.nome
                    ) {

                        const nome =
                            document.createElement(
                                "h3"
                            );

                        nome.className =
                            "produto-nome";

                        nome.textContent =
                            produto.nome;


                        card.appendChild(
                            nome
                        );
                    }


                    // -----------------------------------------
                    // PREÇO
                    // -----------------------------------------

                    if (
                        produto.valor !== undefined &&
                        produto.valor !== null &&
                        produto.valor !== ""
                    ) {

                        const valor =
                            document.createElement(
                                "span"
                            );

                        valor.className =
                            "produto-valor";

                        valor.textContent =
                            "R$ " +
                            produto.valor;


                        card.appendChild(
                            valor
                        );
                    }


                    grid.appendChild(
                        card
                    );

                }
            );

        }
    );

}


// =====================================================
// JORNAL
// =====================================================

function carregarJornal(dados) {

    if (!dados.jornal) {
        return;
    }


    const pagFrente =
        document.getElementById(
            "pagfrente"
        );

    const pagVerso =
        document.getElementById(
            "pagverso"
        );


    if (
        pagFrente &&
        dados.jornal.pagfrente
    ) {

        colocarImagem(
            pagFrente,
            dados.jornal.pagfrente
        );
    }


    if (
        pagVerso &&
        dados.jornal.pagverso
    ) {

        colocarImagem(
            pagVerso,
            dados.jornal.pagverso
        );
    }
}


// =====================================================
// DESTAQUES
// =====================================================

function carregarDestaques(dados) {

    const destaquesContainer =
        document.getElementById(
            "destaquesGrid"
        );


    if (
        !destaquesContainer ||
        !Array.isArray(dados.destaques)
    ) {
        return;
    }


    destaquesContainer.innerHTML =
        "";


    dados.destaques.forEach(
        destaque => {

            if (
                !destaque.imgDestaque &&
                !destaque.nomeDestaque &&
                !destaque.descricaoDestaque &&
                !destaque.valorDestaque
            ) {
                return;
            }


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "destaque-card";


            // ---------------------------------------------
            // IMAGEM
            // ---------------------------------------------

            const imagemContainer =
                document.createElement(
                    "div"
                );

            imagemContainer.className =
                "destaque-imagem";


            if (
                destaque.imgDestaque
            ) {

                const img =
                    document.createElement(
                        "img"
                    );

                img.alt =
                    destaque.nomeDestaque ||
                    "Produto destaque";


                colocarImagem(
                    img,
                    destaque.imgDestaque
                );


                imagemContainer.appendChild(
                    img
                );
            }


            card.appendChild(
                imagemContainer
            );


            // ---------------------------------------------
            // INFORMAÇÕES
            // ---------------------------------------------

            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "destaque-info";


            if (
                destaque.nomeDestaque
            ) {

                const nome =
                    document.createElement(
                        "h3"
                    );

                nome.textContent =
                    destaque.nomeDestaque;


                info.appendChild(
                    nome
                );
            }


            if (
                destaque.descricaoDestaque
            ) {

                const descricao =
                    document.createElement(
                        "p"
                    );

                descricao.textContent =
                    destaque.descricaoDestaque;


                info.appendChild(
                    descricao
                );
            }


            if (
                destaque.valorDestaque
            ) {

                const preco =
                    document.createElement(
                        "div"
                    );

                preco.className =
                    "preco";


                const valor =
                    document.createElement(
                        "span"
                    );

                valor.textContent =
                    "R$ " +
                    destaque.valorDestaque;


                preco.appendChild(
                    valor
                );


                info.appendChild(
                    preco
                );
            }


            card.appendChild(
                info
            );


            destaquesContainer.appendChild(
                card
            );

        }
    );
}


// =====================================================
// RECEITAS
// =====================================================

function carregarReceitas(dados) {

    const receitasContainer =
        document.getElementById(
            "receitasGrid"
        );


    if (
        !receitasContainer ||
        !Array.isArray(dados.receitas)
    ) {
        return;
    }


    receitasContainer.innerHTML =
        "";


    dados.receitas.forEach(
        receita => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "receitas-card";


            if (
                receita.imagem
            ) {

                const img =
                    document.createElement(
                        "img"
                    );

                img.alt =
                    receita.titulo ||
                    "Receita";


                colocarImagem(
                    img,
                    receita.imagem
                );


                card.appendChild(
                    img
                );
            }


            const titulo =
                document.createElement(
                    "h3"
                );

            titulo.textContent =
                receita.titulo || "";


            card.appendChild(
                titulo
            );


            if (
                receita.descricao
            ) {

                const descricao =
                    document.createElement(
                        "p"
                    );

                descricao.textContent =
                    receita.descricao;


                card.appendChild(
                    descricao
                );
            }


            if (
                receita.link
            ) {

                const link =
                    document.createElement(
                        "a"
                    );

                link.textContent =
                    "Ver receita";

                link.href =
                    receita.link;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";


                card.appendChild(
                    link
                );
            }


            receitasContainer.appendChild(
                card
            );

        }
    );
}


// =====================================================
// CLUBE AVENIDA
// =====================================================

function carregarClube(dados) {

    if (!dados.clube) {
        return;
    }


    const pequeno =
        document.getElementById(
            "clubeTituloPequeno"
        );

    const titulo =
        document.getElementById(
            "clubeTitulo"
        );

    const descricao =
        document.getElementById(
            "clubeDescricao"
        );

    const infoTitulo =
        document.getElementById(
            "clubeInfoTitulo"
        );

    const infoDescricao =
        document.getElementById(
            "clubeInfoDescricao"
        );

    const botao =
        document.getElementById(
            "clubeBotao"
        );


    if (pequeno) {

        pequeno.textContent =
            dados.clube.tituloPequeno ||
            "";
    }


    if (titulo) {

        titulo.textContent =
            dados.clube.titulo ||
            "";
    }


    if (descricao) {

        descricao.textContent =
            dados.clube.descricao ||
            "";
    }


    if (infoTitulo) {

        infoTitulo.textContent =
            dados.clube.infoTitulo ||
            "";
    }


    if (infoDescricao) {

        infoDescricao.textContent =
            dados.clube.infoDescricao ||
            "";
    }


    if (botao) {

        botao.textContent =
            dados.clube.botaoTexto ||
            "";

        botao.href =
            dados.clube.botaoLink ||
            "#";
    }
}


// =====================================================
// NOTÍCIAS
// =====================================================

function carregarNoticias(dados) {

    const container =
        document.getElementById(
            "noticiasGrid"
        );


    if (
        !container ||
        !Array.isArray(dados.noticias)
    ) {
        return;
    }


    container.innerHTML =
        "";


    dados.noticias.forEach(
        noticia => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "noticia-card";


            if (
                noticia.imagem
            ) {

                const img =
                    document.createElement(
                        "img"
                    );

                img.alt =
                    noticia.titulo ||
                    "Notícia";


                colocarImagem(
                    img,
                    noticia.imagem
                );


                card.appendChild(
                    img
                );
            }


            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "noticia-info";


            if (
                noticia.categoria
            ) {

                const categoria =
                    document.createElement(
                        "span"
                    );

                categoria.textContent =
                    noticia.categoria;


                info.appendChild(
                    categoria
                );
            }


            if (
                noticia.titulo
            ) {

                const titulo =
                    document.createElement(
                        "h3"
                    );

                titulo.textContent =
                    noticia.titulo;


                info.appendChild(
                    titulo
                );
            }


            if (
                noticia.descricao
            ) {

                const descricao =
                    document.createElement(
                        "p"
                    );

                descricao.textContent =
                    noticia.descricao;


                info.appendChild(
                    descricao
                );
            }


            if (
                noticia.link
            ) {

                const link =
                    document.createElement(
                        "a"
                    );

                link.textContent =
                    "Leia mais";

                link.href =
                    noticia.link;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";


                info.appendChild(
                    link
                );
            }


            card.appendChild(
                info
            );


            container.appendChild(
                card
            );

        }
    );
}


// =====================================================
// CARREGAR DADOS.JSON
// =====================================================

fetch("dados.json")

.then(res => {

    if (!res.ok) {

        throw new Error(
            "Não foi possível carregar o dados.json"
        );
    }

    return res.json();
})


.then(dados => {

    console.log(
        "DADOS CARREGADOS:",
        dados
    );


    // =================================================
    // PRODUTOS
    // =================================================

    carregarProdutos(dados);


    // =================================================
    // JORNAL
    // =================================================

    carregarJornal(dados);


    // =================================================
    // DESTAQUES
    // =================================================

    carregarDestaques(dados);


    // =================================================
    // RECEITAS
    // =================================================

    carregarReceitas(dados);


    // =================================================
    // CLUBE
    // =================================================

    carregarClube(dados);


    // =================================================
    // NOTÍCIAS
    // =================================================

    carregarNoticias(dados);

})


.catch(err => {

    console.error(
        "Erro ao carregar dados.json:",
        err
    );

});

