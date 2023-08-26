import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextFieldValue from "../TextFildValue/TextFildValue";
import { persona } from "../../types/persona";
import { postData, putData } from "../../services/GenericFetch";


interface props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  persona?: persona;
  getPersonas: Function
}

export const ModalFormulario = ({
  showModal,
  handleClose,
  editing,
  persona,
  getPersonas
}: props) => {

  const initialValues: persona = {
    phoneNumber: '',
    adress: '',
    birthdate: '' as any,
    email: '',
    firstName: '',
    lastName: ''
  };

  const urlapi = import.meta.env.VITE_API_URL

  return (
    <div>
      <Modal
        id={"modal"}
        show={showModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {editing ? (
            <Modal.Title>Editar un Articulo:</Modal.Title>
          ) : (
            <Modal.Title>Añadir un Articulo:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={
              Yup.object({
                phoneNumber: Yup.string().required("campo Requerido"),
                adress: Yup.string().required("campo Requerido"),
                birthdate: Yup.date().required("campo Requerido"),
                email: Yup.string().email().required("campo Requerido"),
                firstName: Yup.string().required("campo Requerido"),
                lastName: Yup.string().required("campo Requerido")
              })
            }
            initialValues={persona ? persona : initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {
              console.log(values)
              if (editing) {
                await putData(
                  urlapi + `api/personas/${persona?.id}`,
                  values
                );
              } else {
                await postData(
                  urlapi + "api/personas",
                  values
                );
              }
              getPersonas();
              handleClose();
            }}
          >
            {(Formik) => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    <TextFieldValue
                      label="Nombre:"
                      name="firstName"
                      type="text"
                      placeholder="Nombre"
                    />
                    <TextFieldValue
                      label="Apellido:"
                      name="lastName"
                      type="text"
                      placeholder="Apellido"
                    />

                    <TextFieldValue
                      label="Mail:"
                      name="email"
                      type="text"
                      placeholder="Mail"
                    />

                    <TextFieldValue
                      label="Direccion:"
                      name="adress"
                      type="text"
                      placeholder="Direccion"
                    />
                    <TextFieldValue
                      label="Numero de Telefono:"
                      name="phoneNumber"
                      type="number"
                      placeholder="Numero de Telefono"
                    />
                    <TextFieldValue
                      label="Fecha de Nacimiento:"
                      name="birthdate"
                      type="date"
                      placeholder="Fecha de Nacimiento"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit">
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  )
}
