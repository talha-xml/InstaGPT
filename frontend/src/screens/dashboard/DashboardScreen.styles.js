import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FA'
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#833AB4'
  },

  tagline: {
    fontSize: 12,
    color: '#786A80',
    marginTop: 2
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#833AB4',
    justifyContent: 'center',
    alignItems: 'center'
  },

  profileInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileContainer: {
    position: 'relative',
    zIndex: 10
  },

  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 6,
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#EEE5F1'
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15
  },

  dropdownText: {
    fontSize: 14,
    color: '#392344',
    fontWeight: '500'
  },

  logoutText: {
    fontSize: 14,
    color: '#C1355B',
    fontWeight: '600'
  },

  dropdownDivider: {
    height: 1,
    backgroundColor: '#EEE5F1'
  },
  welcomeSection: {
    marginTop: 30,
    marginBottom: 20
  },

  welcomeTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#24112F'
  },

  welcomeSubtitle: {
    fontSize: 13,
    color: '#786A80',
    marginTop: 5
  },

  accountCard: {
    backgroundColor: '#F0E5F6',
    borderRadius: 14,
    padding: 18,
    marginBottom: 15
  },

  agentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8DDED',
    marginBottom: 25
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#392344'
  },

  statusBadge: {
    backgroundColor: '#FCEAF3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },

  statusText: {
    fontSize: 10,
    color: '#C13584',
    fontWeight: 'bold'
  },

  pausedBadge: {
    backgroundColor: '#F0EDF2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },

  pausedText: {
    fontSize: 10,
    color: '#786A80',
    fontWeight: 'bold'
  },

  cardDescription: {
    fontSize: 12,
    color: '#786A80',
    lineHeight: 19,
    marginTop: 12,
    marginBottom: 15
  },

  primaryButton: {
    backgroundColor: '#833AB4',
    paddingVertical: 12,
    borderRadius: 9,
    alignItems: 'center'
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold'
  },

  disabledButton: {
    backgroundColor: '#E8E3EB',
    paddingVertical: 12,
    borderRadius: 9,
    alignItems: 'center'
  },

  disabledButtonText: {
    color: '#96899B',
    fontSize: 13,
    fontWeight: 'bold'
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24112F',
    marginBottom: 13
  },

  statsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 17,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE5F1'
  },

  statNumber: {
    fontSize: 25,
    fontWeight: 'bold'
  },

  statLabel: {
    fontSize: 10,
    color: '#786A80',
    marginTop: 5
  },

  purpleText: {
    color: '#833AB4'
  },

  pinkText: {
    color: '#C13584'
  },

  orangeText: {
    color: '#E46B32'
  },

  managementContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12
  },

  managementCard: {
    width: '48%',
    minHeight: 95,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 13,
    borderWidth: 1,
    borderColor: '#EEE5F1',
    justifyContent: 'center'
  },

  managementTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#392344'
  },

  managementDescription: {
    fontSize: 11,
    color: '#786A80',
    marginTop: 7,
    lineHeight: 16
  },

  footer: {
    fontSize: 10,
    color: '#A092A6',
    textAlign: 'center',
    marginTop: 25
  }
});

export default styles;
