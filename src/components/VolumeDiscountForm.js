import { Page, Layout, BlockStack, Button, Text, Form } from '@shopify/polaris';
import { useForm, useFieldArray } from 'react-hook-form';
import GeneralInformation from './GeneralInformation';
import VolumeDiscountOptions from './VolumeDiscountOptions';
import PreviewSection from './PreviewSection';
import { ArrowLeftIcon } from '@shopify/polaris-icons';

export default function VolumeDiscountForm() {
  const { control, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      campaign: '',
      title: 'Title',
      description: '',
      options: [
        { title: 'Single', subtitle: 'Standard price', label: '', quantity: 1, discountType: 'None', amount: '' },
        { title: 'Duo', subtitle: 'Save 10%', label: 'Popular', quantity: 2, discountType: '%discount', amount: '10' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const values = watch();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          campaign: data.campaign,
          description: data.description,
          options: data.options,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      alert(`Volume discount created successfully! ID: ${result.id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create volume discount. Please try again.');
    }
  };

  return (
    <Page>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <Button icon={ArrowLeftIcon}></Button>
        <Text variant="headingLg" as="h1">Create volume discount</Text>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Layout>
          <Layout.Section>
            <BlockStack gap="500">
              <GeneralInformation control={control} errors={errors} />
              <VolumeDiscountOptions fields={fields} append={append} remove={remove} control={control} errors={errors} watch={watch} />
              <Button submit primary fullWidth size="large">Save</Button>
            </BlockStack>
          </Layout.Section>

          {/* Preview Section */}
          <Layout.Section variant="oneThird">
            <PreviewSection values={values} />
          </Layout.Section>
        </Layout>
      </Form>
    </Page>
  );
}
