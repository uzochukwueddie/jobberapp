import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, ReactElement } from 'react';

const styles = StyleSheet.create({
  spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: '#3E3E3E' },
  titleContainer: { flexDirection: 'row', marginTop: 20 },
  info: { fontSize: 9 }
});

const InvoiceTextInfo: FC = (): ReactElement => {
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <View>
            <Text style={styles.info}>Purchased on Jobber.com through Jobber Limited </Text>
            <Text style={styles.info}>have an ivoice or billing question? Contact us</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default InvoiceTextInfo;
