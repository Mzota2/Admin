import * as yup from 'yup';

const passwordRules = /^(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~*]{8,}$/;
export const Schema = yup.object().shape({
    email:yup.string().email('Please enter a valid email').required('Required'),
    password:yup.string().required('Required'),
    // confirmPassword:yup.string().oneOf([yup.ref('password'), null], 'Password must match').required('Required')
});