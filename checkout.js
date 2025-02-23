document.addEventListener('DOMContentLoaded', function () {
    const listaCarrinhoCheckout = document.getElementById('lista-carrinho-checkout');
    const formCheckout = document.getElementById('form-checkout');
    const carrinhoHiddenFields = document.getElementById('carrinho-hidden-fields');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    function atualizarCarrinhoCheckout() {
        listaCarrinhoCheckout.innerHTML = '';
        carrinhoHiddenFields.innerHTML = ''; // Limpar campos ocultos
        let total = 0;  // Total geral dos itens (preço * quantidade)

        carrinho.forEach((item, index) => {
            const li = document.createElement('li');
            const totalItem = item.preco * item.quantidade;  // Calcula o total de cada item (preço * quantidade)
            
            // Exibe o nome do item, preço, quantidade e o total de cada item
            li.textContent = `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade} = R$${totalItem.toFixed(2)}`;
            listaCarrinhoCheckout.appendChild(li);

            total += totalItem;  // Soma o total de cada item para o total geral

            // Adicionar item ao formulário como campo oculto
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = `item${index + 1}`;
            hiddenField.value = `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade} = R$${totalItem.toFixed(2)}`;
            carrinhoHiddenFields.appendChild(hiddenField);
        });

        // Exibe o total geral
        const totalLi = document.createElement('li');
        totalLi.textContent = `Total: R$${total.toFixed(2)}`;
        totalLi.style.fontWeight = 'bold';
        listaCarrinhoCheckout.appendChild(totalLi);

        const freteLi = document.createElement('li');
        freteLi.textContent = 'Reserva: Definido pelo nome completo abaixo';
        freteLi.style.fontWeight = 'bold';
        listaCarrinhoCheckout.appendChild(freteLi);

        // Adicionar total geral e frete ao formulário como campos ocultos
        const totalField = document.createElement('input');
        totalField.type = 'hidden';
        totalField.name = 'total';
        totalField.value = `Total: R$${total.toFixed(2)}`;
        carrinhoHiddenFields.appendChild(totalField);

        const freteField = document.createElement('input');
        freteField.type = 'hidden';
        freteField.name = 'frete';
        freteField.value = 'Reserva: Definido pelo nome completo abaixo';
        carrinhoHiddenFields.appendChild(freteField);
    }

    formCheckout.addEventListener('submit', function () {
        // Limpa o carrinho após a submissão
        localStorage.removeItem('carrinho');
    });

    atualizarCarrinhoCheckout();
});

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

document.getElementById('form-checkout').addEventListener('submit', function(event) {
    showLoading(); // Mostra o indicador de carregamento
});

document.getElementById('Telefone').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});