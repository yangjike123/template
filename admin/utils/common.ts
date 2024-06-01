import { createElement } from "react";
import * as icons from '@ant-design/icons';
export function Icon(props: { icon: string }) {
    const { icon } = props;
    const antIcon: { [key: string]: any } = icons;
    return createElement(antIcon[icon]);
};