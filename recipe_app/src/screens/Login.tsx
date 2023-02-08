import React, {useEffect, useState} from "react";
import {Link, useTheme} from "@react-navigation/native";
import {colors} from "react-native-elements";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import FocusAwareStatusBar from "../components/StatusBarStyle";
import styles from "../stylesheets/Login_stylesheet";
import general from "../stylesheets/General_stylesheet";


class User {
    email: string;
    uid: string;
    constructor(email: string, uid: string) {
        this.email = email;
        this.uid = uid;
    }
}

const Login = () => {

      const [email, setEmail] = useState('');

      const [password, setPassword] = useState('');

      // const [error, setError] = useState('');
      //
      // const [loading, setLoading] = useState(false);
      //
      // const [loggedIn, setLoggedIn] = useState(false);
      //
      // const [user, setUser] = useState<User | null>(null);
      //
      // const history = useHistory();

    // function useAuth() {
    //     const [authUser, setAuthUser] = useState(null);
    //     useEffect(() => {
    //         let auth = firebase.auth();
    //         const unsubscribe = auth.onAuthStateChanged(user => {
    //             if (user) {
    //                 setAuthUser(user);
    //             } else {
    //                 setAuthUser(null);
    //             }
    //         });
    //         return () => unsubscribe();
    //     }, []);
    //     return authUser;
    // }
    //
    // const { currentUser } = useAuth();
    //
    //   useEffect(() => {
    //
    //  if (currentUser) {
    //
    //     setLoggedIn(true);
    //
    //     setUser(currentUser);
    //
    //  }
    //
    //   }, [currentUser]);
    //
    //   const handleSubmit = async (e: React.FormEvent) => {
    //
    //  e.preventDefault();
    //
    //  try {
    //
    //     setError('');
    //
    //     setLoading(true);
    //
    //     await login(email, password);
    //
    //     history.push('/');
    //
    //  } catch (err) {
    //
    //     setError('Failed to log in');
    //
    //  }
    //
    //  setLoading(false);
    //
    //   };
    const {colors} = useTheme();
    const theme = useTheme();
    const colorSpec = theme.dark ? '#252525' : '#041721';


    return (

     // <div>
     //
     //    <h2>Login</h2>
     //
     //    {error && <p>{error}</p>}
     //
     //    {loading && <p>Loading...</p>}
     //
     //    {loggedIn && (
     //
     //      <p>
     //
     //         You are logged in as {user?.email}.
     //
     //         <Link to="/">Go to home page</Link>
     //
     //      </p>
     //
     //    )}
     //
     //    <form onSubmit={handleSubmit}>
     //
     //      <label htmlFor="email">Email</label>
     //
     //      <input
     //
     //         type="email"
     //
     //         id="email"
     //
     //         value={email}
     //
     //         onChange={(e) => setEmail(e.target.value)}
     //
     //      />
     //
     //      <label htmlFor="password">Password</label>
     //
     //      <input
     //
     //         type="password"
     //
     //         id="password"
     //
     //         value={password}
     //
     //         onChange={(e) => setPassword(e.target.value)}
     //
     //      />
     //
     //      <button type="submit">Login</button>
     //
     //    </form>
     //
     // </div>

          <View style={[styles.container, general.container, {backgroundColor: colors.background}]}>
              {theme.dark ? <FocusAwareStatusBar barStyle="light-content" backgroundColor="#252525" /> : <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fefefe" />}
                <View style={styles.header}>
                    <Text style={[styles.headerText, {color: colors.text}]}>Login</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                        placeholder="Email"
                        placeholderTextColor={colors.text}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        style={[styles.input,  {borderColor: colors.border, color: colors.text}]}
                        placeholder="Password"
                        placeholderTextColor={colors.text}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colorSpec, borderColor: colors.border}]}
                                      // onPress={() => handleSubmit()}
                    >
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, {color: colors.text}]}>Don't have an account? <Link to="/register">Register</Link></Text>
                </View>
            </View>


      );

};