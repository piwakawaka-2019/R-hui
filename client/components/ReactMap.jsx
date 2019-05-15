
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { compose, withProps } from 'recompose'
import {  withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager"
import { saveCoordinates } from "../actions/coords";

// const { compose, withProps } = require("recompose");
// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
// } = require("react-google-maps");
// const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");


const MapWithADrawingManager = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCDY6eWTVLvpOoTI2JrH8Q0ycDSV3F2J5o&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: window.innerHeight }} />,
    mapElement: <div style={{ height: `170%`, width:`100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
  )(props =>
    <GoogleMap
      defaultZoom={6}
      defaultCenter={new google.maps.LatLng({lat: -47.892014, lng: 170.897149})}
      defaultOptions={{
        disableDefaultUI: true,
        mapTypeId: 'hybrid',//google.maps.MapTypeId.HYBRID,
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        labels: true
      }}
    >
    {/* {lat: -41.267622, lng: 174.745222} */}
 {/* defaultCenter={ { lat: -25.363882, lng: 131.044922 } } */}
    <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [
              // google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              // google.maps.drawing.OverlayType.POLYLINE,
              // google.maps.drawing.OverlayType.RECTANGLE,
            ],
          },
          polygonOptions: {
            fillColor: `#ffff00`,
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
          },
          
        }}
        onPolygonComplete={(polygon) => {
          var v = polygon.getPath();
          let arr=[]
          for (var i=0; i < v.getLength(); i++) {
            var xy = v.getAt(i);
            let lat = xy.lat();
            let lng = xy.lng();
            let coordObj = {
              lat, 
              lng
            }
            arr.push(coordObj)
          }
          console.log(arr)
          props.dispatch(saveCoordinates(arr))
        }}
      />     
    </GoogleMap>

  
);



function mapStateToProps({coords}) {
  return coords
}

export default connect(mapStateToProps)(MapWithADrawingManager)

