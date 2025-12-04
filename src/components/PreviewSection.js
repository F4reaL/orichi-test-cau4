import React from 'react';
import { Card, DataTable, Text } from '@shopify/polaris';

const PreviewSection = ({ values }) => (
  <Card>
    <Text variant="headingMd" >Preview</Text>
    <div style={{ margin: '10px 0', textAlign: 'center', minHeight:'24px' }}>
      <Text variant="headingLg" >{values.title}</Text>
    </div>
    <Text>Apply for all products in store</Text>

    <div style={{ marginTop: 16 }}>
      <DataTable
        columnContentTypes={['text', 'text', 'numeric', 'numeric']}
        headings={['Title', 'Discount Type', 'Quantity', 'Amount']}
        rows={values.options.map(opt => [
          opt.title,
          opt.discountType,
          opt.quantity,
          opt.amount ? opt.discountType === "discountEach" ? `${opt.amount}$` : `${opt.amount}%` : '',
        ])}
      />
    </div>
  </Card>
);

export default PreviewSection;
