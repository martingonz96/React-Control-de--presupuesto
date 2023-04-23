import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto,  
  setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState("")

  const handlePresupuesto = (e)=>{

    e.preventDefault()

    if(!presupuesto || presupuesto<0){
      setMensaje('No es presupuesto valido')
      return
    }
    
      setMensaje("")
      setIsValidPresupuesto(true)
   

  }

  return (



    <div className="contenedor-presupuesto contenedor sombra">
    <form onSubmit={handlePresupuesto}  className="formulario">
        <div className="campo">
            <label htmlFor="">Definir Prespuesto</label>
            <input type="number" 
            className="nuevo-presupuesto" 
            placeholder="Anade tu presupuesto"
            value={presupuesto} onChange={(e)=> setPresupuesto(Number(e.target.value))}/>

            <input type="submit" value="Anadir" />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        </div>

    </form>
    </div>
  )
}

export default NuevoPresupuesto