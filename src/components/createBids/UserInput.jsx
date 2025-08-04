import { useCreateBidsContext } from "../../context/createBidsContext";

const UserInput = ({name = undefined, detailsValueKey, detailsDataValue}) => {
    const {handleChange} = useCreateBidsContext();
    return (
        <div className="input-container">
            {name && (
                <h2>{name}</h2>
            )}
            <input type="text" 
            name={detailsValueKey}
            value={detailsDataValue}
            onChange={handleChange}
             />
        </div>
    )
}

export default UserInput;