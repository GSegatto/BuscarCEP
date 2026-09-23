document.getElementById("buscar").addEventListener("click", function () {

    const cep = document.getElementById("cep").value.replace(/\D/g, "");  //Usuario pode digitar com ou sem traço, então removemos tudo que não for número
    const mensagem = document.getElementById("mensagem");

    //Se o usuário digitar um CEP inválido, a mensagem de erro será exibida. Se ele digitar outro CEP válido, a mensagem de erro anterior será limpa.
    mensagem.textContent = "";

    // Verifica se o CEP possui 8 números
    if (cep.length !== 8) {
        mensagem.textContent = "CEP inválido. Digite 8 números.";
        return;
    }

    //consulta a API 
    fetch(`https://viacep.com.br/ws/${cep}/json/`) 
        .then(resposta => resposta.json())
        .then(dados => {

            // Verifica se o CEP existe
            if (dados.erro) {
                mensagem.textContent = "CEP inválido ou não encontrado.";

                // Limpa os campos
                document.getElementById("logradouro").value = "";
                document.getElementById("bairro").value = "";
                document.getElementById("cidade").value = "";

                return;
            }

            // CEP encontrado
            document.getElementById("logradouro").value = dados.logradouro;
            document.getElementById("bairro").value = dados.bairro;
            document.getElementById("cidade").value = dados.localidade;
        })

        //capturar um erro que aconteça durante a requisição (se houver algum problema na comunicação com a API, por exemplo)
        .catch(erro => {       
            mensagem.textContent = "Erro ao consultar o CEP.";
            console.error("Erro ao buscar o CEP:", erro);
        });
});


document.getElementById("limpar").addEventListener("click", function () {

    document.getElementById("cep").value = "";
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";

    document.getElementById("mensagem").textContent = "";
});