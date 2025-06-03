import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateRestaurant } from "../../redux/restaurant";
import { useModal } from "../../context/Modal";
import "./CreateRestaurantModal.css";

function CreateRestaurantModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const allowedPriceRanges = ["$", "$$", "$$$", "$$$$"];

    if (!name || name.length > 100) newErrors.name = "Name is required and must be under 100 characters.";
    if (!description) newErrors.description = "Description is required.";
    if (!category || category.length > 50) newErrors.category = "Category is required and must be under 50 characters.";
    if (priceRange && !allowedPriceRanges.includes(priceRange))
      newErrors.priceRange = "Price range must be one of: $, $$, $$$, $$$$.";
    if (!address || address.length > 255) newErrors.address = "Address is required and must be under 255 characters.";
    if (!city || city.length > 50) newErrors.city = "City is required and must be under 50 characters.";
    if (!state || state.length > 50) newErrors.state = "State is required and must be under 50 characters.";
    if (!zipCode || !/^\d{5}(-\d{4})?$/.test(zipCode)) {
        newErrors.zipCode = "Must be a valid zipcode.";
      }
    if (lat && isNaN(lat)) newErrors.lat = "Latitude must be a number.";
    if (lng && isNaN(lng)) newErrors.lng = "Longitude must be a number.";
    if (imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl)) {
        newErrors.imageUrl = "Must be a valid image URL.";
      }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const newRestaurant = {
      name,
      description,
      category,
      priceRange,
      address,
      city,
      state,
      zipCode,
      lat: lat ? parseFloat(lat) : null,
      lng: lng ? parseFloat(lng) : null,
      imageUrl: imageUrl || null,
    };

    const created = await dispatch(thunkCreateRestaurant(newRestaurant));
    if (created) closeModal();
    else setErrors({ submit: "Failed to create restaurant. Please try again." });
  };

  return (
    <div className="modal-form">
      <h2>Create a New Restaurant</h2>
      {errors.submit && <p className="error">{errors.submit}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Restaurant Name" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p className="error">{errors.name}</p>}

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <p className="error">{errors.description}</p>}

        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        {errors.category && <p className="error">{errors.category}</p>}

        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Select Price Range</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
        {errors.priceRange && <p className="error">{errors.priceRange}</p>}

        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        {errors.address && <p className="error">{errors.address}</p>}

        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        {errors.city && <p className="error">{errors.city}</p>}

        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
        {errors.state && <p className="error">{errors.state}</p>}

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        {errors.zipCode && <p className="error">{errors.zipCode}</p>}

        <input
          type="number"
          step="any"
          placeholder="Latitude (optional)"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        {errors.lat && <p className="error">{errors.lat}</p>}

        <input
          type="number"
          step="any"
          placeholder="Longitude (optional)"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
        {errors.lng && <p className="error">{errors.lng}</p>}

        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
}

export default CreateRestaurantModal;