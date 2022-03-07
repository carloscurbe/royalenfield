import * as React from "react";
import Formulario from "../components/Formulario";
import "bootstrap/dist/css/bootstrap.min.css";

// markup
const IndexPage = () => {
  return (
    <main>
      <Formulario
        vehiculo={20202}
        thankyou={"/gracias-tucson-nx4"}
        tipoVehiculo={1}
      />
    </main>
  );
};

export default IndexPage;
