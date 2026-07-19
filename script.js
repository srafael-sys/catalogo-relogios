// 1. BANCO DE DADOS DOS PRODUTOS (MOCK DATA)
const produtos = [
    {
        id: 1,
        nome: "Relógio Casio Vintage Digital",
        categoria: "relogio",
        precoOriginal: 199.90,
        precoPromo: 149.90,
        codigoOriginal: "85100",
        codigoPromo: "5673",
        imagem: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop&q=60" // Imagem temporária da internet
    },
    {
        id: 2,
        nome: "Smartwatch Amazfit Bip 5",
        categoria: "smart",
        precoOriginal: 450.00,
        precoPromo: 380.00,
        codigoOriginal: "92340",
        codigoPromo: "4412",
        imagem: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        nome: "Relógio Euro Feminino Dourado",
        categoria: "relogio",
        precoOriginal: 299.00,
        precoPromo: 199.00,
        codigoOriginal: "74115",
        codigoPromo: "8831",
        imagem: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        nome: "Smartwatch Redmi Watch 4",
        categoria: "smart",
        precoOriginal: 599.00,
        precoPromo: 499.00,
        codigoOriginal: "10544",
        codigoPromo: "9901",
        imagem: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&auto=format&fit=crop&q=60"
    }
];

// 2. SELEÇÃO DE ELEMENTOS DO HTML
const vitrine = document.getElementById("vitrine-produtos");
const btnTodos = document.getElementById("btn-todos");
const btnRelogios = document.getElementById("btn-relogios");
const btnSmart = document.getElementById("btn-smart");

// Configuração do WhatsApp da Loja (Substitua pelo número real depois, ex: "5511999999999")
const NUMERO_WHATSAPP = "5500000000000"; 

// 3. FUNÇÃO PARA RENDERIZAR OS CARDS NA TELA
function renderizarProdutos(listaProdutos) {
    vitrine.innerHTML = "";

    if (listaProdutos.length === 0) {
        vitrine.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>`;
        return;
    }

    listaProdutos.forEach(produto => {
        // Criando o texto padrão que o cliente vai mandar para a vendedora
        const mensagemWhats = `Olá! Gostaria de saber mais sobre o produto em promoção:\n\n*${produto.nome}*\nPreço: R$ ${produto.precoPromo.toFixed(2).replace('.', ',')}\n\n[Códigos de Controle]\n- Etiqueta Original: ${produto.codigoOriginal}\n- Código Promoção: ${produto.codigoPromo}`;
        
        // Codifica o texto para o formato de URL do WhatsApp
        const linkWhatsApp = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensagemWhats)}`;

        const card = document.createElement("div");
        card.className = "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between";
        
        card.innerHTML = `
            <div>
                <!-- Imagem do Produto -->
                <div class="h-48 w-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        Oferta
                    </span>
                </div>

                <!-- Detalhes do Produto -->
                <div class="p-4">
                    <h3 class="font-bold text-lg text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[3.5rem]">
                        ${produto.nome}
                    </h3>
                    
                    <!-- Lógica das Tags de Estoque / Códigos -->
                    <div class="mt-2 bg-gray-100 dark:bg-gray-750 p-2.5 rounded-lg text-xs space-y-1 border border-gray-200/50 dark:border-gray-700">
                        <div class="text-gray-500 dark:text-gray-400">
                            Reg. Original: <span class="font-mono font-bold text-gray-700 dark:text-gray-300">${produto.codigoOriginal}</span>
                        </div>
                        <div class="text-indigo-600 dark:text-indigo-400 font-semibold">
                            🏷️ Promoção: <span class="font-mono font-bold bg-indigo-100 dark:bg-indigo-950 px-1.5 py-0.5 rounded">${produto.codigoPromo}</span>
                        </div>
                    </div>

                    <!-- Preços -->
                    <div class="mt-4 flex items-baseline gap-2">
                        <span class="text-2xl font-black text-gray-900 dark:text-white">
                            R$ ${produto.precoPromo.toFixed(2).replace('.', ',')}
                        </span>
                        <span class="text-xs line-through text-gray-400">
                            R$ ${produto.precoOriginal.toFixed(2).replace('.', ',')}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Botão de Ação (Direcionando para o Link Gerado) -->
            <div class="p-4 pt-0">
                <a href="${linkWhatsApp}" target="_blank" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/10">
                    <span>📱 Chamar no WhatsApp</span>
                </a>
            </div>
        `;
        
        vitrine.appendChild(card);
    });
}

// 4. LÓGICA DE FILTRAGEM E ESTILIZAÇÃO DOS BOTÕES
function gerenciarFiltros(categoriaAtiva, botaoAtivo) {
    // 1. Filtrar Produtos
    if (categoriaAtiva === 'todos') {
        renderizarProdutos(produtos);
    } else {
        const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva);
        renderizarProdutos(produtosFiltrados);
    }

    // 2. Resetar estilos de todos os botões para o estado "Inativo"
    const botoes = [btnTodos, btnRelogios, btnSmart];
    botoes.forEach(btn => {
        btn.className = "px-5 py-2 rounded-full font-medium text-sm transition-all bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-750";
    });

    // 3. Aplicar estilo "Ativo" apenas no botão clicado
    botaoAtivo.className = "px-5 py-2 rounded-full font-medium text-sm transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-500/30";
}

// 5. EVENT LISTENERS (Escutadores de Cliques)
btnTodos.addEventListener("click", () => gerenciarFiltros("todos", btnTodos));
btnRelogios.addEventListener("click", () => gerenciarFiltros("relogio", btnRelogios));
btnSmart.addEventListener("click", () => gerenciarFiltros("smart", btnSmart));

// Inicializa a vitrine mostrando todos os produtos no primeiro carregamento
renderizarProdutos(produtos);