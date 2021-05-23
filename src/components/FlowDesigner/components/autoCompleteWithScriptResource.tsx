import { AutoComplete } from 'antd';
import React, { useContext, useState } from 'react'
import { ScriptResourceContext } from '../context/scriptResourceContext';

interface AutoCompleteWithScriptResourceProps {
    placeholder?: string,
    value?: string,
    onChange?: Function
}

/**
 * 使用這個 component 只要在輸入匡加入 "#" 就可以透過 scriptResourceContext 取得目前定義的資源
 * 
 * 備註：prop 中會有 value 和 onChange 是為了配合 antd 的 form item，如果不加這兩個 prop，將這個 component 放在
 * form.item 中，form 會吃不到這個 component 的資料
 * ref: https://stackoverflow.com/questions/61793036/why-wont-custom-input-controls-validation-properly-in-ant-design-forms
 */
export const AutoCompleteWithScriptResource: React.FC<AutoCompleteWithScriptResourceProps> = ({ placeholder, value = '', onChange, children }) => {
    const [internalValue, setInternalValue] = useState(value);
    const [options, setOptions] = useState<any[]>([]);
    const { flowVariable, scriptVariable, routes, tables, scripts } = useContext(ScriptResourceContext);

    const onSearch = (searchText: string) => {
        if (searchText.includes("#")) {
            setOptions([
                {
                    label: "流程內變數",
                    options: flowVariable
                },
                {
                    label: "全域變數",
                    options: scriptVariable
                },
                {
                    label: "api",
                    options: routes
                },
                {
                    label: "資料表",
                    options: tables
                },
                {
                    label: "腳本",
                    options: scripts
                }
            ])
        }
    };

    const onSelect = (data: string) => {
        setInternalValue(internalValue.replace("#", `\${${data}}`));
        setOptions([]);
    };
    const internalOnChange = (data: string) => {
        setInternalValue(data);

        if (onChange && data && data.length !== 0) {
            if (internalValue && internalValue.length !== 0 && internalValue.includes("#")) {
                onChange(internalValue.replace("#", `\${${data}}`));
            } else {
                onChange(data);
            }
        }
    };
    return (
        <AutoComplete
            value={internalValue}
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={internalOnChange}
            placeholder={placeholder ? `${placeholder},使用 "#" 可取用變數` : `使用 "#" 可取用變數`}
        >
            {children}
        </AutoComplete>
    );
}