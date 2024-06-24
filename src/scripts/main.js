document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = Math.random() * numeroMaximo;
        numeroAleatorio = Math.floor(numeroAleatorio +1); /*math ceil arredonda p cima; math floor arredonda p baixo, math round considera a casa decimal p arredondar*/

        document.getElementById ('resultado-valor').innerText = numeroAleatorio;
        document.querySelector('.resultado').style.display = 'block' /*para alterar o css*/
    })
})