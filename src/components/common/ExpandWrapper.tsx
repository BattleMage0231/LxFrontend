import { ReactNode, useState } from "react";

type ExpandWrapperProps = {
    children?: ReactNode,
    toShowMsg: string,
    toHideMsg: string
};

export default function ExpandWrapper({ children, toShowMsg, toHideMsg }: ExpandWrapperProps) {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div>
            <a href="#a" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => setIsOpened(!isOpened)}>{isOpened ? toHideMsg : toShowMsg}</a>
            {isOpened && children}
        </div>
    );
}
