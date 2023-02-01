import Swal from "sweetalert2";

const alertaPop = (icono, titulo, texto) => {
  Swal.fire({
    icon: icono,
    title: titulo,
    text: texto,
  });
};

export default alertaPop;
