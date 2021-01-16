// Dependencies
import React from 'react';
import { View } from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
// Components
import { ButtonPostulate } from '../../components/ButtonsCustom';
import CustomInput from './CustomInput';
import { LoadingIndicator } from '../../components';

export default function FormPostulate() {
  const formValidationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/(\w.+\s).+/, 'Ingrese su nombre completo')
      .required('Nombre completo requerido'),
    phoneNumber: yup
      .string()
      .matches(
        /^[1-9]{1}[0-9]{9,9}$/,
        'Ingrese un numero de celular sin el codigo de area',
      )
      .required('Numero de celular requerido'),
    email: yup
      .string()
      .email('Porfavor ingrese su correo electronico')
      .required('Correo electronico requerido'),
  });
  return (
    <Formik
      validationSchema={formValidationSchema}
      initialValues={{
        name: '',
        email: '',
        phoneNumber: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
      }}>
      {({ handleSubmit, isValid, isSubmitting }) => (
        <>
          <Field
            component={CustomInput}
            name="name"
            placeholder="Nombre Completo"
          />
          <Field
            component={CustomInput}
            name="email"
            placeholder="Correo Electronico"
            keyboardType="email-address"
          />
          <Field
            component={CustomInput}
            name="phoneNumber"
            placeholder="Numero de Celular"
            keyboardType="numeric"
          />
          {isSubmitting ? (
            <View style={{ marginTop: 30 }}>
              <LoadingIndicator size="large" />
            </View>
          ) : (
            <ButtonPostulate
              _handleOnPress={handleSubmit}
              disabled={!isValid}
              btnPostulateStyle={{ marginTop: 10 }}>
              Enviar
            </ButtonPostulate>
          )}
        </>
      )}
    </Formik>
  );
}
