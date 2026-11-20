import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { openInstagramBrowser, closeInstagramBrowser } from '../../services/api';

import styles from './ConnectInstagramScreen.styles';

export default function ConnectInstagramScreen() {
  const [loading, setLoading] = useState(false);
  const [browserStatus, setBrowserStatus] = useState('Closed');

  const handleOpenBrowser = async () => {
    try {
      setLoading(true);

      const result = await openInstagramBrowser();

      setBrowserStatus('Open');
      Alert.alert('Success', result.status);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseBrowser = async () => {
    try {
      setLoading(true);

      const result = await closeInstagramBrowser();

      setBrowserStatus('Closed');
      Alert.alert('Success', result.status);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instagram Browser</Text>

      <Text style={styles.status}>Browser Status: {browserStatus}</Text>

      <TouchableOpacity style={styles.button} onPress={handleOpenBrowser} disabled={loading}>
        <Text style={styles.buttonText}>Open Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={handleCloseBrowser} disabled={loading}>
        <Text style={styles.buttonText}>Close Instagram</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}
