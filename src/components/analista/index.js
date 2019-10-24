import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import {
    Button, Label, FormGroup, Form, Col, Row, Input, Container, Table,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class analista extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numNot: '',
            descricao: '',
            dateFat: '',
            datePag: '',
            status: 'Aguardando Pagamento',
            notas: [],
            modal: false,
            unmountOnClose: true,
            dateAnt: '',
            numNotAnt: '',
            datePagAnt: ''
        };
        this.cadastrar = this.cadastrar.bind(this)
        this.onRegister = this.onRegister.bind(this)
        this.toggle = this.toggle.bind(this)
        this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this)
        this.solicitarAnt = this.solicitarAnt.bind(this)
    }

    componentDidMount() {

        firebase.app.ref('notas').on('value', (snapshot) => {
            let state = this.state;
            state.notas = [];
            snapshot.forEach((childItem) => {
                state.notas.push({
                    numNot: childItem.val().numNot,
                    descricao: childItem.val().descricao,
                    dateFat: childItem.val().dateFat,
                    datePag: childItem.val().datePag,
                    status: childItem.val().status
                })
            })
            this.setState(state);
        })
    }

    solicitarAnt = async () => {
        try {
            const { datePagAnt, dateAnt, numNotAnt } = this.state;
            await firebase.solicitaAntecipacao(datePagAnt, dateAnt, numNotAnt);
        } catch (error) {
            alert("error.message");
        }
    }

    cadastrar(e) {
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async () => {
        try {
            const { numNot, descricao, dateFat, datePag, status } = this.state;
            await firebase.cadastraNota(numNot, descricao, dateFat, datePag, status);
        } catch (error) {
            alert("error.message");
        }
    }

    toggle(e) {
        this.state.numNotAnt = e.numNot
        this.state.datePagAnt = e.datePag
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    changeUnmountOnClose(e) {
        let value = e.target.value;
        this.setState({ unmountOnClose: JSON.parse(value) });
    }

    render() {
        return (
            <Container>
                <Link to={{ pathname: "/" }}> Home </Link>
                <h1 className="text-white text-center">ANALISTA</h1>
                <Form className='mb-5 mt-2' onSubmit={this.cadastrar}>
                    <Row form>
                        <Col md={2}>
                            <FormGroup>
                                <Label for='numNot' className="text-white">Número da Nota</Label>
                                <Input id='numNot' type="number" placeholder="99999" autoFocus
                                    onChange={(e) => this.setState({ numNot: e.target.value })} required />
                            </FormGroup>
                        </Col>
                        <Col md={10}>
                            <FormGroup>
                                <Label for='desc' className="text-white">Descrição</Label>
                                <Input id='desc' type="text" placeholder="Descrição"
                                    onChange={(e) => this.setState({ descricao: e.target.value })} required />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='datFat' className="text-white">Data de Faturamento</Label>
                                <Input id='datFat' type="date"
                                    onChange={(e) => this.setState({ dateFat: e.target.value })} required />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='datPag' className="text-white">Data de Pagamento</Label>
                                <Input id='datPag' type="date"
                                    onChange={(e) => this.setState({ datePag: e.target.value })} required />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Button type="submit" color="success" className="w-100">Cadastrar Nota</Button>
                </Form>

                <Row>
                        <Col md='10'>
                            <Label for='pesq' className="text-white">Pesquisar Nota</Label>
                            <Input type="pesq" placeholder="Digite o número da nota"></Input>
                        </Col>
                        <Col md='2'>
                            <Button color='success'>Pesquisar</Button>
                        </Col>
                    <Col md='12'>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="text-center text-white">Número</th>
                                    <th className="text-center text-white">Descrição</th>
                                    <th className="text-center text-white">Data de Faturamento</th>
                                    <th className="text-center text-white">Data de Pagamento</th>
                                    <th className="text-center text-white">Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.notas.map((nota) => {
                                    return (
                                        <tr>
                                            <td className="text-center text-white font-weight-bold">{nota.numNot}</td>
                                            <td className="text-center text-white font-weight-bold">{nota.descricao}</td>
                                            <td className="text-center text-white font-weight-bold">{nota.dateFat}</td>
                                            <td className="text-center text-white font-weight-bold">{nota.datePag}</td>
                                            <td className="text-center text-white font-weight-bold">{nota.status}</td>
                                            <td>
                                                <Button outline color="success" onClick={(e) => this.toggle(nota)}>Antecipar Pagamento</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>

                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} unmountOnClose={this.state.unmountOnClose}>
                            <ModalHeader className="text-dark text-center" toggle={this.toggle}>Antecipar Pagamento</ModalHeader>
                            <ModalBody>
                                <Label className="text-dark">Informe a data que deseja antecipar o pagamento</Label>
                                <Input type="date" onChange={(e) => this.setState({ dateAnt: e.target.value })} required />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={this.solicitarAnt}>Solicitar</Button>
                                <Button color="danger" onClick={this.toggle}>Cancelar</Button>
                            </ModalFooter>
                        </Modal>
                    </Col>
                </Row>
            </Container >
        )
    }
}
export default analista;
