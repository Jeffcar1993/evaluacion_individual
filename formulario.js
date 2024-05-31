document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.getElementById('formulario_final');
  const inputs = document.querySelectorAll('#formulario_final input');
  const areasText = document.querySelectorAll('#formulario_final textarea');

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, 
      apodo: /^[a-zA-Z0-9]{3,10}$/,
      contraseña: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/, 
      biografia: /^.{100,}$/
  };

  const campos = {
      nombre: false,
      apodo: false,
      contraseña: false,
      biografia: true
  };

  const validarFormulario = (e) => {
      switch (e.target.name) {
          case "nombre":
              validarCampo(expresiones.nombre, e.target, 'nombre');
              break;
          case "apodo":
              validarCampo(expresiones.apodo, e.target, 'apodo');
              break;
          case "contraseña":
              validarCampo(expresiones.contraseña, e.target, 'contraseña');
              break;
          case "biografia":
              validarCampo(expresiones.biografia, e.target, 'biografia');
              break;
      }
  };

  const validarCampo = (expresion, input, campo) => {
      if (expresion.test(input.value)) {
          document.getElementById(`grupo_${campo}`).classList.remove('form-field-incorrecto');
          document.getElementById(`grupo_${campo}`).classList.add('form-field-correcto');
          document.getElementById(`${campo}Error`).style.display = "none";
          campos[campo] = true;
          if (campo !== "contraseña") {
              localStorage.setItem(campo, input.value);
          }
      } else {
          document.getElementById(`grupo_${campo}`).classList.add('form-field-incorrecto');
          document.getElementById(`grupo_${campo}`).classList.remove('form-field-correcto');
          document.getElementById(`${campo}Error`).style.display = "block";
          campos[campo] = false;
      }
      validarFormularioCompleto();
  };

  const validarFormularioCompleto = () => {
      const validForm = campos.nombre && campos.apodo && campos.contraseña && campos.biografia;
      document.querySelector("input[type='submit']").disabled = !validForm;
  };

  inputs.forEach(input => {
      input.addEventListener('keyup', validarFormulario);
      input.addEventListener('blur', validarFormulario);
  });

  areasText.forEach(area => {
      area.addEventListener('keyup', validarFormulario);
      area.addEventListener('blur', validarFormulario);
  });

  const loadSavedData = () => {
      inputs.forEach(input => {
          if (input.id !== "contraseña") {
              const savedValue = localStorage.getItem(input.id);
              if (savedValue) {
                  input.value = savedValue;
                  validarCampo(expresiones[input.id], input, input.id);
              }
          }
      });
      areasText.forEach(area => {
          const savedValue = localStorage.getItem(area.id);
          if (savedValue) {
              area.value = savedValue;
              validarCampo(expresiones[area.id], area, area.id);
          }
      });
  };

  loadSavedData();

  formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
          nombre: formulario.nombre.value,
          apodo: formulario.apodo.value,
          biografia: formulario.biografia.value
          // Contraseña no se guarda en localStorage
      };

      fetch('https://mocktarget.apigee.net/echo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
          const responseDiv = document.getElementById("serverResponse");
          responseDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
          responseDiv.style.display = 'block';
          formulario.reset();
          localStorage.clear();
          validarFormularioCompleto();
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
