import { useState } from 'react';
import { Form } from 'src/bundles/UIAppBundle/components/forms/Form';
import { FormFieldType } from 'src/bundles/UIAppBundle/services/types';

const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    isRequired: true,
  },
  {
    name: 'details',
    label: 'Details nested stuff',
    isRequired: true,

    nest: [
      {
        name: 'gigi',
        label: 'Gigi!',
        isRequired: true,
        type: 'text',
      },

      {
        name: 'SUPER NESTED',

        label: 'Incoming nested shit',

        nest: [
          {
            name: 'this is weird',
            label: 'Very weird',
            isRequired: true,
            type: 'text',

            enumValues: ['ABC', 'DEF'],
          },
        ],
      },
    ],
  },
  {
    name: 'cevaBul',
    type: 'checkbox',
    label: 'Bulian',
  },
  {
    name: 'numar',
    type: 'number',
    label: 'numarutz',
  },
] as FormFieldType[];

const Test = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      console.log(data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return true;
    } catch (err) {
      console.log('err');

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form
        fields={fields}
        isSubmitting={isLoading}
        onSubmit={onSubmit}
        defaultValues={{
          cevaBul: true,
        }}
        submitButtonText="Hai noroc si doamne ajuta"
      />
    </div>
  );
};

export default Test;
