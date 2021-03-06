import React from 'react'
import decode from 'jwt-decode'

import { getUserTokenInfo } from '../utils/auth'

// import data from '../apis/iwi'
import { connect } from "react-redux";
import { fetchAllIwi } from "../actions/iwi";
import { editRahui } from "../apis/rahui"
import { fetchAllRahui } from '../actions/rahui'

class EditRahuiForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            region: [],
            iwi: [],
            hapu: [],
            geoRef: null,
            authoriser: null,
            datePlaced: null,
            dateLifted: null,
            description: null,
            korero: null,
            email: null,
            contact: null,
            iwiSelected: null,
            hapuSelected: null,
            regionSelected: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelect2 = this.handleSelect2.bind(this);
        this.handleSelect3 = this.handleSelect3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderHapu = this.renderHapu.bind(this)
        this.renderIwi = this.renderIwi.bind(this)
        this.submitAdd = this.submitAdd.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        // nextProps.dispatch(fetchAllIwi())

        let rahuiId = nextProps.rahuiId;
        console.log(nextProps, rahuiId)
        
        let rahui = nextProps.allrahui.find( rahui => rahui.id == rahuiId)
        
        if (rahui) {
            let {geo_ref, region, iwi, hapu, description, date_placed, date_lifted, korero, authoriser, contact} = nextProps.allrahui.find( rahui => rahui.id == rahuiId)


            this.setState({
                id: rahuiId,
                region: region,
                iwi: iwi,
                hapu: hapu,
                authoriser: authoriser,
                description: description,
                korero: korero,
                geoRef: geo_ref,
                datePlaced: date_placed,
                dateLifted: date_lifted,
                contact: contact
            })

            console.log(rahui)
      }
    }
        //Need to hand props to component, reference RahuiDetail.jsx
    componentDidMount() {
        this.props.dispatch(fetchAllIwi())

        // console.log(this.props)

        // let rahuiId = this.props.match.params.id;

        // let {geo_ref, region, iwi, hapu, description, date_placed, date_lifted, korero, authoriser, contact} = this.props.allrahui.find( rahui => rahui.id == rahuiId)

        // this.setState({
        //     id: rahuiId,
        //     region: region,
        //     iwi: iwi,
        //     hapu: hapu,
        //     authoriser: authoriser,
        //     description: description,
        //     korero: korero,
        //     geoRef: geo_ref,
        //     datePlaced: date_placed,
        //     dateLifted: date_lifted,
        //     contact: contact
        // })
    }

//Edit existing rāhui
    handleSubmit(e) {
        e.preventDefault()

        const editedRahui = {
            id: this.state.id,
            region: this.state.region,
            iwi: this.state.iwi,
            hapu: this.state.hapu,
            authoriser: this.state.authoriser,
            description: this.state.description,
            korero: this.state.korero,
            geoRef: this.state.coordinates,
            datePlaced: this.state.datePlaced,
            dateLifted: this.state.dateLifted,
            contact: this.state.contact
        }

        // should be a dispatching an action
        editRahui(
            editedRahui
        ).then(
            () => {
                this.props.dispatch(fetchAllRahui())
            }
        )
        window.location = `/#/explore`
    }

    submitAdd(){
        let region = [...this.state.region, this.state.regionSelected]
        let iwi= [...this.state.iwi, this.state.iwiSelected]
        let hapu = [...this.state.hapu, this.state.hapuSelected]

        this.setState({
            region:[...new Set(region)],
            iwi:[...new Set(iwi)],
            hapu:[...new Set(hapu)],
            regionSelected: null,
            iwiSelected: null,
            hapuSelected: null
        })
        
    }

    resetIwiHapu(e) {
        e.preventDefault()
        this.setState({
            region: null,
            iwi: null,
            hapu: null,
            regionSelected: null,
            iwiSelected: null,
            hapuSelected: null
        })
    }
    
    
    handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({ [name]: value });
    }

    handleSelect(event) {
        this.setState({
            regionSelected: event.target.value
        });
    }

    handleSelect2(event) {
        this.setState({
            iwiSelected: event.target.value
        });
    }

    handleSelect3(event) {
        this.setState({
            hapuSelected: event.target.value
        });
    }

    renderIwi() {
        const allIwiInRegion = this.props.alliwi[this.props.area.indexOf(this.state.regionSelected)][this.state.regionSelected]

        if (allIwiInRegion.length > 0) {

            return allIwiInRegion.map(iwi => {
                return < option htmlFor="iwi" > {Object.keys(iwi)[0]}</option >
            })
        }
    }

    renderHapu() {
        const allIwiInRegion = this.props.alliwi[this.props.area.indexOf(this.state.regionSelected)][this.state.regionSelected]
        const iwiIWant = this.state.iwiSelected
        const theIwiIFound = allIwiInRegion.filter(iwi => {
            return iwi[iwiIWant] != undefined
        })

        const allHapu = theIwiIFound[0][iwiIWant]

        if (allHapu.length > 0) {
            return allHapu.map(hapu => {
                return <option htmlFor="hapu">{hapu}</option>;
            })
        }
        else (<option>No hapū</option>)
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}
                    noValidate
                >
                    <div>
                        <h1>Edit Rāhui</h1>
                        <div className="step"> step one</div>
                        <h2>Zoom into an area on the map and draw an outline for where you want to place the rāhui.</h2>
                        <hr></hr>
                        <div className="step"> step two</div>
                        <p>Edit details for this rāhui:</p>
                        <div>
                        <p>edit iwi/hapū:</p>
                        iwi:{this.state.iwi.map(iwi => {return <p>{iwi}, </p>})}<br></br>
                        <p>
                        hapu:
                        </p> 
                        {this.state.hapu.map(hapu => {return <p>{hapu}</p>})}<br></br> 
                        <button type="button" onClick={this.resetIwiHapu}>Reset</button>
                        </div>
                        <br></br>
                        <select onChange={this.handleSelect}>
                            {this.props.area.map(area => {
                                return <option htmlFor="region">{area}</option>;
                            })}
                        </select>

                        <br></br>
                        <br></br>

                        {<p>Select iwi:</p>}
                        <select onChange={this.handleSelect2}>
                            {this.state.regionSelected ? (this.renderIwi()) : <option>----------</option>}
                        </select>

                        <br></br>
                        <br></br>

                        {<p>Select hapū:</p>}
                        <select onChange={this.handleSelect3}>
                            {this.state.iwiSelected ? (
                                this.renderHapu()
                            ) : <option>----------</option>}
                        </select>
                        <br></br>
                        <button type="button" onClick={this.submitAdd}>Add Another Associated Region/Iwi/Hāpu</button>
                    <br></br>
                    </div>

                    <br></br>
                    <br></br>

                    <p>Please enter the name of the person who has authorised the rahūi:</p>

                    <input name="authoriser" type="text" placeholder={this.state.authoriser} noValidate onChange={this.handleChange} />

                    <br></br>
                    {/* <br></br>

                    <p>Please enter your name:</p>

                    <input name="submittersName" type="text" placeholder="Submitted by" />

                    <br></br> */}
                    <br></br>


                    <p>Date rahūi placed:</p>
                    <input name="datePlaced" type="date" noValidate onChange={this.handleChange} />

                    <br></br>
                    <br></br>


                    <p>Date rahūi lifted:</p>
                    <input name="dateLifted" type="date" noValidate onChange={this.handleChange} />

                    <br></br>
                    <br></br>

                    <p>Please add a brief description of the rahūi here:</p>

                    <textarea name="description" type="text" value={this.state.description}  rows="10" cols="60" noValidate onChange={this.handleChange} />

                    <br></br>
                    <br></br>

                    <p>Please add further details of the rahūi here:</p>

                    <textarea name="korero" type="text" value={this.state.korero}  rows="20" cols="60" noValidate onChange={this.handleChange} />

                    <br></br>
                    <br></br>

                    <p>Please enter contact details here:</p>

                    <textarea name="korero" type="text" value={this.state.korero}  rows="20" cols="60" noValidate onChange={this.handleChange} />
                    
                    <input name="contact" type="text" value={this.state.contact}  noValidate onChange={this.handleChange} />

                    <br></br>
                    <br></br>

                    <button name="submit">Submit edit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allrahui: state.rahui,
        alliwi: state.iwi,
        area: state.area,
        coordinates: state.coords
    }
}

export default connect(mapStateToProps)(EditRahuiForm);