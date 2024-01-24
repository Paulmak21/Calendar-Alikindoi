import React, { useState, useContext } from "react";
import { Button, Form, Input, Modal, Radio, TimePicker } from "antd";
import { DatePicker } from "antd";
import { Context } from "../store/appContext";

const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  onFormDataChange,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Create a new event"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            // console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="time"
          label="Time"
          rules={[
            {
              validator: (_, value) => {
                if (!value || value[0].isBefore(value[1])) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("End time must be after start time")
                );
              },
            },
          ]}
        >
          <TimePicker.RangePicker format="HH:mm" />
        </Form.Item>
        {/* <Form.Item
                            name="modifier"
                            className="collection-create-form_last-form-item"
                          >
                            <Radio.Group> */}
        {/* </Form.Item> */}
      </Form>
    </Modal>
  );
};

const CreateEventButton = ({ addEvents, selectedDate }) => {
  const [open, setOpen] = useState(false);
  const { store, actions } = useContext(Context);
  const onCreate = (values) => {
    const [start, end] = values.time;
    const event = {
      title: values.title,
      description: values.description,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      user_id: store.user, // Asegúrate de obtener el id del usuario correctamente
    };

    // Guarda el evento usando la acción saveEvent
    actions.saveEvent(event);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Event
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default CreateEventButton;
