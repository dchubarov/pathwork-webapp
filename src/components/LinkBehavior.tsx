import React, {forwardRef} from "react";
import {Link, LinkProps} from "react-router-dom";

const LinkBehavior = forwardRef<any, Omit<LinkProps, 'to'> & { href: LinkProps['to'] }>(
    (props, ref) => {
        const {href, ...other} = props;
        // Map href (MUI) -> to (react-router)
        return <Link ref={ref} to={href} {...other} />;
    });

export default LinkBehavior;
