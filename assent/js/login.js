document.addEventListener("DOMContentLoaded", function() {
    const correo = document.getElementById("correo");
    const contraseña = document.getElementById("contraseña");
    const loginButton = document.getElementById("loginButton");
    

    loginButton.addEventListener("click", function() {
        const email = correo.value;
        const password = contraseña.value;

      
        if (email.trim() === "" || password.trim() === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }
      

        window.location.href = "./index.html";
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const cambiarCorreo = document.getElementById("cambiarcorreo");
    const cambiarCorreoBoton = document.getElementById("Correobutton");

    cambiarCorreoBoton.addEventListener("click", function() {
        const correo = cambiarCorreo.value;

       
        if (!correo.trim()) {
            alert("Por favor, ingrese su correo electrónico.");
            return;
        }

      
        console.log("Correo Electrónico:", correo);
        window.location.href = "./Login.html";

       
    });
});