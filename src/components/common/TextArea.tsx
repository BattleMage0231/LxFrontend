type TextAreaProps = {
    label?: string,
    defaultValue?: string,
    onChange: (e: string) => void
}

export default function TextArea({ label, defaultValue, onChange }: TextAreaProps) {
    return (
        <div className="form-control">
            {
                label &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <textarea
                className="textarea textarea-bordered leading-tight resize-none"
                defaultValue={defaultValue}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}
