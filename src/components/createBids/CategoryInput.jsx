import { useCreateBidsContext } from "../../context/createBidsContext";

const categories = [
    "ELECTRONICS",
    "FASHION_ACCESSORIES",
    "HOME_GARDEN",
    "ART_ANTIQUES",
    "COLLECTIBLES_MEMORABILIA",
    "JEWELRY_WATCHES",
    "VEHICLES_AUTO",
    "SPORTS_MEMORABILIA",
    "TOYS_HOBBIES",
    "BOOKS_MEDIA",
    "TICKETS_EXPERIENCES",
    "INDUSTRIAL_EQUIPMENT",
  ];

const CategoryInput = ({detailsDataValue}) => {
    const {handleChange} = useCreateBidsContext();
    
    return (
       <div className="input-container">
        <h2>Category</h2>
        <select
         name="category"
         onChange={handleChange}
         value={detailsDataValue}
         >
            {categories.map((category, index) => (
                <option
                key={index} 
                value={category}
                >
                    {category}
                </option>
            ))}
        </select>
       </div>
    )
}

export default CategoryInput;