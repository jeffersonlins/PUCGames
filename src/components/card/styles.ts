import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    padding: 10,
    marginBottom: 8,
    borderRadius: 4
  },
  content: {
    flex: 1,
    padding: 3,
  },
  linha: {
    fontSize: 15,
    lineHeight: 18,
    color: '#3D434D',
    fontWeight: 'bold',
  },
  linha2: {
    fontSize: 15,
    lineHeight: 18,
    color: '#3D434D',
  },
  button: {
    height: 80,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E3E3E3',
  }
});
