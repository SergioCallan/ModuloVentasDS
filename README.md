# ModuloVentasDS

# Reporte inicial de Sonarcloud (SonarLint):
Security (A): 0 issues

Reliability (C): 40 open issues (5 M, 35 L)

Maintanibility (A): 202 open issues (4 Hard, 54 M, 144L)

Accepted issues: 0

Duplications: 1.4% on 27k lines

Security hotspots: 3

# Lista de correcciones
Violación: Refactor this function to reduce its cognitive complexity from 17 to the 15 allowed
const Filtrar = async (e) => {  
    e.preventDefault();
    try {
      if (Filtro === "Nombre") {
        const productoEspacios = encodeURIComponent(Nombre);
        const url1 = `https://modulo-ventas.onrender.com/searchproduct/${productoEspacios}`;
        const response1 = await axios.get(url1);
        if (response1.data === null) {
          alert("No se encontro el producto");
        } else {
            setDatosP(response1.data);
        }
      } else if (Filtro === "Marca") {
        const url2 = `https://modulo-ventas.onrender.com/searchbrand/${Marca}`;
        const response2 = await axios.get(url2);
        if (response2.data === null) {
          alert("No se encontro el producto");
        } else {
            setDatosP(response2.data);
        }
      } else if (Filtro === "Modelo") {
        const modeloespacios = encodeURIComponent(Modelo);
        const url3 = `https://modulo-ventas.onrender.com/searchmodel/${modeloespacios}`;
        const response3 = await axios.get(url3);
        if (response3.data === null) {
          alert("No se encontro el producto");
        } else {
          setDatosP(response3.data);
        }
      } else if (Filtro === "Precio") {
        const intervaloP = {
          preciomin: PrecioMin,
          preciomax: PrecioMax,
        };
        const url4 = `https://modulo-ventas.onrender.com/searchprice`;
        const response4 = await axios.get(url4, {params: intervaloP});
        if (response4.data.id === null) {
          alert("No se encontro el producto");
        } else {
          setDatosP(response4.data);
        }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud: ", error);
    }
  };
  Corrección: Utilizar un switch en vez de utilizar bloques else-if:
  const Filtrar = async (e) => {
    e.preventDefault();
    try {
      switch (Filtro){
        case "Nombre":{
          const productoEspacios = encodeURIComponent(Nombre);
          const url1 = `https://modulo-ventas.onrender.com/searchproduct/${productoEspacios}`;
          const response1 = await axios.get(url1);
          if (response1.data === null) {
            alert("No se encontro el producto");
          } else {
              setDatosP(response1.data);
          }
          break;
        }
        case "Marca":{
          const url2 = `https://modulo-ventas.onrender.com/searchbrand/${Marca}`;
          const response2 = await axios.get(url2);
          if (response2.data === null) {
            alert("No se encontro el producto");
          } else {
              setDatosP(response2.data);
          }
          break;
        }
        case "Modelo":{
          const modeloespacios = encodeURIComponent(Modelo);
          const url3 = `https://modulo-ventas.onrender.com/searchmodel/${modeloespacios}`;
          const response3 = await axios.get(url3);
          if (response3.data === null) {
            alert("No se encontro el producto");
          } else {
            setDatosP(response3.data);
          }
          break;
        }
        case "Precio":{
          const intervaloP = {
            preciomin: PrecioMin,
            preciomax: PrecioMax,
          };
          const url4 = `https://modulo-ventas.onrender.com/searchprice`;
          const response4 = await axios.get(url4, {params: intervaloP});
          if (response4.data.id === null) {
            alert("No se encontro el producto");
          } else {
            setDatosP(response4.data);
          }
          break;
        }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud: ", error);
    }
  };
