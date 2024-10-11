import { ChangeEvent, useState } from "react";

interface Formvalues {
  [key: string]: string | number;
}
export const useForm = <T extends Formvalues>(initialValue: T) => {
  const [values, setValues] = useState<T>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [`${name}`]: value });
  };
  const resetForm = ()=>{
    setValues(initialValue)
  }
  return{
    values,
    handleChange,
    resetForm
  }
};