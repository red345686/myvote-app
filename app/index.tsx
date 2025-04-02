import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';

export default function Home() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [voterStatus, setVoterStatus] = useState<'verified' | 'pending'>('verified');
  const [upcomingElections, setUpcomingElections] = useState([
    {
      id: '1',
      title: 'National Presidential Election',
      date: 'November 5, 2024',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Local City Council',
      date: 'August 15, 2024',
      status: 'upcoming',
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data from blockchain
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MyVote</Text>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Voter Status Card */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.statusCard}
        >
          <View style={styles.statusIconContainer}>
            <Ionicons 
              name={voterStatus === 'verified' ? "checkmark-circle" : "time"} 
              size={32} 
              color={voterStatus === 'verified' ? "#4CAF50" : "#FF9800"} 
            />
          </View>
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Voter Status</Text>
            <Text style={[
              styles.statusValue,
              {color: voterStatus === 'verified' ? "#4CAF50" : "#FF9800"}
            ]}>
              {voterStatus === 'verified' ? 'Verified' : 'Pending Verification'}
            </Text>
            <Text style={styles.statusDescription}>
              {voterStatus === 'verified' 
                ? 'Your identity has been verified on the blockchain.' 
                : 'Your verification is being processed by admin.'}
            </Text>
          </View>
        </Animated.View>

        {/* Blockchain ID Card */}
        <Animated.View 
          entering={FadeInUp.delay(300).duration(800)}
          style={styles.voterIdCard}
        >
          <View style={styles.voterIdHeader}>
            <Text style={styles.voterIdTitle}>Blockchain Voter ID</Text>
            <Ionicons name="shield-checkmark" size={24} color="#fff" />
          </View>
          <View style={styles.voterIdContent}>
            <Text style={styles.voterIdLabel}>ID Hash</Text>
            <Text style={styles.voterIdValue}>0x7fB2...3A95</Text>
            
            <Text style={styles.voterIdLabel}>Registration Date</Text>
            <Text style={styles.voterIdValue}>June 12, 2024</Text>
            
            <View style={styles.qrPlaceholder}>
              <Ionicons name="qr-code" size={80} color="#ddd" />
            </View>
            
            <Text style={styles.voterIdNote}>
              This ID is securely stored on the blockchain and cannot be tampered with.
            </Text>
          </View>
        </Animated.View>

        {/* Upcoming Elections Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Elections</Text>
        </View>
        
        {upcomingElections.map((election, index) => (
          <Animated.View 
            key={election.id}
            entering={FadeInRight.delay(400 + (index * 100)).duration(800)}
            style={styles.electionCard}
          >
            <View style={styles.electionDetails}>
              <Text style={styles.electionTitle}>{election.title}</Text>
              <Text style={styles.electionDate}>
                <Ionicons name="calendar-outline" size={14} color={Colors.light.tint} /> {' '}
                {election.date}
              </Text>
              <View style={styles.electionStatusBadge}>
                <Text style={styles.electionStatusText}>Upcoming</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.electionButton}>
              <Text style={styles.electionButtonText}>View Details</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Resources Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Voter Resources</Text>
        </View>
        
        <View style={styles.resourcesGrid}>
          <TouchableOpacity style={styles.resourceCard}>
            <Ionicons name="help-circle" size={32} color={Colors.light.tint} />
            <Text style={styles.resourceTitle}>FAQ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceCard}>
            <Ionicons name="document-text" size={32} color={Colors.light.tint} />
            <Text style={styles.resourceTitle}>Guidelines</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceCard}>
            <Ionicons name="call" size={32} color={Colors.light.tint} />
            <Text style={styles.resourceTitle}>Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceCard}>
            <Ionicons name="location" size={32} color={Colors.light.tint} />
            <Text style={styles.resourceTitle}>Poll Locations</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: Colors.light.tint,
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  voterIdCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  voterIdHeader: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voterIdTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  voterIdContent: {
    padding: 16,
  },
  voterIdLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  voterIdValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  qrPlaceholder: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  voterIdNote: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  electionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  electionDetails: {
    flex: 1,
  },
  electionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  electionDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  electionStatusBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  electionStatusText: {
    fontSize: 12,
    color: Colors.light.tint,
    fontWeight: '600',
  },
  electionButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  electionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  resourceCard: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resourceTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
}); 