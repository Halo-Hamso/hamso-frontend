import PropTypes from "prop-types";
function Input(props){
    return (
        <input 
        id = {props.id} 
        type = {props.type}
        onChange={props.onChange} 
        className={props.className} 
        placeholder={props.placeholder}
        value={props.value}
        check={props.checked}>
            
        </input>
    );
}
export default Input;