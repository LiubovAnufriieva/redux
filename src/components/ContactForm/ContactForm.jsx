import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useId } from "react";
import * as Yup from "yup";

const ContactsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Invalid phone number! Enter the number in the format 000-00-00')
    .min(6, "Too Short!")
    .max(18, "Too Long!")
    .required("Required"),
});

const ContactForm = ({ onAdd }) => {
  const nameField = useId();
  const numberField = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);

    onAdd({
      id: nanoid(),
      ...values,
    });
    actions.resetForm();
  }

  return (
    <>
      <Formik
        initialValues={{ name: '', number: '' }}
        onSubmit={handleSubmit}
        validationSchema={ContactsSchema}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="name" className={css.label}>
              Name
            </label>
            <Field
              className={css.field}
              type="text"
              name="name"
              id={nameField}
              placeholder="Name Surname"
            />
            <ErrorMessage className={css.error} name="name" component="span" />
            <label htmlFor="number" className={css.label}>
              Number
            </label>
            <Field
              className={css.field}
              type="text"
              name="number"
              id={numberField}
              placeholder="000-00-00"
            />
            <ErrorMessage className={css.error} name="number" component="span" />
          </div>
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default ContactForm;