import React from "react";
import SplitterLayout from 'react-splitter-layout';
import { connect } from "react-redux";
import { fetchAllRahui } from "../../actions/rahui";
import NewMap from "../NewMap";
import RahuiList from "../RahuiList/RahuiList";


class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.dispatch(fetchAllRahui())
    }

    render() {
        return (
            // <div >

            //     <SplitterLayout >
            //         <div >
            //             <NewMap color={"#FF4C4C"} rahuiBounds={[{ lat: -33.543484, lng: 172.880926 }, { lat: -47.622458, lng: 170.036187 }]} />
            //         </div>

            //         <div className="detailwrapper">
            //             <RahuiList allrahui={this.props.allrahui.reverse()} />
            //             <div className="spaceme" />
            //         </div>

            //     </SplitterLayout>

            // </div>



            <React.Fragment>

                    <div className="mapBackground">
                        <NewMap color={"#FF4C4C"} rahuiBounds={[{ lat: -33.543484, lng: 172.880926 }, { lat: -47.622458, lng: 170.036187 }]} />
                    </div>

                    <div className="overlayNew">
                        <RahuiList allrahui={this.props.allrahui.reverse()} />
                        <div className="spaceme" />
                    </div>


            </React.Fragment>






        );
    }
}

const mapStateToProps = state => {
    return {
        allrahui: state.rahui
    }
}

export default connect(mapStateToProps)(Explore);
