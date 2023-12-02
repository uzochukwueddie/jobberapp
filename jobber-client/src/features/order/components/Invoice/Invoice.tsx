import { Document, Font, Page, StyleSheet } from '@react-pdf/renderer';
import { FC, ReactElement } from 'react';

import InvoiceTextInfo from './components/InvoiceTextInfo';
import InvoiceTitle from './components/InvoiceTitle';
import InvoiceUserInfo from './components/InvoiceUserInfo';
import TableBody from './components/TableBody';
import TableHead from './components/TableHead';
import TableTotal from './components/TableTotal';

const styles = StyleSheet.create({
  page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' }
});

Font.register({
  family: 'Lato Bold',
  src: 'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf'
});

const Invoice: FC = (): ReactElement => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <InvoiceUserInfo />
        <TableHead />
        <TableBody />
        <TableTotal />
        <InvoiceTextInfo />
      </Page>
    </Document>
  );
};

export default Invoice;
