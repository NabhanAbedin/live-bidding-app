const FormInput = ({name, valueType, handleChange}) => {
    return (
        <div>
        <label htmlFor={name}>{name}:</label>
        <input 
        type="text"
        id={name}
        name={name}
        value={valueType}
        onChange={handleChange}
            />     
      </div>
    )
}

export default FormInput;