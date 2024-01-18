import {View, Text, ScrollView} from "react-native";
import styles from "../stylesheets/PrivacyPolicy_stylesheet";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import React, {useEffect, useState} from "react";
import general from "../stylesheets/General_stylesheet";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "../translation/TranslationFunc";
import {useLanguage} from "../translation/LanguageContext";

interface PrivacyPolicyProps {
    isRegisterPage: boolean;
}
const PrivacyPolicy = ({isRegisterPage}:PrivacyPolicyProps) => {
    const {translationFunc} = useTranslation();
    const {language,setLanguage, t} = useLanguage();

    const {colors} = useTheme();
    const theme = useTheme();
    const [translation1, setTranslation1] = useState<string>("Last updated :  2021-05-01");
    const [translation2, setTranslation2] = useState<string>("This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.\n\nWe use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.");
    const [translation3, setTranslation3] = useState<string>("Interpretation and Definitions");
    const [translation4, setTranslation4] = useState<string>("Interpretation");
    const [translation5, setTranslation5] = useState<string>("The words of which the initial letter is capitalized have meanings defined under the following conditions.\n\nThe following definitions shall have the same meaning regardless of whether they appear in singular or in plural.");
    const [translation6, setTranslation6] = useState<string>("Definitions");
    const [translation7, setTranslation7] = useState<string>("For the purposes of this Privacy Policy  : \n\nAccount means a unique account created for You to access our Service or parts of our Service.\n\nCompany (referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) refers to MyRecipeApp.\n\nCookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.");
    const [translation8, setTranslation8] = useState<string>("Country refers to  :  France");
    const [translation9, setTranslation9] = useState<string>("Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.\n\nPersonal Data is any information that relates to an identified or identifiable individual.");
    const [translation10, setTranslation10] = useState<string>("Service refers to the Website");
    const [translation11, setTranslation11] = useState<string>("Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.");
    const [translation15, setTranslation15] = useState<string>("Collecting and Using Your Personal Data");
    const [translation16, setTranslation16] = useState<string>("Types of Data Collected");
    const [translation17, setTranslation17] = useState<string>("Personal Data");
    const [translation18, setTranslation18] = useState<string>("While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to : \n\n- Email address\n\n- First name and last name");
    const [translation19, setTranslation19] = useState<string>("Usage Data");
    const [translation20, setTranslation20] = useState<string>("Usage Data is collected automatically when using the Service.\n\nUsage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.\n\nWhen You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.\n\nWe may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.");
    const [translation21, setTranslation21] = useState<string>("Tracking Technologies and Cookies");
    const [translation22, setTranslation22] = useState<string>("We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.\n\nYou can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.\n\nCookies can be \"Persistent\" or \"Session\" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.\n\nWe use both session and persistent Cookies for the purposes set out below : \n\n- Necessary / Essential Cookies\n\nType :  Session Cookies\n\nAdministered by :  Us\n\nPurpose :  These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.\n\n- Cookies Policy / Notice Acceptance Cookies\n\nType :  Persistent Cookies\n\nAdministered by :  Us\n\nPurpose :  These Cookies identify if users have accepted the use of cookies on the Website.\n\n- Functionality Cookies\n\nType :  Persistent Cookies\n\nAdministered by :  Us\n\nPurpose :  These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.\n\nFor more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.");
    const [translation23, setTranslation23] = useState<string>("Use of Your Personal Data");
    const [translation24, setTranslation24] = useState<string>("The Company may use Personal Data for the following purposes : \n\n- To provide and maintain our Service, including to monitor the usage of our Service.\n\n- To manage Your Account :  to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.\n\n- For the performance of a contract :  the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.\n\n- To contact You :  To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.\n\n- To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.\n\n- To manage Your requests :  To attend and manage Your requests to Us.\n\n- For other purposes :  We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.\n\n- We may share your personal information in the following situations : \n\n- With Service Providers :  We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.\n\n- For Business transfers :  We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.\n\n- With Affiliates :  We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.\n\n- With Business partners :  We may share Your information with Our business partners to offer You certain products, services or promotions.\n\n- With other users :  when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.\n\n- With Your consent :  We may disclose Your personal information for any other purpose with Your consent.");
    const [translation25, setTranslation25] = useState<string>("Retention of Your Personal Data");
    const [translation26, setTranslation26] = useState<string>("The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.\n\nThe Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.");
    const [translation27, setTranslation27] = useState<string>("Transfer of Your Personal Data");
    const [translation28, setTranslation28] = useState<string>("Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.\n\nYour consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.\n\nThe Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.");
    const [translation29, setTranslation29] = useState<string>("Disclosure of Your Personal Data");
    const [translation30, setTranslation30] = useState<string>("Business Transactions");
    const [translation31, setTranslation31] = useState<string>("Law enforcement");
    const [translation32, setTranslation32] = useState<string>("Other legal requirements");
    const [translation33, setTranslation33] = useState<string>("Security of Your Personal Data");
    const [translation34, setTranslation34] = useState<string>("The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.");
    const [translation35, setTranslation35] = useState<string>("Children's Privacy");
    const [translation36, setTranslation36] = useState<string>("Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.\n\nIf We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.");
    const [translation37, setTranslation37] = useState<string>("Links to Other Websites");
    const [translation38, setTranslation38] = useState<string>("Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.\n\nWe have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.");
    const [translation39, setTranslation39] = useState<string>("Changes to this Privacy Policy");
    const [translation40, setTranslation40] = useState<string>("We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.\n\nWe will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the \"Last updated\" date at the top of this Privacy Policy.\n\nYou are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.");
    const [translation41, setTranslation41] = useState<string>("Contact Us");
    const [translation42, setTranslation42] = useState<string>("If you have any questions about this Privacy Policy, You can contact us :\n\n- By email : myrecipeappcontact@gmail.com\n\n");
    const [translation43, setTranslation43] = useState<string>("This document was last updated on May 25, 2020");
    const [translation44, setTranslation44] = useState<string>("Privacy Policy created with GetTerms.");
    const [translation45, setTranslation45] = useState<string>("If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.");
    const [translation46, setTranslation46] = useState<string>("Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).");
    const [translation47, setTranslation47] = useState<string>("The Company may disclose Your Personal Data in the good faith belief that such action is necessary to : \n\n- Comply with a legal obligation\n\n- Protect and defend the rights or property of the Company\n\n- Prevent or investigate possible wrongdoing in connection with the Service\n\n- Protect the personal safety of Users of the Service or the public\n\n- Protect against legal liability.");


    useEffect(() => {
        const fetchTranslation = async () => {
            if (language != 'EN-US') {
                try {
                    const elementsTranslated = await translationFunc([translation1, translation2, translation3,translation4, translation5, translation6, translation7, translation8, translation9, translation10, translation11, translation15, translation16, translation17,translation18, translation19, translation20, translation21, translation22, translation23, translation24, translation25, translation26, translation27, translation28, translation29, translation30, translation31, translation32, translation33, translation34, translation35, translation36, translation37, translation38, translation39, translation40, translation41, translation42, translation43, translation44, translation45, translation46, translation47]);
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
                    setTranslation15(elementsTranslated[11]);
                    setTranslation16(elementsTranslated[12]);
                    setTranslation17(elementsTranslated[13]);
                    setTranslation18(elementsTranslated[14]);
                    setTranslation19(elementsTranslated[15]);
                    setTranslation20(elementsTranslated[16]);
                    setTranslation21(elementsTranslated[17]);
                    setTranslation22(elementsTranslated[18]);
                    setTranslation23(elementsTranslated[19]);
                    setTranslation24(elementsTranslated[20]);
                    setTranslation25(elementsTranslated[21]);
                    setTranslation26(elementsTranslated[22]);
                    setTranslation27(elementsTranslated[23]);
                    setTranslation28(elementsTranslated[24]);
                    setTranslation29(elementsTranslated[25]);
                    setTranslation30(elementsTranslated[26]);
                    setTranslation31(elementsTranslated[27]);
                    setTranslation32(elementsTranslated[28]);
                    setTranslation33(elementsTranslated[29]);
                    setTranslation34(elementsTranslated[30]);
                    setTranslation35(elementsTranslated[31]);
                    setTranslation36(elementsTranslated[32]);
                    setTranslation37(elementsTranslated[33]);
                    setTranslation38(elementsTranslated[34]);
                    setTranslation39(elementsTranslated[35]);
                    setTranslation40(elementsTranslated[36]);
                    setTranslation41(elementsTranslated[37]);
                    setTranslation42(elementsTranslated[38]);
                    setTranslation43(elementsTranslated[39]);
                    setTranslation44(elementsTranslated[40]);
                    setTranslation45(elementsTranslated[41]);
                    setTranslation46(elementsTranslated[42]);
                    setTranslation47(elementsTranslated[43]);
                } catch (error) {
                    console.error('Erreur de traduction PrivacyPolicy:', error);
                }
            } else {
                setTranslation1("Last updated :  2021-05-01");
                setTranslation2("This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.\n\nWe use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.");
                setTranslation3("Interpretation and Definitions");
                setTranslation4("Interpretation");
                setTranslation5("The words of which the initial letter is capitalized have meanings defined under the following conditions.\n\nThe following definitions shall have the same meaning regardless of whether they appear in singular or in plural.");
                setTranslation6("Definitions");
                setTranslation7("For the purposes of this Privacy Policy  : \n\nAccount means a unique account created for You to access our Service or parts of our Service.\n\nCompany (referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) refers to MyRecipeApp.\n\nCookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.");
                setTranslation8("Country refers to  :  France");
                setTranslation9("Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.\n\nPersonal Data is any information that relates to an identified or identifiable individual.");
                setTranslation10("Service refers to the Website");
                setTranslation11("Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.");
                setTranslation15("Use of Your Personal Data");
                setTranslation16("Types of Data Collected");
                setTranslation17("Personal Data");
                setTranslation18("While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to : \n\n- Email address\n\n- First name and last name");
                setTranslation19("Usage Data");
                setTranslation20("Usage Data is collected automatically when using the Service.\n\nUsage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.\n\nWhen You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.\n\nWe may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.");
                setTranslation21("Tracking Technologies and Cookies");
                setTranslation22("We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.\n\nYou can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.\n\nCookies can be \"Persistent\" or \"Session\" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.\n\nWe use both session and persistent Cookies for the purposes set out below : \n\n- Necessary / Essential Cookies\n\nType :  Session Cookies\n\nAdministered by :  Us\n\nPurpose :  These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.\n\n- Cookies Policy / Notice Acceptance Cookies\n\nType :  Persistent Cookies\n\nAdministered by :  Us\n\nPurpose :  These Cookies identify if users have accepted the use of cookies on the Website.\n\n- Functionality Cookies\n\nType :  Persistent Cookies\n\nAdministered by :  Us\n\nPurpose :  These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.\n\nFor more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.");
                setTranslation23("Use of Your Personal Data");
                setTranslation24("The Company may use Personal Data for the following purposes : \n\n- To provide and maintain our Service, including to monitor the usage of our Service.\n\n- To manage Your Account :  to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.\n\n- For the performance of a contract :  the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.\n\n- To contact You :  To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.\n\n- To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.\n\n- To manage Your requests :  To attend and manage Your requests to Us.\n\n- For other purposes :  We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.\n\n- We may share your personal information in the following situations : \n\n- With Service Providers :  We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.\n\n- For Business transfers :  We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.\n\n- With Affiliates :  We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.\n\n- With Business partners :  We may share Your information with Our business partners to offer You certain products, services or promotions.\n\n- With other users :  when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.\n\n- With Your consent :  We may disclose Your personal information for any other purpose with Your consent.");
                setTranslation25("Retention of Your Personal Data");
                setTranslation26("The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.\n\nThe Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.");
                setTranslation27("Transfer of Your Personal Data");
                setTranslation28("Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.\n\nYour consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.\n\nThe Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.");
                setTranslation29("Disclosure of Your Personal Data");
                setTranslation30("Business Transactions\n\nIf the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.");
                setTranslation31("Law enforcement\n\nUnder certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).");
                setTranslation32("Other legal requirements\n\nThe Company may disclose Your Personal Data in the good faith belief that such action is necessary to : \n\n- Comply with a legal obligation\n\n- Protect and defend the rights or property of the Company\n\n- Prevent or investigate possible wrongdoing in connection with the Service\n\n- Protect the personal safety of Users of the Service or the public\n\n- Protect against legal liability");
                setTranslation33("Security of Your Personal Data");
                setTranslation34("The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.");
                setTranslation35("Children's Privacy");
                setTranslation36("Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.\n\nIf We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.");
                setTranslation37("Links to Other Websites");
                setTranslation38("Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.\n\nWe have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.");
                setTranslation39("Changes to this Privacy Policy");
                setTranslation40("We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.\n\nWe will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the \"Last updated\" date at the top of this Privacy Policy.\n\nYou are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.");
                setTranslation41("Contact Us");
                setTranslation42("If you have any questions about this Privacy Policy, You can contact us : \n\n- By email : myrecipeappcontact@gmail.com");
                setTranslation43("This document was last updated on May 25, 2020");
                setTranslation44("Privacy Policy created with GetTerms.");
                setTranslation45("If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.");
                setTranslation46("Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).");
                setTranslation47("The Company may disclose Your Personal Data in the good faith belief that such action is necessary to : \n\n- Comply with a legal obligation\n\n- Protect and defend the rights or property of the Company\n\n- Prevent or investigate possible wrongdoing in connection with the Service\n\n- Protect the personal safety of Users of the Service or the public\n\n- Protect against legal liability");
            }
        }
        fetchTranslation();
    }, [language]);


    return (
        <View style={[styles.container, general.container, {backgroundColor :  isRegisterPage ? "#f2f2f2" : colors.background}]}>
            {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" />  :  <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
               <ScrollView>
                   <View style={{margin :  10}}>
                     <Text style={[styles.text, {fontStyle : 'italic', color :  colors.text}]}>{translation1}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>{translation2}
                     </Text>
                     <Text style={[styles.textTitle, {color :  colors.text}]}>{translation3}</Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation4}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>{translation5}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation6}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation7}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation8}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation9}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation10}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation11}
                     </Text>
                     <Text style={[styles.textTitle, {color :  colors.text}]}>{translation15}</Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation16}</Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation17}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation18}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation19}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation20}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation21}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation22}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation23}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation24}
                     </Text>

                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation25}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation26}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation27}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation28}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation29}</Text>
                     <Text style={styles.textSub}>{translation30}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>{translation45}</Text>
                     <Text style={styles.textSub}>{translation31}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>{translation46}</Text>
                     <Text style={styles.textSub}>{translation32}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation47}

                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation33}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>{translation34}</Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation35}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation36}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation37}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation38}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation39}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation40}
                     </Text>
                     <Text style={[styles.textSubTitle, {color :  colors.text}]}>{translation41}</Text>
                     <Text style={[styles.text, {color :  colors.text}]}>
                         {translation42}
                     </Text>
                     <Text style={[styles.text, {fontStyle : 'italic', color :  colors.text}]}>{translation43}</Text>
                     <Text style={[styles.text, {fontStyle : 'italic', color :  colors.text}]}>{translation44}</Text>
                </View>
               </ScrollView>
        </View>

    )
}

export default PrivacyPolicy;