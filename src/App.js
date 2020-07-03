import React, {Fragment, useState, useEffect} from 'react';
import  Header from './components/Header';
import  Formulario from './components/Formulario';
import  Clima from './components/Clima';



function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: "", 
    pais: ""
  }) 

  const {ciudad, pais} = busqueda;

  const [consultar, guardarConsultar] = useState(false);

  const [resultado, guardarResultado] = useState({})

  useEffect(( )=>{
    const consultarApi = async() =>{
      if(consultar){
      const appID = "0d95ba04ade3222add7261cb86114029";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      
      guardarResultado(resultado);
      guardarConsultar(false);
      }
    }
      consultarApi()
  }, [consultar])

  return (
    <Fragment >
      <Header 
        titulo = "Clima React"
      />
      <div className= "contenedor-form">
        <div className= "container">
          <div className="row">
            <div className ="col m6 s12">
              <Formulario 
                busqueda= {busqueda}
                guardarBusqueda= {guardarBusqueda}
                guardarConsultar= {guardarConsultar}
              />
            </div>
            <div className ="col m6 s12">
              <Clima 
                resultado = {resultado}
              />
            </div>

          </div>

        </div>

      </div>
    </Fragment>
  );
}

export default App;
