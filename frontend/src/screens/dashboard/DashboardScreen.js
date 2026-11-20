import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from './DashboardScreen.styles';
import { checkBackend } from '../../services/api';

export default function DashboardScreen({ navigation: navigationProp }) {
  const navigationHook = useNavigation();
  const navigation = navigationProp || navigationHook;

  const [menuVisible, setMenuVisible] = useState(false);
  const [backendStatus, setBackendStatus] = useState('Checking...');

  // Check backend connection when dashboard opens
  useEffect(() => {
    let isMounted = true;

    const testBackend = async () => {
      try {
        const data = await checkBackend();

        if (isMounted) {
          setBackendStatus(data.status === 'success' ? 'Connected' : 'Unexpected response');
        }
      } catch (error) {
        if (isMounted) {
          setBackendStatus('Disconnected');
        }
      }
    };

    testBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  const showComingSoon = (feature) => {
    Alert.alert(feature, 'This feature will be connected during the next development stages.');
  };

  const connectInstagram = () => {
    navigation.navigate('ConnectInstagram');
  };

  const managementItems = [
    {
      title: 'Content Publishing',
      description: 'Create and schedule posts'
    },
    {
      title: 'Audience Analysis',
      description: 'Analyze available profiles'
    },
    {
      title: 'Contact Intelligence',
      description: 'Organize public contact details'
    },
    {
      title: 'Messages & Follow-ups',
      description: 'Manage personalized messages'
    },
    {
      title: 'Schedule & Preferences',
      description: 'Configure agent activity'
    },
    {
      title: 'Activity History',
      description: 'Review agent activities'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>InstaGPT</Text>
            <Text style={styles.tagline}>Your Instagram AI Assistant</Text>
          </View>

          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => setMenuVisible(!menuVisible)}
            >
              <Text style={styles.profileInitial}>U</Text>
            </TouchableOpacity>

            {menuVisible && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setMenuVisible(false);
                    showComingSoon('Settings');
                  }}
                >
                  <Text style={styles.dropdownText}>Settings</Text>
                </TouchableOpacity>

                <View style={styles.dropdownDivider} />

                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setMenuVisible(false);

                    if (navigation?.reset) {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }]
                      });
                    } else if (navigation?.replace) {
                      navigation.replace('Login');
                    } else if (navigation?.navigate) {
                      navigation.navigate('Login');
                    }
                  }}
                >
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Dashboard</Text>
          <Text style={styles.welcomeSubtitle}>Welcome back! Here's your agent overview.</Text>
        </View>

        {/* Backend Connection */}
        <Text style={styles.cardDescription}>Backend Status: {backendStatus}</Text>

        {/* Instagram Connection */}
        <View style={styles.accountCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Instagram Account</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Not Connected</Text>
            </View>
          </View>

          <Text style={styles.cardDescription}>
            Connect your Instagram Professional account to get started.
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={connectInstagram}>
            <Text style={styles.primaryButtonText}>Connect Instagram</Text>
          </TouchableOpacity>
        </View>

        {/* Agent Status */}
        <View style={styles.agentCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>AI Agent Status</Text>

            <View style={styles.pausedBadge}>
              <Text style={styles.pausedText}>Paused</Text>
            </View>
          </View>

          <Text style={styles.cardDescription}>
            Your agent is currently inactive. Connect Instagram before activating it.
          </Text>

          <TouchableOpacity style={styles.disabledButton} disabled={true}>
            <Text style={styles.disabledButtonText}>Activate Agent</Text>
          </TouchableOpacity>
        </View>

        {/* Overview */}
        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.purpleText]}>0</Text>
            <Text style={styles.statLabel}>Published</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.pinkText]}>0</Text>
            <Text style={styles.statLabel}>Analyzed</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.orangeText]}>0</Text>
            <Text style={styles.statLabel}>Drafts</Text>
          </View>
        </View>

        {/* Management */}
        <Text style={styles.sectionTitle}>Management</Text>

        <View style={styles.managementContainer}>
          {managementItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.managementCard}
              onPress={() => showComingSoon(item.title)}
              activeOpacity={0.7}
            >
              <Text style={styles.managementTitle}>{item.title}</Text>

              <Text style={styles.managementDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>InstaGPT · AI-powered Instagram management</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
