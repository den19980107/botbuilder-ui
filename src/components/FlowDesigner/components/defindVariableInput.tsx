import { Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { ResourceType, UseScriptResourceRegister } from '../util/useScriptResourceRegister';


interface DefindVariableInputProps {
    nodeId: string,
    type: ResourceType,
    value?: string,
    onChange?: Function
}

/**
 * 在這個 component 中輸入的資料都會被存到 scriptResourceContext 中，且可以根據 prop 中的 type
 * 來決定是要存到 flowVaraible 還是 scriptVariable 
 * 
 * 備註：prop 中會有 value 和 onChange 是為了配合 antd 的 form item，如果不加這兩個 prop，將這個 component 放在
 * form.item 中，form 會吃不到這個 component 的資料
 * ref: https://stackoverflow.com/questions/61793036/why-wont-custom-input-controls-validation-properly-in-ant-design-forms
 */
export const DefindVariableInput: React.FC<DefindVariableInputProps> = ({ nodeId, type, value = '', onChange }) => {
    const [internalValue, setInternalValue] = useState(value);
    const { registerVariableToContext } = UseScriptResourceRegister();

    useEffect(() => {
        registerVariableToContext(value, nodeId, "flowVariable");
    }, [])

    const handleValueChange = (e) => {
        setInternalValue(e.target.value);
        if (onChange) onChange(e.target.value);
        registerVariableToContext(e.target.value, nodeId, "flowVariable");
    }

    return (
        <Input value={internalValue} onChange={handleValueChange}></Input>
    );
}