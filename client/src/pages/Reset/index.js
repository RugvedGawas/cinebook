import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { ResetPassword } from '../../apicalls/users';

const ResetPasswordForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await ResetPassword(values);
      setLoading(false);
      if (response.success) {
        message.success(response.message);
        form.resetFields();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };

  return (
    <div className="layout p">
    {/* <div className='pos'>
     <h1 className="text-2xl text-white">
     <i class="ri-movie-2-fill"></i>CINEBOOKING
     </h1>
     </div> */}
    <div className="flex justify-center h-screen items-center">
     <div className="layout p"></div>
    <div className="card2 p-3 w-400 pos">
      <h1 className="text-xl mb-1 text-black">CINEBOOKING - LOGIN</h1>
      <hr />
    <Form form={form} name="reset-password-form" onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
    </div>
  </div>
  </div>
  
  );
};

export default ResetPasswordForm;
