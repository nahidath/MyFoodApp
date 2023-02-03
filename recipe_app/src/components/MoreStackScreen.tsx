import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MoreStackList} from "../types";
import NotificationSettings from "../screens/NotificationSettings";
import DisplaySettings from "../screens/DisplaySettings";
// import LanguageSettings from "../screens/LanguageSettings";
// import PrivacyPolicy from "../screens/PrivacyPolicy";
// import TermsOfUse from "../screens/TermsOfUse";
// import Contact from "../screens/Contact";
// import Faq from "../screens/Faq";
import More from "../screens/More";
const MoreStack = createNativeStackNavigator<MoreStackList>();
export default function MoreStackScreen () {
    return (
        <MoreStack.Navigator >
            <MoreStack.Screen name="MorePage" component={More} options={{
                headerTitle: 'More',
                headerStyle: {
                    backgroundColor: '#fefefe',
                },
                headerTintColor: '#041721',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                // headerShown: false,
            }}  />
            <MoreStack.Screen name="NotificationSettings" component={NotificationSettings} options={{
                headerTitle: 'Notifications Settings',
                headerStyle: {
                    backgroundColor: '#fefefe',
                },
                headerTintColor: '#041721',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShadowVisible: false,
            }}  />
            <MoreStack.Screen name="DisplaySettings" component={DisplaySettings} options={{
                headerTitle: 'Display Settings',
                headerStyle: {
                    backgroundColor: '#fefefe',
                },
                headerTintColor: '#041721',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            {/*<MoreStack.Screen name="LanguageSettings" component={LanguageSettings}  options={{*/}
            {/*    headerTitle: 'Language',*/}
            {/*    headerStyle: {*/}
            {/*        backgroundColor: '#fefefe',*/}
            {/*    },*/}
            {/*    headerTintColor: '#041721',*/}
            {/*    headerTitleStyle: {*/}
            {/*        fontWeight: 'bold',*/}
            {/*    },*/}
            {/*}} />*/}
            {/*<MoreStack.Screen name="Faq" component={Faq} options={{*/}
            {/*    headerTitle: 'FAQ',*/}
            {/*    headerStyle: {*/}
            {/*        backgroundColor: '#fefefe',*/}
            {/*    },*/}
            {/*    headerTintColor: '#041721',*/}
            {/*    headerTitleStyle: {*/}
            {/*        fontWeight: 'bold',*/}
            {/*    },*/}

            {/*}} />*/}
            {/*<MoreStack.Screen name="Contact" component={Contact} options={{*/}
            {/*    headerTitle: 'Contact',*/}
            {/*    headerStyle: {*/}
            {/*        backgroundColor: '#fefefe',*/}
            {/*    },*/}
            {/*    headerTintColor: '#041721',*/}
            {/*    headerTitleStyle: {*/}
            {/*        fontWeight: 'bold',*/}
            {/*    },*/}

            {/*}} />*/}
            {/*<MoreStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{*/}
            {/*    headerTitle: 'Privacy Policy',*/}
            {/*    headerStyle: {*/}
            {/*        backgroundColor: '#fefefe',*/}
            {/*    },*/}
            {/*    headerTintColor: '#041721',*/}
            {/*    headerTitleStyle: {*/}
            {/*        fontWeight: 'bold',*/}
            {/*    },*/}
            {/*}} />*/}
            {/*<MoreStack.Screen name="TermsOfUse" component={TermsOfUse} options={{*/}
            {/*    headerTitle: 'Terms of Use',*/}
            {/*    headerStyle: {*/}
            {/*        backgroundColor: '#fefefe',*/}
            {/*    },*/}
            {/*    headerTintColor: '#041721',*/}
            {/*    headerTitleStyle: {*/}
            {/*        fontWeight: 'bold',*/}
            {/*    },*/}
            {/*}} />*/}
        </MoreStack.Navigator>
    )
}