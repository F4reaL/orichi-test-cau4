import React from 'react';
import { InlineGrid, TextField, Select, Button, Card, BlockStack, Text } from '@shopify/polaris';
import { DeleteIcon, PlusCircleIcon } from '@shopify/polaris-icons';
import { Controller } from 'react-hook-form'

const VolumeDiscountOptions = ({ fields, append, remove, control, errors, watch }) => (
  <BlockStack gap="100">
    <Text variant="headingMd">Volume discount rule</Text>
    {fields.map((item, index) => (
      <Card sectioned key={item.id}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ backgroundColor: '#e55a00', color: 'white', padding: '3px 20px 1px', transform: 'translateX(-20px)', borderRadius: '6px', marginBottom: '12px' }}>
            <Text tone="inherit" variant="headingMd">OPTION {index + 1}</Text>
          </div>
          <Button icon={DeleteIcon} onClick={() => fields.length > 1 && remove(index)} tone="base" />
        </div>

        <InlineGrid columns={3} gap="400">
          <Controller
            name={`options.${index}.title`}
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field: { onChange, onBlur, value, name } }) => <TextField label="Title" error={errors.options?.[index]?.title?.message} value={value} onChange={onChange} onBlur={onBlur} name={name} />}
          />
          <Controller name={`options.${index}.subtitle`} control={control} render={({ field: { onChange, onBlur, value, name } }) => <TextField label="Subtitle" value={value} onChange={onChange} onBlur={onBlur} name={name} />} />
          <Controller name={`options.${index}.label`} control={control} render={({ field: { onChange, onBlur, value, name } }) => <TextField label="Label (optional)" value={value} onChange={onChange} onBlur={onBlur} name={name} />} />
        </InlineGrid>

        <InlineGrid columns={3} gap="400" mt={4}>
          <Controller
            name={`options.${index}.quantity`}
            control={control}
            rules={{ required: 'Quantity is required' }}
            render={({ field: { onChange, onBlur, value, name } }) => <TextField label="Quantity" type="number" error={errors.options?.[index]?.quantity?.message} value={value} onChange={onChange} onBlur={onBlur} name={name} />}
          />
          <Controller
            name={`options.${index}.discountType`}
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Select
                label="Discount type"
                options={[{ label: 'None', value: 'None' }, { label: '% discount', value: '%discount' }, { label: 'Discount / each', value: 'discountEach' }]}
                value={value} onChange={onChange} onBlur={onBlur} name={name}
              />
            )}
          />
          {watch(`options.${index}.discountType`) === '%discount' && (
            <Controller
              name={`options.${index}.amount`}
              control={control}
              rules={{ required: 'Amount is required' }}
              render={({ field: { onChange, onBlur, value, name } }) => <TextField label="Amount" suffix="%" type="number" value={value} onChange={onChange} onBlur={onBlur} name={name} error={errors.options?.[index]?.amount?.message} />}
            />
          )}
          {watch(`options.${index}.discountType`) === 'discountEach' && (
            <Controller
              name={`options.${index}.amount`}
              control={control}
              rules={{ required: 'Amount is required' }}
              render={({ field: { onChange, onBlur, value, name } }) => <TextField label="Amount" suffix="$" type="number" value={value} onChange={onChange} onBlur={onBlur} name={name} error={errors.options?.[index]?.amount?.message} />}
            />
          )}
        </InlineGrid>
      </Card>
    ))}

    <div style={{ width: '100%', backgroundColor: '#e55a00', color: 'white', borderRadius: '6px', display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
      <Button fullWidth variant="monochromePlain" icon={PlusCircleIcon} onClick={() => append({ title: '', subtitle: '', label: '', quantity: '', discountType: 'None', amount: '' })}>
        Add option
      </Button>
    </div>
  </BlockStack>
);

export default VolumeDiscountOptions;
