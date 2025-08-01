const FormInput = ({name, valueType, handleChange}) => {
    return (
        <div>
        <label htmlFor={name}>{name}:</label>
        <input 
        type={name === 'password' ? 'password' : 'text'}
        id={name}
        name={name}
        value={valueType}
        onChange={handleChange}
            />     
      </div>
    )
}

export default FormInput;