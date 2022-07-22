import { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/alerta";


const NuevoPassword = () => {

    const params = useParams();
    const {token} = params;
    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState('');
    const [passwordModificado, setPassworModificado] = useState(false);
      
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setTokenValido(true);

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken();
    }, []);

    const {msg} = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password.length < 6) {
            setAlerta({
                msg: 'El password debe tener al menos 6 caracteres',
                error: true
            })
            return;
        }
       
        try {
            const url = `/usuarios/olvide-password/${token}`;

            const {data} = await clienteAxios.post(url, {password});
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPassworModificado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }


    return (
        <>
        <h1 className="text-red-800 font-black text-6xl capitalize">recupera tu acceso y no pierdas
         tus <span className="text-slate-700">proyectos </span></h1>

         {msg && <Alerta alerta={alerta}/>}

         {tokenValido && (
            <form
             className="my-10 bg-white shadow rounded-lg p-10"
             onSubmit={handleSubmit}
            >
        
            <div className="my-5">
                <label
                 className="uppercase text-gray-600 block text-xl font-bold"
                 htmlFor="password"
                    >Nuevo Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu nuevo password"
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
            </div>

            <input
                type="submit"
                value="Guardar Nuevo Password"
                className="bg-red-700 mb-5 w-full py-3 text-white uppercase font-bold
                 rounded hover:cursor-pointer hover:bg-red-800 transition-colors "
            />
         </form>
         )}
         {passwordModificado && (
                     <Link 
                     className="block text-center my-5 text-red-500 uppercase text-sm"
                     to="/"
                     > inicia sesion</Link>
                )}
        </>
    );
}


export default NuevoPassword;