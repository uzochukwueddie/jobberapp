import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, Fragment, ReactElement, useContext } from 'react';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { IOrderInvoiceService } from 'src/features/order/interfaces/order.interface';

const styles = StyleSheet.create({
  tbody: { fontSize: 9, paddingTop: 4, textAlign: 'center', flex: 1, borderColor: 'whitesmoke', borderBottomWidth: 1 },
  tbody2: { flex: 2, textAlign: 'left' }
});

const TableBody: FC = (): ReactElement => {
  const { orderInvoice } = useContext(OrderContext);

  return (
    <div>
      {orderInvoice &&
        Object.keys(orderInvoice).length &&
        orderInvoice.orderService.map((order: IOrderInvoiceService, index: number) => (
          <Fragment key={index}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <View style={[styles.tbody, styles.tbody2]}>
                <Text>{order.service}</Text>
              </View>
              <View style={[styles.tbody]}>
                <Text></Text>
              </View>
              <View style={styles.tbody}>
                <Text></Text>
              </View>
              <View style={styles.tbody}>
                <Text></Text>
              </View>
              <View style={styles.tbody}>
                <Text></Text>
              </View>
              <View style={styles.tbody}>
                <Text>{order.quantity}</Text>
              </View>
              <View style={styles.tbody}>
                <Text>{order.price.toFixed(2)} </Text>
              </View>
              <View style={styles.tbody}>
                <Text>{(order.price * order.quantity).toFixed(2)}</Text>
              </View>
            </View>
          </Fragment>
        ))}
    </div>
  );
};

export default TableBody;
