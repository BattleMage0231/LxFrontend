import { ReactNode, useState } from 'react'

type CollapsibleProps = {
    children?: ReactNode,
    toShowMsg: string,
    toHideMsg: string
}

export default function Collapsible({ children, toShowMsg, toHideMsg }: CollapsibleProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <div className="collapse">
            <input
                type="checkbox"
                checked={!isCollapsed}
                onChange={() => setIsCollapsed(!isCollapsed)} 
            />
            <div className="collapse-title text-secondary">{isCollapsed ? toShowMsg : toHideMsg}</div>
            <div className="collapse-content">{children}</div>
        </div>
    );
}
