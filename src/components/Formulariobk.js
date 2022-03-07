import React, { Fragment, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import cuid from "cuid";

const queryString = require("query-string");

function Formulario({ vehiculo, thankyou, tipoVehiculo }) {
  /* console.log(vehiculo); */
  /* const handleClose = () => setShow(false); */

  /* const history = useHistory(); */

  const [tipoIdentificacion, setTipoidentificacion] = useState("1");
  const [modeloNombre] = useState("");
  const [modelo] = useState(vehiculo);
  // eslint-disable-next-line
  /* const [titulo, setTitulo] = useState("TUCSON NX"); */
  /* const [tipoVehiculo, setTipoVehiculo] = useState(tipov); */
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("0");
  const [versiones, setVersiones] = useState([]);
  const [versionDefault] = useState("0");
  const [version, setVersion] = useState("0");
  const [anio, setAnio] = useState("0");
  const [anios, setAnios] = useState([]);
  const [precio, setPrecio] = useState("0");
  const [concesionarios, setConcesionarios] = useState([]);
  const [concesionario, setConcesionario] = useState("0");
  const [empresa, setEmpresa] = useState(0);
  const [almacen, setAlmacen] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion] = useState("Sin Direccion");
  const [color, setColor] = useState("0");
  const [colores, setColores] = useState([]);
  /* const [vehiculoColor] = useState(1); */
  /* const [acepto, setAcepto] = useState(false); */
  const [versionNombre, setVersionNombre] = useState("");
  /* const [colorNombre] = useState("BlANCO"); */
  /*   const [ciudadNombre, setCiudadNombre] = useState("");
  const [concesionarioNombre, setConcesionarioNombre] = useState("");
  const [contactoNombre, setContactoNombre] = useState("");
  const [contactoEmail, setContactoEmail] = useState(""); */
  const [token, setToken] = useState("");
  const [plataforma, setPlataforma] = useState("web");
  const [tiempoCompra, setTiempocompra] = useState(0);
  const [tiempoCompraNombre, setTiempocompraNombre] = useState("");

  const leerVersion = (e) => {
    const versionInfo = e.target.value;
    const versionNombre = e.target.options[e.target.selectedIndex].text;
    setVersionNombre(versionNombre);
    const infoFinal = versionInfo.split("|");
    setVersion(e.target.value.split("|")[0]);
    setVersion(infoFinal[0]);

    if (versionInfo === "") {
      setAnio([]);
      setAnios([]);
      setColor([]);
      setColores([]);
      setCiudad([]);
      setCiudades([]);
      setConcesionario([]);
      setConcesionarios([]);
      return;
    } else {
      setAnio([]);
      setAnios([]);
      setColor([]);
      setColores([]);
      setCiudad([]);
      setCiudades([]);
      setConcesionario([]);
      setConcesionarios([]);
    }

    const getAnios = async () => {
      const versionEnviar = document.getElementById("version").value;
      const url = `https://hyundaicolombia.curbe.com.co/api/shared/get_anios_web/${versionEnviar}/0`;
      const resultado = await axios.get(url);
      setAnios(resultado.data.data);
    };
    getAnios();
  };

  const leerTiempoCompra = (e) => {
    setTiempocompra(e.target.value);
    setTiempocompraNombre(e.target.options[e.target.selectedIndex].text);
  };

  /* const leerAcepto = (e) => {
    setAcepto(e.target.checked);
  }; */

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    if (parsed.tk === "" || parsed.tk === undefined) {
      if (tipoVehiculo === 1) {
        setToken("b82f44477a");
      } else {
        setToken("52e1c9cddc");
      }
    } else {
      setToken(parsed.tk.split("?")[0]);
    }

    if (parsed.tk === "3bcb9073fa") {
      setPlataforma("ptcns");
    }

    // Versiones
    const getVersiones = async (modelo) => {
      const url = `https://hyundaicolombia.curbe.com.co/api/shared/get_versiones_web/${modelo}/0`;
      const resultado = await axios.get(url);
      setVersiones(resultado.data.data);
    };
    getVersiones(modelo);
    /* setTipoVehiculo(tipov); */
  }, [modeloNombre, modelo, versionDefault, versionNombre]); // eslint-disable-line react-hooks/exhaustive-deps

  //Leer Años
  const leerAnio = (e) => {
    setAnio(e.target.value);
    const anioVal = e.target.value;
    /* setAnio(e.target.options[e.target.selectedIndex].text); */
    if (anioVal === "") {
      setColor([]);
      setColores([]);
      setCiudad([]);
      setCiudades([]);
      setConcesionario([]);
      setConcesionarios([]);
      return;
    } else {
      setColor([]);
      setColores([]);
      setCiudad([]);
      setCiudades([]);
      setConcesionario([]);
      setConcesionarios([]);
    }

    // Colores
    const getColores = async () => {
      const url = `https://hyundaicolombia.curbe.com.co/api/shared/get_colores_web/${version}/${anioVal}/0`;
      const resultado = await axios.get(url);
      setColores(resultado.data.data);
    };
    getColores();
  };

  //Leer Color
  const leerColor = (e) => {
    setColor(e.target.value);
    const colorVal = e.target.value;
    /* setColor(e.target.options[e.target.selectedIndex].text); */

    const getCiudades = async () => {
      if (colorVal === "") {
        setCiudad([]);
        setCiudades([]);
        setConcesionario([]);
        setConcesionarios([]);
        return;
      } else {
        setCiudad([]);
        setCiudades([]);
        setConcesionario([]);
        setConcesionarios([]);
      }
      const url = `https://hyundaicolombia.curbe.com.co/api/shared/get_ciudades_web/100/${version}/${anio}/${colorVal}/0`;
      const resultado = await axios.get(url);
      setCiudades(resultado.data.data);
    };
    getCiudades();
  };

  //Leer Ciudad
  const leerCiudad = async (e) => {
    setCiudad(e.target.value);
    const ciudadVal = e.target.value;
    /* setColor(e.target.options[e.target.selectedIndex].text); */

    if (ciudadVal === "") {
      setConcesionario([]);
      setConcesionarios([]);
      return;
    } else {
      setConcesionario([]);
      setConcesionarios([]);
    }

    const url = `https://hyundaicolombia.curbe.com.co/api/shared/get_concesionarios_web/100/${ciudadVal}/${version}/${anio}/${color}/0`;
    const resultado = await axios.get(url);
    setConcesionarios(resultado.data.data);
  };

  const leerConcesionario = async (e) => {
    setConcesionario(e.target.value);

    /* const concesVal = e.target.value; */
    /* setConcesionarioNombre(e.target.options[e.target.selectedIndex].text); */
    const concesionarioEnviar = document
      .getElementById("concesionario")
      .value.split("|");
    /* if (concesionarioEnviar === "") {
      return;
    } */

    setEmpresa(concesionarioEnviar[0]);
    setAlmacen(concesionarioEnviar[1]);
    let emp = concesionarioEnviar[0];
    /* let alm = concesionarioEnviar[1]; */
    // Info Concesionario

    if (emp !== "") {
      const url = `https://hyundaicolombia.curbe.com.co/api/shared/get_precios_web/${emp}/${version}/${anio}/0`;
      //{codigo_concesionario}/{version}/{año}/{estado = 0}
      const resultado = await axios.get(url);
      setPrecio(resultado.data.data[0].vea_precio_pvp);
      /* setContactoEmail(resultado.data[0].COA_EMAIL_CONTACTO); */
      /* setContactoNombre(resultado.data[0].COA_CONTACTO); */
    } else return;
  };

  /* console.log(token); */
  /* console.log(precio);
  console.log(almacen); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("btn-enviar").disabled = true;
    if (
      tipoIdentificacion === "0" ||
      tipoIdentificacion === "" ||
      tipoIdentificacion === null ||
      tipoIdentificacion === 0
    ) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Escoja el tipo de identificación",
        showConfirmButton: false,
        timer: 3000,
      });
      document.getElementById("btn-enviar").disabled = false;
    } else {
      if (cedula === "0" || cedula === "" || cedula === null) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Ingrese su número de identificación",
          showConfirmButton: false,
          timer: 3000,
        });
        document.getElementById("btn-enviar").disabled = false;
      } else {
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
          //validamos que ningún dígito se repita más de 5 veces
          if (
            /(\w)\1{4,}/i.test(cedula) === true &&
            tipoIdentificacion === "1"
          ) {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "error",
              title: "La cédula no puede contener más de 5 dígitos repetidos",
              showConfirmButton: false,
              timer: 3000,
            });
            setCedula("");
            document.getElementById("btn-enviar").disabled = false;
          } else {
            //validamos que la cédula no empiece por cero
            if (
              Number(cedula.substring(0, 1)) === 0 &&
              tipoIdentificacion === "1"
            ) {
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "La cédula no puede empezar por 0",
                showConfirmButton: false,
                timer: 3000,
              });
              setCedula("");
              document.getElementById("btn-enviar").disabled = false;
            } else {
              //Cédula de extranjería
              //validamos que ningún dígito se repita más de 5 veces
              if (
                /(\w)\1{4,}/i.test(cedula) === true &&
                tipoIdentificacion === "2"
              ) {
                Swal.fire({
                  toast: true,
                  position: "top-end",
                  icon: "error",
                  title:
                    "La cédula no puede contener más de 5 dígitos repetidos",
                  showConfirmButton: false,
                  timer: 3000,
                });
                setCedula("");
                document.getElementById("btn-enviar").disabled = false;
              } else {
                //Cédula de extranjería
                //validamos que no haya secuencia de 5 caracteres
                if (
                  /^\d*(?=\d{5}(\d*)$)0?1?2?3?4?5?6?7?8?9?\1$/i.test(cedula) ===
                    true &&
                  tipoIdentificacion === "2"
                ) {
                  Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "La cédula no puede contener secuencia",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                  setCedula("");
                  document.getElementById("btn-enviar").disabled = false;
                } else {
                  //Pasaporte
                  //validamos que ningún dígito se repita más de 5 veces
                  if (
                    /(\w)\1{4,}/i.test(cedula) === true &&
                    tipoIdentificacion === "6"
                  ) {
                    Swal.fire({
                      toast: true,
                      position: "top-end",
                      icon: "error",
                      title: "El pasaporte ingresado es inválido",
                      showConfirmButton: false,
                      timer: 3000,
                    });
                    setCedula("");
                    document.getElementById("btn-enviar").disabled = false;
                  } else {
                    //Pasaporte
                    //validamos que no haya secuencia de 5 caracteres
                    if (
                      /^\d*(?=\d{5}(\d*)$)0?1?2?3?4?5?6?7?8?9?\1$/i.test(
                        cedula
                      ) === true &&
                      tipoIdentificacion === "6"
                    ) {
                      Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: "El pasaporte ingresado es inválido",
                        showConfirmButton: false,
                        timer: 3000,
                      });
                      setCedula("");
                      document.getElementById("btn-enviar").disabled = false;
                    } else {
                      if (nombre === "0" || nombre === "" || nombre === 0) {
                        Swal.fire({
                          toast: true,
                          position: "top-end",
                          icon: "error",
                          title: "Ingrese el Nombre",
                          showConfirmButton: false,
                          timer: 3000,
                        });
                        document.getElementById("btn-enviar").disabled = false;
                      } else {
                        if (nombre === "0" || nombre === "" || nombre === 0) {
                          Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            title: "Ingrese el Nombre",
                            showConfirmButton: false,
                            timer: 3000,
                          });
                          document.getElementById(
                            "btn-enviar"
                          ).disabled = false;
                        } else {
                          if (
                            apellido === "0" ||
                            apellido === "" ||
                            apellido === 0
                          ) {
                            Swal.fire({
                              toast: true,
                              position: "top-end",
                              icon: "error",
                              title: "Ingrese el Apellido",
                              showConfirmButton: false,
                              timer: 3000,
                            });
                            document.getElementById(
                              "btn-enviar"
                            ).disabled = false;
                          } else {
                            if (
                              telefono === "0" ||
                              telefono === "" ||
                              telefono === 0
                            ) {
                              Swal.fire({
                                toast: true,
                                position: "top-end",
                                icon: "error",
                                title: "Ingrese el Celular",
                                showConfirmButton: false,
                                timer: 3000,
                              });
                              document.getElementById(
                                "btn-enviar"
                              ).disabled = false;
                            } else {
                              if (
                                email === "0" ||
                                email === "" ||
                                email === 0
                              ) {
                                Swal.fire({
                                  toast: true,
                                  position: "top-end",
                                  icon: "error",
                                  title: "Ingrese el Email",
                                  showConfirmButton: false,
                                  timer: 3000,
                                });
                                document.getElementById(
                                  "btn-enviar"
                                ).disabled = false;
                              } else {
                                if (
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                                    email
                                  )
                                ) {
                                  if (
                                    concesionario === "0" ||
                                    concesionario === "" ||
                                    concesionario === 0
                                  ) {
                                    Swal.fire({
                                      toast: true,
                                      position: "top-end",
                                      icon: "error",
                                      title: "Escoja el Concesionario",
                                      showConfirmButton: false,
                                      timer: 3000,
                                    });
                                    document.getElementById(
                                      "btn-enviar"
                                    ).disabled = false;
                                  } else {
                                    // Enviamos Cotizacion
                                    let cid = cuid();
                                    // setProspecto(cid);
                                    const dataForm = new FormData();
                                    dataForm.append("id", cid);
                                    dataForm.append("ciudad", ciudad);
                                    dataForm.append("empresa", empresa);
                                    dataForm.append("almacen", almacen);
                                    dataForm.append(
                                      "tipo_identificacion",
                                      tipoIdentificacion
                                    );
                                    dataForm.append("identificacion", cedula);
                                    // dataForm.append("cedula", identificacion);
                                    dataForm.append("nombre", nombre);
                                    dataForm.append("apellido", apellido);
                                    dataForm.append("email", email);
                                    dataForm.append(
                                      "direccion",
                                      "Sin Direccion"
                                    );
                                    dataForm.append("telefono", telefono);
                                    dataForm.append("token", token);
                                    dataForm.append(
                                      "tipo_vehiculo",
                                      tipoVehiculo
                                    );
                                    dataForm.append("vehiculo_modelo", modelo);
                                    dataForm.append(
                                      "vehiculo_modelo_nombre",
                                      modeloNombre
                                    );
                                    dataForm.append(
                                      "vehiculo_version",
                                      version
                                    );
                                    dataForm.append("vehiculo_color", color);
                                    dataForm.append("vehiculo_anio", anio);
                                    dataForm.append("vehiculo_precio", precio);
                                    dataForm.append(
                                      "version_nombre",
                                      versionNombre
                                    );
                                    /* dataForm.append(
                                      "color_nombre",
                                      colorNombre
                                    ); */
                                    /* dataForm.append(
                                      "ciudad_nombre",
                                      ciudadNombre
                                    );
                                    dataForm.append(
                                      "concesionario_nombre",
                                      concesionarioNombre
                                    );
                                    dataForm.append(
                                      "contacto_nombre",
                                      contactoNombre
                                    );
                                    dataForm.append(
                                      "contacto_email",
                                      contactoEmail
                                    ); */
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
                                            /* empresa: 203,
                                            almacen: 3, */
                                            plataforma: plataforma,
                                            fecha_ingreso: date + " " + time,
                                            canal: 17,
                                            medio: 76,
                                            usuario: null,
                                            estado: null,
                                            calidad: 3,
                                            tipo_identificacion:
                                              tipoIdentificacion,
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
                                            tiempo_compra_nombre:
                                              tiempoCompraNombre,
                                            aceptacion: 1,
                                          }
                                        );
                                        if (response.data.estado === "OK") {
                                          document
                                            .getElementById("formCotizador")
                                            .reset();
                                          setCiudad("0");
                                          setVersion("0");
                                          setAnio("0");
                                          setPrecio("0");
                                          // setCodigo("0");
                                          setConcesionario("0");
                                          setEmpresa(0);
                                          setAlmacen(0);
                                          setNombre("");
                                          setApellido("");
                                          setEmail("");
                                          setTelefono("");
                                          setCedula("");
                                          //
                                          /* setAcepto(false); */
                                          /* setTiempocompra(0); */
                                          // Actualizar Estado
                                          const dataForm2 = new FormData();
                                          dataForm2.append("codigo", cid);
                                          dataForm2.append("estado", 1);
                                          const respuesta2 = await axios.post(
                                            "https://hyundaicolombia.co/kernel/api/cotizador/update",
                                            dataForm2
                                          );
                                          console.log(respuesta2.data);
                                          // Button Control
                                          document.getElementById(
                                            "btn-enviar"
                                          ).disabled = false;
                                          // Thank you Page
                                          /* history.push({
                                            pathname: `${thankyou}`,
                                            state: {
                                              datos: { nombre: nombre },
                                            },
                                          }); */
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
                                          document.getElementById(
                                            "btn-enviar"
                                          ).disabled = false;
                                        }
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
                                        document.getElementById(
                                          "btn-enviar"
                                        ).disabled = false;
                                      }
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
                                      document.getElementById(
                                        "btn-enviar"
                                      ).disabled = false;
                                    }
                                  }
                                } else {
                                  Swal.fire({
                                    toast: true,
                                    position: "top-end",
                                    icon: "error",
                                    title: "Ingrese un email válido",
                                    showConfirmButton: false,
                                    timer: 3000,
                                  });
                                  document.getElementById(
                                    "btn-enviar"
                                  ).disabled = false;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <Fragment>
      <Form
        onSubmit={handleSubmit}
        id="formCotizador"
        className="taxi-form px-3 py-4"
      >
        {/* <h2 className="cotizar-taxi">COTÍZALO AQUÍ</h2> */}
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
              <option key={version.ver_codigo} value={version.ver_codigo}>
                {version.ver_nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="select"
            custom
            size="sm"
            id="anio"
            name="anio"
            required
            value={anio}
            onChange={leerAnio}
          >
            <option value={""} key={0}>
              - Año -
            </option>
            {anios.map((anio) => (
              <option key={anio.vea_anio} value={anio.vea_anio}>
                {anio.vea_anio}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="select"
            custom
            size="sm"
            id="color"
            name="color"
            required
            value={color}
            onChange={leerColor}
          >
            <option value={""} key={0}>
              - Color -
            </option>
            {colores.map((color) => (
              <option key={color.vac_color} value={color.vac_color}>
                {color.col_nombre}
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
            as="select"
            custom
            size="sm"
            value={tipoIdentificacion}
            onChange={(e) => setTipoidentificacion(e.target.value)}
          >
            <option value={""} disabled key={0}>
              - Tipo de identificación -
            </option>
            <option defaultValue value={1} key={1}>
              Cédula de Ciudadanía
            </option>
            <option value={2} key={2}>
              Cédula de Extranjería
            </option>
            <option value={3} key={3}>
              NIT Empresa
            </option>
            <option value={4} key={4}>
              Número Único de Identificación
            </option>
            <option value={5} key={5}>
              Tarjeta de Identidad
            </option>
            <option value={6} key={6}>
              Pasaporte
            </option>
            <option value={7} key={7}>
              Identificador Único de Cliente
            </option>
            <option value={8} key={8}>
              Número Móvil/Celular
            </option>
            <option value={9} key={9}>
              Registro Civil de Nacimiento
            </option>
            <option value={10} key={10}>
              Documento de Identificación Extranjero
            </option>
            <option value={11} key={11}>
              Otro no Tipificado
            </option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Ingresa un número de documento"
            size="sm"
            id="identificacion"
            name="identificacion"
            value={cedula}
            required
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
              <option key={ciudad.div_codigo} value={ciudad.div_codigo}>
                {ciudad.div_descripcion}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="select"
            custom
            size="sm"
            required
            value={concesionario}
            onChange={leerConcesionario}
            id="concesionario"
            name="concesionario"
          >
            <option value={""} key={1}>
              - Concesionario -
            </option>
            {Object.keys(concesionarios).length > 0
              ? concesionarios.map((concesionario) => (
                  <option
                    key={
                      concesionario.alm_empresa + "|" + concesionario.alm_codigo
                    }
                    value={
                      concesionario.alm_empresa + "|" + concesionario.alm_codigo
                    }
                  >
                    {concesionario.emp_nombre_comercial} (
                    {concesionario.alm_direccion})
                  </option>
                ))
              : null}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            required
            as="select"
            custom
            size="sm"
            value={tiempoCompra}
            onChange={leerTiempoCompra}
          >
            <option value={""} key={0}>
              - Tiempo estimado de compra -
            </option>
            <option value={1} key={1}>
              Inmediata
            </option>
            <option value={2} key={2}>
              En 3 meses
            </option>
            <option value={3} key={3}>
              En 6 meses
            </option>
            <option value={4} key={4}>
              Aún no, estoy considerando
            </option>
          </Form.Control>
        </Form.Group>
        {/* <Form.Group className="mb-2" className="d-flex">
          <Form.Check
            required
            id="acepto"
            name="acepto"
            onChange={leerAcepto}
            value={acepto}
            feedbackTooltip
            className="text-light"
          />

          <p className="check-terminos-tucson text-white mb-0">
            <Link
              to="/politica-proteccion-datos"
              target="_blank"
              className="text-white"
            >
              Acepto política de datos,{" "}
            </Link>{" "}
            <HashLink
              to="/terminos-condiciones#tucson-nx4"
              target="_blank"
              className="text-white"
            >
              términos y condiciones.
            </HashLink>
          </p>
        </Form.Group> */}
        {/* <p className="terminos-form">
          Estamos comprometidos con tu privacidad, por ello, en Hyundai Colombia
          S.A.S. junto con nuestros aliados oficiales te aseguramos que
          utilizaremos la información que nos proporcionas para comunicarnos
          contigo acerca de nuestros productos, servicios, ofertas,
          invitaciones, encuestas, entre otras finalidades y contenidos
          relevantes para ti. Puedes darte de baja de estas comunicaciones en
          cualquier momento. Para obtener más información, consulta nuestra{" "}
          <Link
            to="/politica-proteccion-datos"
            target="_blank"
            className="text-reset"
          >
            Política de Privacidad.
          </Link>
        </p> */}
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
