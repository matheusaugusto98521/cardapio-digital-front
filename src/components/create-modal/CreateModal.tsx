import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";
import "./modal.css";

type InputProps = {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

const Input = ({ label, value, updateValue} : InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)}/>
        </>
    );
}

type ModalProps = {
    closeModal(): void;
}


export function CreateModal({closeModal}: ModalProps){
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const { mutate, isSuccess } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }
        mutate(foodData);
    }

    useEffect(() => {
        if(!isSuccess) return;
        closeModal();
    }, [isSuccess])
    
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo produto no cardápio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                <button className="btn-secondary" onClick={submit}>Enviar</button>
            </div>
        </div>
    );
}