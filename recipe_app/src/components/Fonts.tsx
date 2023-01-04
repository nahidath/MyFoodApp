import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
    'PlusJakartaSans': require('../../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf'),
    'Nunito': require('../../assets/fonts/NunitoSans-VariableFont_wght.ttf'),
});

export default fontsLoaded;