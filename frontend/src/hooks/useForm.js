import React, { useCallback } from 'react';

//---ОБРАБОТКА ПОЛЕЙ ФОРМЫ---
function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(e) {
    const input = e.target;
    const name = input.name;
    const value = input.value;
  
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validationMessage});
    setIsValid(input.closest('form').checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  )

  return {values, setValues, errors, isValid, setIsValid, handleChange, resetForm};
}

export default useFormWithValidation;


// function useForm () {
//   const [values, setValues] = React.useState({});

//   function handleChange(e) {
//     const input = e.target;
//     const name = input.name;
//     const value = input.value;
  
//     setValues({...values, [name]:value})
//   }

//   return {values, setValues, handleChange}
// }