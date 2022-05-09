import React, { Fragment, useState, useEffect } from "react";
import InputMask from "react-input-mask";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/styles.css";

// markup
const TestRide = () => {
  const [versiones, setVersiones] = useState([]);
  // eslint-disable-line
  const [version, setVersion] = useState("0");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [empresa, setEmpresa] = useState("0");
  const [almacen, setAlmacen] = useState("0");
  const [validation, setValidation] = useState(true);

  /* console.log("version:", version);
  console.log("nombre", nombre);
  console.log("empresa", empresa);
  console.log("almacen:", almacen);
  console.log("ciudad", ciudad); */

  const leerVersion = (e) => {
    setVersion(e.target.value);
  };

  const leerCiudad = (e) => {
    /* setAlmacen(e.target.value); */
    setCiudad(e.target.options[e.target.selectedIndex].text);

    const concesionarioEnviar = document
      .getElementById("ciudad")
      .value.split("|");
    setEmpresa(concesionarioEnviar[0]);
    setAlmacen(concesionarioEnviar[1]);
  };

  useEffect(() => {
    const getVersiones = async () => {
      //Get token to API
      const login = await axios.post(
        "https://royalmotors.curbe.com.ec/api/auth/login",
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
          "https://royalmotors.curbe.com.ec/api/products/get_productos",
          {
            marca: 6,
            codempresa: 601,
            estado: 0,
          },
          options
        );
        setVersiones(response.data.data);
        const responseCities = await axios.post(
          "https://royalmotors.curbe.com.ec/api/shared/get_cities",
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

  const blurCedula = (e) => {
    let cedula = e.target.value.replace(" ", "");
    let aux = 0;
    let sum = 0;

    if (cedula.length === 10) {
      let ced = cedula;
      for (var i = 0; i < 9; i++) {
        if (i % 2 === 0) {
          aux = Number(ced[i]) * 2;
          if (aux > 9) {
            aux = aux - 9;
          }
          sum = sum + aux;
        } else {
          aux = Number(ced[i]);
          sum = sum + aux;
        }
      }
      let resid = sum % 10;
      let verifica = 10 - resid;
      if (resid === 0) {
        verifica = 0;
      }
      var verificador = Number(cedula.substring(9, 10));
      if (verificador !== verifica) {
        if (cedula !== "0105779454") {
          /* Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Cédula inválida, vuelva a intentar",
            showConfirmButton: false,
            timer: 1500,
          }); */

          setValidation(false);
          setCedula("");
          document.getElementById("cedula").value = "";
          document.getElementById("cedula").focus();
        }
      } else {
        setValidation(true);
      }
    } else {
      /* Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Cédula inválida, vuelva a intentar",
        showConfirmButton: false,
        timer: 1500,
      }); */
      setValidation(false);
      setCedula("");
      document.getElementById("cedula").value = "";
      document.getElementById("cedula").focus();
    }
    if (cedula.length === 0) {
      setValidation(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await axios.post(
      "https://royalmotors.curbe.com.ec/api/auth/login",
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

      const respuesta = await axios.post(
        "https://royalmotors.curbe.com.ec/api/leadsweb/new_lead",
        {
          tipo_integracion: 1,
          ciudad: ciudad,
          empresa: empresa,
          almacen: almacen,
          plataforma: "web",
          canal: 7,
          medio: 120,
          calidad: 3,
          cedula: cedula,
          nombre: nombre,
          apellido: apellido,
          email: email,
          edad: edad,
          direccion: "Sin direccion",
          telefono: telefono,
          exonerado: 0,
          discapacidad: "",
          porc_discapacidad: 0,
          token: "",
          tipo_vehiculo: 1,
          cod_producto: version,
        },
        options
      );

      if (respuesta.status === 200) {
        if (respuesta.statusText === "OK") {
          setVersion("0");
          setNombre("");
          setApellido("");
          setCiudad("");
          setCedula("");
          setTelefono("");
          setEmail("");
          setEdad("");
          setCiudad("");
          e.target.reset();

          Swal.fire({
            title: "Gracias por escribirnos",
            text: "Estamos rodando para comunicarnos pronto contigo.",
            timer: 2000,
            showConfirmButton: false,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error al enviar la información",
            text: "Intente en unos minutos...",
            timer: 3000,
            showConfirmButton: false,
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Error al enviar informacion",
          text: "Intente en unos minutos...",
          timer: 3000,
          showConfirmButton: false,
          icon: "error",
        });
      }
    }
  };

  return (
    <Fragment>
      <div className="testdrive-cont">
        <Form
          onSubmit={handleSubmit}
          id="formCotizador"
          className="testdrive-form px-3 py-4"
        >
          <Row>
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
          </Row>

          <Row>
            <Form.Group className="mb-2" as={Col} md={6}>
              <FloatingLabel label="Cédula" className="mb-3">
                <InputMask
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="Cédula"
                  required
                  value={cedula}
                  className="form-control"
                  onChange={(e) => setCedula(e.target.value)}
                  mask="9999999999"
                  maskChar=" "
                  onBlur={blurCedula}
                />
              </FloatingLabel>
              <span className={validation ? "d-none" : "mensaje-error d-block"}>
                Cédula inválida
              </span>
            </Form.Group>

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
          </Row>

          <Row>
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

            <Form.Group className="mb-2" as={Col} md={6}>
              <FloatingLabel label="Edad" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Edad"
                  id="edad"
                  name="edad"
                  required
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-2" as={Col} md={6}>
              <FloatingLabel
                controlId="floatingSelect"
                label="¿Qué moto te gustaría más?"
                className="mb-3"
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
              <FloatingLabel label="Selecciona un distribuidor">
                <Form.Select
                  aria-label="Ciudad"
                  id="ciudad"
                  name="ciudad"
                  required
                  className="mb-3"
                  onChange={leerCiudad}
                >
                  <option value={""} key={0}>
                    - Seleccione -
                  </option>
                  {ciudades.map((ciudad) => (
                    <option
                      key={ciudad.ciudad_codigo}
                      value={ciudad.emp_codigo + "|" + ciudad.alm_codigo}
                    >
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
                className="px-4"
                id="btn-enviar"
              >
                Enviar
              </Button>
              <Form.Check
                required
                id="acepto"
                name="acepto"
                feedbackTooltip
                isInvalid
                className="ps-4"
              />

              <p className="check-terminos mb-0 ps-1">
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
      </div>
    </Fragment>
  );
};

export default TestRide;
