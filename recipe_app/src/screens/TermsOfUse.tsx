import {View, Text, ScrollView} from "react-native";
import styles from "../stylesheets/TermsOfUse_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {useEffect, useState} from "react";
import general from "../stylesheets/General_stylesheet";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";
interface TOUProps {
    isRegisterPage : boolean;
}

const TermsOfUse = ({isRegisterPage}:TOUProps) => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();
    const {colors} = useTheme();
    const theme = useTheme();
    const [translation1, setTranslation1] = useState<string>('1. Terms');
    const [translation2, setTranslation2] = useState<string>('By accessing the application, you are agreeing to be bound by these terms of service, all\napplicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.\nIf you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials\ncontained in this website are protected by applicable copyright and trademark law.');
    const [translation3, setTranslation3] = useState<string>('2. Use License');
    const [translation4, setTranslation4] = useState<string>('Permission is granted to temporarily download one copy of the materials (information or software) on\n RecipeApp\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a\n transfer of title, and under this license you may not : \n\nmodify or copy the materials;\n use the materials for any commercial purpose, or for any public display (commercial or non-commercial);\n attempt to decompile or reverse engineer any software contained on RecipeApp\'s application; \nremove any copyright or other proprietary notations from the materials;\nor transfer the materials to another person or "mirror" the materials on any other server.\n\n This license shall automatically terminate if you violate any of these restrictions and may be terminated by\nRecipeApp at any time. Upon terminating your viewing of these materials or upon the termination of this license,\nyou must destroy any downloaded materials in your possession whether in electronic or printed format. ');
    const [translation5, setTranslation5] = useState<string>('3. Disclaimer');
    const [translation6, setTranslation6] = useState<string>('The materials on RecipeApp\'s website are provided on an \'as is\' basis. RecipeApp makes no warranties, expressed or\nimplied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or\nconditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or\nother violation of rights.\n\nFurther, RecipeApp does not warrant or make any representations concerning the accuracy, likely results, or\nreliability of the use of the materials on its website or otherwise relating to such materials or on any sites\nlinked to this site.');
    const [translation7, setTranslation7] = useState<string>('4. Limitations');
    const [translation8, setTranslation8] = useState<string>('In no event shall RecipeApp or its suppliers be liable for any damages (including, without limitation, damages for\nloss of data or profit, or due to business interruption) arising out of the use or inability to use the materials\non RecipeApp\'s website, even if RecipeApp or a RecipeApp authorized representative has been notified orally or in\nwriting of the possibility of such damage. Because some jurisdictions do not allow limitations on implied\nwarranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to\nyou.');
    const [translation9, setTranslation9] = useState<string>('5. Accuracy of materials');
    const [translation10, setTranslation10] = useState<string>('The materials appearing on RecipeApp\'s website could include technical, typographical, or photographic errors.\nRecipeApp does not warrant that any of the materials on its website are accurate, complete or current. RecipeApp\nmay make changes to the materials contained on its website at any time without notice. However RecipeApp does not\nmake any commitment to update the materials.');
    const [translation11, setTranslation11] = useState<string>('6. Links');
    const [translation12, setTranslation12] = useState<string>('RecipeApp has not reviewed all of the sites linked to its website and is not responsible for the contents of any\nsuch linked site. The inclusion of any link does not imply endorsement by RecipeApp of the site. Use of any such\nlinked website is at the user\'s own risk.');
    const [translation13, setTranslation13] = useState<string>('7. Modifications');
    const [translation14, setTranslation14] = useState<string>('RecipeApp may revise these terms of service for its website at any time without notice. By using this website you\nare agreeing to be bound by the then current version of these terms of service.');
    const [translation15, setTranslation15] = useState<string>('8. Governing Law');
    const [translation16, setTranslation16] = useState<string>('These terms and conditions are governed by and construed in accordance with the laws of United States and you\nirrevocably submit to the exclusive jurisdiction of the courts in that State or location.');

    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3, translation4, translation5, translation6, translation7, translation8, translation9, translation10, translation11, translation12, translation13, translation14, translation15, translation16]);
                    setTranslation1(elementsTranslated[0]);
                    setTranslation2(elementsTranslated[1]);
                    setTranslation3(elementsTranslated[2]);
                    setTranslation4(elementsTranslated[3]);
                    setTranslation5(elementsTranslated[4]);
                    setTranslation6(elementsTranslated[5]);
                    setTranslation7(elementsTranslated[6]);
                    setTranslation8(elementsTranslated[7]);
                    setTranslation9(elementsTranslated[8]);
                    setTranslation10(elementsTranslated[9]);
                    setTranslation11(elementsTranslated[10]);
                    setTranslation12(elementsTranslated[11]);
                    setTranslation13(elementsTranslated[12]);
                    setTranslation14(elementsTranslated[13]);
                    setTranslation15(elementsTranslated[14]);
                    setTranslation16(elementsTranslated[15]);
                } catch (error) {
                    console.error('Erreur de traduction TermsOfUse:', error);
                }
            } else {
                setTranslation1('1. Terms');
                setTranslation2('By accessing the application, you are agreeing to be bound by these terms of service, all\napplicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.\nIf you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials\ncontained in this website are protected by applicable copyright and trademark law.');
                setTranslation3('2. Use License');
                setTranslation4('Permission is granted to temporarily download one copy of the materials (information or software) on\n RecipeApp\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a\n transfer of title, and under this license you may not : \n\nmodify or copy the materials;\n use the materials for any commercial purpose, or for any public display (commercial or non-commercial);\n attempt to decompile or reverse engineer any software contained on RecipeApp\'s application; \nremove any copyright or other proprietary notations from the materials;\nor transfer the materials to another person or "mirror" the materials on any other server.\n\n This license shall automatically terminate if you violate any of these restrictions and may be terminated by\nRecipeApp at any time. Upon terminating your viewing of these materials or upon the termination of this license,\nyou must destroy any downloaded materials in your possession whether in electronic or printed format. ')
                setTranslation5('3. Disclaimer');
                setTranslation6('The materials on RecipeApp\'s website are provided on an \'as is\' basis. RecipeApp makes no warranties, expressed or\nimplied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or\nconditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or\nother violation of rights.\n\nFurther, RecipeApp does not warrant or make any representations concerning the accuracy, likely results, or\nreliability of the use of the materials on its website or otherwise relating to such materials or on any sites\nlinked to this site.');
                setTranslation7('4. Limitations');
                setTranslation8('In no event shall RecipeApp or its suppliers be liable for any damages (including, without limitation, damages for\nloss of data or profit, or due to business interruption) arising out of the use or inability to use the materials\non RecipeApp\'s website, even if RecipeApp or a RecipeApp authorized representative has been notified orally or in\nwriting of the possibility of such damage. Because some jurisdictions do not allow limitations on implied\nwarranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to\nyou.');
                setTranslation9('5. Accuracy of materials');
                setTranslation10('The materials appearing on RecipeApp\'s website could include technical, typographical, or photographic errors.\nRecipeApp does not warrant that any of the materials on its website are accurate, complete or current. RecipeApp\nmay make changes to the materials contained on its website at any time without notice. However RecipeApp does not\nmake any commitment to update the materials.');
                setTranslation11('6. Links');
                setTranslation12('RecipeApp has not reviewed all of the sites linked to its website and is not responsible for the contents of any\nsuch linked site. The inclusion of any link does not imply endorsement by RecipeApp of the site. Use of any such\nlinked website is at the user\'s own risk.');
                setTranslation13('7. Modifications');
                setTranslation14('RecipeApp may revise these terms of service for its website at any time without notice. By using this website you\nare agreeing to be bound by the then current version of these terms of service.');
                setTranslation15('8. Governing Law');
                setTranslation16('These terms and conditions are governed by and construed in accordance with the laws of United States and you\nirrevocably submit to the exclusive jurisdiction of the courts in that State or location.');
            }
        }
        fetchTranslation();
    }, [language]);
    
    return (
        <View style={[styles.container, general.container, {backgroundColor : isRegisterPage ? "#f2f2f2" :  colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" />  :  <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
            <ScrollView>
                <View style={{margin :  10}}>
                    <Text style={[styles.textTitle, {color : colors.text}]}>{translation1}</Text>
                    <Text style={[styles.text, {color : colors.text}]}>
                        {translation2}
                    </Text>
                    <Text style={[styles.textTitle, {color : colors.text}]}>{translation3}</Text>
                    <Text style={[styles.text, {color : colors.text}]}>
                        {translation4}
                    </Text>
                    <Text style={[styles.textTitle, {color : colors.text}]}>{translation5}</Text>
                    <Text style={[styles.text, {color : colors.text}]}>
                        {translation6}
                    </Text>
                    <Text style={[styles.textTitle, {color : colors.text}]}>{translation7}</Text>
                    <Text style={[styles.text, {color : colors.text}]}>
                        {translation8}
                    </Text>
                    <Text style={[styles.textTitle, {color : colors.text}]}>{translation9}</Text>
                    <Text style={[styles.text, {color : colors.text}]}>
                        {translation10}
                    </Text>
                    <Text style={[styles.textTitle, {color : colors.text}]}>{translation11}</Text>
                    <Text style={[styles.text, {color : colors.text}]}>
                        {translation12}
                    </Text>
                    <Text style={[styles.textTitle, {color : colors.text}]}>{translation13}</Text>
                    <Text style={[styles.text, {color : colors.text}]}>
                        {translation14}
                    </Text>
                    <Text style={[styles.textTitle, {color : colors.text}]}>{translation15}</Text>
                    <Text style={[styles.text, {color : colors.text}]}>
                        {translation16}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default TermsOfUse;