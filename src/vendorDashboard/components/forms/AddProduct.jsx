import React,{useState} from 'react'
import {API_URL} from '../../../data/apiPath'

const AddProduct = () => {
  const [productName,setProductName] = useState("");
  const[price,setPrice]=useState("");
  const [category,setCategory]=useState([]);
  const[bestSeller,setBestSeller] = useState(false);
  const [image,setImage]=useState(null);
  const [description,setDescription] = useState("");

  const handleCategorychange = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value));
    }else{
      setCategory([...category,value])
    }
  }

  const handleBestseller = (event)=>{
    const value = event.target.value === 'true';
    setBestSeller(value)

  }
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0]; // Corrected to files[0]
    setImage(selectedImage);
};
  const handleAddProduct  =async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId')
      if(!loginToken || !firmId){
        console.error("user not authenticated");
      }
      const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image); // Ensure file is appended only if it exists

        category.forEach((value) => {
            formData.append('category', value);
        });

        const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
          method:'POST',
          body:formData

        })
        const data = await response.json()

        if(response.ok){
          alert('product added successfully')
        }
      
    } catch (error) {
      console.error(error);
      alert("failed to add product")
      
    }

  }

  return (
    <div className="firmsection">

        <form className="tableForm" onSubmit={handleAddProduct}>
            <h3>Add Product</h3>
            <label>Product Name</label>
            <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
            <label>price</label>
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type='checkbox' value="veg"  checked={category.includes('veg')} onChange={handleCategorychange}/>
              </div>
              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type='checkbox' value="Non-veg"  checked={category.includes('Non-veg')} onChange={handleCategorychange}/>
              </div>
              </div>
              
            </div>
            <div className="checkInp">
              <label>Best Seller</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Yes</label>
                <input type='radio' value="true" checked={bestSeller== true} onChange={handleBestseller}/>
              </div>
              <div className="checkboxContainer">
                <label>No</label>
                <input type='radio' value="false" checked={bestSeller==false} onChange={handleBestseller}/>
              </div>
              </div>
              
            </div>
            <label>Description</label>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <label>Firm Image</label>
            <input type="file" onChange={handleImageUpload}/>
            <br/>
            <div className="btnsubmit">
                <button type='submit'>submit</button>
            </div>
        </form>
        
    </div>
    
  )
}

export default AddProduct