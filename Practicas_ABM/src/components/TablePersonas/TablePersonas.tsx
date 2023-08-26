
import withReactContent from 'sweetalert2-react-content';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { persona } from "../../types/persona";
import { deleteData, getData } from "../../services/GenericFetch";
import { ModalFormulario } from "../ModalFormulario/ModalFormulario";
import swal from 'sweetalert2'

interface props {
  setShowModal: any
  ShowModal: boolean
}

export const TablePersonas = (
  { setShowModal, ShowModal }: props
) => {
  const urlapi = import.meta.env.VITE_API_URL
  console.log(urlapi)
  const [Loading, setLoading] = useState(false);
  const [personas, setPersonas] = useState<persona[]>([]);
  const [personaEdit, setPersonaEdit] = useState<persona>();
  const [editing, setEditing] = useState(false);

  function handleClose() {
    setShowModal(false);
    setEditing(false);
    setPersonaEdit(undefined);
  }

  async function getDataPersonas() {
    setLoading(true);
    await getData<persona[]>(urlapi + 'api/personas')
      .then((persona) => {
        setPersonas(persona);
        setLoading(false)
      })

  }


  useEffect(() => {
    getDataPersonas();
  }, []);

  const MySwal = withReactContent(swal);

  const handleDelete = (id: number) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esta operacion es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData(urlapi + 'api/personas/' + id);
        getDataPersonas();
      }
    });
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const dateFormater = (dateJava: string) => {
    const date = new Date(dateJava);
    const formatedDate = date.toLocaleDateString('es-AR', options)
    return formatedDate
  }


  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Mail</TableCell>
              <TableCell align="center">Numero de Telefono</TableCell>
              <TableCell align="center">Dia de Nacimiento</TableCell>
              <TableCell align="center">acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!Loading ? (
              <>
                {personas.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName} </TableCell>
                    <TableCell align="center">{row.email} </TableCell>
                    <TableCell align="center">{row.phoneNumber} </TableCell>
                    <TableCell align="center">{

                      dateFormater(row.birthdate)
                    } </TableCell>
                    <TableCell align="center">
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (row.id)
                              handleDelete(row.id);
                          }}
                        ></i>
                        <i
                          className="fa-solid fa-pen"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setPersonaEdit(row);
                            setEditing(true);
                            setShowModal(true);
                          }}
                        ></i>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <td colSpan={8} style={{ height: "5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Spinner animation="grow" />
                </div>
              </td>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalFormulario
        getPersonas={getDataPersonas}
        handleClose={handleClose}
        showModal={ShowModal}
        editing={editing}
        persona={personaEdit}
      />


    </div>
  )
}
