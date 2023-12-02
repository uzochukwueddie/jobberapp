import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, ReactElement, useContext } from 'react';
import { OrderContext } from 'src/features/order/context/OrderContext';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch'
  },
  spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: '#3E3E3E' },
  reportTitle: { fontSize: 18, textAlign: 'center', fontWeight: 'bold' }
});

const InvoiceTitle: FC = (): ReactElement => {
  const { orderInvoice } = useContext(OrderContext);

  return (
    <View style={styles.container}>
      <View style={styles.spaceBetween}>
        <Text style={styles.reportTitle}>Jobber</Text>
        <Text style={styles.reportTitle}>Invoice {orderInvoice && Object.keys(orderInvoice).length ? orderInvoice?.invoiceId : ''}</Text>
      </View>
    </View>
  );
};

export default InvoiceTitle;
