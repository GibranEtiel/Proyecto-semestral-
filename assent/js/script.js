document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
    // Redirecciona a la página de pago exitoso
    window.location.href = 'pago-exitoso.html';
});