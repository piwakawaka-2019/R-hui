export function toggleLang () {
  return {
    type: 'TOGGLE_LANG',
  }
}

export function toggle() {
  return (
  this.props.lang == "eng" ? language.english : language.te_reo)
}

// export function fetchAllIwi() {

//   return dispatch => {

//       getIwi().then(allIwi => {
//           // console.log("fetch iwi arr (from actions/iwi.js)", allIwi)
//           dispatch(saveAllIwi(allIwi))
//           dispatch(saveArea(allIwi))
//       })
//   }
// }