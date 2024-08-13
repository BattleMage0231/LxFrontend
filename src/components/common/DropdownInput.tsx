type TextInputProps = {
    id: string,
    choices: {
        displayName: string,
        value: string
    }[],
    name: string,
    defaultValue?: string,
    onChange: (e: string) => void
};

export default function DropdownInput({ id, choices, name, defaultValue, onChange }: TextInputProps) {
    const options = choices.map(({ displayName, value }) => {
        return (
            <option key={value} value={displayName}>
                {displayName}
            </option>
        );
    });
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{name}</label>
            <select 
                defaultValue={defaultValue ?? choices[0].value}
                name={id} 
                id={id} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => onChange(e.target.value) }
            >
                {options}
            </select>
        </div>
    );
}
