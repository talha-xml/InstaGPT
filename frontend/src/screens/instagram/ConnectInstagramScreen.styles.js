import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5FF',
    justifyContent: 'center',
    padding: 25
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5927A8',
    textAlign: 'center',
    marginBottom: 25
  },

  status: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30
  },

  button: {
    backgroundColor: '#833AB4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },

  closeButton: {
    backgroundColor: '#C13584',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default styles;
