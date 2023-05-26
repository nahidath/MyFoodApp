import styles from "../stylesheets/Login_stylesheet";
import {ScrollView, Text, TouchableHighlight, View} from "react-native";
import React, {Dispatch, SetStateAction} from "react";


interface TOUMProps {
    setModalVisible :  Dispatch<SetStateAction<boolean>>;
    modalVisible :  boolean;
}

const TermsOfUseModal = ({setModalVisible, modalVisible} : TOUMProps) => {
    return(
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Terms and Conditions</Text>
                <ScrollView>
                    <View style={{margin :  10}}>
                        <Text style={styles.title1}>1. Terms</Text>
                        <Text style={{color : "#041721"}}>
                            By accessing the application, you are agreeing to be bound by these terms of service, all
                            applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                            If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials
                            contained in this website are protected by applicable copyright and trademark law.
                        </Text>
                        <Text style={styles.title1}>2. Use License</Text>
                        <Text style={{color : "#041721"}}>
                            Permission is granted to temporarily download one copy of the materials (information or software) on
                            RecipeApp's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                            transfer of title, and under this license you may not : 
                            {"\n\n"}
                            - modify or copy the materials;{"\n"}
                            - use the materials for any commercial purpose, or for any public display (commercial or non-commercial);{"\n"}
                            - attempt to decompile or reverse engineer any software contained on RecipeApp's application;{"\n"}
                            - remove any copyright or other proprietary notations from the materials;{"\n"}
                            - or transfer the materials to another person or "mirror" the materials on any other server.
                            {"\n\n"}
                            This license shall automatically terminate if you violate any of these restrictions and may be terminated by
                            RecipeApp at any time. Upon terminating your viewing of these materials or upon the termination of this license,
                            you must destroy any downloaded materials in your possession whether in electronic or printed format.
                        </Text>
                        <Text style={styles.title1}>3. Disclaimer</Text>
                        <Text style={{color : "#041721"}}>
                            The materials on RecipeApp's website are provided on an 'as is' basis. RecipeApp makes no warranties, expressed or
                            implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or
                            conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or
                            other violation of rights.
                            {"\n\n"}
                            Further, RecipeApp does not warrant or make any representations concerning the accuracy, likely results, or
                            reliability of the use of the materials on its website or otherwise relating to such materials or on any sites
                            linked to this site.
                        </Text>
                        <Text style={styles.title1}>4. Limitations</Text>
                        <Text style={{color : "#041721"}}>
                            In no event shall RecipeApp or its suppliers be liable for any damages (including, without limitation, damages for
                            loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials
                            on RecipeApp's website, even if RecipeApp or a RecipeApp authorized representative has been notified orally or in
                            writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied
                            warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to
                            you.
                        </Text>
                        <Text style={styles.title1}>5. Accuracy of materials</Text>
                        <Text style={{color : "#041721"}}>
                            The materials appearing on RecipeApp's website could include technical, typographical, or photographic errors.
                            RecipeApp does not warrant that any of the materials on its website are accurate, complete or current. RecipeApp
                            may make changes to the materials contained on its website at any time without notice. However RecipeApp does not
                            make any commitment to update the materials.
                        </Text>
                        <Text style={styles.title1}>6. Links</Text>
                        <Text style={{color : "#041721"}}>
                            RecipeApp has not reviewed all of the sites linked to its website and is not responsible for the contents of any
                            such linked site. The inclusion of any link does not imply endorsement by RecipeApp of the site. Use of any such
                            linked website is at the user's own risk.
                        </Text>
                        <Text style={styles.title1}>7. Modifications</Text>
                        <Text style={{color : "#041721"}}>
                            RecipeApp may revise these terms of service for its website at any time without notice. By using this website you
                            are agreeing to be bound by the then current version of these terms of service.
                        </Text>
                        <Text style={styles.title1}>8. Governing Law</Text>
                        <Text style={{color : "#041721"}}>
                            These terms and conditions are governed by and construed in accordance with the laws of United States and you
                            irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </Text>
                    </View>
                </ScrollView>
                <TouchableHighlight
                    style={styles.closeButton}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default TermsOfUseModal;