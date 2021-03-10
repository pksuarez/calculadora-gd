import React from 'react';

class Tabla extends React.Component {

    constructor(props) {
        super(props);
        this.state = {fechaInicial:props.fecha}
    }
    //.toLocaleDateString("en-GB")

    renderTabla = () => {
        return (
            this.props.infoTabla.map((dato,index) => {
                let fecha = new Date(this.props.fecha);
                fecha.setDate(fecha.getDate()+dato.dia);
                let check = ""; //para sabersi poner o no el check para reinvertir
                if (dato.ganancias>=53.5)
                    check = "large green checkmark icon";
                return(
                    <tr key={index}>
                        <td data-label="Fecha">{fecha.toLocaleDateString("en-GB")}</td>
                        <td data-label="Inversion">{dato.inversion}</td>
                        <td data-label="Ganancias">{dato.ganancias}</td>
                        <td className="center aligned" data-label="Reinvertir"><i className={check}></i></td>
                    </tr>
                )
            } )
        )
    }

    render() {
        return (
            <div><table className="ui celled table">
                <thead>
                    <tr><th>Fecha</th>
                        <th>Inversion</th>
                        <th>Ganancias</th>
                        <th>Reinvertir</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTabla()}
                </tbody>
            </table>
            </div>
        )
    }
}


export default Tabla;