// LoginForm.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {authState} from '../../../Auth/atom';
import colors from '../../../../colors';
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../../../../routes';
import axios from 'axios';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [auth, setAuth] = useRecoilState(authState);

  const handleSubmit = async () => {
    // Basic form validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post(LOGIN, {
        uuid: username,
        password: password,
      });

      if (response.status === 200) {
        const {token} = response.data;
        setAuth({token});
        navigation.navigate('Home');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleForgotPassword = () => {
    // navigation.navigate('ForgotPassword'); // Use the name of your forgot password page screen
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.forgotPasswordLink}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text01,
  },
  errorText: {
    color: colors.textError,
    marginBottom: 16,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: colors.ui04,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.interactive01,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.ui02,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    marginTop: 16,
  },
});

export default LoginForm;
