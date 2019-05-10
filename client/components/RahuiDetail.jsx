import React, { Component } from 'react';
import Map from './Map'
import SplitterLayout from 'react-splitter-layout';
import { connect } from "react-redux";
import { fetchAllRahui} from "../actions/rahui";


class RahuiDetail extends Component {
  
    componentDidMount(){
        this.props.dispatch(fetchAllRahui())
    }

    render() { 
        let rahuiId = this.props.match.params.id;
        console.log(rahuiId, this.props)
    
        let {iwi_name, description, last_name, first_name, hapu_name, date_placed, date_lifted, korero, email} = this.props.allrahui.find( rahui => rahui.id == rahuiId)
       
        return ( 
        <div>
        <SplitterLayout >
            <div >
                <Map  />
            </div> 

            <div className="detailwrapper">
                <b>IWI: {iwi_name} </b> <br/>
                <h1> {description}</h1>
                <br/><b>Issued by:</b> <p> {first_name} {last_name} ({iwi_name} | {hapu_name})</p>
                <br/><b>Date placed:</b> <p> {date_placed}</p>
                <br/><b>Date Lifted:</b> <p> {date_lifted}</p>
                <br/><b>Korero:</b> <p> {korero}</p>
                <br/><b>Contact:</b> <p> {email}</p>
                <hr></hr>
            </div>

        </SplitterLayout>
        </div>
         );
    }
}
 

const mapStateToProps = state =>{
    return {
        allrahui: state.rahui
    }
}
 
export default connect(mapStateToProps)(RahuiDetail);

