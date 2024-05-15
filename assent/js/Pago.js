
const paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

       
    const nombre = document.getElementById("nombre").value;
    const numero = document.getElementById("numero").value;
    const fecha = document.getElementById("fecha").value;
    const cvv = document.getElementById("cvv").value;

       
    if (!nombre || !numero || !fecha || !cvv) {
        alert("Por favor, complete todos los campos.");
        return;
    }



    window.location.href = "./pago-exitoso.html";
       
});


