
import React,{useState} from 'react'
import {API_URL} from '../../../data/apiPath'

const AddFirm = () => {
  const [firmName ,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [category,setCategory] = useState([]);
  const [region,setRegion] = useState([]);
  const [offer,setOffer] = useState("");
  const [file,setFile] = useState(null);

  const handleCategorychange = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value));
    }else{
      setCategory([...category,value])
    }
  }
  const handleRegionchange = (event)=>{
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=> item !== value));
    }else{
      setRegion([...region,value])
    }
  }

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated");
        return;
      }
  
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      if (file) formData.append('image', file); // Ensure file is appended only if it exists
  
      category.forEach((value) => {
        formData.append('category', value);
      });
      region.forEach((value) => {
        formData.append('region', value);
      });
  
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("Firm added Successfully");
  
        // Set the firmId and firmName only if they exist in the response
        if (data.firmId) {
          localStorage.setItem('firmId', data.firmId);
        }
        if (data.vendorFirmName) {
          localStorage.setItem('firmName', data.vendorFirmName);
        }
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm Exists 🥗. Only 1 firm can be added");
  
        // Ensure existing firmId and firmName remain in localStorage
        const existingFirmId = localStorage.getItem('firmId');
        const existingFirmName = localStorage.getItem('firmName');
        if (!existingFirmId || !existingFirmName) {
          localStorage.setItem('firmId', data.firmId || existingFirmId);
          localStorage.setItem('firmName', data.vendorFirmName || existingFirmName);
        }
      } else {
        alert('Failed to add Firm');
      }
    } catch (error) {
      console.error("Failed to add firm:", error);
    }
  };
  

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0]; // Corrected to files[0]
    setFile(selectedImage);
};


  return (
    <div className="firmsection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
            <label>Area</label>
            <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)}/>
            {/* <label>Category</label>
            <input type="text"/> */}
            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type='checkbox' checked={category.includes('veg')} value="veg" onChange={handleCategorychange}/>
              </div>
              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type='checkbox' checked={category.includes('non-veg')} value="non-veg" onChange={handleCategorychange}/>
              </div>
              </div>
              
            </div>
            <label>Offer</label>
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
            
            <div className="checkInp">
              <label>Region</label>
              <div className="inputsContainer">
              <div className="regboxContainer">
                <label>South Indian</label>
                <input type='checkbox' value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionchange} />
              </div>
              <div className="regboxContainer">
                <label>North Indian</label>
                <input type='checkbox'  value="north-indian" checked={region.includes('north-indian')}  onChange={handleRegionchange}  />
              </div>
              <div className="regboxContainer">
                <label>Chinese</label>
                <input type='checkbox'  value="chinese"checked={region.includes('chinese')}  onChange={handleRegionchange} />
            </div>
              <div className="regboxContainer">
                <label>Bakery</label>
                <input type='checkbox'  value="bakery" checked={region.includes('bakery')}  onChange={handleRegionchange} />
             </div>
              </div>
              
            </div>
            <label>Firm Image</label>
            <input type="file" onChange={handleImageUpload}/>
            <br/>
            <div className="btnsubmit">
                <button type="submit">submit</button>
            </div>
        </form>
        
    </div>
    
  )
}

export default AddFirm