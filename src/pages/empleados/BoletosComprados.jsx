import { useEffect } from 'react'
import '../../BoletosComprados.css'
import logo from '../../assets/logo.png'
import { useBoleto } from '../../context/BoletosContext'



function BoletosComprados() {
    const { getBoletos, boletos } = useBoleto()

    useEffect(() => {
        getBoletos()
        console.log(boletos)
    }, [])
    return (
        <div>
            <h1 style={{ color: "white", fontSize: "40px", fontWeight: "bold", margin: "5%" }}>Boletos Comprados</h1>
            <div style={{ margin: "5%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>


                {
                    boletos.map((boleto) => (
                        <div style={{ margin: "5%" }} key={boleto._id}>
                            <div className="cardBoleto">       

                                <div className="cardBoleto-info">
                                    <h1 style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}>Boleto </h1>
                                    <img src={logo} alt="Autobús" className="img-fluid mb-3" />
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>ID:  </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{boleto._id} </h2>
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Correo: </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{boleto.empleado.email} </h2>
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Nro Asiento : </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{boleto.asiento} </h2>
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Destino:  </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{boleto.destino} </h2>
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Hora:  </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{boleto.hora}</h2>
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Precio: </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{boleto.precio} BS</h2>

                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default BoletosComprados