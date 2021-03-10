import React from 'react';
import Tabla from './Tabla';
class App extends React.Component {

    state = {inversion:1560, porcentaje:0.714, fecha:"",calcular:false, infoTabla:[]};

    redondear = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
        //return parseFloat(num.toFixed(2));
    }
    calcularGanancias = () =>{
        let porcetajeDiario = parseFloat(this.state.porcentaje);
        let saldo = parseInt(this.state.inversion);
        let ganancias = 0;
        let dia = 1;
        let reinversion = 0;
        let gtot=0;
        let tabla = [];
        for (dia; dia<=365; dia++){
            ganancias += saldo/100 * porcetajeDiario;
            ganancias = this.redondear(ganancias);
            saldo += reinversion;
            reinversion = 0;
            gtot= ganancias;
            if (ganancias>=53.5){
                let packs = Math.trunc(ganancias/53.5);
                let recompra = 53.5*packs;
                reinversion = 50*packs;
                gtot = ganancias;
                ganancias = ganancias - recompra;
            }
            let registro = {dia,inversion:saldo, ganancias:gtot};
            tabla.push(registro);
            this.setState({infoTabla:tabla});
            //console.log(this.state.infoTabla)
            //await this.setState({infoTabla:this.state.infoTabla.push(registro)})
            //console.log("Dia: "+dia+" saldo: "+saldo+" ganancias: "+gtot);
        }

        this.setState({calcular:true});
    }

    renderTabla = () => {
        if (this.state.calcular){
            return (<div className="ui center aligned segment">
                <Tabla fecha={this.state.fecha} infoTabla={this.state.infoTabla}/>
            </div>);
            }
    }

    onInputChange = e => {
        if (e.target.name === "inversion") {
            this.setState({ inversion: e.target.value });
        }
        if (e.target.name === "porcentaje") {
            this.setState({ porcentaje: e.target.value });
        }
        if (e.target.name === "fecha") {
            this.setState({ fecha: e.target.value });
        }
    }

    render(){
        return( 
            <div className="ui container">
                <div className="ui form">
                    <div className="fields">
                        <div className="field">
                            <label>Inversion Inicial</label>
                            <input required={true} name="inversion" value={this.state.inversion} type="number" onChange={this.onInputChange} />
                         </div>
                        <div className="field">
                            <label>Porcentaje Diario</label>
                            <input required={true} name="porcentaje" value={this.state.porcentaje} type="number" onChange={this.onInputChange} />
                        </div>
                        <div className="field">
                            <label>Fecha de inicio</label>
                            <input required={true} name="fecha" value={this.state.fecha} type="date" onChange={this.onInputChange} />
                        </div>
                    </div>
                    <button className="ui button" type="submit" onClick={()=>{this.calcularGanancias()}}>Generar Tabla</button>
                </div>
                <div>
                    <br/>
                    {this.renderTabla()}
                </div>
            </div>
        )
    }
}

export default App;