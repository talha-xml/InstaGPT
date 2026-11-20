import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FA'
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25
  },

  header: {
    marginBottom: 25
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#833AB4',
    marginBottom: 25
  },

  heading: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#24112F'
  },

  subtitle: {
    fontSize: 14,
    color: '#786A80',
    marginTop: 8,
    lineHeight: 21
  },

  form: {
    width: '100%'
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#392344',
    marginBottom: 8,
    marginTop: 13
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCCBE5',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#24112F'
  },

  error: {
    color: '#C1355B',
    fontSize: 13,
    marginTop: 12
  },

  button: {
    height: 54,
    backgroundColor: '#C13584',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    gap: 5
  },

  footerText: {
    fontSize: 14,
    color: '#786A80'
  },

  link: {
    fontSize: 14,
    color: '#C13584',
    fontWeight: 'bold'
  }
});

export default styles;
