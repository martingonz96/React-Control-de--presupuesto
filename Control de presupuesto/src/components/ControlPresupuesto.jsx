import { useState, useEffect } from "react"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
  presupuesto, 
  gastos,
  setGastos, 
  setPresupuesto,
  setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje]= useState(0)

    const formatearCantidad = (cantidad) => {

      useEffect(()=> {
         const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
         
         const totalDisponible = presupuesto - totalGastado

         //Calculo

         const nuevoPorcentaje = (((presupuesto-totalDisponible)/ presupuesto) *100).toFixed(2);

         setPorcentaje(nuevoPorcentaje)

         setDisponible(totalDisponible)

         setGastado(totalGastado)

         setTimeout(()=>{
          setPorcentaje(nuevoPorcentaje)
         }, 1000)

        },[gastos])

     return cantidad.toLocaleString('en-US', {
            style:'currency',
            currency: 'USD'
        })

    }

    const handleReset = ()=>{
        const result = confirm("Deseas reiniciar presupuesto?")

        if (result) {
          setGastos([]);
          setPresupuesto(0);
          setIsValidPresupuesto(false);
        } 
    }
  return (
    <div className="contenedor-presupuesto contenedor  sombra dos-columnas">
        <div>
            <CircularProgressbar
            styles={buildStyles({
              pathColor: porcentaje > 100 ? "red" : "#3B82F6",
              trailColor: "#F5F5F5",
              textColor: porcentaje > 100 ? "red" : "#3B82F6"
            })}
            value={porcentaje}
            text={`${porcentaje}% Gastado`}
            
            />
        </div>

        <div className="contenido-presupuesto">
          <button 
          className="reset-app" 
          type="button"
          onClick={handleReset}>
          Resetear App
          </button>
          <p>
            <span>Presupuesto :</span> {formatearCantidad(presupuesto)}
          </p>
          <p className={`${disponible < 0 ? "negativo" : " "}`}>
            <span>Disponible :</span> {formatearCantidad(disponible)}
          </p>
          <p>
            <span>Gastado :</span> {formatearCantidad(gastado)}
          </p>
        </div>

    </div>
  )
}

export default ControlPresupuesto