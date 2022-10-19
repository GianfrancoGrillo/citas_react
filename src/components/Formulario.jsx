import { useState, useEffect } from 'react';
import Error from './Error';

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {

    const handleSubmit = (e) => {
        e.preventDefault();


        //validacion 

        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            console.log ("Tienen que completarse los campos")
            setError(true)
            return;
        }    
        setError(false)

        //objeto paciente

        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,

        }

        if(paciente.id) {
            //EDITANDO EL REGISTRO
        objetoPaciente.id = paciente.id
        const pacientesActualizados = pacientes.map(pacienteState=> pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState)
        setPacientes(pacientesActualizados)
        setPaciente({})
        }else {
            //NUEVO REGISTRO
        objetoPaciente.id = generarId()
        setPacientes([...pacientes, objetoPaciente])
        }

       

        //reinicio el formulario
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
    }

    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [sintomas, setSintomas] = useState("")

    const [error, setError] = useState(false)

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {

            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    },[paciente])

    const generarId= () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)

        return fecha + random
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10"> Anade pacientes y
                <span className="text-indigo-600 font-bold"> administralos </span>
            </p>


            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

            {error && <Error  mensaje="Todos los campos son obligatorios" /> }

                <div className="mb-5">

                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota"> Nombre de la mascota</label>
                    <input id="mascota" type="text" placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                </div>

                <div className="mb-5">

                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario"> Nombre del Propietario</label>
                    <input id="propietario" type="text" placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                        
                        />


                </div>

                <div className="mb-5">

                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email"> Email</label>
                    <input id="email" type="email" placeholder="Email contacto propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                        />


                </div>

                <div className="mb-5">

                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta"> Alta</label>
                    <input id="alta" type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                         />


                </div>


                <div className="mb-5">

                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta"> Sintomas</label>
                    <textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        placeholder="Describe los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                        />

                </div>

                <input type="submit" className="bg-indigo-600 w-full p-3 value
                 text-white uppercase font-bold hover:bg-indigo-900 cursor-pointer" 
                 value= { paciente.id ? 'Editar paciente ' : 'Agregar Paciente' } />



            </form>
        </div>
    )
}

export default Formulario