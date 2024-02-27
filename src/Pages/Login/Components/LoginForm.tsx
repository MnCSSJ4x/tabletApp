// LoginForm.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../../../../colors';
import {useNavigation} from '@react-navigation/native';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Basic form validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Replace with your actual API call
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),
    // });

    // if (response.ok) {
    //   const data = await response.json();
    //   // Handle successful login
    //   setError('');
    // //   onSuccessfulLogin(); // Invoke the callback for successful login
    // } else {
    //   // Handle login failure (e.g., display error message)
    //   setError('Invalid username or password. Please try again.');
    // }
    navigation.navigate('Home'); // Use the name of your home page screen
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
