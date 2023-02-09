import axios from "axios";
import {API_URL, ENCRYPTION_KEY} from "./constants";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CryptoJS from "crypto-js";

export const ValidateToken = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem('token');
    useEffect(() => {
        // Com o token faço a requisição para validar a autenticidade e retorno os dados do usuário
        if (jwtToken !== "") {
            // Token é enviado no header pela requisição
            axios.get(API_URL + '/auth/validate', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }).then((rs) => {
                // Com o retorno da validação do certificado seto o objUser.
                const objUser = rs.data;
                dispatch({type: "SET_OBJ_USER", objUser});
            }).catch((err) => {
                navigate('/login');
            });
        } else {
            navigate('/login');
        }
    }, [navigate ,dispatch, jwtToken]);

};

export const encrypt = (plainText) => {
    const encrypted = CryptoJS.AES.encrypt(plainText, ENCRYPTION_KEY);
    return encrypted.toString();
};

export const decrypt = (encryptedText) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
};

export const formatDate = (string) => {
    const date = new Date(string);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-US', options).replace(',', '');
}

export const truncateText = (text, init, limit) => {
    return text.length > init ? text.substring(0, limit) + '...' : text;
}

export const stripHTMLTags = (str) => {
    return str.replace(/<[^>]+>/g, '');
}
