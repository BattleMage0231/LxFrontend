type TextInputProps = {
    id?: string,
    name?: string,
    defaultValue?: string,
    onChange: (e: string) => void
};

export default function TextInput({ id, name, defaultValue, onChange }: TextInputProps) {
    return (
        <>
            { name && <label htmlFor={id} className="block mb-2 text-sm font-medium">{name}</label>}
            <input 
                type="text" 
                id={id}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={defaultValue} 
                onChange={e => onChange(e.target.value)}
            />
        </>
    );
}
