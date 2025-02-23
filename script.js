// script.js

document.addEventListener('DOMContentLoaded', function () {
    const scrollToEndButton = document.getElementById('scroll-to-end');
    const scrollToEndCartButton = document.getElementById('scroll-to-end-cart');
    let scrollingToEnd = true; // Controla o estado do botão: se está rolando para o final ou para o topo

    // Detecta o evento de rolagem
    window.addEventListener('scroll', function () {
        const pageEnd = document.getElementById('page-end');
        const scrollPosition = window.scrollY + window.innerHeight; // Posição atual do scroll + altura da janela
        const documentHeight = document.documentElement.scrollHeight; // Altura total do documento

        // Se chegou ao final da página
        if (scrollPosition >= documentHeight) {
            if (scrollingToEnd) {
                // Se o usuário chegou ao final e o botão está em modo de rolar para o final
                scrollToEndButton.innerHTML = '↑'; // Troca para o ícone de subir
                scrollingToEnd = false; // Muda o comportamento para rolar para o topo
            }
        } else if (scrollPosition < documentHeight) {
            if (!scrollingToEnd) {
                // Se o usuário não está no final e o botão está em modo de rolar para o topo
                scrollToEndButton.innerHTML = '↓'; // Troca para o ícone de descer
                scrollingToEnd = true; // Muda o comportamento para rolar para o final
            }
        }
    });

    // Ação do botão de rolar para o final da página
    scrollToEndButton.addEventListener('click', function () {
        if (scrollingToEnd) {
            // Rola até o final da página
            const pageEnd = document.getElementById('page-end');
            pageEnd.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Rola até o topo da página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Ação do novo botão com o ícone de carrinho (desce até o final da página)
    scrollToEndCartButton.addEventListener('click', function () {
        const pageEnd = document.getElementById('page-end');
        pageEnd.scrollIntoView({ behavior: 'smooth' });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const botõesAdicionar = document.querySelectorAll('.adicionar');
    const totalItensElement = document.getElementById('total-itens');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const finalizarCompraBotão = document.getElementById('finalizar-compra');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Função para atualizar o carrinho
    function atualizarCarrinho() {
        // Atualiza o total de itens
        totalItensElement.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);

        // Atualiza a lista de itens no carrinho
        listaCarrinho.innerHTML = '';
        carrinho.forEach(item => {
            const li = document.createElement('li');

            // Cria o texto com o nome, preço e a quantidade
            const texto = document.createElement('span');
            texto.textContent = `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade}`;
            li.appendChild(texto);

            // Calcula o total do item
            const totalItem = item.preco * item.quantidade;
            
            // Exibe o total ao lado do nome, preço e quantidade
            const totalSpan = document.createElement('span');
            totalSpan.textContent = `= R$${totalItem.toFixed(2)}`;
            totalSpan.style.marginLeft = '10px';  // Adiciona um pequeno espaço entre a quantidade e o total
            li.appendChild(texto);
            li.appendChild(totalSpan);

            // Cria a div de aumentar e diminuir quantidade
            const divQuantidade = document.createElement('div');
            divQuantidade.classList.add('quantidade-no-carrinho');

            // Botão de diminuir a quantidade
            const diminuirBtn = document.createElement('button');
            diminuirBtn.textContent = '-';
            diminuirBtn.addEventListener('click', function () {
                if (item.quantidade > 1) {
                    item.quantidade -= 1; // Diminui a quantidade
                    atualizarCarrinho(); // Atualiza a lista do carrinho
                }
            });

            // Botão de aumentar a quantidade
            const aumentarBtn = document.createElement('button');
            aumentarBtn.textContent = '+';
            aumentarBtn.addEventListener('click', function () {
                item.quantidade += 1; // Aumenta a quantidade
                atualizarCarrinho(); // Atualiza a lista do carrinho
            });

            divQuantidade.appendChild(diminuirBtn);
            divQuantidade.appendChild(aumentarBtn);
            li.appendChild(divQuantidade);

            // Botão para remover o item
            const botãoRemover = document.createElement('button');
            botãoRemover.textContent = 'Remover';
            botãoRemover.classList.add('remover-item');
            botãoRemover.addEventListener('click', function () {
                carrinho = carrinho.filter(i => i !== item);
                atualizarCarrinho(); // Atualiza o carrinho após remoção
            });
            li.appendChild(botãoRemover);

            listaCarrinho.appendChild(li);
        });

        // Salva no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    // Manipulação dos botões de quantidade para cada produto na página
    document.querySelectorAll('.livro').forEach(produto => {
        const quantidadeInput = produto.querySelector('.quantidade-input');
        const aumentarBtn = produto.querySelector('.aumentar');
        const diminuirBtn = produto.querySelector('.diminuir');

        // Verificar se os botões existem antes de adicionar os listeners
        if (aumentarBtn && diminuirBtn) {
            // Aumentar quantidade
            aumentarBtn.addEventListener('click', function () {
                let quantidade = parseInt(quantidadeInput.value);
                quantidadeInput.value = quantidade + 1;
            });

            // Diminuir quantidade
            diminuirBtn.addEventListener('click', function () {
                let quantidade = parseInt(quantidadeInput.value);
                if (quantidade > 1) {
                    quantidadeInput.value = quantidade - 1;
                }
            });
        }
    });

    // Adicionar ao carrinho
    botõesAdicionar.forEach(botão => {
        botão.addEventListener('click', function () {
            const nome = botão.getAttribute('data-nome');
            const preco = parseFloat(botão.getAttribute('data-preco'));
            const quantidade = parseInt(botão.closest('.livro').querySelector('.quantidade-input').value); // pega a quantidade do input

            // Verifica se o item já está no carrinho
            const itemExistente = carrinho.find(item => item.nome === nome);

            if (itemExistente) {
                itemExistente.quantidade += quantidade; // Incrementa a quantidade
            } else {
                carrinho.push({ nome, preco, quantidade }); // Adiciona o item com a quantidade
            }

            atualizarCarrinho();
            alert(`Você adicionou ${quantidade} "${nome}" ao carrinho.`);
        });
    });

    // Finalizar compra
    finalizarCompraBotão.addEventListener('click', function () {
        window.location.href = 'checkout.html'; // Redireciona para a página de checkout
    });

    // Inicializa o carrinho
    atualizarCarrinho();
});

document.getElementById('search-bar').addEventListener('input', function() {
    let searchTerm = this.value.toLowerCase();
    let livros = document.querySelectorAll('.livro');

    livros.forEach(function(livro) {
        let titulo = livro.querySelector('h3').textContent.toLowerCase();
        if (titulo.includes(searchTerm)) {
            livro.style.display = 'block';
        } else {
            livro.style.display = 'none';
        }
    });
});
