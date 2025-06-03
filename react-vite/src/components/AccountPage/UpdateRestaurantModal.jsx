import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateRestaurant } from "../../redux/restaurant";
import { useModal } from "../../context/Modal";
import "./UpdateRestaurantModal.css";

function UpdateRestaurantModal({ restaurant }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [name, setName] = useState(restaurant.name || "");
  const [description, setDescription] = useState(restaurant.description || "");
  const [category, setCategory] = useState(restaurant.category || "");
  const [priceRange, setPriceRange] = useState(restaurant.priceRange || "");
  const [address, setAddress] = useState(restaurant.address || "");
  const [city, setCity] = useState(restaurant.city || "");
  const [state, setState] = useState(restaurant.state || "");
  const [zipCode, setZipCode] = useState(restaurant.zipCode || "");
  const [lat, setLat] = useState(restaurant.lat?.toString() || "");
  const [lng, setLng] = useState(restaurant.lng?.toString() || "");
  const [imageUrl, setImageUrl] = useState(restaurant.imageUrl || "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const priceOptions = ["", "$", "$$", "$$$", "$$$$"];

    if (priceRange && !priceOptions.includes(priceRange)) {
      newErrors.priceRange = "Price range must be one of: $, $$, $$$, $$$$.";
    }
    if (zipCode && !/^\d{5}(-\d{4})?$/.test(zipCode)) {
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

    const updates = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (category) updates.category = category;
    if (priceRange) updates.priceRange = priceRange;
    if (address) updates.address = address;
    if (city) updates.city = city;
    if (state) updates.state = state;
    if (zipCode) updates.zipCode = zipCode;
    if (lat) updates.lat = parseFloat(lat);
    if (lng) updates.lng = parseFloat(lng);
    if (imageUrl) updates.imageUrl = imageUrl;

    if (Object.keys(updates).length === 0) {
      setErrors({ form: "Please fill out at least one field to update." });
      return;
    }

    updates.id = restaurant.id;

    const success = await dispatch(thunkUpdateRestaurant(restaurant.id, updates));
    if (success) closeModal();
    else setErrors({ form: "Failed to update restaurant. Please try again." });
  };

  return (
    <div className="modal-form">
      <h2>Update Restaurant</h2>
      {errors.form && <p className="error">{errors.form}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="New Name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="New Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="New Category" value={category} onChange={(e) => setCategory(e.target.value)} />

        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Select New Price Range</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
        {errors.priceRange && <p className="error">{errors.priceRange}</p>}

        <input type="text" placeholder="New Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="New City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input type="text" placeholder="New State" value={state} onChange={(e) => setState(e.target.value)} />

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="New Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        {errors.zipCode && <p className="error">{errors.zipCode}</p>}

        <input
          type="number"
          step="any"
          placeholder="New Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        {errors.lat && <p className="error">{errors.lat}</p>}

        <input
          type="number"
          step="any"
          placeholder="New Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        {errors.lng && <p className="error">{errors.lng}</p>}

        <input
          type="text"
          placeholder="New Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}

        <button type="submit">Update Restaurant</button>
      </form>
    </div>
  );
}

export default UpdateRestaurantModal;