import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import InputSelect from '../../../app/common/form/select/InputSelect';
import InputText from '../../../app/common/form/text/InputText';
import { IContact } from '../../../app/models/contact';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';
import { S } from './ContactForm.styled';

interface IProps {}

const ContactForm: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { createContact, submitting, error } = rootStore.contactStore;

  return (
    <S.ContactForm>
      <h2>Postani nas partner</h2>
      <Form
        onSubmit={(values: IContact) => createContact(values)}
        render={({ invalid, pristine, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='name'
              label='Naziv sportskog objekta'
              type='text'
              block
              validate={required}
              component={InputText}
            />
            <Field
              name='email'
              label='Email'
              type='email'
              block
              validate={required}
              component={InputText}
            />
            <Field
              name='phoneNumber'
              label='Broj telefona'
              type='text'
              block
              validate={required}
              component={InputText}
            />
            <Field name='package' label='Paket' block component={InputSelect}>
              <option value='aaa'>aaa</option>
              <option value='bbb'>bbb</option>
              <option value='ccc'>ccc</option>
            </Field>
            {error && <ErrorMessage error={error} />}

            <Button
              disabled={submitting}
              loading={submitting}
              type='submit'
              color='primary'
              block
            >
              POSALJI
            </Button>
          </form>
        )}
      ></Form>
    </S.ContactForm>
  );
};

export default observer(ContactForm);
