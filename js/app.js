document.addEventListener("DOMContentLoaded", function () {
  const nombre = {
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  };

  // seleccionar los elementos de la interfaz
  const inputNombre = document.querySelector("#nombre");
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector("#formulario input[type='submit']");
  const btnReset = document.querySelector("#formulario input[type='reset']");

  // Asignar eventos
  inputNombre.addEventListener("input", validar);
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    // reiniciar el objeto
    nombre.nombre = "";
    nombre.email = "";
    nombre.asunto = "";
    nombre.mensaje = "";
    formulario.reset();
    comprobarNombre();
  });

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El Campo ${e.target.id} es Obligatorio`,
        e.target.parentElement.nextElementSibling
      );
      nombre[e.target.name] = "";
      comprobarNombre();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta(
        "El email no es válido",
        e.target.parentElement.nextElementSibling
      );
      nombre[e.target.name] = "";
      comprobarNombre();
      return;
    }

    limpiarAlerta(e.target.parentElement.nextElementSibling);
    // Asignar los valores
    nombre[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto nombre
    comprobarNombre();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "bg-red-600",
      "text-white",
      "p-2",
      "text-center",
      "margin-left"
    );

    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarNombre() {
    if (Object.values(nombre).includes("")) {
      btnSubmit.classList.add("btn-desactivado");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("btn-desactivado");
    btnSubmit.disabled = false;
  }
});
