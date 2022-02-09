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
] as FormFieldType[];

const Test = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      console.log(data);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.log('err');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Form
        defaultValues={{
          email: 'test',
          details: {
            'gigi': 'wtf',

            'SUPER NESTED': {
              'this is weird': 'mergee',
            },
          },
        }}
        fields={fields}
        isSubmitting={isLoading}
        onSubmit={onSubmit}
        submitButtonText="Hai noroc si doamne ajuta"
      />
    </div>
  );
};

export default Test;
