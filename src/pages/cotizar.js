import React, { Fragment, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
/* import cuid from "cuid"; */
/* const queryString = require("query-string"); */

function Cotizar() {
  const [versiones, setVersiones] = useState([]);
  // eslint-disable-line
  const [version, setVersion] = useState("0");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [almacen, setAlmacen] = useState("0");

  /* console.log("version:", version);
  console.log("nombre", nombre);
  console.log("almacen:", almacen);
  console.log("ciudad", ciudad); */

  const leerVersion = (e) => {
    setVersion(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("tipo_integracion", 1);
    dataForm.append("ciudad", ciudad);
    dataForm.append("empresa", 601);
    dataForm.append("almacen", almacen);
    dataForm.append("plataforma", "web");
    dataForm.append("canal", 16);
    dataForm.append("medio", 54);
    dataForm.append("calidad", 3);
    dataForm.append("cedula", cedula);
    dataForm.append("nombre", nombre);
    dataForm.append("apellido", apellido);
    dataForm.append("email", email);
    dataForm.append("direccion", "Sin dirección");
    dataForm.append("telefono", telefono);
    dataForm.append("exonerado", 0);
    dataForm.append("discapacidad", "Sin discapacidad");
    dataForm.append("porc_discapacidad", 0);
    dataForm.append("token", "ed8691578b15");
    dataForm.append("tipo_vehiculo", 1);
    dataForm.append("cod_producto", version);

    const respuesta = await axios.post(
      "https://demoroyal.curbe.com.ec/api/leads_web/new_lead",
      dataForm
    );
    if (respuesta.status === 200) {
      if (respuesta.data.status === "Ok") {
        setVersion("0");
        setNombre("");
        setApellido("");
        setCiudad("");
        setCedula("");
        setTelefono("");
        setEmail("");
        setCiudad("");
        e.target.reset();
        // setActiveSpinner(false);
        // handleClose();
        Swal.fire({
          title: "Información enviada...",
          text: "Pronto nos pondremos en contacto con usted.",
          showCloseButton: true,
          icon: "success",
        });
      } else {
        // setActiveSpinner(false);
        Swal.fire({
          title: "Error al enviar la información",
          text: "Intente en unos minutos...",
          showCloseButton: true,
          icon: "error",
        });
      }
    } else {
      // setActiveSpinner(false);
      Swal.fire({
        title: "Error al enviar informacion",
        text: "Intente en unos minutos...",
        showCloseButton: true,
        icon: "error",
      });
    }
  };

  return (
    <Fragment>
      <Form
        onSubmit={handleSubmit}
        id="formCotizador"
        className="cotizador-form px-3 py-4"
      >
        <Row>
          <Form.Group className="mb-2" as={Col} md={6}>
            <FloatingLabel
              controlId="floatingSelect"
              label="¿Qué moto te gustaría más?"
            >
              <Form.Select
                aria-label="Floating label select example"
                id="version"
                name="version"
                required
                onChange={leerVersion}
              >
                <option value={""} key={0}>
                  - Seleccione -
                </option>
                {versiones.map((version) => (
                  <option
                    key={version.codigo_producto}
                    value={version.codigo_producto}
                  >
                    {version.version}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-2" as={Col} md={6}>
            <FloatingLabel label="Nombre" className="mb-3">
              <Form.Control
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-2" as={Col} md={6}>
            <FloatingLabel label="Apellido" className="mb-3">
              <Form.Control
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Apellido"
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-2" as={Col} md={6}>
            <FloatingLabel label="Cédula" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Cédula"
                id="identificacion"
                name="identificacion"
                required
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-2" as={Col} md={6}>
            <FloatingLabel label="Celular" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Celular"
                id="telefono"
                name="telefono"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-2" as={Col} md={6}>
            <FloatingLabel label="Correo electrónico" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-2" as={Col} md={6}>
            <FloatingLabel label="Tienda preferida">
              <Form.Select
                aria-label="Ciudad"
                id="ciudad"
                name="ciudad"
                required
                onChange={leerCiudad}
              >
                <option value={""} key={0}>
                  - Seleccione -
                </option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad.ciudad_codigo} value={ciudad.alm_codigo}>
                    {ciudad.alm_nombre}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          <Form.Group
            className="mb-0 d-flex align-items-center"
            as={Col}
            md={6}
          >
            <Button
              variant="primary"
              type="submit"
              className="px-3"
              id="btn-enviar"
            >
              Enviar
            </Button>
            <Form.Check
              required
              /* label="acepto términos y condiciones" */
              id="acepto"
              name="acepto"
              feedbackTooltip
              isInvalid
              className="ps-md-4 pe-1"
            />

            <p className="check-terminos mb-0">
              <a
                href="https://royalenfieldmx.com/politica-de-privacidad/"
                className="text-reset text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                Aceptar términos y condiciones
              </a>
            </p>
          </Form.Group>
          {/* <Form.Group className="d-flex">
            
          </Form.Group> */}
        </Row>
      </Form>
    </Fragment>
  );
}

export default Cotizar;
