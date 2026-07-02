import axios from "axios";

export const sendImmergencyAlert = async () => {
  const API = import.meta.env.VITE_API_URL;
  console.log(API);
  try {
    const response = await axios.post(`${API}/api/sos/alert`);
    console.log(response);
  } catch (error) {
    console.log("cannot send alert here ");
  }
};



export const AddSOShelper=()=>{
  const API = import.meta.env.VITE_API_URL;

}


