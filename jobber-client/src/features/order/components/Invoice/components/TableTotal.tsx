import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, ReactElement, useContext } from 'react';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { IOrderInvoiceService } from 'src/features/order/interfaces/order.interface';

const styles = StyleSheet.create({
  tbody: {
    marginTop: 20,
    fontSize: 10,
    fontFamily: 'Lato Bold',
    fontWeight: 'bold',
    paddingTop: 4,
    textAlign: 'center',
    flex: 1,
    height: 20,
    color: '#4aa1f3'
  },
  total: { flex: 2, textAlign: 'left' }
});

const TableTotal: FC = (): ReactElement => {
  const { orderInvoice } = useContext(OrderContext);

  return (
    <>
      {orderInvoice && Object.keys(orderInvoice).length && (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
          <View style={[styles.tbody, styles.total]}>
            <Text></Text>
          </View>
          <View style={styles.tbody}></View>
          <View style={styles.tbody}></View>
          <View style={styles.tbody}></View>
          <View style={styles.tbody}></View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text>Total</Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              $
              {orderInvoice.orderService
                .reduce((sum: number, item: IOrderInvoiceService) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default TableTotal;
