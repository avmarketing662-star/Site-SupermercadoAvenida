// =====================================================
// LIMPAR URL DA IMAGEM
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
    // Caso esteja:
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
    // Se houver uma URL dentro do texto,
    // pega a primeira encontrada
    // -------------------------------------------------

    const urlEncontrada =
        url.match(
            /https?:\/\/[^\s\])]+/
        );

    if (urlEncontrada) {
        url = urlEncontrada[0];
    }


    // -------------------------------------------------
    // Remove caracteres escapados
    // -------------------------------------------------

    url = url
        .replace(/\\:/g, ":")
        .replace(/\\&/g, "&")
        .replace(/\\_/g, "_")
        .replace(/\\+/g, "+");


    return url.trim();
}



// =====================================================
// COLOCAR IMAGEM
// =====================================================

function colocarImagem(elemento, url) {

    if (!elemento || !url) {
        return;
    }


    const imagem =
        limparUrl(url);


    if (!imagem) {
        return;
    }


    elemento.src =
        imagem;


    // -------------------------------------------------
    // Caso a imagem não carregue
    // -------------------------------------------------

    elemento.onerror = function () {

        console.warn(
            "Não foi possível carregar a imagem:",
            imagem
        );

        elemento.style.display =
            "none";

    };

}

// =========================================================
// CONTROLE DO MENU ATIVO
// =========================================================

function ativarMenu(elemento) {

    document
        .querySelectorAll(".menu a")
        .forEach(link => {

            link.classList.remove("active");

        });

    if (elemento) {

        elemento.classList.add("active");

    }

}
// =========================================================
// CONTROLE DAS TELAS
// =========================================================

function esconderTudo() {

    document.querySelector(".inicio")?.classList.add("tela-escondida");
    document.querySelector(".sobre")?.classList.add("tela-escondida");
    document.querySelector(".mapa")?.classList.add("tela-escondida");
    document.querySelector(".titulo-lojas")?.classList.add("tela-escondida");
    document.querySelector(".nossaslojas")?.classList.add("tela-escondida");
    document.querySelector(".oferta")?.classList.add("tela-escondida");
    document.querySelector(".destaques")?.classList.add("tela-escondida");
    document.querySelector(".receitas")?.classList.add("tela-escondida");
    document.querySelector(".clube")?.classList.add("tela-escondida");
    document.querySelector(".noticias-header")?.classList.add("tela-escondida");
    document.querySelector(".noticias")?.classList.add("tela-escondida");
    document.querySelector(".trabalheconosco")?.classList.add("tela-escondida");
}


// =========================================================
// MOSTRAR INÍCIO
// =========================================================

function mostrarInicio(elemento) {

    ativarMenu(elemento);

    esconderTudo();

    document.querySelector(".inicio")?.classList.remove("tela-escondida");
    document.querySelector(".sobre")?.classList.remove("tela-escondida");
    document.querySelector(".mapa")?.classList.remove("tela-escondida");
    document.querySelector(".destaques")?.classList.remove("tela-escondida");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================================================
// MOSTRAR LOJAS
// =========================================================

function mostrarLojas(elemento) {

    ativarMenu(elemento);
    esconderTudo();
    document.querySelector(".mapa")?.classList.remove("tela-escondida");
    document.querySelector(".titulo-lojas")?.classList.remove("tela-escondida");
    document.querySelector(".nossaslojas")?.classList.remove("tela-escondida");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================================
// MOSTRAR OFERTAS / JORNAL + DESTAQUES
// =========================================================

function mostrarOfertas(elemento) {

    // Esconde todas as telas
    esconderTudo();

    // Mostra as ofertas
    document
        .querySelector(".oferta")
        ?.classList.remove("tela-escondida");

    // Mostra também os destaques
    document
        .querySelector(".destaques")
        ?.classList.remove("tela-escondida");

    // Vai para o início da área de ofertas
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================================================
// MOSTRAR RECEITAS
// =========================================================

function mostrarReceitas(elemento) {

    ativarMenu(elemento);
    esconderTudo();

    document.querySelector(".receitas")?.classList.remove("tela-escondida");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================================================
// MOSTRAR CLUBE
// =========================================================

function mostrarClube(elemento) {

    ativarMenu(elemento);
    esconderTudo();
    document.querySelector(".clube")?.classList.remove("tela-escondida");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================================
// MOSTRAR NOTÍCIAS
// =========================================================

function mostrarNoticias(elemento) {

    ativarMenu(elemento);
    esconderTudo();
    document.querySelector(".noticias-header")?.classList.remove("tela-escondida");
    document.querySelector(".noticias")?.classList.remove("tela-escondida");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================================
// MOSTRAR TRABALHE CONOSCO
// =========================================================

function mostrarTrabalhe(elemento) {

    ativarMenu(elemento);
    esconderTudo();
    document.querySelector(".trabalheconosco")?.classList.remove("tela-escondida");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================================
// AO ABRIR O SITE
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    const inicio =
    document.querySelector('.menu a[onclick*="mostrarInicio"]');
    mostrarInicio();

});

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

