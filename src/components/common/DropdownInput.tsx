import { ReactNode } from 'react'

type DropdownInputProps = {
    label?: string,
    defaultValue: string,
    onChange: (e: string) => void,
    children?: ReactNode
}

export default function DropdownInput({ label, defaultValue, onChange, children }: DropdownInputProps) {
    return (
        <div className="form-control">
            {
                label &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <select
                className="select select-bordered w-full"
                defaultValue={defaultValue}
                onChange={e => onChange(e.target.value)}
            >
                {children}
            </select>
        </div>
    )
}
