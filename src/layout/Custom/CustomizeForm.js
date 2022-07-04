import React, { useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

export default function CustomizeForm(props) {
  const [show, setShow] = useState(false);
  // const [validated, setValidated] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState(props.state.items);
  const schema = yup.object().shape({
    name: yup.string('請輸入有效的名稱.').required('姓名欄位不可為空.'),
    email: yup
      .string()
      .email('請輸入有效的信箱地址.')
      .required('信箱欄位不可為空.'),
    phone: yup
      .string()
      .required('電話欄位不可為空.')
      .matches(phoneRegExp, '請輸入有效的電話號碼.')
      .min(10, '電話號碼太短.')
      .max(10, '電話號碼太長.'),
    mark: yup.string().nullable(),
  });

  return (
    <>
      <Button
        className=" btn text-muted w-5 m-3"
        variant="black"
        onClick={handleShow}
      >
        送出申請
      </Button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>客製化腳踏車</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            name: '',
            email: '',
            phone: '',
            mark: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleReset,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group
                  className="mb-3"
                  controlId="customsizeForm.ControlInput1"
                >
                  <Form.Label>姓名</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    placeholder="王曉明"
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="customsizeForm.ControlInput1"
                >
                  <Form.Label>信箱</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="name@example.com"
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="customsizeForm.ControlInput1"
                >
                  <Form.Label>電話</Form.Label>
                  <Form.Control
                    name="phone"
                    value={values.phone}
                    type="number"
                    placeholder="0912345678"
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="customsizeForm.ControlTextarea1"
                >
                  <Form.Label>備註</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="mark"
                    value={values.mark}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="reset"
                  className="text-white"
                  variant="secondary"
                  onClick={handleReset}
                >
                  清空
                </Button>
                <Button
                  className="text-white"
                  variant="secondary"
                  onClick={handleClose}
                >
                  關閉
                </Button>
                <Button
                  type="submit"
                  className="text-white"
                  variant="primary"
                  onClick={handleShow}
                >
                  送出
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
