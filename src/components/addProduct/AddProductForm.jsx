import React , {useState }from 'react'
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { ToastContainer,toast } from "react-toastify";

const AddProductForm = ({token}) => {
  // const navigate = useNavigate();
  const sectionOptions = [
    {value: '', text: '--Choose an option--'},
    {value: 'slider', text: 'Slider'},
    {value: 'flash_deals', text: 'flash deals'},
    {value: 'top_categories', text: 'Top Categories'},
    {value: 'new_arrivals', text: 'New Arrivals'},
    {value: 'discounts', text: 'Big Discounts'},
    {value: 'shops', text: 'Shops'}
  ];
    
let [name, setName] = useState("");
let [desc, setDesc] = useState("");
let [cover, setCover] = useState("");
let [price, setPrice] = useState("");
let [discount, setDiscount] = useState("");
let [cateName, setCateName] = useState("");
let [brand, setDrand] = useState("");
let [section, setSection] = useState(sectionOptions[0].value);
let [isDisabled, setDisabled] = useState(false);
let [Btn, setBtn] = useState("btn-primary");

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        setBtn("btn-secondary")
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
          const response = await axios.post(`${server}/product`,
          {
            "name": name, 
            "desc":desc,
            "cover":cover,
            "price": price,
            "discount": discount,
            "cateName":cateName,
            "brand": brand,
            "section": section
          },{headers: headers});
          
          if(response.status === 200){
            setName("")
            setDesc("")
            setCover("")
            setPrice("")
            setDiscount("")
            setCateName("")
            setDrand("")
            setSection(sectionOptions[0].value)
            
            toast.success("Product added Successfully");
            setTimeout(() => { window.location.href = '/add-product' }, 2000);
            
          }else{
            toast.error(response.data.message);
            setBtn("btn-primary")
            setDisabled(false)
          }
        } catch (error) {
          toast.error(error.response.data.message);
          setBtn("btn-primary")
          setDisabled(false)
        }
    
    
  }
  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="desc"
              autoComplete="desc"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cover" className="form-label">
            Image path
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="cover"
              autoComplete="cover"
              required
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="price"
              autoComplete="price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="discount"
              autoComplete="discount"
              required
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cateName" className="form-label">
            Category Name
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="cateName"
              autoComplete="cateName"
              required
              value={cateName}
              onChange={(e) => setCateName(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="brand" className="form-label">
            Brand Name
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="brand"
              autoComplete="brand"
              required
              value={brand}
              onChange={(e) => setDrand(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="section" className="form-label">
            Section to view
          </label>
          <div className="mt-1 relative">
            <select
              value={section}
              name="section"
              required
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setSection(e.target.value)}
            >
              {sectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
              
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            style={{ cursor: "pointer", "margin-top": "5px" }}
            disabled={isDisabled}
            className={Btn}
          >
            Save Changes
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default AddProductForm