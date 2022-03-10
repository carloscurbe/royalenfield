import React, { Fragment, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
/* import Swal from "sweetalert2"; */
/* import cuid from "cuid"; */
/* const queryString = require("query-string"); */

function Formulario() {
  const [versiones, setVersiones] = useState([]);
  /* const [producto, setProducto] = useState("0"); */
  const [version, setVersion] = useState("0");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [almacen, setAlmacen] = useState(0);

  // const [empresa, setEmpresa] = useState(0);
  // const [direccion] = useState("Sin Direccion");

  console.log(version);
  console.log(nombre);

  const leerVersion = (e) => {
    setVersion(e.target.value);
    /* setTiempocompraNombre(e.target.options[e.target.selectedIndex].text); */
  };

  const leerCiudad = (e) => {
    setAlmacen(e.target.value);
    setCiudad(e.target.options[e.target.selectedIndex].text);
  };

  useEffect(() => {
    const getVersiones = async () => {
      //Get token to API
      const login = await axios.post(
        "https://demoroyal.curbe.com.ec/api/auth/login",
        {
          lgn_userName: "apiroyal",
          lgn_password: "api12345",
          lgn_dominio: "royalenfield",
        }
      );
      const auth = login.data;
      if (auth.token.length > 0) {
        //Está autenticado
        const options = {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        };

        const response = await axios.post(
          "https://demoroyal.curbe.com.ec/api/products/get_productos",
          {
            marca: 6,
            codempresa: 601,
            estado: 0,
          },
          options
        );
        setVersiones(response.data.data);
        const responseCities = await axios.post(
          "https://demoroyal.curbe.com.ec/api/shared/get_cities",
          {
            marca: 6,
            codempresa: 601,
            estado: 0,
          },
          options
        );
        setCiudades(responseCities.data);
      }
    };
    getVersiones();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* const getCiudades = async () => {
    //Get token to API
    const login = await axios.post(
      "https://demoroyal.curbe.com.ec/api/auth/login",
      {
        lgn_userName: "apiroyal",
        lgn_password: "api12345",
        lgn_dominio: "royalenfield",
      }
    );

    const auth = login.data;
    if (auth.token.length > 0) {
      //Está autenticado
      const options = {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      };

      
    }
  };
  getCiudades(); */

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("btn-enviar").disabled = true;

    //validamos la longitud de la cédula
    if (
      (cedula.length < 8 || cedula.length > 10) &&
      tipoIdentificacion === "1"
    ) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "La longitud de la cédula ingresada es incorrecta",
        showConfirmButton: false,
        timer: 3000,
      });
      setCedula("");
      document.getElementById("btn-enviar").disabled = false;
    } else {
      // Enviamos Cotizacion
      let cid = cuid();
      const dataForm = new FormData();
      dataForm.append("id", cid);
      dataForm.append("ciudad", ciudad);
      dataForm.append("empresa", empresa);
      dataForm.append("almacen", almacen);
      dataForm.append("tipo_identificacion", tipoIdentificacion);
      dataForm.append("identificacion", cedula);
      dataForm.append("nombre", nombre);
      dataForm.append("apellido", apellido);
      dataForm.append("email", email);
      dataForm.append("direccion", "Sin Direccion");
      dataForm.append("telefono", telefono);
      dataForm.append("token", token);
      dataForm.append("tipo_vehiculo", tipoVehiculo);
      dataForm.append("vehiculo_modelo", modelo);
      dataForm.append("vehiculo_modelo_nombre", modeloNombre);
      dataForm.append("vehiculo_version", version);
      dataForm.append("vehiculo_color", color);
      dataForm.append("vehiculo_anio", anio);
      dataForm.append("vehiculo_precio", precio);
      dataForm.append("version_nombre", versionNombre);

      // Enviar prospecto
      const respuesta = await axios.post(
        "https://hyundaicolombia.co/kernel/api/cotizador/ingresar",
        dataForm
      );
      if (respuesta.status === 200) {
        if (respuesta.data.status === "Ok") {
          //Envio CRM
          if (cid !== respuesta.data.cotizacion) {
            cid = respuesta.data.cotizacion;
          }
          // DateTime
          let today = new Date();
          let date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          // Enviamos

          const response = await axios.post(
            "https://hyundaicolombia.curbe.com.co/api/cotizadorweb/ingresar_prospecto_new_landing",
            {
              id: cid,
              ciudad: ciudad,
              empresa: empresa,
              almacen: almacen,
              plataforma: plataforma,
              fecha_ingreso: date + " " + time,
              canal: 17,
              medio: 76,
              usuario: null,
              estado: null,
              calidad: 3,
              tipo_identificacion: tipoIdentificacion,
              cedula: cedula,
              nombre: nombre,
              apellido: apellido,
              email: email,
              direccion: direccion,
              telefono: telefono,
              organizacion: "",
              segmento: 1,
              subsegmento: 1,
              procedencia: 1,
              tipo_contacto: 1,
              exonerado: 0,
              discapacidad: "0",
              porc_discapacidad: 0,
              token: token,
              tipo_vehiculo: tipoVehiculo,
              vehiculo_modelo: modelo,
              vehiculo_version: version,
              vehiculo_color: color,
              vehiculo_anio: anio,
              vehiculo_precio: precio,
              tiempo_compra: tiempoCompra,
              tiempo_compra_nombre: tiempoCompraNombre,
              aceptacion: 1,
            }
          );
          if (response.data.estado === "OK") {
            document.getElementById("formCotizador").reset();
            setCiudad("0");
            setVersion("0");
            setAnio("0");
            setPrecio("0");
            setConcesionario("0");
            setEmpresa(0);
            setAlmacen(0);
            setNombre("");
            setApellido("");
            setEmail("");
            setTelefono("");
            setCedula("");

            const dataForm2 = new FormData();
            dataForm2.append("codigo", cid);
            dataForm2.append("estado", 1);
            const respuesta2 = await axios.post(
              "https://hyundaicolombia.co/kernel/api/cotizador/update",
              dataForm2
            );
            console.log(respuesta2.data);
            // Button Control
            document.getElementById("btn-enviar").disabled = false;

            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title:
                "Gracias por preferirnos, pronto nos pondremos en contacto con usted.",
              showConfirmButton: false,
              timer: 3000,
            });
          } else {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "error",
              title:
                "Error al enviar la información, intente en unos minutos...",
              showConfirmButton: false,
              timer: 3000,
            });
            document.getElementById("btn-enviar").disabled = false;
          }
        } else {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Error al enviar la información, intente en unos minutos...",
            showConfirmButton: false,
            timer: 3000,
          });
          document.getElementById("btn-enviar").disabled = false;
        }
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Error al enviar la información, intente en unos minutos...",
          showConfirmButton: false,
          timer: 3000,
        });
        document.getElementById("btn-enviar").disabled = false;

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Ingrese un email válido",
          showConfirmButton: false,
          timer: 3000,
        });
        document.getElementById("btn-enviar").disabled = false;
      }
    }
  }; */

  return (
    <Fragment>
      <Form
        /* onSubmit={handleSubmit} */
        id="formCotizador"
        className="taxi-form px-3 py-4"
      >
        <Form.Group className="mb-2">
          <Form.Control
            as="select"
            custom
            size="sm"
            id="version"
            name="version"
            defaultValue={0}
            required
            onChange={leerVersion}
          >
            <option value={""} key={0}>
              - Version -
            </option>
            {versiones.map((version) => (
              <option
                key={version.codigo_producto}
                value={version.codigo_producto}
              >
                {version.version}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            size="sm"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            size="sm"
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            required
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Cédula"
            size="sm"
            id="identificacion"
            name="identificacion"
            required
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Celular"
            size="sm"
            id="telefono"
            name="telefono"
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            size="sm"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="select"
            custom
            size="sm"
            id="ciudad"
            name="ciudad"
            required
            value={ciudad}
            onChange={leerCiudad}
          >
            <option value={""} key={0}>
              - Ciudad -
            </option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.alm_codigo} value={ciudad.alm_codigo}>
                {ciudad.ciudad_nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="text-center mb-0">
          <Button
            variant="primary"
            type="submit"
            className="px-3"
            id="btn-enviar"
          >
            Cotizar
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
}

export default Formulario;
