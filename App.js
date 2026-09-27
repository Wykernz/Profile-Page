import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import profileImage from './assets/Kezess.png';

export default function App() {
  // Profile state
  const [name, setName] = useState('Renz General');
  const [role, setRole] = useState('Tambay laak Sir');
  const [location, setLocation] = useState('Brgy. Cautod Sta. Margarita Samar, Philippines');
  const [bio, setBio] = useState(
    'Passionate about building clean, user-friendly mobile apps with React Native. Coffee-driven. 🚀'
  );

  // Social state
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1280);

  // Modal state
  const [activeModal, setActiveModal] = useState(null);
  // Possible values: null | 'message' | 'editProfile' | 'notifications' | 'privacy' | 'help' | 'logout'

  // Message modal state
  const [message, setMessage] = useState('');

  // Edit profile temp state
  const [tempName, setTempName] = useState(name);
  const [tempRole, setTempRole] = useState(role);
  const [tempLocation, setTempLocation] = useState(location);
  const [tempBio, setTempBio] = useState(bio);

  // Notification toggles
  const [notifLikes, setNotifLikes] = useState(true);
  const [notifComments, setNotifComments] = useState(true);
  const [notifFollows, setNotifFollows] = useState(true);
  const [notifMessages, setNotifMessages] = useState(false);

  // Privacy toggles
  const [privateAccount, setPrivateAccount] = useState(false);
  const [showActivity, setShowActivity] = useState(true);

  const skills = ['React Native', 'JavaScript', 'UI/UX', 'Firebase', 'Expo'];

  const menuItems = [
    { id: '1', icon: '✏️', label: 'Edit Profile', modal: 'editProfile' },
    { id: '2', icon: '🔔', label: 'Notifications', modal: 'notifications' },
    { id: '3', icon: '🔒', label: 'Privacy & Security', modal: 'privacy' },
    { id: '4', icon: '❓', label: 'Help & Support', modal: 'help' },
    { id: '5', icon: '🚪', label: 'Log Out', modal: 'logout' },
  ];

  // ============== Handlers ==============

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount(followerCount - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount(followerCount + 1);
    }
  };

  const openMessage = () => {
    setMessage('');
    setActiveModal('message');
  };

  const sendMessage = () => {
    if (message.trim() === '') {
      Alert.alert('Empty message', 'Please type something first.');
      return;
    }
    setActiveModal(null);
    Alert.alert('Message Sent ✅', `To: ${name}\n\n"${message}"`);
    setMessage('');
  };

  // Open Edit Profile with current values loaded
  const openEditProfile = () => {
    setTempName(name);
    setTempRole(role);
    setTempLocation(location);
    setTempBio(bio);
    setActiveModal('editProfile');
  };

  const saveProfile = () => {
    if (tempName.trim() === '') {
      Alert.alert('Missing name', 'Name cannot be empty.');
      return;
    }
    setName(tempName);
    setRole(tempRole);
    setLocation(tempLocation);
    setBio(tempBio);
    setActiveModal(null);
    Alert.alert('Profile Updated ✅', 'Your profile has been saved.');
  };

  const handleMenuPress = (item) => {
    if (item.modal === 'editProfile') openEditProfile();
    else if (item.modal === 'logout') confirmLogout();
    else setActiveModal(item.modal);
  };

  const confirmLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () =>
          Alert.alert('Logged Out', 'You have been logged out. (Demo only)'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Banner */}
        <View style={styles.banner}>
          <View style={styles.avatarWrapper}>
            <Image source={profileImage} style={styles.avatar} />
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
          <Text style={styles.location}>📍 {location}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {followerCount.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>315</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollow}
            >
              <Text style={styles.primaryButtonText}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={openMessage}
            >
              <Text style={styles.secondaryButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>

        {/* Skills Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={() => handleMenuPress(item)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.menuLabel,
                  item.label === 'Log Out' && styles.logoutText,
                ]}
              >
                {item.label}
              </Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footerText}>v1.0.0 · Made with React Native</Text>
      </ScrollView>

      {/* ========== MESSAGE MODAL ========== */}
      <Modal
        visible={activeModal === 'message'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Send Message</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recipientRow}>
              <Image source={profileImage} style={styles.recipientAvatar} />
              <View>
                <Text style={styles.recipientLabel}>To</Text>
                <Text style={styles.recipientName}>{name}</Text>
              </View>
            </View>

            <TextInput
              style={styles.messageInput}
              placeholder="Type your message here..."
              placeholderTextColor="#a0aec0"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoFocus
            />

            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ========== EDIT PROFILE MODAL ========== */}
      <Modal
        visible={activeModal === 'editProfile'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={styles.fieldInput}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Your name"
              />

              <Text style={styles.fieldLabel}>Role</Text>
              <TextInput
                style={styles.fieldInput}
                value={tempRole}
                onChangeText={setTempRole}
                placeholder="Your role"
              />

              <Text style={styles.fieldLabel}>Location</Text>
              <TextInput
                style={styles.fieldInput}
                value={tempLocation}
                onChangeText={setTempLocation}
                placeholder="Your location"
              />

              <Text style={styles.fieldLabel}>Bio</Text>
              <TextInput
                style={[styles.fieldInput, styles.bioInput]}
                value={tempBio}
                onChangeText={setTempBio}
                placeholder="Tell us about yourself"
                multiline
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.sendButton} onPress={saveProfile}>
                <Text style={styles.sendButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ========== NOTIFICATIONS MODAL ========== */}
      <Modal
        visible={activeModal === 'notifications'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Likes</Text>
              <Switch value={notifLikes} onValueChange={setNotifLikes} />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Comments</Text>
              <Switch value={notifComments} onValueChange={setNotifComments} />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>New Followers</Text>
              <Switch value={notifFollows} onValueChange={setNotifFollows} />
            </View>
            <View style={[styles.switchRow, styles.switchRowLast]}>
              <Text style={styles.switchLabel}>Direct Messages</Text>
              <Switch value={notifMessages} onValueChange={setNotifMessages} />
            </View>

            <TouchableOpacity
              style={[styles.sendButton, { marginTop: 16 }]}
              onPress={() => {
                setActiveModal(null);
                Alert.alert('Saved ✅', 'Notification preferences updated.');
              }}
            >
              <Text style={styles.sendButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ========== PRIVACY MODAL ========== */}
      <Modal
        visible={activeModal === 'privacy'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Privacy & Security</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Private Account</Text>
              <Switch
                value={privateAccount}
                onValueChange={setPrivateAccount}
              />
            </View>
            <View style={[styles.switchRow, styles.switchRowLast]}>
              <Text style={styles.switchLabel}>Show Activity Status</Text>
              <Switch value={showActivity} onValueChange={setShowActivity} />
            </View>

            <TouchableOpacity
              style={[styles.sendButton, { marginTop: 16 }]}
              onPress={() => {
                setActiveModal(null);
                Alert.alert('Saved ✅', 'Privacy settings updated.');
              }}
            >
              <Text style={styles.sendButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ========== HELP MODAL ========== */}
      <Modal
        visible={activeModal === 'help'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Help & Support</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.helpHeading}>Frequently Asked</Text>

            <TouchableOpacity
              style={styles.helpItem}
              onPress={() =>
                Alert.alert(
                  'How do I edit my profile?',
                  'Tap "Edit Profile" in Settings, change the fields, then tap Save Changes.'
                )
              }
            >
              <Text style={styles.helpItemText}>
                • How do I edit my profile?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.helpItem}
              onPress={() =>
                Alert.alert(
                  'How do I follow someone?',
                  'Tap the "Follow" button on their profile. Tap again to unfollow.'
                )
              }
            >
              <Text style={styles.helpItemText}>
                • How do I follow someone?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.helpItem}
              onPress={() =>
                Alert.alert(
                  'How do I send a message?',
                  'Tap the "Message" button on a profile to open the message box.'
                )
              }
            >
              <Text style={styles.helpItemText}>
                • How do I send a message?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sendButton, { marginTop: 16 }]}
              onPress={() => {
                setActiveModal(null);
                Alert.alert(
                  'Contact Support',
                  'Email: support@example.com'
                );
              }}
            >
              <Text style={styles.sendButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f7fa' },
  container: { flex: 1 },
  contentContainer: { paddingBottom: 30 },

  banner: {
    height: 140,
    backgroundColor: '#4a90e2',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatarWrapper: {
    marginBottom: -50,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#f5f7fa',
    backgroundColor: '#fff',
    elevation: 4,
  },
  avatar: { width: 110, height: 110, borderRadius: 55 },

  profileSection: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1a202c' },
  role: { fontSize: 15, color: '#4a5568', marginTop: 4 },
  location: { fontSize: 13, color: '#718096', marginTop: 6, textAlign: 'center' },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-around',
    elevation: 2,
  },
  statBox: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#1a202c' },
  statLabel: { fontSize: 12, color: '#718096', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: '#e2e8f0' },

  actionRow: { flexDirection: 'row', marginTop: 16, width: '100%', gap: 12 },
  primaryButton: {
    flex: 1,
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  followingButton: { backgroundColor: '#48bb78' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  secondaryButtonText: { color: '#4a90e2', fontWeight: 'bold', fontSize: 15 },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 18,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 10,
  },
  bio: { fontSize: 14, color: '#4a5568', lineHeight: 21 },

  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillChip: {
    backgroundColor: '#ebf4ff',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  skillText: { color: '#4a90e2', fontWeight: '600', fontSize: 13 },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  menuItemLast: { borderBottomWidth: 0 },
  menuIcon: { fontSize: 18, marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 15, color: '#2d3748' },
  logoutText: { color: '#e53e3e', fontWeight: '600' },
  menuArrow: { fontSize: 22, color: '#cbd5e0' },

  footerText: {
    textAlign: 'center',
    color: '#a0aec0',
    fontSize: 12,
    marginTop: 24,
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a202c' },
  modalClose: { fontSize: 22, color: '#718096', fontWeight: 'bold' },

  /* Message modal */
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  recipientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  recipientLabel: { fontSize: 11, color: '#718096' },
  recipientName: { fontSize: 15, fontWeight: '600', color: '#1a202c' },
  messageInput: {
    backgroundColor: '#f7fafc',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#1a202c',
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },

  /* Edit profile modal */
  fieldLabel: {
    fontSize: 13,
    color: '#4a5568',
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '600',
  },
  fieldInput: {
    backgroundColor: '#f7fafc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#1a202c',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bioInput: { minHeight: 90 },

  /* Toggle rows */
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  switchRowLast: { borderBottomWidth: 0 },
  switchLabel: { fontSize: 15, color: '#2d3748' },

  /* Help modal */
  helpHeading: {
    fontSize: 13,
    color: '#718096',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  helpItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  helpItemText: { fontSize: 14, color: '#4a90e2' },

  sendButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});