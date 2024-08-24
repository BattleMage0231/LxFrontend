type TextInputProps = {
    label?: string,
    defaultValue?: string,
    onChange: (e: string) => void
}

export default function TextInput({ label, defaultValue, onChange }: TextInputProps) {
    return (
        <div className="form-control max-w-xs">
            {
                label &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <input
                type="text"
                className="input input-bordered"
                defaultValue={defaultValue}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}
