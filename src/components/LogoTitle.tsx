import { Image, ImageSourcePropType } from 'react-native';
import { useColorScheme } from '@/src/components/useColorScheme';
import LogoColor from '../constants/LogoColor';

const LogoTitle = () => {
    const colorScheme = useColorScheme();
    var logo:ImageSourcePropType;

    if(colorScheme === 'light')
        logo = LogoColor.type.light;
    else
        logo = LogoColor.type.dark;
    return(
        <Image 
            style={{ display: 'flex', alignContent: 'stretch', height: 40, width: 120}}
            source={logo}
        />
    );
};

export default LogoTitle;