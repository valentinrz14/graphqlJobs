// Dependencies
import React from 'react';
import { View } from 'react-native';
import { useMutation } from '@apollo/client';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
// Components
import { ButtonPostulate } from '../../components/ButtonsCustom';
import { LoadingIndicator } from '../../components';
import CustomInput from './CustomInput';
// Queries
import { ADD_JOB_FROM_POSTULATE } from '../../graphql/queries';

export default function FormPostulate({
  id,
  company,
  title,
  description,
  countries,
  cities,
  postedAt,
  slug,
  navigation,
}) {
  const [addJobFromPostulate] = useMutation(ADD_JOB_FROM_POSTULATE, {
    variables: {
      jobId: id,
      company,
      title,
      description,
      countries,
      cities,
      postedAt,
      slug,
    },
  });
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
    repo: yup
      .string()
      .matches(
        /(\w+:\/\/)(.+@)*([\w\d\.]+)(:[\d]+){0,1}\/*(.*)/g,
        'Ingrese un repositorio valido',
      ),
  });

  return (
    <Formik
      validationSchema={formValidationSchema}
      initialValues={{
        name: '',
        email: '',
        phoneNumber: '',
        repo: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        addJobFromPostulate()
          .then(() =>
            setTimeout(() => {
              setSubmitting(false);
              return navigation.goBack();
            }, 1000),
          )
          .catch((err) => console.log(err));
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
          <Field
            component={CustomInput}
            name="repo"
            placeholder="Repositorio de proyectos (Opcional)"
          />
          {isSubmitting ? (
            <View style={{ marginTop: 30 }}>
              <LoadingIndicator size="large" />
            </View>
          ) : (
            <ButtonPostulate _handleOnPress={handleSubmit} disabled={!isValid}>
              Enviar
            </ButtonPostulate>
          )}
        </>
      )}
    </Formik>
  );
}
