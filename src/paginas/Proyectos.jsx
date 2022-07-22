import useProyectos from "../hooks/useProtectos";
import PreviewProyecto from "../components/PreviewProyecto";
import Alerta from "../components/alerta";
import { useEffect } from "react";


const Proyectos = () => {
    const {proyectos, alerta} = useProyectos()


    const {msg} = Alerta

    return (
        <>
        <h1 className="text-4xl font-black">Proyectos</h1>
        {msg && <Alerta alerta={alerta} />}
        <div className="bg-white shadow mt-10 rounded-lg ">
            {proyectos.length ? 
              proyectos.map(proyecto => (
                <PreviewProyecto
                key={proyecto._id}
                proyecto={proyecto}
                />
              ))
            : <p className="text-center text-gray-600 uppercase p-5">No hay proyectos aun</p>}
        </div>
        </>
    )
}


export default Proyectos;