import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";
import {StackNavigationOptions} from "react-navigation-stack/lib/typescript/src/vendor/types";

interface MyStackNavigationProp<T> extends StackNavigationProp<T> {
    setOptions: (options: Partial<StackNavigationOptions>) => void;
}

export default MyStackNavigationProp;
