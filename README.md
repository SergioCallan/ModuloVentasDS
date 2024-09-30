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
>const Filtrar = async (e) => {  
>- e.preventDefault();  
>- try {  
>  -if (Filtro === "Nombre") {...}  
>  -else if (Filtro === "Marca") {...}  
>  -else if (Filtro === "Modelo") {...}  
>  -else if (Filtro === "Precio") {...}  
>- } catch (error) {  
>- console.error("Error al enviar la solicitud: ", error);  
>- }  
>};  
  Corrección: Utilizar un switch en vez de utilizar bloques else-if:  
>const Filtrar = async (e) => {  
>- e.preventDefault();  
>- try {  
>  -switch (Filtro){  
>   -case "Nombre":{...}  
>   -case "Marca":{...}
>   -case "Modelo":{...}
>   -case "Precio":{...}  
>  -}  
>- } catch (error) {  
>    -console.error("Error al enviar la solicitud: ", error);  
>- }  
>};  
