import React from 'react';
import { FormLayout, TextField, Card, Text } from '@shopify/polaris';
import { Controller } from 'react-hook-form'

const GeneralInformation = ({ control, errors }) => (
  <Card>
    <FormLayout>
      <Text variant="headingMd" >General</Text>
      <Controller
        name="campaign"
        control={control}
        rules={{ required: 'Campaign is required' }}
        render={({ field: { onBlur, onChange, value, name } }) => (
          <TextField
            placeholder="Enter campaign name"
            label="Campaign"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            error={errors.campaign?.message}
          />
        )
        }
      />

      <Controller
        name="title"
        control={control}
        rules={{ required: 'Title is required' }}
        render={({ field: { onBlur, onChange, value, name } }) => (
          <TextField
            placeholder="Enter title"
            label="Title"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            error={errors.title?.message}

          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { onBlur, onChange, value, name } }) => (
          <TextField
            placeholder="Enter description"
            label="Description"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
          />
        )}
      />
    </FormLayout>
  </Card>
);

export default GeneralInformation;
