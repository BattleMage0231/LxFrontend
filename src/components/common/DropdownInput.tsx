import { ReactNode } from 'react'

type DropdownInputProps = {
    label?: string,
    defaultValue: string,
    onChange: (e: string) => void,
    children?: ReactNode
}

export default function DropdownInput({ label, defaultValue, onChange, children }: DropdownInputProps) {
    return (
        <div className="form-control max-w-xs">
            {
                label &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <select
                className="select select-bordered"
                defaultValue={defaultValue}
                onChange={e => onChange(e.target.value)}
            >
                {children}
            </select>
        </div>
    )
}
