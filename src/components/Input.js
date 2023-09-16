import PropTypes from "prop-types";
function Input(props){
    return (
        <input 
        id = {props.id} 
        name={props.name}
        type = {props.type}
        onClick={props.onClick}
        onChange={props.onChange} 
        className={props.className} 
        placeholder={props.placeholder}
        value={props.value}
        checked={props.checked}
        style={props.style}
        disabled={props.disabled}>
            
        </input>
    );
}
export default Input;