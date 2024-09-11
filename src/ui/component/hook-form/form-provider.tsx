import { FormProvider as Form, SubmitHandler, UseFormReturn } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any*/
type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: SubmitHandler<any>;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
}
