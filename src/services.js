import axios from "axios";

export const fetchMakeUps = async () => {
  try {
    const response = await axios.get(
      `https://vinarci-backend.onrender.com/api/make-ups?populate=*`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export const fetchLogos = async () => {
  try {
    const response = await axios.get(
      `https://vinarci-backend.onrender.com/api/logos?populate=*`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get(
      `https://vinarci-backend.onrender.com/api/services?populate=*`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export const fetchProducts = async (query) => {
  try {
    const response = await axios.get(
      `https://vinarci-backend.onrender.com/api/dresses?populate=*${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};
export const fetchProductsMain = async (query) => {
  try {
    const response = await axios.get(
      `https://vinarci-backend.onrender.com/api/dresses?populate=*`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export const fetchProduct = async (id) => {
  try {
    const response = await axios.get(
      `https://vinarci-backend.onrender.com/api/dresses/${id}?populate=*`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};
