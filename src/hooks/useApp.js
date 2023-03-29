import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useApp = () => {
  const navigate = useNavigate();
  const backendAPI = "https://readers-api.onrender.com/api/v1";

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const errorHandler = (error, message) => {
    console.log(error.response);
    let res = message || "An error occurred";

    return toast.error(res);
  };

  const storeToken = (token) => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = `userToken=${token}; expires=${d.toUTCString()}`;
  };

  const getToken = () => {
    var nameEQ = "userToken=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const eraseToken = () => {
    document.cookie = "userToken=; Max-Age=-99999999;";
  };

  const logout = () => {
    eraseToken();
    localStorage.clear();
    navigate("/auth");
  };

  const register = async (body) => {
    const { data } = await axios.post(`${backendAPI}/users/register/`, body);

    localStorage.setItem("user", JSON.stringify(data?.data));

    storeToken(data?.data?.token);

    return data;
  };

  const login = async (body) => {
    const { data } = await axios.post(`${backendAPI}/users/login/`, {
      ...body,
    });

    localStorage.setItem("user", JSON.stringify(data?.data));

    storeToken(data?.data?.token);

    return data;
  };

  const createBook = async (body) => {
    const { data } = await axios.post(
      `${backendAPI}/books/create_book/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${getToken()}`,
        },
      }
    );

    return data;
  };

  const subscribe = async (body) => {
    const { data } = await axios.post(
      `${backendAPI}/books/create_user_subscription/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${getToken()}`,
        },
      }
    );

    return data;
  };

  const getBooks = async () => {
    const { data } = await axios.get(`https://readers-api.onrender.com/books/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    });

    return data;
  };

  const getBook = async (id) => {
    const { data } = await axios.get(`${backendAPI}/books/get_book?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${getToken()}`,
      },
    });

    return data;
  };

  const getBanks = async () => {
    const { data } = await axios.get(`https://api.korapay.com/merchant/api/v1/misc/banks?countryCode=NG`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer pk_test_n1vLHpbD3ksVGQPXRYXDZyvcHVreCoGDLbhoDwcj`,
      },
    });

    return data;
  }

  return {
    storeToken,
    getToken,
    eraseToken,
    register,
    login,
    errorHandler,
    createBook,
    getBooks,
    getBook,
    logout,
    convertBase64,
    subscribe,
    getBanks,
  };
};
